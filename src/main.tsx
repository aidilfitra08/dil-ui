import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { NavigationExamplePage } from "./examples/NavigationExamplePage";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {/* <NavigationExamplePage /> */}
  </StrictMode>,
);
