
// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyCIKY05CetEmQ5zS8pc-jbIs05uhqK5dqE",
    authDomain: "farenow-user.firebaseapp.com",
    projectId: "farenow-user",
    storageBucket: "farenow-user.appspot.com",
    messagingSenderId: "22843191179",
    appId: "1:22843191179:web:08ad45328ba46cedfbc98e",
    measurementId: "G-B6LZBBKDZZ"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

const messaging = firebase?.messaging?.isSupported() ? firebase.messaging() : null;

messaging.onBackgroundMessage(function (payload) {

    const notificationTitle = payload?.data.title;
    const notificationOptions = {
        body: payload?.data.body,
        icon: "/logo192.png",
    };
    // eslint-disable-next-line no-restricted-globals
    self.addEventListener("notificationclick", function (event) {
        event.notification.close();
        // event.waitUntil(
        //     clients.openWindow("https://master.d1vfvqwww9zfmg.amplifyapp.com/")
        // );
    });

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );

});