import * as React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";

/* global document, Office, module, require, HTMLElement */

const rootElement: HTMLElement | null = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

/* Render application after Office initializes */
Office.onReady(() => {
  root?.render(
    <HashRouter>
      <App />
    </HashRouter>
  );
});

if ((module as any).hot) {
  (module as any).hot.accept("./App", () => {
    const NextApp = require("./App").default;
    root?.render(
      <HashRouter>
        <NextApp />
      </HashRouter>
    );
  });
}
