import React from 'react';
import { Link } from "react-router-dom";

export default () => (
  <div className="bounds">
    <h1>Forbidden</h1>
    <p>Oh oh! You can't access this page.</p>
    <Link className="button button-secondary" to="/">
        Return to List
    </Link>
  </div>
);