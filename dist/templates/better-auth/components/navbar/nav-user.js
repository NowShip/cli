"use client";
import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, ShieldCheck } from "lucide-react";
import { BadgeCheck, LogOut } from "lucide-react";
import { useGetAllOrdersQuery, useGetSessionQuery, useSignOutMutation, } from "@/lib/endpoints";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import UserAccount from "@/config/user-account";
import { SwitchTheme } from "../switch-theme";
import { Badge } from "../ui/badge";
export function NavUser() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const { data: session } = useGetSessionQuery();
    const { data: orders } = useGetAllOrdersQuery();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const userSignOut = useSignOutMutation();
    if (!session)
        return null;
    return (<>
      <DropdownMenu>
        <DropdownMenuTrigger className="relative">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.image) || ""} alt={(_b = session === null || session === void 0 ? void 0 : session.user) === null || _b === void 0 ? void 0 : _b.name}/>
            <AvatarFallback className="rounded-lg">
              {(_c = session === null || session === void 0 ? void 0 : session.user) === null || _c === void 0 ? void 0 : _c.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {((_d = session === null || session === void 0 ? void 0 : session.user) === null || _d === void 0 ? void 0 : _d.role) === "admin" && (<ShieldCheck className="bg-primary absolute right-0 bottom-0 size-5 translate-x-2 translate-y-2 rounded-full p-1 text-white" size={12}/>)}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" side="bottom" align="end" sideOffset={4}>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={((_e = session === null || session === void 0 ? void 0 : session.user) === null || _e === void 0 ? void 0 : _e.image) || ""} alt={(_f = session === null || session === void 0 ? void 0 : session.user) === null || _f === void 0 ? void 0 : _f.name}/>
                <AvatarFallback className="rounded-lg">
                  {(_g = session === null || session === void 0 ? void 0 : session.user) === null || _g === void 0 ? void 0 : _g.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {(_h = session === null || session === void 0 ? void 0 : session.user) === null || _h === void 0 ? void 0 : _h.name}
                </span>
                <span className="truncate text-xs">{(_j = session === null || session === void 0 ? void 0 : session.user) === null || _j === void 0 ? void 0 : _j.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          {(orders === null || orders === void 0 ? void 0 : orders.isFullAccess) ? (<>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="px-2">
                <Badge>Full access</Badge>
              </DropdownMenuGroup>
            </>) : (orders === null || orders === void 0 ? void 0 : orders.isAnimation) ? (<>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="px-2">
                <Badge>Animation</Badge>
              </DropdownMenuGroup>
            </>) : (orders === null || orders === void 0 ? void 0 : orders.isReusableComponent) ? (<>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="px-2">
                <Badge>Reusable Component</Badge>
              </DropdownMenuGroup>
            </>) : null}
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
              <BadgeCheck />
              Account
            </DropdownMenuItem>
          </DropdownMenuGroup>
          {((_k = session === null || session === void 0 ? void 0 : session.user) === null || _k === void 0 ? void 0 : _k.role) === "admin" && (<DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/admin/dashboard">
                  <LayoutDashboard />
                  Admin dashboard
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>)}
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
    </>);
}
