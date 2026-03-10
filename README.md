# Disaster Preparedness and Response Education Platform

## Project Description
The Disaster Preparedness and Response Education Platform is a comprehensive learning and emergency response system designed to train students and staff about disaster preparedness. It empowers educational institutions by utilizing interactive modules, scheduled drills, quizzes, emergency guides, and evacuation maps to ensure safety during critical situations.

## Features
- **User authentication**: Secure signup and login for all users.
- **Role-based dashboards**: Tailored experiences for Students, Teachers, and Admins.
- **Disaster education modules**: Detailed content covering earthquakes, fires, floods, cyclones, pandemics, and chemical hazards.
- **Training and drill management**: Tools for teachers and admins to schedule and manage emergency drills.
- **Emergency response tools**: Quick access to critical protocols and contacts.
- **Quiz and evaluation system**: Timed assessments to gauge preparedness knowledge.
- **Admin analytics dashboard**: Visual insights into platform usage, drill participation, and quiz performance.
- **Interactive evacuation map**: Real-time assembly point mapping using Leaflet.
- **First aid guide**: Step-by-step instructions for common medical emergencies.

## Tech Stack

**Frontend**
- React
- Vite
- React Router (v6)

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB with Mongoose

**Authentication**
- JWT (JSON Web Tokens)

## Project Structure

```text
/client                 # Frontend Application
  /src
    /components         # Reusable UI components
    /pages              # Application views/routes
    /context            # Global state (AuthContext)
    /services           # API integration (Axios)

/server                 # Backend API
  /controllers          # Route logic (if extracted)
  /routes               # API endpoints
  /models               # Mongoose DB schemas
  /middleware           # Auth & Role verification
  index.js              # Server entry point
```

## Installation Guide

Follow these step-by-step instructions to get the application running locally:

### 1. Clone the repository
```bash
git clone <repository_url>
```

### 2. Navigate into project folder
```bash
cd disaster-preparedness-platform
```

### 3. Install dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd ../client
npm install
```

## Environment Setup

You need to configure the environment variables for the backend to run properly.

**Step 1:** Copy the example environment file.
```bash
cd server
cp .env.example .env
```

**Step 2:** Edit the variables in the newly created `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/disaster-platform
JWT_SECRET=your_secret_key
```

## Running the Application

**Start backend server:**
```bash
cd server
npm run dev
```

**Start frontend server:**
```bash
cd client
npm run dev
```

The Frontend will run at:
http://localhost:5173

The Backend API will run at:
http://localhost:5000

## Demo Accounts

If you have run the database seeder (`npm run seed` in the server directory), you can log in with:

**Admin**
- Email: `admin@school.edu`
- Password: `Admin@123`

**Teacher**
- Email: `teacher@school.edu`
- Password: `Teacher@123`

*Students can create accounts using the signup page.*

## Screenshots Section

*(Placeholder for screenshots)*
- **Login page**
- **Student dashboard**
- **Teacher dashboard**
- **Admin dashboard**
- **Emergency response page**
- **Quiz system**

## Future Improvements
- Real-time disaster alerts via WebSockets or push notifications.
- Mobile app support (React Native integration).
- AI emergency assistant for rapid query resolution.
- Advanced drill simulation using VR/AR.
