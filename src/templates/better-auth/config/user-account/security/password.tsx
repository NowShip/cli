import React, { useState } from "react";
import { AnimatePresence } from "motion/react";

import {
  useChangePasswordMutation,
  useGetListAccountsQuery,
  useSetPasswordMutation,
} from "@/lib/endpoints";
import {
  SectionWrapper,
  SectionTitle,
  SectionContent,
  ContentAnimation,
} from "@/config/user-account/elements";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/loader";

export default function PasswordSection() {
  const [selectedPanel, setSelectedPanel] = useState<"change" | "set" | null>(
    null
  );

  const listAccounts = useGetListAccountsQuery();
  const changePassword = useChangePasswordMutation();
  const setPassword = useSetPasswordMutation();

  return (
    <SectionWrapper>
      <SectionTitle>Password</SectionTitle>
      <AnimatePresence initial={false} mode="popLayout">
        {selectedPanel === null ? (
          <SectionContent
            key="password-section"
            variants={ContentAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {!listAccounts.isPending ? (
              <Button
                variant="primary"
                size="xs"
                onClick={() => {
                  setSelectedPanel(
                    listAccounts.data?.some(
                      (account) => account.provider === "credential"
                    )
                      ? "change"
                      : "set"
                  );
                }}
              >
                {listAccounts.data?.some(
                  (account) => account.provider === "credential"
                )
                  ? "Change password"
                  : "Set password"}
              </Button>
            ) : (
              <Skeleton className="h-7 w-full" />
            )}
          </SectionContent>
        ) : (
          <SectionContent
            key="change-password"
            variants={ContentAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Card className="w-full">
              <CardHeader className="p-3">
                <CardTitle className="text-sm">
                  {selectedPanel === "change"
                    ? "Change password"
                    : "Set password"}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3">
                <form
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const oldPassword = formData.get("oldPassword") as string;
                    const password = formData.get("password") as string;
                    const confirmPassword = formData.get(
                      "confirmPassword"
                    ) as string;

                    if (selectedPanel === "change") {
                      changePassword.mutate(
                        {
                          currentPassword: oldPassword,
                          newPassword: password,
                          confirmPassword: confirmPassword,
                        },
                        {
                          onSuccess: () => {
                            setSelectedPanel(null);
                            (e.target as HTMLFormElement).reset();
                          },
                        }
                      );
                    } else {
                      setPassword.mutate(
                        {
                          password,
                          confirmPassword,
                        },
                        {
                          onSuccess: () => {
                            setSelectedPanel(null);
                            (e.target as HTMLFormElement).reset();
                          },
                        }
                      );
                    }
                  }}
                >
                  <div className="flex flex-col gap-2">
                    {selectedPanel === "change" && (
                      <Input
                        autoFocus
                        placeholder="Old password"
                        name="oldPassword"
                      />
                    )}
                    <Input placeholder="New password" name="password" />
                    <Input
                      placeholder="Confirm password"
                      name="confirmPassword"
                    />
                  </div>
                  <div className="mt-5 flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => {
                        setSelectedPanel(null);
                      }}
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="xs"
                      className="min-w-12"
                      disabled={
                        changePassword.isPending || setPassword.isPending
                      }
                    >
                      {changePassword.isPending || setPassword.isPending ? (
                        <Loader />
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </SectionContent>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
