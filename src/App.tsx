import React from "react";
import { Route, Routes } from "react-router-dom";

import Ymap from "./pages/Ymap";

const App = function (): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Ymap />} />
      </Routes>
    </>
  );
};

export default App;
