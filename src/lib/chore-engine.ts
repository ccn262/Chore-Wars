import { defaultLocale, defaultTimezone } from "@/lib/site";
import type { ViewerContext } from "@/lib/auth";

export type ChoreTemplateSummary = {
  id: string;
  templateKey: string;
  title: string;
  iconKey: string;
  suggestedPoints: number;
  suggestedCadence: string | null;
  sortOrder: number;
  categoryId: string | null;
  categoryName: string | null;
  categoryIconKey: string | null;
};

export type HouseholdChoreSummary = {
  id: string;
  title: string;
  iconKey: string;
  points: number;
  cadence: string | null;
  source: string;
  status: string;
  archivedAt: string | null;
  sortOrder: number;
  createdAt: string;
};

export type ChoreCompletionSummary = {
  id: string;
  choreId: string;
  completedByMemberId: string;
  pointsAwarded: number;
  completedAt: string;
};

export type ActivityItem = {
  id: string;
  choreTitle: string;
  choreIconKey: string;
  memberDisplayName: string;
  memberRole: string;
  pointsAwarded: number;
  completedAt: string;
};

export type WeeklyMemberScore = {
  memberId: string;
  displayName: string;
  role: string;
  points: number;
  isViewer: boolean;
};

export type HouseholdSettingsSummary = {
  locale: string;
  timezone: string;
  weekStartsOn: number;
  allowPhotoProof: boolean;
  winnerRewardText: string | null;
  bottomForfeitText: string | null;
};

export type HouseholdMemberSummary = {
  id: string;
  displayName: string;
  role: string;
  status: string;
  profileId: string | null;
  archivedAt: string | null;
  joinedAt: string;
  isViewer: boolean;
};

export type ChoreEngineDashboard = {
  viewer: ViewerContext;
  settings: HouseholdSettingsSummary;
  members: HouseholdMemberSummary[];
  templates: ChoreTemplateSummary[];
  chores: HouseholdChoreSummary[];
  quickChores: HouseholdChoreSummary[];
  activity: ActivityItem[];
  weeklyScores: WeeklyMemberScore[];
  currentWeekStart: string;
  canManageChores: boolean;
};

export type WeeklyCompetitionSummary = {
  winner: WeeklyMemberScore | null;
  bottom: WeeklyMemberScore | null;
  hasMeaningfulScores: boolean;
};

function emptyDashboard(viewer: ViewerContext): ChoreEngineDashboard {
  return {
    viewer,
    settings: {
      locale: viewer.household?.locale || defaultLocale,
      timezone: viewer.household?.timezone || defaultTimezone,
      weekStartsOn: 1,
      allowPhotoProof: true,
      winnerRewardText: null,
      bottomForfeitText: null,
    },
    members: [],
    templates: [],
    chores: [],
    quickChores: [],
    activity: [],
    weeklyScores: [],
    currentWeekStart: new Date().toISOString(),
    canManageChores: false,
  };
}

function clampWeekStart(value: number | null | undefined) {
  return typeof value === "number" && value >= 0 && value <= 6 ? value : 1;
}

const weekdayLabels = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function getWeekStartLabel(weekStartsOn: number) {
  return weekdayLabels[clampWeekStart(weekStartsOn)] ?? "Monday";
}

function getTimeZoneOffsetMinutes(timezone: string, date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    timeZoneName: "shortOffset",
  }).formatToParts(date);
  const offsetLabel =
    parts.find((part) => part.type === "timeZoneName")?.value || "GMT";
  const match = offsetLabel.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/i);

  if (!match) {
    return 0;
  }

  const sign = match[1] === "-" ? -1 : 1;
  const hours = Number(match[2] || 0);
  const minutes = Number(match[3] || 0);
  return sign * (hours * 60 + minutes);
}

function getQuickChores(chores: HouseholdChoreSummary[], limit = 4) {
  // Prefer active custom chores first so newly created chores are visible on Home
  // without changing the full chores list or the one-tap completion flow.
  return [...chores]
    .sort((left, right) => {
      const sourceRank = Number(right.source === "custom") - Number(left.source === "custom");
      if (sourceRank !== 0) {
        return sourceRank;
      }

      const createdAtDiff =
        new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
      if (createdAtDiff !== 0) {
        return createdAtDiff;
      }

      const sortOrderDiff = left.sortOrder - right.sortOrder;
      if (sortOrderDiff !== 0) {
        return sortOrderDiff;
      }

      return left.title.localeCompare(right.title);
    })
    .slice(0, limit);
}

