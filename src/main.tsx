import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./showcase.css";
import "./index.css";

document.documentElement.classList.add("dil-scrollbar");

createRoot(document.getElementById("root")!).render(
  <StrictMode><App /></StrictMode>,
);
