import { useParams, usePathname } from "next/navigation";

import { useGetAllOrdersQuery } from "@/lib/endpoints";
import CTA from "../cta";

type Props = {
  children: React.ReactNode;
};

export default function ProtectSection({ children }: Props) {
  let { slug } = useParams<{ slug: string[] }>();
  const pathname = usePathname();

  if (pathname === "/") {
    slug = ["motion", "ios-app-store-card"];
  }

  const { data: orders } = useGetAllOrdersQuery();

  let isProductBought = false;

  if (slug[0] === "animation") {
    isProductBought = orders?.isAnimation || false;
  } else if (slug[0] === "components") {
    isProductBought = orders?.isReusableComponent || false;
  }

  const isBought =
    orders?.isFullAccess ||
    isProductBought ||
    orders?.data.some((order) => order.productName === slug[1]);

  if (!isBought) {
    return <CTA />;
  }

  return <div>{children}</div>;
}
