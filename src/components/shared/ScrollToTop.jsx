import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    console.log('running');
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-10 right-12 transition-all duration-200">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-[#224f2d] text-white p-3 rounded-full shadow-lg hover:bg-[#2b6338] transition duration-300">
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
