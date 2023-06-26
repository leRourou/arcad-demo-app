import React from "react";
import NotFound from "./views/misc/notFoundView.js";
import Items from "./views/itemsDataView.js";
import { Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import WelcomeView from "./views/welcomeView.js";

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

const ARTICLE = (
  <Items
          columns={Article.getColumns}
          title={'Articles'}
          singleTitle='article'
          getAll={getAllArticles}
          getLength={getLengthArticles}
        />
)

const CUSTOMER = (
  <Items
          columns={Customer.getColumns}
          title={'Customers'}
          singleTitle='customer'
          getAll={getAllCustomers}
          getLength={getLengthCustomers}
        />
)

const PROVIDER = (
  <Items
          columns={Provider.getColumns}
          title={'Providers'}
          singleTitle='provider'
          getAll={getAllProviders}
          getLength={getLengthProviders}
        />
)

const ORDERS = (
  <Items
          columns={Order.getColumns}
          title={'Orders'}
          singleTitle='order'
          getAll={getAllOrders}
          getLength={getLengthOrders}
        />
)

function App() {
  return (
    <Routes>

      <Route path="/" element={<WelcomeView />} />

      <Route path={"/articles"} element={ARTICLE}/>
      <Route path={"/articles/:id"} element={ARTICLE}/>

      <Route path="/customers" element={CUSTOMER}/>
      <Route path="/customers/:id" element={CUSTOMER}/>

      <Route path="/providers" element={PROVIDER}/>
      <Route path="/providers/:id" element={PROVIDER}/>

      <Route path="/orders" element={ORDERS}/>
      <Route path="/orders/:id" element={ORDERS}/>

      <Route path="/countries" element={
        <Items
          columns={Country.getColumns}
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
