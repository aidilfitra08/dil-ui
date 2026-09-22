import { cn } from "../../lib/utils";

export function ChevronDown({
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
      <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
    </svg>
  );
}
