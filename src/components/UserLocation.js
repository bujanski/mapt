import React, { useContext, useEffect } from 'react';
import { MaptContext } from '../store/MaptContext';

function UserLocation() {
  const { state, dispatch } = useContext(MaptContext);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          // Assuming you have a 'changeUserLoc' action in your reducer
          dispatch({ type: 'changeUserLoc', payload: [lat, long] });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [dispatch]);

  return <div className="user-location">Your location is: {state.userLoc}</div>;
}

export default UserLocation;