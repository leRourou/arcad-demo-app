import React from "react";
import NotFound from "./views/misc/notFoundView.js";
import Building from "./views/misc/buildingView";
import Items from "./views/itemsDataView.js";
import About from "./views/misc/aboutView.js";
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

import { Familly } from "./classes/models/familly.js";
import { getAllFamilies, getLengthFamilies } from "./services/famillyServices.js";

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
          getLength={getLengthArticles}
        />}
      />

      <Route path="/customers" element={
        <Items
          columns={Customer.columns}
          title={'Customers'}
          singleTitle='customer'
          getAll={getAllCustomers}
          getLength={getLengthCustomers}
        />}
      />

      <Route path="/" element={<Building />} />

      <Route path="/families" element={
        <Items
          columns={Familly.columns}
          title={'Families'}
          singleTitle='familly'
          getAll={getAllFamilies}
          getLength={getLengthFamilies}
        />}
      />

      <Route path="/providers" element={
        <Items
          columns={Provider.columns}
          title={'Providers'}
          singleTitle='provider'
          getAll={getAllProviders}
          getLength={getLengthProviders}
        />}
      />

      <Route path="/countries" element={
        <Items
          columns={Country.columns}
          title={'Countries'}
          singleTitle='country'
          getAll={getAllCountries}
          getLength={getLengthCountries}
        />}
      />


      <Route path="/about" element={<About />} />

      <Route path="/orders" element={<Building />} />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
