import type { SupabaseClient } from "@supabase/supabase-js";

import { appUrl } from "@/lib/site";

export type HouseholdInviteSummary = {
  id: string;
  householdId: string;
  invitedByMemberId: string | null;
  inviteEmail: string;
  role: string;
  token: string;
  status: string;
  expiresAt: string;
  acceptedAt: string | null;
  createdAt: string;
  inviteUrl: string;
  isExpired: boolean;
};

function mapInviteRow(row: {
  id: string;
  household_id: string;
  invited_by_member_id: string | null;
  invite_email: string;
  role: string;
  token: string;
  status: string;
  expires_at: string;
  accepted_at: string | null;
  created_at: string;
}): HouseholdInviteSummary {
  const inviteUrl = `${appUrl}/invite/${row.token}`;

  return {
    id: row.id,
    householdId: row.household_id,
    invitedByMemberId: row.invited_by_member_id,
    inviteEmail: row.invite_email,
    role: row.role,
    token: row.token,
    status: row.status,
    expiresAt: row.expires_at,
    acceptedAt: row.accepted_at,
    createdAt: row.created_at,
    inviteUrl,
    isExpired:
      row.status === "expired" ||
      new Date(row.expires_at).getTime() <= Date.now(),
  };
}

export function buildInvitePath(token: string) {
  return `/invite/${token}`;
}

export function buildInviteUrl(token: string) {
  return `${appUrl}${buildInvitePath(token)}`;
}

export async function getHouseholdInvitesForHousehold(
  supabase: SupabaseClient,
  householdId: string,
) {
  const { data, error } = await supabase
    .from("household_invites")
    .select(
      "id, household_id, invited_by_member_id, invite_email, role, token, status, expires_at, accepted_at, created_at",
    )
    .eq("household_id", householdId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message || "Unable to load household invites.");
  }

  return (data ?? []).map((row) => mapInviteRow(row));
}

export async function getHouseholdInviteByToken(
  supabase: SupabaseClient,
  token: string,
) {
  const { data, error } = await supabase
    .from("household_invites")
    .select(
      "id, household_id, invited_by_member_id, invite_email, role, token, status, expires_at, accepted_at, created_at",
    )
    .eq("token", token)
    .maybeSingle();

  if (error) {
    throw new Error(error.message || "Unable to load invite.");
  }

  if (!data) {
    return null;
  }

  return mapInviteRow(data);
}

export async function getHouseholdMembershipForProfile(
  supabase: SupabaseClient,
  householdId: string,
  profileId: string,
) {
  const { data, error } = await supabase
    .from("household_members")
    .select("id, role, status, archived_at")
    .eq("household_id", householdId)
    .eq("profile_id", profileId)
    .eq("status", "active")
    .is("archived_at", null)
    .maybeSingle();

  if (error) {
    throw new Error(error.message || "Unable to load membership.");
  }

  return data ?? null;
}
