function parseConfigData(message) {
  const values = message.split("-");

  const liveTemperature = Math.round(values[1]);
  const isTurnedOnTemperatureRegulation = parseInt(values[2]);
  const minTemperature = parseInt(values[3]);
  const maxTemperature = parseInt(values[4]);

  const liveHumidity = Math.round(values[6]);
  const isTurnedOnHumidityRegulation = parseInt(values[7]);
  const minHumidity = parseInt(values[8]);
  const maxHumidity = parseInt(values[9]);

  const liveLight = parseInt(values[11]);

  return {
    liveTemperature,
    isTurnedOnTemperatureRegulation,
    minTemperature,
    maxTemperature,
    liveHumidity,
    isTurnedOnHumidityRegulation,
    minHumidity,
    maxHumidity,
    liveLight
  };
}

function parseLiveData(message) {
  const values = message.split("-");
  const temperature = Math.round(values[1]);
  const humidity = Math.round(values[3]);
  const light = values[5];

  return {
    temperature,
    humidity,
    light
  };
}

const Regex = {
  parseConfigData,
  parseLiveData
}

export default Regex;
