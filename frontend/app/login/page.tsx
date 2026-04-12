"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) alert(error.message);
    else router.push("/dashboard");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950 text-white">
      <div className="bg-zinc-900 p-6 rounded-xl w-80">
        <h1 className="text-xl mb-4">Login</h1>

        <input
          className="w-full p-2 mb-3 bg-zinc-800 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 bg-zinc-800 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded bg-indigo-600 p-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center text-sm text-zinc-300">
          New here?{" "}
          <Link href="/signup" className="text-indigo-400 hover:text-indigo-300">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}