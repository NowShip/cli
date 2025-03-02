import React from "react";

import { allDocuments } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/MDX/mdx-contents";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function MotionPage({ params }: Props) {
  const { slug } = await params;

  const findingMotion = allDocuments.find(
    (motion) => `/${slug.join("/")}` === motion.slug
  );

  if (!findingMotion) {
    notFound();
  }

  return (
    <div className="w-full">
      <Mdx code={findingMotion.body.code} />
    </div>
  );
}
