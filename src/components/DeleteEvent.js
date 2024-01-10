import React, {useContext} from 'react'
import {MaptContext} from '../store/MaptContext';
import axios from 'axios';

function DeleteEvent() {
    const {state, dispatch} = useContext(MaptContext);
    const {eventToEdit} = state;
    const handleDelete = () => {
        async function removeEvent() {
            
            try {
                await axios.delete(`https://657a45f61acd268f9afade6a.mockapi.io/events/${eventToEdit}`);
                console.log(`Event deleted successfully: ${state.eventToEdit}`);
            } catch (error) {
                console.error('Error updating location:', error);
            }
        }
        removeEvent();
        dispatch({type: 'deleteEvent', payload: eventToEdit});
    }


    return (
        <div className='delete-event'>
            <p>Are you sure you want to delete this event?</p>
            <div className='delete-prompt-buttons'>
            <p><input
                    className="cancel-button"
                    type='button'
                    value="Cancel"
                    onClick={handleDelete}></input></p>
                <p><input
                    className="submit-button"
                    type='button'
                    value="Delete"
                    onClick={handleDelete}></input></p>
            </div>

        </div>
    )
}

export default DeleteEvent