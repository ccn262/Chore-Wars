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

      {activity.length ? (
        <div className="space-y-3">
          {activity.map((item) => (
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
        <p className="text-sm leading-6 text-muted-foreground">
          No completions yet. The first tap will appear here.
        </p>
      )}
    </Card>
  );
}
