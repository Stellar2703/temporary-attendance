# Attendance System Setup Script for Windows

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Attendance System Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($null -eq $nodeVersion) {
    Write-Host "X Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}
Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
Write-Host ""

# Check npm
Write-Host "Checking npm..." -ForegroundColor Yellow
$npmVersion = npm --version 2>$null
if ($null -eq $npmVersion) {
    Write-Host "X npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}
Write-Host "✓ npm is installed: $npmVersion" -ForegroundColor Green
Write-Host ""

# Install server dependencies
Write-Host "Installing server dependencies..." -ForegroundColor Yellow
Set-Location server
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "X Failed to install server dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Server dependencies installed" -ForegroundColor Green
Write-Host ""

# Return to root
Set-Location ..

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "X Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
Write-Host ""

Write-Host "================================" -ForegroundColor Cyan
Write-Host "✓ Setup Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Set up the MySQL database:" -ForegroundColor White
Write-Host "   - Open MySQL command line or MySQL Workbench" -ForegroundColor Gray
Write-Host "   - Copy all commands from database.sql and execute them" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Update server configuration:" -ForegroundColor White
Write-Host "   - Edit server/.env with your MySQL credentials" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Start the server:" -ForegroundColor White
Write-Host "   - cd server" -ForegroundColor Gray
Write-Host "   - npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "4. In another PowerShell, start the frontend:" -ForegroundColor White
Write-Host "   - npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host ""
Write-Host "Default admin credentials:" -ForegroundColor Cyan
Write-Host "  Username: admin" -ForegroundColor Gray
Write-Host "  Password: admin123" -ForegroundColor Gray
