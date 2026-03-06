# Full-Stack Blog Website

A production-ready, highly scalable blog platform built with Next.js 14, Node.js, Express, and MongoDB. This application features a robust backend API for managing articles, authors, and interactions, paired with a modern, responsive frontend using Tailwind CSS and shadcn/ui.

## 🚀 Key Features

### Frontend (User Interface)
- **Framework:** Next.js 14 (App Router) with React 18
- **Styling:** Tailwind CSS & shadcn/ui for accessible, beautiful components
- **Rich Text Editor:** Tiptap integration for seamless post creation & editing
- **Authentication Pages:** Login, Registration, and Forgot Password flows
- **Public Views:** Home page, paginated blog listing, dynamic post pages, and category browsing
- **Author Dashboard:** Protected route for users to manage their posts, profile, and settings
- **Interactions:** Support for comments (and nested replies)
- **Responsive Design:** Fully mobile-friendly layout and dark mode support

### Backend (API Engine)
- **Runtime:** Node.js with Express.js
- **Database:** MongoDB configured with Mongoose ORM
- **Language:** TypeScript for strong typing and error reduction
- **Authentication:** JWT (JSON Web Tokens) with short-lived access tokens and long-lived refresh tokens
- **Security:** Helmet for HTTP headers, CORS configuration, bcrypt for password hashing
- **Content Models:**
  - **User:** Auth, profiles, routing
  - **Post:** Relational associations to Authors, Categories, and Tags
  - **Comment:** Recursive schema for nested replies
  - **Taxonomy:** Unified tagging and categorization system
- **Admin Features:** Dedicated routes for administrator analytics and user management

---

## 📂 Project Structure

This is a monorepo setup consisting of separate backend and frontend environments:

```
blogwebsite/
├── backend/                  # Node.js/Express API Server
│   ├── src/
│   │   ├── controllers/      # Route logic & responses
│   │   ├── middleware/       # JWT validation, Error handler
│   │   ├── models/           # Mongoose schemas (User, Post, Comment)
│   │   ├── routes/           # Express router configuration
│   │   ├── utils/            # JWT helpers, email transport
│   │   └── server.ts         # Entry point
│   ├── .env                  # Environment Variables
│   └── package.json          # Backend Dependencies
│
├── frontend/                 # Next.js 14 Application
│   ├── app/                  # App Router pages (/, /blog, /login)
│   ├── components/           # Reusable UI elements (shadcn/ui)
│   ├── lib/                  # Utility functions
│   └── package.json          # Frontend Dependencies
│
├── shared/                   # (Optional) Shared TS Interfaces
└── .gitignore                # Root git configuration
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local installation `127.0.0.1:27017` or MongoDB Atlas URI)

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/blog-app
   CLIENT_URL=http://localhost:3000
   JWT_SECRET=super_secret_jwt_key
   REFRESH_TOKEN_SECRET=super_secret_refresh_key
   ```
   *(Update `MONGODB_URI` if using Cloud Atlas)*
4. Start the development server:
   ```bash
   npm run dev
   ```
   *The server will run at `http://localhost:5000`*

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *The client will run at `http://localhost:3000`*

---

## 🔑 API Endpoints Overview

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Authenticate user & get JWT | No |
| `GET`  | `/api/posts` | Get paginated posts list | No |
| `GET`  | `/api/posts/:slug` | Get single post details | No |
| `POST` | `/api/posts` | Create a new blog post | Yes |
| `POST` | `/api/comments` | Add a comment to a post | Yes |
| `GET`  | `/api/users/profile` | Get currently logged in user | Yes |

---

## 🎨 Future Enhancements
- Implementation of email verification and password reset via Nodemailer.
- Cloudinary integration for handling profile pictures and post thumbnail uploads.
- Integration of a global state management tool (Zustand or Context API) on the frontend for user session handling.

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
