"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isPublicRoute =
    pathname === "/" || pathname === "/login" || pathname === "/signup";

  return (
    <div className="flex min-h-screen">
      {!isPublicRoute && <Sidebar />}
      <main className={isPublicRoute ? "flex-1" : "flex-1 p-6"}>{children}</main>
    </div>
  );
}
