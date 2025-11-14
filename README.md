# Attendance System - React + Node.js + MySQL

A complete attendance tracking system where students can check in using their phone number, and admins can view and manage attendance records.

## Features

- ✅ **Student Check-in**: Students enter phone number and name to mark themselves as present
- ✅ **Admin Panel**: View all attendance records with real-time filtering
- ✅ **Admin Login**: Secure authentication system
- ✅ **Status Management**: Toggle student status between present/absent
- ✅ **Date Filtering**: View attendance by specific date
- ✅ **Export to CSV**: Download attendance records as CSV
- ✅ **Responsive Design**: Works on desktop and mobile devices
- ✅ **MySQL Database**: Persistent data storage

## Project Structure

```
attendance/
├── public/
├── src/
│   ├── components/
│   │   ├── StudentCheckIn.js     # Student check-in form
│   │   ├── AdminLogin.js         # Admin login page
│   │   └── AdminPanel.js         # Admin dashboard
│   ├── App.js                    # Main app component
│   ├── App.css                   # Global styles
│   └── index.js
├── server/
│   ├── server.js                 # Express backend
│   ├── package.json              # Backend dependencies
│   └── .env                      # Environment variables
├── database.sql                  # Database schema
├── package.json                  # Frontend dependencies
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MySQL Server
- Git

## Setup Instructions

### 1. Database Setup

1. Open MySQL command line or MySQL Workbench
2. Run the SQL commands from `database.sql`:
   ```sql
   CREATE DATABASE IF NOT EXISTS attendance_db;
   USE attendance_db;
   
   CREATE TABLE IF NOT EXISTS students (
     id INT AUTO_INCREMENT PRIMARY KEY,
     phone_number VARCHAR(15) UNIQUE NOT NULL,
     name VARCHAR(100),
     date DATE NOT NULL DEFAULT CURDATE(),
     time TIME NOT NULL DEFAULT CURTIME(),
     status ENUM('present', 'absent') DEFAULT 'present',
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     INDEX idx_phone (phone_number),
     INDEX idx_date (date)
   );
   
   CREATE TABLE IF NOT EXISTS admin_users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(100) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

3. The default admin user will be created automatically when the server starts:
   - **Username**: `admin`
   - **Password**: `admin123`

### 2. Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=attendance_db
   PORT=5000
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```

4. Start the backend server:
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

   The server will run on `http://10.30.10.3:5000/`

### 3. Frontend Setup

1. Go back to the root directory:
   ```bash
   cd ..
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The app will run on `http://localhost:3000`

## Usage

### Student Check-in

1. Open the app at `http://localhost:3000`
2. Enter your phone number (required) - **Must be exactly 10 digits, numbers only**
   - Example: `9876543210`
   - Letters and special characters are automatically removed
   - Limited to 10 digits maximum
3. Enter name (optional)
4. Click "Mark Present"
5. You'll see a success message if you're marked as present
6. If you try to check in again on the same day, you'll see a notification

**Phone Number Validation:**
- ✅ Must contain only digits (0-9)
- ✅ Must be exactly 10 digits long
- ✅ Frontend prevents invalid input
- ✅ Backend validates for extra security

### Admin Panel

1. Click "Admin Login →" at the bottom of the student form
2. Log in with default credentials:
   - Username: `admin`
   - Password: `admin123`
3. If login fails, run the setup script (see Troubleshooting section)
3. View the attendance dashboard with:
   - Total students count
   - Present students count
   - Absent students count
4. Use the date picker to view attendance for different dates
5. Click on a status badge to toggle between "Present" and "Absent"
6. Click "Export CSV" to download attendance records

## API Endpoints

### Student Endpoints

- **POST** `/api/checkin`
  - Request body: `{ phone_number: string, name?: string }`
  - Response: `{ message: string, phone_number: string }`

### Admin Endpoints

- **POST** `/api/admin/login`
  - Request body: `{ username: string, password: string }`
  - Response: `{ message: string, token: string }`

- **GET** `/api/admin/attendance`
  - Returns today's attendance data
  - Response: `{ data: array, summary: { total, present, absent } }`

- **GET** `/api/admin/attendance/:date`
  - Returns attendance for a specific date (YYYY-MM-DD format)
  - Response: `{ data: array, summary: { total, present, absent } }`

- **PUT** `/api/admin/attendance/:id`
  - Update student status
  - Request body: `{ status: 'present' | 'absent' }`
  - Response: `{ message: string }`

## Database Schema

### Students Table
| Column | Type | Notes |
|--------|------|-------|
| id | INT | Auto-increment primary key |
| phone_number | VARCHAR(15) | Unique phone number |
| name | VARCHAR(100) | Student name |
| date | DATE | Attendance date |
| time | TIME | Check-in time |
| status | ENUM | 'present' or 'absent' |
| created_at | TIMESTAMP | Record creation time |

### Admin Users Table
| Column | Type | Notes |
|--------|------|-------|
| id | INT | Auto-increment primary key |
| username | VARCHAR(100) | Unique username |
| password | VARCHAR(255) | Hashed password |
| created_at | TIMESTAMP | User creation time |

## Customization

### Change Admin Credentials

1. Update the `.env` file in the `server` directory:
   ```
   ADMIN_USERNAME=your_username
   ADMIN_PASSWORD=your_password
   ```

2. Restart the server. The new admin user will be created automatically if it doesn't exist.

### Change Port Numbers

- **Backend**: Edit `PORT=5000` in `server/.env`
- **Frontend**: Run `PORT=3001 npm start` in the root directory

## Troubleshooting

### "Connection refused" error
- Ensure MySQL server is running
- Check database credentials in `.env`

### "Phone number already exists" error
- A student can only check in once per day
- Use the admin panel to change their status if needed

### CORS errors
- The backend allows requests from `localhost:3000`
- For production, update the CORS settings in `server/server.js`

## Technologies Used

- **Frontend**: React.js, Axios, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: bcryptjs for password hashing
- **HTTP Client**: Axios for API calls

## Security Notes

- Passwords are hashed using bcryptjs before storage
- Admin authentication is required to modify attendance
- Phone numbers are unique per day to prevent duplicate check-ins
- Environment variables are used for sensitive data

## Future Enhancements

- Email notifications for absences
- QR code scanning for check-in
- Attendance reports and analytics
- Multiple class/batch support
- Photo verification during check-in
- SMS/Email reminders

## License

MIT

## Support

For issues or questions, please contact the development team.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
