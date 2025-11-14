# Quick Reference Card 📋

## 🚀 Start System (3 Commands)

```powershell
# Terminal 1 - Setup Database (First time only)
cd server
node setup-db.js

# Terminal 2 - Start Backend
npm start

# Terminal 3 - Start Frontend
cd attendance (from another terminal)
npm start
```

---

## 📱 Student Check-in

| Input | Validation | Result |
|-------|-----------|--------|
| Phone: `9876543210` | ✅ 10 digits | Accept |
| Phone: `987654321` | ❌ 9 digits | Reject |
| Phone: `987-654-3210` | ✅ Auto-remove dashes | Accept |
| Phone: `9876543a10` | ✅ Auto-remove 'a' | Accept `9876543 10` |
| Name: (optional) | Any text | Accept |

---

## 🔐 Admin Login

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |
| Result | ✅ Dashboard |

---

## 📊 Admin Dashboard Features

| Feature | How |
|---------|-----|
| View today's attendance | Auto-loads on login |
| View specific date | Use date picker |
| Toggle student status | Click status badge |
| Export to CSV | Click "Export CSV" button |
| Logout | Click "Logout" button |

---

## 🛠️ Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "Cannot find module 'mysql2'" | `npm install` in server folder |
| "ECONNREFUSED 127.0.0.1:3306" | Start MySQL service |
| "Login fails with correct password" | `node setup-db.js` to reset admin |
| "Phone validation not working" | Refresh browser or restart server |
| "Port 5000/3000 already in use" | Change PORT in .env or use different port |

---

## 📁 Important Files

| File | Edit For |
|------|----------|
| `server/.env` | Database & admin credentials |
| `database.sql` | Manual database setup |
| `src/components/StudentCheckIn.js` | Phone validation logic |
| `server/server.js` | Backend API endpoints |
| `src/App.js` | Frontend routing |

---

## 🔑 Change Admin Password

```sql
-- Option 1: Direct database
UPDATE admin_users SET password = 'newpass' WHERE username = 'admin';

-- Option 2: Via .env (then restart server)
ADMIN_PASSWORD=newpass
```

---

## 📊 Database Tables

### students
```
id | phone_number | name | date_recorded | time_recorded | status | created_at
```

### admin_users
```
id | username | password | created_at
```

---

## 📞 Valid Phone Numbers (Examples)

✅ `9876543210`
✅ `1234567890`
✅ `5551234567`
✅ `0000000000`
✅ `9999999999`

---

## ❌ Invalid Phone Numbers

❌ `987654321` (9 digits)
❌ `98765432101` (11 digits)
❌ `+919876543210` (has +)
❌ `(123) 456-7890` (has special chars)
❌ `abc1234567890` (has letters)

---

## 🌐 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://10.30.10.3:5000/ |
| Student Form | http://localhost:3000 |
| Admin Login | http://localhost:3000 (click link) |
| Admin Dashboard | http://localhost:3000 (after login) |

---

## 📝 Default Setup

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=test          # Change this!
DB_NAME=attendance_db
DB_PORT=3306              # Or your MySQL port
PORT=5000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123   # Change this!
```

---

## 🚦 Server Status Indicators

| Status | Meaning |
|--------|---------|
| "Database initialized successfully" | ✅ DB ready |
| "Server running on port 5000" | ✅ Backend ready |
| "Compiled successfully!" | ✅ Frontend ready |
| Error messages in console | ❌ Check logs |

---

## 💾 Backup Data

```powershell
# Backup database
mysqldump -u root -p attendance_db > backup.sql

# Restore database
mysql -u root -p attendance_db < backup.sql
```

---

## 🧹 Reset Everything

```sql
-- Drop database
DROP DATABASE attendance_db;

-- Then run setup again
node setup-db.js
```

---

## 📋 Daily Operations

**Morning**: Start both servers (backend + frontend)
**During Class**: Students check in with phone numbers
**After Class**: Admin reviews attendance in dashboard
**Export**: Download CSV for records

---

## 🎯 Key Reminders

✅ **Phone numbers**: Exactly 10 digits, numbers only
✅ **Admin login**: Use `admin` / `admin123`
✅ **Backend port**: 5000
✅ **Frontend port**: 3000
✅ **Database**: Auto-created on first server start
✅ **Passwords**: Stored as plain text (not hashed)

---

**That's it! You're ready to go!** 🎉

For more info, see: `README.md` or `RUNNING_THE_SYSTEM.md`
