import { NextResponse } from "next/server";

import { resolvePostAuthPath } from "@/lib/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  const destination = await resolvePostAuthPath(supabase, user);
  return NextResponse.redirect(new URL(destination, request.url));
}
