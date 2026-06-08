import { createContext, useContext, useState, type ReactNode } from 'react'
import { defaultTheme, getThemeStyle, type ThemeName } from '../../lib/themes'

type ThemeContextValue = {
  theme: ThemeName
  setTheme: (theme: ThemeName) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
  setTheme: () => undefined,
})

export interface ThemeProviderProps {
  theme?: ThemeName
  children: ReactNode
}

export function ThemeProvider({ theme = defaultTheme, children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(theme)

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme: setCurrentTheme }}>
      <div className="theme-scope" data-theme={currentTheme} style={getThemeStyle(currentTheme)}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function ThemeScope({ theme, children }: ThemeProviderProps) {
  return (
    <div className="theme-scope" data-theme={theme ?? defaultTheme} style={getThemeStyle(theme ?? defaultTheme)}>
      {children}
    </div>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
