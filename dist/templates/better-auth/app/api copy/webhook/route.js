var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import crypto from "node:crypto";
import { webhookHasMeta } from "@/lib/endpoints/payment/typeguards";
import { processWebhookEvent, storeWebhookEvent } from "@/lib/endpoints";
export function POST(request) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!process.env.LEMONSQUEEZY_WEBHOOK_SECRET) {
            return new Response("Lemon Squeezy Webhook Secret not set in .env", {
                status: 500,
            });
        }
        /* -------------------------------------------------------------------------- */
        /*             First, make sure the request is from Lemon Squeezy.            */
        /* -------------------------------------------------------------------------- */
        // Get the raw body content.
        const rawBody = yield request.text();
        // Get the webhook secret from the environment variables.
        const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
        // Get the signature from the request headers.
        const signature = Buffer.from((_a = request.headers.get("X-Signature")) !== null && _a !== void 0 ? _a : "", "hex");
        // Create a HMAC-SHA256 hash of the raw body content using the secret and
        // compare it to the signature.
        const hmac = Buffer.from(crypto.createHmac("sha256", secret).update(rawBody).digest("hex"), "hex");
        if (!crypto.timingSafeEqual(hmac, signature)) {
            return new Response("Invalid signature", { status: 400 });
        }
        /* -------------------------------------------------------------------------- */
        /*                                Valid request                               */
        /* -------------------------------------------------------------------------- */
        let data;
        try {
            data = JSON.parse(rawBody);
        }
        catch (error) {
            console.error(error);
            return new Response("Invalid JSON payload", { status: 400 });
        }
        // Type guard to check if the object has a 'meta' property.
        if (webhookHasMeta(data)) {
            const webhookEventId = yield storeWebhookEvent(data.meta.event_name, data);
            yield processWebhookEvent(webhookEventId);
            return new Response("OK", { status: 200 });
        }
        return new Response("Invalid webhook payload format", { status: 400 });
    });
}
