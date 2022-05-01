import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
    Basic,
    Otp,
    BasicInfo,
    SelectZipCode,
    ProviderType,
    ProfileDetail,
    // Company,
} from "./Steps";

const Registration = (props) => {
    // dispatch actions
    const { handleProviderSignup, handleVerifyPhoneNo, handleBasicInfoSubmit } =
        props;
    const {
        providerSignup,
        verifyOpt,
        basicInfoRes,
        serviceDetail,
        profileDetails,
    } = props;
    const [step, setStep] = useState(
        localStorage.getItem("providerToken") ? 3 : 1
    );
    const [basic, setBasic] = useState({
        code: "+92",
        error: {
            email: "",
            phone: "",
            password: "",
        },
    });

    const [otpData, setOtpData] = useState({});
    const [basicInfo, setBasicInfo] = useState({});
    const [zipCode, setZipCode] = useState({
        address: "",
        zip_code: [],
        service_id: "",
    });
    const [providerType, setProviderType] = useState();
    const [profile, setProfile] = useState({
        image: "",
    });

    const loading = useRef(null);
    const error = useRef(null);

    useEffect(() => {
        if (providerSignup?.error) {
            toast.dismiss(loading.current);
            if (typeof providerSignup?.message != "object") {
                error.current = toast.error(providerSignup.message, {
                    toastId: error.current,
                });
            }
            if (typeof providerSignup?.message == "object") {
                setBasic({ ...basic, error: providerSignup.message });
            }
        }
        if (providerSignup?.error == false && providerSignup?.data) {
            toast.dismiss(loading.current);
            setOtpData({
                ...otpData,
                phone: `${basic.code}${basic.phone}`,
            });
            setStep(2);
        }
    }, [providerSignup]);

    useEffect(() => {
        if (verifyOpt?.error) {
            if (typeof verifyOpt?.message != "object") {
                toast.dismiss(loading.current);
                error.current = toast.error(verifyOpt.message, {
                    toastId: error.current,
                });
            }
            if (typeof verifyOpt?.message == "object") {
                setOtpData({ ...otpData, error: verifyOpt.message });
            }
        }
        if (verifyOpt?.error == false && verifyOpt?.data) {
            toast.dismiss(loading.current);
            localStorage.setItem("providerToken", verifyOpt?.data?.auth_token);
            setStep(3);
        }
    }, [verifyOpt]);

    useEffect(() => {
        if (
            basicInfoRes?.loading == false &&
            basicInfoRes?.message == "success"
        ) {
            handleStep(4);
        }
        if (basicInfoRes.loading == false && basicInfoRes.error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                confirmButtonColor: "#fea629",
            });
        }
    }, [basicInfoRes?.loading, basicInfoRes?.message]);

    useEffect(() => {
        if (
            serviceDetail?.loading == false &&
            serviceDetail?.message == "success"
        ) {
            handleStep(5);
        }
        if (serviceDetail.loading == false && serviceDetail.error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                confirmButtonColor: "#fea629",
            });
        }
    }, [serviceDetail?.loading, serviceDetail?.message]);

    useEffect(() => {
        if (
            profileDetails?.loading == false &&
            profileDetails?.message == "success"
        ) {
            localStorage.removeItem("providerToken");
            setStep(1);
            setBasic({
                success:
                    "Congratulation! You are successfully registered. We will let you know when we launch our website. Thank you.",
                code: "+92",
                error: {
                    email: "",
                    phone: "",
                    password: "",
                },
            });
            setOtpData({});
            setBasicInfo({});
            setZipCode({
                address: "",
                zip_code: [],
                service_id: "",
            });
            setProviderType();
            setProfile({
                image: "",
            });
        }
        if (profileDetails.loading == false && profileDetails.error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                confirmButtonColor: "#fea629",
            });
        }
    }, [profileDetails]);
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
        let regx = /^[0-9]{10,12}$/;
        if (!regx.test(phone)) {
            setBasic((basic) => ({
                ...basic,
                error: {
                    ...basic.error,
                    phone: `Please enter a valid phone number and should be of ${
                        (basic.code == "+234" && "10") ||
                        (basic.code == "+92" && "10") ||
                        (basic.code == "+1" && "10")
                    } digits`,
                },
            }));
            return;
        } else {
            if (basic.code == "+234" || basic.code == "+92" || basic.code == "+1") {
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
            // if (basic.code == "+92") {
            //     let error = "Phone number should be of 10 digits";
            //     if (phone.length == 10) {
            //         error = "";
            //     }
            //     setBasic((basic) => ({
            //         ...basic,
            //         error: {
            //             ...basic.error,
            //             phone: error,
            //         },
            //     }));
            //     return;
            // }
            // if (basic.code == "+1") {
            //     let error = "";
            //     if (phone.length != 10) {
            //         error = "Phone number should be of 10 digits";
            //     }
            //     setBasic((basic) => ({
            //         ...basic,
            //         error: {
            //             ...basic.error,
            //             phone: error,
            //         },
            //     }));
            //     return;
            // }
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

    const handleZipCode = ({ address, zip_code, service_id }) => {
        if (address != undefined) {
            setZipCode((zipCode) => ({ ...zipCode, address }));
        }
        if (zip_code != undefined) {
            setZipCode((zipCode) => ({ ...zipCode, zip_code: zip_code }));
        }
        if (service_id != undefined) {
            setZipCode((zipCode) => ({ ...zipCode, service_id }));
        }
    };

    const handleProfile = (data) => {
        setProfile((profile) => ({ ...profile, ...data }));
    };

    const handleOtp = (e) => {
        const { name, value } = e.target;
        let regx = /^[0-9]{4,4}$/;
        if (regx.test(value)) {
            setOtpData({
                ...otpData,
                [name]: value,
                error: {
                    ...otpData.error,
                    [name]: "",
                },
            });
            return;
        } else {
            setOtpData({
                ...otpData,
                error: {
                    ...otpData.error,
                    [name]: "Please enter a valid OTP (min 4 digits, max 4 digits)",
                },
            });
            return;
        }
    };

    const handleBasicInfo = (data) => {
        setBasicInfo(data);
        handleProfile({
            first_name: data?.first_name ? data?.first_name : "",
            last_name: data?.last_name ? data?.last_name : "",
        });
    };

    return (
        <>
            <div
                className="main-registration"
                style={{
                    background:
                        "url(/assets/img/banner.jpg) no-repeat fixed center/cover",
                    height: "100vh",
                    width: "100%",
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
                                    {/* <h1 className="banner-title">
                                        Drive with FareNow
                                    </h1>
                                    <div className="banner-des">
                                        Earn good money with your vehicle.
                                    </div> */}
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
                                        handleProviderSignup={
                                            handleProviderSignup
                                        }
                                        providerSignup={providerSignup}
                                    />
                                )}
                                {/* <!-- step 2 --> */}
                                {step == 2 && (
                                    <Otp
                                        handleStep={(step) => handleStep(step)}
                                        step={step}
                                        handleOtp={(e) => handleOtp(e)}
                                        otpData={otpData}
                                        handleVerifyPhoneNo={
                                            handleVerifyPhoneNo
                                        }
                                        verifyOpt={verifyOpt}
                                    />
                                )}
                                {/* <!-- step 3 --> */}
                                {step == 3 &&
                                    localStorage.getItem("providerToken") && (
                                        <BasicInfo
                                            handleStep={(step) =>
                                                handleStep(step)
                                            }
                                            handleBasicInfoSubmit={
                                                handleBasicInfoSubmit
                                            }
                                            handleBasicInfo={(data) =>
                                                handleBasicInfo(data)
                                            }
                                            basicInfo={basicInfo}
                                            step={step}
                                            {...props}
                                        />
                                    )}
                                {/* <!-- step 4 --> */}
                                {step == 4 && (
                                    <SelectZipCode
                                        handleStep={(step) => handleStep(step)}
                                        step={step}
                                        handleZipCode={(data) => {
                                            handleZipCode(data);
                                        }}
                                        zipCode={zipCode}
                                        {...props}
                                    />
                                )}
                                {/* <!-- step 5 --> */}
                                {step == 5 && (
                                    <ProviderType
                                        handleStep={(step) => handleStep(step)}
                                        step={step}
                                        providerType={providerType}
                                        handleProviderType={(data) =>
                                            setProviderType(data)
                                        }
                                    />
                                )}
                                {/* <!-- step 6 user --> */}
                                {step == 6 &&
                                    (providerType == "Individual" ||
                                        providerType == "Business") && (
                                        <ProfileDetail
                                            handleStep={(step) =>
                                                handleStep(step)
                                            }
                                            step={step}
                                            profile={profile}
                                            providerType={providerType}
                                            handleProfile={(data) =>
                                                handleProfile(data)
                                            }
                                            {...props}
                                        />
                                    )}
                                {/* <!-- step 6 company--> */}
                                {/* {step == 6 && providerType == "Business" && (
                                    <Company
                                        handleStep={(step) => handleStep(step)}
                                        step={step}
                                    />
                                )} */}
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
