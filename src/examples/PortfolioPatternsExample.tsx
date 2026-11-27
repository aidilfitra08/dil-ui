"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { Terminal, type TerminalLine } from "../components/effects/Terminal";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../components/overlay/Dialog";
import { NeoNavbar } from "../components/ui/NeoNavbar";
import { ThemeProvider, type ThemeName } from "../theme";

const sectionOffset = 100;
const sections = [
  { id: "about-me", label: "About" },
  { id: "skill", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact-me", label: "Contact" },
];

const initialLines: TerminalLine[] = [
  { type: "system", text: "Type 'help' for commands. Use ↑ and ↓ to recall history." },
];

function TerminalExample() {
  const [lines, setLines] = useState(initialLines);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [cvOpen, setCvOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const draft = useRef("");

  function submit(value: string) {
    const text = value.trim();
    if (!text) return;

    setHistory((previous) => [...previous, text]);
    setHistoryIndex(null);
    setCommand("");
    draft.current = "";

    if (text === "clear") {
      setLines([]);
      return;
    }

    const outputs: Record<string, TerminalLine["text"]> = {
      help: "  help    Show commands\n  status  Show status\n  cv      Open CV preview\n  clear   Clear terminal",
      status: <strong>Ready to collaborate.</strong>,
      cv: "Opening CV preview…",
    };
    setLines((previous) => [
      ...previous,
      { type: "command", text },
      { type: "output", text: Object.hasOwn(outputs, text) ? outputs[text] : "Unknown command. Try 'help'." },
    ]);

    if (text === "cv") setCvOpen(true);
  }

  function recall(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    if (!history.length) return;
    event.preventDefault();

    if (event.key === "ArrowUp") {
      if (historyIndex === null) draft.current = command;
      const next = Math.max(0, (historyIndex ?? history.length) - 1);
      setHistoryIndex(next);
      setCommand(history[next]);
    } else if (historyIndex !== null) {
      const next = historyIndex + 1;
      setHistoryIndex(next < history.length ? next : null);
      setCommand(history[next] ?? draft.current);
    }
  }

  return (
    <Dialog open={cvOpen} onOpenChange={(open) => {
      setCvOpen(open);
      if (!open) inputRef.current?.focus();
    }}>
      <Terminal
        terminalTitle="portfolio@preview"
        lines={lines}
        maxHeight={160}
        followOutput
        command={command}
        onCommandChange={setCommand}
        onCommandSubmit={submit}
        inputProps={{ ref: inputRef, onKeyDown: recall, "aria-label": "Portfolio command" }}
      />
      <DialogContent>
        <DialogTitle>CV preview</DialogTitle>
        <DialogDescription>The portfolio supplies its PDF viewer here.</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

function PortfolioPreview() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function updateActiveSection() {
      const section = sections.findLast(({ id }) =>
        (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= sectionOffset + 1,
      );
      setActiveSection(section?.id ?? sections[0].id);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <>
      <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
        <NeoNavbar
          brand={<strong>Portfolio preview</strong>}
          menuOpen={menuOpen}
          onMenuOpenChange={setMenuOpen}
          items={sections.map(({ id, label }) => ({
            href: "#" + id,
            label,
            active: id === activeSection,
            onClick: () => setActiveSection(id),
          }))}
        />
      </div>
      <main style={{ maxWidth: 840, margin: "auto", padding: "0 20px" }}>
        {sections.map(({ id, label }) => (
          <section
            key={id}
            id={id}
            tabIndex={-1}
            style={{ paddingBlock: 24, minHeight: "64vh", scrollMarginTop: sectionOffset }}
          >
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 12 }}>{label}</h2>
            {id === "about-me" && <TerminalExample />}
          </section>
        ))}
      </main>
    </>
  );
}

export default function PortfolioPatternsExample() {
  const [theme, setTheme] = useState<ThemeName>("retroterminal");
  const [mode, setMode] = useState<"light" | "dark">("light");

  return (
    <ThemeProvider theme={theme} mode={mode}>
      <div style={{
        background: "var(--dil-color-background)",
        color: "var(--dil-color-text)",
        colorScheme: mode,
        fontFamily: "system-ui, sans-serif",
      }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, padding: 16 }}>
          <label>
            Theme preset{" "}
            <select value={theme} onChange={(event) => setTheme(event.target.value as ThemeName)}>
              <option value="neobrutalism">Neobrutalism</option>
              <option value="glassmorphism">Glassmorphism</option>
              <option value="retroterminal">Retro Terminal</option>
            </select>
          </label>
          <label>
            Color mode{" "}
            <select value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>
        <PortfolioPreview />
      </div>
    </ThemeProvider>
  );
}
