import React, {useEffect, useContext} from 'react';
import axios from 'axios';
import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
import {MaptContext} from '../store/MaptContext';
import {maptData} from '../store/MaptContext';
import DeleteEvent from './DeleteEvent';

async function getEvents() {
    const events = await axios.get(`https://657a45f61acd268f9afade6a.mockapi.io/events`);
    return events.data;
}

function convertWindDir(angle) {
    /* convert wind direction angle (0-359) to compass direction. solution taken from here: https://stackoverflow.com/questions/7490660/converting-wind-direction-in-angles-to-text-words */
    const compass = Math.floor((angle / 22.5) + 0.5);
    const windDir = [
        'N',
        'NNE',
        'NE',
        'ENE',
        'E',
        'ESE',
        'SE',
        'SSE',
        'S',
        'SSW',
        'SW',
        'WSW',
        'W',
        'WNW',
        'NW',
        'NNW'
    ];
    return windDir[(compass % 16)];
}

function Mapp() {
    const {state, dispatch} = useContext(MaptContext);
    const {eventToEdit, eventToDelete, eventToAdd, newEvent} = state;

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
    }, [dispatch, eventToEdit, eventToDelete]);

    const position = maptData.defaultLoc;

    const handleMarkerDragEnd = (event) => {
        const markerLatLng = event
            .target
            .getLatLng();

        // Truncate latitude and longitude to no more than five digits
        const truncatedLatLng = {
            lat: parseFloat(markerLatLng.lat.toFixed(5)),
            lng: parseFloat(markerLatLng.lng.toFixed(5))
        };
        dispatch({type: 'updateLocation', payload: truncatedLatLng});
    };

    const handleNewMarkerDragEnd = (event) => {
        const markerLatLng = event
            .target
            .getLatLng();

        // Truncate latitude and longitude to no more than five digits
        const truncatedLatLng = {
            lat: parseFloat(markerLatLng.lat.toFixed(5)),
            lng: parseFloat(markerLatLng.lng.toFixed(5))
        };
        dispatch({type: 'updateNewEventLocation', payload: truncatedLatLng});
    };

    const handleMapClick = (event) => {
        if (eventToAdd) {
            const clickedLatLng = event.latlng;
            const newEventTime = new Date();
            newEventTime.setMinutes(0);
            const newEvent = {
                eventID: eventToAdd,
                location: [
                    parseFloat(clickedLatLng.lat.toFixed(5)),
                    parseFloat(clickedLatLng.lng.toFixed(5))
                ],
                weather: {
                    time: newEventTime.toISOString().slice(0,16),
                },
                // other properties of your event object
            };
            dispatch({type: 'updateEventToAdd', payload: newEvent});
        }
    };

    const MapClickHandler = () => {
        useMapEvents({
            click: (event) => {
                handleMapClick(event);
            }
        });

        return null;
    };

    const showEvents = !eventToAdd
        ? state
            .userEvents
            .map((e) => {
                const editEvent = () => {
                    dispatch({type: 'changeEventToEdit', payload: e.eventID});
                };

                return (
                    <Marker
                        key={e.eventID}
                        position={[e.location[0], e.location[1]]}
                        draggable={eventToEdit}
                        eventHandlers={{
                        dragend: handleMarkerDragEnd
                    }}>
                        <Popup>
                            Fish: {e.fish_species}
                            <br/>
                            Time: {e.weather.time}
                            <br/>
                            Temperature: {e.weather.temperature_2m}
                            F
                            <br/>
                            Cloud cover: {e.weather.cloud_cover}%
                            <br/>
                            Hrly precip: {e.weather.precipitation}
                            in
                            <br/>
                            Wind: {e.weather.wind_speed_10m}
                            mph {convertWindDir(e.weather.wind_direction_10m)}
                            <br/>
                            <p>
                                <input type='button' value='Edit this event' onClick={editEvent}></input>
                            </p>
                        </Popup>
                    </Marker>
                );
            })
        : null;

    const showSelectedEvent = state
        .userEvents
        .find((event) => event.eventID === state.eventToEdit);

    return (
        <div className='map'>
            <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={true}
                style={{
                height: '100%'
            }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/> {!eventToEdit
                    ? showEvents
                    : (
                        <Marker
                            key={showSelectedEvent.eventID}
                            position={[showSelectedEvent.location[0], showSelectedEvent.location[1]]}
                            draggable={eventToEdit}
                            eventHandlers={{
                            dragend: handleMarkerDragEnd
                        }}>
                            <Popup>
                                Fish: {showSelectedEvent.fish_species}
                                <br/>
                                Time: {showSelectedEvent.weather.time}
                            </Popup>
                        </Marker>
                    )}

                {newEvent
                    ? <Marker
                            key={newEvent.eventID}
                            position={[newEvent.location[0], newEvent.location[1]]}
                            draggable={newEvent}
                            eventHandlers={{
                            dragend: handleNewMarkerDragEnd
                        }}></Marker>
                    : null}
                <MapClickHandler/>
            </MapContainer>
            {eventToDelete
                ? <DeleteEvent/>
                : null}
        </div>
    );
}

export default Mapp;
