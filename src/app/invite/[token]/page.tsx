import type { Route } from "next";

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

type InvitePageProps = {
  params: {
    token: string;
  };
};

export default async function InvitePage({ params }: InvitePageProps) {
  const viewer = await getViewerContext();
  const invitePath = buildInvitePath(params.token);
  const signInHref = addInternalQueryParam("/auth/sign-in", "next", invitePath);
  const signUpHref = addInternalQueryParam("/auth/sign-up", "next", invitePath);
  const homeHref = "/" as Route;
  const invite = viewer.supabase && viewer.session
    ? await getHouseholdInviteByToken(viewer.supabase, params.token)
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

        {!viewer.session ? (
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
            <p className="text-sm font-semibold">This invite has been revoked</p>
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
          <InviteJoinCard token={params.token} inviteEmail={invite.inviteEmail} />
        )}
      </div>
    </main>
  );
}
