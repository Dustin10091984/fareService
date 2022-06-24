import { vehicleListUpdate } from "./../../store/Slices/moving/movingSlice";
import { dispatch } from "./../../store";

export const handleBackendEvents = () => {
    const Echo = window.Echo;
    const eventArray = [
        {
            listen: 'VehicleTypeEvent',
            channels: [
                { "new-vehicle-type": vehicleListUpdate },
                { "update-vehicle-type": vehicleListUpdate },
                { "delete-vehicle-type": vehicleListUpdate },
            ],
        }
    ]
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
}
