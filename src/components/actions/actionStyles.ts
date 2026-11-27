export const actionInteractionClasses = [
  "transition-[transform,box-shadow,background-color,opacity] duration-150",
  "motion-safe:hover:-translate-y-px motion-safe:active:translate-y-px motion-reduce:transition-none",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--dil-color-text,currentColor)]",
  "disabled:pointer-events-none disabled:outline-dashed disabled:outline-1 disabled:outline-offset-1 disabled:outline-[color:var(--dil-color-text,currentColor)] disabled:shadow-none",
].join(" ");
