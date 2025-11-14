# Environment Variables Template

## Backend Configuration (.env)

Copy this content to `server/.env` and fill in your values:

```
# MySQL Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=attendance_db

# Server Configuration
PORT=5000
NODE_ENV=development

# Default Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

## Configuration Details

### Database Variables
- **DB_HOST**: MySQL server address (default: localhost)
- **DB_USER**: MySQL username (default: root)
- **DB_PASSWORD**: MySQL password (change this!)
- **DB_NAME**: Database name (default: attendance_db)

### Server Variables
- **PORT**: Backend server port (default: 5000)
- **NODE_ENV**: Environment (development or production)

### Admin Variables
- **ADMIN_USERNAME**: Default admin username
- **ADMIN_PASSWORD**: Default admin password
  - Will be automatically hashed and created on first server start
  - Change these if the admin user doesn't exist yet

## Important Notes

⚠️ **Security Warning**: Never commit `.env` file to version control!
- The `.env` file is already in `.gitignore`
- Always keep credentials private
- For production, use strong passwords

## Changing Admin Credentials Later

To change admin credentials after initial setup:

### Option 1: Update via Database
```sql
-- In MySQL command line
UPDATE admin_users 
SET password = '[new_hashed_password]' 
WHERE username = 'admin';
```

### Option 2: Delete and Recreate
1. Update the `.env` file with new credentials
2. Delete the admin user from database:
   ```sql
   DELETE FROM admin_users WHERE username = 'admin';
   ```
3. Restart the server - it will create the user again

## Port Configuration

### Frontend (React)
- Default: 3000
- To change: `PORT=3001 npm start`

### Backend (Express)
- Default: 5000
- To change: Update `PORT=5000` in `.env`

## Production Deployment

For production deployment:
1. Set `NODE_ENV=production`
2. Use strong, unique passwords
3. Configure proper database backups
4. Use HTTPS/SSL certificates
5. Set up environment variables on your hosting platform

---

**Never share your .env file or commit it to git!**
