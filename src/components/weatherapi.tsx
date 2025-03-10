'use client';
import React, { useState } from 'react';

// Define types for Geocoding API response
interface GeoResult {
  name: string;
  latitude: number;
  longitude: number;
}

interface GeoResponse {
  results: GeoResult[];
}

// Define types for Weather API response
interface WeatherData {
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
  };
}

export default function WeatherByZip() {
  const [zipCode, setZipCode] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const bad_hair_cat =
  "https://cats.com/wp-content/uploads/2024/03/A-Selkirk-Rex-kitten.jpg";
  const good_hair_cat = "http://i.imgur.com/ZiEBSak.jpg?1";

  const fetchWeatherData = async () => {
    try {
      setError(null); // Reset error state

      // Step 1: Get coordinates from ZIP code
      const zipcodeResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${zipCode}`
      );
      if (!zipcodeResponse.ok) {
        throw new Error('Failed to fetch geocoding data');
      }
      const zipcodeData: GeoResponse = await zipcodeResponse.json();

      if (!zipcodeData.results || zipcodeData.results.length === 0) {
        throw new Error('Invalid ZIP code or location not found');
      }

      const { latitude, longitude } = zipcodeData.results[0];

      // Step 2: Fetch weather data using coordinates
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/ecmwf?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m&temperature_unit=fahrenheit&timezone=auto`
      );
      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const weatherData: WeatherData = await weatherResponse.json();

      setWeatherData(weatherData);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px' }}>
      <h1>Will it be a good hair day or a bad one?</h1>
      <br></br>
      <input
        type="text"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        placeholder="Enter ZIP Code"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            fetchWeatherData();
          }
        }}
        style={{ marginRight: '10px' }}
      />
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={fetchWeatherData}>Get Weather
       </button>
      <hr></hr>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {weatherData && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>   
        <center>
          <h1>Weather Kitty Says:</h1>
          <br></br>
          {weatherData.hourly.relative_humidity_2m[0] >= 55 ? 'Bad Hair Day!  Sorry Frizzy Kitty!' : 'Good Hair Day! Good Kitty!'}   
          <br></br>
          The humidity is  {weatherData.hourly.relative_humidity_2m[0]}!
          <br></br>
          The dewpoint is  {weatherData.hourly.dew_point_2m[0]}!
          <br></br>
          <br></br>
            <img
              src={weatherData.hourly.dew_point_2m[0] >= 55 ? bad_hair_cat : good_hair_cat}
              alt="logo"
              height="500"
              width="500"
            />
            <br></br>
            Temperature: {weatherData.hourly.temperature_2m[0]}°F
        </center>
        </div>
      )}
    </div>
  );
}
