import React from 'react';

function Loader() {
  return (
    <div className="energy-loader" role="status">
      <div className="loader">
        <div className="inner-circle"></div>
        <div className="outer-circle"></div>
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
}

export default Loader;
