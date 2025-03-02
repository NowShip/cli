import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { APIError } from "better-auth";

import { authClient } from "@/lib/auth-client";

export function useGetSessionQuery() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      try {
        const { data, error } = await authClient.getSession();

        if (error) {
          throw new Error(error.message);
        }

        return data;
      } catch (error) {
        const err = error as APIError;
        throw new Error(err.message || "Failed to fetch sessions");
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: "always",
  });
}

export function useGetActiveSessionsQuery() {
  return useQuery({
    queryKey: ["active-sessions"],
    queryFn: async () => {
      const { data, error } = await authClient.listSessions();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: "always",
  });
}

export function useRevokeSessionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (token: string) => {
      const { data, error } = await authClient.revokeSession({ token });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["active-sessions"] });
      queryClient.invalidateQueries({ queryKey: ["session"] });
      toast.success("Session revoked successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useRevokeAllSessionsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await authClient.revokeOtherSessions();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      toast.success("All sessions revoked successfully");
      queryClient.invalidateQueries({ queryKey: ["active-sessions"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
