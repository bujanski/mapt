import React, { useContext, useEffect } from 'react';
import { MaptContext } from '../store/MaptContext';

function truncateDecimal(number, decimalPlaces) {
  const factor = 10 ** decimalPlaces;
  return Math.round(number * factor) / factor;
}

function UserLocation() {
  const { state, dispatch } = useContext(MaptContext);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = truncateDecimal(position.coords.latitude, 5);
          const long = truncateDecimal(position.coords.longitude, 5);
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

  return (
    <div className="user-location">
      Your location is: {`${state.userLoc[0]}, ${state.userLoc[1]}`}
    </div>
  );
}

export default UserLocation;
