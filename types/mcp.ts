export interface MCPToolResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ProtocolQAInput {
  question: string
  protocol_sections: Record<string, string>
  context_window?: number
  include_references?: boolean
}

export interface ProtocolQAOutput {
  success: boolean
  answer: string
  confidence_score: number
  source_sections: string[]
  question_type?: string
  follow_up_questions?: string[]
  context_analysis?: Record<string, any>
}

export interface ConsistencyCheckerInput {
  protocol_text: string
  protocol_sections?: Record<string, string>
  check_types?: string[]
  version?: string
  amendment_number?: number
}

export interface ConsistencyCheckerOutput {
  inconsistencies: Array<{
    type: string
    severity: 'high' | 'medium' | 'low'
    description: string
    sections_affected: string[]
    suggestion?: string
  }>
  severity_counts: Record<string, number>
  recommendations: string[]
  validation_score: number
  protocol_version: string
  total_issues: number
}

export interface ComplianceScorerInput {
  protocol_text: string
  regulations?: string[]
  check_depth?: 'basic' | 'detailed'
}

export interface ComplianceScorerOutput {
  compliance_score: number
  regulation_scores: Record<string, number>
  issues: Array<{
    regulation: string
    requirement: string
    status: 'compliant' | 'non-compliant' | 'partial'
    notes: string
  }>
  recommendations: string[]
}

export interface ConsentGradeInput {
  consent_text: string
  target_grade_level?: number
}

export interface ConsentGradeOutput {
  reading_level: number
  grade_level: string
  complexity_score: number
  difficult_sentences: string[]
  complex_words: string[]
  recommendations: string[]
  simplified_sections?: Record<string, string>
}

export interface GlossaryInput {
  document_text: string
  include_definitions?: boolean
  max_terms?: number
}

export interface GlossaryOutput {
  terms: Array<{
    term: string
    definition: string
    category: string
    lay_definition?: string
  }>
  total_terms: number
  categories: Record<string, number>
}

export interface FAQInput {
  protocol_text: string
  num_questions?: number
  categories?: string[]
}

export interface FAQOutput {
  faqs: Array<{
    question: string
    answer: string
    category: string
    importance: 'high' | 'medium' | 'low'
  }>
  total_questions: number
  categories_covered: string[]
}

export interface FeasibilityInput {
  protocol_requirements: string
  site_capabilities?: Record<string, any>
}

export interface FeasibilityOutput {
  feasibility_score: number
  challenges: Array<{
    area: string
    challenge: string
    severity: 'high' | 'medium' | 'low'
    mitigation?: string
  }>
  recommendations: string[]
  resource_requirements: Record<string, any>
}

export interface SynopsisInput {
  full_protocol: string
  format?: 'regulatory' | 'public' | 'executive'
  max_length?: number
}

export interface SynopsisOutput {
  synopsis: string
  word_count: number
  sections: Record<string, string>
  key_points: string[]
}

export interface InclusionExclusionInput {
  criteria_text: string
  check_logic?: boolean
  check_feasibility?: boolean
}

export interface InclusionExclusionOutput {
  logic_issues: Array<{
    type: string
    description: string
    criteria_affected: string[]
    suggestion: string
  }>
  feasibility_concerns: string[]
  total_inclusion_criteria: number
  total_exclusion_criteria: number
  recommendations: string[]
}

export type DocumentType = 'protocol' | 'icf' | 'other'

export interface AnalysisRequest {
  documentType: DocumentType
  documentText: string
  selectedTools: string[]
}