import React from "react";
import NotFound from "./views/misc/notFoundView.js";
import Building from "./views/misc/buildingView";
import Items from "./views/itemsDataView.js";
import { Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import { Article } from "./classes/models/article";
import { getAllArticles, getLengthArticles } from "./services/articleServices.js";

import { Customer } from "./classes/models/customer";
import { getAllCustomers, getLengthCustomers } from "./services/customerServices.js";

import { Provider } from "./classes/models/provider";
import { getAllProviders, getLengthProviders } from "./services/providerServices.js";

import { Country } from "./classes/models/country";
import { getAllCountries, getLengthCountries } from "./services/countryServices.js";

import { Order } from "./classes/models/order.js";
import { getAllOrders, getLengthOrders } from "./services/orderServices.js";

/**
 * @module App
 * @description - This main component of the application. Also contains the routes logic of the application.
 * @returns {JSX.Element} - The App component
 */

var article = (
  <Items
          columns={Article.columns}
          title={'Articles'}
          singleTitle='article'
          getAll={getAllArticles}
          getLength={getLengthArticles}
        />
)

var customer = (
  <Items
          columns={Customer.columns}
          title={'Customers'}
          singleTitle='customer'
          getAll={getAllCustomers}
          getLength={getLengthCustomers}
        />
)

var provider = (
  <Items
          columns={Provider.columns}
          title={'Providers'}
          singleTitle='provider'
          getAll={getAllProviders}
          getLength={getLengthProviders}
        />
)

var orders = (
  <Items
          columns={Order.columns}
          title={'Orders'}
          singleTitle='order'
          getAll={getAllOrders}
          getLength={getLengthOrders}
        />
)

function App() {
  return (
    <Routes>

      <Route path="/" element={<Building />} />

      <Route path={"/articles"} element={article}/>
      <Route path={"/articles/:id"} element={article}/>

      <Route path="/customers" element={customer}/>
      <Route path="/customers/:id" element={customer}/>

      <Route path="/providers" element={provider}/>
      <Route path="/providers/:id" element={provider}/>

      <Route path="/orders" element={orders}/>
      <Route path="/orders/:id" element={orders}/>

      <Route path="/countries" element={
        <Items
          columns={Country.columns}
          title={'Countries'}
          singleTitle='country'
          getAll={getAllCountries}
          getLength={getLengthCountries}
        />}
      />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
