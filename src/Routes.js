import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
    </Switch>
  );
}
