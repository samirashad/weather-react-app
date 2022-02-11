import React from "react";
import FormatDate from "./FormatDate";
import WeatherIcon from "./WeatherIcon";

export default function WeatherInfo(props) {
  function convertCelsius(event) {
    event.preventDefault();
    props.setIsCelsius(true);
  }

  function convertFahrenhait(event) {
    event.preventDefault();
    props.setIsCelsius(false);
  }

  return (
    <div className="row">
      <div className="col-4">
        <div className="cityName">{props.data.city}</div>
        <div>
          <FormatDate date={props.data.date} />
        </div>
        <span className="currentDegree">
          {props.isCelsius ? props.data.temperature : props.data.fahrenhait}
        </span>
        <span className="degrees">
          <a
            href="/"
            className={props.isCelsius ? "active" : ""}
            onClick={convertCelsius}
          >
            °C{" "}
          </a>
          |
          <a
            href="/"
            className={props.isCelsius ? "" : "active"}
            onClick={convertFahrenhait}
          >
            {" "}
            F
          </a>
        </span>
      </div>
      <div className="col-6">
        <div className="description">
          <WeatherIcon icon={props.data.icon} size={64} />
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
