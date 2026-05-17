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
     <main className={isPublicRoute ? "min-w-0 flex-1 overflow-x-hidden" : "min-w-0 flex-1 overflow-x-hidden p-6"}>{children}</main>
    </div>
  );
}
