import React, { useContext, useEffect, useState } from 'react';
import { MaptContext } from '../store/MaptContext';
import axios from 'axios';
import flatpickr from 'flatpickr';

function EventEditor() {
  const { state, dispatch } = useContext(MaptContext);
  const { eventToEdit, userEvents } = state;
  const [eventData, setEventData] = useState(null);

  // Function to find the event with the matching ID
  const findEventById = (eventId) => {
    return userEvents.find((event) => event.eventID === eventId);
  };

  useEffect(() => {
    // Find the event with the matching ID
    const selectedEvent = findEventById(eventToEdit);

    if (selectedEvent) {
      // Set event data to state
      setEventData(selectedEvent);

      // You can dispatch an action to update other parts of the state if needed
      // dispatch({ type: 'updateOtherState', payload: selectedEvent.someValue });
    }

    flatpickr('#datePickerInput', {
      dateFormat: 'Y-m-d H', // Include hours and minutes
      enableTime: true,
      defaultDate: selectedEvent ? selectedEvent.eventTime : null, // Set default date to the event's date
      onChange: (selectedDates) => {
        const selectedDateTime = selectedDates[0];
        dispatch({ type: 'changeDate', payload: selectedDateTime });
      },
    });
  }, [dispatch, eventToEdit, userEvents]);

  if (!eventData) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  return (
    <div id='event-editor'>
      <div className='editor-title'>
            Event Editor
        </div>
        <div className='editor-field-title'>
            coordinates
        </div>
        <div className='event-stat-box'>
            <div className='event-stat'>
                lat: 
            </div>
            <div className='event-stat'>
                long:
            </div>
        </div>
        <div className='editor-field-title'>
            date & time
        </div>
        <div ><div className='event-date'>                
                {state.eventTime.toLocaleString()}
            </div>
            <div id='date-picker'>
                <input type='text' id='datePickerInput' placeholder='Change date/time' />
            </div>
            
            
        </div>
        <div className='editor-field-title'>
            weather
        </div>
        <div className='event-stat-box'>

            
        </div>
    </div>
  );
}

export default EventEditor;
