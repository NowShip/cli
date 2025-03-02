"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, ShieldCheck } from "lucide-react";
import { BadgeCheck, LogOut, Sparkles } from "lucide-react";

import {
  useGetAllOrdersQuery,
  useGetSessionQuery,
  useSignOutMutation,
} from "@/lib/endpoints";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import UserAccount from "@/config/user-account";
import { SwitchTheme } from "../switch-theme";
import { Badge } from "../ui/badge";

export function NavUser() {
  const { data: session } = useGetSessionQuery();
  const { data: orders } = useGetAllOrdersQuery();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const userSignOut = useSignOutMutation();

  if (!session) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="relative">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={session?.user?.image || ""}
              alt={session?.user?.name}
            />
            <AvatarFallback className="rounded-lg">
              {session?.user?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {session?.user?.role === "admin" && (
            <ShieldCheck
              className="bg-primary absolute right-0 bottom-0 size-5 translate-x-2 translate-y-2 rounded-full p-1 text-white"
              size={12}
            />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          side="bottom"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={session?.user?.image || ""}
                  alt={session?.user?.name}
                />
                <AvatarFallback className="rounded-lg">
                  {session?.user?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {session?.user?.name}
                </span>
                <span className="truncate text-xs">{session?.user?.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          {orders?.isFullAccess ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="px-2">
                <Badge>Full access</Badge>
              </DropdownMenuGroup>
            </>
          ) : orders?.isAnimation ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="px-2">
                <Badge>Animation</Badge>
              </DropdownMenuGroup>
            </>
          ) : orders?.isReusableComponent ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="px-2">
                <Badge>Reusable Component</Badge>
              </DropdownMenuGroup>
            </>
          ) : null}
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
              <BadgeCheck />
              Account
            </DropdownMenuItem>
          </DropdownMenuGroup>
          {session?.user?.role === "admin" && (
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/admin/dashboard">
                  <LayoutDashboard />
                  Admin dashboard
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )}
          <DropdownMenuSeparator />
          <div className="px-2">
            <SwitchTheme />
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => userSignOut.mutate()}>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="pointer-events-none! w-full max-w-none border-none bg-transparent p-0 px-4 shadow-none">
          <div className="pointer-events-auto relative mx-auto min-h-[704px] w-full max-w-4xl overflow-hidden rounded-xl! bg-neutral-50 px-0 py-0 outline-hidden md:h-auto dark:bg-neutral-900">
            <UserAccount />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
