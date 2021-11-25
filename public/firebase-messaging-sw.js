/*

Give the service worker access to Firebase Messaging.

Note that you can only use Firebase Messaging here, other Firebase libraries are not available in the service worker.

*/

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

/*

Initialize the Firebase app in the service worker by passing in the messagingSenderId.

* New configuration for app@pulseservice.com

*/

firebase.initializeApp({ 
    apiKey: "AIzaSyAQreO3lk_Yap6T8s7o2RVt0tRuEq6dEq4",
    authDomain: "test-push-notification-c2f7e.firebaseapp.com",
    projectId: "test-push-notification-c2f7e",
    storageBucket: "test-push-notification-c2f7e.appspot.com",
    messagingSenderId: "986329488596",
    appId: "1:986329488596:web:ba43f729441da577bd2f41",
    measurementId: "G-5S3WVMW2QW"
    });

/*

Retrieve an instance of Firebase Messaging so that it can handle background messages.

*/

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );

    /* Customize notification here */

    const notificationTitle = "Background";
    const notificationOptions = {
        body: "Background Message .",
        icon: "/itwonders-.png",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );

});