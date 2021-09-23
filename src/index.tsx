import { CssBaseline } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";

import Router from "./router";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Router />
  </React.StrictMode>,
  document.getElementById("root")
);
