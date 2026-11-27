import { useCallback, useContext, useEffect, useId, useRef, useState } from "react";

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
  const isRetroTerminal = themeContext?.theme.name === "retroterminal";
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [uncontrolledMenuOpen, setUncontrolledMenuOpen] = useState(false);
  const menuOpen = controlledMenuOpen ?? uncontrolledMenuOpen;
  const setMenuOpen = useCallback((open: boolean) => {
    setUncontrolledMenuOpen(open);
    onMenuOpenChange?.(open);
  }, [onMenuOpenChange]);

  const closeMenu = useCallback(() => {
    toggleRef.current?.focus({ preventScroll: true });
    setMenuOpen(false);
  }, [setMenuOpen]);

  useEffect(() => {
    if (menuOpen) closeButtonRef.current?.focus({ preventScroll: true });
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented) closeMenu();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen, closeMenu]);

  const renderItem = (
    item: NeoNavbarProps["items"][number],
    inDrawer = false,
  ) => {
    const handleClick = () => {
      item.onClick?.();
      if (inDrawer) closeMenu();
    };
    const current = item.active ? (item.href?.startsWith("#") ? "location" : "page") : undefined;
    const content = (
      <span className="inline-flex items-center gap-2">
        {item.icon ? <span aria-hidden="true">{item.icon}</span> : null}
        <span>{item.label}</span>
      </span>
    );
    const itemClassName = cn(
      "inline-flex min-h-11 items-center gap-2 border-2 border-transparent px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] transition-transform motion-safe:hover:-translate-y-px motion-safe:active:translate-x-px motion-safe:active:translate-y-px motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--dil-color-text)",
      item.active &&
        "border-(--dil-color-border) bg-(--dil-color-primary) text-(--dil-color-primary-foreground) shadow-(--dil-shadow-sm)",
      !item.active && "text-(--dil-color-muted) hover:text-(--dil-color-text)",
    );
    if (isRetroTerminal) {
      const retroClassName = cn(
        "min-h-11",
        item.active && "border-(--dil-color-border) font-bold",
      );
      return item.href ? (
        <Button
          key={item.label}
          as="a"
          href={item.href}
          variant="terminal"
          size="sm"
          className={retroClassName}
          aria-current={current}
          onClick={handleClick}
        >
          {content}
        </Button>
      ) : (
        <Button
          key={item.label}
          variant="terminal"
          size="sm"
          type="button"
          className={retroClassName}
          aria-current={current}
          onClick={handleClick}
        >
          {content}
        </Button>
      );
    }

    return item.href ? (
      <a
        key={item.label}
        href={item.href}
        className={itemClassName}
        aria-current={current}
        onClick={handleClick}
      >
        {content}
      </a>
    ) : (
      <button
        key={item.label}
        type="button"
        className={itemClassName}
        aria-current={current}
        onClick={handleClick}
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
          ref={toggleRef}
          aria-label={menuLabel}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          className="dil-navbar-toggle size-11 shrink-0 items-center justify-center border-2 border-(--dil-color-border) text-lg font-black leading-none shadow-(--dil-shadow-sm) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--dil-color-text)"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>
      <div className="dil-navbar-desktop flex-wrap items-center gap-2">
        {items.map((item) => renderItem(item))}
      </div>
      {actions ? (
        <div className="dil-navbar-desktop flex-wrap items-center gap-2 sm:w-auto">
          {actions}
        </div>
      ) : null}
      <div
        id={menuId}
        inert={!menuOpen}
        aria-hidden={!menuOpen}
        className={cn(
          "dil-navbar-drawer fixed right-0 top-0 z-50 h-dvh w-[min(20rem,88vw)] flex-col overflow-y-auto border-l-[3px] border-(--dil-color-border) bg-(--dil-color-surface) p-(--dil-spacing-md) shadow-[-4px_0_0_var(--dil-color-border)]",
          menuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="mb-6 flex items-center justify-between border-b-2 border-(--dil-color-border) pb-4">
          <span className="text-xs font-black uppercase tracking-widest">
            Menu
          </span>
          <button
            type="button"
            ref={closeButtonRef}
            className="inline-flex size-11 items-center justify-center text-2xl font-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--dil-color-text)"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          >
            ×
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {items.map((item) => renderItem(item, true))}
        </div>
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
        aria-hidden="true"
        className={cn(
          "dil-navbar-backdrop fixed inset-0 z-40 bg-black/40",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={closeMenu}
      />
    </nav>
  );
}
