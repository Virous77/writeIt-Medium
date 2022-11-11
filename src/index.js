import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserAuthContextProvider } from "./store/authContext";
import { ActionContextProvider } from "./store/actionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserAuthContextProvider>
        <ActionContextProvider>
          <App />
        </ActionContextProvider>
      </UserAuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
