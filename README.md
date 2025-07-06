# 🌱 GreenImpact - SDG Activities Platform

A full-stack web application for tracking Sustainable Development Goals (SDG) activities and progress.

## 📁 Project Structure

```
ecotracker-fullstack/
├── frontend/          # React frontend application
├── backend/           # Node.js Express API
└── README.md
```

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🔧 Tech Stack

### Frontend
- React 18
- Tailwind CSS
- React Router
- Context API

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs
- Express Validator

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Activities
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Create activity (protected)
- `PUT /api/activities/:id` - Update activity (protected)
- `DELETE /api/activities/:id` - Delete activity (protected)

### Progress
- `GET /api/progress` - Get user progress (protected)
- `POST /api/progress/complete/:activityId` - Complete activity (protected)
- `GET /api/progress/leaderboard` - Get leaderboard

## 🔑 Default Accounts

- **Admin**: admin@ecotracker.com / admin123
- **User**: user@ecotracker.com / user123
- **Demo**: demo@example.com / 123456

## 🌍 Features

- ✅ User Authentication & Authorization
- ✅ Activity Management (CRUD)
- ✅ Progress Tracking
- ✅ Achievement System
- ✅ Leaderboard
- ✅ SDG Categories
- ✅ Responsive Design

## 🛡️ Security Features

- JWT Authentication
- Password Hashing
- Rate Limiting
- Input Validation
- CORS Protection
- Helmet Security Headers