const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  try {
    console.log('Connecting to MySQL...');
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 3306,
    });

    console.log('✓ Connected to MySQL');

    // Create database
    console.log('Creating database...');
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log('✓ Database created');

    // Switch to database
    await connection.query(`USE ${process.env.DB_NAME}`);

    // Create students table
    console.log('Creating students table...');
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
    console.log('✓ Students table created');

    // Create admin_users table
    console.log('Creating admin_users table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Admin users table created');

    // Delete existing admin user (to reset)
    console.log('Resetting admin user...');
    await connection.query('DELETE FROM admin_users WHERE username = ?', [process.env.ADMIN_USERNAME]);

    // Create new admin user (no hashing)
    console.log(`Creating admin user: ${process.env.ADMIN_USERNAME}`);
    
    await connection.query(
      'INSERT INTO admin_users (username, password) VALUES (?, ?)',
      [process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD]
    );
    console.log(`✓ Admin user created with password: ${process.env.ADMIN_PASSWORD}`);

    // Verify the user was created
    const [users] = await connection.query('SELECT username FROM admin_users');
    console.log('\n✓ Admin users in database:', users.map(u => u.username));

    await connection.end();
    console.log('\n✅ Database setup completed successfully!');
    console.log(`\nYou can now login with:`);
    console.log(`  Username: ${process.env.ADMIN_USERNAME}`);
    console.log(`  Password: ${process.env.ADMIN_PASSWORD}`);
    
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  }
}

setupDatabase();
