'use client'

import { useState, useEffect } from 'react'
import { getHistory, clearHistory } from '@/lib/storage'

interface HistoryProps {
  onLoadHistory?: (results: Record<string, any>) => void
}

export default function History({ onLoadHistory }: HistoryProps) {
  const [history, setHistory] = useState<any[]>([])
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    if (showHistory) {
      setHistory(getHistory())
    }
  }, [showHistory])

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      clearHistory()
      setHistory([])
    }
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const getToolNames = (tools: string[]) => {
    return tools.map(tool => {
      const names: Record<string, string> = {
        consent_grade_checker: 'Reading Level',
        protocol_consistency_checker: 'Consistency',
        protocol_compliance_scorer: 'Compliance',
        inclusion_exclusion_checker: 'I/E Criteria',
        clinical_protocol_qa: 'Q&A',
        glossary_manager: 'Glossary',
        faq_generator: 'FAQ',
        site_feasibility_scorer: 'Feasibility',
        protocol_synopsis_generator: 'Synopsis',
      }
      return names[tool] || tool
    }).join(', ')
  }

  if (!showHistory) {
    return (
      <button
        onClick={() => setShowHistory(true)}
        className="text-sm text-dcri-blue hover:underline"
      >
        View History
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">Analysis History</h2>
          <div className="flex gap-2">
            {history.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setShowHistory(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-[60vh] p-4">
          {history.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No history available</p>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    if (onLoadHistory) {
                      onLoadHistory(item.results)
                      setShowHistory(false)
                    }
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {item.documentType.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(item.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.documentPreview}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Tools: {getToolNames(item.selectedTools)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}