import type { Route } from "next";
import { unstable_noStore as noStore } from "next/cache";

import { signOutAction } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/components/screen-header";
import { InviteJoinCard } from "@/components/invites/invite-join-card";
import { getViewerContext } from "@/lib/auth";
import {
  buildInvitePath,
  getHouseholdInviteByToken,
  getHouseholdMembershipForProfile,
} from "@/lib/household-invites";
import { addInternalQueryParam } from "@/lib/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type InvitePageProps = {
  params:
    | {
        token?: string;
      }
    | Promise<{
        token?: string;
      }>;
};

export default async function InvitePage({ params }: InvitePageProps) {
  noStore();
  const viewer = await getViewerContext();
  const resolvedParams = await params;
  const token =
    typeof resolvedParams?.token === "string"
      ? resolvedParams.token.trim()
      : "";
  const hasToken = Boolean(token && token !== "undefined");
  const invitePath = hasToken ? buildInvitePath(token) : "";
  const signInHref = hasToken
    ? addInternalQueryParam("/auth/sign-in", "next", invitePath)
    : "/auth/sign-in";
  const signUpHref = hasToken
    ? addInternalQueryParam("/auth/sign-up", "next", invitePath)
    : "/auth/sign-up";
  const homeHref = "/" as Route;
  const invite = hasToken && viewer.supabase && viewer.session
    ? await getHouseholdInviteByToken(viewer.supabase, token)
    : null;

  let membership = null;
  if (invite && viewer.supabase && viewer.profile) {
    membership = await getHouseholdMembershipForProfile(
      viewer.supabase,
      invite.householdId,
      viewer.profile.id,
    );
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-4 pb-8 pt-4">
      <div className="flex min-h-dvh flex-col justify-between gap-6">
        <ScreenHeader
          eyebrow="Invite"
          title="Join household"
          description="Open the invite link, sign in if needed, and join the crew."
          action={<Button href={homeHref} variant="secondary">Home</Button>}
        />

        {!hasToken ? (
          <Card className="space-y-3">
            <p className="text-sm font-semibold">This invite is not available</p>
            <p className="text-sm leading-6 text-muted-foreground">
              The link is missing its token or it is not valid. Ask the household owner for a fresh invite.
            </p>
            <Button href={homeHref} variant="secondary" className="w-full">
              Go home
            </Button>
          </Card>
        ) : !viewer.session ? (
          <Card className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold">Sign in first</p>
              <p className="text-sm leading-6 text-muted-foreground">
                We’ll bring you right back to this invite after you sign in or create an account.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button href={signInHref as Route} className="w-full">
                Sign in
              </Button>
              <Button href={signUpHref as Route} variant="secondary" className="w-full">
                Create account
              </Button>
            </div>
          </Card>
        ) : !invite ? (
          <Card className="space-y-3">
            <p className="text-sm font-semibold">This invite is not available</p>
            <p className="text-sm leading-6 text-muted-foreground">
              The link may be invalid, expired, revoked, or already used.
            </p>
            <Button href={homeHref} variant="secondary" className="w-full">
              Go home
            </Button>
          </Card>
        ) : membership ? (
          <Card className="space-y-3">
            <p className="text-sm font-semibold">You’re already in this household</p>
            <p className="text-sm leading-6 text-muted-foreground">
              This invite has already done its job. You can head back to the app.
            </p>
            <Button href="/home" className="w-full">
              Open home
            </Button>
          </Card>
        ) : invite.status === "revoked" ? (
          <Card className="space-y-3">
            <p className="text-sm font-semibold">This invite has been cancelled</p>
            <p className="text-sm leading-6 text-muted-foreground">
              Ask the household owner for a fresh link if you still need one.
            </p>
          </Card>
        ) : invite.isExpired ? (
          <Card className="space-y-3">
            <p className="text-sm font-semibold">This invite has expired</p>
            <p className="text-sm leading-6 text-muted-foreground">
              Ask the household owner to create a new invite link.
            </p>
          </Card>
        ) : invite.status === "accepted" ? (
          <Card className="space-y-3">
            <p className="text-sm font-semibold">This invite has already been used</p>
            <p className="text-sm leading-6 text-muted-foreground">
              If you still need access, ask the household owner for a new link.
            </p>
          </Card>
        ) : viewer.profile?.email &&
          invite.inviteEmail.toLowerCase() !== viewer.profile.email.toLowerCase() ? (
          <Card className="space-y-3">
            <p className="text-sm font-semibold">This invite is for a different email</p>
            <p className="text-sm leading-6 text-muted-foreground">
              Sign in with {invite.inviteEmail} to continue, or ask for a new link.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <form action={signOutAction}>
                <Button type="submit" variant="secondary" className="w-full">
                  Sign out
                </Button>
              </form>
              <Button href={homeHref} className="w-full">
                Go home
              </Button>
            </div>
          </Card>
        ) : (
          <InviteJoinCard token={token} inviteEmail={invite.inviteEmail} />
        )}
      </div>
    </main>
  );
}
