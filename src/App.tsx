import './App.css'
import { SimpleCard } from './components/data-display/Card/Card'
import { TextHover } from './components/effects/TextHover/TextHover'
import { ThemeScope, useTheme } from './components/ui/ThemeProvider'
import { themeNames, type ThemeName } from './lib/themes'

function App() {
  const { theme, setTheme } = useTheme()

  const cards: Array<{
    theme: ThemeName
    eyebrow: string
    title: string
    description: string
    tags: string[]
    badgeTopLeft?: string
    badgeTopRight?: string
    badgeBottomLeft?: string
    badgeBottomRight?: string
  }> = [
    {
      theme: 'graphite',
      eyebrow: 'Foundation',
      title: 'Portable cards with theme overrides',
      description:
        'A direct port of the reusable card idea from the sibling app, rewritten for plain React and multiple theme tokens.',
      tags: ['react', 'theme-aware', 'portable'],
      badgeTopRight: 'ui',
    },
    {
      theme: 'paper',
      eyebrow: 'Editorial',
      title: 'Warm surfaces without extra dependencies',
      description:
        'The same component API can render a softer theme for documentation-heavy screens and product content.',
      tags: ['paper', 'warm', 'docs'],
      badgeBottomRight: 'light',
    },
    {
      theme: 'neon',
      eyebrow: 'Motion',
      title: 'TextHover keeps the animated reveal feel',
      description:
        'The hover marquee effect is preserved and made reusable without any Next.js-specific dependencies.',
      tags: ['animation', 'hover', 'utility'],
      badgeBottomLeft: 'motion',
      badgeBottomRight: 'dark',
    },
  ]

  return (
    <ThemeScope theme={theme}>
      <main className="library-shell">
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">dil-ui library</p>
            <h1>Personal UI components with per-component themes.</h1>
            <p className="lead">
              This repo is now a reusable UI base instead of a template demo.
              Components can opt into their own theme, and the current preview
              imports the first two pieces from your sibling app.
            </p>
          </div>

          <div className="theme-switcher" aria-label="Theme selector">
            {themeNames.map((candidateTheme) => (
              <button
                key={candidateTheme}
                type="button"
                className={candidateTheme === theme ? 'is-active' : ''}
                onClick={() => setTheme(candidateTheme)}
              >
                {candidateTheme}
              </button>
            ))}
          </div>
        </section>

        <section className="demo-grid" aria-label="Component preview">
          {cards.map((card) => (
            <SimpleCard
              key={card.title}
              theme={card.theme}
              imageSrc="/vite.svg"
              imageAlt={`${card.title} preview`}
              eyebrow={card.eyebrow}
              title={card.title}
              description={card.description}
              tags={card.tags}
              badgeTopLeft={card.badgeTopLeft}
              badgeTopRight={card.badgeTopRight}
              badgeBottomLeft={card.badgeBottomLeft}
              badgeBottomRight={card.badgeBottomRight}
            />
          ))}
        </section>

        <section className="feature-row">
          <div className="feature-card">
            <p className="section-label">Imported component</p>
            <TextHover text="Hover to inspect" hoverText="Reusable text motion" />
            <p className="feature-note">
              The hover component now lives in the library and can be themed
              through the same shared tokens.
            </p>
          </div>

          <div className="feature-card feature-card--stacked">
            <p className="section-label">Library surface</p>
            <ul>
              <li>ThemeProvider for global selection</li>
              <li>Theme overrides per component</li>
              <li>Plain React, no Next.js dependency</li>
              <li>Source exports ready for reuse</li>
            </ul>
          </div>
        </section>
      </main>
    </ThemeScope>
  )
}

export default App
