# DashChat - A Realtime-Chat-Platform 

A full-stack realtime chat platform with friends, notifications, and audio/video calling.

## 1. Project Overview

DashChat is designed for fast and private communication with modern UX patterns.
It supports direct messaging, friend system workflows, notification feeds, and Stream-powered calling from the dashboard.

## 2. Live Link and Demo 

- Live App: ------------------
- Demo Video: -------------------

## 3. Screenshots

### Home Hero

![DashChat Hero Screenshot 1](./src/assets/hero-screenshot-1.PNG)

### Visual Assets

- Hero Variant: ![Hero Variant](./src/assets/hero2.png)
- Chat Screenshot: ![Chat Screenshot](./src/assets/chat-screenshot-2.PNG)
- Call Screenshot: ![Call Screenshot](./src/assets/call-screenshot.PNG)

## 4. Features

- Email/password authentication with protected dashboard routes
- Google OAuth login integration
- Realtime 1:1 messaging using Socket.IO
- Message delivery states (sent, delivered, seen)
- Edit/delete message and emoji reaction support
- Reply/forward message workflows
- Friend request system (send, accept, reject, unfriend, block/unblock)
- Notification feed for social actions
- Audio and video call support with Stream Video SDK
- Call lifecycle management (ringing, received, completed, missed, failed)
- Calls history with backend-driven pagination, search, filters, and sorting
- Multi-theme UI using DaisyUI themes
- Responsive public pages and dashboard layouts

## 5. Tech Stack

### Frontend

- React 19
- Vite
- React Router
- TanStack Query
- Zustand
- Tailwind CSS + DaisyUI
- Axios
- Socket.IO Client
- Stream Video React SDK
- GSAP
- React Hot Toast

### Backend

- Node.js
- Express 5
- MongoDB + Mongoose
- JWT + cookie based auth
- Socket.IO
- Stream Chat server SDK (token and member provisioning)
- Google APIs (OAuth code exchange)

### Tooling

- ESLint
- Nodemon

## 6. Installation and Setup

### Prerequisites

- Node.js 18+
- npm
- MongoDB database URI
- Stream API credentials
- Google OAuth credentials
- ImgBB API key (for image uploads)

### Clone Repository

```bash
https://github.com/somrat350/Dash-Chat
```

### Install Dependencies

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### Environment Variables

Create backend .env inside backend:

```env
PORT=5000
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Comma-separated URLs allowed for CORS
CLIENT_URL=http://localhost:5173

NODE_ENV=development
SAME_SITE=lax

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

Create frontend .env inside frontend:

```env
VITE_SERVER_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_IMG_BB_API=your_imgbb_api_key
```

### Run Development Servers

Backend terminal:

```bash
cd backend
npm run dev
```

Frontend terminal:

```bash
cd frontend
npm run dev
```

Frontend default URL: http://localhost:5173

### Production Build

```bash
npm run build
npm run start
```

## 7. Project Structure

```text
Dash-Chat/
	backend/
		src/
			controllers/
			routes/
			models/
			middleware/
			lib/
	frontend/
		src/
			components/
			pages/
			routes/
			store/
			layout/
```

## 8. Author

- Osamabin Somrat | LinkedIn:
- Arman Hossain Shuvo | LinkedIn: https://linkedin.com/in/mdarman-islam/
- Sabbir Hossain Sohag | LinkedIn: https://www.linkedin.com/in/sabbirhossainsohag
- Tangila Khatun | LinkedIn:
- Lima Akter | LinkedIn:
- China Akter | LinkedIn:

---
