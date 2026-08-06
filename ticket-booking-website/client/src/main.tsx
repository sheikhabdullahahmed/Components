import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store";
import { Agentation } from "agentation";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      {import.meta.env.DEV && <Agentation />}
      <App />
    </Provider>
  </StrictMode>,
);
