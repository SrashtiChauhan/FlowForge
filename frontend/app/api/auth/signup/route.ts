import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { email, password, name, username, mobile } = await req.json();

  if (!email || !password || !name || !username) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  // Create user with email pre-confirmed — no email sent, no rate limit
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: name,
      username,
      mobile,
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Insert profile row
  if (data.user) {
    const { error: profileError } = await supabaseAdmin.from("profiles").insert([
      {
        id: data.user.id,
        email,
        name,
        username,
        mobile,
      },
    ]);

    if (profileError) {
      return NextResponse.json({ error: "Failed to create profile: " + profileError.message }, { status: 400 });
    }
  }

  return NextResponse.json({ success: true });
}
