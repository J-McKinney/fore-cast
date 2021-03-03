// import React, { useEffect, useState } from "react";
// import logo from "./logo.svg";
// import "./App.css";
// require("dotenv").config();

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

//     if (typeof currentLocation.latitude !== "undefined") {
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

class App extends Component {
  state = {
    lat: "",
    lon: "",
    weatherResults: "",
    geocodeResults: "",
  };

  componentDidMount() {
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
  }

  componentDidUpdate() {
    console.log("Updated Component: " + this.state.lat)
    console.log("Updated Component: " + this.state.lon)
  }

  weatherButton = (e) => {
    e.preventDefault();
    if (this.state.lat !== "undefined") {
      const getOneCallData =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        this.state.lat +
        "&lon=" +
        this.state.lon +
        "&units=imperial&exclude=minutely,alerts&appid=" +
        process.env.REACT_APP_WKEY;
      axios
        .get(getOneCallData)
        .then((res) => {
          this.setState({ weatherResults: res });
          console.log(this.state.weatherResults.data);
          return axios.get(getOneCallData);
        })
        .catch((error) => {
          console.log("OpenWeather Error: " + error);
        });
    } else {
      console.log("Something Weather Went Wrong!!!");
    }
  };

  cityButton = (e) => {
    e.preventDefault();
    if (this.state.lat !== "undefined") {
      const reverseGeocoding =
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        this.state.lat +
        "," +
        this.state.lon +
        "&key=" +
        process.env.REACT_APP_GKEY;
      axios
        .get(reverseGeocoding)
        .then((res) => {
          this.setState({ geocodeResults: res });
          console.log(this.state.geocodeResults);
          return axios.get(reverseGeocoding);
        })
        .catch((error) => {
          console.log("Google Error Oops!!! " + error);
        });
    } else {
      console.log("Something Google Went Wrong!!!");
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
            <br />
            <button onClick={this.weatherButton}>See Local Weather</button>
            <br />
            <button onClick={this.cityButton}>See Your City</button>
          </header>
        </div>
      </>
    );
  }
}

export default App;
