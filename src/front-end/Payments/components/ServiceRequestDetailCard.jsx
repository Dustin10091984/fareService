import { memo } from "react";

const ServiceRequestDetailCard = memo(({ state, serviceDetail }) => {
    return (
        <div className="cart-total d-flex align-items-center justify-content-between">
            <div className="cart-title pt-3">
                <div className="mt-2">
                    Service Name: {serviceDetail.questions?.subServiceName}
                </div>
                <div className="mt-2">
                    Provider Name: {serviceDetail?.provider?.first_name}
                </div>
                <address className="mt-2">
                    Address: {serviceDetail?.address}
                </address>
                <small>Details: {serviceDetail?.detail}</small>
                <br />
                <small>
                    SlotId:{" "}
                    {Array.isArray(serviceDetail?.slots) &&
                        serviceDetail?.slots[0]}
                </small>
                <br />
                <small>Date: {serviceDetail?.dateTime}</small>
            </div>
            <div className="price-qnt-subtotal">
                <ul className="list-heading d-flex align-items-center justify-content-between w-100">
                    <li>{state?.type ? "Price" : "Hourly Rate"}</li>
                    <li>{state?.type ? "Quantity" : "Total Hours"}</li>
                    <li>Total</li>
                </ul>
                <ul className="list-des d-flex align-items-center justify-content-between w-100">
                    <li>{`$${serviceDetail?.provider?.provider_profile?.hourly_rate}`}</li>
                    <li>{serviceDetail?.hours}</li>
                    <li>{`$${
                        serviceDetail?.provider?.provider_profile?.hourly_rate *
                        serviceDetail?.hours
                    }`}</li>
                </ul>
            </div>
        </div>
    );
});

export { ServiceRequestDetailCard };
