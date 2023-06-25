function parseConfigData(message) {
  const values = message.split("-");

  const liveTemperature = parseInt(values[1]);
  const isTurnedOnTemperatureRegulation = parseInt(values[2]);
  const minTemperature = parseInt(values[3]);
  const maxTemperature = parseInt(values[4]);

  const liveHumidity = parseInt(values[6]);
  const isTurnedOnHumidityRegulation = parseInt(values[7]);
  const minHumidity = parseInt(values[8]);
  const maxHumidity = parseInt(values[9]);

  return {
    liveTemperature,
    isTurnedOnTemperatureRegulation,
    minTemperature,
    maxTemperature,
    liveHumidity,
    isTurnedOnHumidityRegulation,
    minHumidity,
    maxHumidity
  };
}

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
  parseConfigData,
  parseLiveTemperatureAndHumidity
}

export default Regex;
