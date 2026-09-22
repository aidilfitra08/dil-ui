import { useContext, useEffect, useId, useState } from "react";

import { Button } from "../../actions/Button";
import { cn } from "../../../lib/utils";
import { ThemeContext } from "../../../theme/provider/ThemeContext";
import type { NeoNavbarProps } from "./NeoNavbar.types";

export function NeoNavbar({
  brand,
  items,
  actions,
  mobileActions,
  menuLabel = "Open navigation menu",
  menuOpen: controlledMenuOpen,
  onMenuOpenChange,
  className,
}: NeoNavbarProps) {
  const themeContext = useContext(ThemeContext);
  console.log("themeContext", themeContext);
  const isRetroTerminal = themeContext?.theme.name === "retroterminal";
  const menuId = useId();
  const [uncontrolledMenuOpen, setUncontrolledMenuOpen] = useState(false);
  const menuOpen = controlledMenuOpen ?? uncontrolledMenuOpen;
  const setMenuOpen = (open: boolean) => {
    setUncontrolledMenuOpen(open);
    onMenuOpenChange?.(open);
  };

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const renderItem = (
    item: NeoNavbarProps["items"][number],
    closeMenu?: () => void,
  ) => {
    const content = (
      <>
        {item.icon ? <span aria-hidden="true">{item.icon}</span> : null}
        <span>{item.label}</span>
      </>
    );
    const itemClassName = cn(
      "inline-flex min-h-11 items-center gap-2 border-2 border-transparent px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] transition-transform hover:-translate-y-px active:translate-x-px active:translate-y-px",
      item.active &&
        "border-(--dil-color-border) bg-(--dil-color-primary) text-(--dil-color-ink) shadow-(--dil-shadow-sm)",
      !item.active && "text-(--dil-color-muted) hover:text-(--dil-color-text)",
    );
    console.log("isRetroTerminal", isRetroTerminal);
    if (isRetroTerminal) {
      return item.href ? (
        <Button
          key={item.label}
          as="a"
          href={item.href}
          variant="terminal"
          size="sm"
          aria-current={item.active ? "page" : undefined}
          onClick={closeMenu}
        >
          {item.label}
        </Button>
      ) : (
        <Button
          key={item.label}
          variant="terminal"
          size="sm"
          onClick={() => {
            item.onClick?.();
            closeMenu?.();
          }}
        >
          {item.label}
        </Button>
      );
    }

    return item.href ? (
      <a
        key={item.label}
        href={item.href}
        className={itemClassName}
        aria-current={item.active ? "page" : undefined}
        onClick={closeMenu}
      >
        {content}
      </a>
    ) : (
      <button
        key={item.label}
        type="button"
        className={itemClassName}
        onClick={() => {
          item.onClick?.();
          closeMenu?.();
        }}
      >
        {content}
      </button>
    );
  };

  return (
    <nav
      aria-label="Primary navigation"
      className={cn(
        "flex min-h-16 w-full flex-col items-stretch gap-3 border-b-[3px] border-(--dil-color-border) bg-(--dil-color-surface) px-(--dil-spacing-md) py-(--dil-spacing-sm) shadow-[0_4px_0_var(--dil-color-border)] sm:flex-row sm:flex-wrap sm:items-center sm:gap-4",
        className,
      )}
    >
      <div className="flex min-w-0 items-center justify-between gap-3 sm:mr-auto">
        {brand ? <div className="min-w-0 truncate">{brand}</div> : null}

        <button
          type="button"
          aria-label={menuLabel}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          className="inline-flex size-11 shrink-0 items-center justify-center border-2 border-(--dil-color-border) text-lg font-black leading-none shadow-(--dil-shadow-sm) sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>
      <div className="hidden flex-wrap items-center gap-2 sm:flex">
        {items.map((item) => renderItem(item))}
      </div>
      {actions ? (
        <div className="hidden flex-wrap items-center gap-2 sm:flex sm:w-auto">
          {actions}
        </div>
      ) : null}
      <div
        id={menuId}
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-[min(20rem,88vw)] flex-col border-l-[3px] border-(--dil-color-border) bg-(--dil-color-surface) p-(--dil-spacing-md) shadow-[-4px_0_0_var(--dil-color-border)] transition-transform duration-200 sm:hidden",
          menuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="mb-6 flex items-center justify-between border-b-2 border-(--dil-color-border) pb-4">
          <span className="text-xs font-black uppercase tracking-widest">
            Menu
          </span>
          <button
            type="button"
            className="text-2xl font-black"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          {items.map((item) => renderItem(item, () => setMenuOpen(false)))}
        </nav>
        {(mobileActions ?? actions) ? (
          <div className="mt-6 flex flex-col gap-3 border-t-2 border-(--dil-color-border) pt-4">
            <span className="text-xs font-black uppercase tracking-widest">
              Actions
            </span>
            <div className="flex flex-col gap-2">
              {mobileActions ?? actions}
            </div>
          </div>
        ) : null}
      </div>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity sm:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMenuOpen(false)}
      />
    </nav>
  );
}
