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
import { notFound } from "next/navigation";
import { Mdx } from "@/components/MDX/mdx-contents";
export default function MotionPage(_a) {
    return __awaiter(this, arguments, void 0, function* ({ params }) {
        const { slug } = yield params;
        const findingMotion = allDocuments.find((motion) => `/${slug.join("/")}` === motion.slug);
        if (!findingMotion) {
            notFound();
        }
        return (<div className="w-full">
      <Mdx code={findingMotion.body.code}/>
    </div>);
    });
}
