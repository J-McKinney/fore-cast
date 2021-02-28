import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

// "https://api.openweathermap.org/data/2.5/weather?q=Atlanta,Georgia&units=imperial&appid=166a433c57516f51dfab1f7edaed8413"

function App() {
  const [currentLocation, setCurrentLocation] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        let coordinates = pos.coords;
        setCurrentLocation(coordinates);
      },
      (err) => {
        console.warn(`Error(${err.code}): ${err.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, []);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={() => console.log(currentLocation)}>
            Show Coordinates
          </button>
        </header>
      </div>
    </>
  );
}

export default App;
