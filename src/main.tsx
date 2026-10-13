import { StrictMode } from "react";
import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

document.documentElement.classList.add("dil-scrollbar");

const NavigationExamplePage = lazy(
  () => import("./examples/NavigationExamplePage"),
);
const isNavigationExamplePage =
  import.meta.env.DEV &&
  window.location.pathname === "/example-page-with-navigation";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isNavigationExamplePage ? (
      <Suspense fallback={null}>
        <NavigationExamplePage />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
);
