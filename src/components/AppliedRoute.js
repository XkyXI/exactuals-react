import React from "react";
import { Route } from "react-router-dom";

export default function App({ component: Component, appProps, ...rest }) {
  return (
    <Route 
      {...rest} 
      render={(props) => <Component {...props} {...appProps} />}
    />
  );
}
