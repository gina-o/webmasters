import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
<<<<<<< HEAD
    {/* Add basename here */}
    <BrowserRouter basename="/webmasters">
=======
    <HashRouter>
>>>>>>> c4b91926a5fe6bdbda46713dda38ef19be519985
      <App />
    </HashRouter>
  </React.StrictMode>
);


