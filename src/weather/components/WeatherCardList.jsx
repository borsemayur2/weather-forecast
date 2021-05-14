import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import WeatherCardDetails from "./WeatherCardDetails";
import { setSelectedWeatherItem } from "../weatherSlice";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
}));

const WeatherCardList = ({ weatherItems }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

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
    <Grid container className={classes.root} spacing={1}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={1}>
          {weatherItems.map((weatherItem) => (
            <WeatherCardDetails
              weatherItem={weatherItem}
              selectedWeatherItem={selectedWeatherItem}
              key={weatherItem.date}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WeatherCardList;
