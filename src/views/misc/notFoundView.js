import React from "react";
import { Link } from 'react-router-dom';

document.title = "404 Error"

// 404 Page
export default function NotFoundView() {
  return (
    <div className="not-found-view">
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to='/'>Return to the home Page</Link>
    </div>
  );
}