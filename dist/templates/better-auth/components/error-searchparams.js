"use client";
import React, { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useLinkAccountMutation } from "@/lib/endpoints";
import ClientOnly from "./client-only";
export default function ErrorSearchParams() {
    return (<Suspense>
      <ClientOnly>
        <Content />
      </ClientOnly>
    </Suspense>);
}
function Content() {
    const [selectedAccount] = useLocalStorage("selected-account", null);
    const linkAccountMutation = useLinkAccountMutation();
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const oneTime = useRef(0);
    useEffect(() => {
        if (error && oneTime.current === 0) {
            oneTime.current++;
            if (error === "email_doesn't_match") {
                toast(error, {
                    action: {
                        label: "Connect again",
                        onClick: () => {
                            linkAccountMutation.mutate({
                                provider: selectedAccount || "google",
                            });
                        },
                    },
                });
            }
        }
    }, [error, oneTime]);
    return <></>;
}
