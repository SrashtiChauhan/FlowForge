import Link from "next/link";

export default function HomePage() {
	return (
		<main className="min-h-screen bg-gray-100 p-10">
			<div className="mx-auto max-w-3xl rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
				<h1 className="text-3xl font-bold text-gray-900">FlowForge</h1>
				<p className="mt-2 text-gray-600">Welcome. Start from the dashboard to access your pages.</p>

				<Link
					href="/dashboard"
					className="mt-6 inline-block rounded-md bg-gray-900 px-4 py-2 text-white transition hover:bg-gray-800"
				>
					Open Dashboard
				</Link>
			</div>
		</main>
	);
}