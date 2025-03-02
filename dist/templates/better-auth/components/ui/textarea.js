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
import { cn } from "@/lib/utils";
import TextareaAutosize from "react-textarea-autosize";
const Textarea = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<TextareaAutosize className={cn("border-input bg-light text-dark placeholder:text-muted-foreground/70 focus-visible:ring-dark/10 dark:focus-visible:ring-dark/20 flex h-9 w-full rounded-lg border px-3 py-2 text-sm transition-shadow focus-visible:ring-[3px] focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50", className)} minRows={4} maxRows={10} ref={ref} {...props}/>);
});
Textarea.displayName = "Textarea";
export { Textarea };
