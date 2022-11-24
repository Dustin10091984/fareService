import { initializeApp } from 'firebase/app';
import { getMessaging, getToken as token  } from "firebase/messaging";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIKY05CetEmQ5zS8pc-jbIs05uhqK5dqE",
  authDomain: "farenow-user.firebaseapp.com",
  projectId: "farenow-user",
  storageBucket: "farenow-user.appspot.com",
  messagingSenderId: "22843191179",
  appId: "1:22843191179:web:08ad45328ba46cedfbc98e",
  measurementId: "G-B6LZBBKDZZ"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

// const messaging = firebase?.messaging?.isSupported() ? firebase.messaging() : null;


export const getToken = async () => {
  return token(messaging, { vapidKey: "BJuZVOtwXL0Q7yrD_MHsYT3vbtcaRII0xJyTQAp78rgJzQ1j_EE_CuVPyqyVrzGO_Sli75fEDS3khI9H-7RgKDM" }).then((currentToken) => {
        if (currentToken) {
            return currentToken;
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
};

export const onMessageListener = () => {
    // if(messaging){
    //     return new Promise((resolve) => {
    //         messaging?.onMessage((payload) => {
    //             resolve(payload);
    //         });
    //     });
    // }
}