import { parse, type Node } from "postcss";
import { normalizePath, type Plugin } from "vite";

export function scopeLibraryStyles(stylesheet: string): Plugin {
  const scope = ".dil-ui-scope";
  const boundary = `:where(${scope}, ${scope} *)`;
  const stylesheetId = normalizePath(stylesheet);

  return {
    name: "dil-ui:scope-styles",
    enforce: "pre",
    transform(css, id) {
      if (id.split("?", 1)[0] !== stylesheetId) return;

      // Tailwind registers some utility properties globally, even inside a scope.
      const root = parse(css.replaceAll("--tw-", "--dil-ui-tw-"));
      root.walkAtRules("layer", (layer) => {
        if (layer.params === "properties") layer.params = "dil-ui-properties";
      });
      root.walkAtRules("scope", (rule) => {
        if (rule.params !== `(${scope})` || !rule.nodes) return;

        rule.walkRules((child) => {
          // Nested selectors already inherit the scoped parent selector.
          let parent: Node | undefined = child.parent;
          while (parent && parent !== rule && parent.type !== "rule") parent = parent.parent;
          if (parent !== rule) return;

          child.selectors = child.selectors.map((selector) => {
            const type = selector.match(/^(?:\*|[a-z][\w-]*)/i)?.[0] ?? "";
            return `${type}${boundary}${selector.slice(type.length)}`;
          });
        });

        rule.replaceWith(...rule.nodes);
      });

      return { code: root.toString(), map: null };
    },
  };
}
