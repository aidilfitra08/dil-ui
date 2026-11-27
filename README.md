# dil-ui

A React component library built with TypeScript. Components are exported from the `dil-ui` package and grouped below by their source folder for easy browsing.

## Contents

- [Installation](#installation)
- [Quick start](#quick-start)
- [Components](#components)
  - [Actions](#actions)
  - [Data display](#data-display)
  - [Data entry](#data-entry)
  - [Effects](#effects)
  - [Feedback](#feedback)
  - [Forms](#forms)
  - [Overlays](#overlays)
  - [Navigation](#navigation)
  - [UI](#ui)
- [Themes](#themes)
- [Development](#development)

## Installation

```bash
npm install ../dil-ui/dil-ui-0.2.0-rc.1.tgz
```

Use the path to the archive produced by npm pack. See the [release and installation guide](docs/releasing.md) for versioned installs.

Import the library stylesheet once in your application entry point.

```tsx
import "dil-ui/styles.css";
```

## Quick start

Components are available as named exports:

```tsx
import { Button, Card } from "dil-ui";

function Example() {
  return (
    <Card>
      <Button>Get started</Button>
    </Card>
  );
}
```

## Components

Component names below reflect the library's exported components; compound components are grouped together where applicable.

### Actions

- **Button** — Primary and secondary action button.
- **IconButton** — Compact button for icon-based actions.

### Data display

- **Avatar** — Represents a person or entity.
- **Badge** — Displays a compact status or label.
- **Card** — Groups related content in a surface.
- **ChartContainer, ChartTooltip, ChartLegend** — Theme-aware responsive chart composition built on Recharts. See [chart usage](./docs/charts.md).
- **List, ListItem** — Semantic ordered or unordered lists and their items.
- **Table, DataTable** — Tabular data and data-table presentation.

### Data entry

- **Combobox, MultiSelect** — Searchable single- and multiple-choice selection.
- **DatePicker, DateRangePicker, DateTimePicker, MonthPicker** — Date and month selection.
- **TimePicker, TimeRangePicker** — Time and time-range selection.

### Effects

- **Counter** — Animated number display.
- **GradientText** — Text styled with a gradient.
- **Marquee** — Scrolling content display.
- **Terminal** — Terminal-style content presentation.
- **TextHover** — Hover effect for text.
- **Typewriter** — Typewriter-style text animation.

### Feedback

- **Progress** — Shows task or loading progress.
- **Skeleton** — Placeholder while content loads.
- **Spinner** — Loading indicator.
- **Toast** — Brief, temporary notification.

### Forms

- **Checkbox, Radio, Switch** — Boolean and single-choice controls.
- **FileInput** — File selection control.
- **Input, TextArea** — Single- and multi-line text fields.
- **Label** — Form control label.
- **Select** — Option selection control.
- **Slider** — Selects a value within a range.

### Overlays

- **Collapsible** — Expandable and collapsible content.
- **Dialog** — Modal dialog content.
- **Popover** — Anchored floating content, with trigger, content, anchor, and close components.
- **Tooltip** — Contextual hint attached to an element.

### Navigation

- **Accordion, AccordionItem, AccordionTrigger, AccordionContent** — Accessible single- or multiple-item disclosures. See [Accordion usage](./docs/accordion.md).

### UI

- **LoadingBar** — Linear loading indicator.
- **NeoNavbar, NeoSidebar** — Navigation layouts with a neobrutalist style.
- **PatternBackground** — Decorative patterned background.
- **Timeline, TimelineItem** — Events or steps arranged along a timeline.

## Themes

Use a built-in theme (`neobrutalism`, `glassmorphism`, or `retroterminal`) with `ThemeProvider`, or pass a custom `Theme` object. To create a preset based on an existing one, copy its tokens and override the values you need:

```tsx
import { ThemeProvider, themeRegistry, type Theme } from "dil-ui";

const base = themeRegistry.glassmorphism;
const oceanTheme: Theme = {
  ...base,
  name: "ocean",
  light: {
    ...base.light,
    colors: { ...base.light.colors, primary: "#075985" },
    foregrounds: { ...base.light.foregrounds, primary: "#FFFFFF" },
  },
  dark: {
    ...base.dark,
    colors: { ...base.dark.colors, primary: "#7DD3FC" },
    foregrounds: { ...base.dark.foregrounds, primary: "#000000" },
  },
};

<ThemeProvider theme={oceanTheme} mode="system">{/* app */}</ThemeProvider>;
```

The `Theme` type and built-in `themeRegistry` are exported from `dil-ui`. Custom themes need both light and dark tokens and can also be passed to `ThemeScope`. Use `useTheme` and `useThemeTokens` to access the active theme within components.

`ThemeProvider` and `ThemeScope` include theme tokens in the server HTML. Explicit `light` and `dark` modes render their own tokens immediately. On the server and during hydration, `system` starts with light tokens. It follows the browser preference after hydration and updates when that preference changes.

`ThemeScope` provides its preset and mode to `useTheme` and `useThemeTokens` inside the scope. Dialog, Popover, and Tooltip use the nearest theme. A custom portal target keeps its placement and receives the source theme tokens when it belongs to a different scope.

The optional `ThemeTokens.foregrounds` entries pair text and icons with their corresponding solid fills. Set the foreground when overriding a fill and verify the pair reaches 4.5:1 for normal text. An omitted entry uses the theme's `colors.text` value.

Give an icon-only `IconButton` a name with `aria-label` or `aria-labelledby`. Open the showcase's **Actions** section to compare filled, transparent, and disabled controls through the preset and color-mode controls.

## Development

```bash
npm install
npm run dev
npm test
npm run build
```

`npm pack` builds the library and verifies the package's JavaScript, CSS and declaration entry points. Recharts is installed as a package dependency. If you load the UMD bundle directly from a script tag, load Recharts first so the `Recharts` global is available.

The package is pre-1.0, so component APIs may change as the library develops.

## Stylesheet isolation

Import `dil-ui/styles.css` once. The package scopes its resets and generated utilities to dil-ui component markup. It uses private names for its Tailwind utility properties and animations. Components can render outside `ThemeProvider`, and your app's Tailwind utilities can override component defaults through `className`.

The showcase compiles its own page styles. They are separate from the published stylesheet.

## Next.js App Router

Import `dil-ui/styles.css` from your root layout. Import interactive dil-ui components and hooks from a client component with a `"use client"` directive. The server page can render that client component.

The packed package was verified in a Next.js 16.4.6 production build with React 19.3.0, including prerendered content, stylesheet loading and a hydrated button interaction.

## Component showcase

Run `npm run dev` to browse the examples in `src/examples`. The showcase lets you select a theme preset and color mode, compare unthemed examples, and open a navbar and sidebar demo.

Open **Portfolio patterns** (`?example=portfolio`) to try section navigation and terminal commands. Enter `help`, use the arrow keys to recall commands, and enter `cv` to preview a dialog. On mobile, open the navigation menu with Enter and dismiss it with Escape.

Run `npm run build:showcase` to create a static site in `dist-showcase/`. Run `npm run preview:showcase` to preview that output locally. A static host can serve that directory, including when hosted under a subdirectory. The library package uses `dist/`.

## Production readiness

See the [readiness review](docs/production-readiness.md) and [release plan](docs/production-readiness-plan.md).
