import React from "react";
import { Switch } from "react-router-dom";

import AppliedRoute from "./components/AppliedRoute"

import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

export default function Routes(appProps) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AppliedRoute path="/dashboard" component={Dashboard} appProps={appProps} />
    </Switch>
  );
}
