import React from 'react';
import { Link } from 'react-router-dom';

const homepage = () => {
  return (
    <div className="full-page">
      <h1>Welcome to the Language Translator App</h1>
      <Link to="/language-selection">
        <button className="btn">Try Now</button>
      </Link>
    </div>
  );
};

export default homepage;
