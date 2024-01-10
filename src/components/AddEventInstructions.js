import React, {useContext} from 'react'
import {MaptContext} from '../store/MaptContext'

function AddEventInstructions() {

    const {state, dispatch} = useContext(MaptContext);
    const {eventToAdd} = state;

    const handleCancel = () => {
        dispatch({type: 'cancelAddEvent'})
    }

    return (
        <div className='add-event-instructions'>
            Click the appropriate place on the map to add an event at that location
            <p>
                <input
                    className='add-event-button'
                    type='button'
                    value='Cancel'
                    onClick={handleCancel}/>
            </p>

        </div>
    )
}

export default AddEventInstructions