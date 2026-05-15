import { Card } from "@/components/ui/card";
import {
  formatShortDateTime,
  getChoreIconGlyph,
  type ActivityItem,
} from "@/lib/chore-engine";

type RecentActivityFeedProps = {
  activity: ActivityItem[];
  locale: string;
  timezone: string;
};

export function RecentActivityFeed({
  activity,
  locale,
  timezone,
}: RecentActivityFeedProps) {
  const latest = activity[0];

  return (
    <Card className="space-y-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Recent activity
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          Latest completions from the household.
        </p>
      </div>

      {latest ? (
        <div className="rounded-[1.25rem] bg-foreground px-4 py-3 text-background">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/70">
            Latest tap
          </p>
          <p className="mt-1 text-sm font-semibold leading-6">
            {latest.memberDisplayName} finished {latest.choreTitle}
          </p>
          <p className="text-xs leading-5 text-background/75">
            +{latest.pointsAwarded} points ·{" "}
            {formatShortDateTime(latest.completedAt, locale, timezone)}
          </p>
        </div>
      ) : null}

      {activity.length ? (
        <div className="space-y-2">
          {activity.slice(latest ? 1 : 0).map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-[1.25rem] bg-muted/60 p-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-background text-lg">
                {getChoreIconGlyph(item.choreIconKey)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-6 text-foreground">
                  {item.memberDisplayName} finished {item.choreTitle}
                </p>
                <p className="text-xs leading-5 text-muted-foreground">
                  +{item.pointsAwarded} points ·{" "}
                  {formatShortDateTime(item.completedAt, locale, timezone)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[1.25rem] border border-dashed border-border bg-muted/25 p-4">
          <p className="text-sm font-semibold text-foreground">No completions yet</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            The first quick tap will show up here and give the household some momentum.
          </p>
        </div>
      )}
    </Card>
  );
}
