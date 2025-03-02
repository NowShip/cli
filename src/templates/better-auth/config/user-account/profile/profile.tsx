import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";

import {
  SectionWrapper,
  SectionTitle,
  SectionContent,
  ContentAnimation,
} from "../elements";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetSessionQuery, useUpdateUserInfo } from "@/lib/endpoints";
import { Loader2 } from "lucide-react";

export default function ProfileSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const { data } = useGetSessionQuery();

  const updateUserInfo = useUpdateUserInfo();

  useEffect(() => {
    setName(data?.user?.name || "");
  }, [data?.user?.name]);

  return (
    <SectionWrapper>
      <SectionTitle>Profile</SectionTitle>

      <AnimatePresence mode="popLayout" initial={false}>
        {!isOpen ? (
          <SectionContent
            key="profile-content"
            variants={ContentAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={data?.user?.image || ""} />
                <AvatarFallback>
                  {data?.user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xs font-medium">
                  {data?.user?.name || "Your Name"}
                </h3>
              </div>
            </div>
            <Button variant="primary" size="xs" onClick={() => setIsOpen(true)}>
              Update profile
            </Button>
          </SectionContent>
        ) : (
          <SectionContent
            key="update-profile"
            variants={ContentAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Card className="w-full">
              <CardHeader className="p-3">
                <CardTitle className="text-sm">Update profile</CardTitle>
              </CardHeader>
              <CardContent className="px-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateUserInfo.mutate(
                      { name },
                      {
                        onSuccess: () => {
                          setIsOpen(false);
                        },
                      }
                    );
                  }}
                >
                  <Input
                    value={name}
                    autoFocus
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="mt-5 flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => {
                        setIsOpen(false);
                        setName(data?.user?.name || "");
                      }}
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="xs"
                      className="min-w-12"
                      disabled={
                        updateUserInfo.isPending || name === data?.user?.name
                      }
                    >
                      {updateUserInfo.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
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
