import React, { useContext, useEffect } from 'react'
import { MaptContext } from '../store/MaptContext'
import axios from 'axios';

async function getWeather(lat, long, date) {

    // Recent weather: < 5 days old 

    // Historical weather: > 5 days old
    const weather = await axios.get(`https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${long}&start_date=${date}&end_date=${date}&hourly=temperature_2m,dew_point_2m,precipitation,surface_pressure,cloud_cover,wind_speed_10m,wind_direction_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`);
    return weather;
}

function EventEditor() {
    const {state, dispatch} = useContext(MaptContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
            const conditions = await getWeather(45.26, -91.15, '2022-12-22');
            dispatch({ type: 'updateWeather', payload: conditions.data });
            } catch (error) {
            console.error('Error fetching weather:', error);
            }
        };
    
        fetchData();
        }, []);

  return (
    <div id='event-editor'>
        <div className='editor-title'>
            Event Editor
        </div>
        <div className='editor-field-title'>
            coordinates
        </div>
        <div className='event-stat-box'>
            <div className='event-stat'>
                lat: {state.userLoc[0]}
            </div>
            <div className='event-stat'>
                long: {state.userLoc[1]}
            </div>
        </div>
        <div className='editor-field-title'>
            date & time
        </div>
        <div className='event-stat-box'>
            <div className='event-stat'>
                date
            </div>
            <div className='event-stat'>
                time
            </div>
        </div>
        <div className='editor-field-title'>
            weather
        </div>
    </div>
  )
}

export default EventEditor