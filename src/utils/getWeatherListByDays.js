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
      },
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
