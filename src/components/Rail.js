import React, {useContext} from 'react'
import AppTitle from './AppTitle'
import EventEditor from './EventEditor'
import UserLocation from './UserLocation'
import UserWeather from './UserWeather'
import {MaptContext} from '../store/MaptContext'
import AddEventButton from './AddEventButton'
import AddEventInstructions from './AddEventInstructions'
import AddEvent from './AddEvent'

function Rail() {

    const {state} = useContext(MaptContext);
    const {eventToEdit, eventToAdd, newEvent} = state;

    //state --> eventToEdit (null) : {eventObj}

    return (
        <div id='rail'>
            <AppTitle/>
            <UserLocation/> {eventToEdit || eventToAdd
                ? null
                : <UserWeather />}
            {eventToAdd || eventToEdit
                ? null
                : <AddEventButton />}
            {!eventToAdd || newEvent
                ? null
                : <AddEventInstructions />}                
            {eventToEdit
                ? <EventEditor/>
                : null}
            {newEvent ? <AddEvent /> : null}
            
        </div>
    )
}

export default Rail