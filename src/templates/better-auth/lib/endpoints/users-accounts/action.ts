"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function setPassword(
  password: string
): Promise<FunctionResponse<string>> {
  const { status } = await auth.api.setPassword({
    body: {
      newPassword: password,
    },
    headers: await headers(),
  });

  if (!status) {
    return {
      data: "",
      message: "Failed to set password",
      status: 400,
    };
  }

  return {
    data: "Password set successfully",
    message: "Password set successfully",
    status: 200,
  };
}
