import React, { useEffect, useState } from 'react';
import { useOnlineStatusContext } from '../../context/onlineConnectionContext';

const ConnectionStatusNotification = () => {
  const isOnline = useOnlineStatusContext();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  }, [isOnline]);

  const handleClose = () => {
    setShowNotification(false);
  };

  if (!showNotification && isOnline) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-red-600 text-white text-center transition-opacity duration-500 ease-in-out z-50 ${
        showNotification ? 'opacity-100' : 'opacity-0'
      }`}>
      <div className="p-2">
        {isOnline ? 'Back online' : 'You are offline'}
        {!isOnline && (
          <button
            type="button"
            onClick={handleClose}
            className="ml-4 bg-white text-red-600 px-4 py-1 rounded-full">
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default ConnectionStatusNotification;
