import { useTheme } from "../../hooks/useTheme";

export function useThemeTokens() {
  const { tokens } = useTheme();

  return tokens;
}
