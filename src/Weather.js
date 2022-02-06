import React, { useState } from "react";
import "./Styles/Weather.css";
import axios from "axios";
import FormatDate from "./FormatDate";

export default function CurrentWeather() {
  let [ready, setReady] = useState(false);
  let [weatherData, setWeatherData] = useState({});
  function handleResponse(response) {
    console.log(response.data);
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
  if (ready) {
    return (
      <div className="Weather">
        <form>
          <div className="row">
            <div className="col-6">
              <input
                type="search"
                placeholder="Enter a City"
                className="form-control"
                autoComplete="off"
                autoFocus="on"
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
        <div className="row">
          <div className="col-4">
            <div className="cityName">{weatherData.city}</div>
            <div>
              <FormatDate date={weatherData.date} />
            </div>
            <span className="currentDegree">{weatherData.temperature}</span>
            <span className="degrees">
              <a href="/" className="active">
                °C{" "}
              </a>
              |<a href="/"> F</a>
            </span>
          </div>
          <div className="col-6">
            <div className="description clearfix">
              <img
                src={weatherData.iconUrl}
                width="100px"
                alt={weatherData.description}
              />
              <span className=" description float-left">
                {weatherData.description}
              </span>
            </div>
            <p className="specification">
              <strong>Wind:</strong> {weatherData.wind} km/h
              <br />
              <strong>Humidity:</strong> {weatherData.humidity} %
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    const apiKey = "0cade312aa440618836af6e6fd05e7ad";
    let city = "mashhad";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
    return "loading..";
  }
}
