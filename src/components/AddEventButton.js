import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import the v4 function from uuid

import { MaptContext } from '../store/MaptContext';

function AddEventButton() {
  const { state, dispatch } = useContext(MaptContext);
  const { eventToAdd } = state;

  const handleAddEvent = () => {
    const newEvent = {
      id: uuidv4(), // Generate a new UUID using uuidv4()
      // other properties of your event object
    };
    dispatch({ type: 'eventToAdd', payload: newEvent });
  };

  return (
    <div className='add-event-button-container'>
      <input
        className='add-event-button'
        type='button'
        value='Add event'
        onClick={handleAddEvent}
      />
    </div>
  );
}

export default AddEventButton;
