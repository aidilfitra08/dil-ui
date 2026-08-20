import { getThemeStyle, type ThemeName } from '../../../lib/themes'

export interface TextHoverProps {
  text: string
  hoverText: string
  theme?: ThemeName
  className?: string
}

export function TextHover({ text, hoverText, theme = 'graphite', className }: TextHoverProps) {
  const repeatedHoverText = Array.from({ length: 4 }, () => hoverText).join(' • ')

  return (
    <div
      className={['ui-text-hover', className].filter(Boolean).join(' ')}
      style={getThemeStyle(theme)}
      tabIndex={0}
    >
      <span className="ui-text-hover__base">{text}</span>
      <span className="ui-text-hover__overlay" aria-hidden="true">
        <span className="ui-text-hover__track ui-text-hover__track--front">{repeatedHoverText}</span>
        <span className="ui-text-hover__track ui-text-hover__track--back">{repeatedHoverText}</span>
      </span>
    </div>
  )
}
