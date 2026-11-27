import { createContext } from "react";

// Undefined means no provider. Null means its wrapper has not mounted yet.
export const ThemeHostContext = createContext<HTMLElement | null | undefined>(undefined);
