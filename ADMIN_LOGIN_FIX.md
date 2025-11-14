# Fix for Admin Login Issue ✅

## Problem
Admin login returns 401 (Unauthorized) even with correct credentials.

## Solution

The admin user in the database needs to be recreated with a properly hashed password.

### Step 1: Run the Database Setup Script

In PowerShell, navigate to the server directory and run:

```powershell
cd server
node setup-db.js
```

You should see:
```
✓ Connected to MySQL
✓ Database created
✓ Students table created
✓ Admin users table created
✓ Admin user created with password: admin123

✓ Admin users in database: [ 'admin' ]

✅ Database setup completed successfully!

You can now login with:
  Username: admin
  Password: admin123
```

### Step 2: Restart the Backend Server

Kill the current server process (Ctrl+C) and restart:

```powershell
npm start
```

### Step 3: Test Admin Login

1. Go to http://localhost:3000
2. Click "Admin Login →"
3. Enter:
   - Username: `admin`
   - Password: `admin123`

You should now be able to login successfully! ✅

## Phone Number Validation ✅

Also included in this update:

- **Frontend**: Only allows 10 digits (numbers only)
- **Backend**: Validates phone number is exactly 10 digits
- Input field shows placeholder "1234567890"
- Non-numeric characters are automatically removed

## What Was Fixed

1. **Admin User Hash**: The stored password hash was invalid. The new setup script creates a properly hashed password using bcryptjs.

2. **Phone Number Validation**: 
   - Frontend input restricts to 10 digits
   - Backend validates phone format
   - Clear error messages for invalid input

## Troubleshooting

If you still get login errors:

### Check 1: Verify Admin User Exists
```sql
USE attendance_db;
SELECT * FROM admin_users;
```
You should see the admin user.

### Check 2: Check Server Console
Look for messages like:
- "Login failed: User 'admin' not found"
- "Login failed: Invalid password for user 'admin'"

These will tell you exactly what's wrong.

### Check 3: Verify .env File
Make sure `server/.env` contains:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=attendance_db
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Check 4: Run Setup Again
Delete the admin user and run the setup script again:
```sql
DELETE FROM admin_users WHERE username = 'admin';
```
Then run: `node setup-db.js`

---

**After running setup-db.js, admin login should work perfectly!** ✅
