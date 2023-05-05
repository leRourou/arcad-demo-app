import React from "react";
import NotFound from "./views/misc/notFoundView.js";
import Building from "./views/misc/buildingView";
import Items from "./views/itemsDataView.js";
import { Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Article } from "./classes/models/article";
import { getAllArticles } from "./services/articleServices.js";
import { Customer } from "./classes/models/customer";
import { getAllCustomers } from "./services/customerServices.js";
import store from "./store.js";

/**
 * @module App
 * @description - This main component of the application. Also contains the routes logic of the application.
 * @returns {JSX.Element} - The App component
 */

function App() {
  return (
    <Routes>

      <Route path="/articles" element={
        <Items
          columns={Article.columns}
          title={'Articles'}
          singleTitle='article'
          getAll={getAllArticles}
          data={() => { return store.getState().articles }
          }
        />}
      />

      <Route path="/customers" element={
        <Items
          columns={Customer.columns}
          title={'Customers'}
          singleTitle='customer'
          getAll={getAllCustomers}
          data={() => { return store.getState().customers }}
        />} 
      />

      <Route path="/" element={<Building />} />

      <Route path="/about" element={<Building />} />

      <Route path="/orders" element={<Building />} />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
