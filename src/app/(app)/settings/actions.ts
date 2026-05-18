"use server";

import { revalidatePath } from "next/cache";

import { getViewerContext } from "@/lib/auth";
import type { FormState } from "@/lib/form-state";
import { getSupabaseServerClient } from "@/lib/supabase/server";

function readField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getDefaultWeekStart(locale: string | null | undefined) {
  return locale?.toLowerCase().startsWith("en-us") ? 0 : 1;
}

function normalizeRuleText(value: string) {
  return value ? value : null;
}

export async function saveHouseholdRulesAction(
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

  const viewer = await getViewerContext();
  if (!viewer.profile || !viewer.household) {
    return {
      status: "error",
      message: "Sign in to update household rules.",
    };
  }

  if (!["owner", "admin"].includes(viewer.household.memberRole)) {
    return {
      status: "error",
      message: "Only owners or admins can edit house rules.",
    };
  }

  const winnerRewardText = readField(formData, "winnerRewardText").slice(0, 140);
  const bottomForfeitText = readField(formData, "bottomForfeitText").slice(0, 140);

  const { data: currentSettings, error: settingsError } = await supabase
    .from("household_settings")
    .select(
      "locale, timezone, week_starts_on, allow_photo_proof, winner_reward_text, bottom_forfeit_text",
    )
    .eq("household_id", viewer.household.id)
    .maybeSingle();

  if (settingsError) {
    return {
      status: "error",
      message: settingsError.message || "Unable to load household rules.",
    };
  }

  const { error: updateError } = await supabase.from("household_settings").upsert({
    household_id: viewer.household.id,
    locale: currentSettings?.locale ?? viewer.household.locale,
    timezone: currentSettings?.timezone ?? viewer.household.timezone,
    week_starts_on:
      currentSettings?.week_starts_on ??
      getDefaultWeekStart(currentSettings?.locale ?? viewer.household.locale),
    allow_photo_proof: currentSettings?.allow_photo_proof ?? true,
    winner_reward_text: normalizeRuleText(winnerRewardText),
    bottom_forfeit_text: normalizeRuleText(bottomForfeitText),
  });

  if (updateError) {
    return {
      status: "error",
      message: updateError.message || "Unable to save household rules.",
    };
  }

  revalidatePath("/leaderboard");
  revalidatePath("/settings");

  return {
    status: "success",
    message: "House rules saved.",
  };
}

export async function archiveHouseholdMemberAction(
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

  const viewer = await getViewerContext();
  if (!viewer.profile || !viewer.household) {
    return {
      status: "error",
      message: "Sign in to manage household members.",
    };
  }

  if (!["owner", "admin"].includes(viewer.household.memberRole)) {
    return {
      status: "error",
      message: "Only owners or admins can pause members.",
    };
  }

  const memberId = readField(formData, "memberId");
  if (!memberId) {
    return {
      status: "error",
      message: "Choose a household member to pause.",
    };
  }

  const { data: targetMember, error: memberError } = await supabase
    .from("household_members")
    .select("id, household_id, profile_id, role, status, archived_at")
    .eq("id", memberId)
    .eq("household_id", viewer.household.id)
    .maybeSingle();

  if (memberError) {
    return {
      status: "error",
      message: memberError.message || "Unable to load that household member.",
    };
  }

  if (!targetMember) {
    return {
      status: "error",
      message: "That household member could not be found.",
    };
  }

  if (targetMember.role === "owner") {
    return {
      status: "error",
      message: "The household owner can’t be paused.",
    };
  }

  if (targetMember.profile_id === viewer.profile.id) {
    return {
      status: "error",
      message: "You can’t pause your own membership.",
    };
  }

  if (targetMember.status !== "active" || targetMember.archived_at) {
    return {
      status: "error",
      message: "That household member is already paused.",
    };
  }

  const { data: updatedMember, error: updateError } = await supabase
    .from("household_members")
    .update({
      status: "archived",
      archived_at: new Date().toISOString(),
    })
    .eq("id", memberId)
    .eq("household_id", viewer.household.id)
    .eq("status", "active")
    .is("archived_at", null)
    .select("id")
    .maybeSingle();

  if (updateError || !updatedMember) {
    return {
      status: "error",
      message: updateError?.message || "Unable to pause that household member.",
    };
  }

  revalidatePath("/home");
  revalidatePath("/leaderboard");
  revalidatePath("/settings");

  return {
    status: "success",
    message: "Household member paused.",
  };
}
