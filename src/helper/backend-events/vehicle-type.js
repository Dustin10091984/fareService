window.Echo?.channel(`new-vehicle-type`)
    .listen("VehicleTypeEvent", (data) => {
        console.log(data);
    });
window.Echo?.channel('update-vehicle-type')
    .listen("VehicleTypeEvent", (data) => {
        console.log(data);
    });
window.Echo?.channel('delete-vehicle-type')
    .listen("VehicleTypeEvent", (data) => {
        console.log(data);
    });