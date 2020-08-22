import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./styles/App.less"
import Routes from "./Routes";

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
