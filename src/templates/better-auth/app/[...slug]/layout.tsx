import React from "react";
import { allDocuments } from "contentlayer/generated";
import Content from "@/components/ui/content";

export async function generateStaticParams() {
  return allDocuments.map((motion) => ({
    motion: motion.slug.split("/").slice(1),
  }));
}

type Props = {
  children: React.ReactNode;
};

export default function MotionLayout({ children }: Props) {
  return <Content>{children}</Content>;
}
