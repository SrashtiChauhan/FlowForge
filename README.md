# 🚀 FlowForge

### Real-Time Project Collaboration Platform

> Build, manage, and collaborate on projects in real-time — all in one place.

---

## 📌 Overview

**FlowForge** is a modern full-stack collaboration platform designed to streamline teamwork by combining project management, communication, and real-time interaction features.

It aims to provide a unified environment similar to tools like Jira, Slack, and GitHub — enabling teams to work more efficiently and collaboratively.

---

## 🎯 Key Features

* 📋 **Kanban Task Management**
  Organize tasks with drag-and-drop boards (Todo / In Progress / Done)

* 👥 **Team Collaboration**
  Create projects, invite members, and assign tasks

* 💬 **Real-Time Chat**
  Communicate instantly within project workspaces

* 🖱️ **Live Cursor Tracking (Planned)**
  See team members' activity in real-time

* 🎙️ **Voice Rooms (Planned)**
  Built-in voice communication for teams

* 🔗 **GitHub Integration (Planned)**
  Sync issues and commits with projects

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* Tailwind CSS
* Socket.io Client

### Backend

* Node.js
* Express.js
* Socket.io

### Database

* Supabase (PostgreSQL) *(Planned)*

---

## 📂 Project Structure

```
flowforge/
├── backend/        # Express server
├── frontend/       # Next.js app
├── .env.example    # Environment variables template
├── README.md
```

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/flowforge.git
cd flowforge
```

---

### 2️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

👉 Runs on: http://localhost:3000

---

### 3️⃣ Setup Backend

```bash
cd backend
npm install
npm run dev
```

👉 Runs on: http://localhost:5000

---

### 4️⃣ Environment Variables

Create `.env` files in both frontend and backend based on `.env.example`.

Example:

```
PORT=5000
JWT_SECRET=your_secret_key
DATABASE_URL=your_database_url
```

---

## Deploying On Vercel

For Vercel, the deployable Next.js app lives in `frontend/`.

Two supported setups:

1. Import the repository in Vercel and set the **Root Directory** to `frontend`.
2. Deploy the repository root with the included root `package.json` and `vercel.json`, which forward the build to the frontend workspace.

If your existing Vercel project was imported from the repository root and shows a 404, update the project's **Root Directory** to `frontend` or redeploy after pulling these config changes.

---

## 🚧 Development Status

**Current Phase:** Initial Setup

### ✅ Completed

* Project structure setup
* Frontend (Next.js + Tailwind) initialized
* Backend (Express) initialized

### 🔄 In Progress

* Authentication system
* Dashboard UI
* API integration

### 🔜 Upcoming

* Kanban board implementation
* Real-time chat system
* Supabase integration
* Deployment

---

## 🤝 Contributing

Contributions are welcome and appreciated! Please take a moment to read these guidelines before getting started.

### Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/your-username/flowforge.git
   cd flowforge
   ```
3. **Add the upstream remote** to stay in sync:
   ```bash
   git remote add upstream https://github.com/original-owner/flowforge.git
   ```

### Branch Naming

Use descriptive branch names following this convention:

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/short-description` | `feature/kanban-board` |
| Bug Fix | `fix/short-description` | `fix/auth-redirect` |
| Docs | `docs/short-description` | `docs/api-reference` |
| Chore | `chore/short-description` | `chore/update-deps` |

### Making Changes

1. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes, keeping commits small and focused
3. Follow the existing code style (ESLint is configured for the frontend)
4. Test your changes locally before pushing

### Commit Messages

Write clear, concise commit messages in the imperative mood:

```
✅ feat: add drag-and-drop to kanban board
✅ fix: resolve token expiry on page refresh
✅ docs: update environment variable instructions

❌ fixed stuff
❌ changes
```

### Submitting a Pull Request

1. **Sync** your branch with upstream before opening a PR:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```
2. **Push** your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
3. Open a **Pull Request** against the `main` branch
4. Fill in the PR template — describe **what** changed and **why**
5. Link any related issues using `Closes #issue-number`

### Code Review

- PRs require at least one approving review before merging
- Address all review comments before requesting a re-review
- Keep PRs focused — avoid bundling unrelated changes

### Reporting Issues

- Search existing issues before opening a new one
- Use the appropriate issue template (bug report / feature request)
- Provide clear reproduction steps for bugs

### Code of Conduct

Be respectful and constructive. Harassment or hostile behaviour of any kind will not be tolerated.

---

## 📌 Future Enhancements

* 🤖 AI-powered task suggestions
* 📊 Analytics dashboard
* 🔔 Notification system
* 🔌 Plugin architecture
* 📱 Mobile app support

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Shrinivas Mudabe**

---

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub!
