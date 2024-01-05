import React, { useContext, useEffect } from 'react';
import { MaptContext } from '../store/MaptContext';
import useGetWeather from '../hooks/useGetWeather'

function UserWeather() {
    const {state} = useContext(MaptContext);
      const userConditions = useGetWeather(44.34, -91.14, '2024-01-04')

    return (
        <div className="user-weather">
          Your weather is:<br />
          Temperature: {userConditions.hourly.temperature_2m[1]}

          
        </div>
  )
}

export default UserWeather