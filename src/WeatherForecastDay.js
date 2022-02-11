import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecastDay(props) {
  let fahrenhaitTemperaturesMax = props.data.map((obj) =>
    Math.round((obj.temp.max * 9) / 5 + 32)
  );
  let fahrenhaitTemperaturesMin = props.data.map((obj) =>
    Math.round((obj.temp.min * 9) / 5 + 32)
  );
  function handleDay(date) {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = new Date(date).getDay();
    return days[day];
  }
  return (
    <div className="row">
      {props.data.map((forecastday, index) => {
        return (
          <div className="col-sm-2" key={index}>
            <div className="cards">
              <div className="card">
                <div className="card-body">
                  {handleDay(forecastday.dt * 1000)}
                </div>
                <WeatherIcon icon={forecastday.weather[0].icon} size={64} />
                <div className="card-title">
                  H :{" "}
                  <span className="maxTemp">
                    {props.isCelsius
                      ? Math.round(forecastday.temp.max)
                      : fahrenhaitTemperaturesMax[index]}
                  </span>
                  ° <br />L :{" "}
                  <span className="minTemp">
                    {props.isCelsius
                      ? Math.round(forecastday.temp.min)
                      : fahrenhaitTemperaturesMin[index]}
                  </span>
                  °
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
