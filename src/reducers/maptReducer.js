import { maptData } from "../store/MaptContext";

export const maptReducer = (state, action) => {
    let newState = {...state};
    let {type, payload} = action;

    switch(type) {
        case 'addEvent' : console.log('add event');
        break;
        case 'deleteEvent' : console.log('delete event');
        break;
        case 'moveEvent' : console.log('move event');
        break;
        case 'changeUserLoc' : newState.userLoc = payload;
            return newState;
        case 'updateWeather' : newState.eventWeather = payload;
            return newState;
        case 'changeDate' : newState.eventTime = payload;
            // newState.eventTime = payload;
            newState.eventHour = payload.getHours(); // Set eventHour to the hour of the day
            console.log(newState.eventHour)
            return newState;
    }

    return newState;
}

export default maptReducer;