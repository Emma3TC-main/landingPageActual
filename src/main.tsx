import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

if (import.meta.env.PROD) {
  // 👇 Carga el script de Speed Insights directamente desde Vercel en el navegador
  const script = document.createElement("script");
  script.src = "https://va.vercel-scripts.com/v1/speed-insights";
  script.defer = true;
  document.head.appendChild(script);
}

createRoot(document.getElementById("root")!).render(<App />);
