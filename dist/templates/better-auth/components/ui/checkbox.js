"use client";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
const Checkbox = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<CheckboxPrimitive.Root ref={ref} className={cn("peer ring-offset-background focus-visible:ring-ring data-[state=checked]:bg-contrast-higher data-[state=checked]:text-background size-4 shrink-0 rounded-sm border transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50", className)} {...props}>
    <CheckboxPrimitive.Indicator className={cn("text-light flex items-center justify-center")}>
      <Check className="h-3 w-3"/>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>);
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
export { Checkbox };
