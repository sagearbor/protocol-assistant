# Protocol Assistant - Complete Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- dcri-mcp-tools server running on port 8210
- Git installed

### Step 1: Start the MCP Server
```bash
# In a separate terminal
cd ../dcri-mcp-tools
python server.py
# Server will run on http://localhost:8210
```

### Step 2: Start Protocol Assistant
```bash
# In this directory
npm install           # Install dependencies (if not done)
npm run dev          # Start development server on port 8250
```

### Step 3: Open Application
Navigate to: http://localhost:8250

## 📋 What Was Built Tonight

### ✅ Phase 1: Foundation - COMPLETED
- Next.js app with TypeScript
- Tailwind CSS styling
- Document input with tabs (Protocol/ICF/Other)
- Results display panel
- Loading states and error handling
- MCP server health check
- Export to JSON/HTML

### ✅ Phase 2: Core Protocol Tools - COMPLETED
All MCP tools integrated:
- `clinical_protocol_qa` - Q&A analysis
- `protocol_consistency_checker` - Find inconsistencies
- `protocol_compliance_scorer` - Regulatory compliance
- `inclusion_exclusion_checker` - I/E criteria validation

### ✅ Phase 3: Document Enhancement - COMPLETED
- `glossary_manager` - Medical term glossary
- `faq_generator` - Auto-generate FAQs
- `site_feasibility_scorer` - Site capability assessment
- `protocol_synopsis_generator` - Create synopsis
- `consent_grade_checker` - Reading level analysis

### ✅ Phase 4: UI/UX Polish - COMPLETED
- Dashboard with score cards
- Document history tracking
- Template management
- Local storage persistence
- Export functionality

### ✅ Phase 5: Production Features - MOSTLY COMPLETED
- Docker containerization
- Azure deployment config
- Testing suite with Jest
- GitHub Actions CI/CD
- Error handling throughout

## 🧪 Testing the Application

### Run Tests
```bash
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

### Manual Testing
1. Use the sample consent form in `sample-documents/sample-consent.txt`
2. Try all 9 analysis tools
3. Test export functionality
4. Check history and templates

## 📁 Project Structure
```
protocol-assistant/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── Dashboard.tsx      # Score dashboard
│   ├── DocumentInput.tsx  # Input interface
│   ├── History.tsx        # History viewer
│   ├── ResultsPanel.tsx   # Results display
│   └── Templates.tsx      # Template manager
├── lib/                   # Utilities
│   ├── export-utils.ts    # Export functions
│   ├── mcp-client.ts      # MCP API client
│   └── storage.ts         # Local storage
├── types/                 # TypeScript types
│   └── mcp.ts            # MCP tool types
├── __tests__/            # Test files
├── sample-documents/      # Test documents
└── public/               # Static files
```

## 🔧 Configuration

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_MCP_SERVER_URL=http://localhost:8210
MCP_SERVER_URL=http://localhost:8210
```

### Ports
- Protocol Assistant: 8250
- MCP Tools Server: 8210

## 🚢 Deployment

### Docker
```bash
docker build -t protocol-assistant .
docker run -p 3000:3000 protocol-assistant
```

### Azure
1. Push to GitHub
2. Configure Azure App Service
3. Set up publish profile secret
4. Deploy via GitHub Actions

## 📊 Features Overview

### Document Analysis
- Paste any clinical trial document
- Select from 9 analysis tools
- Get instant feedback
- No PHI/PII stored

### Analysis Tools
1. **Reading Level**: Check consent form readability
2. **Consistency**: Find document inconsistencies
3. **Compliance**: Regulatory compliance scoring
4. **I/E Criteria**: Validate inclusion/exclusion logic
5. **Protocol Q&A**: Answer protocol questions
6. **Glossary**: Generate medical term definitions
7. **FAQ Generator**: Create FAQs automatically
8. **Site Feasibility**: Assess execution capability
9. **Synopsis**: Generate protocol summary

### Export Options
- JSON format for data processing
- HTML report for sharing
- History tracking for all analyses
- Template management for common documents

## 🎯 Next Steps

### Tomorrow's Tasks
1. Test with real protocol documents
2. Gather user feedback
3. Fine-tune UI based on usage
4. Deploy to Azure for team access

### Future Enhancements
- Azure AD authentication
- Advanced analytics dashboard
- Batch document processing
- API for external integration

## 🆘 Troubleshooting

### MCP Server Not Connecting
- Verify server is running on port 8210
- Check `http://localhost:8210/health`
- Ensure no firewall blocking

### Build Errors
```bash
rm -rf node_modules .next
npm install
npm run build
```

### Port Already in Use
Change port in package.json:
```json
"dev": "next dev -p 8251"
```

## 📝 Notes

- All document processing happens in memory
- No PHI/PII data is ever stored
- History limited to 20 items
- Templates stored in localStorage
- Designed for clinical trial teams

## 🎉 Summary

The Protocol Assistant is now fully functional with:
- ✅ All 9 MCP tools integrated
- ✅ Complete UI with dashboard
- ✅ Export and history features
- ✅ Testing suite ready
- ✅ Production deployment configured

Ready for use tomorrow morning! The application provides instant feedback on clinical trial documents without changing how teams work.