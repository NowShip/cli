import React from "react";
import { Button } from "./ui/button";
import { useGetSessionQuery, useGetPricingQuery, useGetCheckoutMutation, } from "@/lib/endpoints";
import { useStore } from "@/context";
import { allDocuments } from "@/.contentlayer/generated";
import { useParams } from "next/navigation";
import Loader from "./loader";
import BuyDialog from "./buy-dialog";
export default function CTA({ title = "Ready to get started?", description = "To continue, you need to get full access to all components or this component.", showButton = true, }) {
    const { data: session } = useGetSessionQuery();
    const { data: plans } = useGetPricingQuery();
    const { slug } = useParams();
    const checkoutComponent = useGetCheckoutMutation();
    const checkoutFullAccess = useGetCheckoutMutation();
    const { setShowGithubLogin } = useStore();
    return (<section className="border-primary relative mt-8 w-full overflow-hidden rounded-2xl border border-dashed px-6 py-20">
      {/* Decorative elements */}
      <div className="bg-primary/20 absolute h-32 w-32 rounded-full blur-3xl"/>
      <div className="bg-primary/10 absolute right-0 h-32 w-32 rounded-full blur-3xl"/>

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

          {showButton && (<Button onClick={() => {
                var _a, _b, _c, _d, _e, _f;
                if (!session) {
                    setShowGithubLogin(true);
                    return;
                }
                checkoutComponent.mutate({
                    variantId: ((_a = plans === null || plans === void 0 ? void 0 : plans.find((plan) => plan.name === "Components")) === null || _a === void 0 ? void 0 : _a.variantId.toString()) || "",
                    custom: {
                        product_name: slug[1],
                    },
                    options: {
                        redirectUrl: window.location.href,
                        description: (_b = allDocuments.find((doc) => doc.slugAsParams === slug[1])) === null || _b === void 0 ? void 0 : _b.description,
                        name: (_c = allDocuments.find((doc) => doc.slugAsParams === slug[1])) === null || _c === void 0 ? void 0 : _c.title,
                        email: (_d = session === null || session === void 0 ? void 0 : session.user) === null || _d === void 0 ? void 0 : _d.email,
                        username: (_e = session === null || session === void 0 ? void 0 : session.user) === null || _e === void 0 ? void 0 : _e.name,
                        price: ((_f = allDocuments.find((doc) => doc.slugAsParams === slug[1])) === null || _f === void 0 ? void 0 : _f.price) || 0,
                    },
                });
            }}>
              {checkoutComponent.isPending ? <Loader /> : "Get this Component"}
            </Button>)}
        </div>
      </div>
    </section>);
}
