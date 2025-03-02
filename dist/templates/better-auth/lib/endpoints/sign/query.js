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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { authClient, signIn, signOut } from "@/lib/auth-client";
import { toast } from "sonner";
export function useSignOutMutation() {
    return useMutation({
        mutationFn: () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield signOut();
                if (error) {
                    throw new Error(error.message);
                }
                return data;
            }
            catch (error) {
                const err = error;
                throw new Error(err.message || "Failed to sign out");
            }
        }),
        onSuccess: () => __awaiter(this, void 0, void 0, function* () {
            window.location.href = "/";
        }),
        onError: (error) => {
            console.error(error);
        },
    });
}
export function useUserSignInWithGitHubMutation() {
    const pathname = usePathname();
    return useMutation({
        mutationFn: () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield signIn.social({
                    provider: "github",
                    callbackURL: pathname,
                });
                if (error) {
                    throw new Error(error.message);
                }
                return data;
            }
            catch (error) {
                const err = error;
                throw new Error(err.message || "Failed to sign out");
            }
        }),
        onError: (error) => {
            toast.error(error.message);
        },
    });
}
export function useUserSignInWithEmailMutation() {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (_a) => __awaiter(this, [_a], void 0, function* ({ email, password, }) {
            try {
                console.log(email, password);
                const { data, error } = yield signIn.email({
                    email,
                    password,
                });
                if (error) {
                    throw new Error(error.message);
                }
                return data;
            }
            catch (error) {
                const err = error;
                throw new Error(err.message || "Failed to sign in");
            }
        }),
        onSuccess: () => {
            router.push("/");
            queryClient.invalidateQueries({ queryKey: ["session"] });
            queryClient.invalidateQueries({ queryKey: ["active-sessions"] });
        },
        onError: (error) => {
            console.log(error.message);
        },
    });
}
export function useResendVerificationEmailMutation() {
    return useMutation({
        mutationFn: (_a) => __awaiter(this, [_a], void 0, function* ({ email }) {
            try {
                if (!email) {
                    throw new Error("Email is required");
                }
                const { data, error } = yield authClient.sendVerificationEmail({
                    email,
                });
                if (error) {
                    throw new Error(error.message);
                }
                return data;
            }
            catch (error) {
                const err = error;
                throw new Error(err.message || "Failed to resend verification email");
            }
        }),
        onSuccess: () => {
            toast.success("Verification email sent");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}
