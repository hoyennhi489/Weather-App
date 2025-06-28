import React, { useState } from 'react';
import './index.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '56818a9a03a8527f64f2a191cf326976';

  const handleSearch = () => {
    if (city.trim() === '') {
      alert('Please enter a city name.');
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric&lang=en`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('City not found!');
        }
        return response.json();
      })
      .then((data) => {
        setError('');
        let displayName = `${data.name}, ${data.sys.country}`;
        if (data.name === 'Turan' && data.sys.country === 'VN') {
          displayName = 'Đà Nẵng, VN';
        }

        setWeatherData({
          name: displayName,
          temp: data.main.temp,
          description: data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
        });
      })
      .catch((err) => {
        setWeatherData(null);
        setError(err.message);
      });
  };

  return (
    <div className="container">
      <h1>Weather Today</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div id="weatherInfo">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.temp}°C</p>
          <p>Weather: {weatherData.description}</p>
          <img src={weatherData.icon} alt={weatherData.description} />
        </div>
      )}
    </div>
  );
};

export default WeatherApp;