import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
export const runtime = "nodejs";
const mapProjectRow = (row: any) => {
  return {
    id: row.id,
    name: row.name,
    desc: row.description ?? row.desc ?? "",
    members: row.members ?? 0,
    tags: row.tags ?? [],
    due: row.due ?? null,
    createdAt: row.createdAt ?? row.created_at ?? new Date().toISOString(),
  };
}

type CreateProjectPayload = {
  name?: string;
  desc?: string;
  members?: number;
  due?: string | null;
  tags?: string[];
};
export const GET = async (request: Request) => {
  const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseURL, supabaseAnonKey, {
    auth: {autoRefreshToken: false, persistSession: false},
  });

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if(!token) return NextResponse.json({error: "Unauthorized"}, {status: 401});
  
  const {data: userData, error: userError} = await supabase.auth.getUser(token);
  if(userError || !userData?.user) return NextResponse.json({error: "Details not Found"}, {status: 401});

  const {data: projects, error} = await supabase
     .from('projects')
     .select("*")
     .eq("owner_id",userData.user.id)
     .order('created_at', {ascending: false});
  if(error) return NextResponse.json({error: error.message}, {status: 500});
  const apiProjects = (projects || []).map(mapProjectRow);
  return NextResponse.json({projects: apiProjects});
}
export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
    return NextResponse.json(
      { error: "Supabase env is missing on server." },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: userData, error: userError } = await supabase.auth.getUser(token);

  if (userError || !userData.user) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  const payload = (await request.json()) as CreateProjectPayload;
  const name = payload.name?.trim();
  const desc = payload.desc?.trim() || "";

  if (!name) {
    return NextResponse.json(
      { error: "Project name is required" },
      { status: 400 }
    );
  }

  // Use service role on server to bypass RLS for controlled inserts.
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: inserted, error: insertError } = await supabaseAdmin
      .from('projects')
      .insert([{
        id: randomUUID(),
        name,
        description: desc,
        owner_id: userData.user.id,
        members: payload.members ?? 1,
        due: payload.due ?? null,
        tags: payload.tags ?? [],
        created_at: new Date().toISOString()
      }])
      .select('*')
      .single();
  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json(
    {
      project: mapProjectRow(inserted)
    },
    { status: 201 }
  );
}
