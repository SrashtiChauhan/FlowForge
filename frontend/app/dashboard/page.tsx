import Link from "next/link";

export default function Dashboard() {
  const links = [
    { href: "/projects", label: "Projects", desc: "Track delivery and create new initiatives" },
    { href: "/workspace", label: "Workspace", desc: "See active developers and live activity" },
    { href: "/chat", label: "Chat", desc: "Keep team communication in one place" },
  ];

  const stats = [
    { title: "Velocity", value: "+18%" },
    { title: "Deploys", value: "24" },
    { title: "Incidents", value: "2" },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl p-4 md:p-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="chip inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide">Command Center</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Dashboard</h1>
        </div>
        <Link href="/projects" className="accent-btn rounded-xl px-4 py-2 text-sm font-semibold transition">
          New Sprint Plan
        </Link>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.title} className="panel p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{stat.title}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="panel p-5 transition hover:-translate-y-1"
            >
              <h2 className="text-lg font-semibold text-slate-900">{item.label}</h2>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </Link>
          ))}
        </div>
    </div>
  );
}
