
// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyBwl7MkF5KrDREPzDKIQSxH0sBE93JNSpw",
    authDomain: "farenow-e023a.firebaseapp.com",
    projectId: "farenow-e023a",
    storageBucket: "farenow-e023a.appspot.com",
    messagingSenderId: "604353431757",
    appId: "1:604353431757:web:5dbf862d8c308c80e28184",
    measurementId: "G-1X3ZF9YVWE"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {

    const notificationTitle = payload?.data.title;
    const notificationOptions = {
        body: payload?.data.body,
        icon: "/logo192.png",
    };
    // eslint-disable-next-line no-restricted-globals
    self.addEventListener("notificationclick", function (event) {
        event.notification.close();
        event.waitUntil(
            clients.openWindow("https://master.d1vfvqwww9zfmg.amplifyapp.com/")
        );
    });

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );

});