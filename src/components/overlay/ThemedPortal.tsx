import { FloatingPortal } from "@floating-ui/react";
import { useContext, type ReactNode } from "react";

import { ThemeContext } from "../../theme/provider/ThemeContext";
import { ThemeHostContext } from "../../theme/provider/ThemeHostContext";
import { getThemeStyles } from "../../theme/utils/getThemeStyles";

interface ThemedPortalProps {
  children: ReactNode;
  container?: HTMLElement | null;
  reference?: Element | null;
}

const themeSelector = "[data-dil-theme]";

export function ThemedPortal({ children, container, reference }: ThemedPortalProps) {
  const host = useContext(ThemeHostContext);
  const theme = useContext(ThemeContext);
  const source = reference?.closest<HTMLElement>(themeSelector) ?? host;
  const needsTheme = theme && container && container.closest(themeSelector) !== source;

  return (
    <FloatingPortal root={container ?? source}>
      {needsTheme ? (
        <div data-dil-theme style={{ ...getThemeStyles(theme.tokens), display: "contents" }}>
          {children}
        </div>
      ) : children}
    </FloatingPortal>
  );
}
