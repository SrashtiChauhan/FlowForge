"use client";

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
    <div className="grid grid-cols-3 gap-6">

      {/* Left: Active Users */}
      <div className="col-span-1 bg-zinc-900 p-4 rounded-xl border border-zinc-800">
        <h2 className="text-lg font-semibold mb-4">Active Developers</h2>

        <div className="space-y-3">
          {users.map((user, i) => (
            <div
              key={i}
              className="bg-zinc-800 p-3 rounded-lg"
            >
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-zinc-400">{user.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Center: Workspace */}
      <div className="col-span-2 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <h2 className="text-lg font-semibold mb-4">Workspace</h2>

        <div className="h-64 flex items-center justify-center text-zinc-500">
          Live workspace coming soon 🚀
        </div>
      </div>

      {/* Bottom: Activity Feed */}
      <div className="col-span-3 bg-zinc-900 p-4 rounded-xl border border-zinc-800">
        <h2 className="text-lg font-semibold mb-4">Activity Feed</h2>

        <ul className="space-y-2 text-zinc-300">
          {activities.map((activity, i) => (
            <li key={i} className="bg-zinc-800 p-2 rounded-lg">
              {activity}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}