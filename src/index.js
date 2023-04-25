import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavBar from './components/navbar.js';
import store from './store.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById('root'));

const routes = [
  { name: "Home", link: "/" },
  { name: "Orders", link: "/orders" },
  { name: "Articles", link: "/articles" },
  { name: "Customers", link: "/customers" },
  { name: "About", link: "/about" }
];

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <NavBar routes={routes} />
        <ToastContainer 
        hideProgressBar
        theme="colored"
        />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// Measure performance
reportWebVitals();
