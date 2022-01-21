import React, { useState, useEffect } from "react";
import {
    Basic,
    Otp,
    BasicInfo,
    SelectZipCode,
    ProviderType,
    Individual,
    Company,
} from "./Steps";

const Registration = (props) => {
    const [step, setStep] = useState(1);
    const [basic, setBasic] = useState({
        code: "+92",
        error: {
            email: "",
            phone: "",
            password: "",
        },
    });
    const [otp, setOtp] = useState({});
    const [basicInfo, setBasicInfo] = useState({});
    const [zipCode, setZipCode] = useState({});
    const [providerType, setProviderType] = useState();
    const [individual, setIndividual] = useState({});
    const [company, setCompany] = useState({});

    const handleStep = (step) => {
        setStep(step);
    };

    const handleEmailChange = (email) => {
        email = String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        if (email == null) {
            setBasic((basic) => ({
                ...basic,
                error: {
                    ...basic.error,
                    email: "Please enter a valid email address",
                },
            }));
        } else {
            setBasic((basic) => ({
                ...basic,
                error: {
                    ...basic.error,
                    email: "",
                },
            }));
        }
    };

    const handlePhoneChange = (phone) => {
        let regx = /^[0-9]{10,11}$/;
        if (!regx.test(phone)) {
            setBasic((basic) => ({
                ...basic,
                error: {
                    ...basic.error,
                    phone: `Please enter a valid phone number and should be of ${
                        (basic.code == "+92" && "10") ||
                        (basic.code == "+1" && "11")
                    } digits`,
                },
            }));
            return;
        } else {
            if (basic.code == "+92") {
                let error = "Phone number should be of 10 digits";
                if (phone.length == 10) {
                    error = "";
                }
                setBasic((basic) => ({
                    ...basic,
                    error: {
                        ...basic.error,
                        phone: error,
                    },
                }));
                return;
            }
            if (basic.code == "+1") {
                let error = "";
                if (phone.length != 11) {
                    error = "Phone number should be of 11 digits";
                }
                setBasic((basic) => ({
                    ...basic,
                    error: {
                        ...basic.error,
                        phone: error,
                    },
                }));
                return;
            }
        }
    };

    const handlePasswordChange = (password) => {
        let regex =
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if (!password.match(regex)) {
            setBasic((basic) => ({
                ...basic,
                error: {
                    ...basic.error,
                    password:
                        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
                },
            }));
            return;
        }
        setBasic((basic) => ({
            ...basic,
            error: {
                ...basic.error,
                password: "",
            },
        }));
    };

    const handleBasic = (e) => {
        const { name, value } = e.target;
        setBasic({ ...basic, [name]: value });
        if (name === "code") {
            handlePhoneChange(basic?.phone);
            return;
        }
        if (name === "email") {
            handleEmailChange(value);
            return;
        } else if (name === "phone") {
            handlePhoneChange(value);
            return;
        } else if (name === "password") {
            handlePasswordChange(value);
            return;
        }
    };

    return (
        <>
            <div
                className="main-registration"
                style={{
                    background:
                        "url(/assets/img/banner.jpg) no-repeat center/cover",
                    // fontSize: "1.5rem",
                }}
            >
                {/* <div className="container">
                    <div className="row">
                        <div className="col-md-12 d-flex align-items-center justify-content-between py-5">
                            <div className="logo-main">
                                <img
                                    src="img/logo.png"
                                    className="img-fluid"
                                    alt=""
                                />
                            </div>
                            <div className="login-btn">
                                <a
                                    href="#"
                                    className="login-now text-capitalize text-white"
                                >
                                    login
                                </a>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="driver-from pt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-10 col-md-6 col-lg-6 offset-lg-1 p-b-md">
                                <div className="banner-content">
                                    <h1 className="banner-title">
                                        Drive with Farerun
                                    </h1>
                                    <div className="banner-des">
                                        Earn good money with your vehicle.
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-10 col-md-6 col-lg-4 mt-5 mt-md-0">
                                {/* <!-- step 1 --> */}
                                {step == 1 && (
                                    <Basic
                                        handleStep={(step) => handleStep(step)}
                                        step={step}
                                        handleBasic={(e) => handleBasic(e)}
                                        basic={basic}
                                    />
                                )}
                                {/* <!-- step 2 --> */}
                                {step == 2 && (
                                    <Otp
                                        handleStep={(step) => handleStep(step)}
                                        step={step}
                                    />
                                )}
                                {/* <!-- step 3 --> */}
                                {step == 3 && (
                                    <BasicInfo
                                        handleStep={(step) => handleStep(step)}
                                        step={step}
                                    />
                                )}
                                {/* <!-- step 4 --> */}
                                {step == 4 && (
                                    <SelectZipCode
                                        handleStep={(step) => handleStep(step)}
                                        step={step}
                                    />
                                )}
                                {/* <!-- step 5 --> */}
                                {step == 5 && (
                                    <ProviderType
                                        handleStep={(step) => handleStep(step)}
                                        step={step}
                                        providerType={providerType}
                                    />
                                )}
                                {/* <!-- step 6 user --> */}
                                {step == 6 && providerType == "INDIVIDUAL" && (
                                    <Individual
                                        handleStep={(step) => handleStep(step)}
                                        step={step}
                                    />
                                )}
                                {/* <!-- step 6 company--> */}
                                {step == 6 && providerType == "COMPANY" && (
                                    <Company
                                        handleStep={(step) => handleStep(step)}
                                        step={step}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="arrow-down-banner text-center">
                    <i className="fas fa-angle-down"></i>
                </div> */}
            </div>
        </>
    );
};

export default Registration;
