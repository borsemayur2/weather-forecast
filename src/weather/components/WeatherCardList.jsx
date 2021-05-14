import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedWeatherItem } from "../weatherSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 260,
    width: 160,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const WeatherCardList = ({ weatherItems }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const tempUnit = useSelector((state) => state.weather.tempUnit);
  const selectedWeatherItem = useSelector(
    (state) => state.weather.selectedWeatherItem
  );

  useEffect(() => {
    if (selectedWeatherItem) {
      const _selectedWeatherItem = weatherItems.find((weatherItem) => {
        return weatherItem.date === selectedWeatherItem.date;
      });
      if (_selectedWeatherItem) {
        dispatch(
          setSelectedWeatherItem({ selectedWeatherItem: _selectedWeatherItem })
        );
      }
    }
  }, [weatherItems]);

  function getWindDirection(degree) {
    const directions = ["N", "NW", "W", "SW", "S", "SE", "E", "NE"];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  }

  return (
    <>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={4}>
            {weatherItems.map((weatherItem) => (
              <Grid key={weatherItem.date} item>
                <Paper
                  className={classes.paper}
                  onClick={() => {
                    dispatch(
                      setSelectedWeatherItem({
                        selectedWeatherItem: weatherItem,
                      })
                    );
                  }}
                >
                  <img
                    src={"https://openweathermap.org/img/wn/10d@2x.png"}
                    height={50}
                    width={50}
                  />
                  {selectedWeatherItem &&
                    weatherItem.date === selectedWeatherItem.date &&
                    "Selected"}
                  <p>
                    Temp:{" "}
                    {tempUnit === "celsius"
                      ? `${weatherItem.average.main.temp}°C`
                      : `${weatherItem.average.main.temp}°F`}
                  </p>
                  <p>TrueFeel: {weatherItem.average.main.feels_like}</p>
                  <p>Min: {weatherItem.average.main.temp_min}</p>
                  <p>Max: {weatherItem.average.main.temp_max}</p>

                  <p>Pressure: {weatherItem.average.main.pressure}hPa</p>
                  <p>Sea Level: {weatherItem.average.main.sea_level}hPa</p>
                  <p>Ground Level: {weatherItem.average.main.grnd_level}hPa</p>
                  <p>Humidity: {weatherItem.average.main.humidity}%</p>
                  <p>
                    Wind:
                    {weatherItem.average.wind.speed}mph{" "}
                    {getWindDirection(weatherItem.average.wind.deg)}
                  </p>
                  <p>Cloudiness: {weatherItem.average.clouds.all}%</p>
                  <p>Visibility: {weatherItem.average.visibility / 1000}KM</p>
                  <p>Precipitation: {weatherItem.average.pop}</p>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default WeatherCardList;
