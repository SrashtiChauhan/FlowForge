"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `block px-3 py-2 rounded-lg ${
      pathname === path
        ? "bg-indigo-600 text-white"
        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 h-screen bg-zinc-900 p-4">
      <h1 className="text-2xl font-bold text-indigo-500 mb-6">
        FlowForge
      </h1>

      <nav className="flex flex-col gap-2">
        <Link href="/dashboard" className={linkClass("/dashboard")}>
          Dashboard
        </Link>

        <Link href="/projects" className={linkClass("/projects")}>
          Projects
        </Link>

        <Link href="/workspace" className={linkClass("/workspace")}>
          Workspace
        </Link>

        <Link href="/chat" className={linkClass("/chat")}>
          Chat
        </Link>
      </nav>
    </aside>
  );
}