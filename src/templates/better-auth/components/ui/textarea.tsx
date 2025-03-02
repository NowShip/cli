"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import TextareaAutosize, {
  type TextareaAutosizeProps,
} from "react-textarea-autosize";

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextareaAutosize
        className={cn(
          "border-input bg-light text-dark placeholder:text-muted-foreground/70 focus-visible:ring-dark/10 dark:focus-visible:ring-dark/20 flex h-9 w-full rounded-lg border px-3 py-2 text-sm transition-shadow focus-visible:ring-[3px] focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        minRows={4}
        maxRows={10}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
