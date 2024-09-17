import React from 'react';

function Title({ text, type, ...props }) {
  switch (type) {
    case 'h1':
      return (
        <h1 className="text-[#1E4A28] font-bold" {...props}>
          {text}
        </h1>
      );
    case 'h2':
      return (
        <h2 className="text-[#1E4A28]" {...props}>
          {text}
        </h2>
      );
    case 'h3':
      return (
        <h3 className="text-[#1E4A28] text-[20px]" {...props}>
          {text}
        </h3>
      );

    case 'p':
      return (
        <p className="text-[#1E4A28]" {...props}>
          {text}
        </p>
      );

    default:
      return (
        <h1 className="text-[#1E4A28]" {...props}>
          {text}
        </h1>
      );
  }
}

export default Title;
