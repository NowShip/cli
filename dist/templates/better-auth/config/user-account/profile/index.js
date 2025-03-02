import { useSession } from "@/lib/auth-client";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { TabLayout, TabTitle, SectionWrapper, SectionTitle, SectionContent, } from "../elements";
import ProfileSection from "./profile";
import ConnectedAccountsSection from "./connected-accounts";
export default function Profile() {
    var _a;
    const { data } = useSession();
    return (<TabLayout>
      <TabTitle>Profile details</TabTitle>
      <Separator className="my-4"/>

      <ProfileSection />

      <Separator className="my-4"/>

      {/* Email Section */}
      <SectionWrapper>
        <SectionTitle>Email addresses</SectionTitle>
        <SectionContent className="flex-col">
          <div className="flex w-full items-center gap-2 text-[13px]">
            <div>{((_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.email) || "example@clerk.dev"}</div>
            <Badge variant="outline">Primary</Badge>
          </div>
        </SectionContent>
      </SectionWrapper>

      <Separator className="my-4"/>
      <ConnectedAccountsSection />
    </TabLayout>);
}
