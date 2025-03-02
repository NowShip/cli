"use server";

import { db } from "@/db";

import { testimonial } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getTestimonials(): Promise<
  FunctionResponse<(typeof testimonial)["$inferSelect"][]>
> {
  try {
    const testimonials = await db.select().from(testimonial);
    return {
      status: 200,
      data: testimonials,
      message: "Testimonials fetched successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      data: [],
      message: "Failed to fetch testimonials",
    };
  }
}

export async function sendTestimonial(
  message: string,
  email: string,
  name: string,
  position: string,
  image: string
): Promise<FunctionResponse<string>> {
  try {
    await db.insert(testimonial).values({
      content: message,
      email: email,
      name: name,
      position: position,
      image: image,
    });

    return {
      status: 200,
      data: "",
      message: "Testimonial sent successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      data: "",
      message: "Failed to send testimonial",
    };
  }
}

export async function actionTestimonial(values: {
  id: string;
  archived?: boolean;
  publicValue?: boolean;
}): Promise<FunctionResponse<string>> {
  try {
    await db
      .update(testimonial)
      .set({ archived: values.archived, public: values.publicValue })
      .where(eq(testimonial.id, values.id));

    return {
      status: 200,
      data: "",
      message:
        "archived" in values
          ? "Testimonial archive value updated successfully"
          : "publicValue" in values
            ? "Testimonial public value updated successfully"
            : "Testimonial values updated successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      data: "",
      message: "Failed to archive testimonial",
    };
  }
}
