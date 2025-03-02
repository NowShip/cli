var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from "react";
import { allDocuments } from "contentlayer/generated";
import Content from "@/components/ui/content";
export function generateStaticParams() {
    return __awaiter(this, void 0, void 0, function* () {
        return allDocuments.map((motion) => ({
            motion: motion.slug.split("/").slice(1),
        }));
    });
}
export default function MotionLayout({ children }) {
    return <Content>{children}</Content>;
}
