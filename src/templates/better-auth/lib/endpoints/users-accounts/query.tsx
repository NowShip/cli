"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLocalStorage } from "@uidotdev/usehooks";
import type { APIError } from "better-auth";

import { authClient } from "@/lib/auth-client";
import { setPassword } from "./action";

export function useUpdateUserInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ image, name }: { image?: string; name?: string }) => {
      const { data, error } = await authClient.updateUser({
        image,
        name,
      });

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      toast.success("User info updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useGetListAccountsQuery() {
  return useQuery({
    queryKey: ["list-accounts"],
    queryFn: async () => {
      try {
        const { data, error } = await authClient.listAccounts();
        if (error) {
          throw new Error(error.message);
        }
        return data;
      } catch (error) {
        const err = error as APIError;
        throw new Error(err.message || "Failed to fetch accounts");
      }
    },
  });
}

export function useSetPasswordMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      password,
      confirmPassword,
    }: {
      password: string;
      confirmPassword: string;
    }) => {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      console.log("setting password", password);

      const { data, message, status } = await setPassword(password);

      if (status !== 200) {
        console.log(message);
        throw new Error(message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-accounts"] });
      toast.success("Password updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useChangePasswordMutation() {
  return useMutation({
    mutationFn: async ({
      currentPassword,
      newPassword,
      confirmPassword,
    }: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => {
      try {
        if (newPassword !== confirmPassword) {
          throw new Error("Passwords do not match");
        }

        if (currentPassword === newPassword) {
          throw new Error(
            "New password cannot be the same as the old password"
          );
        }

        const { data, error } = await authClient.changePassword({
          currentPassword,
          newPassword,
          revokeOtherSessions: true,
        });

        if (error) {
          throw new Error(error.message);
        }
        return data;
      } catch (error) {
        const err = error as ErrorResponse;
        throw new Error(err.message || "Failed to change password");
      }
    },
    onSuccess: () => {
      toast.success("Password updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useLinkAccountMutation() {
  const [selectedAccount, setSelectedAccount] =
    useLocalStorage<Provider | null>("selected-account", null);

  console.log(selectedAccount);

  return useMutation({
    mutationFn: async ({ provider }: { provider: Provider }) => {
      const { data, error } = await authClient.linkSocial({
        provider,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: (data, variables) => {
      setSelectedAccount(variables.provider);
      toast.success("Connecting to " + variables.provider);
    },
    onError: (error: APIError, variables) => {
      toast.error(
        error.message || "Failed to connect to " + variables.provider
      );
    },
  });
}

export function useUnlinkAccountMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (accountId: string) => {
      try {
        const { data, error } = await authClient.unlinkAccount({
          providerId: accountId,
        });

        if (error) {
          throw new Error(error.message);
        }

        return data;
      } catch (error) {
        const err = error as APIError;
        throw new Error(err.message || "Failed to unlink account");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-accounts"] });
      toast.success("Account unlinked");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteUserMutation() {
  return useMutation({
    mutationFn: async () => {
      try {
        const { data, error } = await authClient.deleteUser();

        console.log(data, error);
        if (error) {
          throw new Error(error.message);
        }

        return data;
      } catch (error) {
        const err = error as APIError;
        console.log(err);
        throw new Error(err.message || "Failed to delete user");
      }
    },
    onSuccess: async () => {
      toast.success("User deleted");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.reload();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
