import Link from "next/link";

export default function HomePage() {
	return (
		<main className="mx-auto grid min-h-[calc(100vh-6rem)] w-full max-w-6xl items-center gap-8 p-4 md:grid-cols-2 md:p-10">
			<section>
				<p className="chip inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide">Team Workflow</p>
				<h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">Build faster with shared momentum.</h1>
				<p className="mt-4 max-w-lg text-base text-slate-600 md:text-lg">
					FlowForge keeps your projects, workspace updates, and team chat in one focused command center.
				</p>

				<div className="mt-7 flex flex-wrap gap-3">
					<Link href="/dashboard" className="accent-btn rounded-xl px-5 py-3 text-sm font-semibold transition">
						Open Dashboard
					</Link>
					<Link
						href="/projects"
						className="rounded-xl border border-(--line) bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
					>
						View Projects
					</Link>
				</div>
			</section>

			<section className="panel p-6 md:p-8">
				<h2 className="text-xl font-semibold text-slate-900">Today at a glance</h2>
				<div className="mt-5 grid gap-4 sm:grid-cols-3 md:grid-cols-1">
					<div className="rounded-xl bg-(--bg-soft) p-4">
						<p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Active Projects</p>
						<p className="mt-2 text-2xl font-bold text-slate-900">12</p>
					</div>
					<div className="rounded-xl bg-(--bg-soft) p-4">
						<p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Open Tasks</p>
						<p className="mt-2 text-2xl font-bold text-slate-900">34</p>
					</div>
					<div className="rounded-xl bg-(--bg-soft) p-4">
						<p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Team Online</p>
						<p className="mt-2 text-2xl font-bold text-slate-900">7</p>
					</div>
				</div>
			</section>
		</main>
	);
}