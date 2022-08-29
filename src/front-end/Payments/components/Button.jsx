function Button({
    state,
    handlePlaceOrder,
    stripe,
    elements,
    submiting,
    checkoutError,
    serviceRequest,
    handleGoToServicesHistory,
    handleClickMakeRequest,
}) {
    const checkDisabled = (type) => {
        if (type == "order") {
            if (state?.paymentMethod == null || state?.address_id == null) {
                return true;
            }
            if (
                (state?.paymentMethod == 1 && !stripe) ||
                !elements ||
                submiting ||
                checkoutError
            ) {
                return true;
            }
        }
        if (
            type == "serviceRequest" &&
            (!stripe ||
                !elements ||
                submiting ||
                checkoutError ||
                serviceRequest?.loading)
        ) {
            return true;
        }
    };

    if (state?.type && state?.cart_ids.length)
        return (
            <button
                className="button-common mt-5 w-25"
                disabled={checkDisabled("order")}
                onClick={handlePlaceOrder}
            >
                Place Order
            </button>
        );
    else
        return (
            <>
                <button
                    disabled={checkDisabled("serviceRequest")}
                    onClick={
                        serviceRequest?.message == "success" ||
                        serviceRequest?.message == "Order already exist"
                            ? handleGoToServicesHistory
                            : handleClickMakeRequest
                    }
                    className="button-common mt-5 w-25"
                >
                    {serviceRequest?.message == "success" ||
                    serviceRequest?.message == "Order already exist"
                        ? "Go to Services History"
                        : "Make Service Request"}
                </button>
            </>
        );
}

export { Button };
