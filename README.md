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
npm install dil-ui
```

Import the library stylesheet once in your application entry point:

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
  light: { ...base.light, colors: { ...base.light.colors, primary: "#0f766e" } },
  dark: { ...base.dark, colors: { ...base.dark.colors, primary: "#5eead4" } },
};

<ThemeProvider theme={oceanTheme} mode="system">{/* app */}</ThemeProvider>;
```

The `Theme` type and built-in `themeRegistry` are exported from `dil-ui`. Custom themes need both light and dark tokens and can also be passed to `ThemeScope`. Use `useTheme` and `useThemeTokens` to access the active theme within components.

## Development

```bash
npm install
npm run dev
npm test
npm run build
```

The package is pre-1.0, so component APIs may change as the library develops.
