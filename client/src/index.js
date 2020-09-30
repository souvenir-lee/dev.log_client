import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  // <CookiesProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // </CookiesProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
