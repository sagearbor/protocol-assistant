'use client'

import { useState, useEffect } from 'react'
import { getTemplates, deleteTemplate } from '@/lib/storage'
import { DocumentType } from '@/types/mcp'

interface TemplatesProps {
  onLoadTemplate: (documentType: DocumentType, documentText: string, selectedTools: string[]) => void
}

export default function Templates({ onLoadTemplate }: TemplatesProps) {
  const [templates, setTemplates] = useState<any[]>([])
  const [showTemplates, setShowTemplates] = useState(false)

  useEffect(() => {
    if (showTemplates) {
      setTemplates(getTemplates())
    }
  }, [showTemplates])

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      deleteTemplate(id)
      setTemplates(getTemplates())
    }
  }

  if (!showTemplates) {
    return (
      <button
        onClick={() => setShowTemplates(true)}
        className="text-sm text-dcri-blue hover:underline"
      >
        Load Template
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">Document Templates</h2>
          <button
            onClick={() => setShowTemplates(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[60vh] p-4">
          {templates.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No templates available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <span className="text-xs text-gray-500 uppercase">
                        {template.documentType}
                      </span>
                    </div>
                    {!template.id.startsWith('default-') && (
                      <button
                        onClick={() => handleDelete(template.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <div className="text-xs text-gray-500 mb-3">
                    Default tools: {template.defaultTools.length} selected
                  </div>
                  <button
                    onClick={() => {
                      onLoadTemplate(
                        template.documentType as DocumentType,
                        template.documentText,
                        template.defaultTools
                      )
                      setShowTemplates(false)
                    }}
                    className="w-full px-3 py-2 bg-dcri-blue text-white rounded hover:bg-blue-800 transition-colors text-sm"
                  >
                    Use Template
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}