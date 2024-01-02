import React, { useEffect, useContext } from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet'
import { Popup } from 'react-leaflet';
import { maptData } from '../store/MaptContext';
import axios from 'axios';
import { MaptContext } from '../store/MaptContext';

async function getEvents() {

    // Recent weather: < 5 days old 

    // Historical weather: > 5 days old
    // const weather = {data: 'rainy'};
    const events = await axios.get(`https://657a45f61acd268f9afade6a.mockapi.io/events`);
    return events;
}

function Mapp() {

    const { state, dispatch } = useContext(MaptContext);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const events = await getEvents();
                dispatch({ type: 'updateEvents', payload: events.data });
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchData();

    },[]);

    const position = maptData.defaultLoc;
        
    return(
        <div className='map'>
            <MapContainer center={position} zoom={14} scrollWheelZoom={true} style={{ height: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        An example event
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
  
    )
}

export default Mapp