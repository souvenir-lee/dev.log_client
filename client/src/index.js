import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  // <CookiesProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // </CookiesProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
