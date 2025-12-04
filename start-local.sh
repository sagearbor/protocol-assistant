#!/bin/bash

echo "Protocol Assistant - Local Development Setup"
echo "============================================"
echo ""

# Check if MCP server is running
echo "Checking MCP server status..."
if curl -s http://localhost:8210/health > /dev/null 2>&1; then
    echo "✓ MCP server is running on port 8210"
else
    echo "✗ MCP server is not running on port 8210"
    echo ""
    echo "Please start the MCP server first:"
    echo "  cd ../dcri-mcp-tools"
    echo "  python server.py"
    echo ""
    read -p "Press Enter once the MCP server is running..."
fi

echo ""
echo "Starting Next.js development server on port 8250..."
echo "Open http://localhost:8250 in your browser"
echo ""

npm run dev