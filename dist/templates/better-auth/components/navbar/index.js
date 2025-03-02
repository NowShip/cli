"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GithubIcon } from "lucide-react";
import Content from "../ui/content";
import Logo from "../logo";
import { Button } from "../ui/button";
import { SwitchTheme } from "../switch-theme";
import { useGetSessionQuery, useUserSignInWithGitHubMutation, } from "@/lib/endpoints";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { NavUser } from "./nav-user";
import { useStore } from "@/context";
import BuyDialog from "../buy-dialog";
export default function Navbar() {
    const { data: session } = useGetSessionQuery();
    const pathname = usePathname();
    const hideNavbar = pathname === "/sign-in" ||
        pathname === "/sign-up" ||
        pathname === "/message/account" ||
        pathname === "/testimonial" ||
        pathname === "/admin/dashboard";
    return hideNavbar ? null : (<Content className="mb-8">
      <div className="flex h-16 items-center justify-between">
        <Link href="/">
          <Logo size="sm"/>
        </Link>

        <div className="flex items-center gap-2">
          {!session && <SwitchTheme />}
          <BuyDialog>
            <button>Pricing</button>
          </BuyDialog>
          <GetFullAccess />
          <NavUser />
        </div>
      </div>
    </Content>);
}
function GetFullAccess() {
    const { data: session, isPending } = useGetSessionQuery();
    const signInWithGitHub = useUserSignInWithGitHubMutation();
    const { showGithubLogin, setShowGithubLogin } = useStore();
    if (session) {
        return null;
    }
    return (<Popover open={showGithubLogin} onOpenChange={() => {
            if (showGithubLogin)
                setShowGithubLogin(false);
        }}>
      <PopoverTrigger asChild>
        <Button variant="primary" size="sm" disabled={isPending} onClick={() => {
            if (!session) {
                setShowGithubLogin(true);
                return;
            }
        }}>
          Sign in
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px]">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Connect with GitHub</h3>
            <p className="text-muted-foreground text-sm">
              To get full access to all features, please connect your GitHub
              account first.
            </p>
          </div>
          <Button className="w-full" variant="outline" onClick={() => {
            signInWithGitHub.mutate();
        }} disabled={signInWithGitHub.isPending}>
            <GithubIcon className="mr-2 h-4 w-4"/>
            Continue with GitHub
          </Button>
        </div>
      </PopoverContent>
    </Popover>);
}
