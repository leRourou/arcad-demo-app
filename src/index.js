import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavBar from './components/navbar.js';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById('root'));

const ROUTES = [
  { name: "Home", link: "/" },
  { name: "Orders", link: "/orders" },
  { name: "Articles", link: "/articles" },
  { name: "Customers", link: "/customers" },
  { name: "Providers", link: "/providers" },
  { name: "Countries", link: "/countries" }
];

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar routes={ROUTES} />
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
