import React, { useState, useEffect } from "react";
import "./Styles/Weather.css";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import WaetherForecast from "./WeatherForecast";

export default function Weather(props) {
  let [isCelsius, setIsCelsius] = useState(true);
  let [ready, setReady] = useState(false);
  let [weatherData, setWeatherData] = useState({});
  let [city, setCity] = useState(props.city);

  function handleResponse(response) {
    setWeatherData({
      temperature: Math.round(response.data.main.temp),
      coordinate: response.data.coord,
      city: response.data.name,
      humidity: response.data.main.humidity,
      wind: Math.round(response.data.wind.speed),
      icon: response.data.weather[0].icon,
      description: response.data.weather[0].description,
      date: new Date(response.data.dt * 1000),
      fahrenhait: Math.round((response.data.main.temp * 9) / 5 + 32),
    });
    setReady(true);
  }
  useEffect(() => {
    setIsCelsius(true);
  }, [city]);

  function search() {
    const apiKey = "062d11614d7d2c7e64b4e3d2e314e320";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }
  function handlePositon(position) {
    const apiKey = "062d11614d7d2c7e64b4e3d2e314e320";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }
  function getCoordinate(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(handlePositon);
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
              <button className="btn btn-success" onClick={getCoordinate}>
                Current location
              </button>
            </div>
          </div>
        </form>
        <WeatherInfo
          data={weatherData}
          isCelsius={isCelsius}
          setIsCelsius={setIsCelsius}
        />
        <WaetherForecast
          coordinate={weatherData.coordinate}
          isCelsius={isCelsius}
        />
      </div>
    );
  } else {
    search();
    return "loading..";
  }
}
