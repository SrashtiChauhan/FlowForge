import Link from "next/link";
import { Activity, FolderOpen, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";

const links = [
  {
    href: "/projects",
    label: "Projects",
    desc: "Track delivery and create new initiatives.",
    icon: FolderOpen,
  },
  {
    href: "/workspace",
    label: "Workspace",
    desc: "See active developers and live activity.",
    icon: Activity,
  },
  {
    href: "/chat",
    label: "Chat",
    desc: "Keep team communication in one place.",
    icon: MessageSquare,
  },
];

const stats = [
  {
    title: "Velocity",
    value: "+18%",
    detail: "Growth over last sprint",
    icon: Activity,
  },
  {
    title: "Deploys",
    value: "24",
    detail: "Successful releases this week",
    icon: Sparkles,
  },
  {
    title: "Incidents",
    value: "2",
    detail: "Minor issues currently open",
    icon: ShieldCheck,
  },
];

const activity = [
  "Sprint planning started for Q2 roadmap.",
  "New design review added to Marketing campaign.",
  "Standup summary posted in team chat.",
];

export default function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-6xl p-4 md:p-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="chip inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Command Center
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            Get a quick pulse on your team, upcoming work, and the most important projects right now.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/projects" className="accent-btn rounded-xl px-4 py-2 text-sm font-semibold transition">
            New Sprint Plan
          </Link>
          <Link href="/workspace" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            View Workspace
          </Link>
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="panel p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-teal-700">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500">{stat.detail}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="panel flex flex-col gap-4 p-5 transition hover:-translate-y-1"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-teal-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{item.label}</h2>
                  <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                </div>
                <p className="mt-auto text-sm font-medium text-teal-700">Open</p>
              </Link>
            );
          })}
        </div>

        <div className="panel p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Recent activity
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">What’s happening</h2>
            </div>
            <span className="chip inline-flex px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
              Live updates
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {activity.map((item) => (
              <div key={item} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </div>

          <Link href="/chat" className="mt-6 inline-flex items-center rounded-xl bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700 transition hover:bg-teal-100">
            <MessageSquare className="mr-2 h-4 w-4" />
            Open team chat
          </Link>
        </div>
      </div>
    </div>
  );
}
