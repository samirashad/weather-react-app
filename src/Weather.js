import React, { useState } from "react";
import "./Styles/Weather.css";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";

export default function Weather(props) {
  let [ready, setReady] = useState(false);
  let [weatherData, setWeatherData] = useState({});
  let [city, setCity] = useState(props.city);
  function handleResponse(response) {
    setWeatherData({
      temperature: Math.round(response.data.main.temp),
      city: response.data.name,
      humidity: response.data.main.humidity,
      wind: Math.round(response.data.wind.speed),
      iconUrl: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
      date: new Date(response.data.dt * 1000),
    });
    setReady(true);
  }
  function handleSubmit(event) {
    event.preventDefault();
    setReady(false);
  }
  if (ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-6">
              <input
                type="search"
                placeholder="Enter a City"
                className="form-control"
                autoComplete="off"
                autoFocus="on"
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
            <div className="col-2">
              <input
                type="submit"
                className="btn btn-success w-100"
                value="search"
              />
            </div>
            <div className="col-4">
              <button className="btn btn-success">Current location</button>
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} />
      </div>
    );
  } else {
    const apiKey = "0cade312aa440618836af6e6fd05e7ad";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
    return "loading..";
  }
}
