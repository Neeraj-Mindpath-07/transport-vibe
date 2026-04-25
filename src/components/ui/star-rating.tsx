import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

type StarRatingDisplayProps = {
  rating: number;
  max?: number;
  iconSizeClassName?: string;
  className?: string;
};

export function StarRatingDisplay({
  rating,
  max = 5,
  iconSizeClassName = "size-4",
  className,
}: StarRatingDisplayProps) {
  const clamped = Math.min(max, Math.max(0, Math.round(rating)));

  return (
    <div
      className={cn("flex items-center gap-0.5 text-alert", className)}
      role="img"
      aria-label={`${clamped} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, index) => (
        <Star
          key={index}
          className={cn(iconSizeClassName, "shrink-0")}
          fill={index < clamped ? "currentColor" : "transparent"}
          aria-hidden
        />
      ))}
    </div>
  );
}
