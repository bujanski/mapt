import { createContext } from "react";

// Initial state/context should include: user's current location (provide a default if missing), weather at user's current location (or at default location if missing), all user events from mock API, all public events from mock API, default view (view catches, edit mode, etc.)

export const MaptContext = createContext(null);

export const maptData = {
    userLoc: 'unavailable', // the users latitude and longitude
    defaultLoc: [45.26, -91.14],
    eventWeather: {},
    userEvents: [], // Array of events added by the user
    publicEvents: [], // Array of events shared publicly with all users
    appView: 'addEvent', //
    eventTime: new Date(),
    eventHour: 'no data',
    eventID: null,
}

