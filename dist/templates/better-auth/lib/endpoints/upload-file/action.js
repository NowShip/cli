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
import axios from "axios";
export function uploadFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const options = {
            method: "POST",
            url: "https://api.uploadthing.com/v6/uploadFiles",
            headers: {
                "Content-Type": "application/json",
                "X-Uploadthing-Api-Key": process.env.UPLOADTHING_TOKEN,
            },
            data: {
                files: file,
                acl: "public-read",
                contentDisposition: "inline",
            },
        };
        try {
            const { data } = yield axios.request(options);
            return {
                data: data,
                message: "File uploaded successfully",
                status: 200,
            };
        }
        catch (error) {
            const err = error;
            console.log(err);
            return {
                data: "",
                message: ((_a = err.response) === null || _a === void 0 ? void 0 : _a.data.error) || "Failed to upload file",
                status: ((_b = err.response) === null || _b === void 0 ? void 0 : _b.status) || 500,
            };
        }
    });
}
