import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { actionTestimonial, getTestimonials, sendTestimonial } from "./action";

export function useSendTestimonialMutation() {
  return useMutation({
    mutationFn: async ({
      message,
      email,
      name,
      position,
      image,
    }: {
      message: string;
      email: string;
      name: string;
      position: string;
      image: string;
    }) => {
      console.log(message, email);
      if (!message || !email) {
        throw new Error("Message and email are required");
      }

      if (message.length < 10) {
        throw new Error("Message must be at least 10 characters");
      }

      try {
        const response = await sendTestimonial(
          message,
          email,
          name,
          position,
          image
        );

        return response;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to send testimonial");
      }
    },
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
    queryFn: async () => {
      const { data, status, message } = await getTestimonials();

      if (status !== 200) {
        throw new Error(message);
      }

      return data;
    },
  });
}

export function useActionTestimonialMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      archived,
      publicValue,
    }: {
      id: string;
      archived?: boolean;
      publicValue?: boolean;
    }) => {
      const { status, message } = await actionTestimonial({
        id,
        archived,
        publicValue,
      });

      if (status !== 200) {
        throw new Error(message);
      }

      return { message };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
