import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/global.scss";
import App from "./App.tsx";
import { PlanProvider } from "./context/PlanContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PlanProvider>
      <App />
    </PlanProvider>
  </StrictMode>
);
