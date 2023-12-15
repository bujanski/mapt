import React from 'react'
import AppTitle from './AppTitle'
import FeatureEditor from './FeatureEditor'
import UserLocation from './UserLocation'

function Rail() {
  return (
    <div id='rail'>
      <AppTitle />
      <UserLocation />
      <FeatureEditor />
    </div>
  )
}

export default Rail