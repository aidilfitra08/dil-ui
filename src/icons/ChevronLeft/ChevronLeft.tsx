import { cn } from "../../lib/utils";

export function ChevronLeft({
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
      <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
    </svg>
  );
}
