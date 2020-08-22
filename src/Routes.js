import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import { PrivateRoute } from "./components";
import {
  Home as HomeView,
  Authenticate as AuthenticateView,
} from "./views";

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={HomeView} />
      <Route path="/login" component={AuthenticateView} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
