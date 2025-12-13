#!/bin/bash

echo "🚀 Tour Admin Panel - Quick Setup"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your configuration!"
    echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your backend API URL and credentials"
echo "2. Run 'npm run dev' to start development server"
echo "3. Open http://localhost:3001 in your browser"
echo "4. Login with admin credentials from .env"
echo ""
echo "For deployment, see DEPLOYMENT.md"
echo ""
