import React, { useContext } from 'react'
import AppTitle from './AppTitle'
import EventEditor from './EventEditor'
import UserLocation from './UserLocation'
import { MaptContext } from '../store/MaptContext'


function Rail() {

  const {state,dispatch} = useContext(MaptContext);
  const {eventToEdit} = state;

  //state --> eventToEdit (null) : {eventObj}

  return (
    <div id='rail'>
      <AppTitle />
      <UserLocation />
      {eventToEdit ? <EventEditor /> : null}
      
    </div>
  )
}

export default Rail