import React, {useContext, useEffect, useState} from 'react';
import {MaptContext} from '../store/MaptContext';
import {fishSpeciesOptions, fishLengthOptions} from '../store/MaptContext';
import flatpickr from 'flatpickr';
import axios from 'axios';
import {getWeather} from '../weatherlogic';

function convertWindDir(angle) {
    /* convert wind direction angle (0-359) to compass direction. solution taken from here: https://stackoverflow.com/questions/7490660/converting-wind-direction-in-angles-to-text-words */
    const compass = Math.floor((angle / 22.5) + .5);
    const windDir = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW"
    ];
    return windDir[(compass % 16)];
};

function EventEditor() {
    const {state, dispatch} = useContext(MaptContext);
    const {eventToEdit, userEvents} = state;
    const [eventData,
        setEventData] = useState(null);

    // Function to find the event with the matching ID
    const findEventById = (eventId) => {
        return userEvents.find((event) => event.eventID === eventId);
    };

    const handleDateChange = async(selectedDateTime) => {
        selectedDateTime.setMinutes(0);
        const newWeather = await getWeather(eventData.location[0], eventData.location[1], selectedDateTime.toISOString().slice(0, 16));
        console.log(newWeather)
        setEventData({
            ...eventData,
            weather: {
                ...eventData.weather,
                ...newWeather
            }
        });
    };

    const handleCancel = () => {
        dispatch({type: 'cancelEventToEdit'});
    }

    const handleDelete = () => {
        dispatch({type: 'deletePrompt', payload: eventToEdit});
    }

    const handleSubmit = () => {

        async function updateEventData() {
            try {
                await axios.put(`https://657a45f61acd268f9afade6a.mockapi.io/events/${eventToEdit}`, eventData);
                dispatch({type: 'updateEventData'});
            } catch (error) {
                console.error('Error updating location:', error);
            }
        }

        // Call the function to update the location data
        updateEventData();

    }

    useEffect(() => {
        // Find the event with the matching ID
        const selectedEvent = findEventById(eventToEdit);
        if (selectedEvent) {
            // Set event data to state
            setEventData(selectedEvent);
        }

        flatpickr('#datePickerInput', {
            dateFormat: 'Y-m-d H:i', // Include hours and minutes
            enableTime: true,
            defaultDate: selectedEvent.weather.time,
            onChange: (selectedDates) => {
                const selectedDateTime = selectedDates[0];
                handleDateChange(selectedDateTime); // Call handleDateChange
                dispatch({type: 'changeDate', payload: selectedDateTime});
            }
        });
    }, [dispatch, eventToEdit, userEvents]);

    if (!eventData) {
        return <div>Loading...</div>; // or any other loading indicator
    }

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
                        ...eventData,
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
                        ...eventData,
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
                        value="Update"
                        onClick={handleSubmit}></input>
                </p>

            </div>
            <div className='editor-button-container'>
                <p>
                    <input
                        className="delete-button"
                        type='button'
                        value="Delete"
                        onClick={handleDelete}></input>
                </p>
            </div>
        </div>
    );
}

export default EventEditor;
