import { cn } from "../../../lib/utils";
import type { NeoSidebarItem, NeoSidebarProps } from "./NeoSidebar.types";

function SidebarLink({
  item,
  onClose,
}: {
  item: NeoSidebarItem;
  onClose?: () => void;
}) {
  const content = (
    <>
      {item.icon ? <span aria-hidden="true">{item.icon}</span> : null}
      <span>{item.label}</span>
    </>
  );
  const className = cn(
    "flex min-h-11 w-full items-center gap-3 border-2 border-transparent px-3 py-2 text-left text-xs font-bold uppercase tracking-[0.08em] transition-transform hover:-translate-y-px active:translate-x-px active:translate-y-px",
    item.active
      ? "border-(--dil-color-border) bg-(--dil-color-primary) text-(--dil-color-ink) shadow-(--dil-shadow-sm)"
      : "text-(--dil-color-muted) hover:text-(--dil-color-text)",
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        className={className}
        aria-current={item.active ? "page" : undefined}
        onClick={onClose}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={item.onClick ?? onClose}
    >
      {content}
    </button>
  );
}

export function NeoSidebar({
  brand,
  items,
  bottomItems = [],
  footer,
  open = false,
  onClose,
  className,
}: NeoSidebarProps) {
  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        aria-label="Sidebar navigation"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[min(18rem,85vw)] flex-col border-r-[3px] border-(--dil-color-border) bg-(--dil-color-surface) p-(--dil-spacing-md) shadow-[4px_0_0_var(--dil-color-border)] transition-transform duration-200 md:sticky md:top-0 md:z-auto md:h-screen md:w-64 md:translate-x-0 md:shadow-none",
          open ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="mb-6 flex items-center justify-between gap-3">
          {brand ? <div className="min-w-0">{brand}</div> : null}
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center border-2 border-(--dil-color-border) text-lg font-black shadow-(--dil-shadow-sm) md:hidden"
            aria-label="Close navigation"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-2">
          {items.map((item) => (
            <SidebarLink key={item.label} item={item} onClose={onClose} />
          ))}
        </nav>
        {bottomItems.length > 0 ? (
          <nav className="mt-auto flex flex-col gap-2 border-t-2 border-(--dil-color-border) pt-4">
            {bottomItems.map((item) => (
              <SidebarLink key={item.label} item={item} onClose={onClose} />
            ))}
          </nav>
        ) : null}
        {footer ? (
          <div className="mt-6 border-t-2 border-(--dil-color-border) pt-4">
            {footer}
          </div>
        ) : null}
      </aside>
    </>
  );
}
