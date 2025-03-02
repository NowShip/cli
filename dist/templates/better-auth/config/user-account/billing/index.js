import React from "react";
import { TabLayout, TabTitle, SectionWrapper, SectionTitle, SectionContent, } from "../elements";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useGetCurrentPlanQuery, useGetCustomerPortalMutation, } from "@/lib/endpoints";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import { format } from "date-fns";
export default function BillingSection() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const planQuery = useGetCurrentPlanQuery();
    const customerPortalQuery = useGetCustomerPortalMutation();
    console.log(planQuery.data);
    return (<TabLayout>
      <TabTitle>Billing</TabTitle>
      <Separator className="my-4"/>
      <SectionWrapper>
        <SectionTitle>Current plan</SectionTitle>
        <SectionContent className="justify-start gap-2" isLoading={planQuery.isPending}>
          {planQuery.data && planQuery.data.length > 0 && (<div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {(_a = planQuery.data) === null || _a === void 0 ? void 0 : _a[0].variantName}
                </Badge>
                <Badge variant="secondary" className="capitalize">
                  {(_b = planQuery.data) === null || _b === void 0 ? void 0 : _b[0].status}
                </Badge>
              </div>

              <div className="text-muted-foreground text-sm">
                Renews on{" "}
                {((_c = planQuery.data) === null || _c === void 0 ? void 0 : _c[0].renewsAt)
                ? format(new Date(planQuery.data[0].renewsAt), "MMMM d, yyyy")
                : "No renewal date"}
              </div>

              {(((_d = planQuery.data) === null || _d === void 0 ? void 0 : _d[0].cardLastFour) ||
                ((_e = planQuery.data) === null || _e === void 0 ? void 0 : _e[0].cardBrand)) && (<div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">
                    Payment method:
                  </span>
                  <div className="flex gap-2">
                    {((_f = planQuery.data) === null || _f === void 0 ? void 0 : _f[0].cardBrand) && (<Badge variant="outline" className="capitalize">
                        {(_g = planQuery.data) === null || _g === void 0 ? void 0 : _g[0].cardBrand}
                      </Badge>)}
                    {((_h = planQuery.data) === null || _h === void 0 ? void 0 : _h[0].cardLastFour) && (<Badge variant="outline">
                        •••• {(_j = planQuery.data) === null || _j === void 0 ? void 0 : _j[0].cardLastFour}
                      </Badge>)}
                  </div>
                </div>)}
            </div>)}
        </SectionContent>
      </SectionWrapper>
      <Button variant="primary" className="mt-8 w-full" onClick={() => {
            var _a, _b;
            customerPortalQuery.mutate(((_b = (_a = planQuery.data) === null || _a === void 0 ? void 0 : _a[0].lemonSqueezyId) === null || _b === void 0 ? void 0 : _b.toString()) || undefined);
        }}>
        {customerPortalQuery.isPending ? <Loader /> : "Manage billing"}
      </Button>
      {customerPortalQuery.isSuccess && <p>{customerPortalQuery.error}</p>}
    </TabLayout>);
}
