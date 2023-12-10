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
  const temperature = values[1];
  const humidity = values[3];
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
