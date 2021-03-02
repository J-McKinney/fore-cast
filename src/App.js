// import React, { useEffect, useState } from "react";
// import logo from "./logo.svg";
// import "./App.css";
// require("dotenv").config();

// const GKey = process.env.REACT_APP_GKEY;
// const WKey = process.env.REACT_APP_WKEY;

// function App() {
//   const [currentLocation, setCurrentLocation] = useState({});

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         let coordinates = pos.coords;
//         setCurrentLocation(coordinates);
//         console.log(coordinates);
//       },
//       (err) => {
//         console.warn(`Error(${err.code}): ${err.message}`);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0,
//       }
//     );
//   }, []);

//   useEffect(() => {
//     async function getOneCallData(WKey, position) {
//       let lat = position.latitude;
//       let lon = position.longitude;
//       const oneCallAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${process.env.REACT_APP_WKEY}`;
//       let res = await fetch(oneCallAPI);
//       let data = await res.json();
//       console.log("WeatherCode: " + data);
//     }

//     async function getReverseGeocodingData(GKey, position) {
//       let lat = position.latitude;
//       let lon = position.longitude;
//       const reverseGeocodingAPI = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${process.env.REACT_APP_GKEY}`;
//       let res = await fetch(reverseGeocodingAPI);
//       let data = await res.json();
//       console.log("GeoCode: " + data);
//     }

//     if (typeof currentLocation.latitude != "undefined") {
//       console.log();
//       getOneCallData(process.env.REACT_APP_WKEY.oneCall, currentLocation);
//       getReverseGeocodingData(
//         process.env.REACT_APP_GKEY.reverseGeocoding,
//         currentLocation
//       );
//     }
//   }, [currentLocation]);

//   return (
//     <>
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <button onClick={() => console.log(currentLocation)}>
//             Show Coordinates
//           </button>
//         </header>
//       </div>
//     </>
//   );
// }

// export default App;

import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
require("dotenv").config();

// const GKey = process.env.REACT_APP_GKEY;
const WKey = process.env.REACT_APP_WKEY;

class App extends Component {
  state = {
    lat: "",
    lon: "",
    weatherResults: "",
  };

  componentDidMount() {
    // console.log("GKey: " + GKey)
    // console.log("WKey: " + WKey)
  }

  componentDidUpdate() {
    console.log("Update Lat: " + this.state.lat);
    console.log("Update Lon: " + this.state.lon);
  }

  coordinatesButton = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        let coordinates = pos.coords;
        this.setState({ lat: coordinates.latitude });
        this.setState({ lon: coordinates.longitude });
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
  };

  //`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${process.env.REACT_APP_WKEY}`;
  //`https://api.openweathermap.org/data/2.5/onecall?lat=33.9705856&lon=-84.4857344&exclude=minutely,alerts&appid=7c9fcccfb24695a473809f8f4e32421c`;
  weatherButton = (e) => {
    e.preventDefault();
    console.log("Weather Button: ");
    if (this.state.lat !== "undefined") {
      console.log("Yeah");
      const getOneCallData =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        this.state.lat +
        "&lon=" +
        this.state.lon +
        "&exclude=alerts&appid=" +
        WKey;
      axios
        .get(getOneCallData)
        .then((res) => {
          // console.log(res);
          this.setState({ weatherResults: res })
          console.log(this.state.weatherResults);
          return axios.get(getOneCallData);
        })
        .catch((error) => {
          console.log("My Bad Error: " + error);
        });
    } else {
      console.log("Something Went Wrong");
    }
  };

  render() {
    return (
      <>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <button onClick={this.coordinatesButton}>Find Coordinates</button>
            <br />
            <button onClick={this.weatherButton}>See Local Weather</button>
          </header>
        </div>
      </>
    );
  }
}

export default App;
