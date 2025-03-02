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
import { motion } from "motion/react";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
export function TabLayout({ children }) {
    return (<div className="bg-background h-full grow rounded-t-xl border border-r-0 px-8 py-6 md:rounded-l-md">
      {children}
    </div>);
}
export function TabTitle({ children }) {
    return <h2 className="text-[17px] font-bold">{children}</h2>;
}
export function SectionWrapper({ children, className, }) {
    const [ref, { height }] = useMeasure();
    return (<motion.div animate={{ height: height > 0 ? height : undefined }} transition={{ duration: 0.2 }}>
      <div ref={ref} className={cn("flex flex-col items-start justify-between gap-3 md:gap-0 lg:flex-row", className)}>
        {children}
      </div>
    </motion.div>);
}
export function SectionTitle({ children }) {
    return <h2 className="w-64 shrink-0 text-[13px] font-medium">{children}</h2>;
}
export function SectionContent(_a) {
    var { children, className, isLoading, quantity } = _a, props = __rest(_a, ["children", "className", "isLoading", "quantity"]);
    return (<motion.div className={cn("flex w-full grow items-center justify-between", className)} {...props}>
      {isLoading
            ? Array.from({ length: quantity || 1 }).map((_, index) => (<Skeleton key={index} className="h-[22px] w-full"/>))
            : children}
    </motion.div>);
}
export const ContentAnimation = {
    initial: { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1, transition: { delay: 0.1 } },
    exit: { opacity: 0, scale: 0.97 },
};
