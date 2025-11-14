#!/bin/bash

# Attendance System Setup Script

echo "================================"
echo "Attendance System Setup"
echo "================================"
echo ""

# Check Node.js
echo "Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi
echo "✅ Node.js is installed: $(node --version)"
echo ""

# Check npm
echo "Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi
echo "✅ npm is installed: $(npm --version)"
echo ""

# Check MySQL
echo "Checking MySQL..."
if ! command -v mysql &> /dev/null; then
    echo "⚠️  MySQL command line not found. Make sure MySQL server is running."
else
    echo "✅ MySQL is installed"
fi
echo ""

# Install server dependencies
echo "Installing server dependencies..."
cd server
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install server dependencies"
    exit 1
fi
echo "✅ Server dependencies installed"
echo ""

# Return to root
cd ..

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
echo "✅ Frontend dependencies installed"
echo ""

echo "================================"
echo "✅ Setup Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Set up the MySQL database:"
echo "   - Open MySQL command line"
echo "   - Run the commands from database.sql"
echo ""
echo "2. Update server configuration:"
echo "   - Edit server/.env with your MySQL credentials"
echo ""
echo "3. Start the server:"
echo "   - cd server && npm start"
echo ""
echo "4. In another terminal, start the frontend:"
echo "   - npm start"
echo ""
echo "5. Open http://localhost:3000 in your browser"
echo ""
echo "Default admin credentials:"
echo "  Username: admin"
echo "  Password: admin123"
