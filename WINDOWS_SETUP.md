# Attendance System - Windows Setup Guide

This guide is specifically for Windows users setting up the attendance system.

## Prerequisites

### 1. Install Node.js
- Download from [nodejs.org](https://nodejs.org/)
- Choose the LTS version
- Run the installer and follow the prompts
- Verify installation:
  ```powershell
  node --version
  npm --version
  ```

### 2. Install MySQL Server
- Download from [mysql.com](https://dev.mysql.com/downloads/mysql/)
- Or use MySQL Workbench for easier management
- Run the installer with default settings
- Note your root password during installation
- Verify installation by opening MySQL Command Line or Workbench

### 3. Install Git (Optional but Recommended)
- Download from [git-scm.com](https://git-scm.com/)
- Use default installation settings

## Project Setup

### Step 1: Database Configuration

1. **Open MySQL**:
   - Option A: Use MySQL Command Line (search "MySQL" in Start menu)
   - Option B: Use MySQL Workbench (GUI tool)

2. **Create Database**:
   ```sql
   CREATE DATABASE IF NOT EXISTS attendance_db;
   ```

3. **Create Tables**:
   Copy the entire content of `database.sql` from the project folder:
   - Paste it in MySQL Command Line, or
   - Use MySQL Workbench's "New Query Tab" and paste there
   - Execute all commands

4. **Verify**:
   ```sql
   USE attendance_db;
   SHOW TABLES;
   ```
   You should see two tables: `students` and `admin_users`

### Step 2: Backend Server Setup

1. **Open PowerShell**:
   - Right-click desktop → Open PowerShell window here (admin), OR
   - Press `Win + X`, select Windows PowerShell (Admin)

2. **Navigate to Server**:
   ```powershell
   cd C:\path\to\attendance\server
   ```

3. **Install Dependencies**:
   ```powershell
   npm install
   ```

4. **Configure Environment**:
   - Open `server/.env` in Notepad
   - Update with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=attendance_db
   PORT=5000
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```
   - Save the file

5. **Start Server**:
   ```powershell
   npm start
   ```
   ✅ You should see: "Server running on port 5000"

### Step 3: Frontend Setup

1. **Open Another PowerShell Window**:
   - Press `Win + X`, select Windows PowerShell (Admin)

2. **Navigate to Project Root**:
   ```powershell
   cd C:\path\to\attendance
   ```

3. **Install Dependencies**:
   ```powershell
   npm install
   ```

4. **Start React App**:
   ```powershell
   npm start
   ```
   ✅ Browser will automatically open to `http://localhost:3000`

## Testing the Application

### Test 1: Student Check-in
1. On the main page, enter:
   - Phone Number: `9876543210`
   - Name: `Test Student`
2. Click "Mark Present"
3. You should see: "Successfully marked as present"

### Test 2: Admin Login
1. Click "Admin Login →" link
2. Enter:
   - Username: `admin`
   - Password: `admin123`
3. Click "Login"
4. You should see the attendance dashboard

### Test 3: Check Admin Panel
- View today's attendance
- Change the date with the date picker
- Click status badges to toggle between Present/Absent
- Click "Export CSV" to download data

## Troubleshooting

### "MySQL connection error"
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution**: 
- Open Services (search "Services" in Start menu)
- Find "MySQL80" or similar
- Right-click → Start
- Wait 10 seconds for MySQL to fully start

### "npm: command not found"
**Solution**:
- Node.js might not be installed correctly
- Restart PowerShell after installing Node.js
- Close all PowerShell windows and open a new one

### "CORS error" in browser console
**Solution**:
- Backend must be running on port 5000
- Check PowerShell window showing backend
- If not running, restart it with `npm start`

### "Cannot find module 'mysql2'"
**Solution**:
```powershell
cd server
npm install
```

### "Address already in use"
**Solution**:
- Port 5000 or 3000 is already in use
- Close other applications using these ports
- Or change ports in `.env` and `npm start`

### "Login fails with default credentials"
**Solution**:
- Check that server has completely started
- Verify MySQL is running
- Delete the admin user and restart server:
  ```sql
  DELETE FROM admin_users;
  ```
  Then restart backend

## Using the Application

### For Students
1. Open app on their phone/browser
2. Enter phone number
3. Enter name (optional)
4. Click "Mark Present"

### For Admins
1. Click "Admin Login →"
2. Enter credentials
3. View attendance in dashboard
4. Filter by date
5. Click status to toggle present/absent
6. Export data to CSV

## Daily Usage

**Every Day**:
1. Make sure MySQL is running
2. Open PowerShell and start backend: `cd server && npm start`
3. Open another PowerShell and start frontend: `npm start`
4. Share the app URL with students

## Stopping the Application

1. In each PowerShell window running a server
2. Press `Ctrl + C`
3. Type `Y` if prompted

## Advanced: Change Ports

### Run Backend on Different Port
- Edit `server/.env`
- Change `PORT=5000` to `PORT=5001` (or any unused port)
- Restart backend

### Run Frontend on Different Port
```powershell
$env:PORT=3001; npm start
```

## Backup Your Data

### Backup Database
```powershell
# Using Windows Command Prompt (not PowerShell)
mysqldump -u root -p attendance_db > attendance_backup.sql
# Enter your MySQL password when prompted
```

### Restore Database
```powershell
mysql -u root -p attendance_db < attendance_backup.sql
```

## Uninstall / Reset

### Reset Database
```sql
DROP DATABASE attendance_db;
# Then run database.sql again to recreate
```

### Remove Node Modules
```powershell
# Frontend
rmdir node_modules -Recurse
npm install

# Backend
cd server
rmdir node_modules -Recurse
npm install
```

## Getting Help

1. Check the "Troubleshooting" section above
2. Read README.md in the project folder
3. Check console output in PowerShell for error messages
4. Verify all prerequisites are installed

---

**Setup Complete! 🎉**

The attendance system is now ready to use!
