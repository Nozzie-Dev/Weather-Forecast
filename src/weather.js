import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function WeatherForecast() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  const api = {
    key: "743bee57fddbfaf52447193a87d5dd25",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const search = (evt) => {
    if (evt.key === "Enter" || evt.type === "click") {
      axios
        .get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => {
          setWeather(res.data);
          setQuery("");
          axios
            .get(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
            .then((res) => {
              // Filter forecast for the next 8 days
              const filteredForecast = res.data.list
                .filter((item, index) => {
                  const currentDate = new Date().getDate();
                  const forecastDate = new Date(item.dt * 1000).getDate();
                  return forecastDate > currentDate && index % 8 === 0;
                })
                .slice(0, 8);
              setForecast(filteredForecast);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const dateBuilder = (d) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = d.getMonth() + 1;
    return {
      day: day,
      date: `${date < 10 ? "0" + date : date}/${
        month < 10 ? "0" + month : month
      }`,
    };
  };

  return (
    <div className="container mt-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for a city..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={search}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {typeof weather.main !== "undefined" ? (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5>
                  {weather.name}, {weather.sys.country}
                </h5>
                <p>{dateBuilder(new Date()).date}</p>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>{Math.round(weather.main.temp)}°C</h6>
                    <img
                      src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                      alt="weather-icon"
                    />
                    <p>{weather.weather[0].description}</p>
                  </div>
                  <div className="col-md-6">
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind: {weather.wind.speed} km/h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body text-center">
                <h3>Enter a city...</h3>
              </div>
            </div>
          </div>
        </div>
      )}
      {forecast.length > 0 && (
        <div className="row mt-3 justify-content-center">
          <div className="col-md-6">
            <h4>Forecast</h4>
            <div className="row">
              {forecast.map((item, index) => (
                <div className="col-md-3" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <h6>{dateBuilder(new Date(item.dt * 1000)).day}</h6>
                      <p>{dateBuilder(new Date(item.dt * 1000)).date}</p>
                      <p>Max: {Math.round(item.main.temp_max)}°C</p>
                      <p>Min: {Math.round(item.main.temp_min)}°C</p>
                      <img
                        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                        alt="weather-icon"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherForecast;
