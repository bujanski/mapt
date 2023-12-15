// function getLocation () {
    
//     if ("geolocation" in navigator) {
        
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 const lat = position.coords.latitude;
//                 const long = position.coords.longitude;

//                 console.log(lat, long);
//             },
      
//             (error) => {
//                 console.error("Error getting user location:", error);
//             }
//         );
//     }
    
//     else {
//     // Geolocation is not supported by the browser
//         console.error("Geolocation is not supported by this browser.");
//     }
// }