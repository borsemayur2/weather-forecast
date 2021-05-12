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
    height: 140,
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

  return (
    <>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={3}>
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
                  <p>Date: {weatherItem.date}</p>
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
