// React imports
import React, { useEffect } from "react";

// Third-party imports
import { useSelector, useDispatch } from "react-redux";
import { CssBaseline, Container } from "@material-ui/core";

// Local imports
import CitySetter from "./weather/components/CitySetter";
import WeatherForecast from "./weather/components/WeatherForecast";
import "./App.css";
import {
  useGetWeatherByCityQuery,
  useGetWeatherByLocationQuery,
} from "./services/weather";
import { setUserWeatherInfo } from "./weather/weatherSlice";

function App() {
  const  dispatch = useDispatch();
  const city = useSelector((state) => state.weather.city);
  const location = useSelector((state) => state.weather.location);
  // const tempUnit = useSelector((state) => state.weather.tempUnit);
  // const pageIndex = useSelector((state) => state.weather.pageIndex);
  // const selecetedWeatherItem = useSelector(
  //   (state) => state.weather.selecetedWeatherItem
  // );
  const weatherInfo = useSelector((state) => state.weather);
  let getWeatherQuery = () =>
    location
      ? () => useGetWeatherByLocationQuery(location)
      : () => useGetWeatherByCityQuery(city);

  useEffect(() => {
    const _weatherInfo = JSON.parse(window.localStorage.getItem("_weatherInfo"));
    console.log(`_weatherInfo`, _weatherInfo);
    dispatch(setUserWeatherInfo(weatherInfo));
    // window.localStorage.getItem("city", city);
    // window.localStorage.getItem("location", location);
    // window.localStorage.getItem("tempUnit", tempUnit);
    // window.localStorage.getItem("pageIndex", pageIndex);
    // window.localStorage.getItem("selectedWeatherItem", selecetedWeatherItem);
    return () => {
      console.log(`_weatherInfo`, _weatherInfo)
      window.localStorage.setItem("_weatherInfo", JSON.stringify(_weatherInfo));
      // window.localStorage.setItem("city", city);
      // window.localStorage.setItem("location", location);
      // window.localStorage.setItem("tempUnit", tempUnit);
      // window.localStorage.setItem("pageIndex", pageIndex);
      // window.localStorage.setItem("selectedWeatherItem", selecetedWeatherItem);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Weather Forecast</h2>
      </header>
      <CssBaseline />
      <Container maxWidth="sm" style={{ padding: 10 }}>
        <CitySetter />
        <button onClick={getWeatherQuery}>Refresh</button>
        {(city || location) && (
          <WeatherForecast getWeatherQuery={getWeatherQuery()} />
        )}
      </Container>
    </div>
  );
}

export default App;
