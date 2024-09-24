import React from 'react';
import ReactDOM from 'react-dom';
// import './Tooltip.css'; // Create this CSS file for styling

const Tooltip = ({ children, position }) => {
  return ReactDOM.createPortal(
    <div className="tooltip" style={{ top: position.top, left: position.left }}>
      {children}
    </div>,
    document.body
  );
};

export default Tooltip;
