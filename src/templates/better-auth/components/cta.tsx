import React from "react";
import { Button } from "./ui/button";
import {
  useGetSessionQuery,
  useGetPricingQuery,
  useGetCheckoutMutation,
} from "@/lib/endpoints";
import { useStore } from "@/context";
import { allDocuments } from "@/.contentlayer/generated";
import { useParams } from "next/navigation";
import Loader from "./loader";
import BuyDialog from "./buy-dialog";

type Props = {
  title?: string;
  description?: string;
  showButton?: boolean;
};

export default function CTA({
  title = "Ready to get started?",
  description = "To continue, you need to get full access to all components or this component.",
  showButton = true,
}: Props) {
  const { data: session } = useGetSessionQuery();
  const { data: plans } = useGetPricingQuery();

  const { slug } = useParams<{ slug: string[] }>();

  const checkoutComponent = useGetCheckoutMutation();
  const checkoutFullAccess = useGetCheckoutMutation();

  const { setShowGithubLogin } = useStore();

  return (
    <section className="border-primary relative mt-8 w-full overflow-hidden rounded-2xl border border-dashed px-6 py-20">
      {/* Decorative elements */}
      <div className="bg-primary/20 absolute h-32 w-32 rounded-full blur-3xl" />
      <div className="bg-primary/10 absolute right-0 h-32 w-32 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="from-contrast-high to-contrast-medium bg-gradient-to-br bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:to-gray-400">
          {title}
        </h2>

        <p className="mt-4 mb-10">{description}</p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <BuyDialog>
            <Button variant={"primary"}>
              {checkoutFullAccess.isPending ? <Loader /> : "Get Full Access"}
            </Button>
          </BuyDialog>

          {showButton && (
            <Button
              onClick={() => {
                if (!session) {
                  setShowGithubLogin(true);
                  return;
                }

                checkoutComponent.mutate({
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
                    name: allDocuments.find(
                      (doc) => doc.slugAsParams === slug[1]
                    )?.title,
                    email: session?.user?.email,
                    username: session?.user?.name,
                    price:
                      allDocuments.find((doc) => doc.slugAsParams === slug[1])
                        ?.price || 0,
                  },
                });
              }}
            >
              {checkoutComponent.isPending ? <Loader /> : "Get this Component"}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
