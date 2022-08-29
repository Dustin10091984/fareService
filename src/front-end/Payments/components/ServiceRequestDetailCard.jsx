const ServiceRequestDetailCard = ({ state, serviceDetail }) => {
    return (
        <div className="cart-total d-flex align-items-center justify-content-between">
            <div className="cart-title">
                {state.type ? "Product Name" : "Service Request"}
            </div>
            <div className="price-qnt-subtotal">
                <ul className="list-heading d-flex align-items-center justify-content-between w-100">
                    <li>{state.type ? "Price" : "Hourly Rate"}</li>
                    <li>{state.type ? "Quantity" : "Total Hours"}</li>
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
};

export { ServiceRequestDetailCard };
