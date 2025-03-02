"use server";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import crypto from "node:crypto";
import { orders, plans, subscriptions, webhookEvents, } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { configureLemonSqueezy } from "@/config/lemonsqueezy";
import { webhookHasData, webhookHasMeta } from "./typeguards";
export const paymentApi = axios.create({
    baseURL: `https://api.lemonsqueezy.com/v1`,
    headers: {
        accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
    },
});
export function getVariants() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const response = yield db.select().from(plans);
            return {
                data: response,
                message: "Success",
                status: 200,
            };
        }
        catch (error) {
            const err = error;
            return {
                data: {},
                message: ((_a = err.response) === null || _a === void 0 ? void 0 : _a.data.message) || "Error",
                status: ((_b = err.response) === null || _b === void 0 ? void 0 : _b.status) || 500,
            };
        }
    });
}
export function getCurrentPlan(email) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const response = yield db
                .select()
                .from(subscriptions)
                .where(eq(subscriptions.email, email));
            return {
                data: response,
                message: "Success",
                status: 200,
            };
        }
        catch (error) {
            const err = error;
            return {
                data: {},
                message: ((_a = err.response) === null || _a === void 0 ? void 0 : _a.data.message) || "Error",
                status: ((_b = err.response) === null || _b === void 0 ? void 0 : _b.status) || 500,
            };
        }
    });
}
export function getAllOrders(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const response = yield db
                .select()
                .from(orders)
                .where(eq(orders.userId, userId));
            return {
                data: response,
                message: "Success",
                status: 200,
            };
        }
        catch (error) {
            const err = error;
            return {
                data: {},
                message: ((_a = err.response) === null || _a === void 0 ? void 0 : _a.data.message) || "Error",
                status: ((_b = err.response) === null || _b === void 0 ? void 0 : _b.status) || 500,
            };
        }
    });
}
export function createCheckout(variantId, custom, options) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const bodyValue = {
                data: {
                    type: "checkouts",
                    attributes: {
                        custom_price: (options === null || options === void 0 ? void 0 : options.price) || undefined,
                        expires_at: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
                        product_options: {
                            enabled_variants: [variantId],
                            redirect_url: options === null || options === void 0 ? void 0 : options.redirectUrl,
                            receipt_button_text: (options === null || options === void 0 ? void 0 : options.receiptButtonText) || "Go to website",
                            name: (options === null || options === void 0 ? void 0 : options.name) || undefined,
                            description: (options === null || options === void 0 ? void 0 : options.description) || undefined,
                            // gmail_link: options?.gmailLink || undefined,
                            // name, redirect_url, receipt_button_text
                        },
                        checkout_data: {
                            name: (options === null || options === void 0 ? void 0 : options.username) || undefined,
                            email: (options === null || options === void 0 ? void 0 : options.email) || undefined,
                            custom: Object.assign({}, custom),
                        }, // name, email, address, tax number, discount code, quantities
                    },
                    relationships: {
                        store: {
                            data: {
                                type: "stores",
                                id: process.env.LEMONSQUEEZY_STORE_ID,
                            },
                        },
                        variant: {
                            data: {
                                id: variantId,
                                type: "variants",
                            },
                        },
                    },
                },
            };
            const response = yield paymentApi.post(`/checkouts`, bodyValue);
            return {
                data: response.data,
                message: "Success",
                status: response.status,
            };
        }
        catch (error) {
            const err = error;
            return {
                data: {},
                message: ((_a = err.response) === null || _a === void 0 ? void 0 : _a.data.errors[0].detail) || "Error",
                status: ((_b = err.response) === null || _b === void 0 ? void 0 : _b.status) || 500,
            };
        }
    });
}
export function customerPortal(subscriptionId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const { data } = yield paymentApi.get(`/subscriptions/${subscriptionId}`);
            return {
                data: (data === null || data === void 0 ? void 0 : data.data.attributes.urls.customer_portal) || "",
                message: "Success",
                status: 200,
            };
        }
        catch (error) {
            const err = error;
            return {
                data: "",
                message: ((_a = err.response) === null || _a === void 0 ? void 0 : _a.data.message) || "Error",
                status: ((_b = err.response) === null || _b === void 0 ? void 0 : _b.status) || 500,
            };
        }
    });
}
export function getOrders(email) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const response = yield paymentApi.get(`/orders?filter[user_email]=${email}&filter[store_id]=${process.env.NEXT_PUBLIC_STORE_ID}`);
            return {
                data: response.data,
                message: "Success",
                status: 200,
            };
        }
        catch (error) {
            const err = error;
            return {
                data: {},
                message: ((_a = err.response) === null || _a === void 0 ? void 0 : _a.data.message) || "Error",
                status: ((_b = err.response) === null || _b === void 0 ? void 0 : _b.status) || 500,
            };
        }
    });
}
export function storeWebhookEvent(eventName, body) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL is not set");
        }
        const id = crypto.randomInt(100000000, 1000000000);
        const returnedValue = yield db
            .insert(webhookEvents)
            .values({
            id,
            eventName,
            processed: false,
            body,
        })
            .onConflictDoNothing({ target: plans.id })
            .returning();
        return returnedValue[0];
    });
}
/**
 * This action will process a webhook event in the database.
 */
