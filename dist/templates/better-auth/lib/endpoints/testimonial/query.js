var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { actionTestimonial, getTestimonials, sendTestimonial } from "./action";
export function useSendTestimonialMutation() {
    return useMutation({
        mutationFn: (_a) => __awaiter(this, [_a], void 0, function* ({ message, email, name, position, image, }) {
            console.log(message, email);
            if (!message || !email) {
                throw new Error("Message and email are required");
            }
            if (message.length < 10) {
                throw new Error("Message must be at least 10 characters");
            }
            try {
                const response = yield sendTestimonial(message, email, name, position, image);
                return response;
            }
            catch (error) {
                console.error(error);
                throw new Error("Failed to send testimonial");
            }
        }),
        onSuccess: () => {
            toast.success("Testimonial sent successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}
export function useGetTestimonialsQuery() {
    return useQuery({
        queryKey: ["testimonials"],
        queryFn: () => __awaiter(this, void 0, void 0, function* () {
            const { data, status, message } = yield getTestimonials();
            if (status !== 200) {
                throw new Error(message);
            }
            return data;
        }),
    });
}
export function useActionTestimonialMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (_a) => __awaiter(this, [_a], void 0, function* ({ id, archived, publicValue, }) {
            const { status, message } = yield actionTestimonial({
                id,
                archived,
                publicValue,
            });
            if (status !== 200) {
                throw new Error(message);
            }
            return { message };
        }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["testimonials"] });
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}
