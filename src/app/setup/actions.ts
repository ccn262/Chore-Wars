"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createHouseholdForProfile,
  ensureProfileForUser,
  getFriendlyAuthErrorMessage,
} from "@/lib/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { FormState } from "@/lib/form-state";

function readField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function createHouseholdAction(
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

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return {
      status: "error",
      message: "Sign in before creating a household.",
    };
  }

  const householdName = readField(formData, "householdName");
  if (!householdName) {
    return {
      status: "error",
      message: "Enter a household name.",
    };
  }

  try {
    const profile = await ensureProfileForUser(supabase, session.user);
    await createHouseholdForProfile(supabase, profile, householdName);
  } catch (error) {
    return {
      status: "error",
      message: getFriendlyAuthErrorMessage(error),
    };
  }

  revalidatePath("/");
  revalidatePath("/home");
  revalidatePath("/settings");
  redirect("/home");
}
