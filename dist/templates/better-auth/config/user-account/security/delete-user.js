import React from "react";
import { SectionWrapper, SectionTitle, SectionContent, } from "@/config/user-account/elements";
import { Button } from "@/components/ui/button";
import { useDeleteUserMutation } from "@/lib/endpoints";
import Loader from "@/components/loader";
export default function DeleteUserSection() {
    const deleteUserMutation = useDeleteUserMutation();
    return (<SectionWrapper>
      <SectionTitle>Delete account</SectionTitle>
      <SectionContent>
        <Button variant="destructive" size="xs" onClick={() => deleteUserMutation.mutate()} disabled>
          {deleteUserMutation.isPending ? <Loader /> : "Delete account"}
        </Button>
      </SectionContent>
    </SectionWrapper>);
}
