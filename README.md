# 🌱 GreenImpact - SDG Activities Platform

A comprehensive full-stack web application for tracking and promoting Sustainable Development Goals (SDG) activities, empowering individuals to make a positive environmental and social impact.

## 📖 Description

GreenImpact is an interactive platform that enables users to discover, participate in, and track their contributions to the UN's 17 Sustainable Development Goals. The platform features role-based access control, real-time progress tracking, community engagement, and comprehensive activity management.

## 🔧 Technologies Used

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **React Router v6** - Declarative routing for React applications
- **Context API + useReducer** - State management solution
- **Axios** - HTTP client for API communication

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **JWT (JSON Web Tokens)** - Secure authentication mechanism
- **bcryptjs** - Password hashing library
- **Express Validator** - Input validation and sanitization
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Nodemon** - Development server with auto-restart
- **ESLint** - Code linting and formatting
- **Git** - Version control system

## ✨ Features

### 🔐 Authentication & Authorization
- Secure user registration and login
- Role-based access control (Admin/User)
- JWT token-based authentication
- Password encryption with bcrypt

### 👥 User Management
- **Admin Dashboard** - Complete platform management
- **User Progress Tracking** - Personal SDG journey
- **Role-based Navigation** - Different interfaces per user type

### 🎯 Activity Management
- **CRUD Operations** - Create, read, update, delete activities
- **SDG Categorization** - Activities mapped to 17 SDG goals
- **Difficulty Levels** - Easy, Medium, Hard classifications
- **Points System** - Gamified engagement

### 📊 Progress & Analytics
- **Personal Dashboard** - Individual progress tracking
- **Achievement System** - Milestone recognition
- **Leaderboard** - Community engagement
- **Impact Visualization** - SDG contribution metrics

### 🌐 Community Features
- **Global Statistics** - Platform-wide impact metrics
- **User Rankings** - Competitive engagement
- **Achievement Badges** - Recognition system

### 🎨 User Experience
- **Responsive Design** - Mobile-first approach
- **Modern UI/UX** - Glassmorphism and gradient designs
- **Interactive Elements** - Hover effects and animations
- **Confirmation Modals** - User-friendly action confirmations

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd GreenImpact-fullstack
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Backend will run on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend will run on `http://localhost:3000`

### 4. Environment Variables
Create `.env` files in both frontend and backend directories:

**Backend (.env):**
```
PORT=5000
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🔑 Demo Accounts

- **Admin**: `admin@greenimpact.com` / `admin123`
- **User**: `user@greenimpact.com` / `user123`
- **Demo**: `demo@example.com` / `123456`

## 🤖 AI Support Explanation

This project was developed with comprehensive AI assistance using IBM Granite Model, which provided:

### 🛠️ Development Support
- **Code Generation** - Automated React component creation and Express.js API development
- **Architecture Design** - Full-stack application structure following industry best practices
- **Problem Solving** - Real-time debugging assistance and error resolution strategies
- **Code Optimization** - Performance improvements and maintainable code patterns

### 📚 Technical Guidance
- **Technology Selection** - Optimal tech stack recommendations for scalable web applications
- **Security Implementation** - JWT authentication, bcrypt password hashing, and security middleware
- **State Management** - Context API with useReducer pattern for complex state handling
- **API Design** - RESTful API structure with proper HTTP methods and status codes

### 🎨 UI/UX Enhancement
- **Modern Design Patterns** - Glassmorphism effects, gradient backgrounds, and responsive layouts
- **Component Architecture** - Reusable and maintainable React component structure
- **User Experience** - Intuitive navigation, interactive elements, and accessibility features
- **Design Systems** - Consistent styling with Tailwind CSS utility classes

### 🔧 Development Workflow
- **Project Structure** - Organized file hierarchy with clear separation of concerns
- **Error Handling** - Comprehensive error management with user-friendly feedback
- **Testing Strategy** - Mock data implementation and development environment setup
- **Documentation** - Detailed README, code comments, and API documentation

### 🧠 IBM Granite Model Capabilities
- **Code Understanding** - Deep comprehension of JavaScript, React, and Node.js ecosystems
- **Best Practices** - Implementation of industry-standard development patterns
- **Security Awareness** - Proactive security recommendations and vulnerability prevention
- **Performance Optimization** - Efficient algorithms and resource management suggestions

The IBM Granite Model's advanced language understanding and code generation capabilities enabled rapid development while maintaining enterprise-grade code quality, security standards, and modern development practices throughout the entire project lifecycle.

## 📁 Project Structure

```
GreenImpact-fullstack/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Route components
│   │   ├── context/        # State management
│   │   ├── utils/          # Utility functions
│   │   └── hooks/          # Custom React hooks
│   └── public/             # Static assets
├── backend/                 # Express API server
│   ├── routes/             # API route handlers
│   ├── middleware/         # Custom middleware
│   └── models/             # Data models
└── README.md               # Project documentation
```

## 🌍 SDG Categories Supported

1. **No Poverty** - Economic empowerment activities
2. **Zero Hunger** - Food security and nutrition
3. **Good Health** - Healthcare and wellness
4. **Quality Education** - Learning and skill development
5. **Gender Equality** - Equal opportunities initiatives
6. **Clean Water** - Water conservation and access
7. **Clean Energy** - Renewable energy adoption
8. **Decent Work** - Employment and economic growth
9. **Innovation** - Technology and infrastructure
10. **Reduced Inequalities** - Social inclusion
11. **Sustainable Cities** - Urban development
12. **Responsible Consumption** - Sustainable practices
13. **Climate Action** - Environmental protection
14. **Life Below Water** - Marine conservation
15. **Life on Land** - Terrestrial ecosystem protection
16. **Peace & Justice** - Strong institutions
17. **Partnerships** - Global cooperation

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `build` folder
3. Set environment variables in deployment platform

### Backend Deployment (Heroku/Railway)
1. Set up environment variables
2. Configure start script
3. Deploy with Git integration

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**Made with 💚 for a sustainable future**