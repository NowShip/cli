"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

import { Button } from "../ui/button";
import { useGetCheckoutMutation, useGetPricingQuery } from "@/lib/endpoints";
import Content from "../ui/content";
import { formatPrice } from "@/lib/utils";
import Loader from "../loader";

export default function Pricing() {
  const { data, error, isPending } = useGetPricingQuery();

  if (isPending) return <Loader />;

  if (error) return null;

  return (
    <Content className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
      {data
        .filter(
          (product) => product.productName?.toLowerCase() === "subscription"
        )
        .map((product) => (
          <div
            key={product.id}
            className="flex flex-col rounded-3xl border p-8 transition-all duration-200 hover:shadow-sm xl:p-10"
          >
            <div className="flex items-center justify-between gap-x-4">
              <h3 className="text-2xl font-bold tracking-tight">
                {product.name}
              </h3>
              <p className="bg-primary dark:bg-primary-950 dark:text-primary-400 rounded-full px-4 py-1.5 text-sm font-semibold">
                {formatPrice(Number(product.price))}
              </p>
            </div>
            <p className="mt-6 text-base leading-7">
              {product.description
                ?.match(/<p>(.*?)<\/p>/)?.[0]
                ?.replace(/<\/?p>/g, "")}
            </p>
            <ul className="mt-8 space-y-3">
              {product.description
                ?.match(/<li><p>(.*?)<\/p><\/li>/g)
                ?.map((item, index) => {
                  const feature = item.replace(/<li><p>|<\/p><\/li>/g, "");
                  return (
                    <li
                      key={index}
                      className="text-muted flex items-center gap-x-3"
                    >
                      <CheckCircle className="h-5 w-5 flex-none" />
                      <span>{feature}</span>
                    </li>
                  );
                })}
            </ul>
            <CheckoutButton variantId={product.variantId?.toString() || ""} />
          </div>
        ))}
    </Content>
  );
}

function CheckoutButton({ variantId }: { variantId: string }) {
  const { mutate, isPending } = useGetCheckoutMutation();

  return (
    <Button onClick={() => mutate({ variantId })} className="mt-8">
      {isPending ? <Loader /> : "Get started"}
    </Button>
  );
}
