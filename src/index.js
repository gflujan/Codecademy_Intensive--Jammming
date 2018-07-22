import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

/* ---------------------------------------------
// Importing additional/external modules
--------------------------------------------- */
import { App } from "./components/App/App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
