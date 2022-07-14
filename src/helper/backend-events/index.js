import { vehicleListUpdate } from "./../../store/Slices/moving/movingSlice";

export const handleBackendEvents = (dispatch) => {
    const Echo = window.Echo;
    const eventArray = [
        {
            listen: 'VehicleTypeEvent',
            channels: [
                ...[
                    'vehicle-type-created',
                    'vehicle-type-updated',
                    'vehicle-type-deleted'
                ].map((event) => ({ [event]: vehicleListUpdate })),
            ],
        }
    ];
    eventArray.forEach(({ listen, channels }) => {
        channels.forEach((data) => {
            Object.entries(data).forEach(([key, value]) => {
                Echo?.channel(key)
                    .listen(listen, (data) => {
                        dispatch(value(data));
                    });
            })
        })
    });

    // Get Notifications from backend
    // if (localStorage?.user_data && window.Echo.connector.options.auth.headers['Authorization']) {
    //     let user_data = JSON.parse(localStorage.user_data);
    //     Echo?.private(`App.Models.User.${user_data.id}`).notification((notification) => {
    //         console.log(notification);
    //     });
    // }
}
