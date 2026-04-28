"use client";

import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      {/* NAV */}
      <header
        className="sticky top-0 z-50"
        style={{
          borderBottom: "1px solid var(--line)",
          background: "var(--bg-panel)",
        }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{ background: "var(--accent)" }}
            >
              FF
            </div>
            <span
              className="font-semibold tracking-tight"
              style={{ color: "var(--text-main)" }}
            >
              FlowForge
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm md:flex">
            <Link
              href="/projects"
              className="transition-opacity opacity-70 hover:opacity-100"
              style={{ color: "var(--text-main)" }}
            >
              Projects
            </Link>
            <Link
              href="/dashboard"
              className="transition-opacity opacity-70 hover:opacity-100"
              style={{ color: "var(--text-main)" }}
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="transition-opacity opacity-70 hover:opacity-100"
              style={{ color: "var(--text-main)" }}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="accent-btn rounded-lg px-4 py-2 text-sm font-medium"
            >
              Sign up
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded p-2 md:hidden"
            style={{ color: "var(--text-muted)" }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div
            className="space-y-1 px-5 pb-4 md:hidden"
            style={{
              borderTop: "1px solid var(--line)",
              background: "var(--bg-panel)",
            }}
          >
            <Link
              href="/projects"
              className="block py-2 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Projects
            </Link>
            <Link
              href="/dashboard"
              className="block py-2 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="block py-2 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="accent-btn mt-2 block rounded-lg px-4 py-2 text-center text-sm font-medium"
            >
              Sign up
            </Link>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-5xl px-5 pb-16 pt-20 md:pt-32">
        <span
          className="chip mb-6 inline-block px-3 py-1 text-xs font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          Open source · Free to start
        </span>

        <h1
          className="max-w-2xl text-5xl font-bold leading-[1.1] tracking-tight md:text-[4.5rem]"
          style={{ color: "var(--text-main)" }}
        >
          Where your team&apos;s work actually gets done.
        </h1>

        <p
          className="mt-6 max-w-md text-lg leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Kanban boards, team chat, and project tracking — without the extra
          tools you don&apos;t need.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/signup"
            className="accent-btn rounded-xl px-6 py-3 text-sm font-semibold"
          >
            Start free
          </Link>
          <Link
            href="/projects"
            className="text-sm font-medium underline underline-offset-4"
            style={{ color: "var(--text-muted)" }}
          >
            Browse projects →
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-5xl px-5 pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: "▦",
              title: "Kanban Boards",
              body: "Drag tasks across columns. See what's in progress, what's blocked, what's shipped.",
            },
            {
              icon: "◻",
              title: "Team Chat",
              body: "Messages that stay tied to the project they belong to. No context-switching.",
            },
            {
              icon: "◈",
              title: "Project Tracking",
              body: "Every project has an owner and a status. Nothing silently falls off the radar.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="panel p-6 transition-shadow hover:shadow-lg"
            >
              <div
                className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg text-base"
                style={{
                  background: "var(--bg-soft)",
                  color: "var(--accent)",
                }}
              >
                {f.icon}
              </div>
              <h3
                className="mb-1.5 text-sm font-semibold"
                style={{ color: "var(--text-main)" }}
              >
                {f.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="mx-auto max-w-5xl px-5 pb-24">
        <div className="panel flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2
              className="text-xl font-bold"
              style={{ color: "var(--text-main)" }}
            >
              Ready to cut the noise?
            </h2>
            <p
              className="mt-1 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Set up your workspace in under 2 minutes.
            </p>
          </div>
          <Link
            href="/signup"
            className="accent-btn whitespace-nowrap rounded-xl px-6 py-3 text-sm font-semibold"
          >
            Create your workspace
          </Link>
        </div>
      </section>
    </div>
  );
}
