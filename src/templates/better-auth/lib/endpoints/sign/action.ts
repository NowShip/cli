"use server";

import axios from "axios";

export async function sendVerificationEmail(email: string, url: string) {
  await axios.post("/api/send", {
    to: email,
    url,
    subject: "Verify your email address",
  });
}

export async function sendDiscordWebhook(message: string, username?: string) {
  try {
    if (!process.env.DISCORD_WEBHOOK_HELP) {
      throw new Error("Discord webhook URL is not configured");
    }

    await axios.post(process.env.DISCORD_WEBHOOK_HELP, {
      content: message,
      username: username || "alisamadi__", // Default username if none provided
    });

    return {
      success: true,
      message: "Message sent to Discord",
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to send message to Discord ${error}`,
    };
  }
}
