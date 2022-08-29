import React, { useState, useEffect, useRef } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import AutoCompleteInput from "../../components/AutoCompleteInput";
import { toast } from "react-toastify";
import Loading from "../common/Loading";
import { HOST } from "../../constants";
import { ReactSwal } from "../../helper/swal";
import { ErrorMessage } from "./components/ErrorMessage";
import { PaymentType } from "./components/PaymentType";
import { PaymentCardList } from "./components/PaymentCardList";
import { Button as ServiceOrOrderBtn } from "./components/Button";
import { OrderDetailCard } from "./components/OrderDetailCard";
import { ServiceRequestDetailCard } from "./components/ServiceRequestDetailCard";

export const Payment = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [checkoutError, setCheckoutError] = useState();
    const loading = useRef(null);
    const success = useRef(null);
    const error = useRef(null);

    /**
     * @description - This function is used to handle the payment process
     */
    const {
        getCartList,
        postRequestService,
        getInitialRequestService,
        addAddress,
        getAddresses,
        createNewOrder,
        // getOrderList,
        initial,
        getPaymentCards,
    } = props;

    /**
     * @description - This get state from redux store
     */
    const {
        serviceRequest,
        cartList,
        addressesLoading,
        addressList,
        addressesError,
        addAddressData,
        orderLoading,
        orderError,
        orderData,
        orderMessage,
        paymentCard,
    } = props;

    const [state, setState] = useState({
        type: props.location.state?.type,
        cart_ids: props?.location?.state?.cart_ids,
        paymentMethod: null,
        addressType: "HOME",
        address: "",
        flat_no: "",
        zip_code: "",
        addNewAddress: false,
        address_id: null,
        selectedAddress: "",
        card_holder_name: "",

        form: {
            serviceDetail: props?.location.state,
            card_number: "",
            card_exp_date: "",
            card_cvc: "",
            card_name: "",
            submiting: false,
        },
        error: {
            card_numberErr: "",
            card_exp_dateErr: "",
            card_cvcErr: "",
            card_nameErr: "",
            stripeErr: "",
            addressErr: "",
            zip_codeErr: "",
        },
    });

    const { serviceDetail, submiting } = state.form;

    const { stripeErr } = state.error;

    useEffect(() => {
        if (addressesLoading)
            toast.info("Loading addresses...", {
                toastId: loading.current,
                autoClose: false,
            });
    }, [addressesLoading]);

    useEffect(() => {
        if (addressesError) {
            toast.dismiss(loading.current);
            toast.error("Error loading addresses", { toastId: error.current });
        }
    }, [addressesError]);

    useEffect(() => {
        if (addressList) toast.dismiss(loading.current);
    }, [addressList]);

    useEffect(() => {
        if (addAddressData.loading) {
            loading.current = toast.info("Loading...", {
                toastId: loading.current,
                autoClose: false,
            });
            return; // return to avoid multiple toast
        }
        if (addAddressData.error == false) {
            setState({ ...state, addNewAddress: false });
            toast.dismiss(loading.current);
            success.current = toast.success("Address added successfully", {
                toastId: success.current,
            });
            return;
        }
        if (addAddressData.error) {
            toast.dismiss(loading.current);
            error.current = toast.error("Error adding address", {
                toastId: error.current,
            });
            return;
        }
    }, [addAddressData]);

    useEffect(() => {
        if (props.location.state == undefined) {
            props.history.push("/");
        }
        if (cartList == "" || cartList == undefined) {
            getCartList();
        }
        getPaymentCards();
        return () => {
            getInitialRequestService();
            initial({ order: "" });
        };
    }, []);

    useEffect(() => {
        if (orderLoading)
            toast.info("Order Creating...", {
                toastId: loading.current,
                autoClose: false,
            });
    }, [orderLoading]);

    useEffect(() => {
        if (orderError) {
            toast.dismiss(loading.current);
            toast.error(orderMessage || "Error creating order", {
                toastId: error.current,
            });
        }
    }, [orderError]);

    useEffect(() => {
        if (orderData && orderLoading == false && orderError == false) {
            toast.dismiss(loading.current);
            toast.success(orderMessage || "Order Created");
            props.history.replace("/food-delivery");
        }
    }, [orderData]);

    useEffect(() => {
        if (
            serviceRequest.error == true &&
            serviceRequest.loading == false &&
            typeof serviceRequest.message == "string"
        ) {
            ReactSwal.fire({
                title: "Error",
                text: serviceRequest.message,
                confirmButtonText: "Close",
                confirmButtonColor: "#fea629",
                icon: "error",
                showCloseButton: true,
                allowOutsideClick: false,
            });
        } else if (
            serviceRequest.error == false &&
            serviceRequest.loading == false &&
            typeof serviceRequest.message == "string"
        ) {
            ReactSwal.fire({
                title: "Success!",
                text: "Successfully created request service",
                confirmButtonText: "Go services history",
                icon: "success",
                confirmButtonColor: "#fea629",
                showCloseButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    handleGoToServicesHistory();
                }
            });
        }
    }, [serviceRequest.error, serviceRequest.loading]);

    const handleChangeZipCode = (e) => {
        const { name, value } = e.target;
        setState((state) => ({ ...state, [name]: value }));
        let errorMsg = "Zip Code may not be less than 3 grater than 15";
        if (value.length > 3 && value.length < 15) {
            errorMsg = "";
        }
        setState((state) => ({
            ...state,
            error: { ...state.error, [`${name}Err`]: errorMsg },
        }));
    };

    const handleFlatNoChange = (e) => {
        if (e.target.value.length <= 5) {
            setState({
                ...state,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleCardDetailsChange = (e) => {
        if (e.error) {
            setCheckoutError(e.error.message);
        } else {
            setState((state) => ({
                ...state,
                error: { ...state.error, stripeErr: undefined },
            }));
            setCheckoutError();
        }
    };

    const handleClickMakeRequest = async () => {
        try {
            setState((state) => ({
                ...state,
                error: { ...state.error, stripeErr: undefined },
            }));
            setState((state) => ({
                ...state,
                form: {
                    ...state.form,
                    serviceDetail: {
                        ...state.form.serviceDetail,
                    },
                },
            }));
            if (state?.card_id) {
                let data = serviceDetail;
                data.card_id = state.card_id;
                // false means this is not form data
                postRequestService(data, false);
                return;
            }
            const { error, token } = await stripe.createToken(
                elements.getElement(CardElement)
            );
            if (token && serviceDetail) {
                let withToken = serviceDetail;
                withToken.token = token.id;
                // false means this is not form data
                postRequestService(withToken, false);
            }
            if (error) {
                setState((state) => ({
                    ...state,
                    error: { ...state.error, stripeErr: error.message },
                }));
            }
        } catch (error) {
            setState((state) => ({
                ...state,
                error: { ...state.error, stripeErr: error.message },
            }));
        }
    };

    const handleGoToServicesHistory = () => {
        getInitialRequestService();
        setState((state) => ({
            ...state,
            form: {
                ...state.form,
                serviceDetail: "",
            },
        }));
        props.history.replace({
            pathname: "/services-history",
        });
    };

    const handleAddressClick = () => getAddresses();

    const handleAddNewAddressClick = () => {
        if (state.addNewAddress == false) {
            setState((state) => ({
                ...state,
                addNewAddress: true,
            }));
            return;
        }
        addAddress({
            type: state.addressType,
            address: state.address,
            flat_no: state.flat_no !== "" ? state.flat_no : null,
            zip_code: state.zip_code,
        });
    };

    const handlePlaceOrder = async () => {
        try {
            if (state.paymentMethod == 1) {
                setState((state) => ({
                    ...state,
                    error: { ...state.error, stripeErr: undefined },
                }));
                if (state?.card_id == undefined) {
                    const { error, token } = await stripe.createToken(
                        elements.getElement(CardElement)
                    );
                    if (error) {
                        setState((state) => ({
                            ...state,
                            error: { ...state.error, stripeErr: error.message },
                        }));
                        return;
                    }
                    if (token) {
                        let data = {};
                        data.token = token.id;
                        data.cart_ids = state.cart_ids;
                        data.address_id = state.address_id;
                        createNewOrder(data);
                    }
                }
                if (state?.card_id) {
                    let data = {};
                    data.card_id = state?.card_id;
                    data.cart_ids = state.cart_ids;
                    data.address_id = state.address_id;
                    createNewOrder(data);
                }
            } else {
                let data = {};
                data.type = "CASH_ON_DELIVERY";
                data.cart_ids = state.cart_ids;
                data.address_id = state.address_id;
                createNewOrder(data);
            }
        } catch (error) {
            setState((state) => ({
                ...state,
                error: { ...state.error, stripeErr: error.message },
            }));
        }
    };

    const handlePayemntCard = (id) => {
        setState((state) => ({
            ...state,
            card_id: id == state.card_id ? undefined : id,
        }));
    };

    const handleChangePaymentMethod = (data) => {
        setState((state) => ({
            ...state,
            paymentMethod: data,
        }));
    };

    const handleCardHolderNameChange = ({ target: { value } }) => {
        setState((state) => ({
            ...state,
            card_holder_name: value,
        }));
    };

    return (
        <>
            <div className="moving-help-sec pad-Y m-0">
                <Loading
                    loading={serviceRequest.loading || paymentCard.loading}
                />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="moving-search-box">
                                <ErrorMessage
                                    stripeErr={stripeErr}
                                    serviceRequest={serviceRequest}
                                />
                                <div className="d-flex justify-content-center">
                                    <div className="m-search-right-box">
                                        <div className="title-move mb-5">
                                            {state.type && state.cart_ids
                                                ? "Please Select payment method"
                                                : "Please fill Card details"}
                                        </div>
                                        <PaymentType
                                            state={state}
                                            handleChangePaymentMethod={
                                                handleChangePaymentMethod
                                            }
                                        />
                                        <PaymentCardList
                                            {...{
                                                handlePayemntCard,
                                                handleCardDetailsChange,
                                                handleCardHolderNameChange,
                                                state,
                                                paymentCard,
                                                checkoutError,
                                            }}
                                        />
                                        {(state.paymentMethod === 1 ||
                                            state.paymentMethod === 0) && (
                                            <>
                                                <div
                                                    className={`common-input m-4`}
                                                >
                                                    <input
                                                        placeholder="Select Address"
                                                        readOnly
                                                        name="address"
                                                        value={
                                                            state.selectedAddress
                                                        }
                                                        data-backdrop="static"
                                                        data-keyboard="false"
                                                        data-toggle="modal"
                                                        data-target={`#model`}
                                                        onClick={
                                                            handleAddressClick
                                                        }
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="moving-des mt-5">
                                    <p className="text-center">
                                        By clicking the button below, I agree to
                                        Farenow's Terms of{" "}
                                        <br className="d-none d-md-block" />
                                        Use and Cancellation Policy and
                                        understand that my
                                        <br className="d-none d-md-block" />
                                        payment method will be charged.
                                    </p>
                                </div>

                                <div className="text-center">
                                    <ServiceOrOrderBtn
                                        {...{
                                            state,
                                            handlePlaceOrder,
                                            stripe,
                                            elements,
                                            submiting,
                                            checkoutError,
                                            serviceRequest,
                                            handleGoToServicesHistory,
                                            handleClickMakeRequest,
                                        }}
                                    />
                                </div>

                                <div className="row pad-t">
                                    <div className="col-md-12 pb-5">
                                        <hr />
                                    </div>

                                    <div className="col-md-12">
                                        {state.type &&
                                        state.cart_ids.length > 0 ? (
                                            <OrderDetailCard
                                                {...{
                                                    state,
                                                    cartList,
                                                    HOST,
                                                }}
                                            />
                                        ) : (
                                            <ServiceRequestDetailCard
                                                {...{
                                                    state,
                                                    serviceDetail,
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade bd-example-modal-lg"
                id="model"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered modal-lg"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title display-4"
                                id="exampleModalLongTitle"
                            >
                                {state.addNewAddress
                                    ? "Add New Address"
                                    : "Select Address"}
                            </h5>
                            <button
                                onClick={() =>
                                    setState({
                                        ...state,
                                        addNewAddress: false,
                                        address: "",
                                    })
                                }
                                // type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row m-2">
                                {state.addNewAddress && (
                                    <ul className="time-list d-flex align-items-center justify-content-center flex-wrap s">
                                        <li
                                            style={
                                                state.addressType == "HOME"
                                                    ? {
                                                          backgroundColor:
                                                              "#2F88E7",
                                                          color: "white",
                                                      }
                                                    : {
                                                          color: "black",
                                                      }
                                            }
                                            onClick={() => {
                                                setState({
                                                    ...state,
                                                    addressType: "HOME",
                                                });
                                            }}
                                            className="d-flex align-items-center justify-content-center m-2"
                                        >
                                            {" "}
                                            Home
                                        </li>
                                        <li
                                            style={
                                                state.addressType == "OFFICE"
                                                    ? {
                                                          backgroundColor:
                                                              "#2F88E7",
                                                          color: "white",
                                                      }
                                                    : {
                                                          color: "black",
                                                      }
                                            }
                                            onClick={() => {
                                                setState({
                                                    ...state,
                                                    addressType: "OFFICE",
                                                });
                                            }}
                                            className="d-flex align-items-center justify-content-center m-2"
                                        >
                                            {" "}
                                            Office
                                        </li>
                                        <li
                                            style={
                                                state.addressType == "OTHER"
                                                    ? {
                                                          backgroundColor:
                                                              "#2F88E7",
                                                          color: "white",
                                                      }
                                                    : {
                                                          color: "black",
                                                      }
                                            }
                                            onClick={() => {
                                                setState({
                                                    ...state,
                                                    addressType: "OTHER",
                                                });
                                            }}
                                            className="d-flex align-items-center justify-content-center m-2"
                                        >
                                            {" "}
                                            Other
                                        </li>
                                    </ul>
                                )}
                                {addressesLoading && (
                                    <div className="d-flex justify-content-center">
                                        <i className="fa fa-spinner fa-pulse fa-5x"></i>
                                    </div>
                                )}
                                {state.addNewAddress ? (
                                    <div className="col-12">
                                        <AutoCompleteInput
                                            title="Address"
                                            classes="m-5"
                                            placeholder="Add Address"
                                            handleOnChange={(address) => {
                                                let mesError =
                                                    state.address.length < 5
                                                        ? "Address must be at least 5 characters"
                                                        : "";
                                                setState({
                                                    ...state,
                                                    address,
                                                    error: {
                                                        ...state.error,
                                                        addressErr: mesError,
                                                    },
                                                });
                                            }}
                                            value={state.address}
                                            handleOnSelect={(address) =>
                                                setState({
                                                    ...state,
                                                    address,
                                                })
                                            }
                                        />

                                        <div className="text-danger">
                                            {state?.error?.addressErr}
                                        </div>
                                        <label
                                            className="col-md-12 text-dark mb-2"
                                            style={{ fontSize: 20 }}
                                            htmlFor="flat_no"
                                        >
                                            Flat No
                                        </label>
                                        <div className="common-input">
                                            <input
                                                id="flat_no"
                                                name="flat_no"
                                                value={state.flat_no}
                                                placeholder="Add flat no"
                                                onChange={handleFlatNoChange}
                                            ></input>
                                        </div>
                                        <label
                                            className="col-md-12 text-dark mb-2"
                                            style={{ fontSize: 20 }}
                                            htmlFor="zip_code"
                                        >
                                            Zip Code
                                        </label>
                                        <div className="common-input">
                                            <input
                                                id="zip_code"
                                                placeholder="Add flat no"
                                                name="zip_code"
                                                value={state.zip_code}
                                                onChange={handleChangeZipCode}
                                            ></input>
                                        </div>
                                        <div className="text-danger">
                                            {state?.error?.zip_codeErr}
                                        </div>
                                    </div>
                                ) : addressList?.length > 0 ? (
                                    addressList?.map((address, index) => (
                                        <div
                                            key={index}
                                            className="address-card ml-4 mr-4"
                                            style={
                                                state.address_id == address.id
                                                    ? {
                                                          backgroundColor:
                                                              "#2F88E8",
                                                          color: "white",
                                                      }
                                                    : {}
                                            }
                                            onClick={() => {
                                                setState({
                                                    ...state,
                                                    address_id: address.id,
                                                    selectedAddress:
                                                        address.address,
                                                });
                                            }}
                                            data-dismiss="modal"
                                            aria-label="Close"
                                        >
                                            <div>{address?.address}</div>
                                            <div className="address-zip">
                                                Zip Code: {address?.zip_code}
                                            </div>
                                            <div className="address-type">
                                                {address.type}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    addressesLoading == false && (
                                        <center className="text-center text-danger">
                                            NOT FOUND
                                        </center>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            {state.addNewAddress == true && (
                                <button
                                    className="button-common"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() =>
                                        state.addNewAddress &&
                                        setState({
                                            ...state,
                                            addNewAddress: false,
                                            address: "",
                                        })
                                    }
                                >
                                    Cancel
                                </button>
                            )}

                            <button
                                className="button-common-2"
                                onClick={handleAddNewAddressClick}
                                disabled={
                                    (state.error?.addressErr ||
                                        state.error?.zip_codeErr ||
                                        state.address.length == 0) &&
                                    state.addNewAddress !== false
                                }
                            >
                                New Address
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
