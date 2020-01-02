import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./home";
import Dashboard from "./dashboard";
import Settings from "./settings";
import About from "./about";
import Notfound from "./notfound";
import { DataProvider } from "./dataContext";

import "./App.css";

const App = () => {
  return (
    <div id="app">
      <DataProvider>
        <BrowserRouter>
          <Dashboard>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/about" component={About} />
              <Route component={Notfound} />
            </Switch>
          </Dashboard>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
};
export default App;
