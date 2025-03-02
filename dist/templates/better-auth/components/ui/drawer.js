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
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import ClientOnly from "../client-only";
const Drawer = (_a) => {
    var { shouldScaleBackground = true } = _a, props = __rest(_a, ["shouldScaleBackground"]);
    return (<DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props}/>);
};
Drawer.displayName = "Drawer";
const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;
const DrawerOverlay = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<DrawerPrimitive.Overlay ref={ref} className={cn("fixed inset-0 z-50 bg-black/80", className)} {...props}/>);
});
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;
const DrawerContentPreview = React.forwardRef((_a, ref) => {
    var { className, children, isHandle } = _a, props = __rest(_a, ["className", "children", "isHandle"]);
    const mobile = useMediaQuery("(max-width: 768px)");
    if (!mobile) {
        return null;
    }
    return (<DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content ref={ref} className={cn("bg-light fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border", className)} {...props}>
        {isHandle && (<div className="bg-muted mx-auto mt-4 h-2 w-[100px] rounded-full"/>)}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>);
});
const DrawerContent = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    return (<ClientOnly>
      <DrawerContentPreview {...props}>{children}</DrawerContentPreview>
    </ClientOnly>);
};
DrawerContentPreview.displayName = "DrawerContentPreview";
const DrawerHeader = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props}/>);
};
DrawerHeader.displayName = "DrawerHeader";
const DrawerFooter = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props}/>);
};
DrawerFooter.displayName = "DrawerFooter";
const DrawerTitle = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<DrawerPrimitive.Title ref={ref} className={cn("text-lg leading-none font-semibold tracking-tight", className)} {...props}/>);
});
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;
const DrawerDescription = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<DrawerPrimitive.Description ref={ref} className={cn("text-muted-foreground text-sm", className)} {...props}/>);
});
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;
export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, };
