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
export function sendVerificationEmail(email, url) {
    return __awaiter(this, void 0, void 0, function* () {
        yield axios.post("/api/send", {
            to: email,
            url,
            subject: "Verify your email address",
        });
    });
}
export function sendDiscordWebhook(message, username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!process.env.DISCORD_WEBHOOK_HELP) {
                throw new Error("Discord webhook URL is not configured");
            }
            yield axios.post(process.env.DISCORD_WEBHOOK_HELP, {
                content: message,
                username: username || "alisamadi__", // Default username if none provided
            });
            return {
                success: true,
                message: "Message sent to Discord",
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Failed to send message to Discord ${error}`,
            };
        }
    });
}
