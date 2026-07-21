# TANSAM Project

A full-stack web application for managing students, staff, and user roles with authentication. Built with **Node.js/Express** backend and **React** frontend.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## ✨ Features

- **User Authentication**: Secure registration and login with JWT token-based authentication
- **Role-Based Access Control**: Support for different user roles (Admin, Staff, Student)
- **Dashboard**: Comprehensive dashboard with user statistics and analytics
- **User Management**: Manage students and staff members
- **Role Management**: Create and manage user roles
- **Password Security**: Passwords hashed with bcrypt for enhanced security
- **CORS Enabled**: Cross-origin resource sharing for frontend-backend communication

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Environment Management**: dotenv
- **Development**: Nodemon

### Frontend
- **Library**: React
- **Routing**: React Router DOM
- **Build Tool**: Create React App

## 📁 Project Structure

```
TANSAM_project/
├── Backend/
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   ├── package.json           # Backend dependencies
│   ├── .env                   # Environment variables
│   ├── config/
│   │   └── db.js             # Database configuration
│   ├── controller/
│   │   └── usercontroller.js # User business logic
│   ├── middleware/
│   │   └── authmiddleware.js # JWT authentication middleware
│   ├── routes/
│   │   └── userroutes.js     # User API routes
│   └── seeder/
│       └── SuperAdminseeder.js # Database seed script
├── Frontend/
│   ├── package.json           # Frontend dependencies
│   ├── index.html            # HTML entry point
│   └── frontend/             # React application
│       ├── package.json
│       ├── src/
│       └── public/
└── README.md                 # This file
```

## ✅ Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **MySQL** (v5.7 or higher)

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/muhammedshaukath/TANSAM_project.git
cd TANSAM_project
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

### 3. Frontend Setup

```bash
cd Frontend/frontend
npm install
```

## 🔐 Environment Setup

### Backend Environment Variables

Create a `.env` file in the `Backend/` directory with the following variables:

```env
# Server Configuration
PORT=3001

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=datas

# JWT Configuration
JWT_SECRET=your_secret_key_here
```

**Note:** Replace the database credentials with your actual MySQL credentials.

## 🚀 Running the Application

### Start the Backend Server

```bash
cd Backend
npm run dev
```

The backend will start on `http://localhost:3001`

### Start the Frontend Application

In a new terminal:

```bash
cd Frontend/frontend
npm start
```

The frontend will open on `http://localhost:3000`

## 📡 API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | User login |

### Dashboard Routes (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/dashboard` | Get user dashboard |
| GET | `/api/auth/dashboard-count` | Get dashboard statistics |
| GET | `/api/auth/students` | Get all students |
| GET | `/api/auth/staffs` | Get all staff members |

### Role Management Routes (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/roles` | Get all roles |
| POST | `/api/auth/roles` | Add a new role |

**Note:** Routes marked as (Protected) require a valid JWT token in the `Authorization` header.

## 🔄 Authentication Flow

1. **Registration**: User registers with name, email, password, age, and role
2. **Login**: User logs in with email and password; receives a JWT token
3. **Token Usage**: Include the JWT token in the `Authorization` header for protected routes
4. **Token Validation**: Middleware validates the token before granting access

## 🗄️ Database Schema

The application uses the following main tables:

- **users**: Stores user information (id, name, email, password, age, role)
- **roles**: Stores available user roles
- Additional tables for students and staff management

## 📝 Project Notes

- All passwords are securely hashed using bcrypt with a salt round of 10
- JWT tokens are used for stateless authentication
- CORS is enabled for development purposes
- Database queries use parameterized statements to prevent SQL injection

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💻 Authors

- **Muhammed Shaukath** - Project Owner

## 🆘 Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Verify database credentials in `.env` file
- Check if the database exists: `CREATE DATABASE datas;`

### Port Already in Use
- Backend default port: 3001 (change in `.env`)
- Frontend default port: 3000 (React will prompt for alternative)

### CORS Errors
- Ensure backend CORS middleware is properly configured
- Verify frontend and backend URLs are accessible to each other

## 📧 Support

For issues or questions, please open an issue in the GitHub repository.

---

**Happy Coding! 🎉**
