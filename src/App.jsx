// React imports
import React from "react";

// Third-party imports
import { useSelector } from "react-redux";
import { CssBaseline, Container } from "@material-ui/core";

// Local imports
import CitySetter from "./weather/components/CitySetter";
import WeatherForecast from "./weather/components/WeatherForecast";
import "./App.css";

function App() {
  const city = useSelector((state) => state.weather.city);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Weather Forecast</h2>
      </header>
      <CssBaseline />
      <Container maxWidth="sm" style={{ backgroundColor: "#ECECEC" }}>
        <CitySetter />
        {city && <WeatherForecast city={city} />}
      </Container>
    </div>
  );
}

export default App;
