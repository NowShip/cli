"use client";
import React, { useEffect, useState } from "react";
import { GithubIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useGetAllOrdersQuery, useGetCheckoutMutation, useGetPricingQuery, useGetSessionQuery, useUserSignInWithGitHubMutation, } from "@/lib/endpoints";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import Loader from "./loader";
import { useStore } from "@/context";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
export default function BuyDialog({ children }) {
    const [selectedPlan, setSelectedPlan] = useState([]);
    const { data: session, isPending } = useGetSessionQuery();
    const { data: plans } = useGetPricingQuery();
    const { data: orders } = useGetAllOrdersQuery();
    const signInWithGitHub = useUserSignInWithGitHubMutation();
    const { showGithubLogin, setShowGithubLogin } = useStore();
    const targetPlan = plans === null || plans === void 0 ? void 0 : plans.filter((plan) => plan.name === "Animation" || plan.name === "Reusable Component");
    const isFullAccessPlan = selectedPlan.length === (targetPlan === null || targetPlan === void 0 ? void 0 : targetPlan.length);
    useEffect(() => {
        if (targetPlan) {
            setSelectedPlan(targetPlan);
        }
    }, [plans]);
    const handlePlanSelection = (plan) => {
        setSelectedPlan((prev) => {
            const isSelected = prev.some((p) => p.id === plan.id);
            if (isSelected) {
                return prev.filter((p) => p.id !== plan.id);
            }
            else {
                return [...prev, plan];
            }
        });
    };
    const checkout = useGetCheckoutMutation();
    return (<Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div className="space-y-6">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-[var(--color-contrast-higher)]">
              Choose Your Plan
            </h2>
            <p className="">Select the features you want to unlock</p>
          </div>

          <div className="space-y-4">
            {targetPlan === null || targetPlan === void 0 ? void 0 : targetPlan.map((plan) => (<Label key={plan.id} className={cn("hover:bg-contrast-higher/2 flex cursor-pointer items-start gap-4 rounded-xl border p-5 transition-all", (orders === null || orders === void 0 ? void 0 : orders.isFullAccess) ||
                (plan.name === "Animation" && (orders === null || orders === void 0 ? void 0 : orders.isAnimation)) ||
                (plan.name === "Reusable Component" &&
                    (orders === null || orders === void 0 ? void 0 : orders.isReusableComponent) &&
                    "opacity-50"))}>
                <Checkbox defaultChecked checked={selectedPlan.some((p) => p.id === plan.id)} onCheckedChange={() => handlePlanSelection(plan)} className="mt-1" disabled={(orders === null || orders === void 0 ? void 0 : orders.isFullAccess) ||
                (plan.name === "Animation" && (orders === null || orders === void 0 ? void 0 : orders.isAnimation)) ||
                (plan.name === "Reusable Component" &&
                    (orders === null || orders === void 0 ? void 0 : orders.isReusableComponent))}/>
                <div className="grow space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[var(--color-contrast-higher)]">
                      {plan.name}
                    </h3>
                    <p className="text-primary text-lg font-bold">
                      ${Number(plan.price) / 100}
                    </p>
                  </div>
                  <p className="text-[var(--color-contrast-medium)]">
                    {plan.description}
                  </p>
                  {plan.name === "Reusable Component" && (<Badge>Early Access</Badge>)}
                </div>
              </Label>))}
          </div>

          <p>
            Without full access to a single plan, you&apos;ll need to purchase
            components individually at their respective prices.
          </p>

          <div className="flex items-center justify-between border-t pt-6">
            <Popover open={showGithubLogin} onOpenChange={() => {
            if (showGithubLogin)
                setShowGithubLogin(false);
        }}>
              <PopoverTrigger asChild>
                <Button variant="primary" disabled={checkout.isPending ||
            (orders === null || orders === void 0 ? void 0 : orders.isFullAccess) ||
            selectedPlan.length === 0} onClick={() => {
            var _a, _b, _c;
            if (!session) {
                setShowGithubLogin(true);
                return;
            }
            checkout.mutate({
                variantId: isFullAccessPlan
                    ? ((_a = plans === null || plans === void 0 ? void 0 : plans.find((plan) => plan.name === "FULL_ACCESS")) === null || _a === void 0 ? void 0 : _a.variantId) || ""
                    : selectedPlan[0].variantId,
                options: {
                    price: (orders === null || orders === void 0 ? void 0 : orders.isAnimation)
                        ? ((_b = plans === null || plans === void 0 ? void 0 : plans.find((plan) => plan.name === "Animation")) === null || _b === void 0 ? void 0 : _b.price) || 0
                        : (orders === null || orders === void 0 ? void 0 : orders.isReusableComponent)
                            ? ((_c = plans === null || plans === void 0 ? void 0 : plans.find((plan) => plan.name === "Reusable Component")) === null || _c === void 0 ? void 0 : _c.price) || 0
                            : 0,
                },
            });
        }}>
                  {checkout.isPending ? <Loader /> : "Purchase Now"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-[300px]">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">
                      Connect with GitHub
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      To get full access to all features, please connect your
                      GitHub account first.
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
            </Popover>

            <div className="text-right">
              <p className="mb-1 text-sm text-[var(--color-contrast-medium)]">
                Total Amount
              </p>
              <div className="text-xl font-bold text-[var(--color-contrast-higher)]">
                {!(orders === null || orders === void 0 ? void 0 : orders.isAnimation) && !(orders === null || orders === void 0 ? void 0 : orders.isReusableComponent) && (<span className={cn(isFullAccessPlan && "text-base line-through")}>
                    $
                    {selectedPlan.reduce((acc, plan) => acc + Number(plan.price), 0) / 100}
                  </span>)}
                {isFullAccessPlan && (<span className="text-primary ml-2">
                    $
                    {(() => {
                var _a, _b, _c;
                if (orders === null || orders === void 0 ? void 0 : orders.isAnimation) {
                    return ((((_a = plans === null || plans === void 0 ? void 0 : plans.find((plan) => plan.name === "Animation")) === null || _a === void 0 ? void 0 : _a.price) || 0) / 100);
                }
                if (orders === null || orders === void 0 ? void 0 : orders.isReusableComponent) {
                    return ((((_b = plans === null || plans === void 0 ? void 0 : plans.find((plan) => plan.name === "Reusable Component")) === null || _b === void 0 ? void 0 : _b.price) || 0) / 100);
                }
                return ((((_c = plans === null || plans === void 0 ? void 0 : plans.find((plan) => plan.name === "FULL_ACCESS")) === null || _c === void 0 ? void 0 : _c.price) || 0) / 100);
            })()}
                  </span>)}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>);
}
