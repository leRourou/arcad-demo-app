import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavBar from './components/navbar.js';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

/**
 * @module index
 */

const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * @type {Array<{name: string, link: string}>}
 * @description - The routes of the application.
 */
const routes = [
  { name: "Home", link: "/" },
  { name: "Orders", link: "/orders" },
  { name: "Articles", link: "/articles" },
  { name: "Customers", link: "/customers" },
  { name: "Providers", link: "/providers" },
  { name: "Countries", link: "/countries" },
  { name: "VAT", link: "/vat" },
  { name: "About", link: "/about" }
];

/**
 * @description - The index component of the application. 
 * @returns {JSX.Element} - The index component containeing the provider, browser router, navbar, toast container and the app component.
 */
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <NavBar routes={routes} />
        <ToastContainer 
          hideProgressBar
          theme="colored"
        />
        <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Measure performance
reportWebVitals();
