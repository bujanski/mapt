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
        case 'deletePrompt' :
            console.log(payload)
            newState.eventToDelete = payload;
            return newState;
        case 'deleteEvent':
            newState.userEvents = newState.userEvents.filter(e => e.eventID !== payload);
            newState.eventToDelete = null;
            newState.eventToEdit = null;
            return newState;
        case 'cancelDelete' :
            newState.eventToDelete = null;
            newState.eventToEdit = null;
            return newState;
        case 'changeDate':
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

        case 'updateLocation':
            newState
                .userEvents
                .find((event) => event.eventID === state.eventToEdit)
                .location = [payload.lat, payload.lng];
            newState.locationToSelect = null;
            return newState;
        case 'updateEventData':
            newState.eventToEdit = null;
            return newState;
    }

    return newState;
}

export default maptReducer;