export function processWebhookEvent(webhookEvent) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        configureLemonSqueezy();
        const dbwebhookEvent = yield db
            .select()
            .from(webhookEvents)
            .where(eq(webhookEvents.id, webhookEvent.id));
        if (dbwebhookEvent.length < 1) {
            throw new Error(`Webhook event #${webhookEvent.id} not found in the database.`);
        }
        let processingError = "";
        const eventBody = webhookEvent.body;
        if (!webhookHasMeta(eventBody)) {
            processingError = "Event body is missing the 'meta' property.";
        }
        else if (webhookHasData(eventBody)) {
            if (webhookEvent.eventName.startsWith("subscription_payment_")) {
                // Save subscription invoices; eventBody is a SubscriptionInvoice
                // Not implemented.
            }
            else if (webhookEvent.eventName.startsWith("subscription_")) {
                // Save subscription events; obj is a Subscription
            }
            else if (webhookEvent.eventName.startsWith("order_")) {
                const attributes = eventBody.data.attributes;
                const meta = eventBody.meta;
                const variantId = attributes.first_order_item.variant_id;
                // We assume that the Plan table is up to date.
                const [plan] = yield db
                    .select()
                    .from(plans)
                    .where(eq(plans.variantId, parseInt(variantId.toString(), 10)));
                if (!plan) {
                    processingError = `Plan #${variantId} not found in the database.`;
                }
                else {
                    const updateData = {
                        orderId: eventBody.data.id,
                        name: attributes.user_name,
                        email: attributes.user_email,
                        status: attributes.status,
                        variantId: plan.variantId,
                        productName: (_b = (_a = meta.custom_data) === null || _a === void 0 ? void 0 : _a.product_name) !== null && _b !== void 0 ? _b : "",
                        userId: (_d = (_c = meta.custom_data) === null || _c === void 0 ? void 0 : _c.user_id) !== null && _d !== void 0 ? _d : "",
                        createdAt: new Date(attributes.created_at),
                        updatedAt: new Date(attributes.updated_at),
                        refunded: attributes.refunded,
                    };
                    try {
                        yield db.insert(orders).values(updateData).onConflictDoUpdate({
                            target: orders.orderId,
                            set: updateData,
                        });
                    }
                    catch (error) {
                        processingError = `Failed to upsert Order #${updateData.orderId} to the database. ${error}`;
                    }
                }
            }
            else if (webhookEvent.eventName.startsWith("license_")) {
                // Save license keys; eventBody is a "License key"
                /* Not implemented */
            }
            // Update the webhook event in the database.
            yield db
                .update(webhookEvents)
                .set({
                processed: true,
                processingError,
            })
                .where(eq(webhookEvents.id, webhookEvent.id));
        }
    });
}
