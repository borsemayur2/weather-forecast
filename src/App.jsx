import React from "react";
import "./App.css";
import CitySetter from "./weather/components/CitySetter";
import { CssBaseline, Container } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Weather Forecast</h2>
      </header>
      <CssBaseline />
      <Container maxWidth="sm" style={{ backgroundColor: "aliceblue" }}>
        <CitySetter />
      </Container>
    </div>
  );
}

export default App;
