"use client";

import { Plus, CalendarClock, Users, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { isSupabaseConfigured, supabase } from "@/app/lib/supabase";
import { useState, useEffect } from "react";

const projects = [
  {
    name: "FlowForge Core",
    desc: "Main collaboration workspace",
    members: 6,
    due: "Apr 21",
    tags: ["React", "Next.js", "Core"],
  },
  {
    name: "AI Debug Tool",
    desc: "Debugging assistant module",
    members: 4,
    due: "Apr 18",
    tags: ["AI", "Python", "Debug"],
  },
  {
    name: "Chat System",
    desc: "Real-time communication module",
    members: 5,
    due: "Apr 26",
    tags: ["WebSockets", "Node.js", "Real-time"],
  },
];

export default function ProjectsPage() {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredProjects = projects.filter((project) => {
    const query = debouncedSearchTerm.toLowerCase();
    return (
      project.name.toLowerCase().includes(query) ||
      project.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

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
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="chip inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide">FlowForge</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Projects</h1>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
          <div className="relative flex-1 sm:w-64 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          
          <button
            onClick={handleNewProject}
            disabled={creating}
            className="accent-btn flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition whitespace-nowrap"
          >
            <Plus size={18} />
            {creating ? "Creating..." : "New Project"}
          </button>
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="panel group cursor-pointer p-5 transition hover:-translate-y-1"
            >
              <h2 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-emerald-700">{project.name}</h2>
              <p className="mb-4 line-clamp-2 text-sm text-slate-600">{project.desc}</p>

              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 transition-colors hover:bg-emerald-50 hover:text-emerald-600">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Users size={14} className="text-slate-400" /> 
                  <span className="font-medium text-slate-700">{project.members}</span> 
                  <span className="hidden sm:inline">members</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarClock size={14} className="text-slate-400" />
                  <span>Due {project.due}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="panel flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 rounded-full bg-slate-50 p-4 text-slate-400">
            <Search size={32} />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No projects found</h3>
          <p className="mt-1 text-slate-500">Try adjusting your search terms or tags.</p>
          <button 
            onClick={() => setSearchTerm("")}
            className="mt-6 text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}