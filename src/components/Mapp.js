import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker } from 'react-leaflet';
import { Popup } from 'react-leaflet';
import { maptData } from '../store/MaptContext';

import { MaptContext } from '../store/MaptContext';
import useGetWeather from '../hooks/useGetWeather';

async function getEvents() {
    const events = await axios.get(`https://657a45f61acd268f9afade6a.mockapi.io/events`);
    return events.data;
};

function convertWindDir(angle) {
    /* convert wind direction angle (0-359) to compass direction. solution taken from here: https://stackoverflow.com/questions/7490660/converting-wind-direction-in-angles-to-text-words */
    const compass = Math.floor((angle/22.5)+.5);
    const windDir = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    return windDir[(compass % 16)];
};

function Mapp() {
    
    const { state, dispatch } = useContext(MaptContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const events = await getEvents();
                dispatch({ type: 'updateEvents', payload: events });
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchData();

    }, [dispatch]);


    const position = maptData.defaultLoc;
    const vibe = useGetWeather(45.1,-90.1,'2023-01-05T16:00');

    const showEvents = state.userEvents.map(e =>  {

        const editEvent = () => {
            console.log(e.eventID);

        /*  
        1) //also get the weather for the updated date/time
            place that into a new 'event' object
    
        2)Update the data in MockAPI
            - hardcode that value
            - axios.put(url,{prop: updated Value} i.e. event object)
        
            await confirmation

        3) Use confirmation to update the state (dispatcher)
        */
        }

        return (
        <Marker key={e.eventID} position={[e.eventLoc[0], e.eventLoc[1]]}>
            <Popup>
                Time: {e.eventTime} <br />
                Temperature: {e.eventWeather.temperature} F<br/>
                Cloud cover: {e.eventWeather.cloudCover}%<br />
                Hrly precip: {e.eventWeather.precipitation} in<br />
                Wind: {e.eventWeather.wind[0]} mph {convertWindDir(e.eventWeather.wind[1])}<br />
                <p><input type='button' value="Edit this event" onClick={editEvent} ></input></p>
            </Popup>
        </Marker>
        )
    }
    );

    return (
        <div className='map'>
            <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {showEvents}
            </MapContainer>
        </div>
    );
}

export default Mapp;