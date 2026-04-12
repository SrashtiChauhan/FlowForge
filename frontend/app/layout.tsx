import "./globals.css";
import Sidebar from "./components/Sidebar";
import { Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlowForge",
  description: "Team workflow command center",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} min-h-screen md:flex`}>
        <Sidebar />

        <main className="w-full p-4 md:flex-1 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}