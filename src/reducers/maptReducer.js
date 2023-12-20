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

        break;

    }
    
    return newState;
}

export default maptReducer;