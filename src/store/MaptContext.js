import { createContext } from "react";

// Initial state/context should include: user's current location (provide a default if missing), weather at user's current location (or at default location if missing), all user events from mock API, all public events from mock API, default view (view catches, edit mode, etc.)

export const MaptContext = createContext(null);

const currentDate = new Date();
currentDate.setMinutes(0); // Set minutes to 00

export const maptData = {
    userLoc: [45.26, -91.14], // the users latitude and longitude
    defaultLoc: [45.26, -91.14],
    userTime: currentDate.toISOString().slice(0, 16), // Format to 'YYYY-MM-DDTHH:mm'
    userWeather: {},
    userEvents: [], // Array of events added by the user
    publicEvents: [], // Array of events shared publicly with all users
    appView: 'addEvent', //
    eventTime: new Date(),
    eventHour: 'no data',
    eventID: null,
    eventToEdit: null,
}

export const fishSpeciesOptions = [
    "Bluegill",
    "Bullhead",
    "Channel catfish",
    "Crappie",
    "Flathead catfish",
    "Lake sturgeon",
    "Largemouth bass",
    "Muskie",
    "Northern pike",
    "Perch",
    "Rock bass",
    "Smallmouth bass",
    "Walleye",
  ];