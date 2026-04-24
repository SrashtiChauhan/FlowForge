# 🚀 Real-Time Kanban Board

This document describes the architecture and implementation of the Real-Time Kanban Board feature in FlowForge.

## 📌 Overview
The Real-Time Kanban Board allows team members to drag and drop tasks between columns (e.g., "Todo", "In Progress", "Done"). Using WebSockets (Socket.io), any task movement is instantly broadcasted to all other connected users viewing the same project, creating a seamless multiplayer experience.

## 🛠 Tech Stack
- **Frontend:** Next.js (React), Tailwind CSS
- **Drag and Drop:** `@dnd-kit/core`, `@dnd-kit/sortable`
- **Backend:** Node.js, Express
- **Real-Time Sync:** Socket.io
- **Database:** Supabase (PostgreSQL)

## 📂 Architecture

### 1. Database Schema (Supabase)
Tasks are stored in a `tasks` table with the following structure:
- `id`: UUID (Primary Key)
- `project_id`: UUID (Foreign Key to Projects)
- `title`: String
- `description`: Text
- `status`: String (`todo`, `in-progress`, `done`)
- `order`: Integer (for maintaining position within a column)

### 2. Backend API & WebSockets
- **REST API:** Handles standard CRUD operations (creating, fetching, deleting tasks).
- **Socket.io Events:**
  - `join_project`: Clients join a specific Socket.io room based on the `projectId`.
  - `task_moved`: When a client drops a task in a new column, it emits this event with the task's new status and order. The server then broadcasts `task_updated` to all other clients in the room.

### 3. Frontend Implementation
- **`KanbanBoard` Component:** The main container holding the `@dnd-kit` context (`DndContext`). It manages the local state of columns and tasks, handles the `onDragEnd` event, and emits WebSocket updates.
- **`KanbanColumn` Component:** A droppable area (`useDroppable`) containing a list of `TaskCard` components.
- **`TaskCard` Component:** A draggable item (`useDraggable` / `useSortable`) representing an individual task.

## ⚙️ How It Works (Event Flow)
1. User A drags Task 1 from "Todo" to "In Progress".
2. `@dnd-kit` fires the `onDragEnd` event on User A's frontend.
3. User A's frontend optimistically updates its local UI so the change feels instant.
4. User A's frontend emits `task_moved` via Socket.io.
5. User A's frontend sends a `PUT` request to the Express API to persist the change in Supabase.
6. The Express server receives the `task_moved` WebSocket event and broadcasts `task_updated` to User B.
7. User B's frontend receives `task_updated` and automatically moves Task 1 into "In Progress" without a page refresh.

## 🚀 Getting Started
To test the Kanban Board locally:
1. Ensure both the `frontend` and `backend` servers are running.
2. Navigate to `http://localhost:3000/projects/123` (or any valid project ID).
3. Open a second browser window (e.g., Incognito) to the same URL.
4. Drag a task in Window 1 and watch it move instantly in Window 2!
