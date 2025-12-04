'use client'

import { useEffect, useState } from 'react'

interface DashboardProps {
  results: Record<string, any>
}

interface ScoreCard {
  title: string
  value: string | number
  color: 'green' | 'yellow' | 'red' | 'blue'
  description?: string
}

export default function Dashboard({ results }: DashboardProps) {
  const [scoreCards, setScoreCards] = useState<ScoreCard[]>([])

  useEffect(() => {
    const cards: ScoreCard[] = []

    // Compliance Score
    if (results.protocol_compliance_scorer?.compliance_score !== undefined) {
      const score = results.protocol_compliance_scorer.compliance_score
      cards.push({
        title: 'Compliance Score',
        value: `${score}%`,
        color: score >= 80 ? 'green' : score >= 60 ? 'yellow' : 'red',
        description: 'Overall regulatory compliance'
      })
    }

    // Consistency Score
    if (results.protocol_consistency_checker?.validation_score !== undefined) {
      const score = results.protocol_consistency_checker.validation_score
      cards.push({
        title: 'Consistency Score',
        value: `${score}/100`,
        color: score >= 80 ? 'green' : score >= 60 ? 'yellow' : 'red',
        description: 'Document internal consistency'
      })
    }

    // Reading Level
    if (results.consent_grade_checker?.grade_level) {
      const gradeStr = results.consent_grade_checker.grade_level
      const gradeNum = parseInt(gradeStr)
      cards.push({
        title: 'Reading Level',
        value: gradeStr,
        color: gradeNum <= 8 ? 'green' : gradeNum <= 10 ? 'yellow' : 'red',
        description: 'Target: 8th grade or below'
      })
    }

    // Issues Count
    if (results.protocol_consistency_checker?.total_issues !== undefined) {
      const issues = results.protocol_consistency_checker.total_issues
      cards.push({
        title: 'Issues Found',
        value: issues,
        color: issues === 0 ? 'green' : issues <= 5 ? 'yellow' : 'red',
        description: 'Total consistency issues'
      })
    }

    // Feasibility Score
    if (results.site_feasibility_scorer?.feasibility_score !== undefined) {
      const score = results.site_feasibility_scorer.feasibility_score
      cards.push({
        title: 'Site Feasibility',
        value: `${score}%`,
        color: score >= 80 ? 'green' : score >= 60 ? 'yellow' : 'red',
        description: 'Site execution capability'
      })
    }

    // Glossary Terms
    if (results.glossary_manager?.total_terms !== undefined) {
      cards.push({
        title: 'Glossary Terms',
        value: results.glossary_manager.total_terms,
        color: 'blue',
        description: 'Medical terms identified'
      })
    }

    setScoreCards(cards)
  }, [results])

  if (scoreCards.length === 0) {
    return null
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'yellow':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'red':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'blue':
        return 'bg-blue-50 border-blue-200 text-blue-800'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Analysis Dashboard</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {scoreCards.map((card, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 ${getColorClasses(card.color)}`}
          >
            <div className="text-xs font-medium opacity-75">{card.title}</div>
            <div className="text-2xl font-bold mt-1">{card.value}</div>
            {card.description && (
              <div className="text-xs mt-2 opacity-75">{card.description}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}