import React from "react";
import "./App.css";
import CitySetter from "./weather/components/CitySetter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Weather Forecast</h2>
      </header>
      <CitySetter />
    </div>
  );
}

export default App;
