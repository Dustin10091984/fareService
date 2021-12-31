export default function LocalServiceWorkerRegister() {
    const swPath = `http://localhost:3000/firebase-messaging-sw.js`;
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register(swPath).then(registration => {
                // console.log('Service worker registered', registration);
            });
        });
    }
}