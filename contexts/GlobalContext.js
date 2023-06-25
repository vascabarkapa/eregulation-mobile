import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [liveTemperature, setLiveTemperature] = useState(0);
    const [liveHumidity, setLiveHumidity] = useState(0);

    const [minTemperature, setMinTemperature] = useState(18);
    const [maxTemperature, setMaxTemperature] = useState(24);

    const [minHumidity, setMinHumidity] = useState(40);
    const [maxHumidity, setMaxHumidity] = useState(60);

    const [isTurnedOnTemperatureRegulation, setIsTurnedOnTemperatureRegulation] = useState(null);
    const [isTurnedOnHumidityRegulation, setIsTurnedOnHumidityRegulation] = useState(null);


    return (
        <GlobalContext.Provider
            value={{
                liveTemperature,
                setLiveTemperature,
                liveHumidity,
                setLiveHumidity,
                minTemperature,
                setMinTemperature,
                maxTemperature,
                setMaxTemperature,
                minHumidity,
                setMinHumidity,
                maxHumidity,
                setMaxHumidity,
                isTurnedOnTemperatureRegulation,
                setIsTurnedOnTemperatureRegulation,
                isTurnedOnHumidityRegulation,
                setIsTurnedOnHumidityRegulation
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
