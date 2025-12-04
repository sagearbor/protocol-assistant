'use client'

import { useState } from 'react'
import { exportToJSON, exportToHTML, formatResultsAsHTML } from '@/lib/export-utils'
import Dashboard from './Dashboard'
import {
  ConsistencyCheckerOutput,
  ConsentGradeOutput,
  ComplianceScorerOutput,
  ProtocolQAOutput,
  GlossaryOutput,
  FAQOutput,
  FeasibilityOutput,
  SynopsisOutput,
  InclusionExclusionOutput,
} from '@/types/mcp'

interface ResultsPanelProps {
  results: Record<string, any>
  errors?: Record<string, string>
}

export default function ResultsPanel({ results, errors }: ResultsPanelProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const renderConsentGradeResults = (data: ConsentGradeOutput) => (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-3 rounded">
          <div className="text-sm text-gray-600">Reading Level</div>
          <div className="text-2xl font-bold text-dcri-blue">{data.grade_level}</div>
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <div className="text-sm text-gray-600">Complexity Score</div>
          <div className="text-2xl font-bold text-dcri-blue">{data.complexity_score.toFixed(1)}</div>
        </div>
      </div>
      
      {data.complex_words?.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Complex Words to Simplify:</h4>
          <div className="flex flex-wrap gap-2">
            {data.complex_words.slice(0, 10).map((word, idx) => (
              <span key={idx} className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm">
                {word}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {data.recommendations?.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Recommendations:</h4>
          <ul className="list-disc list-inside space-y-1">
            {data.recommendations.map((rec, idx) => (
              <li key={idx} className="text-sm text-gray-700">{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )

  const renderConsistencyResults = (data: ConsistencyCheckerOutput) => (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 p-3 rounded">
          <div className="text-sm text-gray-600">Validation Score</div>
          <div className="text-2xl font-bold text-dcri-green">{data.validation_score}/100</div>
        </div>
        <div className="bg-red-50 p-3 rounded">
          <div className="text-sm text-gray-600">Total Issues</div>
          <div className="text-2xl font-bold text-dcri-red">{data.total_issues}</div>
        </div>
        <div className="bg-yellow-50 p-3 rounded">
          <div className="text-sm text-gray-600">High Severity</div>
          <div className="text-2xl font-bold text-dcri-orange">{data.severity_counts?.high || 0}</div>
        </div>
      </div>

      {data.inconsistencies?.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Inconsistencies Found:</h4>
          <div className="space-y-2">
            {data.inconsistencies.slice(0, 5).map((issue, idx) => (
              <div key={idx} className={`p-3 rounded border-l-4 ${
                issue.severity === 'high' ? 'border-red-500 bg-red-50' :
                issue.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <div className="font-medium text-sm">{issue.type}</div>
                <div className="text-sm text-gray-700 mt-1">{issue.description}</div>
                {issue.suggestion && (
                  <div className="text-sm text-gray-600 mt-2 italic">
                    Suggestion: {issue.suggestion}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderComplianceResults = (data: ComplianceScorerOutput) => (
    <div className="space-y-3">
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded">
        <div className="text-sm text-gray-600">Overall Compliance Score</div>
        <div className="text-3xl font-bold text-dcri-blue">{data.compliance_score}%</div>
      </div>

      {data.regulation_scores && (
        <div>
          <h4 className="font-medium mb-2">Regulation Scores:</h4>
          <div className="space-y-2">
            {Object.entries(data.regulation_scores).map(([reg, score]) => (
              <div key={reg} className="flex items-center justify-between">
                <span className="text-sm font-medium">{reg}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-dcri-blue h-2 rounded-full"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderToolResults = (toolName: string, data: any) => {
    switch (toolName) {
      case 'consent_grade_checker':
        return renderConsentGradeResults(data as ConsentGradeOutput)
      case 'protocol_consistency_checker':
        return renderConsistencyResults(data as ConsistencyCheckerOutput)
      case 'protocol_compliance_scorer':
        return renderComplianceResults(data as ComplianceScorerOutput)
      default:
        return (
          <pre className="bg-gray-50 p-3 rounded overflow-x-auto text-xs">
            {JSON.stringify(data, null, 2)}
          </pre>
        )
    }
  }

  const getToolDisplayName = (toolId: string) => {
    const names: Record<string, string> = {
      consent_grade_checker: 'Reading Level Analysis',
      protocol_consistency_checker: 'Consistency Check',
      protocol_compliance_scorer: 'Compliance Score',
      inclusion_exclusion_checker: 'I/E Criteria Check',
      clinical_protocol_qa: 'Protocol Q&A',
      glossary_manager: 'Glossary Generator',
      faq_generator: 'FAQ Generator',
      site_feasibility_scorer: 'Site Feasibility',
      protocol_synopsis_generator: 'Synopsis Generator',
    }
    return names[toolId] || toolId
  }

  if (Object.keys(results).length === 0 && !errors) {
    return null
  }

  const handleExportJSON = () => {
    exportToJSON({ results, errors, timestamp: new Date().toISOString() }, 'protocol-analysis')
  }

  const handleExportHTML = () => {
    const htmlContent = formatResultsAsHTML(results)
    exportToHTML(htmlContent, 'Protocol Analysis Report', 'protocol-analysis-report')
  }

  return (
    <div className="mt-8 space-y-4">
      <Dashboard results={results} />
      
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-dcri-blue">Detailed Results</h2>
        {Object.keys(results).length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={handleExportJSON}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              Export JSON
            </button>
            <button
              onClick={handleExportHTML}
              className="px-3 py-1 text-sm bg-dcri-blue text-white hover:bg-blue-800 rounded transition-colors"
            >
              Export Report
            </button>
          </div>
        )}
      </div>
      
      {Object.entries(results).map(([toolName, data]) => (
        <div key={toolName} className="bg-white rounded-lg shadow-md overflow-hidden">
          <button
            onClick={() => toggleSection(toolName)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold">{getToolDisplayName(toolName)}</span>
              {errors?.[toolName] && (
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">Error</span>
              )}
            </div>
            <svg
              className={`w-5 h-5 transition-transform ${
                expandedSections.includes(toolName) ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expandedSections.includes(toolName) && (
            <div className="px-6 pb-4 border-t">
              {errors?.[toolName] ? (
                <div className="py-4 text-red-600">
                  Error: {errors[toolName]}
                </div>
              ) : (
                <div className="py-4">
                  {renderToolResults(toolName, data)}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {errors && Object.keys(errors).length > 0 && Object.keys(results).length === 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-semibold text-red-800 mb-2">Analysis Errors</h3>
          {Object.entries(errors).map(([tool, error]) => (
            <div key={tool} className="text-sm text-red-700">
              <span className="font-medium">{getToolDisplayName(tool)}:</span> {error}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}