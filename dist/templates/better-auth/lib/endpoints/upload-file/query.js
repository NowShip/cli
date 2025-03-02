var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadFile } from "./action";
export function useUploadFileQuery() {
    return useMutation({
        mutationFn: (file) => __awaiter(this, void 0, void 0, function* () {
            console.log(file);
            const { data, status } = yield uploadFile(file);
            console.log({ data });
            if (status !== 200) {
                throw new Error(data);
            }
            return data;
        }),
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
            toast.error(error.message);
        },
    });
}
