import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// 👇 Solo activa Speed Insights en producción (no en desarrollo)
if (import.meta.env.PROD) {
  import("@vercel/speed-insights").then(({ injectSpeedInsights }) => {
    injectSpeedInsights();
  });
}

createRoot(document.getElementById("root")!).render(<App />);
