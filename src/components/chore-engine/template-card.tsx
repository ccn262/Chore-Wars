import { Card } from "@/components/ui/card";
import { getChoreIconGlyph, type ChoreTemplateSummary } from "@/lib/chore-engine";
import { TemplateCreateButton } from "@/components/chore-engine/template-create-button";

type TemplateCardProps = {
  template: ChoreTemplateSummary;
  canManageChores: boolean;
};

export function TemplateCard({ template, canManageChores }: TemplateCardProps) {
  return (
    <Card className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted text-xl">
          {getChoreIconGlyph(template.iconKey)}
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-base font-semibold leading-6 text-foreground">
            {template.title}
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            {template.categoryName ?? "Starter chore"}
            {template.suggestedCadence ? ` · ${template.suggestedCadence}` : ""}
            {" · "}
            +{template.suggestedPoints} points
          </p>
        </div>
      </div>

      {canManageChores ? (
        <TemplateCreateButton templateId={template.id} />
      ) : (
        <div className="rounded-2xl bg-muted/50 px-3 py-2">
          <p className="text-xs font-medium leading-5 text-muted-foreground">
            Only the owner or admin can add starter chores.
          </p>
        </div>
      )}
    </Card>
  );
}
