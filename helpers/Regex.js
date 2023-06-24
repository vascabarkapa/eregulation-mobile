function parseLiveTemperatureAndHumidity(message) {
    const values = message.split("-");
    const temperature = values[1];
    const humidity = values[3];
  
    return {
      temperature,
      humidity
    };
  }

  const Regex = {
    parseLiveTemperatureAndHumidity
  }

  export default Regex;
  