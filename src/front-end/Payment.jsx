import React, { useState, useEffect } from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
// import { Product } from '../front-end/common/product';
import { postRequestService, getInitialRequestService } from '../store/Slices/services/RequestServiceSclice';
import { Link } from "react-router-dom";
export const Payment = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [checkoutError, setCheckoutError] = useState();

    const dispatch = useDispatch();
    
    const serviceRequest = useSelector((state) => state.serviceRequest);
    const [state, setState] = useState({
        form: {
            serviceDetail: props.location.state,
            // first_name: '',
            // last_name: '',
            // street: '',
            // city: '',
            // zip_code: '',
            // state_name: '',
            card_number: '',
            card_exp_date: '',
            card_cvc: '',
            card_name: '',
            submiting: false,
        },
        error: {
            // first_nameErr: '',
            // last_nameErr: '',
            // streetErr: '',
            // cityErr: '',
            // zip_codeErr: '',
            // state_nameErr: ''
            card_numberErr: '',
            card_exp_dateErr: '',
            card_cvcErr: '',
            card_nameErr: '',
            stripeErr: ''
        }
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
      return () => {
        dispatch(getInitialRequestService())
      };
    }, []);

    console.log(serviceDetail);
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

    // const handleChangeZipCode = (e) => {
    //     const { name, value } = e.target
    //     const form = { ...state.form, [name]: value };
    //     setState((state) => ({ ...state, form: form }));
    //     let errorMsg = "Zip Code may not be grater than 15"
    //     if(value.length < 15) {
    //         errorMsg = '';
    //     } 
    //     setState((state) => ({ ...state, error: { ...state.error, [`${name}Err`]: errorMsg } }));
    // }

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
        if(e.error){
            setCheckoutError(e.error.message)
        } else {
            setState((state) => ({ ...state, error: { ...state.error, stripeErr: undefined } }))
            setCheckoutError();
        } 
    };

    const handleClickMakeRequest = async () => {
        const cardElement = elements.getElement('card');
        try {
            setState((state) => ({ ...state, error: { ...state.error, stripeErr: undefined } }))
            const { error, token } = await stripe.createToken(
                elements.getElement(CardElement)
            );
            if(token && serviceDetail !== undefined){
                setState((state) => ({ 
                    ...state, form: { 
                        ...state.form, serviceDetail:{
                            ...state.form.serviceDetail, token: token.id
                        } 
                    } 
                }));
                let withToken = serviceDetail;
                withToken.token=token.id
                // false means this is not form data
                dispatch(postRequestService(withToken, false));
            }
            if(error){
                setState((state) => ({ ...state, error: { ...state.error, stripeErr: error.message } }))
            }
        } catch (error) {
            setState((state) => ({ ...state, error: { ...state.error, stripeErr: error.message } }))
        }  
    }
    
    const handleGoToServicesHistory = () => {
        dispatch(getInitialRequestService());
        setState((state)=>({
            ...state, form: {
                ...state.form, serviceDetail: ''
            }
        }))
        props.history.push({
            pathname: '/services-history',
        });
    }

    return (
        <>
            <div className="moving-help-sec pad-Y m-0">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="moving-search-box">
                                    {stripeErr ? <div className="col-12  alert alert-danger text-center" role="alert" style={{fontSize: 15}}>
                                        {stripeErr }
                                    </div> : ''}
                                    {serviceRequest != '' && (()=>{

                                        if(serviceRequest.error == false && serviceRequest.loading == true){
                                            return (
                                                <div className="col-12  alert alert-primary text-center" role="alert" style={{fontSize: 15}}>
                                                    Please loading 
                                                </div>
                                            )
                                        }

                                        if (serviceRequest.error == true && serviceRequest.loading == false) {
                                            switch (typeof serviceRequest.message) {
                                                case 'string':
                                                    return (
                                                        <div className="col-12  alert alert-danger text-center" role="alert" style={{fontSize: 15}}>
                                                            {serviceRequest.message}
                                                        </div>
                                                    )
                                                    break;
                                                case 'array':
                                                    const errorMsg = Object.values(serviceRequest.message);
                                                    return (
                                                        <div className="col-12  alert alert-danger text-center" role="alert" style={{fontSize: 15}}>
                                                            {errorMsg.map((msg, index)=>(<React.Fragment key={index}>{msg}</React.Fragment>))}
                                                        </div>
                                                    )
                                                    break;
                                            }
                                        }

                                        if(serviceRequest.error == false && serviceRequest.loading == false){
                                            switch (typeof serviceRequest.message) {
                                                case 'string':
                                                    return (
                                                        <div className="col-12  alert alert-success text-center" role="alert" style={{fontSize: 15}}>
                                                            {serviceRequest.message}
                                                        </div>
                                                    )
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
                                            Please fill Card details
                                        </div>
                                        <CardElement onChange={handleCardDetailsChange} className="m-5"/>
                                        <p className="text-danger">{checkoutError}</p>
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
                                        By clicking the button below, I agree to Handy's Terms of <br className="d-none d-md-block" />
                                    Use and Cancellation Policy and understand that my<br className="d-none d-md-block" />
                                        payment method will be charged.
                                    </p>

                                </div>

                                <div className="text-center">
                                    <button 
                                        disabled={
                                            !stripe || !elements || submiting || checkoutError || serviceRequest.loading
                                        }
                                        onClick={serviceRequest.message == 'success' || serviceRequest.message == 'Order already exist' ? handleGoToServicesHistory : handleClickMakeRequest}
                                        className="button-common mt-5 w-50"
                                    >
                                        {serviceRequest.message == 'success' || serviceRequest.message == 'Order already exist' ? "Go to Services History" : "Make Service Request"}
                                    </button>
                                </div>


                                <div className="row pad-t">
                                    <div className="col-md-12 pb-5">
                                        <hr />
                                    </div>

                                    <div className="col-md-12">
                                        <div className="cart-total d-flex align-items-center justify-content-between">
                                            <div className="cart-title">Industrial Three-piece Dark Bronze<br/> Compact Dining Set</div>
                                            <div className="price-qnt-subtotal">
                                                <ul className="list-heading d-flex align-items-center justify-content-between w-100">
                                                    <li>Price</li>
                                                    <li>Quantity</li>
                                                    <li>Subtotal</li>
                                                </ul>
                                                <ul className="list-des d-flex align-items-center justify-content-between w-100">
                                                    <li>$122.00</li>
                                                    <li></li>
                                                    <li>$122.00</li>
                                                </ul>

                                                <ul className="list-heading d-flex align-items-center justify-content-between w-100">
                                                    <li></li>
                                                    <li>Shipping</li>
                                                    <li>Total</li>
                                                </ul>
                                                <ul className="list-des d-flex align-items-center justify-content-between w-100">
                                                    <li></li>
                                                    <li>00</li>
                                                    <li>$122.00</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}