import React from "react";
import { MoreHorizontal } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { SectionWrapper, SectionTitle, SectionContent } from "../elements";
import { useGetListAccountsQuery, useLinkAccountMutation, useUnlinkAccountMutation, } from "@/lib/endpoints";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import Loader from "@/components/loader";
import { Skeleton } from "@/components/ui/skeleton";
import config from "@/config/app";
export default function ConnectedAccountsSection() {
    var _a;
    const allAccounts = useGetListAccountsQuery();
    const unlinkAccountMutation = useUnlinkAccountMutation();
    return (<SectionWrapper>
      <SectionTitle>Connected accounts</SectionTitle>
      <SectionContent className="flex-col gap-px">
        {(_a = allAccounts === null || allAccounts === void 0 ? void 0 : allAccounts.data) === null || _a === void 0 ? void 0 : _a.map((account) => (<div key={account.id} className="flex w-full items-center">
            <div className="flex items-center gap-2 text-xl">
              {account.provider === "google" && <FcGoogle />}
              {account.provider === "github" && <FaGithub />}
              {account.provider === "credential" && <MdOutlineAlternateEmail />}
              <span className="text-xs font-normal tracking-tight capitalize">
                {account.provider}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="xs" className="ml-auto">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 origin-top-right">
                <DropdownMenuItem className="text-destructive! justify-center text-[13px] font-medium" onClick={() => unlinkAccountMutation.mutate(account.provider)}>
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>))}

        {allAccounts.isPending && (<div className="flex w-full flex-col items-center justify-center gap-1">
            <Skeleton className="h-6 w-full"/>
            <Skeleton className="h-6 w-full"/>
            <Skeleton className="h-6 w-full"/>
          </div>)}

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="primary" size="xs" className="mt-2 w-[calc(100%+8px)] -translate-x-2 justify-start">
              + Connect account
            </Button>
          </PopoverTrigger>
          <PopoverContent className="max-w-none p-1">
            {config.providers.map((provider) => {
            var _a;
            return (<EachAccount key={provider} provider={provider} disabled={((_a = allAccounts === null || allAccounts === void 0 ? void 0 : allAccounts.data) === null || _a === void 0 ? void 0 : _a.some((account) => account.provider === provider)) || false}/>);
        })}
          </PopoverContent>
        </Popover>
      </SectionContent>
    </SectionWrapper>);
}
function EachAccount({ provider, disabled, }) {
    const linkAccountMutation = useLinkAccountMutation();
    return (<Button variant="ghost" size="xs" className="w-full justify-start" onClick={() => linkAccountMutation.mutate({ provider })} disabled={linkAccountMutation.isPending || disabled}>
      {provider === "google" && <FcGoogle />}
      {provider === "github" && <FaGithub />}
      <span className="text-xs capitalize">{provider}</span>
      {linkAccountMutation.isPending && <Loader />}
    </Button>);
}
