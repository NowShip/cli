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
import { db } from "@/db";
import { testimonial } from "@/db/schema";
import { eq } from "drizzle-orm";
export function getTestimonials() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const testimonials = yield db.select().from(testimonial);
            return {
                status: 200,
                data: testimonials,
                message: "Testimonials fetched successfully",
            };
        }
        catch (error) {
            console.error(error);
            return {
                status: 500,
                data: [],
                message: "Failed to fetch testimonials",
            };
        }
    });
}
export function sendTestimonial(message, email, name, position, image) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db.insert(testimonial).values({
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
        }
        catch (error) {
            console.error(error);
            return {
                status: 500,
                data: "",
                message: "Failed to send testimonial",
            };
        }
    });
}
export function actionTestimonial(values) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db
                .update(testimonial)
                .set({ archived: values.archived, public: values.publicValue })
                .where(eq(testimonial.id, values.id));
            return {
                status: 200,
                data: "",
                message: "archived" in values
                    ? "Testimonial archive value updated successfully"
                    : "publicValue" in values
                        ? "Testimonial public value updated successfully"
                        : "Testimonial values updated successfully",
            };
        }
        catch (error) {
            console.error(error);
            return {
                status: 500,
                data: "",
                message: "Failed to archive testimonial",
            };
        }
    });
}
