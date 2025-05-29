import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import { SocketeProvider } from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <SocketeProvider>
    <App />
    <Toaster closeButton />
  </SocketeProvider>

  //</StrictMode>,
);
