"use server";

import axios, { type AxiosError } from "axios";
import { type Checkout, getPrice } from "@lemonsqueezy/lemonsqueezy.js";
import crypto from "node:crypto";

import {
  NewOrder,
  NewPlan,
  NewSubscription,
  orders,
  plans,
  subscriptions,
  webhookEvents,
} from "@/db/schema";
import { NewWebhookEvent } from "@/db/schema";
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

export async function getVariants(): Promise<FunctionResponse<NewPlan[]>> {
  try {
    const response = await db.select().from(plans);

    return {
      data: response,
      message: "Success",
      status: 200,
    };
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return {
      data: {} as NewPlan[],
      message: err.response?.data.message || "Error",
      status: err.response?.status || 500,
    };
  }
}

export async function getCurrentPlan(
  email: string
): Promise<FunctionResponse<NewSubscription[]>> {
  try {
    const response = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.email, email));

    return {
      data: response,
      message: "Success",
      status: 200,
    };
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return {
      data: {} as NewSubscription[],
      message: err.response?.data.message || "Error",
      status: err.response?.status || 500,
    };
  }
}

export async function getAllOrders(
  userId: string
): Promise<FunctionResponse<NewOrder[]>> {
  try {
    const response = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId));

    return {
      data: response,
      message: "Success",
      status: 200,
    };
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return {
      data: {} as NewOrder[],
      message: err.response?.data.message || "Error",
      status: err.response?.status || 500,
    };
  }
}

export async function createCheckout(
  variantId: string,
  custom?: Record<string, string>,
  options?: CheckoutOptions
): Promise<FunctionResponse<Checkout>> {
  try {
    const bodyValue = {
      data: {
        type: "checkouts",
        attributes: {
          custom_price: options?.price || undefined,
          expires_at: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
          product_options: {
            enabled_variants: [variantId],
            redirect_url: options?.redirectUrl,
            receipt_button_text: options?.receiptButtonText || "Go to website",
            name: options?.name || undefined,
            description: options?.description || undefined,
            // gmail_link: options?.gmailLink || undefined,
            // name, redirect_url, receipt_button_text
          },
          checkout_data: {
            name: options?.username || undefined,
            email: options?.email || undefined,
            custom: {
              ...custom,
            },
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

    const response = await paymentApi.post(`/checkouts`, bodyValue);

    return {
      data: response.data,
      message: "Success",
      status: response.status,
    };
  } catch (error) {
    const err = error as AxiosError<LemonSqueezyError>;

    return {
      data: {} as Checkout,
      message: err.response?.data.errors[0].detail || "Error",
      status: err.response?.status || 500,
    };
  }
}

export async function customerPortal(
  subscriptionId: string
): Promise<FunctionResponse<string>> {
  try {
    const { data } = await paymentApi.get(`/subscriptions/${subscriptionId}`);

    return {
      data: data?.data.attributes.urls.customer_portal || "",
      message: "Success",
      status: 200,
    };
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return {
      data: "",
      message: err.response?.data.message || "Error",
      status: err.response?.status || 500,
    };
  }
}

export async function getOrders(email: string): Promise<FunctionResponse<any>> {
  try {
    const response = await paymentApi.get(
      `/orders?filter[user_email]=${email}&filter[store_id]=${process.env.NEXT_PUBLIC_STORE_ID}`
    );

    return {
      data: response.data,
      message: "Success",
      status: 200,
    };
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return {
      data: {},
      message: err.response?.data.message || "Error",
      status: err.response?.status || 500,
    };
  }
}

export async function storeWebhookEvent(
  eventName: string,
  body: NewWebhookEvent["body"]
) {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const id = crypto.randomInt(100000000, 1000000000);

  const returnedValue = await db
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
}

/**
 * This action will process a webhook event in the database.
 */
export async function processWebhookEvent(webhookEvent: NewWebhookEvent) {
  configureLemonSqueezy();

  const dbwebhookEvent = await db
    .select()
    .from(webhookEvents)
    .where(eq(webhookEvents.id, webhookEvent.id));

  if (dbwebhookEvent.length < 1) {
    throw new Error(
      `Webhook event #${webhookEvent.id} not found in the database.`
    );
  }

  let processingError = "";
  const eventBody = webhookEvent.body;

  if (!webhookHasMeta(eventBody)) {
    processingError = "Event body is missing the 'meta' property.";
  } else if (webhookHasData(eventBody)) {
    if (webhookEvent.eventName.startsWith("subscription_payment_")) {
      // Save subscription invoices; eventBody is a SubscriptionInvoice
      // Not implemented.
    } else if (webhookEvent.eventName.startsWith("subscription_")) {
      // Save subscription events; obj is a Subscription
    } else if (webhookEvent.eventName.startsWith("order_")) {
      const attributes = eventBody.data.attributes;
      const meta = eventBody.meta;

      const variantId = attributes.first_order_item.variant_id;

      // We assume that the Plan table is up to date.
      const [plan] = await db
        .select()
        .from(plans)
        .where(eq(plans.variantId, parseInt(variantId.toString(), 10)));

      if (!plan) {
        processingError = `Plan #${variantId} not found in the database.`;
      } else {
        const updateData: NewOrder = {
          orderId: eventBody.data.id,
          name: attributes.user_name as string,
          email: attributes.user_email as string,
          status: attributes.status as string,
          variantId: plan.variantId,
          productName: meta.custom_data?.product_name ?? "",
          userId: meta.custom_data?.user_id ?? "",
          createdAt: new Date(attributes.created_at as string),
          updatedAt: new Date(attributes.updated_at as string),
          refunded: attributes.refunded as boolean,
        };

        try {
          await db.insert(orders).values(updateData).onConflictDoUpdate({
            target: orders.orderId,
            set: updateData,
          });
        } catch (error) {
          processingError = `Failed to upsert Order #${updateData.orderId} to the database. ${error}`;
        }
      }
    } else if (webhookEvent.eventName.startsWith("license_")) {
      // Save license keys; eventBody is a "License key"
      /* Not implemented */
    }

    // Update the webhook event in the database.
    await db
      .update(webhookEvents)
      .set({
        processed: true,
        processingError,
      })
      .where(eq(webhookEvents.id, webhookEvent.id));
  }
}
