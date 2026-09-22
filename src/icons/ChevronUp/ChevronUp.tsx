import { cn } from "../../lib/utils";

export function ChevronUp({
  size = 20,
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      viewBox="0 -960 960 960"
      width={size}
      height={size}
      //   fill="currentColor"
      className={cn("fill-(--dil-color-text)", className)}
      {...props}
    >
      <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
    </svg>
  );
}
