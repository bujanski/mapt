import React, { useContext } from 'react'
import AppTitle from './AppTitle'
import EventEditor from './EventEditor'
import UserLocation from './UserLocation'
import UserWeather from './UserWeather'
import { MaptContext } from '../store/MaptContext'
import useGetWeather from '../hooks/useGetWeather'

function Rail() {

  const {state} = useContext(MaptContext);
  const {eventToEdit} = state;

  //state --> eventToEdit (null) : {eventObj}

  return (
    <div id='rail'>
      <AppTitle />
      <UserLocation />
      {eventToEdit ? null: <UserWeather />}
      {eventToEdit ? <EventEditor /> : null}
      
    </div>
  )
}

export default Rail