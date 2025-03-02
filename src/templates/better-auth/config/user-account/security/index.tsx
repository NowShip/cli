import { format, formatDistanceToNow } from "date-fns";
import { Laptop, Smartphone, MoreHorizontal, Loader2 } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import {
  TabLayout,
  TabTitle,
  SectionWrapper,
  SectionTitle,
  SectionContent,
} from "@/config/user-account/elements";
import {
  useGetActiveSessionsQuery,
  useGetSessionQuery,
  useRevokeAllSessionsMutation,
  useRevokeSessionMutation,
} from "@/lib/endpoints";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteUserSection from "./delete-user";
import { parseUserAgent } from "@/lib/utils";

export default function SecurityPanel() {
  return (
    <TabLayout>
      <TabTitle>Security</TabTitle>
      <Separator className="my-4" />
      {/* <PasswordSection />
      <Separator className="my-4" /> */}
      <DeviceInfo />
      <Separator className="my-4" />
      <DeleteUserSection />
    </TabLayout>
  );
}

function DeviceInfo() {
  const session = useGetSessionQuery();
  const activeDevice = useGetActiveSessionsQuery();
  const revokeSession = useRevokeSessionMutation();
  const revokeAllSessions = useRevokeAllSessionsMutation();
  const currentUserAgent = window.navigator.userAgent;

  return (
    <SectionWrapper>
      <SectionTitle>Active device</SectionTitle>
      <SectionContent className="flex flex-col items-start gap-4">
        {activeDevice.data?.map((device) => {
          const deviceInfo = parseUserAgent(device.userAgent || "");

          return (
            <div
              key={device.id}
              className="flex w-full items-start gap-4 text-[13px]"
            >
              <span className="shrink-0">
                {device.userAgent?.includes("Mobile") ? (
                  <Smartphone />
                ) : (
                  <Laptop />
                )}
              </span>
              <div className="flex flex-col gap-px">
                <span className="flex items-center gap-2">
                  <span className="font-medium">{deviceInfo.os}</span>
                  {device.token === session.data?.session.token && (
                    <Badge variant="outline">This device</Badge>
                  )}
                </span>
                <span className="text-muted-foreground">
                  {deviceInfo.browser}
                </span>
                <span className="text-muted-foreground">
                  {format(device.createdAt, "MMM dd, yyyy")} •{" "}
                  {formatDistanceToNow(device.createdAt, { addSuffix: true })}
                </span>
              </div>
              {device.userAgent !== currentUserAgent && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="xs" className="ml-auto">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 origin-top-right"
                  >
                    <DropdownMenuItem
                      className="text-destructive! justify-center text-[13px] font-medium"
                      onClick={() => revokeSession.mutate(device.token)}
                    >
                      Sign out of the device
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          );
        })}
        <Button
          variant="outline"
          size="xs"
          className="text-destructive! w-full"
          onClick={() => revokeAllSessions.mutate()}
          disabled={
            revokeAllSessions.isPending ||
            activeDevice.data?.length === 1 ||
            activeDevice.isLoading
          }
        >
          {revokeAllSessions.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Revoke all sessions except this one"
          )}
        </Button>
      </SectionContent>
    </SectionWrapper>
  );
}
