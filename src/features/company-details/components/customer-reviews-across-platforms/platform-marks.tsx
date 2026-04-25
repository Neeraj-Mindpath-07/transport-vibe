import type { SVGProps } from "react";

type MarkProps = SVGProps<SVGSVGElement> & { title?: string };

/**
 * Google logotype — multicolor wordmark (brand colors).
 */
export function GooglePlatformMark({ title = "Google", ...props }: MarkProps) {
  return (
    <svg viewBox="0 0 86 22" width={86} height={22} role="img" aria-label={title} {...props}>
      <title>{title}</title>
      <text
        x="0"
        y="17"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="17"
        fontWeight="500"
      >
        <tspan fill="#4285F4">G</tspan>
        <tspan fill="#EA4335">o</tspan>
        <tspan fill="#FBBC04">o</tspan>
        <tspan fill="#4285F4">g</tspan>
        <tspan fill="#34A853">l</tspan>
        <tspan fill="#EA4335">e</tspan>
      </text>
    </svg>
  );
}

