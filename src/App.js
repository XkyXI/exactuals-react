import React, { useState } from "react";
import Routes from "./Routes";

export default function App() {
  const [ isAuthenticated, setAuthenticated ] = useState(false);
  const [ userInfo, setUserInfo ] = useState({});

  return (
    <div className="app container">
      <Routes appProps={{ isAuthenticated, setAuthenticated, userInfo, setUserInfo }}/>
    </div>
  );
}
