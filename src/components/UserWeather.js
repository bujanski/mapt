import React, { useContext, useEffect } from 'react';
import { MaptContext } from '../store/MaptContext';
import useGetWeather from '../hooks/useGetWeather';

function displayKeyValuePairs(obj) {
  const items = [];
  for (const [key, value] of Object.entries(obj)) {
    items.push(<li key={key}>{`${key}: ${value}`}</li>);
  }
  return items;
}

function UserWeather() {
  const { state } = useContext(MaptContext);
  const userConditions = useGetWeather(state.userLoc[0], state.userLoc[1], state.userTime);
  console.log(state.userTime)

  useEffect(() => {
    // You can perform any additional logic when userConditions changes
  }, [userConditions]);

  return (
    <div className="user-weather">
      <h4>Conditions at your location</h4>
      <ul>
        {userConditions && displayKeyValuePairs(userConditions)}
      </ul>
    </div>
  );
}

export default UserWeather;
