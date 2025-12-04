import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import DocumentInput from '@/components/DocumentInput'

describe('DocumentInput', () => {
  const mockOnAnalyze = jest.fn()

  beforeEach(() => {
    mockOnAnalyze.mockClear()
  })

  it('renders document type tabs', () => {
    render(<DocumentInput onAnalyze={mockOnAnalyze} isLoading={false} />)
    
    expect(screen.getByText('Protocol')).toBeInTheDocument()
    expect(screen.getByText('Informed Consent')).toBeInTheDocument()
    expect(screen.getByText('Other Document')).toBeInTheDocument()
  })

  it('renders textarea for document input', () => {
    render(<DocumentInput onAnalyze={mockOnAnalyze} isLoading={false} />)
    
    const textarea = screen.getByPlaceholderText('Paste your document text here...')
    expect(textarea).toBeInTheDocument()
  })

  it('renders available analysis tools', () => {
    render(<DocumentInput onAnalyze={mockOnAnalyze} isLoading={false} />)
    
    expect(screen.getByText('Reading Level Analysis')).toBeInTheDocument()
    expect(screen.getByText('Consistency Check')).toBeInTheDocument()
    expect(screen.getByText('Compliance Score')).toBeInTheDocument()
  })

  it('disables inputs when loading', () => {
    render(<DocumentInput onAnalyze={mockOnAnalyze} isLoading={true} />)
    
    const textarea = screen.getByPlaceholderText('Paste your document text here...')
    expect(textarea).toBeDisabled()
    
    const analyzeButton = screen.getByText('Analyzing...')
    expect(analyzeButton).toBeDisabled()
  })

  it('calls onAnalyze with correct parameters', () => {
    render(<DocumentInput onAnalyze={mockOnAnalyze} isLoading={false} />)
    
    // Enter document text
    const textarea = screen.getByPlaceholderText('Paste your document text here...')
    fireEvent.change(textarea, { target: { value: 'Test document content' } })
    
    // Click analyze button
    const analyzeButton = screen.getByText('Analyze Document')
    fireEvent.click(analyzeButton)
    
    expect(mockOnAnalyze).toHaveBeenCalledWith(
      'protocol',
      'Test document content',
      expect.arrayContaining(['consent_grade_checker'])
    )
  })

  it('prevents submission with empty document', () => {
    render(<DocumentInput onAnalyze={mockOnAnalyze} isLoading={false} />)
    
    const analyzeButton = screen.getByText('Analyze Document')
    expect(analyzeButton).toBeDisabled()
  })

  it('toggles tool selection', () => {
    render(<DocumentInput onAnalyze={mockOnAnalyze} isLoading={false} />)
    
    const complianceCheckbox = screen.getByRole('checkbox', { 
      name: /Compliance Score/i 
    })
    
    expect(complianceCheckbox).not.toBeChecked()
    fireEvent.click(complianceCheckbox)
    expect(complianceCheckbox).toBeChecked()
    fireEvent.click(complianceCheckbox)
    expect(complianceCheckbox).not.toBeChecked()
  })

  it('switches document types', () => {
    render(<DocumentInput onAnalyze={mockOnAnalyze} isLoading={false} />)
    
    const icfButton = screen.getByText('Informed Consent')
    fireEvent.click(icfButton)
    
    // The button should now have the active state (different styling)
    expect(icfButton).toHaveClass('bg-dcri-blue')
  })

  it('loads with initial values from props', () => {
    render(
      <DocumentInput 
        onAnalyze={mockOnAnalyze} 
        isLoading={false}
        initialDocumentType="icf"
        initialDocumentText="Initial text"
        initialSelectedTools={['glossary_manager']}
      />
    )
    
    const textarea = screen.getByDisplayValue('Initial text')
    expect(textarea).toBeInTheDocument()
    
    const glossaryCheckbox = screen.getByRole('checkbox', { 
      name: /Glossary Generator/i 
    })
    expect(glossaryCheckbox).toBeChecked()
  })
})