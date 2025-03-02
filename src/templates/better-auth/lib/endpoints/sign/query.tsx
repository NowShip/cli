"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

import { authClient, signIn, signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { APIError } from "better-auth";

export function useSignOutMutation() {
  return useMutation({
    mutationFn: async () => {
      try {
        const { data, error } = await signOut();

        if (error) {
          throw new Error(error.message);
        }

        return data;
      } catch (error) {
        const err = error as APIError;
        throw new Error(err.message || "Failed to sign out");
      }
    },
    onSuccess: async () => {
      window.location.href = "/";
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export function useUserSignInWithGitHubMutation() {
  const pathname = usePathname();

  return useMutation({
    mutationFn: async () => {
      try {
        const { data, error } = await signIn.social({
          provider: "github",
          callbackURL: pathname,
        });

        if (error) {
          throw new Error(error.message);
        }

        return data;
      } catch (error) {
        const err = error as APIError;
        throw new Error(err.message || "Failed to sign out");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useUserSignInWithEmailMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      try {
        console.log(email, password);
        const { data, error } = await signIn.email({
          email,
          password,
        });

        if (error) {
          throw new Error(error.message);
        }

        return data;
      } catch (error) {
        const err = error as APIError;
        throw new Error(err.message || "Failed to sign in");
      }
    },
    onSuccess: () => {
      router.push("/");
      queryClient.invalidateQueries({ queryKey: ["session"] });
      queryClient.invalidateQueries({ queryKey: ["active-sessions"] });
    },
    onError: (error: APIError) => {
      console.log(error.message);
    },
  });
}

export function useResendVerificationEmailMutation() {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      try {
        if (!email) {
          throw new Error("Email is required");
        }

        const { data, error } = await authClient.sendVerificationEmail({
          email,
        });

        if (error) {
          throw new Error(error.message);
        }

        return data;
      } catch (error) {
        const err = error as APIError;
        throw new Error(err.message || "Failed to resend verification email");
      }
    },
    onSuccess: () => {
      toast.success("Verification email sent");
    },
    onError: (error: APIError) => {
      toast.error(error.message);
    },
  });
}
