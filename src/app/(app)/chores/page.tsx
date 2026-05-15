import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";

export default function ChoresPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 pb-4">
      <ScreenHeader
        eyebrow="Chores"
        title="Chore list placeholder"
        description="Later this screen will hold fast tap cards for chores, icons, and quick completion."
        action={<Button href="/home" variant="secondary">Home</Button>}
      />

      <Card className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Coming later
        </p>
        <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
          <li>Chore cards with icons</li>
          <li>Quick press completion buttons</li>
          <li>Optional proof or photo actions</li>
          <li>Repeat and assignment controls</li>
        </ul>
      </Card>
    </div>
  );
}

