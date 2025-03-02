"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useMutation, useQuery } from "@tanstack/react-query";
import { createCheckout, customerPortal, getAllOrders, getCurrentPlan, getVariants, } from "./action";
import { useGetSessionQuery } from "../sessions/query";
import { toast } from "sonner";
export function useGetPricingQuery() {
    return useQuery({
        queryKey: ["pricing"],
        queryFn: () => __awaiter(this, void 0, void 0, function* () {
            const { data, status, message } = yield getVariants();
            if (status !== 200) {
                throw new Error(message);
            }
            return data;
        }),
        retry: 0,
        staleTime: 1000 * 60 * 60, // 1 hour
        refetchOnWindowFocus: "always",
    });
}
export function useGetCurrentPlanQuery() {
    const { data: session } = useGetSessionQuery();
    return useQuery({
        queryKey: ["current-plan"],
        queryFn: () => __awaiter(this, void 0, void 0, function* () {
            if (!session) {
                throw new Error("No session found");
            }
            const { data, status, message } = yield getCurrentPlan(session.user.email);
            if (status !== 200) {
                throw new Error(message);
            }
            return data;
        }),
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
        queryFn: () => __awaiter(this, void 0, void 0, function* () {
            if (!session) {
                throw new Error("No session found");
            }
            const { data, status, message } = yield getAllOrders(session.user.id);
            if (status !== 200) {
                throw new Error(message);
            }
            return {
                data,
                isFullAccess: data.some((order) => {
                    var _a;
                    return order.variantId ===
                        ((_a = plans === null || plans === void 0 ? void 0 : plans.find((plan) => plan.name === "FULL_ACCESS")) === null || _a === void 0 ? void 0 : _a.variantId);
                }),
                isAnimation: data.some((order) => {
                    var _a;
                    return order.variantId ===
                        ((_a = plans === null || plans === void 0 ? void 0 : plans.find((plan) => plan.name === "Animation")) === null || _a === void 0 ? void 0 : _a.variantId);
                }),
                isReusableComponent: data.some((order) => {
                    var _a;
                    return order.variantId ===
                        ((_a = plans === null || plans === void 0 ? void 0 : plans.find((plan) => plan.name === "Reusable Component")) === null || _a === void 0 ? void 0 : _a.variantId);
                }),
            };
        }),
        staleTime: 1000 * 60 * 60, // 1 hour
        refetchOnWindowFocus: "always",
        enabled: !!session && !!plans,
    });
}
export function useGetCheckoutMutation() {
    const { data: session } = useGetSessionQuery();
    return useMutation({
        mutationFn: (_a) => __awaiter(this, [_a], void 0, function* ({ variantId, custom, options, }) {
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
            const { data, status, message } = yield createCheckout(variantId.toString(), Object.assign(Object.assign({}, custom), { user_id: session.user.id }), Object.assign(Object.assign({}, options), { redirectUrl: window.location.href }));
            if (status !== 201 && status !== 200) {
                throw new Error(message);
            }
            if (data.data.attributes.test_mode &&
                process.env.NODE_ENV === "production") {
                throw new Error("This product is currently under review. Please try again later.");
            }
            return data;
        }),
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
        mutationFn: (subscriptionId) => __awaiter(this, void 0, void 0, function* () {
            if (!subscriptionId) {
                throw new Error("No subscription ID found");
            }
            const { data, status, message } = yield customerPortal(subscriptionId);
            if (status !== 200) {
                throw new Error(message);
            }
            return data;
        }),
        onSuccess: (data) => {
            window.open(data, "_blank");
        },
        onError: (error) => {
            console.log(error);
            toast.error(error.message);
        },
    });
}
