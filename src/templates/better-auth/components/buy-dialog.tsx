"use client";

import React, { useEffect, useState } from "react";
import { GithubIcon } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import {
  useGetAllOrdersQuery,
  useGetCheckoutMutation,
  useGetPricingQuery,
  useGetSessionQuery,
  useUserSignInWithGitHubMutation,
} from "@/lib/endpoints";
import { Button } from "./ui/button";
import { NewPlan } from "@/db/schema";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import Loader from "./loader";
import { useStore } from "@/context";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type Props = {
  children: React.ReactNode;
};

export default function BuyDialog({ children }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<NewPlan[]>([]);

  const { data: session, isPending } = useGetSessionQuery();

  const { data: plans } = useGetPricingQuery();
  const { data: orders } = useGetAllOrdersQuery();
  const signInWithGitHub = useUserSignInWithGitHubMutation();

  const { showGithubLogin, setShowGithubLogin } = useStore();

  const targetPlan = plans?.filter(
    (plan) => plan.name === "Animation" || plan.name === "Reusable Component"
  );
  const isFullAccessPlan = selectedPlan.length === targetPlan?.length;

  useEffect(() => {
    if (targetPlan) {
      setSelectedPlan(targetPlan);
    }
  }, [plans]);

  const handlePlanSelection = (plan: NewPlan) => {
    setSelectedPlan((prev) => {
      const isSelected = prev.some((p) => p.id === plan.id);
      if (isSelected) {
        return prev.filter((p) => p.id !== plan.id);
      } else {
        return [...prev, plan];
      }
    });
  };

  const checkout = useGetCheckoutMutation();

  return (
    <Dialog>
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
            {targetPlan?.map((plan) => (
              <Label
                key={plan.id}
                className={cn(
                  "hover:bg-contrast-higher/2 flex cursor-pointer items-start gap-4 rounded-xl border p-5 transition-all",
                  orders?.isFullAccess ||
                    (plan.name === "Animation" && orders?.isAnimation) ||
                    (plan.name === "Reusable Component" &&
                      orders?.isReusableComponent &&
                      "opacity-50")
                )}
              >
                <Checkbox
                  defaultChecked
                  checked={selectedPlan.some((p) => p.id === plan.id)}
                  onCheckedChange={() => handlePlanSelection(plan)}
                  className="mt-1"
                  disabled={
                    orders?.isFullAccess ||
                    (plan.name === "Animation" && orders?.isAnimation) ||
                    (plan.name === "Reusable Component" &&
                      orders?.isReusableComponent)
                  }
                />
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
                  {plan.name === "Reusable Component" && (
                    <Badge>Early Access</Badge>
                  )}
                </div>
              </Label>
            ))}
          </div>

          <p>
            Without full access to a single plan, you&apos;ll need to purchase
            components individually at their respective prices.
          </p>

          <div className="flex items-center justify-between border-t pt-6">
            <Popover
              open={showGithubLogin}
              onOpenChange={() => {
                if (showGithubLogin) setShowGithubLogin(false);
              }}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="primary"
                  disabled={
                    checkout.isPending ||
                    orders?.isFullAccess ||
                    selectedPlan.length === 0
                  }
                  onClick={() => {
                    if (!session) {
                      setShowGithubLogin(true);
                      return;
                    }

                    checkout.mutate({
                      variantId: isFullAccessPlan
                        ? plans?.find((plan) => plan.name === "FULL_ACCESS")
                            ?.variantId || ""
                        : selectedPlan[0].variantId,
                      options: {
                        price: orders?.isAnimation
                          ? plans?.find((plan) => plan.name === "Animation")
                              ?.price || 0
                          : orders?.isReusableComponent
                            ? plans?.find(
                                (plan) => plan.name === "Reusable Component"
                              )?.price || 0
                            : 0,
                      },
                    });
                  }}
                >
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
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      signInWithGitHub.mutate();
                    }}
                    disabled={signInWithGitHub.isPending}
                  >
                    <GithubIcon className="mr-2 h-4 w-4" />
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
                {!orders?.isAnimation && !orders?.isReusableComponent && (
                  <span
                    className={cn(isFullAccessPlan && "text-base line-through")}
                  >
                    $
                    {selectedPlan.reduce(
                      (acc, plan) => acc + Number(plan.price),
                      0
                    ) / 100}
                  </span>
                )}
                {isFullAccessPlan && (
                  <span className="text-primary ml-2">
                    $
                    {(() => {
                      if (orders?.isAnimation) {
                        return (
                          (plans?.find((plan) => plan.name === "Animation")
                            ?.price || 0) / 100
                        );
                      }
                      if (orders?.isReusableComponent) {
                        return (
                          (plans?.find(
                            (plan) => plan.name === "Reusable Component"
                          )?.price || 0) / 100
                        );
                      }
                      return (
                        (plans?.find((plan) => plan.name === "FULL_ACCESS")
                          ?.price || 0) / 100
                      );
                    })()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
