import React, { useState } from "react";
import FormatDate from "./FormatDate";
import WeatherIcon from "./WeatherIcon";

export default function WeatherInfo(props) {
  let [isCelsius, setIsCelsius] = useState(true);
  function convertCelsius(event) {
    event.preventDefault();
    setIsCelsius(true);
  }
  function convertFahrenhait(event) {
    event.preventDefault();
    setIsCelsius(false);
  }

  return (
    <div className="row">
      <div className="col-4">
        <div className="cityName">{props.data.city}</div>
        <div>
          <FormatDate date={props.data.date} />
        </div>
        <span className="currentDegree">
          {isCelsius ? props.data.temperature : props.data.fahrenhait}
        </span>
        <span className="degrees">
          <a
            href="/"
            className={isCelsius ? "active" : ""}
            onClick={convertCelsius}
          >
            °C{" "}
          </a>
          |
          <a
            href="/"
            className={isCelsius ? "" : "active"}
            onClick={convertFahrenhait}
          >
            {" "}
            F
          </a>
        </span>
      </div>
      <div className="col-6">
        <div className="description">
          <WeatherIcon icon={props.data.icon} />
          <span className=" description">{props.data.description}</span>
        </div>
        <p className="specification">
          <strong>Wind:</strong> {props.data.wind} km/h
          <br />
          <strong>Humidity:</strong> {props.data.humidity} %
        </p>
      </div>
    </div>
  );
}
