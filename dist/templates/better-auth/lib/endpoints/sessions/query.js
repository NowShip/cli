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
import { authClient } from "@/lib/auth-client";
export function useGetSessionQuery() {
    return useQuery({
        queryKey: ["session"],
        queryFn: () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield authClient.getSession();
                if (error) {
                    throw new Error(error.message);
                }
                return data;
            }
            catch (error) {
                const err = error;
                throw new Error(err.message || "Failed to fetch sessions");
            }
        }),
        staleTime: 1000 * 60 * 60, // 1 hour
        refetchOnWindowFocus: "always",
    });
}
export function useGetActiveSessionsQuery() {
    return useQuery({
        queryKey: ["active-sessions"],
        queryFn: () => __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield authClient.listSessions();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        }),
        staleTime: 1000 * 60 * 60, // 1 hour
        refetchOnWindowFocus: "always",
    });
}
export function useRevokeSessionMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (token) => __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield authClient.revokeSession({ token });
            if (error) {
                throw new Error(error.message);
            }
            return data;
        }),
        onSuccess: () => __awaiter(this, void 0, void 0, function* () {
            queryClient.invalidateQueries({ queryKey: ["active-sessions"] });
            queryClient.invalidateQueries({ queryKey: ["session"] });
            toast.success("Session revoked successfully");
        }),
        onError: (error) => {
            toast.error(error.message);
        },
    });
}
export function useRevokeAllSessionsMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield authClient.revokeOtherSessions();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        }),
        onSuccess: () => {
            toast.success("All sessions revoked successfully");
            queryClient.invalidateQueries({ queryKey: ["active-sessions"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}
