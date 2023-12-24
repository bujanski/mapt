/*This hook expects to receive a latitude, longitude and a date in YYYY-MM-DD format. It returns an object with that location/date's hourly numbers for temperature, precipitation, pressure, cloud cover, wind speed and wind direction */


/*     ---logic steps
    get today's Date()
    compare today's date to given date

*/

const histTimeSplit = 432000000; //open-meteo uses a different API to access historical data (> 5 days old). this is the time split to check against to see which call to make based on the given event date.


import { useState, useEffect } from "react";

export default function useGetWeather(lat, long, date) {

    const [weather, setWeather] = useState({});

    useEffect(() => {
        
        const givenDate = Date(date);
        const todaysDate = new Date();
        const timeSplit = todaysDate - givenDate;

        if (timeSplit > histTimeSplit) {
            
        }


        // const weatherData = await axios.get(`https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${long}&start_date=${date}&end_date=${date}&hourly=temperature_2m,dew_point_2m,precipitation,surface_pressure,cloud_cover,wind_speed_10m,wind_direction_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`);
        return weather;
        
    }, []);

    return latLong;

}