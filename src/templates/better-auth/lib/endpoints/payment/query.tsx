"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createCheckout,
  customerPortal,
  getAllOrders,
  getCurrentPlan,
  getVariants,
} from "./action";
import { useGetSessionQuery } from "../sessions/query";

import { toast } from "sonner";

export function useGetPricingQuery() {
  return useQuery({
    queryKey: ["pricing"],
    queryFn: async () => {
      const { data, status, message } = await getVariants();

      if (status !== 200) {
        throw new Error(message);
      }

      return data;
    },
    retry: 0,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: "always",
  });
}

export function useGetCurrentPlanQuery() {
  const { data: session } = useGetSessionQuery();

  return useQuery({
    queryKey: ["current-plan"],
    queryFn: async () => {
      if (!session) {
        throw new Error("No session found");
      }

      const { data, status, message } = await getCurrentPlan(
        session.user.email
      );

      if (status !== 200) {
        throw new Error(message);
      }

      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: "always",
    enabled: !!session,
  });
}

export function useGetAllOrdersQuery() {
  const { data: session } = useGetSessionQuery();
  const { data: plans } = useGetPricingQuery();

  return useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => {
      if (!session) {
        throw new Error("No session found");
      }

      const { data, status, message } = await getAllOrders(session.user.id);

      if (status !== 200) {
        throw new Error(message);
      }

      return {
        data,
        isFullAccess: data.some(
          (order) =>
            order.variantId ===
            plans?.find((plan) => plan.name === "FULL_ACCESS")?.variantId
        ),
        isAnimation: data.some(
          (order) =>
            order.variantId ===
            plans?.find((plan) => plan.name === "Animation")?.variantId
        ),
        isReusableComponent: data.some(
          (order) =>
            order.variantId ===
            plans?.find((plan) => plan.name === "Reusable Component")?.variantId
        ),
      };
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: "always",
    enabled: !!session && !!plans,
  });
}

export function useGetCheckoutMutation() {
  const { data: session } = useGetSessionQuery();

  return useMutation({
    mutationFn: async ({
      variantId,
      custom,
      options,
    }: {
      variantId: string | number;
      custom?: Record<string, string>;
      options?: CheckoutOptions;
    }) => {
      if (!variantId) {
        throw new Error("No variant ID found");
      }

      if (!session) {
        throw new Error("No session found");
      }

      if (!session.user.id) {
        throw new Error("No user ID found");
      }

      console.log(variantId);

      const { data, status, message } = await createCheckout(
        variantId.toString(),
        { ...custom, user_id: session.user.id },
        { ...options, redirectUrl: window.location.href }
      );

      if (status !== 201 && status !== 200) {
        throw new Error(message);
      }

      if (
        data.data.attributes.test_mode &&
        process.env.NODE_ENV === "production"
      ) {
        throw new Error(
          "This product is currently under review. Please try again later."
        );
      }

      return data;
    },
    onSuccess: (data) => {
      window.location.href = data.data.attributes.url;
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
}

export function useGetCustomerPortalMutation() {
  return useMutation({
    mutationFn: async (subscriptionId: string | undefined) => {
      if (!subscriptionId) {
        throw new Error("No subscription ID found");
      }

      const { data, status, message } = await customerPortal(subscriptionId);

      if (status !== 200) {
        throw new Error(message);
      }

      return data;
    },
    onSuccess: (data) => {
      window.open(data, "_blank");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
}
