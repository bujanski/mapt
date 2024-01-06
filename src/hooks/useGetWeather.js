/*This hook expects to receive a latitude, longitude, and a date in 2023-12-31T00:00 format. It returns an object with that location/date's hourly numbers for temperature, precipitation, pressure, cloud cover, wind speed and wind direction */

import { useEffect, useState } from "react";
import axios from "axios";

const histTimeSplit = 432000000;

function extractHourWeather(data, hour) {
  let hourWeather = {};

  // Iterate over each property (array) in the data object
  for (const arrayName in data) {
    if (data.hasOwnProperty(arrayName)) {
      const array = data[arrayName];

      // Check if the array is long enough and has an element at the specified hour index
      if (Array.isArray(array) && array.length > hour) {
        hourWeather[arrayName] = array[hour];
      } else {
        hourWeather[arrayName] = null; // or handle the case when the array is not long enough
      }
    }
  }

  return hourWeather;
}

async function getWeather(lat, long, date) {
  let trimmedDate = date.substring(0,10);
  const givenDate = new Date(trimmedDate);
  const todaysDate = new Date();
  const timeSplit = todaysDate - givenDate;

  if (timeSplit > histTimeSplit) {
    const historicalWeather = await axios.get(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${long}&start_date=${trimmedDate}&end_date=${trimmedDate}&hourly=temperature_2m,dew_point_2m,precipitation,surface_pressure,cloud_cover,wind_speed_10m,wind_direction_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`
    );
    let hourPosition = historicalWeather.data.hourly.time.findIndex((element) => element === date);
    let hourWeather = extractHourWeather(historicalWeather.data.hourly, hourPosition);

    return hourWeather; 
  } 
  
  else {
    const recentWeather = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,precipitation,surface_pressure,cloud_cover,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&past_days=5&forecast_days=1`
    );
    let hourPosition = recentWeather.data.hourly.time.findIndex((element) => element === date);
    let hourWeather = extractHourWeather(recentWeather.data.hourly, hourPosition);

    return hourWeather; 
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

  return weatherData; // Return the weatherData state
}