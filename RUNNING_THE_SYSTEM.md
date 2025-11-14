# Running the Updated System 🚀

## What Changed?

✅ **Phone Validation**: Strict 10-digit format (numbers only)
✅ **Password Storage**: Plain text (no hashing)
✅ **Easier Setup**: Simpler authentication flow

## Quick Start (3 Steps)

### Step 1: Setup Database

**Option A: Use setup script (Recommended)**
```powershell
cd server
node setup-db.js
```

**Option B: Manual SQL**
Copy and paste all content from `database.sql` into MySQL command line or Workbench.

### Step 2: Start Backend

```powershell
# In server directory
npm start
```

Expected output:
```
✓ Database initialized successfully
✓ Server running on port 5000
```

### Step 3: Start Frontend

```powershell
# In root directory (another PowerShell window)
npm start
```

Browser will open to: `http://localhost:3000` ✅

---

## Testing the System

### Test 1: Student Check-in ✓

1. **Valid phone number (10 digits)**:
   - Enter: `9876543210`
   - Result: ✅ Success message

2. **Invalid phone number**:
   - Enter: `98765432` (8 digits)
   - Result: ❌ "Phone number must be exactly 10 digits"

3. **Non-numeric input**:
   - Try typing: `987-654-3210`
   - Result: Auto-removes dashes, keeps only digits

4. **Duplicate check-in same day**:
   - Check in once with: `9876543210`
   - Check in again with same number
   - Result: ℹ️ "Already marked as present today"

### Test 2: Admin Login ✓

1. Click "Admin Login →"
2. Enter:
   - Username: `admin`
   - Password: `admin123`
3. Click "Login"
4. Expected: ✅ Dashboard loads with today's attendance

### Test 3: Admin Dashboard ✓

1. View summary cards (Total, Present, Absent)
2. Click date picker and select different date
3. Click on status badges to toggle Present ↔ Absent
4. Click "Export CSV" to download data

---

## Troubleshooting

### Issue: Server won't start

```
Error: Cannot find module 'mysql2'
```

**Solution**:
```powershell
cd server
npm install
npm start
```

### Issue: Database connection error

```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**Solution**:
1. Check MySQL is running
2. Verify credentials in `server/.env`:
   - `DB_HOST=localhost`
   - `DB_USER=root`
   - `DB_PASSWORD=your_password`
   - `DB_PORT=3306` (or your MySQL port)

### Issue: Admin login fails (401 Unauthorized)

**Solution 1: Reset Admin User**
```powershell
cd server
node setup-db.js
```

**Solution 2: Check database**
```sql
USE attendance_db;
SELECT * FROM admin_users;
```

Should show: `admin | admin123`

**Solution 3: Verify .env**
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Issue: Phone validation not working

**Frontend**: Refresh browser (F5)
**Backend**: Restart server (Ctrl+C, then npm start)

---

## Customizing Settings

### Change Admin Credentials

**In `server/.env`**:
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=supersecret123
```

Restart server - admin user will be recreated with new password.

### Change Database Port

If MySQL runs on different port (e.g., 3307):
```
DB_PORT=3307
```

### Change Backend Port

```
PORT=8000
```

Then access at: `http://localhost:3000` (frontend) and backend at port 8000

---

## File Locations

| File | Purpose |
|------|---------|
| `server/.env` | Database & admin credentials |
| `database.sql` | Database schema |
| `src/components/StudentCheckIn.js` | Phone validation code |
| `server/server.js` | API endpoints |
| `PASSWORD_MANAGEMENT.md` | Password handling guide |

---

## Common Commands

**Start backend**:
```powershell
cd server && npm start
```

**Start frontend**:
```powershell
npm start
```

**Reset database**:
```powershell
cd server && node setup-db.js
```

**View admin users**:
```sql
SELECT * FROM admin_users;
```

**Add admin user**:
```sql
INSERT INTO admin_users (username, password) VALUES ('newuser', 'newpass');
```

---

## API Endpoints (For Reference)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/checkin` | Student check-in |
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/attendance` | Today's attendance |
| GET | `/api/admin/attendance/:date` | Attendance by date |
| PUT | `/api/admin/attendance/:id` | Update status |

---

## Phone Number Format

**Valid Examples** ✅
- `1234567890`
- `9876543210`
- `5551234567`

**Invalid Examples** ❌
- `123` (too short)
- `12345678901` (too long)
- `(123) 456-7890` (special chars)
- `+919876543210` (international format)

**How it works**:
- Input restricts to 10 digits
- Non-numeric characters are removed
- Validation message if wrong format

---

## Database Tables

### students table
```sql
id | phone_number | name | date_recorded | time_recorded | status | created_at
```

### admin_users table
```sql
id | username | password | created_at
```

---

## Next Steps

1. ✅ Run the system using steps above
2. ✅ Test all features
3. ✅ Customize credentials if needed
4. ✅ Create student accounts (just phone numbers)
5. ✅ Start taking attendance!

---

## Support Files

- `README.md` - Complete documentation
- `PASSWORD_MANAGEMENT.md` - Password handling
- `UPDATES_SUMMARY.md` - What changed
- `QUICKSTART.md` - Quick reference
- `WINDOWS_SETUP.md` - Windows-specific guide

---

**System is ready to use!** 🎉

Any questions? Check the documentation files above.
