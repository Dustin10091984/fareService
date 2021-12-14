import React, { useState, useEffect, useRef } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { getCartList } from "../store/Slices/cart/cartsSlice";
import { useDispatch, useSelector } from "react-redux";
import AutoCompleteInput from "../components/AutoCompleteInput";
import {
    postRequestService,
    getInitialRequestService,
} from "../store/Slices/services/RequestServiceSclice";
import { addAddress, getAddresses } from "./../store/Slices/UserSlice";
import { toast } from "react-toastify";
export const Payment = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [checkoutError, setCheckoutError] = useState();
    const loading = useRef(null);
    const dispatch = useDispatch();

    const serviceRequest = useSelector((state) => state.serviceRequest);
    const cartList = useSelector((state) => state.cartsReducer?.list.cart);

    const addressesLoading = useSelector(
        (state) => state.user?.addresses?.loading
    );
    const addressList = useSelector((state) => state.user?.addresses?.data);
    const addressesError = useSelector((state) => state.user?.addresses?.error);

    useEffect(() => {
        if (addressesLoading) toast.info("Loading addresses...");
    }, [addressesLoading]);

    useEffect(() => {
        if (addressesError) {
            toast.dismiss(loading.current);
            toast.error("Error loading addresses");
        }
    }, [addressesError]);

    useEffect(() => {
        if (addressList) toast.dismiss(loading.current);
    }, [addressList]);

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

        form: {
            serviceDetail: props?.location.state,
            // first_name: '',
            // last_name: '',
            // street: '',
            // city: '',
            // zip_code: '',
            // state_name: '',
            card_number: "",
            card_exp_date: "",
            card_cvc: "",
            card_name: "",
            submiting: false,
        },
        error: {
            // first_nameErr: '',
            // last_nameErr: '',
            // streetErr: '',
            // cityErr: '',
            // zip_codeErr: '',
            // state_nameErr: ''
            card_numberErr: "",
            card_exp_dateErr: "",
            card_cvcErr: "",
            card_nameErr: "",
            stripeErr: "",
            addressErr: "",
            zip_codeErr: "",
        },
    });

    const {
        serviceDetail,
        // first_name,
        // last_name,
        // street,
        // city,
        // zip_code,
        // state_name,
        card_number,
        card_exp_date,
        card_cvc,
        card_name,
        submiting,
    } = state.form;

    const {
        // first_nameErr,
        // last_nameErr,
        // streetErr,
        // cityErr,
        // zip_codeErr,
        // state_nameErr,
        card_numberErr,
        card_exp_dateErr,
        card_cvcErr,
        card_nameErr,
        stripeErr,
    } = state.error;

    useEffect(() => {
        if (props.location.state == undefined) {
            props.history.push("/");
        }
        if (cartList == "" || cartList == undefined) {
            dispatch(getCartList());
        }
        return () => {
            dispatch(getInitialRequestService());
        };
    }, []);

    /**
     * Validate first and last name
     *
     * @param {*} e
     */
    // const handleChangeName = (e) => {
    //     const { name, value } = e.target
    //     const form = { ...state.form, [name]: value };
    //     const regex = /^[a-zA-Z ]{1,50}$/;
    //     setState((state) => ({ ...state, form: form }));
    //     let errorMsg = "Name should be srting and length min 1 and max 50"
    //     if(regex.test(value) === true) {
    //         errorMsg = '';
    //     }
    //     setState((state) => ({ ...state, error: { ...state.error, [`${name}Err`]: errorMsg } }))
    // }

    // const handleChangeStreet = (e) => {
    //     const { name, value } = e.target
    //     const form = { ...state.form, [name]: value };
    //     setState((state) => ({ ...state, form: form }));
    //     let errorMsg = "Street address may not be grater than 100"
    //     if(value.length < 100){
    //         errorMsg = ''
    //     }
    //     setState((state) => ({ ...state, error: { ...state.error, [`${name}Err`]: errorMsg } }))
    // }

    // const handleChangeCity = (e) => {
    //     const regex = /^[a-zA-Z ]{0,50}$/;
    //     const { name, value } = e.target
    //     const form = { ...state.form, [name]: value };
    //     setState((state) => ({ ...state, form: form }));
    //     let errorMsg = "City name should be srting and length min 1 and max 50"
    //     if(regex.test(value) === true) {
    //         errorMsg = '';
    //     }
    //     setState((state) => ({ ...state, error: { ...state.error, [`${name}Err`]: errorMsg } }));
    // }

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

    // const handleChangeStateName = (e) => {
    //     const regex = /^[a-zA-Z ]{0,50}$/;
    //     const { name, value } = e.target
    //     const form = { ...state.form, [name]: value };
    //     setState((state) => ({ ...state, form: form }));
    //     let errorMsg = "State name should be srting and length min 1 and max 50"
    //     if(regex.test(value) === true) {
    //         errorMsg = '';
    //     }
    //     setState((state) => ({ ...state, error: { ...state.error, [`${name}Err`]: errorMsg } }));
    // }

    // function AmexCardnumber(inputtxt) {
    //     let cardno = /^(?:3[47][0-9]{13})$/;
    //     return cardno.test(inputtxt);
    // }

    // function VisaCardnumber(inputtxt) {
    //     let cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    //     return cardno.test(inputtxt);
    // }

    // function MasterCardnumber(inputtxt) {
    //     let cardno = /^(?:5[1-5][0-9]{14})$/;
    //     return cardno.test(inputtxt);
    // }

    // function DiscoverCardnumber(inputtxt) {
    //     let cardno = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    //     return cardno.test(inputtxt);
    // }

    // function DinerClubCardnumber(inputtxt) {
    //     let cardno = /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/;
    //     return cardno.test(inputtxt);
    // }

    // function JCBCardnumber(inputtxt) {
    //     let cardno = /^(?:(?:2131|1800|35\d{3})\d{11})$/;
    //     return cardno.test(inputtxt);
    // }

    // function IsValidCreditCardNumber(cardNumber) {

    // let cardType = null;
    // if (VisaCardnumber(cardNumber)) {
    //     cardType = "visa";
    // } else if (MasterCardnumber(cardNumber)) {
    //     cardType = "mastercard";
    // } else if (AmexCardnumber(cardNumber)) {
    //     cardType = "americanexpress";
    // } else if (DiscoverCardnumber(cardNumber)) {
    //     cardType = "discover";
    // } else if (DinerClubCardnumber(cardNumber)) {
    //     cardType = "dinerclub";
    // } else if (JCBCardnumber(cardNumber)) {
    //     cardType = "jcb";
    // }
    //     return cardType;
    // }

    // function luhnCheck(val) {
    //     let sum = 0;
    //     for (let i = 0; i < val.length; i++) {
    //         let intVal = parseInt(val.substr(i, 1));
    //         if (i % 2 == 0) {
    //             intVal *= 2;
    //             if (intVal > 9) {
    //                 intVal = 1 + (intVal % 10);
    //             }
    //         }
    //         sum += intVal;
    //     }
    //     return (sum % 10) == 0;
    // }

    // const handleChangeCardNumber = (e) => {
    //     const regex = new RegExp("^[0-9]{16}$");;
    //     const { name, value } = e.target
    //     const form = { ...state.form, [name]: value };
    //     setState((state) => ({ ...state, form: form }));
    //     let errorMsg = "Please add valid card"
    //     if(regex.test(value) && luhnCheck(value)){
    //         errorMsg = '';
    //     }
    //     setState((state) => ({ ...state, error: { ...state.error, [`${name}Err`]: errorMsg } }))
    // }

    // const handleChangeCardExpDate = (e) => {
    //     const regex = /(0[1-9]|1[0-2])[/][0-9]{2}/;
    //     const { name, value } = e.target
    //     const form = { ...state.form, [name]: value };
    //     setState((state) => ({ ...state, form: form }));
    //     let errorMsg = "Please add valid date"
    //     if(regex.test(value)){
    //          // get current year and month
    //         let d = new Date();
    //         let currentYear = d.getFullYear();
    //         let currentMonth = d.getMonth() + 1;
    //         // get parts of the expiration date
    //         let parts = value.split('/');
    //         let year = parseInt(parts[1], 10) + 2000;
    //         let month = parseInt(parts[0], 10);

    //         if ((year > currentYear && parts[1].length == 2)|| (parts[1].length == 2 && (year == currentYear && month > currentMonth))) {
    //             errorMsg = '';
    //         }
    //     }
    //     setState((state) => ({ ...state, error: { ...state.error, [`${name}Err`]: errorMsg } }))
    // }

    // const handleChangeCardCvc = (e) => {
    //     const regex = /^[0-9]{3,4}$/;
    //     const { name, value } = e.target
    //     const form = { ...state.form, [name]: value };
    //     setState((state) => ({ ...state, form: form }));
    //     let errorMsg = "Please add valid CVC"
    //     if(regex.test(value)){
    //         errorMsg = '';
    //     }
    //     setState((state) => ({ ...state, error: { ...state.error, [`${name}Err`]: errorMsg } }))
    // }

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
        const cardElement = elements.getElement("card");
        try {
            setState((state) => ({
                ...state,
                error: { ...state.error, stripeErr: undefined },
            }));
            const { error, token } = await stripe.createToken(
                elements.getElement(cardElement)
            );
            if (token && serviceDetail !== undefined) {
                setState((state) => ({
                    ...state,
                    form: {
                        ...state.form,
                        serviceDetail: {
                            ...state.form.serviceDetail,
                            token: token.id,
                        },
                    },
                }));
                let withToken = serviceDetail;
                withToken.token = token.id;
                // false means this is not form data
                dispatch(postRequestService(withToken, false));
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
        dispatch(getInitialRequestService());
        setState((state) => ({
            ...state,
            form: {
                ...state.form,
                serviceDetail: "",
            },
        }));
        props.history.push({
            pathname: "/services-history",
        });
    };

    const handleAddressClick = () => {
        dispatch(getAddresses());
    };

    const handleAddNewAddressClick = () => {
        if (state.addNewAddress == false) {
            setState((state) => ({
                ...state,
                addNewAddress: true,
            }));
            return;
        }
        dispatch(
            addAddress({
                type: state.addressType,
                address: state.address,
                flat_no: state.flat_no !== "" ? state.flat_no : null,
                zip_code: state.zip_code,
            })
        );
    };

    const handlePlaceOrder = async () => {
        // try {
        const cardElement = elements.getElement("card");
        if (state.paymentMethod == 1) {
            setState((state) => ({
                ...state,
                error: { ...state.error, stripeErr: undefined },
            }));
            const { error, token } = await stripe.createToken(
                elements.getElement(cardElement)
            );
            console.log("====================================");
            console.log(token);
            console.log("====================================");
            if (error) {
                console.log(error);
                setState((state) => ({
                    ...state,
                    error: { ...state.error, stripeErr: error.message },
                }));
            }
        } else {
            console.log("hello");
        }
        // } catch (error) {
        //     console.log(error, 2);
        //     setState((state) => ({
        //         ...state,
        //         error: { ...state.error, stripeErr: error.message },
        //     }));
        // }
    };
    return (
        <>
            <div className="moving-help-sec pad-Y m-0">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="moving-search-box">
                                {stripeErr ? (
                                    <div
                                        className="col-12  alert alert-danger text-center"
                                        role="alert"
                                        style={{ fontSize: 15 }}
                                    >
                                        please enter valid card details
                                    </div>
                                ) : (
                                    ""
                                )}
                                {serviceRequest != "" &&
                                    (() => {
                                        if (
                                            serviceRequest.error == false &&
                                            serviceRequest.loading == true
                                        ) {
                                            return (
                                                <div
                                                    className="col-12  alert alert-primary text-center"
                                                    role="alert"
                                                    style={{ fontSize: 15 }}
                                                >
                                                    Please loading
                                                </div>
                                            );
                                        }

                                        if (
                                            serviceRequest.error == true &&
                                            serviceRequest.loading == false
                                        ) {
                                            switch (
                                                typeof serviceRequest.message
                                            ) {
                                                case "string":
                                                    return (
                                                        <div
                                                            className="col-12  alert alert-danger text-center"
                                                            role="alert"
                                                            style={{
                                                                fontSize: 15,
                                                            }}
                                                        >
                                                            {
                                                                serviceRequest.message
                                                            }
                                                        </div>
                                                    );
                                                    break;
                                                case "array":
                                                    const errorMsg =
                                                        Object.values(
                                                            serviceRequest.message
                                                        );
                                                    return (
                                                        <div
                                                            className="col-12  alert alert-danger text-center"
                                                            role="alert"
                                                            style={{
                                                                fontSize: 15,
                                                            }}
                                                        >
                                                            {errorMsg.map(
                                                                (
                                                                    msg,
                                                                    index
                                                                ) => (
                                                                    <React.Fragment
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {msg}
                                                                        <br />
                                                                    </React.Fragment>
                                                                )
                                                            )}
                                                        </div>
                                                    );
                                                    break;
                                            }
                                        }

                                        if (
                                            serviceRequest.error == false &&
                                            serviceRequest.loading == false
                                        ) {
                                            switch (
                                                typeof serviceRequest.message
                                            ) {
                                                case "string":
                                                    return (
                                                        <div
                                                            className="col-12  alert alert-success text-center"
                                                            role="alert"
                                                            style={{
                                                                fontSize: 15,
                                                            }}
                                                        >
                                                            {
                                                                serviceRequest.message
                                                            }
                                                        </div>
                                                    );
                                                    break;
                                                // case 'array':
                                                //     console.log('array');
                                                //     break;
                                            }
                                        }
                                    })()}
                                <div className="d-flex justify-content-center">
                                    {/* <div className="m-search-left-box">
                                        <div className="title-move mb-5">
                                        Add Adress
                                        </div>
                                        <div className="mb-4 d-flex align-items-center justify-content-between">
                                            <div className="common-input pr-2">
                                                <input type="text" defaultValue={first_name} name="first_name" onChange={handleChangeName} placeholder="First Name"/>
                                            <p className="text-danger">{first_nameErr}</p>
                                            </div>
                                            <div className="common-input pl-2">
                                                <input type="text" defaultValue={last_name} name="last_name" onChange={handleChangeName} placeholder="Last Name" />
                                        <p className="text-danger">{last_nameErr}</p>
                                            </div>
                                        </div>
                                        <div className="mb-4 d-flex align-items-center justify-content-between">
                                            <div className="common-input pr-2">
                                                <input type="text" defaultValue={street} name="street" onChange={handleChangeStreet} placeholder="Street" />
                                                <p className="text-danger">{streetErr}</p>
                                            </div>
                                            <div className="common-input pl-2">
                                                <input type="text" defaultValue={city} name="city" onChange={handleChangeCity} placeholder="City" />
                                                <p className="text-danger">{cityErr}</p>
                                            </div>
                                        </div>
                                        <div className="mb-4 d-flex align-items-center justify-content-between">
                                            <div className="common-input">
                                                <input type="text" defaultValue={zip_code} name="zip_code" onChange={handleChangeZipCode} placeholder="Zip Code" />
                                                <p className="text-danger">{zip_codeErr}</p>
                                            </div>
                                            <div className="common-input px-4">
                                                <input type="text" defaultValue={state_name} name="zip_code" onChange={handleChangeStateName} placeholder="State" />
                                                <p className="text-danger">{state_nameErr}</p>
                                            </div>
                                            <div className="common-input">
                                                <input type="text" placeholder="Apt" />
                                            </div>
                                        </div>
                                        <div className="common-input">
                                            <input type="text" placeholder="+92 : Phone Number" />
                                        </div>
                                    </div> */}

                                    {/* right box */}
                                    <div className="m-search-right-box">
                                        <div className="title-move mb-5">
                                            {state.type && state.cart_ids
                                                ? "Please Select payment method"
                                                : "Please fill Card details"}
                                        </div>
                                        {state.type && state.cart_ids && (
                                            <>
                                                <div
                                                    className="form-check ml-5"
                                                    onClick={() => {
                                                        setState({
                                                            ...state,
                                                            paymentMethod: 0,
                                                        });
                                                    }}
                                                >
                                                    <input
                                                        type="radio"
                                                        className="form-check-input radio"
                                                        checked={
                                                            state.paymentMethod ===
                                                            0
                                                        }
                                                        defaultValue={0}
                                                        readOnly
                                                        onClick={() => {
                                                            setState({
                                                                ...state,
                                                                paymentMethod: 0,
                                                            });
                                                        }}
                                                    />
                                                    <label
                                                        className="form-check-label ml-4 option"
                                                        htmlFor={`radio`}
                                                    >
                                                        Cash on Delivery
                                                    </label>
                                                </div>
                                                <div
                                                    className="form-check ml-5 mt-2"
                                                    onClick={() => {
                                                        setState({
                                                            ...state,
                                                            paymentMethod: 1,
                                                        });
                                                    }}
                                                >
                                                    <input
                                                        type="radio"
                                                        className="form-check-input radio"
                                                        checked={
                                                            state.paymentMethod ===
                                                            1
                                                        }
                                                        defaultValue={1}
                                                        readOnly
                                                    />
                                                    <label
                                                        className="form-check-label ml-4 option"
                                                        htmlFor={`radio`}
                                                    >
                                                        Online pay
                                                    </label>
                                                </div>
                                            </>
                                        )}
                                        {(state.paymentMethod === 1 ||
                                            state.paymentMethod === undefined ||
                                            state.cart_ids == undefined) && (
                                            <>
                                                <CardElement
                                                    onChange={
                                                        handleCardDetailsChange
                                                    }
                                                    className="m-5"
                                                />
                                                <p className="text-danger">
                                                    {checkoutError}
                                                </p>
                                            </>
                                        )}
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
                                        {/* <div className="mb-4 d-flex align-items-center">
                                            <div className="common-input">
                                                <input type="text" defaultValue={card_number} name="card_number" onChange={handleChangeCardNumber} placeholder="Credit Card Number" />
                                                <p className="text-danger">{card_numberErr}</p>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                            <div className="common-input mb-4 pr-2">
                                                <input type="text" defaultValue={card_exp_date} name="card_exp_date" onChange={handleChangeCardExpDate} placeholder="Expiration date ex. 12/22" />
                                                <p className="text-danger">{card_exp_dateErr}</p>
                                            </div>
                                            <div className="common-input mb-4 pl-2">
                                                <input type="text" defaultValue={card_cvc} name="card_cvc" onChange={handleChangeCardCvc} placeholder="CVC ex. 123" />
                                                <p className="text-danger">{card_cvcErr}</p>
                                            </div>
                                        </div>

                                        <div className="mb-4 d-flex align-items-center">
                                            <div className="common-input">
                                                <input type="text" defaultValue={card_name} name="card_name" onChange={handleChangeName} placeholder="Credit Card Name" />
                                                <p className="text-danger">{card_nameErr}</p>
                                            </div>
                                        </div> */}
                                        {/* 
                                        <div className="card-img">
                                            <img src="/assets/img/card-imgs.png" className="img-fluid" alt="" />
                                        </div> */}
                                    </div>
                                </div>

                                <div className="moving-des mt-5">
                                    <p className="text-center">
                                        By clicking the button below, I agree to
                                        Handy's Terms of{" "}
                                        <br className="d-none d-md-block" />
                                        Use and Cancellation Policy and
                                        understand that my
                                        <br className="d-none d-md-block" />
                                        payment method will be charged.
                                    </p>
                                </div>

                                <div className="text-center">
                                    {state.type == undefined ||
                                    state.cart_ids == undefined ? (
                                        <button
                                            disabled={
                                                !stripe ||
                                                !elements ||
                                                submiting ||
                                                checkoutError ||
                                                serviceRequest.loading
                                            }
                                            onClick={
                                                serviceRequest.message ==
                                                    "success" ||
                                                serviceRequest.message ==
                                                    "Order already exist"
                                                    ? handleGoToServicesHistory
                                                    : handleClickMakeRequest
                                            }
                                            className="button-common mt-5 w-50"
                                        >
                                            {serviceRequest.message ==
                                                "success" ||
                                            serviceRequest.message ==
                                                "Order already exist"
                                                ? "Go to Services History"
                                                : "Make Service Request"}
                                        </button>
                                    ) : (
                                        <button
                                            className="button-common mt-5 w-50"
                                            disabled={(() => {
                                                if (
                                                    state.paymentMethod ==
                                                        null ||
                                                    state.address_id == null
                                                ) {
                                                    return true;
                                                }
                                                if (
                                                    (state.paymentMethod == 1 &&
                                                        !stripe) ||
                                                    !elements ||
                                                    submiting ||
                                                    checkoutError
                                                ) {
                                                    return true;
                                                }
                                            })()}
                                            onClick={handlePlaceOrder}
                                        >
                                            Place Order
                                        </button>
                                    )}
                                </div>

                                <div className="row pad-t">
                                    <div className="col-md-12 pb-5">
                                        <hr />
                                    </div>

                                    <div className="col-md-12">
                                        {state.type &&
                                        state.cart_ids.length > 0 ? (
                                            <>
                                                {state.cart_ids?.map((item) => {
                                                    const cart = cartList?.find(
                                                        (cart) =>
                                                            cart.id == item
                                                    );
                                                    const food = cart?.food;
                                                    const product =
                                                        cart?.product;
                                                    if (food || product) {
                                                        return (
                                                            <div
                                                                key={item}
                                                                className="cart-total cart-page d-flex align-items-center justify-content-between"
                                                            >
                                                                <div className="d-flex align-items-center justify-content">
                                                                    <div className="cart-img">
                                                                        <img
                                                                            src={
                                                                                (food?.image &&
                                                                                    food.image) ||
                                                                                "/assets/img/cart-prod.jpg" ||
                                                                                (product?.image &&
                                                                                    product.image) ||
                                                                                "/assets/img/cart-prod.jpg"
                                                                            }
                                                                            className="img-fluid"
                                                                            alt=""
                                                                            onError={(
                                                                                e
                                                                            ) => {
                                                                                e.target.src =
                                                                                    "/assets/img/cart-prod.jpg";
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div className="cart-title">
                                                                        {(food?.name &&
                                                                            food.name) ||
                                                                            (product?.name &&
                                                                                product.name)}
                                                                    </div>
                                                                </div>
                                                                <div className="price-qnt-subtotal d-flex align-items-center justify-content-between flex-column">
                                                                    <ul className="list-heading d-flex align-items-center justify-content-between w-100">
                                                                        <li>
                                                                            Price
                                                                        </li>
                                                                        <li>
                                                                            Quantity
                                                                        </li>
                                                                        <li>
                                                                            Subtotal
                                                                        </li>
                                                                    </ul>
                                                                    <ul className="list-des d-flex align-items-center justify-content-between w-100">
                                                                        <li>
                                                                            $
                                                                            {(food?.price &&
                                                                                food.price) ||
                                                                                (product?.price &&
                                                                                    product.price)}
                                                                        </li>
                                                                        <li
                                                                            className={
                                                                                "d-flex justify-content-center"
                                                                            }
                                                                        >
                                                                            {
                                                                                cart?.quantity
                                                                            }
                                                                        </li>
                                                                        <li>
                                                                            $
                                                                            {
                                                                                cart?.price
                                                                            }
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                }) || "NOT FOUND"}
                                                {state.type && state.cart_ids && (
                                                    <div className="cart-price">
                                                        Total
                                                        {` $${(() => {
                                                            let total = 0;
                                                            state?.cart_ids?.forEach(
                                                                (item) => {
                                                                    total +=
                                                                        parseInt(
                                                                            cartList?.find(
                                                                                (
                                                                                    cart
                                                                                ) =>
                                                                                    cart.id ==
                                                                                    item
                                                                            )
                                                                                .price
                                                                        );
                                                                }
                                                            );
                                                            return total;
                                                        })()}`}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="cart-total d-flex align-items-center justify-content-between">
                                                <div className="cart-title">
                                                    {state.type
                                                        ? "Product Name"
                                                        : "Service Request"}
                                                </div>
                                                <div className="price-qnt-subtotal">
                                                    <ul className="list-heading d-flex align-items-center justify-content-between w-100">
                                                        <li>
                                                            {state.type
                                                                ? "Price"
                                                                : "Hourly Rate"}
                                                        </li>
                                                        <li>
                                                            {state.type
                                                                ? "Quantity"
                                                                : "Total Hours"}
                                                        </li>
                                                        <li>Total</li>
                                                    </ul>

                                                    {(() => {
                                                        if (
                                                            state.type ==
                                                                undefined &&
                                                            serviceDetail
                                                                ?.provider
                                                                ?.provider_profile
                                                                ?.hourly_rate &&
                                                            serviceDetail.hours
                                                        ) {
                                                            const hourly_rate =
                                                                serviceDetail
                                                                    ?.provider
                                                                    ?.provider_profile
                                                                    ?.hourly_rate;
                                                            const hours =
                                                                serviceDetail?.hours;
                                                            return (
                                                                <ul className="list-des d-flex align-items-center justify-content-between w-100">
                                                                    <li>{`$${hourly_rate}`}</li>
                                                                    <li>
                                                                        {hours}
                                                                    </li>
                                                                    <li>{`$${
                                                                        hourly_rate *
                                                                        hours
                                                                    }`}</li>
                                                                </ul>
                                                            );
                                                        }
                                                    })()}
                                                    {/* <ul className="list-heading d-flex align-items-center justify-content-between w-100">
                                                        <li></li>
                                                        <li>Shipping</li>
                                                        <li>Total</li>
                                                    </ul>
                                                    <ul className="list-des d-flex align-items-center justify-content-between w-100">
                                                        <li></li>
                                                        <li>00</li>
                                                        <li>$122.00</li>
                                                    </ul> */}
                                                </div>
                                            </div>
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
                                                onChange={(e) =>
                                                    setState({
                                                        ...state,
                                                        flat_no: e.target.value,
                                                    })
                                                }
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
                                        <center>NOT FOUND</center>
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
                                        state.error?.zip_codeErr) &&
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
