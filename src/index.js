import React from "react";
import ReactDOM from "react-dom";
import Weather from "./Weather";
import "bootstrap/dist/css/bootstrap.css";
import "./Styles/App.css";

const rootElement = document.getElementById("root");
ReactDOM.render(App(), rootElement);

function App() {
  return (
    <div className="App">
      <Weather city="Mashhad" />
      <footer>
        This project was coded by Samira shad and is{" "}
        <a
          href="https://github.com/samirashad/weather-react-app"
          target="_blank"
          rel="noreferrer"
        >
          open sourced on GitHub
        </a>{" "}
      </footer>
    </div>
  );
}
