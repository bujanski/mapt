export const maptReducer = (state, action) => {
    let newState = {...state};
    let {type, payload} = action;

    switch(type) {
        case 'addEvent' : 
            console.log('add event');
        break;
        case 'deleteEvent' : 
            console.log('delete event');
        break;
        case 'moveEvent' : 
            console.log('move event');
        break;
        case 'changeEventToEdit' :
            newState.eventToEdit = payload;
            return newState;
        case 'cancelEventToEdit' :
            newState.eventToEdit = null;
            return newState;
        case 'updateEvents' : 
            newState.userEvents = payload;
            return newState;
        case 'changeUserLoc' : 
            newState.userLoc = payload;
            return newState;
        case 'updateWeather' : 
            newState.eventWeather = payload;
            return newState;
        case 'changeDate' : 
            return newState;
    }

    return newState;
}

export default maptReducer;