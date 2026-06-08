import type { ReactNode } from 'react'
import { getThemeStyle, type ThemeName } from '../../lib/themes'

export interface SimpleCardLink {
  label: string
  href: string
}

export interface SimpleCardProps {
  imageSrc?: string
  imageAlt?: string
  eyebrow?: ReactNode
  badgeTopLeft?: ReactNode
  badgeTopRight?: ReactNode
  badgeBottomLeft?: ReactNode
  badgeBottomRight?: ReactNode
  title?: string
  description?: string
  tags?: string[]
  links?: SimpleCardLink[]
  theme?: ThemeName
  className?: string
}

export function SimpleCard({
  imageSrc,
  imageAlt = 'Simple card preview',
  eyebrow,
  badgeTopLeft,
  badgeTopRight,
  badgeBottomLeft,
  badgeBottomRight,
  title,
  description,
  tags,
  links,
  theme = 'graphite',
  className,
}: SimpleCardProps) {
  return (
    <article className={['ui-simple-card', className].filter(Boolean).join(' ')} style={getThemeStyle(theme)}>
      <div className="ui-simple-card__media">
        {imageSrc ? (
          <img className="ui-simple-card__image" src={imageSrc} alt={imageAlt} />
        ) : (
          <div className="ui-simple-card__placeholder" aria-hidden="true">
            no image supplied
          </div>
        )}

        {eyebrow ? <span className="ui-simple-card__eyebrow">{eyebrow}</span> : null}
        {badgeTopLeft ? <span className="ui-simple-card__badge ui-simple-card__badge--tl">{badgeTopLeft}</span> : null}
        {badgeTopRight ? <span className="ui-simple-card__badge ui-simple-card__badge--tr">{badgeTopRight}</span> : null}
        {badgeBottomLeft ? <span className="ui-simple-card__badge ui-simple-card__badge--bl">{badgeBottomLeft}</span> : null}
        {badgeBottomRight ? <span className="ui-simple-card__badge ui-simple-card__badge--br">{badgeBottomRight}</span> : null}
      </div>

      <div className="ui-simple-card__content">
        {title ? <h3 className="ui-simple-card__title">{title}</h3> : null}
        {description ? <p className="ui-simple-card__description">{description}</p> : null}

        {tags && tags.length > 0 ? (
          <div className="ui-simple-card__meta" aria-label="Tags">
            {tags.map((tag) => (
              <span key={tag} className="ui-chip">
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {links && links.length > 0 ? (
          <div className="ui-simple-card__links" aria-label="Links">
            {links.map((link) => (
              <a key={link.label} className="ui-link" href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}
