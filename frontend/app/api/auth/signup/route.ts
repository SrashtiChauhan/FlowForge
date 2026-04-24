import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, username, mobile } = await req.json();

    // Input validation
    if (!email || !password || !name || !username) {
      return NextResponse.json(
        { error: "Missing required fields: email, password, name, username are required." }, 
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." }, 
        { status: 400 }
      );
    }

    // Password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." }, 
        { status: 400 }
      );
    }

    // Username validation
    if (username.length < 3 || username.length > 20) {
      return NextResponse.json(
        { error: "Username must be between 3-20 characters." }, 
        { status: 400 }
      );
    }

    // Environment variables check
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
      console.error("Missing Supabase environment variables");
      return NextResponse.json(
        { error: "Server configuration error." }, 
        { status: 500 }
      );
    }

    // Initialize Supabase admin client
    const supabaseAdmin = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY,
      { 
        auth: { 
          autoRefreshToken: false, 
          persistSession: false 
        } 
      }
    );

    // 1. Check for duplicate username
    const { data: existingProfile } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("username", username.toLowerCase().trim())
      .maybeSingle();

    if (existingProfile) {
      return NextResponse.json(
        { error: "Username already taken." }, 
        { status: 400 }
      );
    }


    // 3. Create user with admin privileges (email pre-confirmed)
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: email.toLowerCase().trim(),
      password,
      email_confirm: true,
      user_metadata: {
        full_name: name.trim(),
        username: username.toLowerCase().trim(),
        mobile: mobile?.trim() || null,
      },
    });

    if (userError || !userData.user) {
      const message = (userError?.message || "").toLowerCase();

      if (
        message.includes("already registered") ||
        message.includes("already exists") ||
        message.includes("user already")
      ) {
        return NextResponse.json(
          { error: "Email already registered." },
          { status: 400 }
        );
      }

      console.error("User creation error:", userError);
      return NextResponse.json(
        { error: userError?.message || "Failed to create user." }, 
        { status: 400 }
      );
    }

    const user = userData.user;

    // 4. Create profile row
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .insert([{
        id: user.id,
        email: user.email!,
        name: user.user_metadata.full_name as string,
        username: user.user_metadata.username as string,
        mobile: user.user_metadata.mobile as string | null,
        updated_at: new Date().toISOString(),
      }]);

    if (profileError) {
      console.error("Profile creation error:", profileError);
      // Cleanup: Delete user if profile creation fails
      try {
        await supabaseAdmin.auth.admin.deleteUser(user.id);
      } catch (cleanupError) {
        console.error("Cleanup error:", cleanupError);
      }
      return NextResponse.json(
        { error: `Failed to create profile: ${profileError.message}` }, 
        { status: 400 }
      );
    }

    // Success response (no sensitive data)
    return NextResponse.json({ 
      success: true, 
      userId: user.id,
      email: user.email 
    }, { status: 201 });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error." }, 
      { status: 500 }
    );
  }
}