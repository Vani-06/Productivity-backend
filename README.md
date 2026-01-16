# Productivity Management Dashboard API

A robust Node.js/Express API for managing tasks with built-in analytics and user authentication.

## 🚀 Features
- **Secure Auth**: JWT-based Authentication.
- **Task CRUD**: Create, Read, Update, and Delete tasks.
- **Task Intelligence**: Automatic "Overdue" detection using Mongoose Virtuals.
- **Search & Filter**: Search by title or filter by priority/status via query params.
- **Analytics**: Real-time dashboard stats including completion rates.

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Security**: Bcrypt.js (Password hashing), JWT (Authorization)

## ⚙️ Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root and add:
   - `PORT=5000`
   - `MONGO_URI=your_mongodb_atlas_uri`
   - `JWT_SECRET=your_secret_key`
4. Start the server: `node server.js`

## 🛣️ API Endpoints
- **POST** `/api/auth/register` - Create an account.
- **POST** `/api/auth/login` - Get your Access Token.
- **GET** `/api/tasks` - Get your tasks (Supports `?search=`, `?priority=`).
- **POST** `/api/tasks` - Create a new task (Requires Bearer Token).
- **GET** `/api/analytics/summary` - Get your productivity stats.