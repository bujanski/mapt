import axios from "axios";

export const maptReducer = (state, action) => {
    let newState = {
        ...state
    };
    let {type, payload} = action;

    switch (type) {
        case 'addEvent':
            console.log('add event');
            break;
        case 'deleteEvent':
            console.log('delete event');
            break;
        case 'moveEvent':
            console.log('move event');
            break;
        case 'changeEventToEdit':
            newState.eventToEdit = payload;
            return newState;
        case 'cancelEventToEdit':
            newState.eventToEdit = null;
            return newState;
        case 'updateEvents':
            newState.userEvents = payload;
            return newState;
        case 'changeUserLoc':
            newState.userLoc = payload;
            return newState;
        case 'updateWeather':
            newState.eventWeather = payload;
            return newState;
        case 'changeDate':
            return newState;
        case 'selectLocation':
            newState.locationToSelect = true;
            return newState;
        case 'updateLocation':
            newState
                .userEvents
                .find((event) => event.eventID === state.eventToEdit)
                .location = [payload.lat, payload.lng];
            newState.locationToSelect = null;
            return newState;
        case 'updateEventData':

            async function updateLocationData() {
                try {
                    const response = await axios.get(`https://657a45f61acd268f9afade6a.mockapi.io/events`);

                    const updatedEvents = response
                        .data
                        .map(event => {
                            if (event.eventID === state.eventToEdit) {
                                return {
                                    ...event,
                                    location: payload
                                };
                            }
                            return event;
                        });

                    console.log(updatedEvents);

                    // Update the location for the specified event
                    await axios.put(`https://657a45f61acd268f9afade6a.mockapi.io/events`, updatedEvents, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    console.log(`Location updated successfully for event with eventID: ${state.eventToEdit}`);
                } catch (error) {
                    console.error('Error updating location:', error);
                }
            }

            // Call the function to update the location data
            updateLocationData();

            newState.eventToEdit = null;
            return newState;

            // Call the function to update the location data
            updateLocationData();

            newState.eventToEdit = null;
            return newState;

    }

    return newState;
}

export default maptReducer;