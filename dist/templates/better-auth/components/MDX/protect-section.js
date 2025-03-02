import { useParams, usePathname } from "next/navigation";
import { useGetAllOrdersQuery } from "@/lib/endpoints";
import CTA from "../cta";
export default function ProtectSection({ children }) {
    let { slug } = useParams();
    const pathname = usePathname();
    if (pathname === "/") {
        slug = ["motion", "ios-app-store-card"];
    }
    const { data: orders } = useGetAllOrdersQuery();
    let isProductBought = false;
    if (slug[0] === "animation") {
        isProductBought = (orders === null || orders === void 0 ? void 0 : orders.isAnimation) || false;
    }
    else if (slug[0] === "components") {
        isProductBought = (orders === null || orders === void 0 ? void 0 : orders.isReusableComponent) || false;
    }
    const isBought = (orders === null || orders === void 0 ? void 0 : orders.isFullAccess) ||
        isProductBought ||
        (orders === null || orders === void 0 ? void 0 : orders.data.some((order) => order.productName === slug[1]));
    if (!isBought) {
        return <CTA />;
    }
    return <div>{children}</div>;
}
