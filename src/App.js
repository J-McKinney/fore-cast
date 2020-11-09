import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    forcast: {},
  };
  componentDidMount() {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Atlanta,Georgia&units=imperial&appid=166a433c57516f51dfab1f7edaed8413"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            forcast: result,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  componentDidUpdate() {
    var tellMeTheForecast = this.state.forecast;
    console.log("Forecast   ", this.state.forcast);
    document.getElementById("App").innerHTML = tellMeTheForecast;
  }
  render() {
    return (
      <>
        <div id="App" className="App"></div>
      </>
    );
  }
}

export default App;
