# 🎯 MockMate — AI Mock Interview System Frontend

A modern, AI-powered mock interview platform built with React + Vite. Practice interviews with real-time AI feedback, voice input, resume analysis, and detailed performance tracking.

## 🔗 Live Demo

| | Link |
|---|---|
| 🌐 Frontend | https://mock-mate-frontend-opal.vercel.app |
| ⚙️ Backend API | https://ai-mock-interview-73qo.onrender.com |
| 📂 Backend Repo | https://github.com/ranjeetmahto11/mockmate-backend |

---

## ✨ Features

- 🔐 JWT Authentication — Register & Login
- 🤖 AI-Powered Interview Sessions (Groq + LLaMA 3.3)
- 🎤 Voice Input Support via Web Speech API
- 📊 Real-time AI Feedback with Score & Suggestions
- 📈 Progress Dashboard with Analytics
- 📋 Interview History with Detailed Breakdown
- 📄 Resume Analysis — upload PDF/DOCX and get AI feedback
- 🎯 Categories: Technical, HR, Behavioral, System Design
- ⚡ Difficulty Levels: Easy, Medium, Hard
- ⏱️ Timed Questions with Auto-Submit
- 📱 Fully Responsive Design

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Vite 5 | Build Tool |
| React Router v6 | Client-side Routing |
| Axios | HTTP Client |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |
| React Hot Toast | Notifications |
| Web Speech API | Voice Input |
| Vercel | Deployment |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/ranjeetmahto11/MockMate-frontend.git
cd MockMate-frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://ai-mock-interview-73qo.onrender.com
```

For local development with backend running locally:

```env
VITE_API_URL=http://localhost:8080
```

### Run Locally

```bash
npm run dev
```

App will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── api/
│   └── axios.js              # Axios instance with interceptors
├── components/
│   ├── Navbar.jsx            # Navigation bar
│   └── Loader.jsx            # Loading spinner
├── context/
│   └── AuthContext.jsx       # Auth state management
├── pages/
│   ├── Dashboard.jsx         # Stats & overview
│   ├── History.jsx           # Interview history
│   ├── InterviewDetail.jsx   # Single interview breakdown
│   ├── InterviewRoom.jsx     # Live interview session
│   ├── InterviewSetup.jsx    # Configure interview
│   └── ResumeAnalysis.jsx    # Resume upload & feedback
├── App.jsx                   # Routes & app shell
└── main.jsx                  # Entry point
```

---

## 📡 API Integration

All API calls use the base URL from `VITE_API_URL` environment variable.

### Auth Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & get JWT token |

### Interview Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/interviews/start` | Start a new interview session |
| POST | `/api/interviews/submit-answer` | Submit answer & get AI feedback |
| GET | `/api/interviews/my-interviews` | Get interview history |
| GET | `/api/interviews/{id}` | Get single interview details |

### User Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/dashboard` | Get dashboard stats |
| GET | `/api/users/profile` | Get user profile |
| PUT | `/api/users/profile` | Update user profile |

### Resume Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/resume/analyze` | Upload & analyze resume |

---

## 🔐 Authentication Flow

1. User registers or logs in via `/api/auth/register` or `/api/auth/login`
2. Backend returns a JWT token
3. Token is stored in `localStorage`
4. All subsequent requests include `Authorization: Bearer <token>` header via Axios interceptor
5. On 401 response, token is cleared and user is redirected to login

---

## 🎤 Voice Input

The interview room supports voice input using the browser's Web Speech API:

- Click **Voice Input** to start recording
- Speech is transcribed in real-time into the answer box
- Click **Stop Listening** to end recording
- Works best in Chrome/Edge browsers

---

## 🚢 Deployment (Vercel)

### Deploy Steps

1. Push code to GitHub
2. Import repo in [Vercel Dashboard](https://vercel.com)
3. Set environment variables:

| Key | Value |
|---|---|
| `VITE_API_URL` | `https://ai-mock-interview-73qo.onrender.com` |
| `NPM_CONFIG_INCLUDE` | `dev` |

4. Set build settings:

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js Version | `20.x` |

5. Click **Deploy**

---

## ⚠️ Important Notes

- The backend is hosted on Render's free tier and may take **30–60 seconds** to wake up after inactivity
- Voice input requires microphone permission in the browser
- Resume analysis supports PDF and DOCX file formats

---

## 👨‍💻 Contributors

- [@ranjeetmahto11](https://github.com/ranjeetmahto11)
- [@SUMITK82](https://github.com/SUMITK82)
- [@Ayush-Adarsh-codex](https://github.com/Ayush-Adarsh-codex)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).