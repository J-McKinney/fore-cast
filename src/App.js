import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import logo from "./assets/golfBall.svg";
import "./App.css";
require("dotenv").config();

class App extends Component {
  state = {
    permissionStatus: false,
    temp: "",
    humidity: "",
    windSpeed: "",
    weatherDescription: "",
    city: "",
    state: "",
    zip: "",
    myLat: "",
    myLon: "",
    placesToGolf: [],
    pickedGolfLat: "",
    pickedGolfLon: "",
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        let coordinates = pos.coords;
        this.setState({ myLat: coordinates.latitude });
        this.setState({ myLon: coordinates.longitude });
      },
      (err) => {
        console.warn(`Error(${err.code}): ${err.message}`);
        alert("Something Went Wrong 1 " + err);
        alert("Something Went Wrong 2: #" + err.code);
        alert("Something Went Wrong 3 " + err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
    console.log(navigator.permissions);
  }

  // handlePermission = (e) => {
  //   e.preventDefault();
  //   navigator.permissions
  //     .query({ name: "geolocation" })
  //     .then(function (result) {
  //       if (result.state === "granted") {
  //         if (window.confirm("Is this working now?")) {
  //           // result.state = true;
  //           // console.log(PermissionStatus());
  //         }
  //         alert(result.state);
  //       } else if (result.state === "prompt") {
  //         alert(result.state);
  //         navigator.geolocation.getCurrentPosition((pos) => {
  //           let coordinates = pos.coords;
  //           this.setState({ myLat: coordinates.latitude });
  //           this.setState({ myLon: coordinates.longitude });
  //         });
  //       } else if (result.state === "denied") {
  //         alert(result.state);
  //       }
  //       result.onChange = function () {
  //         alert(result.state);
  //       };
  //     });
  // };

  getForecast = (e) => {
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
            temp: res.data.current.temp,
            humidity: res.data.current.humidity,
            weatherDescription: res.data.current.weather[0].description,
            windSpeed: res.data.current.wind_speed,
          });
          return axios.get(weatherAPI);
        })
        .catch((error) => {
          console.log(error);
          alert("Something Went Wrong 4 " + error);
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
            city: res.data.results[0].address_components[2].long_name,
            state: res.data.results[0].address_components[4].short_name,
            zip: res.data.results[0].address_components[6].long_name,
          });
          return axios.get(reverseGeocoding);
        })
        .catch((error) => {
          console.log(error);
          alert("Something Went Wrong 5 " + error);
        });
    } else {
      console.log("Something Went Wrong!!!");
      alert("Something Went Wrong 6");
    }
    // Yelp API
    const yelpAPI = axios.get(
      // `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search`,
      `${"https://cors.bridged.cc/"}https://api.yelp.com/v3/businesses/search`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YKEY}`,
          // AccessControlAllowOrigin: "*",
        },
        params: {
          term: "golf",
          categories: "golf",
          limit: 50,
          radius: 40000,
          sort_by: "distance",
          open_now: true,
          latitude: this.state.myLat,
          longitude: this.state.myLon,
        },
      }
    );
    return yelpAPI
      .then((res) => {
        this.setState({ placesToGolf: res.data.businesses });
        console.log(this.state.placesToGolf);
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong 7 " + error);
      });
  };

  render() {
    return (
      <>
        <div className="App">
          <header className="App-header">
            <br />
            <img src={logo} className="App-logo" alt="logo" />
            {/* <Button onClick={this.handlePermission}>You Shall Not Pass!</Button> */}
            <br />
            <Button
              className="golfButton"
              variant="success"
              onClick={this.getForecast}
              // onTouch={this.getForecast}
            >
              <h2 className="foreButton">FORE-CAST</h2>
            </Button>
            <br />
            <section className="section">
              <h3 className="section">Temp: {this.state.temp} Fehrenheit</h3>
              <h5 className="section">Humidity: {this.state.humidity}%</h5>
              <h5 className="section">
                Wind Speed: {this.state.windSpeed} mph
              </h5>
              <h5 className="section">
                Forecast: {this.state.weatherDescription}
              </h5>
              <h3 className="section">
                Your Location:
                {" " +
                  this.state.city +
                  " " +
                  this.state.state +
                  " " +
                  this.state.zip}
              </h3>
              <hr className="hr" />
              <h3>Golf Results Closest To Furthest From You:</h3>
              <hr className="hr" />
              <div>
                {this.state.placesToGolf
                  .filter((place) => place)
                  .map((filteredPlaces) => (
                    <header key={filteredPlaces.id}>
                      <h1 className="section">{filteredPlaces.name}</h1>
                      <h4 className="section">
                        {filteredPlaces.display_phone}
                      </h4>
                      <h4 className="section">
                        {filteredPlaces.location.display_address[0]}
                      </h4>
                      <h4 className="section">
                        {filteredPlaces.location.display_address[1]}
                      </h4>
                      <h4 className="section">
                        {filteredPlaces.location.display_address[2]}
                      </h4>
                      <h4 className="section">
                        Rating: {filteredPlaces.rating}/5
                      </h4>
                      <hr className="hr" />
                    </header>
                  ))}
              </div>
            </section>
          </header>
        </div>
      </>
    );
  }
}

export default App;
