"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface InfiniteMoveProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  mask?: "none" | "xs" | "sm" | "md" | "lg" | "xl"; // Default is md
  gap?: number; // Default is 16
  duration?: number; // Default is 10
  direction?: "no-reverse" | "reverse"; // Default is no-reverse
  whenHover?: "pause"; // Default is undefined
  duplicate?: number; // Default is 4
  orientation?: "horizontal" | "vertical"; // Default is horizontal
  wrapperClassName?: string;
}

const InfiniteMove = React.forwardRef<HTMLDivElement, InfiniteMoveProps>(
  (
    {
      children,
      mask = "md",
      duration = 10,
      direction = "no-reverse",
      whenHover,
      gap = 16,
      duplicate = 4,
      orientation = "horizontal",
      className,
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    const [pause, setPause] = React.useState(false);

    const maskPercentage = {
      none: 0,
      xs: 10,
      sm: 20,
      md: 30,
      lg: 40,
      xl: 50,
    };

    return (
      <div
        className={cn(
          "relative overflow-hidden",
          orientation === "vertical" && "max-h-96",
          wrapperClassName
        )}
        style={{
          maskImage:
            orientation === "vertical"
              ? `linear-gradient(to bottom, transparent, white ${maskPercentage[mask]}%, white ${100 - maskPercentage[mask]}%, transparent)`
              : `linear-gradient(to right, transparent, white ${maskPercentage[mask]}%, white ${100 - maskPercentage[mask]}%, transparent)`,
        }}
        onMouseEnter={() => {
          if (whenHover === "pause") setPause(true);
        }}
        onMouseLeave={() => {
          setPause(false);
        }}
      >
        <div
          ref={ref}
          className={cn(
            "animate-scroll relative flex w-fit px-0",
            orientation === "vertical" && "h-fit w-full flex-col items-center",
            className
          )}
          style={
            {
              gap,
              animationDirection:
                direction === "no-reverse" ? "forwards" : "reverse",
              "--gap-x-half":
                orientation === "vertical"
                  ? `0px`
                  : `calc(-50% - ${gap ? gap / 2 : 0}px)`,
              "--gap-y-half":
                orientation === "vertical"
                  ? `calc(-50% - ${gap ? gap / 2 : 0}px)`
                  : `0px`,
              animationPlayState: pause ? "paused" : "running",
              animationDuration: `${duration}s`,
            } as React.CSSProperties
          }
          {...props}
        >
          {Array.from({ length: duplicate }).map((_, index) => (
            <React.Fragment key={index}>{children}</React.Fragment>
          ))}
        </div>
      </div>
    );
  }
);

InfiniteMove.displayName = "InfiniteMove";

interface InfiniteMoveItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const InfiniteMoveItem = React.forwardRef<
  HTMLDivElement,
  InfiniteMoveItemProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "w-48 shrink-0 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

InfiniteMoveItem.displayName = "InfiniteMoveItem";

export { InfiniteMove, InfiniteMoveItem };
