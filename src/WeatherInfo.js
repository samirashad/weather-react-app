import React from "react";
import FormatDate from "./FormatDate";

export default function WeatherInfo(props) {
  return (
    <div className="row">
      <div className="col-4">
        <div className="cityName">{props.data.city}</div>
        <div>
          <FormatDate date={props.data.date} />
        </div>
        <span className="currentDegree">{props.data.temperature}</span>
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
            src={props.data.iconUrl}
            width="100px"
            alt={props.data.description}
          />
          <span className=" description float-left">
            {props.data.description}
          </span>
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
