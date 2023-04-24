import React from "react";
import NotFound from "./views/misc/notFoundView.js";
import Building from "./views/misc/buildingView";
import Articles from "./controllers/articlesController.js";
import Customers from "./controllers/customersController.js";
import Orders from "./controllers/ordersController.js";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/articles" element={<Articles />} />
      <Route path="/" element={<Building />} />
      <Route path="/about" element={<Building />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
