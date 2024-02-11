import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import reportWebVitals from "./reportWebVitals";

// Redux
import { Provider } from "react-redux";
import { store } from "./store";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

reportWebVitals();