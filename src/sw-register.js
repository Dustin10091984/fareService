export default function LocalServiceWorkerRegister() {
    const swPath = `${window?.location?.origin}/firebase-messaging-sw.js`;
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register(swPath).then(registration => {
                console.log('Service worker registered');
            }).catch(err => {
                console.log('Service Worker Error', err);
            });
        })
    }
}