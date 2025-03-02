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
import React from "react";
import { cn } from "@/lib/utils";
const Content = (_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (<div className={cn("relative mx-auto w-full max-w-4xl px-4", className)} {...props}>
      {children}
    </div>);
};
export default Content;
