import Products from "./views/ProductsView";
import Product from "./views/ProductView";
import NotFound from "./views/NotFoundView";
import Building from "./views/Building";
import React from "react";
import { Route, Routes } from "react-router-dom";

function App(props) {

  return (
    <Routes>
      <Route path="/products" element={<Products/>}/>
      <Route path="/" element={<Building/>}/>
      <Route path="/about" element={<Building/>}/>
      <Route path="/customers" element={<Building/>}/>
      <Route path="/commands" element={<Building/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
