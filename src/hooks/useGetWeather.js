/*This hook expects to receive a latitude, longitude, and a date in YYYY-MM-DD format. It returns an object with that location/date's hourly numbers for temperature, precipitation, pressure, cloud cover, wind speed and wind direction */

import { useEffect, useState } from "react";
import axios from "axios";

const histTimeSplit = 432000000;

async function getWeather(lat, long, date) {
  const givenDate = new Date(date);
  const todaysDate = new Date();
  const timeSplit = todaysDate - givenDate;
  console.log(timeSplit);

  if (timeSplit > histTimeSplit) {
    const historicalWeather = await axios.get(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${long}&start_date=${date}&end_date=${date}&hourly=temperature_2m,dew_point_2m,precipitation,surface_pressure,cloud_cover,wind_speed_10m,wind_direction_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`
    );

    return historicalWeather.data; // Return the data property of the response
  } 
  
  else {
    const recentWeather = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,precipitation,surface_pressure,cloud_cover,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&past_days=5&forecast_days=1`
    );

    console.log(recentWeather);

    return recentWeather.data; // Return the data property of the response
  }
}

export default function useGetWeather(lat, long, date) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWeather(lat, long, date);
      setWeatherData(data);
    };

    fetchData();
  }, []);

  console.log(weatherData);
  return weatherData; // Return the weatherData state
}
