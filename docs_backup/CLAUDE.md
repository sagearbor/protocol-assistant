# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Protocol Assistant is a web application for analyzing clinical trial documents (protocols, informed consent forms, etc.) using MCP tool integrations. It provides instant feedback on document quality, compliance, and consistency without storing any PHI/PII data.

## Development Commands

### Initial Setup
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Configure MCP_SERVER_URL in .env (default: http://localhost:8210)

# Start development server
npm run dev
```

### Testing
```bash
# Run frontend tests
npm test

# Run E2E tests
npm run test:e2e
```

### Build & Deployment
```bash
# Build for production
npm run build

# Deploy to Azure
az webapp up --name protocol-assistant --resource-group dcri-tools
```

## Architecture

The application follows a Next.js/React frontend architecture that communicates with an MCP Tools Server:

```
Frontend (Next.js/React) → API Gateway → MCP Tool Server (port 8210) → Individual MCP Tools
```

### Key MCP Tools Integration Points

The application integrates with these MCP tools from the dcri-mcp-tools server:
- **clinical_protocol_qa**: Protocol Q&A analysis
- **protocol_consistency_checker**: Internal consistency validation
- **protocol_compliance_scorer**: Regulatory compliance scoring (0-100)
- **inclusion_exclusion_checker**: I/E criteria logic validation
- **consent_grade_checker**: Reading level analysis for consent forms
- **glossary_manager**: Medical term glossary generation
- **faq_generator**: FAQ creation from protocols
- **site_feasibility_scorer**: Site capability assessment
- **protocol_synopsis_generator**: 1-2 page synopsis generation

### Frontend Stack
- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS + Radix UI components
- **State Management**: Zustand or Context API
- **Authentication**: Azure AD with MSAL (production)

## Development Approach

### When implementing new features:
1. Check checklist.md for development phases and priorities
2. Follow the phased approach: Foundation → Core Tools → Enhancement → UX → Production
3. Never store documents - process in memory only
4. Prioritize speed - analysis should complete in < 30 seconds
5. Start with Protocol documents, then expand to ICF and others

### MCP Tool Integration Pattern
When integrating a new MCP tool:
1. Add API endpoint in the gateway layer
2. Create UI component for input/output
3. Add loading states and error handling
4. Display results in appropriate format (scores, lists, reports)
5. Include export functionality (PDF/Word)

### Security Considerations
- Never store PHI/PII data
- Process documents in memory only
- Use Azure AD authentication in production
- Implement audit logging for compliance
- Follow data retention policies

## Testing Requirements

Before committing changes:
1. Run unit tests for new components
2. Test MCP server connectivity
3. Verify document analysis completes in < 30 seconds
4. Test error states and edge cases
5. Ensure no PHI/PII is logged or stored

## Azure Deployment Configuration

The application is designed for Azure App Service deployment with:
- Azure Front Door for CDN
- Application Insights for monitoring
- Azure AD integration for authentication
- Appropriate CORS configuration for MCP server access