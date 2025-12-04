import { NextRequest, NextResponse } from 'next/server'
import { mcpClient } from '@/lib/mcp-client'
import {
  ConsistencyCheckerInput,
  ConsistencyCheckerOutput,
  ConsentGradeInput,
  ConsentGradeOutput,
  ComplianceScorerInput,
  ComplianceScorerOutput,
  ProtocolQAInput,
  ProtocolQAOutput,
  GlossaryInput,
  GlossaryOutput,
  FAQInput,
  FAQOutput,
  FeasibilityInput,
  FeasibilityOutput,
  SynopsisInput,
  SynopsisOutput,
  InclusionExclusionInput,
  InclusionExclusionOutput,
} from '@/types/mcp'

export async function POST(request: NextRequest) {
  try {
    const { documentType, documentText, selectedTools } = await request.json()

    if (!documentText || !selectedTools || selectedTools.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const results: Record<string, any> = {}
    const errors: Record<string, string> = {}

    // Process each selected tool
    for (const tool of selectedTools) {
      try {
        switch (tool) {
          case 'consent_grade_checker': {
            const input: ConsentGradeInput = {
              consent_text: documentText,
              target_grade_level: 8,
            }
            const result = await mcpClient.callTool<ConsentGradeInput, ConsentGradeOutput>(
              'consent_grade_checker',
              input
            )
            if (result.success) {
              results[tool] = result.data
            } else {
              errors[tool] = result.error || 'Failed to process'
            }
            break
          }

          case 'protocol_consistency_checker': {
            const input: ConsistencyCheckerInput = {
              protocol_text: documentText,
              check_types: ['consistency', 'completeness', 'logic'],
            }
            const result = await mcpClient.callTool<ConsistencyCheckerInput, ConsistencyCheckerOutput>(
              'protocol_consistency_checker',
              input
            )
            if (result.success) {
              results[tool] = result.data
            } else {
              errors[tool] = result.error || 'Failed to process'
            }
            break
          }

          case 'protocol_compliance_scorer': {
            const input: ComplianceScorerInput = {
              protocol_text: documentText,
              regulations: ['ICH-GCP', 'FDA', 'EU-CTR'],
              check_depth: 'detailed',
            }
            const result = await mcpClient.callTool<ComplianceScorerInput, ComplianceScorerOutput>(
              'protocol_compliance_scorer',
              input
            )
            if (result.success) {
              results[tool] = result.data
            } else {
              errors[tool] = result.error || 'Failed to process'
            }
            break
          }

          case 'clinical_protocol_qa': {
            // For QA, we'll use a default question
            const input: ProtocolQAInput = {
              question: 'What are the key inclusion and exclusion criteria?',
              protocol_sections: { full_text: documentText },
              include_references: true,
            }
            const result = await mcpClient.callTool<ProtocolQAInput, ProtocolQAOutput>(
              'clinical_protocol_qa',
              input
            )
            if (result.success) {
              results[tool] = result.data
            } else {
              errors[tool] = result.error || 'Failed to process'
            }
            break
          }

          case 'glossary_manager': {
            const input: GlossaryInput = {
              document_text: documentText,
              include_definitions: true,
              max_terms: 50,
            }
            const result = await mcpClient.callTool<GlossaryInput, GlossaryOutput>(
              'glossary_manager',
              input
            )
            if (result.success) {
              results[tool] = result.data
            } else {
              errors[tool] = result.error || 'Failed to process'
            }
            break
          }

          case 'faq_generator': {
            const input: FAQInput = {
              protocol_text: documentText,
              num_questions: 10,
            }
            const result = await mcpClient.callTool<FAQInput, FAQOutput>(
              'faq_generator',
              input
            )
            if (result.success) {
              results[tool] = result.data
            } else {
              errors[tool] = result.error || 'Failed to process'
            }
            break
          }

          case 'site_feasibility_scorer': {
            const input: FeasibilityInput = {
              protocol_requirements: documentText,
            }
            const result = await mcpClient.callTool<FeasibilityInput, FeasibilityOutput>(
              'site_feasibility_scorer',
              input
            )
            if (result.success) {
              results[tool] = result.data
            } else {
              errors[tool] = result.error || 'Failed to process'
            }
            break
          }

          case 'protocol_synopsis_generator': {
            const input: SynopsisInput = {
              full_protocol: documentText,
              format: 'regulatory',
              max_length: 1000,
            }
            const result = await mcpClient.callTool<SynopsisInput, SynopsisOutput>(
              'protocol_synopsis_generator',
              input
            )
            if (result.success) {
              results[tool] = result.data
            } else {
              errors[tool] = result.error || 'Failed to process'
            }
            break
          }

          case 'inclusion_exclusion_checker': {
            const input: InclusionExclusionInput = {
              criteria_text: documentText,
              check_logic: true,
              check_feasibility: true,
            }
            const result = await mcpClient.callTool<InclusionExclusionInput, InclusionExclusionOutput>(
              'inclusion_exclusion_checker',
              input
            )
            if (result.success) {
              results[tool] = result.data
            } else {
              errors[tool] = result.error || 'Failed to process'
            }
            break
          }

          default:
            errors[tool] = `Unknown tool: ${tool}`
        }
      } catch (error) {
        errors[tool] = error instanceof Error ? error.message : 'Unknown error'
      }
    }

    return NextResponse.json({
      success: true,
      results,
      errors: Object.keys(errors).length > 0 ? errors : undefined,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze document' },
      { status: 500 }
    )
  }
}