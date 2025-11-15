-- Create Database
CREATE DATABASE IF NOT EXISTS attendance_db;
USE attendance_db;

-- Create Students Table
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  registration_id VARCHAR(20) UNIQUE NOT NULL,
  phone_number VARCHAR(15) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  college_name VARCHAR(100) NOT NULL,
  date_recorded DATE NOT NULL,
  time_recorded TIME NOT NULL,
  status ENUM('present', 'absent') DEFAULT 'present',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_phone (phone_number),
  INDEX idx_date (date_recorded),
  INDEX idx_registration (registration_id)
);

-- Create Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Default Admin User (password stored directly, no hashing)
INSERT INTO admin_users (username, password) VALUES 
('bit', 'bit@!23');
