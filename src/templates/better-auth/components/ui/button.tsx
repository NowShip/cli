import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Link from "next/link";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-contrast-higher text-background hover:bg-contrast-higher/90",
        primary:
          "bg-linear-to-t from-primary to-primary-dark shadow-sm text-black hover:opacity-90 inset-ring inset-ring-white/20 inset-shadow-[1px_1px_0px_hsl(0_0%_100%/.3)]",
        destructive: "bg-red text-white hover:bg-red/90",
        outline: "border bg-background hover:bg-contrast-lower/20",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "bg-contrast-lower/20 text-dark hover:bg-contrast-lower/10",
        link: "text-dark/70 hover:text-dark underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-7 px-2",
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, asChild = false, ...props }, ref) => {
    if (href) {
      const Comp = asChild ? Slot : Link;
      return (
        <Comp
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref as any}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      );
    }

    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
