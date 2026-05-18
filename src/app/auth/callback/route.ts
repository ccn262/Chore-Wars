import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { resolvePostAuthPath } from "@/lib/auth";
import { normalizeInternalPath } from "@/lib/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const pendingAuthReturnPathCookieName = "chore-wars-auth-return-path";
const pendingAuthReturnPathCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/auth",
  maxAge: 60 * 15,
};

const clearPendingAuthReturnPathCookieOptions = {
  ...pendingAuthReturnPathCookieOptions,
  maxAge: 0,
};

function clearPendingAuthReturnPath(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  cookieStore.set(
    pendingAuthReturnPathCookieName,
    "",
    clearPendingAuthReturnPathCookieOptions,
  );
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const cookieStore = await cookies();
  const nextPath = normalizeInternalPath(url.searchParams.get("next"), "");
  const rawPendingReturnPath =
    cookieStore.get(pendingAuthReturnPathCookieName)?.value ?? "";
  const pendingReturnPath = normalizeInternalPath(
    rawPendingReturnPath,
    "",
  );
  const hasPendingReturnPathCookie = Boolean(rawPendingReturnPath.trim());
  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    if (hasPendingReturnPathCookie) {
      clearPendingAuthReturnPath(cookieStore);
    }
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      if (hasPendingReturnPathCookie) {
        clearPendingAuthReturnPath(cookieStore);
      }
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (hasPendingReturnPathCookie) {
      clearPendingAuthReturnPath(cookieStore);
    }
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  const destination = nextPath || pendingReturnPath;
  if (destination) {
    clearPendingAuthReturnPath(cookieStore);
    return NextResponse.redirect(new URL(destination, request.url));
  }

  if (hasPendingReturnPathCookie) {
    clearPendingAuthReturnPath(cookieStore);
  }

  const resolvedDestination = await resolvePostAuthPath(supabase, user);
  return NextResponse.redirect(new URL(resolvedDestination, request.url));
}
