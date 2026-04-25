"use client";

import { KanbanBoard } from "../components/kanban/KanbanBoard";

const users = [
  { name: "Shrinivas", status: "Working on UI" },
  { name: "Rahul", status: "Fixing API bug" },
  { name: "Aman", status: "Reviewing code" },
];

const activities = [
  "Shrinivas updated UI components",
  "Rahul fixed login bug",
  "Aman pushed new changes",
];

export default function WorkspacePage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 p-4 md:grid-cols-3 md:p-10">
      <div className="panel p-4 md:col-span-1">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Active Developers</h2>

        <div className="space-y-3">
          {users.map((user, i) => (
            <div key={i} className="rounded-lg border border-(--line) bg-(--bg-soft) p-3">
              <p className="font-medium text-slate-900">{user.name}</p>
              <p className="text-sm text-slate-600">{user.status}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="panel p-6 md:col-span-2">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Workspace Tasks</h2>

        <div className="h-[600px]">
          <KanbanBoard />
        </div>
      </div>

      <div className="panel p-4 md:col-span-3">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Activity Feed</h2>

        <ul className="space-y-2 text-slate-700">
          {activities.map((activity, i) => (
            <li key={i} className="rounded-lg border border-(--line) bg-(--bg-soft) p-3">
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}