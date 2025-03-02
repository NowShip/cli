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
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export function setPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const { status } = yield auth.api.setPassword({
            body: {
                newPassword: password,
            },
            headers: yield headers(),
        });
        if (!status) {
            return {
                data: "",
                message: "Failed to set password",
                status: 400,
            };
        }
        return {
            data: "Password set successfully",
            message: "Password set successfully",
            status: 200,
        };
    });
}
