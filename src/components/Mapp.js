import React, { useEffect, useContext } from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet'
import { Popup } from 'react-leaflet';
import { maptData } from '../store/MaptContext';
import axios from 'axios';
import { MaptContext } from '../store/MaptContext';

async function getEvents() {
    const events = await axios.get(`https://657a45f61acd268f9afade6a.mockapi.io/events`);
    return events.data;
};

const showEvents = (events) => {
    return events.map((e) => (
        <Marker key={e.eventID} position={[e.eventLoc[0], e.eventLoc[1]]}>
            <Popup>
                Time: {e.eventTime} <br />
                Cloud cover: {e.eventWeather.cloudCover}%<br />
                Wind: {e.eventWeather.wind[0]} mph {convertWindDir(e.eventWeather.wind[1])}<br />
            </Popup>
        </Marker>
    ));
};

function convertWindDir(angle) {
    /* convert wind direction angle (0-359) to compass direction. solution taken from here: https://stackoverflow.com/questions/7490660/converting-wind-direction-in-angles-to-text-words */
    const compass = Math.floor((angle/22.5)+.5);
    console.log(compass);
    const windDir = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    console.log(windDir[(compass % 16)]);
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

    return (
        <div className='map'>
            <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {showEvents(state.userEvents)}
            </MapContainer>
        </div>
    );
}

export default Mapp;