"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import SecurityPanel from "./security";
import Profile from "./profile";
import {
  useGetSessionQuery,
  useResendVerificationEmailMutation,
} from "@/lib/endpoints";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/loader";
import { AnimatePresence, motion } from "motion/react";
import BillingSection from "./billing";
import { DialogClose } from "@/components/ui/dialog";
import Sidebar from "./sidebar";

export default function UserAccount() {
  const { data: session } = useGetSessionQuery();
  const resendVerificationEmail = useResendVerificationEmailMutation();

  const [isOpen, setIsOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<ProfileTab>("profile");

  return (
    <div className="flex h-full flex-col md:flex-row">
      <div className="relative h-full w-[250px] gap-6 py-6 max-md:hidden">
        <div className="mb-4 px-6">
          <h1 className="text-2xl font-bold">Account</h1>
          <p className="text-muted-foreground text-sm">
            Manage your account info.
          </p>
        </div>

        <div className="space-y-0.5 px-3">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {session?.user?.emailVerified ? null : (
          <div className="absolute bottom-4 mt-4 flex items-center justify-center px-3">
            <Badge
              variant="destructive"
              className="gap-1.5 px-3 py-1.5 text-xs"
            >
              Verify email.
              <button
                className="cursor-pointer underline transition-colors hover:text-white/90"
                disabled={resendVerificationEmail.isPending}
                onClick={() =>
                  resendVerificationEmail.mutate({
                    email: session?.user?.email as string,
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
        )}
      </div>

      <div className="flex h-12 items-center justify-between px-3 md:hidden">
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)}>
          <Menu /> Account
        </Button>
        <DialogClose className="text-muted-foreground">
          <X size={20} />
        </DialogClose>
      </div>

      {isOpen && (
        <div className="absolute inset-0 z-10">
          <div className="h-full w-full" onClick={() => setIsOpen(false)} />
          <motion.div
            className="absolute top-0 bottom-0 left-0 w-60 space-y-1 rounded-r-xl border bg-white p-4 shadow-xs"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onClose={() => setIsOpen(false)}
            />
          </motion.div>
        </div>
      )}

      <AnimatePresence initial={false}>
        {activeTab === "profile" ? (
          <Profile />
        ) : activeTab === "billing" ? (
          <BillingSection />
        ) : (
          <SecurityPanel />
        )}
      </AnimatePresence>
    </div>
  );
}