function getWeekStartDate(timezone: string, weekStartsOn: number) {
  const now = new Date();
  const localParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const year = Number(localParts.find((part) => part.type === "year")?.value);
  const month = Number(localParts.find((part) => part.type === "month")?.value);
  const day = Number(localParts.find((part) => part.type === "day")?.value);

  const localDate = new Date(Date.UTC(year, month - 1, day));
  const currentWeekday = localDate.getUTCDay();
  const offset = (currentWeekday - weekStartsOn + 7) % 7;
  localDate.setUTCDate(localDate.getUTCDate() - offset);

  const offsetMinutes = getTimeZoneOffsetMinutes(timezone, localDate);
  localDate.setUTCMinutes(localDate.getUTCMinutes() - offsetMinutes);
  return localDate;
}

export function getWeeklyCompetitionSummary(
  scores: WeeklyMemberScore[],
): WeeklyCompetitionSummary {
  const hasMeaningfulScores = scores.some((score) => score.points > 0);

  if (!hasMeaningfulScores) {
    return {
      winner: null,
      bottom: null,
      hasMeaningfulScores: false,
    };
  }

  return {
    winner: scores[0] ?? null,
    bottom: scores.length > 1 ? scores[scores.length - 1] ?? null : null,
    hasMeaningfulScores: true,
  };
}

function mapToTemplateSummary(row: {
  id: string;
  template_key: string;
  default_title: string;
  icon_key: string;
  suggested_points: number;
  suggested_cadence: string | null;
  sort_order: number;
  category_id: string | null;
  chore_categories?:
    | {
        default_name: string;
        icon_key: string;
      }
    | Array<{
        default_name: string;
        icon_key: string;
      }>
    | null;
}): ChoreTemplateSummary {
  const category = Array.isArray(row.chore_categories)
    ? row.chore_categories[0]
    : row.chore_categories;

  return {
    id: row.id,
    templateKey: row.template_key,
    title: row.default_title,
    iconKey: row.icon_key,
    suggestedPoints: row.suggested_points,
    suggestedCadence: row.suggested_cadence,
    sortOrder: row.sort_order,
    categoryId: row.category_id,
    categoryName: category?.default_name ?? null,
    categoryIconKey: category?.icon_key ?? null,
  };
}

export function getChoreIconGlyph(iconKey: string) {
  switch (iconKey) {
    case "kitchen":
      return "🍽️";
    case "laundry":
      return "🧺";
    case "sparkles":
      return "✨";
    case "recycle":
      return "♻️";
    case "paw-print":
      return "🐾";
    case "tree":
      return "🌳";
    case "clipboard-list":
      return "📋";
    case "ellipsis":
      return "⋯";
    case "dishwasher":
      return "🍽️";
    case "trash":
    case "trash-2":
      return "🗑️";
    case "washer":
      return "🫧";
    case "clothes-hanger":
      return "👕";
    case "fold":
      return "🧺";
    case "vacuum":
      return "🧹";
    case "mop":
      return "🧽";
    case "bath":
      return "🛁";
    case "dog":
      return "🐶";
    case "bowl":
      return "🥣";
    case "sofa":
      return "🛋️";
    case "bed":
      return "🛏️";
    default:
      return "✨";
  }
}

