const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  port: process.env.DB_PORT || 3306,
  connectionLimit: 10,
  queueLimit: 0,
});

// Initialize Database
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Create students table
    await connection.query(`
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
      )
    `);

    // Create admin users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Check if default admin exists
    const [adminExists] = await connection.query(
      'SELECT * FROM admin_users WHERE username = ?',
      [process.env.ADMIN_USERNAME]
    );

    if (adminExists.length === 0) {
      await connection.query(
        'INSERT INTO admin_users (username, password) VALUES (?, ?)',
        [process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD]
      );
      console.log('Default admin user created');
    }

    connection.release();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  }
}

// Routes

// Student check-in
app.post('/api/checkin', async (req, res) => {
  try {
    const { phone_number, name } = req.body;

    if (!phone_number) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    // Validate phone number: must be exactly 10 digits
    if (!/^\d{10}$/.test(phone_number)) {
      return res.status(400).json({ error: 'Phone number must be exactly 10 digits' });
    }

    const connection = await pool.getConnection();

    // Check if already marked present today
    const [existing] = await connection.query(
      'SELECT * FROM students WHERE phone_number = ? AND DATE(date_recorded) = CURDATE()',
      [phone_number]
    );

    if (existing.length > 0) {
      connection.release();
      return res.status(409).json({ 
        message: 'Already marked as present today',
        data: existing[0]
      });
    }

    // Insert new attendance with current date and time
    await connection.query(
      'INSERT INTO students (phone_number, name, date_recorded, time_recorded, status) VALUES (?, ?, CURDATE(), CURTIME(), ?)',
      [phone_number, name || 'Unknown', 'present']
    );

    connection.release();
    res.json({ 
      message: 'Successfully marked as present',
      phone_number 
    });
  } catch (error) {
    console.error('Check-in error:', error);
    res.status(500).json({ error: 'Error during check-in' });
  }
});

// Admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const connection = await pool.getConnection();

    const [users] = await connection.query(
      'SELECT * FROM admin_users WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      connection.release();
      console.log(`Login failed: User '${username}' not found`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Direct password comparison (no hashing)
    if (password !== users[0].password) {
      connection.release();
      console.log(`Login failed: Invalid password for user '${username}'`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    connection.release();
    console.log(`Login successful for user '${username}'`);
    res.json({ 
      message: 'Login successful',
      token: 'admin_token_' + Date.now()
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login error' });
  }
});

// Get attendance data
app.get('/api/admin/attendance', async (req, res) => {
  try {
    const connection = await pool.getConnection();

    const [students] = await connection.query(
      'SELECT * FROM students WHERE DATE(date_recorded) = CURDATE() ORDER BY time_recorded DESC'
    );

    // Get summary
    const present = students.filter(s => s.status === 'present').length;
    const absent = students.filter(s => s.status === 'absent').length;

    connection.release();

    res.json({
      data: students,
      summary: {
        total: students.length,
        present,
        absent
      }
    });
  } catch (error) {
    console.error('Attendance fetch error:', error);
    res.status(500).json({ error: 'Error fetching attendance data' });
  }
});

// Get attendance by date
app.get('/api/admin/attendance/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const connection = await pool.getConnection();

    const [students] = await connection.query(
      'SELECT * FROM students WHERE DATE(date_recorded) = ? ORDER BY time_recorded DESC',
      [date]
    );

    const present = students.filter(s => s.status === 'present').length;
    const absent = students.filter(s => s.status === 'absent').length;

    connection.release();

    res.json({
      data: students,
      summary: {
        total: students.length,
        present,
        absent
      }
    });
  } catch (error) {
    console.error('Attendance fetch error:', error);
    res.status(500).json({ error: 'Error fetching attendance data' });
  }
});

// Update attendance status
app.put('/api/admin/attendance/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['present', 'absent'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const connection = await pool.getConnection();

    await connection.query(
      'UPDATE students SET status = ? WHERE id = ?',
      [status, id]
    );

    connection.release();
    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Error updating status' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
