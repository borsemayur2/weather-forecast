// React imports
import React, { useState } from "react";

// Third-party imports
import { useSelector } from "react-redux";
import { CssBaseline, Container } from "@material-ui/core";

// Local imports
import CitySetter from "./weather/components/CitySetter";
import WeatherForecast from "./weather/components/WeatherForecast";
import "./App.css";
import {
  useGetWeatherByCityQuery,
  useGetWeatherByLocationQuery,
} from "./services/weather";

function App() {
  const city = useSelector((state) => state.weather.city);
  const location = useSelector((state) => state.weather.location);
  let getWeatherQuery = () =>
    location
      ? () => useGetWeatherByLocationQuery(location)
      : () => useGetWeatherByCityQuery(city);

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
