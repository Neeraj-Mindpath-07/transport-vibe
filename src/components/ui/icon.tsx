import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type IconProps = {
  icon: LucideIcon;
  className?: string;
  "aria-hidden"?: boolean;
};

export function Icon({ icon: IconComponent, className, ...props }: IconProps) {
  return <IconComponent className={cn("size-4", className)} {...props} />;
}
