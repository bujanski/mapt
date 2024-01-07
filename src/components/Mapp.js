import React, {useEffect, useContext} from 'react';
import axios from 'axios';
import {MapContainer} from 'react-leaflet/MapContainer';
import {TileLayer} from 'react-leaflet/TileLayer';
import {Marker, Popup} from 'react-leaflet';
import {maptData} from '../store/MaptContext';
import {MaptContext} from '../store/MaptContext';

async function getEvents() {
    const events = await axios.get(`https://657a45f61acd268f9afade6a.mockapi.io/events`);
    return events.data;
};

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

function Mapp() {
    const {state, dispatch} = useContext(MaptContext);
    const {eventToEdit} = state;

    useEffect(() => {
        const fetchData = async() => {
            try {
                const events = await getEvents();
                dispatch({type: 'updateEvents', payload: events});
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    const position = maptData.defaultLoc;
    const showEvents = state
        .userEvents
        .map(e => {

            const editEvent = () => {
                dispatch({type: 'changeEventToEdit', payload: e.eventID});
            }

            return (
                <Marker key={e.eventID} position={[e.location[0], e.location[1]]}>
                    <Popup>
                        Fish: {e.fish_species}
                        <br/>
                        Time: {e.weather.time}
                        <br/>
                        Temperature: {e.weather.temperature_2m}
                        F<br/>
                        Cloud cover: {e.weather.cloud_cover}%<br/>
                        Hrly precip: {e.weather.precipitation}
                        in<br/>
                        Wind: {e.weather.wind_speed_10m}
                        mph {convertWindDir(e.weather.wind_direction_10m)}<br/>
                        <p>
                            <input type='button' value="Edit this event" onClick={editEvent}></input>
                        </p>
                    </Popup>
                </Marker>
            )
        });

    return (
        <div className='map'>
            <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={true}
                style={{
                height: "100%"
            }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/> {showEvents}
            </MapContainer>
        </div>
    );
}

export default Mapp;