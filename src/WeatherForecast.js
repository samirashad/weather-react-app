import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";
import "./Styles/Forecast.css";

export default function WeatherForecast(props) {
  let [forecastArray, setForecastArray] = useState([]);
  let [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
  }, [props.coordinate]);

  function displayForecast(response) {
    setForecastArray(response.data.daily.slice(0, 6));
  }
  let lon = props.coordinate.lon;
  let lat = props.coordinate.lat;
  const apiKey = "062d11614d7d2c7e64b4e3d2e314e320";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  function search() {
    axios.get(apiUrl).then(displayForecast);
    setReady(true);
  }
  if (ready) {
    return (
      <div className="forecast">
        <h2 className="border p-2 bg-secondary text-white">6-day Forecast</h2>
        <div className="weatherForecastTemperatures">
          <WeatherForecastDay
            data={forecastArray}
            isCelsius={props.isCelsius}
          />
        </div>
      </div>
    );
  } else {
    search();
    return "loading";
  }
}
