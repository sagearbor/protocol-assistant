# protocol-assistant
A smart document helper for clinical trial teams - like "Grammarly for clinical
 trials" that helps create better study documents without changing how people work.

## Overview

Protocol Assistant is a low-friction web application that provides instant feedback
 on clinical trial protocols, informed consent forms, and other study documents.
 Simply paste your text and get immediate suggestions for improvements, consistency
 checks, and regulatory compliance scoring.

## Value Proposition

- **Immediate Value**: Get feedback in seconds, not days
  
- **No Training Required**: Intuitive copy-paste interface
  
- **No System Changes**: Works alongside existing tools
  
- **No PHI/PII Risk**: Works with template documents
  
- **Individual Adoption**: One person can start using it today
  
  ## Features
  
  ### 🔍 Protocol Quality Checks
  
- **Consistency Validation**: Finds contradictions and inconsistencies within
  protocols
  
- **Compliance Scoring**: Rates protocol against ICH-GCP and FDA requirements
  
- **Logic Validation**: Ensures inclusion/exclusion criteria make logical sense
  
  ### 📚 Document Enhancement
  
- **Reading Level Analysis**: Ensures consent forms are at appropriate grade level
  (8th grade standard)
  
- **Auto-Glossary Generation**: Creates glossaries from medical terms in documents
  
- **FAQ Generation**: Automatically generates FAQs from common protocol questions
  
- **Synopsis Creation**: Auto-generates protocol synopsis from full protocol
  
  ### 🏥 Feasibility Assessment
  
- **Site Feasibility Scoring**: Evaluates if sites can realistically execute the
  protocol
  
- **Burden Calculator**: Estimates time commitment for participants
  
  ## Architecture
  
  Frontend (React/Next.js)
   ↓
  Protocol Assistant API Gateway
   ↓
  MCP Tool Server (Flask - port 8210)
   ↓
  Individual MCP Tools:
  
- clinical_protocol_qa
  
- protocol_consistency_checker
  
- protocol_compliance_scorer
  
- inclusion_exclusion_checker
  
- consent_grade_checker
  
- glossary_manager
  
- glossary_explainer
  
- faq_generator
  
- site_feasibility_scorer
  
- protocol_synopsis_generator
  
  ## Quick Start
  
  ### Prerequisites
  
- Node.js 18+
  
- Python 3.8+
  
- Access to MCP Tools Server (http://localhost:8210)
  
  ### Installation
  
  ```bash
  # Clone the repository
  git clone https://github.com/DCRI/protocol-assistant.git
  cd protocol-assistant
  
  # Install frontend dependencies
  npm install
  
  # Configure MCP server endpoint
  cp .env.example .env
  # Edit .env to point to your MCP server
  
  # Start development server
  npm run dev
  
  Using the Application
  ```
  

1. Navigate to http://localhost:3000
  
2. Select document type (Protocol, ICF, or Other)
  
3. Paste your document text
  
4. Click "Analyze"
  
5. Review suggestions and download report
  
  MCP Tools Integration
  
  This application integrates with the following MCP tools from the dcri-mcp-tools
  server:
  
  | Tool | Purpose | Input
   | Output |
  |------------------------------|---------------------------------|------------------
  -----|------------------------|
  | clinical_protocol_qa | Q&A analysis of protocol | Protocol text
   | Issues and suggestions |
  | protocol_consistency_checker | Internal consistency validation | Protocol sections
   | Inconsistencies found |
  | protocol_compliance_scorer | Regulatory compliance scoring | Protocol text
   | Compliance score 0-100 |
  | inclusion_exclusion_checker | I/E criteria logic validation | Criteria text
   | Logic issues |
  | consent_grade_checker | Reading level analysis | Consent form text
   | Grade level score |
  | glossary_manager | Glossary generation | Document text
   | Term definitions |
  | faq_generator | FAQ creation | Common questions
   | Structured FAQ |
  | site_feasibility_scorer | Site capability assessment | Protocol
  requirements | Feasibility score |
  | protocol_synopsis_generator | Synopsis generation | Full protocol
   | 1-2 page synopsis |
  
  Use Cases
  
  For Protocol Writers
  
  "I paste my protocol section and instantly see what needs fixing - saved me 3 review
  cycles!"
  
  For Study Coordinators
  
  "It catches inconsistencies I would have missed until the FDA pointed them out"
  
  For New Team Members
  
  "It's like having a senior coordinator review my work before I submit it"
  
  Development
  
  Project Structure
  
  protocol-assistant/
  ├── frontend/ # Next.js frontend application
  ├── api/ # API gateway layer
  ├── components/ # React components
  ├── lib/ # Utility functions
  ├── public/ # Static assets
  ├── tests/ # Test suites
  └── docs/ # Documentation
  
  Testing
  
  # Run frontend tests
  
  npm test
  
  # Run E2E tests
  
  npm run test:e2e
  
  Deployment
  
  The application is designed for Azure deployment:
  
  # Build for production
  
  npm run build
  
  # Deploy to Azure
  
  az webapp up --name protocol-assistant --resource-group dcri-tools
  
  Roadmap
  
  See checklist.md for detailed development phases.
  
  Contributing
  
6. Fork the repository
  
7. Create a feature branch
  
8. Make your changes
  
9. Add tests
  
10. Submit a pull request
  
  License
  
  MIT License - See LICENSE file for details
  
  Support
  
  For questions or issues:
  

- Create an issue in GitHub
- Contact the DCRI Tools Team
- Check the https://github.com/DCRI/dcri-mcp-tools
