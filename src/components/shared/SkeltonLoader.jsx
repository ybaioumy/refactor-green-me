import React from 'react';

function SkeltonLoader() {
  return (
    <div role="status" className="max-w-2xl animate-pulse h-full mt-5 w-full">
      <div className="h-2.5 bg-gray-200 rounded-full w-[30%] mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full w-[90%] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full w-[100%] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full w-[80%] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full w-[70%] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full w-[90%]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default SkeltonLoader;
