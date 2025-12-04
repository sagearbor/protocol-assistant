'use client'

import { useState, useEffect } from 'react'
import DocumentInput from '@/components/DocumentInput'
import ResultsPanel from '@/components/ResultsPanel'
import History from '@/components/History'
import Templates from '@/components/Templates'
import { DocumentType } from '@/types/mcp'
import { saveToHistory } from '@/lib/storage'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking')
  
  // Template/history loading states
  const [templateDocType, setTemplateDocType] = useState<DocumentType>('protocol')
  const [templateDocText, setTemplateDocText] = useState('')
  const [templateTools, setTemplateTools] = useState<string[]>(['consent_grade_checker'])

  useEffect(() => {
    checkServerStatus()
  }, [])

  const checkServerStatus = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MCP_SERVER_URL || 'http://localhost:8210'}/health`)
      setServerStatus(response.ok ? 'online' : 'offline')
    } catch (error) {
      setServerStatus('offline')
    }
  }

  const handleAnalyze = async (
    documentType: DocumentType,
    documentText: string,
    selectedTools: string[]
  ) => {
    setIsLoading(true)
    setResults({})
    setErrors({})

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentType,
          documentText,
          selectedTools,
        }),
      })

      const data = await response.json()

      if (data.success) {
        const analysisResults = data.results || {}
        setResults(analysisResults)
        setErrors(data.errors || {})
        
        // Save to history
        saveToHistory(documentType, documentText, selectedTools, analysisResults)
      } else {
        setErrors({ general: data.error || 'Analysis failed' })
      }
    } catch (error) {
      console.error('Analysis error:', error)
      setErrors({ general: 'Failed to connect to analysis service' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoadTemplate = (
    documentType: DocumentType,
    documentText: string,
    selectedTools: string[]
  ) => {
    setTemplateDocType(documentType)
    setTemplateDocText(documentText)
    setTemplateTools(selectedTools)
  }

  const handleLoadHistory = (historicalResults: Record<string, any>) => {
    setResults(historicalResults)
    setErrors({})
  }

  return (
    <div>
      {serverStatus !== 'checking' && (
        <div className={`mb-4 p-3 rounded-md flex items-center gap-2 ${
          serverStatus === 'online' 
            ? 'bg-green-50 text-green-800' 
            : 'bg-red-50 text-red-800'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            serverStatus === 'online' ? 'bg-green-500' : 'bg-red-500'
          }`} />
          <span className="text-sm font-medium">
            MCP Server: {serverStatus === 'online' ? 'Connected' : 'Disconnected'}
          </span>
          {serverStatus === 'offline' && (
            <span className="text-sm ml-2">
              (Make sure dcri-mcp-tools server is running on port 8210)
            </span>
          )}
        </div>
      )}

      <div className="flex gap-4 mb-4">
        <Templates onLoadTemplate={handleLoadTemplate} />
        <History onLoadHistory={handleLoadHistory} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-dcri-blue">Document Analysis</h2>
          <DocumentInput 
            onAnalyze={handleAnalyze} 
            isLoading={isLoading}
            initialDocumentType={templateDocType}
            initialDocumentText={templateDocText}
            initialSelectedTools={templateTools}
          />
        </div>

        <div>
          {(Object.keys(results).length > 0 || Object.keys(errors).length > 0) && (
            <ResultsPanel results={results} errors={errors} />
          )}
          
          {isLoading && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-dcri-blue"></div>
              <p className="mt-4 text-gray-600">Analyzing document...</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3">Quick Start Guide</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
          <li>Select your document type (Protocol, ICF, or Other)</li>
          <li>Paste your document text in the input area</li>
          <li>Choose one or more analysis tools</li>
          <li>Click &quot;Analyze Document&quot; to get instant feedback</li>
          <li>Review results and export as needed</li>
        </ol>
        <p className="text-xs text-gray-500 mt-4">
          Note: No PHI/PII data is stored. All processing happens in memory.
        </p>
      </div>
    </div>
  )
}