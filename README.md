# dil-ui

`dil-ui` is a React component library built with TypeScript and Vite. Version `0.1.0` is an early, pre-1.0 release intended for npm publishing and continued refinement; component APIs may evolve before a stable `1.0.0` release.

## Status

- Reusable UI components
- Theme-aware library surface
- Built for npm packaging

## Included components

- Actions: `Button`, `IconButton`
- Data display: `Avatar`, `Badge`, `Card`, `List`, `ListItem`, `Table`, `DataTable`, `Timeline`
- Data entry: `Combobox`, `DatePicker`, `DateRangePicker`, `DateTimePicker`, `MonthPicker`, `MultiSelect`, `TimePicker`, `TimeRangePicker`
- UI: `PatternBackground`
- Overlay: `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverAnchor`, `PopoverClose`

## Lists

`List` renders semantic unordered (`ul`) or ordered (`ol`) lists. `ListItem` renders a semantic `li` and works both inside and outside a `List`. Both support native HTML attributes, `className`, and forwarded refs.

Choose a marker style with `marker`: `default`, `none`, `disc`, `circle`, `square`, `decimal`, `lower-alpha`, `upper-alpha`, `lower-roman`, `upper-roman`, or `custom`. The `spacing` prop accepts `none`, `sm`, `md`, or `lg`. Ordered lists also support native `start` and `reversed` attributes. For custom markers, provide `renderMarker`, which receives each item's zero-based index.

```tsx
import { List, ListItem } from "dil-ui";

<List type="unordered" marker="disc" spacing="md">
  <ListItem>First item</ListItem>
  <ListItem>Second item</ListItem>
</List>

<List
  type="ordered"
  marker="custom"
  spacing="sm"
  renderMarker={(index) => <span aria-hidden="true">{index + 1}.</span>}
>
  <ListItem>First step</ListItem>
  <ListItem>Second step</ListItem>
</List>
```

## Popover

`Popover` is the shared floating-layer primitive for interactive content such as calendars, command menus, selects, and autocomplete panels. It supports controlled and uncontrolled state, click-outside and Escape dismissal, portal rendering, nested composition, Floating UI collision handling, and animation-friendly `data-state`, `data-side`, and `data-align` attributes.

```tsx
<Popover>
	<PopoverTrigger asChild><Button>Open</Button></PopoverTrigger>
	<PopoverContent><PopoverClose>Done</PopoverClose></PopoverContent>
</Popover>
```

## Themes

- `neobrutalism`
- `glassmorphism`

Themes support light, dark, and system modes through `ThemeProvider` and expose color, spacing, radius, shadow, and typography CSS tokens.

## Alpha components

`List`, `ListItem`, `Table` and its supporting components, `Timeline`, all picker components, `MultiSelect`, `Marquee`, and `Typewriter` are currently alpha-stage. Their APIs and visual behavior may change as the library matures.

## Beta components

`Button`, `IconButton`, `Avatar`, `Badge`, `Card`, `Combobox`, and `PatternBackground` are beta-stage: ready for use while continuing to receive validation and refinement.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Publishing

The current package version is `0.1.0`. Before publishing a release, build and inspect the package contents:

```bash
npm run build
npm pack --dry-run
```

The package includes the generated `dist` output. Publish the release to npm with:

```bash
npm publish
```

## Package preview

```bash
npm pack
```

## Notes

- This project is currently meant for trying an npm release first.
- Alpha component APIs may change while they are being refined.
- Use the source in this repository directly for UI preview and iteration.
