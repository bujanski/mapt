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
            // id of the one you want to update

            //you have an obj with the properties of the one you want to update

            // newSTate.events = newSTtate.events.map(e => {
                // if (e.di === payload.id) {
                //     e = {...e, ...payload}
                // }
            //     // return e
            // })
            // break;




    }

    return newState;
}

export default maptReducer;