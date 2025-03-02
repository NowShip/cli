import React from "react";
import {
  TabLayout,
  TabTitle,
  SectionWrapper,
  SectionTitle,
  SectionContent,
} from "../elements";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  useGetCurrentPlanQuery,
  useGetCustomerPortalMutation,
} from "@/lib/endpoints";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import { format } from "date-fns";

export default function BillingSection() {
  const planQuery = useGetCurrentPlanQuery();
  const customerPortalQuery = useGetCustomerPortalMutation();

  console.log(planQuery.data);

  return (
    <TabLayout>
      <TabTitle>Billing</TabTitle>
      <Separator className="my-4" />
      <SectionWrapper>
        <SectionTitle>Current plan</SectionTitle>
        <SectionContent
          className="justify-start gap-2"
          isLoading={planQuery.isPending}
        >
          {planQuery.data && planQuery.data.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {planQuery.data?.[0].variantName}
                </Badge>
                <Badge variant="secondary" className="capitalize">
                  {planQuery.data?.[0].status}
                </Badge>
              </div>

              <div className="text-muted-foreground text-sm">
                Renews on{" "}
                {planQuery.data?.[0].renewsAt
                  ? format(new Date(planQuery.data[0].renewsAt), "MMMM d, yyyy")
                  : "No renewal date"}
              </div>

              {(planQuery.data?.[0].cardLastFour ||
                planQuery.data?.[0].cardBrand) && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">
                    Payment method:
                  </span>
                  <div className="flex gap-2">
                    {planQuery.data?.[0].cardBrand && (
                      <Badge variant="outline" className="capitalize">
                        {planQuery.data?.[0].cardBrand}
                      </Badge>
                    )}
                    {planQuery.data?.[0].cardLastFour && (
                      <Badge variant="outline">
                        •••• {planQuery.data?.[0].cardLastFour}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </SectionContent>
      </SectionWrapper>
      <Button
        variant="primary"
        className="mt-8 w-full"
        onClick={() => {
          customerPortalQuery.mutate(
            planQuery.data?.[0].lemonSqueezyId?.toString() || undefined
          );
        }}
      >
        {customerPortalQuery.isPending ? <Loader /> : "Manage billing"}
      </Button>
      {customerPortalQuery.isSuccess && <p>{customerPortalQuery.error}</p>}
    </TabLayout>
  );
}
