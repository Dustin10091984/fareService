// import { initializeApp } from 'firebase/app';
// import { getMessaging, getToken } from "firebase/messaging";

// const config = {
//         apiKey: "AIzaSyBwl7MkF5KrDREPzDKIQSxH0sBE93JNSpw",
//         authDomain: "farenow-e023a.firebaseapp.com",
//         projectId: "farenow-e023a",
//         storageBucket: "farenow-e023a.appspot.com",
//         messagingSenderId: "604353431757",
//         appId: "1:604353431757:web:5dbf862d8c308c80e28184",
//         measurementId: "G-1X3ZF9YVWE"
//     };

// export const initializeFirebase = () => {
//     initializeApp(config);
// }

// export const askForPermissioToReceiveNotifications = async () => {
//     // try {
//         // Get registration token. Initially this makes a network call, once retrieved
//         // subsequent calls to getToken will return from cache.
//         const messaging = getMessaging();
//         getToken(messaging, { vapidKey: 'BPCx5OIllrTpV_q1JisNn3o23k1co5usAIwFHCEByNN6aHvucTDL0l9idRk9H2ESXxECuIdybu3MInYYyrVqQ9s' }).then((currentToken) => {
//             if (currentToken) {
//                 // Send the token to your server and update the UI if necessary
//                 // ...
//             } else {
//                 // Show permission request UI
//                 console.log('No registration token available. Request permission to generate one.');
//             }
//         }).catch((err) => {
//             console.log('An error occurred while retrieving token. ', err);
//         });
//     // } catch (error) {
//     //     console.error(error);
//     // }
// }

import { getMessaging, getToken } from "firebase/messaging";

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
getToken(messaging, { vapidKey: 'BPCx5OIllrTpV_q1JisNn3o23k1co5usAIwFHCEByNN6aHvucTDL0l9idRk9H2ESXxECuIdybu3MInYYyrVqQ9s' }).then((currentToken) => {
    if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
    } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
});