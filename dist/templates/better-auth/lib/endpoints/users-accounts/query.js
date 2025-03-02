"use client";
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
import { useLocalStorage } from "@uidotdev/usehooks";
import { authClient } from "@/lib/auth-client";
import { setPassword } from "./action";
export function useUpdateUserInfo() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (_a) => __awaiter(this, [_a], void 0, function* ({ image, name }) {
            const { data, error } = yield authClient.updateUser({
                image,
                name,
            });
            if (error) {
                throw error;
            }
            return data;
        }),
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
        queryFn: () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield authClient.listAccounts();
                if (error) {
                    throw new Error(error.message);
                }
                return data;
            }
            catch (error) {
                const err = error;
                throw new Error(err.message || "Failed to fetch accounts");
            }
        }),
    });
}
export function useSetPasswordMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (_a) => __awaiter(this, [_a], void 0, function* ({ password, confirmPassword, }) {
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }
            console.log("setting password", password);
            const { data, message, status } = yield setPassword(password);
            if (status !== 200) {
                console.log(message);
                throw new Error(message);
            }
            return data;
        }),
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
        mutationFn: (_a) => __awaiter(this, [_a], void 0, function* ({ currentPassword, newPassword, confirmPassword, }) {
            try {
                if (newPassword !== confirmPassword) {
                    throw new Error("Passwords do not match");
                }
                if (currentPassword === newPassword) {
                    throw new Error("New password cannot be the same as the old password");
                }
                const { data, error } = yield authClient.changePassword({
                    currentPassword,
                    newPassword,
                    revokeOtherSessions: true,
                });
                if (error) {
                    throw new Error(error.message);
                }
                return data;
            }
            catch (error) {
                const err = error;
                throw new Error(err.message || "Failed to change password");
            }
        }),
        onSuccess: () => {
            toast.success("Password updated");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}
export function useLinkAccountMutation() {
    const [selectedAccount, setSelectedAccount] = useLocalStorage("selected-account", null);
    console.log(selectedAccount);
    return useMutation({
        mutationFn: (_a) => __awaiter(this, [_a], void 0, function* ({ provider }) {
            const { data, error } = yield authClient.linkSocial({
                provider,
            });
            if (error) {
                throw new Error(error.message);
            }
            return data;
        }),
        onSuccess: (data, variables) => {
            setSelectedAccount(variables.provider);
            toast.success("Connecting to " + variables.provider);
        },
        onError: (error, variables) => {
            toast.error(error.message || "Failed to connect to " + variables.provider);
        },
    });
}
export function useUnlinkAccountMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (accountId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield authClient.unlinkAccount({
                    providerId: accountId,
                });
                if (error) {
                    throw new Error(error.message);
                }
                return data;
            }
            catch (error) {
                const err = error;
                throw new Error(err.message || "Failed to unlink account");
            }
        }),
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
        mutationFn: () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield authClient.deleteUser();
                console.log(data, error);
                if (error) {
                    throw new Error(error.message);
                }
                return data;
            }
            catch (error) {
                const err = error;
                console.log(err);
                throw new Error(err.message || "Failed to delete user");
            }
        }),
        onSuccess: () => __awaiter(this, void 0, void 0, function* () {
            toast.success("User deleted");
            yield new Promise((resolve) => setTimeout(resolve, 1000));
            window.location.reload();
        }),
        onError: (error) => {
            toast.error(error.message);
        },
    });
}
