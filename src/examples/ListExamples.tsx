import { List, ListItem } from "../components/data-display/List";

const exampleClassName = "rounded border border-slate-200 p-3";

export function ListExamples() {
  return (
    <section className="mb-6 space-y-4 border-b border-slate-200 pb-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Data display
        </p>
        <h2 className="mt-1 text-xl font-semibold">List examples</h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className={exampleClassName}>
          <h3 className="mb-2 font-semibold">Unordered · default</h3>
          <List spacing="sm">
            <ListItem>First item</ListItem>
            <ListItem>
              Second item with longer content that wraps naturally.
            </ListItem>
            <ListItem>Third item</ListItem>
          </List>
        </div>

        <div className={exampleClassName}>
          <h3 className="mb-2 font-semibold">
            Unordered · disc, circle, square
          </h3>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <List marker="disc" spacing="sm">
              <ListItem>Disc</ListItem>
              <ListItem>Bullet</ListItem>
            </List>
            <List marker="circle" spacing="sm">
              <ListItem>Circle</ListItem>
              <ListItem>Bullet</ListItem>
            </List>
            <List marker="square" spacing="sm">
              <ListItem>Square</ListItem>
              <ListItem>Bullet</ListItem>
            </List>
          </div>
        </div>

        <div className={exampleClassName}>
          <h3 className="mb-2 font-semibold">Markerless</h3>
          <List marker="none" spacing="sm">
            <ListItem>First item</ListItem>
            <ListItem>Second item</ListItem>
          </List>
        </div>

        <div className={exampleClassName}>
          <h3 className="mb-2 font-semibold">Ordered · decimal</h3>
          <List type="ordered" marker="decimal" start={3} spacing="sm">
            <ListItem>Third step</ListItem>
            <ListItem>Fourth step</ListItem>
            <ListItem>Fifth step</ListItem>
          </List>
        </div>

        <div className={exampleClassName}>
          <h3 className="mb-2 font-semibold">Ordered · alphabetic and Roman</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <List type="ordered" marker="lower-alpha" spacing="sm">
              <ListItem>Lower alpha</ListItem>
              <ListItem>Next item</ListItem>
            </List>
            <List type="ordered" marker="upper-roman" spacing="sm">
              <ListItem>Upper Roman</ListItem>
              <ListItem>Next item</ListItem>
            </List>
          </div>
        </div>

        <div className={exampleClassName}>
          <h3 className="mb-2 font-semibold">Custom markers</h3>
          <List
            type="ordered"
            marker="custom"
            spacing="sm"
            renderMarker={(index) => (
              <span className="font-semibold text-(--dil-color-primary)">
                {(["✓", "★", "→"] as const)[index % 3]}
              </span>
            )}
          >
            <ListItem>Completed</ListItem>
            <ListItem>Featured</ListItem>
            <ListItem>Continue reading</ListItem>
          </List>
        </div>

        <div className={exampleClassName}>
          <h3 className="mb-2 font-semibold">Reversed ordered list</h3>
          <List type="ordered" marker="decimal" start={3} reversed spacing="sm">
            <ListItem>Third</ListItem>
            <ListItem>Second</ListItem>
            <ListItem>First</ListItem>
          </List>
        </div>

        <div className={exampleClassName}>
          <h3 className="mb-2 font-semibold">Upper alpha and lower Roman</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <List type="ordered" marker="upper-alpha" spacing="sm">
              <ListItem>Upper alpha</ListItem>
              <ListItem>Next item</ListItem>
            </List>
            <List type="ordered" marker="lower-roman" spacing="sm">
              <ListItem>Lower Roman</ListItem>
              <ListItem>Next item</ListItem>
            </List>
          </div>
        </div>
      </div>
    </section>
  );
}
