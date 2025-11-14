# Quick Start Guide

## Step-by-Step Setup

### Prerequisites Check
- [ ] Node.js installed (`node --version`)
- [ ] MySQL installed and running (`mysql --version`)
- [ ] Git installed (`git --version`)

### Step 1: Database Setup (5 minutes)

1. Open MySQL Command Line or MySQL Workbench
2. Copy and paste the entire content from `database.sql`
3. Execute the SQL commands
4. Verify tables are created:
   ```sql
   USE attendance_db;
   SHOW TABLES;
   ```

### Step 2: Backend Setup (5 minutes)

**Open a terminal/PowerShell:**

```powershell
# Navigate to server directory
cd server

# Install dependencies
npm install

# Configure your MySQL credentials in .env file
# Edit server/.env and update:
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_mysql_password
# DB_NAME=attendance_db

# Start the server
npm start
```

✅ You should see: "Server running on port 5000"

### Step 3: Frontend Setup (5 minutes)

**Open another terminal/PowerShell in the attendance directory:**

```powershell
# Install dependencies
npm install

# Start React app
npm start
```

✅ Browser will open automatically to `http://localhost:3000`

## Testing the Application

### Test Student Check-in:
1. Enter a phone number (e.g., 9876543210)
2. Enter a name (optional)
3. Click "Mark Present"
4. Should see: "Successfully marked as present"

### Test Admin Panel:
1. Click "Admin Login →"
2. Username: `admin`
3. Password: `admin123`
4. You should see the attendance dashboard

## Default Credentials

- **Username**: admin
- **Password**: admin123

*Change these in `server/.env` and restart the server if needed*

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Cannot find module 'mysql2'" | Run `npm install` in the server directory |
| "ECONNREFUSED 127.0.0.1:3306" | MySQL is not running. Start MySQL service |
| "Access denied for user 'root'" | Update `DB_PASSWORD` in `server/.env` |
| "CORS error" | Make sure backend is running on port 5000 |
| "Phone number already exists" | That student already checked in today |

## Project Files Overview

```
📁 attendance/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── StudentCheckIn.js    ← Student form
│   │   ├── AdminLogin.js        ← Admin login
│   │   └── AdminPanel.js        ← Dashboard
│   ├── App.js                   ← Main component
│   └── App.css                  ← Styling
├── 📁 server/
│   ├── server.js                ← Express API
│   ├── package.json
│   └── .env                     ← Config
├── database.sql                 ← Database schema
├── README.md                    ← Full documentation
└── QUICKSTART.md                ← This file
```

## API Quick Reference

### Student Check-in
```bash
POST http://10.30.10.3:5000/api/checkin
Content-Type: application/json

{
  "phone_number": "9876543210",
  "name": "John Doe"
}
```

### Admin Login
```bash
POST http://10.30.10.3:5000/api/admin/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

### View Today's Attendance
```bash
GET http://10.30.10.3:5000/api/admin/attendance
```

### View Attendance by Date
```bash
GET http://10.30.10.3:5000/api/admin/attendance/2025-11-12
```

## Next Steps

1. **Customize Admin Credentials**: Edit `server/.env`
2. **Change Database Password**: Update `DB_PASSWORD` in `server/.env`
3. **Deploy to Production**: See README.md for deployment guide
4. **Add More Features**: Check the "Future Enhancements" section in README.md

## Support

If you encounter any issues:
1. Check the "Troubleshooting" section in README.md
2. Verify all prerequisites are installed
3. Check console for error messages
4. Ensure both servers are running (backend on 5000, frontend on 3000)

---

**Happy Attendance Tracking! 📱✅**
