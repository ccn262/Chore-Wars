"use server";

import type { Route } from "next";
import { redirect } from "next/navigation";

import {
  ensureProfileForUser,
  getFriendlyAuthErrorMessage,
  getPrimaryHouseholdForProfile,
} from "@/lib/auth";
import { normalizeInternalPath } from "@/lib/navigation";
import { appUrl } from "@/lib/site";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { FormState } from "@/lib/form-state";

function readField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readNextPath(formData: FormData) {
  return normalizeInternalPath(readField(formData, "next"), "");
}

export async function signInAction(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return {
      status: "error",
      message: "Supabase is not configured in this environment.",
    };
  }

  const email = readField(formData, "email");
  const password = readField(formData, "password");
  const returnTo = readNextPath(formData);
  const normalizedEmail = email.toLowerCase();

  if (!normalizedEmail || !password) {
    return {
      status: "error",
      message: "Enter your email and password.",
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password,
  });

  if (error || !data.user) {
    return {
      status: "error",
      message: getFriendlyAuthErrorMessage(error),
    };
  }

  const profile = await ensureProfileForUser(supabase, data.user);
  const household = await getPrimaryHouseholdForProfile(supabase, profile.id);

  if (returnTo) {
    redirect(returnTo as Route);
  }

  redirect(household ? "/home" : "/setup/create-household");
}

export async function signUpAction(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return {
      status: "error",
      message: "Supabase is not configured in this environment.",
    };
  }

  const displayName = readField(formData, "displayName");
  const email = readField(formData, "email");
  const password = readField(formData, "password");
  const returnTo = readNextPath(formData);
  const normalizedEmail = email.toLowerCase();

  if (!normalizedEmail || !password) {
    return {
      status: "error",
      message: "Enter your email and password.",
    };
  }

  const callbackUrl = new URL("/auth/callback", appUrl);

  if (returnTo) {
    callbackUrl.searchParams.set("next", returnTo);
  }

  const { data, error } = await supabase.auth.signUp({
    email: normalizedEmail,
    password,
    options: {
      emailRedirectTo: callbackUrl.toString(),
    },
  });

  if (error || !data.user) {
    return {
      status: "error",
      message: getFriendlyAuthErrorMessage(error),
    };
  }

  const profile = await ensureProfileForUser(supabase, data.user, displayName);

  if (data.session) {
    const household = await getPrimaryHouseholdForProfile(supabase, profile.id);
    if (returnTo) {
      redirect(returnTo as Route);
    }
    redirect(household ? "/home" : "/setup/create-household");
  }

  return {
    status: "success",
    message:
      "Check your email to finish creating your account, then come back here to sign in.",
  };
}

export async function signOutAction() {
  const supabase = await getSupabaseServerClient();
  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect("/");
}
