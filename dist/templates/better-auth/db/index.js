var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { getProduct, listPrices, listProducts, } from "@lemonsqueezy/lemonsqueezy.js";
import { plans } from "./schema";
import { configureLemonSqueezy } from "@/config/lemonsqueezy";
export const db = drizzle(process.env.DATABASE_URL);
function storePlans() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        configureLemonSqueezy();
        const products = yield listProducts({
            filter: { storeId: process.env.LEMONSQUEEZY_STORE_ID },
            include: ["variants"],
        });
        // Loop through all the variants.
        const allVariants = (_a = products.data) === null || _a === void 0 ? void 0 : _a.included;
        if (allVariants) {
            for (const v of allVariants) {
                const variant = v.attributes;
                // Skip draft variants or if there's more than one variant, skip the default
                // variant. See https://docs.lemonsqueezy.com/api/variants
                if (variant.status === "draft" ||
                    (allVariants.length !== 1 && variant.status === "pending")) {
                    // `return` exits the function entirely, not just the current iteration.
                    continue;
                }
                console.log("variant", variant);
                // Fetch the Product name.
                const productName = (_c = (_b = (yield getProduct(variant.product_id)).data) === null || _b === void 0 ? void 0 : _b.data.attributes.name) !== null && _c !== void 0 ? _c : "";
                // Fetch the Price object.
                const variantPriceObject = yield listPrices({
                    filter: {
                        variantId: v.id,
                    },
                });
                const currentPriceObj = (_d = variantPriceObject.data) === null || _d === void 0 ? void 0 : _d.data.at(0);
                const isUsageBased = (currentPriceObj === null || currentPriceObj === void 0 ? void 0 : currentPriceObj.attributes.usage_aggregation) !== null;
                const interval = currentPriceObj === null || currentPriceObj === void 0 ? void 0 : currentPriceObj.attributes.renewal_interval_unit;
                const intervalCount = currentPriceObj === null || currentPriceObj === void 0 ? void 0 : currentPriceObj.attributes.renewal_interval_quantity;
                const trialInterval = currentPriceObj === null || currentPriceObj === void 0 ? void 0 : currentPriceObj.attributes.trial_interval_unit;
                const trialIntervalCount = currentPriceObj === null || currentPriceObj === void 0 ? void 0 : currentPriceObj.attributes.trial_interval_quantity;
                const price = isUsageBased
                    ? currentPriceObj === null || currentPriceObj === void 0 ? void 0 : currentPriceObj.attributes.unit_price_decimal
                    : currentPriceObj.attributes.unit_price;
                const priceString = price !== null ? ((_e = price === null || price === void 0 ? void 0 : price.toString()) !== null && _e !== void 0 ? _e : "") : "";
                yield db
                    .insert(plans)
                    .values({
                    name: variant.name,
                    description: variant.description,
                    price: Number(priceString),
                    interval,
                    intervalCount,
                    isUsageBased,
                    productId: variant.product_id,
                    productName,
                    variantId: parseInt(v.id),
                    trialInterval,
                    trialIntervalCount,
                    sort: variant.sort,
                })
                    .onConflictDoUpdate({
                    target: plans.variantId,
                    set: {
                        name: variant.name,
                        description: variant.description,
                        price: Number(priceString),
                        interval,
                        intervalCount,
                        isUsageBased,
                        productId: variant.product_id,
                        productName,
                        trialInterval,
                        trialIntervalCount,
                        sort: variant.sort,
                    },
                });
            }
        }
        console.log("New plan created!");
    });
}
// storePlans();
