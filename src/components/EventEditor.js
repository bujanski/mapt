import React, { useContext, useEffect } from 'react'
import { MaptContext } from '../store/MaptContext'
import axios from 'axios';
import flatpickr from 'flatpickr';


// async function getWeather(lat, long, date) {

//     const weather = await axios.get(`https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${long}&start_date=${date}&end_date=${date}&hourly=temperature_2m,dew_point_2m,precipitation,surface_pressure,cloud_cover,wind_speed_10m,wind_direction_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`);
//     return weather;
// }

function EventEditor() {
    const { state, dispatch } = useContext(MaptContext);
    const {eventToEdit} = state;

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         const conditions = await getWeather(45.26, -91.15, '2022-12-22');
        //         dispatch({ type: 'updateWeather', payload: conditions.data });
        //     } catch (error) {
        //         console.error('Error fetching weather:', error);
        //     }
        // };

        // fetchData();

        flatpickr('#datePickerInput', {
            dateFormat: 'Y-m-d H', // Include hours and minutes
            enableTime: true,
            onChange: (selectedDates) => {
                const selectedDateTime = selectedDates[0];
                dispatch({ type: 'changeDate', payload: selectedDateTime });
            }
        });
    }, [dispatch, state.eventHour]);


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
        <div ><div className='event-date'>                
                {state.eventTime.toLocaleString()}
            </div>
            <div id='date-picker'>
                <input type='text' id='datePickerInput' placeholder='Change date/time' />
            </div>
            
            
        </div>
        <div className='editor-field-title'>
            weather
        </div>
        <div className='event-stat-box'>
            <div className='event-stat'>
                cloud cover: {state.eventWeather?.hourly?.cloud_cover[1] ?? 'no data'}% <br />
                dew point: {state.eventWeather?.hourly?.dew_point_2m[1] ?? 'no data'} <br />
                precipitation: {state.eventWeather?.hourly?.precipitation[1] ?? 'no data'} <br />
                temperature: {state.eventWeather?.hourly?.temperature_2m[1] ?? 'no data'} <br />
                pressure: {state.eventWeather?.hourly?.surface_pressure[1] ?? 'no data'} <br />
                wind: {state.eventWeather?.hourly?.wind_speed_10m[1] ?? 'no data'} {state.eventWeather?.hourly?.wind_direction_10m[1] ?? 'no data'}<br />
                {state.eventHour}
            </div>
            
        </div>
    </div>
  )
}

export default EventEditor