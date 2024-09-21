import React, { useState } from "react";

const Weather = () => {
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState("");
  const API_KEY = "3c6aa129d7ef1458478bb217cc1e9a0b";

  const fetchWeather = (e) => {
    e.preventDefault();

    if (query) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
          setQuery("");
        })
        .catch((e) => {
          console.error("Error fetching the weather data:", e);
        });
    }
  };

  return (
    <div className="weather-container">
      <form onSubmit={fetchWeather} className="search">
        <input
          type="text"
          className="search-input"
          placeholder="Search city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {weather.main && (
        <div className="weather">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default Weather;
