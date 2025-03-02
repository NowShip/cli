"use client";

import { Laptop, ShieldAlert, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import type { Session } from "better-auth";
import { formatDistanceToNow } from "date-fns";

import {
  useGetActiveSessionsQuery,
  useGetSessionQuery,
  useResendVerificationEmailMutation,
  useRevokeSessionMutation,
} from "@/lib/endpoints";
import config from "@/config/app";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { parseUserAgent } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
}

function VerifyEmail({ children }: Props) {
  const { data, isPending } = useGetSessionQuery();
  const resendVerificationEmail = useResendVerificationEmailMutation();

  if (
    !data?.user?.emailVerified &&
    !isPending &&
    config.verifyEmail.not_allowed
  ) {
    return (
      <div className="bg-background flex min-h-dvh flex-col items-center justify-center rounded-lg p-6">
        <ShieldAlert className="mb-2 h-24 w-24 text-gray-900" />
        <h3 className="mb-2 text-xl font-semibold text-gray-900">
          Email Verification Required
        </h3>
        <p className="text-gray-600">
          Please verify your email address to access the service.
        </p>
        <div className="relative mt-4 flex items-center justify-center px-3">
          <Badge variant="destructive" className="gap-1.5 px-3 py-1.5 text-xs">
            Verify email.
            <button
              className="cursor-pointer underline transition-colors hover:text-white/90"
              disabled={resendVerificationEmail.isPending}
              onClick={() =>
                resendVerificationEmail.mutate({
                  email: data?.user?.email as string,
                })
              }
            >
              Resend
            </button>
          </Badge>
          {resendVerificationEmail.isPending && (
            <Loader className="absolute -right-3" />
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

function SessionLimit({ children }: Props) {
  const activeDevice = useGetActiveSessionsQuery();

  if (activeDevice.data && activeDevice.data?.length > config.session.allowed) {
    return (
      <motion.div
        className="flex min-h-dvh flex-col items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-full max-w-2xl space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Session Limit Reached ({config.session.allowed})
            </h1>
            <p className="text-muted-foreground">
              You have reached the maximum number of active sessions. Please
              sign out from other devices to continue.
            </p>
          </div>

          <div className="bg-card space-y-4 rounded-lg border p-6 shadow-xs">
            {activeDevice.data?.map((device) => (
              <EachSession key={device.id} device={device} />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return <>{children}</>;
}

function EachSession({ device }: { device: Session }) {
  const session = useGetSessionQuery();
  const revokeSession = useRevokeSessionMutation();

  const deviceInfo = parseUserAgent(device.userAgent || "");
  const isCurrentDevice = device.token === session.data?.session.token;

  return (
    <div
      key={device.id}
      className="bg-background flex items-center justify-between gap-4 rounded-lg p-3"
    >
      <div className="flex items-start gap-3">
        <span className="text-muted-foreground mt-1 shrink-0">
          {device.userAgent?.includes("Mobile") ? (
            <Smartphone className="h-5 w-5" />
          ) : (
            <Laptop className="h-5 w-5" />
          )}
        </span>
        <div className="flex flex-col gap-0.5">
          <span className="flex items-center gap-2">
            <span className="font-medium">{deviceInfo.os}</span>
            {isCurrentDevice && (
              <Badge variant="secondary" className="text-xs">
                Current device
              </Badge>
            )}
          </span>
          <span className="text-muted-foreground text-sm">
            {deviceInfo.browser}
          </span>
          <span className="text-muted-foreground text-xs">
            Last active:{" "}
            {formatDistanceToNow(device.createdAt, {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>

      <Button
        variant="destructive"
        size="sm"
        className="shrink-0"
        onClick={() => revokeSession.mutate(device.token)}
        disabled={revokeSession.isPending}
      >
        {revokeSession.isPending ? <Loader className="h-4 w-4" /> : "Sign out"}
      </Button>
    </div>
  );
}

export { VerifyEmail, SessionLimit };
