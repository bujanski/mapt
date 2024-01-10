import React, { useContext, useEffect, useState } from 'react';
import { MaptContext } from '../store/MaptContext';
import { fishSpeciesOptions, fishLengthOptions } from '../store/MaptContext';
import flatpickr from 'flatpickr';
import { getWeather } from '../weatherlogic';
import axios from 'axios';

function convertWindDir(angle) {
  const compass = Math.floor((angle / 22.5) + .5);
  const windDir = [
    "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
  ];
  return windDir[(compass % 16)];
};

function AddEvent() {
  const { state, dispatch } = useContext(MaptContext);
  const { newEvent } = state;
  const [eventData, setEventData] = useState(newEvent);

  const handleDateChange = async (selectedDateTime) => {
    selectedDateTime.setMinutes(0);
    const newWeather = await getWeather(
      eventData.location[0],
      eventData.location[1],
      selectedDateTime.toISOString().slice(0, 16)
    );

    setEventData({
      ...eventData,
      weather: {
        ...eventData.weather, // Spread existing weather data
        ...newWeather,        // Spread new weather data
      }
    });
  };

  const handleCancel = () => {
    dispatch({ type: 'cancelAddEvent' });
  }

  const handleSubmit = () => {
    async function updateEventData() {
      try {
        console.log(eventData);
        await axios.post(`https://657a45f61acd268f9afade6a.mockapi.io/events/`, eventData);
        dispatch({ type: 'postNewEvent' });
      } catch (error) {
        console.error('Error adding event:', error);
      }
    }
    // Call the function to update the location data
    updateEventData();
  }

//   useEffect(() => {
//     const fetchInitialWeather = async () => {
//       try {
//         const initialDateTime = new Date(eventData.weather.time);
//         initialDateTime.setMinutes(0);
//         console.log(initialDateTime.toISOString().slice(0, 16))
//         const isoDateTime = initialDateTime.toISOString().slice(0, 16);
//         const initialWeather = await getWeather(
//           eventData.location[0],
//           eventData.location[1],
//           isoDateTime
//         );
//             console.log(initialWeather)
//         setEventData({
//           ...eventData,
//           weather: {
//             ...eventData.weather,  // Spread existing weather data
//             ...initialWeather,     // Spread initial weather data
//           }
//         });
//       } catch (error) {
//         console.error('Error fetching initial weather:', error);
//       }
//     };
  
//     fetchInitialWeather();
  
//   }, []);

  useEffect(() => {
    flatpickr('#datePickerInput', {
      dateFormat: 'Y-m-d H:i', // Include hours and minutes
      enableTime: true,
      defaultDate: eventData.weather.time,
      onChange: (selectedDates) => {
        const selectedDateTime = selectedDates[0];
        handleDateChange(selectedDateTime);
        dispatch({ type: 'changeDate', payload: selectedDateTime });
      }
    });

  }, [dispatch, eventData]);

    if (!newEvent) {
        return <div>Loading...</div>; // or any other loading indicator
    }

    return (
        <div id='event-editor'>
            <div className='editor-title'>
                Add a new event
            </div>
            <div className='editor-field-title'>
                coordinates
            </div>
            <div className='event-stat-box'>
                <div className='event-stat'>
                    <b>lat:</b><br/> {eventData.location[0]}
                </div>
                <div className='event-stat'>
                    <b>long:</b><br/> {eventData.location[1]}
                </div><br/>
                <p className='tooltip'>
                    Drag the marker to change location
                </p>
            </div>
            <div className='editor-field-title'>
                fish
            </div>
            <div className='event-stat-box'>
                <div className='event-stat'>
                    <b>Species:</b>
                    <br/>
                    <select
                        value={eventData.fish_species}
                        onChange={(e) => setEventData({
                        ...newEvent,
                        fish_species: e.target.value
                    })}>
                        {fishSpeciesOptions.map((species, index) => (
                            <option key={index} value={species}>
                                {species}
                            </option>
                        ))}
                    </select>

                </div>
                <div className='event-stat'>
                    <b>Length:</b>
                    <br/>
                    <select
                        value={eventData.fish_length}
                        onChange={(e) => setEventData({
                        ...newEvent,
                        fish_length: e.target.value
                    })}>
                        {fishLengthOptions.map((length, index) => (
                            <option key={index} value={length}>
                                {length}
                            </option>
                        ))}
                    </select>
                    inches
                </div>
            </div>
            <div className='editor-field-title'>
                date & time
            </div>
            <div className='date-editor'>
                <div className='tooltip'>All times rounded to the latest hour</div>
                <div className='event-date'>
                    <b>{eventData.weather.time}</b>
                </div>
                <div id='date-picker'>
                    Change date/time:&nbsp;
                    <input
                        type='text'
                        className="date-widget"
                        id='datePickerInput'
                        placeholder='Select date/time'/>
                </div>
            </div>
            <div className='editor-field-title'>
                weather
            </div>
            <div className='event-weather-box'>
                <b>Temp</b>: {eventData.weather.temperature_2m}&deg; F<br/>
                <b>Hrly precip</b>: {eventData.weather.precipitation}"<br/>
                <b>Pressure</b>: {eventData.weather.surface_pressure}&nbsp;mmHg<br/>
                <b>Cloud cover</b>: {eventData.weather.cloud_cover}%<br/>
                <b>Wind</b>: {eventData.weather.wind_speed_10m}
                mph {convertWindDir(eventData.weather.wind_direction_10m)}<br/>
            </div>
            <div className='editor-button-container'>

                <p>
                    <input
                        className="cancel-button"
                        type='button'
                        value="Cancel"
                        onClick={handleCancel}></input>
                </p>
                <p>
                    <input
                        className="submit-button"
                        type='button'
                        value="Add event"
                        onClick={handleSubmit}></input>
                </p>

            </div>
        </div>
    );
}

export default AddEvent;
