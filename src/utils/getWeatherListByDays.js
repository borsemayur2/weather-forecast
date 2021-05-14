import moment from "moment";
import _ from "lodash";
import getTempByUnit from "./getTempByUnit";

export const getWeatherListByDays = (weatherData, tempUnit) => {
  const weatherGroupedByDate = _.groupBy(weatherData, (weather) => {
    const formattedDateAcc = moment(weather.dt_txt).format("DD MMM YY");
    return formattedDateAcc;
  });

  const getWeatherList = (value, key) => {
    const temperatures = _.map(value, (weather) => {
      const formattedTime = moment(weather.dt_txt).format("HH:SS");
      const tempByUnit = getTempByUnit(weather.main.temp, tempUnit);

      return {
        time: formattedTime,
        temp: tempByUnit,
      };
    });

    const getAverage = (segments) => {
      return Math.round(_.mean(segments));
    };

    const average = {
      main: {
        temp: getAverage(
          _.map(value, (segment) => getTempByUnit(segment.main.temp, tempUnit))
        ),
        temp_min: getAverage(
          _.map(value, (segment) =>
            getTempByUnit(segment.main.temp_min, tempUnit)
          )
        ),
        temp_max: getAverage(
          _.map(value, (segment) =>
            getTempByUnit(segment.main.temp_max, tempUnit)
          )
        ),
        feels_like: getAverage(
          _.map(value, (segment) =>
            getTempByUnit(segment.main.feels_like, tempUnit)
          )
        ),
        pressure: getAverage(_.map(value, (segment) => segment.main.pressure)),
        sea_level: getAverage(
          _.map(value, (segment) => segment.main.sea_level)
        ),
        grnd_level: getAverage(
          _.map(value, (segment) => segment.main.grnd_level)
        ),
        humidity: getAverage(_.map(value, (segment) => segment.main.humidity)),
      },
      wind: {
        speed: getAverage(_.map(value, (segment) => segment.wind.speed)),
        deg: getAverage(_.map(value, (segment) => segment.wind.deg)),
      },
      clouds: {
        all: getAverage(_.map(value, (segment) => segment.clouds.all)),
      },
      visibility: getAverage(_.map(value, (segment) => segment.visibility)),
      pop: getAverage(_.map(value, (segment) => segment.pop)),
    };

    return {
      date: key,
      average,
      temperatures,
    };
  };

  const weatherList = _.map(weatherGroupedByDate, getWeatherList);

  return weatherList;
};
