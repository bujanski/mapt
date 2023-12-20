import { useState, useEffect } from "react";

export default function useLocationData() {
    const [latLong, setLatLong] = useState([])
    const [localWeather, setLocalWeather] = useState({});

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;
                    setLatLong([lat, long]);
                },
              
                (error) => {
                    console.error("Error getting user location:", error);
                }
            );
        }
            
        else {
            return("Geolocation is not supported by this browser.");
        }
        
    }, []);

    return latLong;

}