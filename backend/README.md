# ⚙️ FlowForge — Backend

> Express.js + Socket.io backend server for the FlowForge real-time collaboration platform.

---

## 📌 Overview

The FlowForge backend is a **Node.js / Express** REST API server with **Socket.io** for real-time communication. It serves as the backbone for project management, authentication, and live chat features.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js (ESM) |
| Framework | Express.js 4 |
| Real-Time | Socket.io 4 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Config | dotenv |
| Dev Server | nodemon |

---

## 📂 Folder Structure

```
backend/
├── server.js           # Entry point — Express + Socket.io setup
├── package.json
├── routes/
│   └── chat.routes.js  # Chat API endpoints
├── services/
│   └── projectService.js
├── supabase/
│   └── config.js       # Supabase client initialization
└── utils/              # Shared utilities
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- A [Supabase](https://supabase.com) project

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Start the Development Server

```bash
npm run dev
```

The server will start at **http://localhost:5000** with hot-reload via nodemon.

### 4. Start for Production

```bash
npm start
```

---

## 🌐 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/` | Health check — server status |
| `GET/POST` | `/api/chat` | Chat messages |

> More endpoints will be added as features are implemented.

---

## 🔌 Socket.io Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `connection` | Server ← Client | Client connects |
| `disconnect` | Server ← Client | Client disconnects |

> Additional real-time events (typing indicators, live cursors, etc.) will be added.

---

## 🔒 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: `5000`) |
| `SUPABASE_URL` | Yes | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Yes | Supabase anonymous/public key |

---

## 🧪 Running Tests

> Test setup is planned. Watch this space.

---

## 🚧 Development Status

- [x] Express server setup
- [x] Socket.io integration
- [x] CORS configuration
- [x] Chat routes
- [ ] Authentication middleware
- [ ] Project CRUD endpoints
- [ ] Kanban board endpoints
- [ ] Supabase full integration

---

## 📜 License

MIT — see the root [LICENSE](../LICENSE) file for details.
