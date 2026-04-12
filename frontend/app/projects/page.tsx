"use client";

import { Plus, CalendarClock, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { isSupabaseConfigured, supabase } from "@/app/lib/supabase";
import { useState } from "react";

const projects = [
  {
    name: "FlowForge Core",
    desc: "Main collaboration workspace",
    members: 6,
    due: "Apr 21",
  },
  {
    name: "AI Debug Tool",
    desc: "Debugging assistant module",
    members: 4,
    due: "Apr 18",
  },
  {
    name: "Chat System",
    desc: "Real-time communication module",
    members: 5,
    due: "Apr 26",
  },
];

export default function ProjectsPage() {
  const router = useRouter();
  const [creating, setCreating] = useState(false);

  const handleNewProject = async () => {
    if (!isSupabaseConfigured || !supabase) {
      router.push("/login?next=/projects");
      return;
    }

    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      router.push("/login?next=/projects");
      return;
    }

    const name = window.prompt("Project name");
    if (!name?.trim()) return;

    const desc = window.prompt("Project description (optional)") || "";

    setCreating(true);
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
      body: JSON.stringify({ name: name.trim(), desc: desc.trim() }),
    });
    setCreating(false);

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Failed to create project");
      return;
    }

    alert(`Project created: ${result.project.name}`);
  };

  return (
    <div className="mx-auto w-full max-w-6xl p-4 md:p-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="chip inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide">Portfolio</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Projects</h1>
        </div>

        <button
          onClick={handleNewProject}
          disabled={creating}
          className="accent-btn flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition"
        >
          <Plus size={18} />
          {creating ? "Creating..." : "New Project"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className="panel cursor-pointer p-5 transition hover:-translate-y-1"
          >
            <h2 className="mb-2 text-lg font-semibold text-slate-900">{project.name}</h2>

            <p className="text-sm text-slate-600">{project.desc}</p>

            <div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <Users size={15} /> {project.members} members
              </span>
              <span className="flex items-center gap-1">
                <CalendarClock size={15} /> {project.due}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}