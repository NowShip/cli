"use client";
import { authClient } from "@/lib/auth-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export function useAdminUsersQuery() {
    return useQuery({
        queryKey: ["admin-users"],
        queryFn: () => authClient.admin.listUsers({
            query: {
                limit: 10,
            },
        }),
    });
}
export function useBanUserMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, bannedReason, banExpiration, }) => authClient.admin.banUser({
            userId,
            banReason: bannedReason,
            banExpiresIn: banExpiration,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
            toast.success("User banned successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}
export function useUnBanUserMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId }) => authClient.admin.unbanUser({
            userId,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
            toast.success("User unbanned successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}
export function useRemoveUserMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId }) => authClient.admin.removeUser({
            userId,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
            toast.success("User removed successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}
