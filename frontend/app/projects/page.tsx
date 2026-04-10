"use client";

import { Plus } from "lucide-react";

const projects = [
  {
    name: "FlowForge Core",
    desc: "Main collaboration workspace",
  },
  {
    name: "AI Debug Tool",
    desc: "Debugging assistant module",
  },
  {
    name: "Chat System",
    desc: "Real-time communication module",
  },
];

export default function ProjectsPage() {
  return (
    <div>

      {/* Top Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>

        <button className="flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-500">
          <Plus size={18} />
          New Project
        </button>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 hover:border-indigo-500 transition cursor-pointer"
          >
            <h2 className="text-lg font-semibold mb-2">
              {project.name}
            </h2>

            <p className="text-sm text-zinc-400">
              {project.desc}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}