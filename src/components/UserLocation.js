import React, { useContext } from 'react'
import { MaptContext, maptData } from '../store/AppContext'
import { useEffect } from 'react'
import { maptReducer } from '../reducers/maptReducer';

function UserLocation() {



    const {loc, dispatch} = useContext(MaptContext);
    const changeLoc = (lat, long) => {
      dispatch({type: 'changeUserLoc', payload: [lat, long] })
    }


  const getLocation = () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                changeLoc(lat, long)
            },
          
            (error) => {
                console.error("Error getting user location:", error);
            }
        );
    }
        
    else {
        return("Geolocation is not supported by this browser.");
    }
  }
    
  getLocation();



  return (
    <div className='user-location'>Your location is: {maptData.userLoc} </div>
  )
}

export default UserLocation