import React, { useState } from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet'
import { Popup } from 'react-leaflet';
import { MaptContext, maptData } from '../store/AppContext';



function Mapp() {

    const position = maptData.userLoc;
        
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