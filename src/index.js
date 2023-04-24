import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/Navbar.js';

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
        <NavBar routes={routes}/>
        <App/>
      </BrowserRouter>
  </React.StrictMode>
);

// Measure performance
reportWebVitals();
