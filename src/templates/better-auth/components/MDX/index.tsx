import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

export function UITitle({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <div>
      <p className="text-dark/70 text-xs">[{title}]</p>
      <Separator className="mt-2 mb-1" />
      <div className={cn("", className)}>{children}</div>
    </div>
  );
}
