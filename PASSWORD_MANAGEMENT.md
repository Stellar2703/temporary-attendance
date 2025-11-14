# Password Management - No Hashing ✅

## Changes Made

✅ **Removed bcryptjs dependency** - Passwords are now stored and compared directly in the database

✅ **Simplified authentication** - Direct string comparison instead of hashing

✅ **Direct password storage** - Passwords stored as plain text in database

## How It Works

### Database Setup
Passwords are stored directly in the `admin_users` table:
```sql
INSERT INTO admin_users (username, password) VALUES ('admin', 'admin123');
```

### Login Process
When logging in:
1. User submits username and password
2. Server retrieves user from database
3. Server compares password strings directly
4. If they match exactly, login succeeds

## Setting Admin Passwords

### Option 1: Use .env File (Automatic)
When the server starts, it automatically creates/updates the admin user using credentials from `server/.env`:

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Option 2: Insert Directly in MySQL
```sql
INSERT INTO admin_users (username, password) VALUES ('your_username', 'your_password');
```

### Option 3: Update Existing User
```sql
UPDATE admin_users SET password = 'new_password' WHERE username = 'admin';
```

## Setup Steps

### Step 1: Configure .env
Edit `server/.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=test
DB_NAME=attendance_db
PORT=5000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Step 2: Run Setup Script (Optional)
This automatically creates/resets the admin user:
```powershell
cd server
node setup-db.js
```

### Step 3: Start Server
```powershell
npm start
```

The admin user will be created automatically if it doesn't exist.

## Testing Login

1. Start the server
2. Open http://localhost:3000
3. Click "Admin Login →"
4. Enter:
   - Username: `admin`
   - Password: `admin123`

You should see the dashboard immediately!

## Changing Admin Password

### Method 1: Update .env and Restart Server
```
ADMIN_PASSWORD=newsecurepassword
```
Then restart the server.

### Method 2: Update Directly in Database
```sql
UPDATE admin_users SET password = 'newsecurepassword' WHERE username = 'admin';
```

### Method 3: Delete and Recreate
```sql
DELETE FROM admin_users WHERE username = 'admin';
-- Then restart server to recreate with new password from .env
```

## Adding More Admin Users

```sql
INSERT INTO admin_users (username, password) VALUES ('user2', 'password123');
INSERT INTO admin_users (username, password) VALUES ('user3', 'password456');
```

## Verify Admin Users Exist

```sql
SELECT * FROM admin_users;
```

You should see all admin users and their passwords.

---

**Passwords are now stored as plain text for simplicity!** 🔓
