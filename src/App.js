import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
require("dotenv").config();

// const GKey = process.env.REACT_APP_GKEY;
// const WKey = process.env.REACT_APP_WKEY;

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

  // useEffect(() => {
  //   async function getOneCallData(WKey, position) {
  //     let lat = position.latitude;
  //     let lon = position.longitude;

  //     const oneCallAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${WKey}`;

  //     let res = await fetch(oneCallAPI);
  //     let data = await res.json();

  //     console.log("WeatherCode: " + data);
  //   }

  //   async function getReverseGeocodingData(GKey, position) {
  //     let lat = position.latitude;
  //     let lon = position.longitude;

  //     const reverseGeocodingAPI = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GKey}`;

  //     let res = await fetch(reverseGeocodingAPI);
  //     let data = await res.json();

  //     console.log("GeoCode: " + data);
  //   }

  //   if (typeOf currentLocation.latitude != "undefined") {
  //     getOneCallData(keys.oneCall, currentLocation);
  //     getReverseGeocodingData(keys.reverseGeocoding, currentLocation)
  //   }
  // }, [currentLocation]);

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
