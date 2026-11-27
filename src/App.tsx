import { lazy, Suspense } from "react";

const ComponentShowcase = lazy(() => import("./examples/ComponentShowcase"));

const NavigationExamplePage = lazy(() => import("./examples/NavigationExamplePage"));

const PortfolioPatternsExample = lazy(() => import("./examples/PortfolioPatternsExample"));

export default function App() {
  const example = new URLSearchParams(window.location.search).get("example");
  const showNavigation =
    example === "navigation" ||
    window.location.pathname === "/example-page-with-navigation";

  if (showNavigation || example === "portfolio") {
    const Example = showNavigation ? NavigationExamplePage : PortfolioPatternsExample;
    return (
      <>
        <a
          className="block bg-slate-950 px-4 py-3 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-[-4px]"
          href="./"
        >
          Back to component showcase
        </a>
        <Suspense fallback={null}><Example /></Suspense>
      </>
    );
  }

  return <Suspense fallback={null}><ComponentShowcase /></Suspense>;
}
