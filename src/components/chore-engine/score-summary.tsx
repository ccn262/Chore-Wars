import { Card } from "@/components/ui/card";
import type { WeeklyMemberScore } from "@/lib/chore-engine";

type ScoreSummaryProps = {
  scores: WeeklyMemberScore[];
  weekStartsOn: number;
};

export function ScoreSummary({ scores, weekStartsOn }: ScoreSummaryProps) {
  const topScore = scores[0]?.points ?? 0;
  const leadingMember = scores[0];

  return (
    <Card className="space-y-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Weekly score
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          Week starts on {weekStartsOn === 0 ? "Sunday" : "Monday"}.
        </p>
      </div>

      {leadingMember ? (
        <div className="rounded-[1.25rem] bg-foreground px-4 py-3 text-background">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/70">
            Leading this week
          </p>
          <p className="mt-1 text-sm font-semibold leading-6">
            {leadingMember.displayName} is ahead with {leadingMember.points} points.
          </p>
        </div>
      ) : null}

      <div className="space-y-3">
        {scores.length ? (
          scores.map((score) => (
            <div
              key={score.memberId}
              className={`rounded-[1.25rem] border p-4 ${
                score.isViewer
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-surface"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-semibold">
                    {score.displayName}
                    {score.isViewer ? " · you" : ""}
                  </p>
                  <p
                    className={`text-xs leading-5 ${
                      score.isViewer ? "text-background/75" : "text-muted-foreground"
                    }`}
                  >
                    {score.role}
                    {score.points === topScore && topScore > 0 ? " · leading" : ""}
                  </p>
                </div>
                <p className={`text-2xl font-semibold ${score.isViewer ? "" : "text-foreground"}`}>
                  {score.points}
                </p>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full ${
                    score.isViewer ? "bg-background/80" : "bg-foreground/75"
                  }`}
                  style={{
                    width:
                      topScore > 0
                        ? `${Math.max((score.points / topScore) * 100, score.points > 0 ? 18 : 0)}%`
                        : "0%",
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-[1.25rem] border border-dashed border-border bg-muted/25 p-4">
            <p className="text-sm font-semibold text-foreground">No scores yet</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Complete a chore to start the weekly board.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
