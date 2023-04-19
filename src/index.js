import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/Navbar.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const routes = [
  { name: "Home", link: "/" },
  { name: "Products", link: "/products" },
  { name: "Customers", link: "/customers" },
  { name: "Orders", link: "/commands" },
  { name: "About", link: "/about" },
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
