import React, { useState, ReactNode } from "react";
import { LayoutGroup, motion } from "motion/react";
import { toast } from "sonner";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  useGetAllOrdersQuery,
  useGetCheckoutMutation,
  useGetPricingQuery,
  useGetSessionQuery,
} from "@/lib/endpoints";
import Loader from "../loader";
import { allDocuments } from "@/.contentlayer/generated";
import { useStore } from "@/context";

interface TabProps {
  label: string;
  children: ReactNode;
}

export interface TabsProps {
  children: ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ children, className }) => {
  const [activeTab, setActiveTab] = useState(0);

  let { slug } = useParams<{ slug: string[] }>();
  const pathname = usePathname();

  if (pathname === "/") {
    slug = ["motion", "ios-app-store-card"];
  }

  const { data: session } = useGetSessionQuery();
  const { data: plans } = useGetPricingQuery();
  const { data: orders } = useGetAllOrdersQuery();

  const { setShowGithubLogin } = useStore();

  const checkout = useGetCheckoutMutation();

  let isProductBought = false;

  if (slug[0] === "animation") {
    isProductBought = orders?.isAnimation || false;
  } else if (slug[0] === "components") {
    isProductBought = orders?.isReusableComponent || false;
  }

  const isBought =
    orders?.isFullAccess ||
    isProductBought ||
    orders?.data.some((order) => order.productName === slug[1]);

  return (
    <LayoutGroup>
      <div
        className={cn(
          "border-b-code mx-auto my-4 flex items-center",
          className
        )}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement<TabProps>(child)) return null;

          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={cn(
                "relative h-8 px-4 font-medium transition-colors",
                activeTab !== index ? "text-contrast-high/60" : "text-black"
              )}
            >
              <span className="relative z-10 capitalize">
                {child.props.label}
              </span>

              {activeTab === index && (
                <motion.div
                  layoutId="tab-underline"
                  transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
                  className="bg-primary absolute inset-0 rounded-full shadow-sm"
                />
              )}
            </button>
          );
        })}

        {!isBought && slug[0] !== "reusable-components" && (
          <Button
            variant="outline"
            className="ml-auto"
            onClick={() => {
              if (!session) {
                toast.error("You need to be logged in to buy the component.");
                return;
              }

              checkout.mutate({
                variantId:
                  plans
                    ?.find((plan) => plan.name === "Components")
                    ?.variantId.toString() || "",
                custom: {
                  product_name: slug[1],
                },
                options: {
                  redirectUrl: window.location.href,
                  description: allDocuments.find(
                    (doc) => doc.slugAsParams === slug[1]
                  )?.description,
                  name: allDocuments.find((doc) => doc.slugAsParams === slug[1])
                    ?.title,
                  email: session?.user?.email,
                  username: session?.user?.name,
                  price:
                    allDocuments.find((doc) => doc.slugAsParams === slug[1])
                      ?.price || 0,
                },
              });
            }}
          >
            {checkout.isPending ? (
              <Loader />
            ) : (
              `Get the component for $${
                (allDocuments.find((doc) => doc.slugAsParams === slug[1])
                  ?.price || 0) / 100
              }`
            )}
          </Button>
        )}
      </div>

      {activeTab === 0 && (
        <div>{React.Children.toArray(children)[activeTab]}</div>
      )}

      {activeTab === 1 &&
        (isBought ? (
          <div>{React.Children.toArray(children)[activeTab]}</div>
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed p-8 text-center">
            <p className="text-lg font-medium">
              You need to buy the component to access the documentation.
            </p>
            <p className="text-sm">
              Get full access to the source code and documentation.
            </p>
          </div>
        ))}
    </LayoutGroup>
  );
};

export const Tab: React.FC<TabProps> = ({ children }) => <div>{children}</div>;
