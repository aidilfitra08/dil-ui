# dil-ui

`dil-ui` is a React component library built with TypeScript and Vite.
It is intended for early npm publishing and local experimentation before a stable release.

## Status

- Reusable UI components
- Theme-aware library surface
- Built for npm packaging

## Included components

- Actions: `Button`, `IconButton`
- Data display: `Avatar`, `Badge`, `Card`, `Table`, `DataTable`, `Timeline`
- Data entry: `Combobox`, `DatePicker`, `DateRangePicker`, `DateTimePicker`, `MonthPicker`, `MultiSelect`, `TimePicker`, `TimeRangePicker`
- UI: `PatternBackground`
- Overlay: `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverAnchor`, `PopoverClose`

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

`Table` and its supporting components, `Timeline`, all picker components, `MultiSelect`, `Marquee`, and `Typewriter` are currently alpha-stage. `MultiSelect`, `Marquee`, and `Typewriter` will receive further API and interaction refinement. Their APIs and visual behavior may change as the library matures.

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

## Package preview

```bash
npm pack
```

## Notes

- This project is currently meant for trying an npm release first.
- Alpha component APIs may change while they are being refined.
- Use the source in this repository directly for UI preview and iteration.
