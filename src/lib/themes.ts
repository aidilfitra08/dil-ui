import type { CSSProperties } from 'react'

export const themeNames = ['graphite', 'paper', 'neon'] as const

export type ThemeName = (typeof themeNames)[number]

type ThemeTokens = {
  canvas: string
  surface: string
  surfaceElevated: string
  text: string
  muted: string
  border: string
  accent: string
  accentSoft: string
  shadow: string
  grid: string
}

const themeTokens: Record<ThemeName, ThemeTokens> = {
  graphite: {
    canvas: '#0b1015',
    surface: '#111820',
    surfaceElevated: '#17212b',
    text: '#edf4f9',
    muted: '#9fb0c1',
    border: 'rgba(255, 255, 255, 0.08)',
    accent: '#72e7ff',
    accentSoft: 'rgba(114, 231, 255, 0.12)',
    shadow: '0 24px 64px rgba(0, 0, 0, 0.38)',
    grid: 'rgba(255, 255, 255, 0.04)',
  },
  paper: {
    canvas: '#f4ede2',
    surface: '#fbf7f0',
    surfaceElevated: '#f0e5d7',
    text: '#1d1710',
    muted: '#6c5c49',
    border: 'rgba(64, 44, 24, 0.16)',
    accent: '#c86721',
    accentSoft: 'rgba(200, 103, 33, 0.12)',
    shadow: '0 24px 48px rgba(103, 68, 33, 0.14)',
    grid: 'rgba(64, 44, 24, 0.05)',
  },
  neon: {
    canvas: '#07111a',
    surface: '#0c1722',
    surfaceElevated: '#102233',
    text: '#ecf8ff',
    muted: '#8ea8bc',
    border: 'rgba(117, 219, 255, 0.12)',
    accent: '#73ff8a',
    accentSoft: 'rgba(115, 255, 138, 0.12)',
    shadow: '0 24px 70px rgba(0, 0, 0, 0.42)',
    grid: 'rgba(115, 255, 138, 0.08)',
  },
}

export const defaultTheme: ThemeName = 'graphite'

export function getThemeStyle(theme: ThemeName): CSSProperties {
  const tokens = themeTokens[theme]

  return {
    colorScheme: theme === 'paper' ? 'light' : 'dark',
    '--ui-canvas': tokens.canvas,
    '--ui-surface': tokens.surface,
    '--ui-surface-elevated': tokens.surfaceElevated,
    '--ui-text': tokens.text,
    '--ui-muted': tokens.muted,
    '--ui-border': tokens.border,
    '--ui-accent': tokens.accent,
    '--ui-accent-soft': tokens.accentSoft,
    '--ui-shadow': tokens.shadow,
    '--ui-grid': tokens.grid,
  } as CSSProperties
}
