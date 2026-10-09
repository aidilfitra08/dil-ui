import { Button } from "../components/actions/Button";
import { Card } from "../components/data-display/Card";
import { LoadingBar } from "../components/ui/LoadingBar";
import { NeoNavbar } from "../components/ui/NeoNavbar";
import { NeoSidebar } from "../components/ui/NeoSidebar";
import { ThemeProvider } from "../theme";

const navigationItems = [
  { label: "Overview", href: "#overview", icon: "▦", active: true },
  { label: "Projects", href: "#projects", icon: "◇" },
  { label: "Activity", href: "#activity", icon: "◷" },
  { label: "Settings", href: "#settings", icon: "⚙" },
];

export default function NavigationExamplePage() {
  return (
    <ThemeProvider theme="retroterminal" mode="light">
      <div className="min-h-screen bg-(--dil-color-background) text-(--dil-color-text)">
        <NeoNavbar
          brand={
            <span className="text-lg font-black uppercase tracking-tight">
              NEO/KIT
            </span>
          }
          items={[
            { label: "Kit", href: "#kit", active: true },
            { label: "Tokens", href: "#tokens" },
            { label: "Layouts", href: "#layouts" },
            { label: "Config", href: "#config" },
          ]}
          actions={
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <Button size="sm" className="hidden sm:inline-flex">
                ⚡ Primary Action
              </Button>
            </div>
          }
          mobileActions={
            <Button size="lg" className="w-full">
              ⚡ Primary Action
            </Button>
          }
        />

        <div className="flex md:min-h-[calc(100vh-4.5rem)]">
          <NeoSidebar
            brand={
              <span className="text-sm font-black uppercase tracking-[0.12em]">
                Workspace
              </span>
            }
            items={navigationItems}
            bottomItems={[{ label: "Help", href: "#help", icon: "?" }]}
            footer={
              <span className="text-xs font-bold uppercase tracking-[0.08em]">
                NEO/KIT v2.4
              </span>
            }
          />

          <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-10">
            <div className="mx-auto max-w-4xl space-y-8">
              <header className="space-y-3">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-(--dil-color-muted)">
                  Responsive navigation example
                </p>
                <h1 className="text-3xl font-black uppercase tracking-tight sm:text-5xl">
                  Build boldly.
                </h1>
                <p className="max-w-2xl text-base sm:text-lg">
                  A ready-to-use responsive shell combining the neobrutalist top
                  navbar and side navigation.
                </p>
              </header>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="space-y-4">
                  <p className="text-xs font-black uppercase tracking-widest">
                    Project health
                  </p>
                  <p className="text-3xl font-black">84%</p>
                  <LoadingBar
                    value={84}
                    variant="success"
                    label="Project health"
                  />
                </Card>
                <Card className="space-y-4">
                  <p className="text-xs font-black uppercase tracking-widest">
                    Next milestone
                  </p>
                  <p className="text-3xl font-black">12 days</p>
                  <LoadingBar
                    value={58}
                    variant="secondary"
                    label="Milestone progress"
                  />
                </Card>
              </div>

              <Card className="space-y-3">
                <h2 className="text-xl font-black uppercase">
                  Responsive behavior
                </h2>
                <p>
                  On desktop, the sidebar stays sticky at the left edge with
                  Help anchored at the bottom. On mobile, the top navbar
                  collapses its links into a right-side menu drawer.
                </p>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
