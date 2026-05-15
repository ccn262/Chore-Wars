"use server";

import { revalidatePath } from "next/cache";

import { getViewerContext } from "@/lib/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { FormState } from "@/lib/form-state";

function readField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function parsePositiveInteger(value: string, fallback: number) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
}

function requireAdminRole(role: string | null | undefined) {
  return role === "owner" || role === "admin";
}

function getActionErrorMessage(error: unknown, fallback: string) {
  if (error && typeof error === "object" && "message" in error) {
    const message = String((error as { message?: string }).message || "").trim();
    if (message) {
      return message;
    }
  }

  return fallback;
}

function refreshChorePaths() {
  revalidatePath("/");
  revalidatePath("/home");
  revalidatePath("/chores");
  revalidatePath("/leaderboard");
  revalidatePath("/reports");
}

export async function createChoreFromTemplateAction(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return { status: "error", message: "Supabase is not configured in this environment." };
  }

  const templateId = readField(formData, "templateId");
  if (!templateId) {
    return { status: "error", message: "Choose a starter chore template." };
  }

  const viewer = await getViewerContext();
  if (!viewer.session || !viewer.profile || !viewer.household) {
    return { status: "error", message: "Sign in before creating chores." };
  }

  if (!requireAdminRole(viewer.household.memberRole)) {
    return { status: "error", message: "Only the household owner or admin can add chores." };
  }

  const { data: template, error: templateError } = await supabase
    .from("chore_templates")
    .select(
      "id, template_key, default_title, icon_key, suggested_points, suggested_cadence, sort_order, category_id",
    )
    .eq("id", templateId)
    .maybeSingle();

  if (templateError || !template) {
    return {
      status: "error",
      message: getActionErrorMessage(templateError, "Template not found."),
    };
  }

  const { error: insertError } = await supabase.from("chores").insert({
    household_id: viewer.household.id,
    template_id: template.id,
    category_id: template.category_id,
    created_by_member_id: viewer.household.memberId,
    title: template.default_title,
    icon_key: template.icon_key,
    points: template.suggested_points,
    cadence: template.suggested_cadence,
    source: "template",
    status: "active",
    sort_order: template.sort_order,
  });

  if (insertError) {
    return {
      status: "error",
      message: getActionErrorMessage(insertError, "Unable to create that chore."),
    };
  }

  refreshChorePaths();
  return {
    status: "success",
    message: `${template.default_title} added to ${viewer.household.name}.`,
  };
}

export async function createCustomChoreAction(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return { status: "error", message: "Supabase is not configured in this environment." };
  }

  const viewer = await getViewerContext();
  if (!viewer.session || !viewer.profile || !viewer.household) {
    return { status: "error", message: "Sign in before creating chores." };
  }

  if (!requireAdminRole(viewer.household.memberRole)) {
    return { status: "error", message: "Only the household owner or admin can add chores." };
  }

  const title = readField(formData, "title");
  const cadence = readField(formData, "cadence");
  const points = parsePositiveInteger(readField(formData, "points"), 1);

  if (!title) {
    return { status: "error", message: "Enter a chore name." };
  }

  const { error: insertError } = await supabase.from("chores").insert({
    household_id: viewer.household.id,
    created_by_member_id: viewer.household.memberId,
    title,
    icon_key: "sparkles",
    points,
    cadence: cadence || null,
    source: "custom",
    status: "active",
    sort_order: 999,
  });

  if (insertError) {
    return {
      status: "error",
      message: getActionErrorMessage(insertError, "Unable to create that chore."),
    };
  }

  refreshChorePaths();
  return {
    status: "success",
    message: `${title} added to the household.`,
  };
}

export async function completeChoreAction(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return { status: "error", message: "Supabase is not configured in this environment." };
  }

  const choreId = readField(formData, "choreId");
  if (!choreId) {
    return { status: "error", message: "Choose a chore to complete." };
  }

  const viewer = await getViewerContext();
  if (!viewer.session || !viewer.profile) {
    return { status: "error", message: "Sign in to complete chores." };
  }

  const { data, error } = await supabase
    .rpc("complete_chore_atomically", {
      target_chore_id: choreId,
    })
    .single();
  const completion = data as
    | {
        status?: string;
        chore_title?: string | null;
        points_awarded?: number | null;
      }
    | null;

  if (error || !completion) {
    return {
      status: "error",
      message: getActionErrorMessage(error, "Could not record that completion."),
    };
  }

  if (completion.status === "already_completed") {
    return {
      status: "error",
      message: "That tap already landed. Give the house a second to catch up.",
    };
  }

  if (completion.status === "inserted") {
    refreshChorePaths();
    return {
      status: "success",
      message: `${completion.chore_title} done. +${completion.points_awarded} points.`,
    };
  }

  return {
    status: "error",
    message: "Could not record that completion.",
  };
}
