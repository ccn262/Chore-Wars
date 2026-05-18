"use server";

import { randomBytes } from "node:crypto";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getViewerContext } from "@/lib/auth";
import {
  buildInvitePath,
  buildInviteUrl,
  getHouseholdInviteByToken,
  getHouseholdMembershipForProfile,
} from "@/lib/household-invites";
import type { FormState } from "@/lib/form-state";
import { getSupabaseServerClient } from "@/lib/supabase/server";

function readField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getInviteExpiryIso() {
  return new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString();
}

function formatInviteError(error: unknown, fallback: string) {
  if (error && typeof error === "object" && "message" in error) {
    const message = String((error as { message?: string }).message || "").trim();
    if (message) {
      return message;
    }
  }

  return fallback;
}

function refreshInvitePaths() {
  revalidatePath("/settings");
}

export async function createHouseholdInviteAction(
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
      message: "Sign in to invite household members.",
    };
  }

  if (!["owner", "admin"].includes(viewer.household.memberRole)) {
    return {
      status: "error",
      message: "Only owners or admins can create invites.",
    };
  }

  const inviteEmail = readField(formData, "inviteEmail").toLowerCase();
  if (!inviteEmail) {
    return {
      status: "error",
      message: "Enter an email address for the invite.",
    };
  }

  const { data: pendingInvite, error: pendingError } = await supabase
    .from("household_invites")
    .select("id, token")
    .eq("household_id", viewer.household.id)
    .eq("invite_email", inviteEmail)
    .eq("status", "pending")
    .maybeSingle();

  if (pendingError) {
    return {
      status: "error",
      message: formatInviteError(pendingError, "Unable to check for an existing invite."),
    };
  }

  if (pendingInvite) {
    return {
      status: "error",
      message: "A pending invite already exists for that email.",
    };
  }

  const token = randomBytes(32).toString("base64url");
  const expiresAt = getInviteExpiryIso();

  const { data: invite, error: insertError } = await supabase
    .from("household_invites")
    .insert({
      household_id: viewer.household.id,
      invited_by_member_id: viewer.household.memberId,
      invite_email: inviteEmail,
      role: "member",
      token,
      status: "pending",
      expires_at: expiresAt,
    })
    .select("id, token, invite_email, expires_at, status")
    .single();

  if (insertError || !invite) {
    if (insertError?.code === "23505") {
      return {
        status: "error",
        message: "A pending invite already exists for that email.",
      };
    }

    return {
      status: "error",
      message: formatInviteError(insertError, "Unable to create the invite."),
    };
  }

  refreshInvitePaths();

  return {
    status: "success",
    message: `Invite link ready for ${inviteEmail}.`,
    data: {
      inviteUrl: buildInviteUrl(invite.token),
      inviteEmail: invite.invite_email,
      expiresAt: invite.expires_at,
      token: invite.token,
    },
  };
}

export async function acceptHouseholdInviteAction(
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

  const token = readField(formData, "token");
  if (!token) {
    return {
      status: "error",
      message: "Open the invite link again.",
    };
  }

  const viewer = await getViewerContext();
  if (!viewer.profile || !viewer.session) {
    return {
      status: "error",
      message: "Sign in to join this household.",
    };
  }

  const invite = await getHouseholdInviteByToken(supabase, token);
  if (!invite) {
    return {
      status: "error",
      message: "This invite link is invalid or no longer available.",
    };
  }

  const membership = await getHouseholdMembershipForProfile(
    supabase,
    invite.householdId,
    viewer.profile.id,
  );
  const profileEmail = viewer.profile.email?.toLowerCase() ?? "";
  const inviteEmail = invite.inviteEmail.toLowerCase();

  if (membership) {
    if (
      invite.status === "pending" &&
      (!profileEmail || profileEmail === inviteEmail)
    ) {
      await supabase
        .from("household_invites")
        .update({
          status: "accepted",
          accepted_at: new Date().toISOString(),
          accepted_by_profile_id: viewer.profile.id,
        })
        .eq("token", token)
        .eq("status", "pending");
    }

    refreshInvitePaths();
    revalidatePath(buildInvitePath(token));
    redirect("/home");
  }

  if (invite.status === "revoked") {
    return {
      status: "error",
      message: "This invite has been revoked.",
    };
  }

  if (invite.status === "expired" || invite.isExpired) {
    return {
      status: "error",
      message: "This invite has expired.",
    };
  }

  if (invite.status === "accepted") {
    return {
      status: "error",
      message: "This invite has already been used.",
    };
  }

  if (profileEmail && inviteEmail !== profileEmail) {
    return {
      status: "error",
      message: "Sign in with the invited email address to continue.",
    };
  }

  const { data: updatedInvite, error: updateError } = await supabase
    .from("household_invites")
    .update({
      status: "accepted",
      accepted_at: new Date().toISOString(),
      accepted_by_profile_id: viewer.profile.id,
    })
    .eq("token", token)
    .eq("status", "pending")
    .eq("invite_email", viewer.profile.email ?? "")
    .select("id")
    .maybeSingle();

  if (updateError || !updatedInvite) {
    return {
      status: "error",
      message: formatInviteError(
        updateError,
        "We could not join this household right now.",
      ),
    };
  }

  refreshInvitePaths();
  revalidatePath(buildInvitePath(token));
  redirect("/home");
}
