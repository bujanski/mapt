import React from 'react'
import AppTitle from './AppTitle'
import EventEditor from './EventEditor'
import UserLocation from './UserLocation'

function Rail() {
  return (
    <div id='rail'>
      <AppTitle />
      <UserLocation />
      <EventEditor />
    </div>
  )
}

export default Rail