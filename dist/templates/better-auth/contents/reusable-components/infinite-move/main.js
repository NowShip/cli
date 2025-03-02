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
const InfiniteMove = React.forwardRef((_a, ref) => {
    var { children, mask = "md", duration = 10, direction = "no-reverse", whenHover, gap = 16, duplicate = 4, orientation = "horizontal", className, wrapperClassName } = _a, props = __rest(_a, ["children", "mask", "duration", "direction", "whenHover", "gap", "duplicate", "orientation", "className", "wrapperClassName"]);
    const [pause, setPause] = React.useState(false);
    const maskPercentage = {
        none: 0,
        xs: 10,
        sm: 20,
        md: 30,
        lg: 40,
        xl: 50,
    };
    return (<div className={cn("relative overflow-hidden", orientation === "vertical" && "max-h-96", wrapperClassName)} style={{
            maskImage: orientation === "vertical"
                ? `linear-gradient(to bottom, transparent, white ${maskPercentage[mask]}%, white ${100 - maskPercentage[mask]}%, transparent)`
                : `linear-gradient(to right, transparent, white ${maskPercentage[mask]}%, white ${100 - maskPercentage[mask]}%, transparent)`,
        }} onMouseEnter={() => {
            if (whenHover === "pause")
                setPause(true);
        }} onMouseLeave={() => {
            setPause(false);
        }}>
        <div ref={ref} className={cn("animate-scroll relative flex w-fit px-0", orientation === "vertical" && "h-fit w-full flex-col items-center", className)} style={{
            gap,
            animationDirection: direction === "no-reverse" ? "forwards" : "reverse",
            "--gap-x-half": orientation === "vertical"
                ? `0px`
                : `calc(-50% - ${gap ? gap / 2 : 0}px)`,
            "--gap-y-half": orientation === "vertical"
                ? `calc(-50% - ${gap ? gap / 2 : 0}px)`
                : `0px`,
            animationPlayState: pause ? "paused" : "running",
            animationDuration: `${duration}s`,
        }} {...props}>
          {Array.from({ length: duplicate }).map((_, index) => (<React.Fragment key={index}>{children}</React.Fragment>))}
        </div>
      </div>);
});
InfiniteMove.displayName = "InfiniteMove";
const InfiniteMoveItem = React.forwardRef((_a, ref) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (<div ref={ref} className={cn("w-48 shrink-0 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800", className)} {...props}>
      {children}
    </div>);
});
InfiniteMoveItem.displayName = "InfiniteMoveItem";
export { InfiniteMove, InfiniteMoveItem };
