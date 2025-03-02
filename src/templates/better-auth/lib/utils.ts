import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { UAParser } from "ua-parser-js";

import { AllTypes } from "@/.contentlayer/generated";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseUserAgent = (userAgent: string) => {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();
  return {
    browser: `${result.browser.name} ${result.browser.version}`,
    os: `${result.os.name}`,
    device: result.device.type || "Desktop",
  };
};

export function getCookie(name: string) {
  if (typeof document === "undefined") {
    return null;
  }

  const value = `; ${document.cookie}`;
  const parts: any = value.split(`; ${name}=`);
  if (parts && parts.length === 2) return parts.pop().split(";").shift();
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
}

/**
 * Sort motions by slug
 * @param motions - The motions to sort
 * @returns The sorted motions
 */
const sortMotionName = ["ios-app-store-card", "checkbox-and-submit"];
export function sortMotionBySlug(motions: AllTypes[]) {
  return motions.sort((a, b) => {
    const aIndex = sortMotionName.indexOf(a.slugAsParams);
    const bIndex = sortMotionName.indexOf(b.slugAsParams);

    // If both items are not in sortMotionName, maintain original order
    if (aIndex === -1 && bIndex === -1) return 0;

    // If only one item is in sortMotionName, prioritize it
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    // Sort based on sortMotionName order
    return aIndex - bIndex;
  });
}
