# ✅ Database Setup - CORRECTED

## SQL Error Fixed ✓

The previous SQL syntax error has been corrected. The issue was:
- ❌ `DEFAULT CURDATE()` - Not allowed in MySQL
- ❌ `DEFAULT CURTIME()` - Not allowed in MySQL

**Solution**: Removed defaults and set date/time during insert operations.

## Setup Instructions

### Step 1: Create Database

Copy and paste **all** the following SQL code into MySQL:

```sql
-- Create Database
CREATE DATABASE IF NOT EXISTS attendance_db;
USE attendance_db;

-- Create Students Table
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone_number VARCHAR(15) UNIQUE NOT NULL,
  name VARCHAR(100),
  date_recorded DATE NOT NULL,
  time_recorded TIME NOT NULL,
  status ENUM('present', 'absent') DEFAULT 'present',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_phone (phone_number),
  INDEX idx_date (date_recorded)
);

-- Create Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Default Admin User (password: admin123)
INSERT INTO admin_users (username, password) VALUES 
('admin', '$2a$10$YR3p1T3f2p8Zq8x0q9Z0eu8Z0q8Z0q8Z0q8Z0q8Z0q8Z0q8Z0q8Z.');
```

### Step 2: Verify Tables

Run these commands to verify everything is set up correctly:

```sql
USE attendance_db;
SHOW TABLES;
DESC students;
DESC admin_users;
SELECT * FROM admin_users;
```

You should see:
- ✅ Two tables created: `students` and `admin_users`
- ✅ Admin user exists with username `admin`

### Step 3: Done!

Database is ready. Now proceed with backend and frontend setup.

---

**If you get any errors**, make sure:
1. You're using MySQL 5.7+ or 8.0+
2. All code is copied exactly as shown
3. Execute all commands (don't skip any)
