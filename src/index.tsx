import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import SpotifyInterceptor from "./components/SpotifyInterceptor";

import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Provider as StoreProvider } from "react-redux";
import { store } from "./redux/store";

import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme/";

if (process.env.NODE_ENV === "production") {
  document.addEventListener("contextmenu", (e) => e.preventDefault());
  window.addEventListener("beforeunload", (e) => {
    e.returnValue = "Are you sure you want to leave";
  });
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <StoreProvider store={store}>
          <Switch>
            <Route path="/" exact component={App} />
            <Route
              path="/spotify-interceptor"
              exact
              component={SpotifyInterceptor}
            />
          </Switch>
        </StoreProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
