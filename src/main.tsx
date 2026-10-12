import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
// import NavigationExamplePage from "./examples/NavigationExamplePage";

document.documentElement.classList.add("dil-scrollbar");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {/* <NavigationExamplePage /> */}
  </StrictMode>,
);
