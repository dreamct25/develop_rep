import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import GlobalLayout from "./GlobalLayout";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalLayout>
      <App />
    </GlobalLayout>
  </React.StrictMode>
);
