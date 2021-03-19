// import React, { useEffect, useState } from "react";
// import "./App.css";
// require("dotenv").config();

// function App() {
//   const [currentLocation, setCurrentLocation] = useState({});
//   const [cityInfo, setCityInfo] = useState({});
//   const [forecast, setForecast] = useState({});

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         let coordinates = pos.coords;
//         setCurrentLocation(coordinates);
//         console.log("coordinates: ", coordinates);
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
//     async function fetchData(APIKey, APIName, position, stateFunction) {
//       let lat = position.latitude;
//       let lon = position.longitude;
//       let APICall;

//       switch (APIName) {
//         case "oneCall":
//           APICall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${process.env.REACT_APP_WKEY}`;
//           break;
//         case "reverseGeocoding":
//           APICall = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&result_type=political&key=${process.env.REACT_APP_GKEY}`;
//           break;
//         default:
//           APICall = "";
//           break;
//       }

//       let response = await fetch(APICall);
//       let data = await response.json();
//       APIName === "reverseGeocoding"
//         ? stateFunction(data.results[0].address_components)
//         : stateFunction(data);
//     }

//     if (typeof currentLocation.latitude !== "undefined") {
//       fetchData(
//         process.env.REACT_APP_WKEY.oneCall,
//         "oneCall",
//         currentLocation,
//         setForecast
//       );
//       fetchData(
//         process.env.REACT_APP_GKEY.reverseGeocoding,
//         "reverseGeocoding",
//         currentLocation,
//         setCityInfo
//       );
//     }
//   }, [currentLocation]);

//   return (
//     <>
//       {typeof forecast.current !== "undefined" &&
//       typeof cityInfo[1] !== "undefined" ? (
//         <section>
//           <h3>Temp: {forecast.current.temp} Fehrenheit</h3>
//           <h5>Humidity: {forecast.current.humidity} %</h5>
//           <h5>Wind Speed: {forecast.current.wind_speed} m/s</h5>
//           <h3>
//             {cityInfo[1].long_name}, {cityInfo[2].short_name}
//             {/* {console.log(cityInfo)} */}
//           </h3>
//         </section>
//       ) : (
//         ""
//       )}
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
    weatherResults: "",
    temp: "",
    humidity: "",
    windSpeed: "",
    weatherDescription: "",
    city: "",
    state: "",
    zip: "",
    geocodeResults: "",
    myLat: "",
    myLon: "",
    // sort_by: "distance", "rating"
    // price: "$", "$$", "$$$", "$$$$"
    // attributes: "open_to_all"
    placesToGolf: {},
    pickedGolfLat: "",
    pickedGolfLon: "",
    golfResults: {},
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        let coordinates = pos.coords;
        this.setState({ myLat: coordinates.latitude });
        this.setState({ myLon: coordinates.longitude });
        console.log(coordinates);
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

  componentDidUpdate() {}

  weatherButton = (e) => {
    e.preventDefault();
    if (this.state.myLat !== "undefined") {
      const weatherAPI =
        // Openweather API
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        this.state.myLat +
        "&lon=" +
        this.state.myLon +
        "&units=imperial&exclude=minutely,alerts&appid=" +
        process.env.REACT_APP_WKEY;
      axios
        .get(weatherAPI)
        .then((res) => {
          this.setState({
            weatherResults: res,
            temp: res.data.current.temp,
            humidity: res.data.current.humidity,
            weatherDescription: res.data.current.weather[0].description,
            windSpeed: res.data.current.wind_speed,
          });
          return axios.get(weatherAPI);
        })
        .catch((error) => {
          console.log(error);
        });
      // Reverse Geocoding API
      const reverseGeocoding =
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        this.state.myLat +
        "," +
        this.state.myLon +
        "&key=" +
        process.env.REACT_APP_GKEY;
      axios
        .get(reverseGeocoding)
        .then((res) => {
          this.setState({
            geocodeResults: res,
            city: res.data.results[0].address_components[2].long_name,
            state: res.data.results[0].address_components[4].short_name,
            zip: res.data.results[0].address_components[6].long_name,
          });
          return axios.get(reverseGeocoding);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Something Went Wrong!!!");
    }
  };

  yelpButton = (e) => {
    e.preventDefault();
    const yelpAPI = axios.get(
      `${"https://corsanywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YKEY}`,
        },
        params: {
          term: "golf",
          categories: "golf",
          limit: 50,
          radius: 40000,
          sort_by: "distance",
          // open_now will need to be set to true for the user
          // open_now: true,
          latitude: this.state.myLat,
          longitude: this.state.myLon,
        },
      }
    );
    return yelpAPI
      .then((res) => {
        this.setState({ placesToGolf: res.data.businesses });
        this.state.placesToGolf.forEach(function (item, key) {
          // console.log(key, item);
          console.log(
            "\n",
            "Key: " + key,
            "\n",
            "Lat: " + item.coordinates.latitude, // Each golf place's latitude
            "\n",
            "Lon: " + item.coordinates.longitude, // Each golf place's longitude
            "\n",
            "Name: " + item.name, // Each golf place's business name
            "\n",
            "Phone Number: " + item.display_phone, // Each golf place's phone number
            "\n",
            "Address: " +
              item.location.display_address[0] +
              ", " +
              item.location.display_address[1], // Each golf place's street address + city/state/zip
            "\n",
            "Rating: " + item.rating + "/5" // Each golf place's rating
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <button onClick={this.weatherButton}>See Local Weather</button>
            <br />
            <button onClick={this.yelpButton}>See Yelp</button>
            <section className="section">
              <h3 className="section">Temp: {this.state.temp} Fehrenheit</h3>
              <h5 className="section">Humidity: {this.state.humidity}%</h5>
              <h5 className="section">
                Wind Speed: {this.state.windSpeed} mph
              </h5>
              <h5 className="section">
                Fore-cast: {this.state.weatherDescription}
              </h5>
              <h3 className="section">
                Location:
                {" " +
                  this.state.city +
                  ", " +
                  this.state.state +
                  ". " +
                  this.state.zip}
              </h3>
              <h3>Golf Information:</h3>
              <div id="display-data">{this.state.placesToGolf}</div>
            </section>
          </header>
        </div>
      </>
    );
  }
}

export default App;
