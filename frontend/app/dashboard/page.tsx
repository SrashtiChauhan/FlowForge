import Link from "next/link";

export default function Dashboard() {
  const links = [
    { href: "/projects", label: "Projects" },
    { href: "/workspace", label: "Workspace" },
    { href: "/chat", label: "Chat" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Dashboard</h1>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-gray-200 bg-white p-5 text-gray-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="text-lg font-semibold">{item.label}</h2>
              <p className="mt-1 text-sm text-gray-600">Open {item.label.toLowerCase()} page</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
