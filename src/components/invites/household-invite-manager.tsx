"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { createHouseholdInviteAction } from "@/app/invite/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { FormState } from "@/lib/form-state";
import type { HouseholdInviteSummary } from "@/lib/household-invites";

const initialState: FormState = {
  status: "idle",
  message: "",
};

type HouseholdInviteManagerProps = {
  canEdit: boolean;
  invites: HouseholdInviteSummary[];
  locale: string;
  timezone: string;
};

function formatInviteDate(
  value: string,
  locale: string,
  timezone: string,
  options: Intl.DateTimeFormatOptions,
) {
  return new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    ...options,
  }).format(new Date(value));
}

function getInviteStatusLabel(invite: HouseholdInviteSummary) {
  if (invite.isExpired) {
    return "Expired";
  }

  switch (invite.status) {
    case "accepted":
      return "Accepted";
    case "revoked":
      return "Revoked";
    case "pending":
      return "Pending";
    default:
      return invite.status;
  }
}

export function HouseholdInviteManager({
  canEdit,
  invites,
  locale,
  timezone,
}: HouseholdInviteManagerProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    createHouseholdInviteAction,
    initialState,
  );
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const lastSuccessKey = useRef<string | null>(null);
  const copyTimer = useRef<number | null>(null);
  const inviteUrl = state.data?.inviteUrl ?? "";
  const inviteExpiresAt = state.data?.expiresAt ?? "";

  useEffect(() => {
    if (pending) {
      lastSuccessKey.current = null;
      return;
    }

    if (state.status === "success" && state.message) {
      const key = `success:${state.message}`;
      if (lastSuccessKey.current !== key) {
        lastSuccessKey.current = key;
        router.refresh();
      }
      return;
    }

    if (state.status !== "success") {
      lastSuccessKey.current = null;
    }
  }, [pending, router, state.message, state.status]);

  useEffect(
    () => () => {
      if (copyTimer.current) {
        window.clearTimeout(copyTimer.current);
      }
    },
    [],
  );

  async function handleCopyLink(url: string, token: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedToken(token);

      if (copyTimer.current) {
        window.clearTimeout(copyTimer.current);
      }

      copyTimer.current = window.setTimeout(() => {
        setCopiedToken((current) => (current === token ? null : current));
      }, 1800);
    } catch {
      setCopiedToken(null);
    }
  }

  if (!canEdit && !invites.length) {
    return null;
  }

  return (
    <Card className="space-y-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Invite your household
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          Create a copyable link for the people you want in the house battle.
        </p>
      </div>

      {state.message ? (
        <p
          className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
            state.status === "error"
              ? "border border-red-500/20 bg-red-500/10 text-red-800"
              : "border border-emerald-500/20 bg-emerald-500/10 text-emerald-800"
          }`}
          aria-live="polite"
          role="status"
        >
          {state.message}
        </p>
      ) : null}

      {canEdit ? (
        <form action={formAction} className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground">
              Invite email
            </span>
            <p className="text-xs leading-5 text-muted-foreground">
              Add an email to keep the invite tracked. You’ll still share the link in chat or text.
            </p>
            <Input
              name="inviteEmail"
              type="email"
              placeholder="flatmate@example.com"
              autoComplete="email"
              maxLength={254}
              required
            />
          </label>

          <div className="space-y-2">
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Creating..." : "Create invite link"}
            </Button>
            <p className="text-xs leading-5 text-muted-foreground">
              Invite links are manual for now. Email sending comes later.
            </p>
          </div>
        </form>
      ) : (
        <Card className="border-dashed bg-muted/40">
          <p className="text-sm font-semibold">Invite management</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Only owners and admins can create or manage invites.
          </p>
        </Card>
      )}

      {inviteUrl ? (
        <Card className="space-y-3 border-emerald-500/20 bg-emerald-500/5">
          <div className="space-y-1">
            <p className="text-sm font-semibold">Invite link ready</p>
            <p className="text-sm leading-6 text-muted-foreground">
              Copy this link and share it with the invited person.
            </p>
          </div>
          <div className="grid gap-3">
            <Input readOnly value={inviteUrl} aria-label="Invite link" />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                className="w-full"
                variant="secondary"
                onClick={() => handleCopyLink(inviteUrl, state.data?.token ?? inviteUrl)}
              >
                {copiedToken === (state.data?.token ?? inviteUrl)
                  ? "Copied"
                  : "Copy link"}
              </Button>
            </div>
            <p className="text-xs leading-5 text-muted-foreground">
              {state.data?.inviteEmail ? `${state.data.inviteEmail} · ` : ""}
              {inviteExpiresAt
                ? `Expires ${formatInviteDate(inviteExpiresAt, locale, timezone, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}.`
                : "Expires soon."}
            </p>
          </div>
        </Card>
      ) : null}

      {invites.length ? (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Current invites
          </p>
          <div className="grid gap-3">
            {invites.map((invite) => (
              <Card key={invite.id} className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{invite.inviteEmail}</p>
                    <p className="text-xs leading-5 text-muted-foreground">
                      {invite.role === "member" ? "Member invite" : invite.role}
                    </p>
                  </div>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                    {getInviteStatusLabel(invite)}
                  </span>
                </div>

                <p className="text-xs leading-5 text-muted-foreground">
                  {invite.isExpired
                    ? `Expired ${formatInviteDate(invite.expiresAt, locale, timezone, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}.`
                    : `Expires ${formatInviteDate(invite.expiresAt, locale, timezone, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}.`}
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input readOnly value={invite.inviteUrl} aria-label="Invite link" />
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full sm:w-auto"
                    onClick={() => handleCopyLink(invite.inviteUrl, invite.token)}
                  >
                    {copiedToken === invite.token ? "Copied" : "Copy link"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : canEdit ? (
        <Card className="border-dashed bg-muted/40">
          <p className="text-sm font-semibold">No invites yet</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Create a copyable invite link when you’re ready to bring someone in.
          </p>
        </Card>
      ) : null}
    </Card>
  );
}
