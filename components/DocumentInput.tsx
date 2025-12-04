'use client'

import { useState, useEffect } from 'react'
import { DocumentType } from '@/types/mcp'

interface DocumentInputProps {
  onAnalyze: (documentType: DocumentType, documentText: string, selectedTools: string[]) => void
  isLoading: boolean
  initialDocumentType?: DocumentType
  initialDocumentText?: string
  initialSelectedTools?: string[]
}

const AVAILABLE_TOOLS = [
  { id: 'consent_grade_checker', name: 'Reading Level Analysis', description: 'Check consent form readability' },
  { id: 'protocol_consistency_checker', name: 'Consistency Check', description: 'Find inconsistencies in protocol' },
  { id: 'protocol_compliance_scorer', name: 'Compliance Score', description: 'Rate regulatory compliance' },
  { id: 'inclusion_exclusion_checker', name: 'I/E Criteria Check', description: 'Validate inclusion/exclusion logic' },
  { id: 'clinical_protocol_qa', name: 'Protocol Q&A', description: 'Answer questions about protocol' },
  { id: 'glossary_manager', name: 'Glossary Generator', description: 'Create medical term glossary' },
  { id: 'faq_generator', name: 'FAQ Generator', description: 'Generate frequently asked questions' },
  { id: 'site_feasibility_scorer', name: 'Site Feasibility', description: 'Assess site execution capability' },
  { id: 'protocol_synopsis_generator', name: 'Synopsis Generator', description: 'Create protocol synopsis' },
]

export default function DocumentInput({ 
  onAnalyze, 
  isLoading,
  initialDocumentType = 'protocol',
  initialDocumentText = '',
  initialSelectedTools = ['consent_grade_checker']
}: DocumentInputProps) {
  const [documentType, setDocumentType] = useState<DocumentType>(initialDocumentType)
  const [documentText, setDocumentText] = useState(initialDocumentText)
  const [selectedTools, setSelectedTools] = useState<string[]>(initialSelectedTools)

  useEffect(() => {
    setDocumentType(initialDocumentType)
    setDocumentText(initialDocumentText)
    setSelectedTools(initialSelectedTools)
  }, [initialDocumentType, initialDocumentText, initialSelectedTools])

  const handleToolToggle = (toolId: string) => {
    setSelectedTools(prev =>
      prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    )
  }

  const handleSubmit = () => {
    if (documentText.trim() && selectedTools.length > 0) {
      onAnalyze(documentType, documentText, selectedTools)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Document Type</h2>
        <div className="flex gap-4">
          {(['protocol', 'icf', 'other'] as DocumentType[]).map(type => (
            <button
              key={type}
              onClick={() => setDocumentType(type)}
              className={`px-4 py-2 rounded-md transition-colors ${
                documentType === type
                  ? 'bg-dcri-blue text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {type === 'protocol' && 'Protocol'}
              {type === 'icf' && 'Informed Consent'}
              {type === 'other' && 'Other Document'}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Document Text</h2>
        <textarea
          value={documentText}
          onChange={(e) => setDocumentText(e.target.value)}
          placeholder="Paste your document text here..."
          className="w-full h-64 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dcri-blue"
          disabled={isLoading}
        />
        <p className="text-sm text-gray-500 mt-2">
          No PHI/PII data is stored. Documents are processed in memory only.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Analysis Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {AVAILABLE_TOOLS.map(tool => (
            <label
              key={tool.id}
              className="flex items-start space-x-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedTools.includes(tool.id)}
                onChange={() => handleToolToggle(tool.id)}
                disabled={isLoading}
                className="mt-1"
              />
              <div>
                <div className="font-medium text-sm">{tool.name}</div>
                <div className="text-xs text-gray-500">{tool.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!documentText.trim() || selectedTools.length === 0 || isLoading}
        className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
          !documentText.trim() || selectedTools.length === 0 || isLoading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-dcri-blue text-white hover:bg-blue-800'
        }`}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Document'}
      </button>
    </div>
  )
}