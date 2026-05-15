import { Card } from "@/components/ui/card";
import type { WeeklyMemberScore } from "@/lib/chore-engine";

type ScoreSummaryProps = {
  scores: WeeklyMemberScore[];
  weekStartsOn: number;
};

export function ScoreSummary({ scores, weekStartsOn }: ScoreSummaryProps) {
  const topScore = scores[0]?.points ?? 0;

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

      <div className="grid gap-3 sm:grid-cols-2">
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
              <p className="text-sm font-semibold">{score.displayName}</p>
              <p className={`mt-1 text-2xl font-semibold ${score.isViewer ? "" : "text-foreground"}`}>
                {score.points}
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
          ))
        ) : (
          <p className="text-sm leading-6 text-muted-foreground">
            No scores yet. Complete a chore to start the weekly board.
          </p>
        )}
      </div>
    </Card>
  );
}
