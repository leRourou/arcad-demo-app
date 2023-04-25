import React from "react";
import NotFound from "./views/misc/notFoundView.js";
import Building from "./views/misc/buildingView";
import Articles from "./controllers/articlesController.js";
import { Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <Routes>
        <Route path="/articles" element={<Articles />} />
        <Route path="/" element={<Building />} />
        <Route path="/about" element={<Building />} />
        <Route path="/customers" element={<Building />} />
        <Route path="/orders" element={<Building />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
