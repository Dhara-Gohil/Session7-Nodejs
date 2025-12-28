# Blogging Platform

A full-stack web application for managing and displaying blogs with an admin panel.

## Features

### For Users
- View latest blogs on the homepage
- Search blogs by title
- Read individual blog posts with clean URLs (slug-based)
- Responsive design for mobile and desktop

### For Admin
- Secure login/logout system
- Dashboard with statistics
- Manage blogs (Create, Read, Update, Delete)
- Manage categories (Create, Read, Update, Delete)
- Rich text editor for blog content
- Image support for thumbnails and featured images

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React, Vite, Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd blogging-platform
   ```

2. **Install dependencies**
   ```bash
   npm run setup
   ```

3. **Configure environment variables**
   - Copy `.env` file and update the values:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blogging-platform
   JWT_SECRET=your-secret-key-here
   ADMIN_EMAIL=admin@blog.com
   ADMIN_PASSWORD=admin123
   ```

4. **Start MongoDB**
   - Make sure MongoDB is running on your system

5. **Create admin user**
   ```bash
   # Start the backend server first
   npm run dev
   
   # In another terminal, create the admin user
   curl -X POST http://localhost:5000/api/auth/create-admin
   ```

### Development

1. **Start the backend server**
   ```bash
   npm run dev
   ```

2. **Start the frontend development server** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Production Build

1. **Build the frontend**
   ```bash
   npm run build-win
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

