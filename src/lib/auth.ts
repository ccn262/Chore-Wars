import type { Session, SupabaseClient, User } from "@supabase/supabase-js";

import { defaultLocale, defaultTimezone } from "@/lib/site";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export type ViewerProfile = {
  id: string;
  auth_user_id: string | null;
  email: string | null;
  display_name: string;
  locale: string | null;
  timezone: string | null;
};

export type ViewerHousehold = {
  id: string;
  name: string;
  locale: string | null;
  timezone: string | null;
  status: string;
  memberId: string;
  memberRole: string;
};

export type ViewerContext = {
  supabase: SupabaseClient | null;
  session: Session | null;
  user: User | null;
  profile: ViewerProfile | null;
  household: ViewerHousehold | null;
};

function displayNameFromEmail(email: string | null | undefined) {
  if (!email) {
    return "Household member";
  }

  const base = email.split("@")[0]?.replace(/[._-]+/g, " ").trim();
  if (!base) {
    return "Household member";
  }

  return base
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getWeekStartForLocale(locale: string | null | undefined) {
  return locale?.toLowerCase().startsWith("en-us") ? 0 : 1;
}

function getAuthErrorMessage(error: unknown, fallback: string) {
  if (error && typeof error === "object" && "message" in error) {
    const message = String((error as { message?: string }).message || "").trim();
    if (message) {
      return message;
    }
  }

  return fallback;
}

export function getFriendlyAuthErrorMessage(error: unknown) {
  return getAuthErrorMessage(error, "Something went wrong. Please try again.");
}

export async function ensureProfileForUser(
  supabase: SupabaseClient,
  user: User,
  displayName?: string,
) {
  const { data: existingProfile, error: profileLookupError } = await supabase
    .from("profiles")
    .select("id, auth_user_id, email, display_name, locale, timezone")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  if (profileLookupError) {
    throw new Error(getAuthErrorMessage(profileLookupError, "Unable to load profile."));
  }

  if (existingProfile) {
    return existingProfile as ViewerProfile;
  }

  const email = user.email ?? null;
  const profileDisplayName =
    displayName?.trim() || displayNameFromEmail(email);

  const { data: createdProfile, error: profileUpsertError } = await supabase
    .from("profiles")
    .upsert(
      {
        auth_user_id: user.id,
        email,
        display_name: profileDisplayName,
        locale: defaultLocale,
        timezone: defaultTimezone,
      },
      { onConflict: "auth_user_id" },
    )
    .select("id, auth_user_id, email, display_name, locale, timezone")
    .single();

  if (profileUpsertError || !createdProfile) {
    throw new Error(
      getAuthErrorMessage(profileUpsertError, "Unable to create your profile."),
    );
  }

  return createdProfile as ViewerProfile;
}

export async function getPrimaryHouseholdForProfile(
  supabase: SupabaseClient,
  profileId: string,
) {
  const { data: membership, error: membershipError } = await supabase
    .from("household_members")
    .select("id, household_id, role, joined_at")
    .eq("profile_id", profileId)
    .eq("status", "active")
    .is("archived_at", null)
    .order("joined_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (membershipError) {
    throw new Error(
      getAuthErrorMessage(membershipError, "Unable to load household membership."),
    );
  }

  if (!membership) {
    return null;
  }

  const { data: household, error: householdError } = await supabase
    .from("households")
    .select("id, name, locale, timezone, status")
    .eq("id", membership.household_id)
    .maybeSingle();

  if (householdError) {
    throw new Error(
      getAuthErrorMessage(householdError, "Unable to load household."),
    );
  }

  if (!household || household.status !== "active") {
    return null;
  }

  return {
    id: household.id,
    name: household.name,
    locale: household.locale,
    timezone: household.timezone,
    status: household.status,
    memberId: membership.id,
    memberRole: membership.role,
  } satisfies ViewerHousehold;
}

export async function getViewerContext(): Promise<ViewerContext> {
  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    return {
      supabase: null,
      session: null,
      user: null,
      profile: null,
      household: null,
    };
  }

  const [{ data: sessionData }, { data: userData }] = await Promise.all([
    supabase.auth.getSession(),
    supabase.auth.getUser(),
  ]);

  const session = sessionData.session ?? null;
  const user = userData.user ?? null;

  if (!user) {
    return {
      supabase,
      session: null,
      user: null,
      profile: null,
      household: null,
    };
  }

  const profile = await ensureProfileForUser(supabase, user);
  const household = await getPrimaryHouseholdForProfile(supabase, profile.id);

  return {
    supabase,
    session,
    user,
    profile,
    household,
  };
}

export async function resolvePostAuthPath(
  supabase: SupabaseClient,
  user: User,
  displayName?: string,
) {
  const profile = await ensureProfileForUser(supabase, user, displayName);
  const household = await getPrimaryHouseholdForProfile(supabase, profile.id);

  return household ? "/home" : "/setup/create-household";
}

export async function createHouseholdForProfile(
  supabase: SupabaseClient,
  profile: ViewerProfile,
  householdName: string,
) {
  const locale = profile.locale || defaultLocale;
  const timezone = profile.timezone || defaultTimezone;

  const { error: householdError } = await supabase.from("households").insert({
    name: householdName,
    created_by_profile_id: profile.id,
    locale,
    timezone,
  });

  if (householdError) {
    throw new Error(
      getAuthErrorMessage(householdError, "Unable to create your household."),
    );
  }

  const { data: household, error: householdLookupError } = await supabase
    .from("households")
    .select("id, name, locale, timezone, status")
    .eq("created_by_profile_id", profile.id)
    .eq("name", householdName)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (householdLookupError || !household) {
    throw new Error(
      getAuthErrorMessage(
        householdLookupError,
        "Unable to confirm your household was created.",
      ),
    );
  }

  const { error: settingsError } = await supabase.from("household_settings").upsert(
    {
      household_id: household.id,
      locale,
      timezone,
      week_starts_on: getWeekStartForLocale(locale),
      allow_photo_proof: true,
    },
  );

  if (settingsError) {
    throw new Error(
      getAuthErrorMessage(
        settingsError,
        "Household settings could not be initialised.",
      ),
    );
  }

  const { data: ownerMember, error: ownerMemberError } = await supabase
    .from("household_members")
    .select("id, household_id, profile_id, role, status")
    .eq("household_id", household.id)
    .eq("profile_id", profile.id)
    .maybeSingle();

  if (ownerMemberError || !ownerMember) {
    throw new Error(
      getAuthErrorMessage(
        ownerMemberError,
        "Owner household membership was not created.",
      ),
    );
  }

  return {
    household,
    ownerMember,
  };
}
