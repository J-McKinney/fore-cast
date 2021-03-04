import React, { useEffect, useState } from "react";
import "./App.css";
require("dotenv").config();

function App() {
  const [currentLocation, setCurrentLocation] = useState({});
  const [cityInfo, setCityInfo] = useState({});
  const [forecast, setForecast] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        let coordinates = pos.coords;
        setCurrentLocation(coordinates);
        console.log("coordinates: ", coordinates);
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

  useEffect(() => {
    async function fetchData(APIKey, APIName, position, stateFunction) {
      let lat = position.latitude;
      let lon = position.longitude;
      let APICall;

      switch (APIName) {
        case "oneCall":
          APICall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${process.env.REACT_APP_WKEY}`;
          break;
        case "reverseGeocoding":
          APICall = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&result_type=political&key=${process.env.REACT_APP_GKEY}`;
          break;
        default:
          APICall = "";
          break;
      }

      let response = await fetch(APICall);
      let data = await response.json();
      APIName === "reverseGeocoding"
        ? stateFunction(data.results[0].address_components)
        : stateFunction(data);
    }

    if (typeof currentLocation.latitude !== "undefined") {
      fetchData(
        process.env.REACT_APP_WKEY.oneCall,
        "oneCall",
        currentLocation,
        setForecast
      );
      fetchData(
        process.env.REACT_APP_GKEY.reverseGeocoding,
        "reverseGeocoding",
        currentLocation,
        setCityInfo
      );
    }
  }, [currentLocation]);

  return (
    <>
      {typeof forecast.current !== "undefined" &&
      typeof cityInfo[1] !== "undefined" ? (
        <section>
          <h3>Temp: {forecast.current.temp} Fehrenheit</h3>
          <h5>Humidity: {forecast.current.humidity} %</h5>
          <h5>Wind Speed: {forecast.current.wind_speed} m/s</h5>
          <h3>
            {cityInfo[1].long_name}, {cityInfo[3].short_name}
          </h3>
        </section>
      ) : (
        ""
      )}
    </>
  );
}

export default App;

// import React, { Component } from "react";
// import axios from "axios";
// import logo from "./logo.svg";
// import "./App.css";
// require("dotenv").config();

// class App extends Component {
//   state = {
//     weatherResults: "",
//     temp: "",
//     windSpeed: "",
//     weatherDescription: "",
//     geocodeResults: "",
//     lat: "",
//     lon: "",
//     cityInfo: "",
//   };

//   componentDidMount() {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         let coordinates = pos.coords;
//         this.setState({ lat: coordinates.latitude });
//         this.setState({ lon: coordinates.longitude });
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
//   }

//   componentDidUpdate() {}

//   // NEED TO CLEAN UP THIS CODE AND MAKE IT MORE SIMPLE AND NOT SO LONG/////////////////////////////////////////////
//   weatherButton = (e) => {
//     e.preventDefault();
//     if (this.state.lat !== "undefined") {
//       const getOneCallData =
//         // openweather API
//         "https://api.openweathermap.org/data/2.5/onecall?lat=" +
//         this.state.lat +
//         "&lon=" +
//         this.state.lon +
//         "&units=imperial&exclude=minutely,alerts&appid=" +
//         process.env.REACT_APP_WKEY;
//       axios
//         .get(getOneCallData)
//         .then((res) => {
//           //setting the res to weather state
//           this.setState({ weatherResults: res });
//           // Logging the weather information
//           console.log(res.data.current.temp); // Need to set weather info to state////////////////////////////////////
//           console.log(res.data.current.weather[0].description);
//           console.log(res.data.current.wind_speed);
//           return axios.get(getOneCallData);
//         })
//         .catch((error) => {
//           console.log("OpenWeather Error: " + error);
//         });
//     }

//     if (this.state.lat !== "undefined") {
//       const reverseGeocoding =
//         "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
//         this.state.lat +
//         "," +
//         this.state.lon +
//         "&key=" +
//         process.env.REACT_APP_GKEY;
//       axios
//         .get(reverseGeocoding)
//         .then((res) => {
//           //setting the res to geocode state
//           this.setState({ geocodeResults: res }); // Need to set city info to state//////////////////////////////////////
//           // Logging the geocode information
//           console.log(res.data.results[0].address_components);
//           console.log(res.data.results[0].address_components[2].long_name);
//           console.log(res.data.results[0].address_components[4].short_name);
//           console.log(res.data.results[0].address_components[6].long_name);
//           return axios.get(reverseGeocoding);
//         })
//         .catch((error) => {
//           console.log("Google Error Oops!!! " + error);
//         });
//     } else {
//       console.log("Something Went Wrong!!!");
//     }
//   };

//   render() {
//     return (
//       <>
//         <div className="App">
//           <header className="App-header">
//             <img src={logo} className="App-logo" alt="logo" />
//             <p>
//               Edit <code>src/App.js</code> and save to reload.
//             </p>
//             <br />
//             <button onClick={this.weatherButton}>See Local Weather</button>
//           </header>
//         </div>
//       </>
//     );
//   }
// }

// export default App;