export async function getChoreEngineDashboard(
  viewer: ViewerContext,
): Promise<ChoreEngineDashboard> {
  if (!viewer.supabase || !viewer.session || !viewer.profile || !viewer.household) {
    return emptyDashboard(viewer);
  }

  const supabase = viewer.supabase;
  const canManageChores = ["owner", "admin"].includes(viewer.household.memberRole);

  const [settingsResult, templatesResult, choresResult, membersResult] =
    await Promise.all([
      supabase
        .from("household_settings")
        .select(
          "locale, timezone, week_starts_on, allow_photo_proof, winner_reward_text, bottom_forfeit_text",
        )
        .eq("household_id", viewer.household.id)
        .maybeSingle(),
      supabase
        .from("chore_templates")
        .select(
          "id, template_key, default_title, icon_key, suggested_points, suggested_cadence, sort_order, category_id, chore_categories(default_name, icon_key)",
        )
        .eq("is_seeded", true)
        .order("sort_order", { ascending: true })
        .order("default_title", { ascending: true }),
      supabase
        .from("chores")
        .select(
          "id, title, icon_key, points, cadence, source, status, archived_at, sort_order, created_at",
        )
        .eq("household_id", viewer.household.id)
        .eq("status", "active")
        .is("archived_at", null)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
      supabase
        .from("household_members")
        .select("id, display_name, role, profile_id, status, archived_at, joined_at")
        .eq("household_id", viewer.household.id)
        .eq("status", "active")
        .is("archived_at", null)
        .order("joined_at", { ascending: true }),
    ]);

  const settingsRow = settingsResult.data;
  const templates = (templatesResult.data ?? []).map((row) =>
    mapToTemplateSummary(row as never),
  );
  const chores = (choresResult.data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    iconKey: row.icon_key,
    points: row.points,
    cadence: row.cadence,
    source: row.source,
    status: row.status,
    archivedAt: row.archived_at,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
  }));
  const viewerProfileId = viewer.profile?.id ?? null;
  const members = (membersResult.data ?? []).map((row) => ({
    id: row.id,
    displayName: row.display_name,
    role: row.role,
    status: row.status,
    profileId: row.profile_id,
    archivedAt: row.archived_at,
    joinedAt: row.joined_at,
    isViewer: viewerProfileId !== null && row.profile_id === viewerProfileId,
  }));

  const weekStartsOn = clampWeekStart(settingsRow?.week_starts_on);
  const locale = settingsRow?.locale || viewer.household.locale || defaultLocale;
  const timezone = settingsRow?.timezone || viewer.household.timezone || defaultTimezone;
  const currentWeekStart = getWeekStartDate(timezone, weekStartsOn);

  const [activityResult, ledgerResult] = await Promise.all([
    supabase
      .from("chore_completions")
      .select("id, chore_id, completed_by_member_id, points_awarded, completed_at")
      .eq("household_id", viewer.household.id)
      .order("completed_at", { ascending: false })
      .limit(8),
    supabase
      .from("points_ledger")
      .select("household_member_id, points_delta, created_at")
      .eq("household_id", viewer.household.id)
      .gte("created_at", currentWeekStart.toISOString())
      .order("created_at", { ascending: true }),
  ]);

  const choreMap = new Map(chores.map((chore) => [chore.id, chore]));
  const memberMap = new Map(members.map((member) => [member.id, member]));
  const quickChores = getQuickChores(chores);

  const activity = (activityResult.data ?? []).map((row) => {
    const chore = choreMap.get(row.chore_id);
    const member = memberMap.get(row.completed_by_member_id);

    return {
      id: row.id,
      choreTitle: chore?.title ?? "Chore",
      choreIconKey: chore?.iconKey ?? "sparkles",
      memberDisplayName: member?.displayName ?? "Household member",
      memberRole: member?.role ?? "member",
      pointsAwarded: row.points_awarded,
      completedAt: row.completed_at,
    };
  });

  const scoreTotals = new Map<string, number>();
  for (const row of ledgerResult.data ?? []) {
    scoreTotals.set(
      row.household_member_id,
      (scoreTotals.get(row.household_member_id) ?? 0) + row.points_delta,
    );
  }

  const weeklyScores = members
    .map((member) => ({
      memberId: member.id,
      displayName: member.displayName,
      role: member.role,
      points: scoreTotals.get(member.id) ?? 0,
      isViewer: viewerProfileId !== null && member.profileId === viewerProfileId,
    }))
    .sort((left, right) => right.points - left.points || left.displayName.localeCompare(right.displayName));

  return {
    viewer,
    settings: {
      locale,
      timezone,
      weekStartsOn,
      allowPhotoProof: settingsRow?.allow_photo_proof ?? true,
      winnerRewardText: settingsRow?.winner_reward_text ?? null,
      bottomForfeitText: settingsRow?.bottom_forfeit_text ?? null,
    },
    members,
    templates,
    chores,
    quickChores,
    activity,
    weeklyScores,
    currentWeekStart: currentWeekStart.toISOString(),
    canManageChores,
  };
}

export function formatShortDateTime(
  date: string | Date,
  locale: string,
  timezone: string,
) {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  }).format(new Date(date));
}
