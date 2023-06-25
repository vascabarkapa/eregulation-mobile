import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [liveTemperature, setLiveTemperature] = useState(0);
    const [liveHumidity, setLiveHumidity] = useState(0);

    return (
        <GlobalContext.Provider
            value={{
                liveTemperature,
                setLiveTemperature,
                liveHumidity,
                setLiveHumidity
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
