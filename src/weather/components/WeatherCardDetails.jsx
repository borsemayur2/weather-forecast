import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Avatar,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedWeatherItem } from "../weatherSlice";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 280,
  },
  listRoot: {
    width: "100%",
    maxWidth: 280,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const WeatherCardDetails = ({ weatherItem, selectedWeatherItem }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const tempUnit = useSelector((state) => state.weather.tempUnit);

  const unit = tempUnit === "celsius" ? "°C" : "°F";

  const [openTemperature, setOpenTemperature] = React.useState(false);
  const [openPressure, setOpenPressure] = React.useState(false);
  const [openHumidity, setOpenHumidity] = React.useState(false);

  const handleClickTemperature = () => {
    setOpenTemperature(!openTemperature);
  };
  const handleClickPressure = () => {
    setOpenPressure(!openPressure);
  };
  const handleClickHumidity = () => {
    setOpenHumidity(!openHumidity);
  };

  function getWindDirection(degree) {
    const directions = ["N", "NW", "W", "SW", "S", "SE", "E", "NE"];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  }

  return (
    <Grid item key={weatherItem.date}>
      <Paper
        elevation={selectedWeatherItem?.date === weatherItem.date ? 8 : 1}
        className={classes.paper}
      >
        <List className={classes.listRoot}>
          <ListItem
            button
            onClick={() => {
              dispatch(
                setSelectedWeatherItem({
                  selectedWeatherItem: weatherItem,
                })
              );
            }}
          >
            <ListItemIcon></ListItemIcon>
            <ListItemText primary={weatherItem.date} secondary="Date" />
          </ListItem>
          <ListItem button onClick={handleClickTemperature}>
            <ListItemIcon>
              <Avatar
                alt="Temp"
                src="https://openweathermap.org/img/wn/10d@2x.png"
              />
            </ListItemIcon>
            <ListItemText
              primary={`${weatherItem.average.main.temp}${unit}`}
              secondary="Temperature"
            />
            {openTemperature ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openTemperature} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <ListItemText
                  primary={`${weatherItem.average.main.feels_like}${unit}`}
                  secondary="Feels"
                />
                <ListItemText
                  primary={`${weatherItem.average.main.temp_min}${unit}`}
                  secondary="Min"
                />
                <ListItemText
                  primary={`${weatherItem.average.main.temp_max}${unit}`}
                  secondary="Max"
                />
              </ListItem>
            </List>
          </Collapse>
          <Divider />
          <ListItem button onClick={handleClickPressure}>
            <ListItemIcon></ListItemIcon>
            <ListItemText
              primary={`${weatherItem.average.main.pressure}hPa`}
              secondary={"Pressure"}
            />
            {openPressure ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openPressure} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <ListItemText
                  primary={`${weatherItem.average.main.sea_level}hPa`}
                  secondary={"Sea Level"}
                />
                <ListItemText
                  primary={`${weatherItem.average.main.grnd_level}hPa`}
                  secondary={"Ground Level"}
                />
              </ListItem>
            </List>
          </Collapse>
          <Divider />
          <ListItem button onClick={handleClickHumidity}>
            <ListItemIcon></ListItemIcon>
            <ListItemText
              primary={`${weatherItem.average.main.humidity}%`}
              secondary={"Humidity"}
            />
            {openHumidity ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openHumidity} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <ListItemText
                  primary={`${weatherItem.average.clouds.all}%`}
                  secondary={"Cloudiness"}
                />
                <ListItemText
                  primary={`${weatherItem.average.pop}%`}
                  secondary={"Precipitation"}
                />
              </ListItem>
            </List>
          </Collapse>
          <Divider />
          <ListItem
            button
            onClick={() => {
              dispatch(
                setSelectedWeatherItem({
                  selectedWeatherItem: weatherItem,
                })
              );
            }}
          >
            <ListItemIcon></ListItemIcon>
            <ListItemText
              primary={`${weatherItem.average.wind.speed}mph ${getWindDirection(
                weatherItem.average.wind.deg
              )}
        `}
              secondary={"Wind"}
            />
          </ListItem>
          <Divider />
          <ListItem
            button
            onClick={() => {
              dispatch(
                setSelectedWeatherItem({
                  selectedWeatherItem: weatherItem,
                })
              );
            }}
          >
            <ListItemIcon></ListItemIcon>
            <ListItemText
              primary={`${weatherItem.average.visibility / 1000}KM`}
              secondary={"Visibility"}
            />
          </ListItem>
        </List>
      </Paper>
    </Grid>
  );
};

export default WeatherCardDetails;
