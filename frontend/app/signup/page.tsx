"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { isSupabaseConfigured, supabase } from "@/app/lib/supabase";

export default function Signup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const nextPath = searchParams.get("next");

  const handleSignup = async () => {
    if (!supabase) {
      alert("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in frontend/.env.local.");
      return;
    }

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);

    if (error) alert(error.message);
    else {
      alert("Signup successful! Please check your email to confirm your account.");
      router.push(nextPath ? `/login?next=${encodeURIComponent(nextPath)}` : "/login");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950 text-white">
      <div className="bg-zinc-900 p-6 rounded-xl w-80">
        <h1 className="text-xl mb-4">Signup</h1>

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
          onClick={handleSignup}
          disabled={loading || !isSupabaseConfigured}
          className="w-full rounded bg-indigo-600 p-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        {!isSupabaseConfigured && (
          <p className="mt-3 text-center text-xs text-amber-300">
            Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in frontend/.env.local
          </p>
        )}

        <p className="mt-4 text-center text-sm text-zinc-300">
          Already have an account?{" "}
          <Link href={nextPath ? `/login?next=${encodeURIComponent(nextPath)}` : "/login"} className="text-indigo-400 hover:text-indigo-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}