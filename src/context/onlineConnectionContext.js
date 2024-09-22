// context/OnlineStatusContext.js
import React, { createContext, useContext } from 'react';
import useOnlineStatus from '../hooks/useInternetConnection';
const OnlineStatusContext = createContext();

export const OnlineStatusProvider = ({ children }) => {
    const isOnline = useOnlineStatus();

    return (
        <OnlineStatusContext.Provider value={isOnline}>
            {children}
        </OnlineStatusContext.Provider>
    );
};

export const useOnlineStatusContext = () => useContext(OnlineStatusContext);
