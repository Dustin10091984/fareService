import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
    geocodeByAddress,
    getLatLng,
    geocodeByPlaceId,
} from "react-places-autocomplete";
import AutoCompleteInput from "../../../components/AutoCompleteInput";
// import DayPickerInput from "react-day-picker/DayPickerInput";
import "../styles.css";
import moment from "moment";
import { GOOGLE_API, HOST } from "../../../constants";
import axios from "axios";

const Basic = ({
    step,
    basic,
    handleStep,
    handleBasic,
    handleProviderSignup,
    providerSignup,
}) => {
    const isError = (name) => (basic.error[name] ? basic.error[name] : null);
    const isServerError = (name) => {
        if (
            providerSignup?.message != undefined &&
            typeof (providerSignup?.message == "object")
        ) {
            return providerSignup?.message[name] !== undefined
                ? providerSignup?.message[name]
                : null;
        }
    };

    const handleNextClick = () => {
        handleProviderSignup({
            email: basic.email,
            phone: `${basic.code}${basic.phone}`,
            password: basic.password,
        });
        // handleStep(step + 1);
    };

    useEffect(() => {
        window?.scrollTo(0, 0, "smooth");
    }, [basic?.success]);

    return (
        <>
        {basic.success && (
            <div className="alert alert-success text-center">
                    {basic.success}
            </div>
        )}
        <div className="login-from step-1">
            <div className="form-title mb-3">Set Up Your Business Profile.</div>
            <div className="form-term mb-2">
                How Whould you like customer to contact you? 
            </div>

            <div className="common-input mb-4">
                <label htmlFor="name">Email</label>
                <strong className="text-danger">*</strong>
                <input
                    type="email"
                    name="email"
                    placeholder="john.doe@gmail.com"
                    defaultValue={basic?.email || ""}
                    onChange={handleBasic}
                />
                <div className="text-danger">
                    {isError("email")}
                    {/* {isServerError("email")} */}
                </div>
            </div>
            <div className="row">
                <div className="common-input mb-4 col-12">
                    <label>Phone</label>
                    <strong className="text-danger">*</strong>
                    <div className="d-flex phone-input">
                        <select
                            className="js-example-basic-single  col-3"
                            name="code"
                            defaultValue={basic?.code}
                            onChange={handleBasic}
                        >
                            <option value={"+1"}>+1 </option>
                            <option value={"+92"}>+92</option>
                        </select>
                        <input
                            type="tel"
                            name="phone"
                            className="phone-input-2 col-9"
                            placeholder="1234567890"
                            defaultValue={basic?.phone || ""}
                            onChange={handleBasic}
                        />
                    </div>
                    <div className="text-danger">
                        {isError("phone")}
                        {/* {isServerError("phone")} */}
                    </div>
                </div>
            </div>
            {/* <label className="custom-check">
                                        Enable text messages
                                        <input
                                            type="checkbox"
                                            checked="checked"
                                        />
                                        <span className="checkmark"></span>
                                    </label> */}
            {/* <div className="form-term mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                facere suscipit earum voluptatibus doloremque quia?
            </div> */}
            <div className="common-input mb-4">
                <label htmlFor="name">Password</label>
                <strong className="text-danger">*</strong>
                <input
                    type="password"
                    
                    name="password"
                    placeholder="password"
                    defaultValue={basic?.password || ""}
                    onChange={handleBasic}
                />
                <div className="text-danger">
                    {isError("password")}
                    {/* {isServerError("password")} */}
                </div>
            </div>
            {/* <div className="common-input mb-4 d-none">
                <label className="mb-0">Citis</label>
                <select
                    className="js-example-basic-single "
                    name="state"
                    onChange={handleBasic}
                >
                    <option value="AL">City </option>
                    <option value="WY">Warri</option>
                    <option value="WY">Benin</option>
                </select>
            </div> */}
            <div className="form-term my-2">
                By clicking next you agree to  <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.{" "}
            </div>

            <button
                disabled={(() => {
                    return (
                        providerSignup?.loading ||
                        isError("email") ||
                        isError("phone") ||
                        isError("password") ||
                        basic?.email == "" ||
                        basic?.email == undefined ||
                        basic?.password == "" ||
                        basic?.password == undefined ||
                        basic?.phone == "" ||
                        basic?.phone == undefined
                    );
                })()}
                className="btn btn-primary w-100 mt-3"
                id="step-1"
                type="button"
                onClick={handleNextClick}
            >
                {providerSignup?.loading ? (
                    <>
                        <i 
                            className="fa fa-spinner fa-pulse"
                        >
                        </i> Please wait...
                    </>
                ) : "Next"}
            </button>
        </div>
        </>
    );
};

const Otp = ({ step, handleStep, otpData, handleOtp, handleVerifyPhoneNo, verifyOpt}) => {
    const [state, setState] = useState({ loading: false });
    const handleResendOtp = (e) => {
        e.preventDefault();
        setState({ loading: true });
        axios({
            method: "post",
            data: { phone: otpData?.phone },
            url: `${HOST}/api/provider/signup/phone/verify/resend`,
        })
            .then(function (response) {
                setState({
                    success: "OTP has been sent to your phone number",
                    loading: false,
                });
            })
            .catch((error) => {
                setState({
                    error: error.response.data.message,
                    loading: false,
                });
            });
    };

    return (
        <div className="login-from step-2">
            {state?.success && (
                <div className="alert alert-success text-center">
                    {state?.success}
                </div>
            )}
            {state?.error && (
                <div className="alert alert-success text-center">
                    {state?.error}
                </div>
            )}
            <div className="form-title mb-3">Please enter OTP Code.</div>
            <div className="form-term mb-2">
                How Whould you like customer to contact you?
            </div>
            <div className="form-term mb-2">Phone: {otpData?.phone}</div>

            <div className="common-input mb-4">
                <label htmlFor="name">Code.</label>
                <input
                    type="text"
                    
                    name="otp"
                    onChange={handleOtp}
                    placeholder="0 0 0 0"
                />
            </div>
            <div className="text-danger">{otpData?.error?.otp}</div>
            <div className="form-term my-2">
                Didn't you receive any code? <br />{" "}
                <a href="#" onClick={handleResendOtp}>
                    Resend New Code
                </a>{" "}
            </div>
            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-primary w-100 mt-3"
                    id="step-2-back"
                    type="button"
                    onClick={() => handleStep(1)}
                >
                    Back
                </button>
                <div className="px-3"></div>
                <button
                    className="btn btn-primary w-100 mt-3"
                    id="step-2"
                    type="button"
                    disabled={state.loading}
                    onClick={() =>
                        handleVerifyPhoneNo({
                            phone: otpData?.phone,
                            otp: otpData?.otp,
                        })
                    }
                >
                    {state.loading || verifyOpt?.loading ? (
                        <><i className="fa fa-spinner fa-pulse"></i> Please wait...</>
                    ) : (
                        "Next"
                    )}
                </button>
            </div>
        </div>
    );
};

const BasicInfo = ({
    step,
    handleStep,
    basicInfo,
    handleBasicInfo,
    handleBasicInfoSubmit,
    basicInfoRes,
}) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();
    const handleBasic = (data) => {
        handleBasicInfo(data);
        handleBasicInfoSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleBasic)}>
            <div className="login-from step-3">
                <div className="form-title mb-3">
                    To start , help us get to know you and your business
                </div>
                <div className="form-term mb-2">
                    This info helps our team provide customized support -- it
                    won't be public.
                </div>

                <div className="common-input mb-4">
                    <div className="form-title mb-3">What is your name?</div>
                    <label htmlFor="name">First Name</label>
                    <input
                        {...register("first_name", {
                            required: true,
                            minLength: 2,
                            maxLength: 50,
                            value: basicInfo?.first_name || "",
                        })}
                        defaultValue={basicInfo?.first_name || ""}
                        className={`${
                            errors.first_name && "is-invalid"
                        }`}
                        placeholder="First Name"
                    />
                    {errors.first_name &&
                        (() => {
                            if (errors.first_name.type === "required") {
                                return (
                                    <div className="text-danger">
                                        First Name is required
                                    </div>
                                );
                            }
                            if (errors.first_name.type === "minLength") {
                                return (
                                    <div className="text-danger">
                                        First Name must be at least 2 characters
                                        long
                                    </div>
                                );
                            }
                            if (errors.first_name.type === "maxLength") {
                                return (
                                    <div className="text-danger">
                                        First Name must be at most 50 characters
                                        long
                                    </div>
                                );
                            }
                        })()}
                </div>

                <div className="common-input mb-4">
                    <label htmlFor="name">Last Name</label>
                    <input
                        {...register("last_name", {
                            required: true,
                            minLength: 2,
                            maxLength: 50,
                            value: basicInfo.last_name || "",
                        })}
                        defaultValue={basicInfo.last_name || ""}
                        className={` ${
                            errors.first_name && "is-invalid"
                        }`}
                        placeholder="Last Name"
                    />
                    {errors.last_name &&
                        (() => {
                            if (errors.last_name.type === "required") {
                                return (
                                    <div className="text-danger">
                                        Last Name is required
                                    </div>
                                );
                            }
                            if (errors.last_name.type === "minLength") {
                                return (
                                    <div className="text-danger">
                                        Last Name must be at least 2 characters
                                        long
                                    </div>
                                );
                            }
                            if (errors.last_name.type === "maxLength") {
                                return (
                                    <div className="text-danger">
                                        Last Name must be at most 50 characters
                                        long
                                    </div>
                                );
                            }
                        })()}
                </div>

                <div className="form-title mb-3">
                    How much do you spend each month on online marketing
                </div>

                <label className="custom-radio">
                    $1-$100{" "}
                    <input
                        type="radio"
                        {...register("spend_each_month", {
                            required: true,
                        })}
                        defaultChecked={
                            basicInfo?.spend_each_month === "$1-$100"
                        }
                        value="$1-$100"
                    />
                    <span className="checkmark"></span>
                </label>

                <label className="custom-radio">
                    $100-$400
                    <input
                        type="radio"
                        {...register("spend_each_month", {
                            required: true,
                        })}
                        value="$100-$400"
                        defaultChecked={
                            basicInfo?.spend_each_month === "$100-$400"
                        }
                    />
                    <span className="checkmark"></span>
                </label>

                <label className="custom-radio">
                    $400-$600
                    <input
                        type="radio"
                        {...register("spend_each_month", {
                            required: true,
                        })}
                        defaultChecked={
                            basicInfo?.spend_each_month === "$400-$600"
                        }
                        value="$400-$600"
                    />
                    <span className="checkmark"></span>
                </label>
                {errors.spend_each_month && (
                    <div className="text-danger">
                        How much do you spend each month on online marketing is
                        required
                    </div>
                )}

                <div className="d-flex justify-content-between">
                    <button
                        className="btn btn-primary w-100 mt-3"
                        id="step-3-back"
                        type="button"
                        disabled={localStorage.getItem("providerToken")}
                        onClick={() => handleStep(2)}
                    >
                        Back
                    </button>
                    <div className="px-3"></div>
                    <button
                        className="btn btn-primary w-100 mt-3"
                        id="step-3"
                        type="submit"
                        disabled={basicInfoRes?.loading}
                        // onClick={() => handleStep(step + 1)}
                    >
                        {basicInfoRes?.loading ? (
                            <span>
                                <i className={`fa fa-spinner fa-pulse`}></i>{" "}
                                Loading...
                            </span>
                        ) : (
                            "Next"
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

const SelectZipCode = ({
    step,
    handleStep,
    handleZipCode,
    zipCode,
    headerMenu,
    handleServiceDetails,
    serviceDetail,
}) => {
    const [postalCode, setPostalCode] = useState({errors: {}});
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [state, setState] = useState({
        zip_codeErr: "",
    });

    const handleOnChange = (address) => {
        handleZipCode({ address });
    };

    // const handleOnSelect = async (address, placeId) => {
    //     handleZipCode({ address });
    //     // const results = await geocodeByAddress(address);
    //     // const latLng = await getLatLng(results[0]);
    //     const [place] = await geocodeByPlaceId(placeId);
    //     const { long_name: postalCode = "" } =
    //         place.address_components.find((c) =>
    //             c.types.includes("postal_code")
    //         ) || {};
    //     if (postalCode) {
    //         if (zipCode?.zip_code?.includes(postalCode) == false) {
    //             handleZipCode({
    //                 zip_code: [...zipCode?.zip_code, postalCode],
    //                 address: "",
    //             });
    //         }
    //         setState({ ...state, zip_codeErr: "" });
    //     } else {
    //         setState({
    //             ...state,
    //             zip_codeErr: "Please select an other location",
    //         });
    //     }
    // };

    const handleSelectPostalCode = (address) => {
        const {address_components} = address;
        const postalCode = address_components?.find((address) =>{
            return address?.types?.includes("postal_code") ? address : null
        });
        if (postalCode?.short_name) {
            if (zipCode?.zip_code?.includes(postalCode?.short_name) == false) {
                handleZipCode({
                    zip_code: [...zipCode?.zip_code, postalCode?.short_name],
                    address: "",
                });
                setPostalCode({
                    ...postalCode,
                    postal_code: "",
                    errors: {},
                })
            }
            setState({ ...state, zip_codeErr: "" });
        } else {
            setState({
                ...state,
                zip_codeErr: "Please select an other location",
            });
        }
    }

    const handleChangePostalCode = ({target: {name, value}}) => {
        if(value){
            setPostalCode({...postalCode, loading: true, [name]: value});
            axios({
                method: "post",
                url: `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${GOOGLE_API}`,
            }).then(function (response) {
                    if(response.data.results.length > 0) {
                        setPostalCode({...state, response: response.data.results, errors: {}, loading: false});
                    } else {
                        setPostalCode({...state, response: null, errors: {...state.errors, postal_code: "Invalid Postal Code"}, loading: false});
                    }
                }).catch((error) => {
                    setPostalCode({...state, response: null, errors: {...state.errors,  postal_code: "Invalid Postal Code"}, loading: false});
                });
        }
    }

    const handleOnSubmit = (data) => {
        handleServiceDetails({ ...data, zip_code: zipCode?.zip_code });
    };
    return (
        <div className="login-from step-4">
            {state?.zip_codeErr && (
                <div className="alert alert-danger text-center">
                    {state?.zip_codeErr}
                </div>
            )}
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <div className="common-input mb-4">
                    <label htmlFor="service_id">Services</label>
                    <div className="form-title mb-3">
                        <select
                            {...register("service_id", {
                                required: true,
                                value: "",
                            })}
                            className={` ${
                                errors?.service_id ? "is-invalid" : ""
                            }`}
                            onChange={(e) => {
                                handleZipCode({ service_id: e.target.value });
                            }}
                        >
                            <option value="" defaultChecked>
                                Please select a service
                            </option>
                            {headerMenu?.map(
                                (item) =>
                                    item?.sub_services && (
                                        <React.Fragment key={item.id}>
                                            <option value={item?.id}>
                                                {item?.name}
                                            </option>
                                        </React.Fragment>
                                    )
                            )}
                        </select>
                        {errors?.service_id &&
                            errors?.service_id?.type === "required" && (
                                <div className="text-danger">
                                    Please select a service
                                </div>
                            )}
                    </div>
                </div>
                <div className="common-input mb-4">
                    <div className="d-flex flex-wrap" id="subService">
                        {zipCode?.service_id &&
                            headerMenu
                                ?.find(
                                    (service) =>
                                        service?.id == zipCode?.service_id
                                )
                                ?.sub_services?.map((item) => (
                                    <label
                                        key={item.id}
                                        className="custom-check mr-4"
                                    >
                                        {item?.name}
                                        <input
                                            className="checkbox"
                                            type="checkbox"
                                            {...register("sub_services", {
                                                required: true,
                                            })}
                                            defaultValue={item?.id}
                                        ></input>
                                        <span className="checkmark"></span>
                                    </label>
                                ))}
                    </div>
                    {errors.sub_services && (
                        <div className="text-danger">
                            Please select at least one sub service
                        </div>
                    )}
                </div>
                <div className="common-input mb-4">
                    <div className="form-title mb-3">Where do you work?</div>
                    <label htmlFor="name">Enter location</label>
                    <div className="common-input mr-1 mb-1">
                        <input
                                type="text"
                                name="postal_code"
                                placeholder="2323"
                                autoComplete="postal_code"
                                value={postalCode?.postal_code}
                                onChange={handleChangePostalCode}
                            />
                        {
                            postalCode?.loading && (<><i className="fa fa-spinner fa-pulse"></i> Loading...</>) 
                        }
                        {postalCode?.response && postalCode?.response?.length>0 ? postalCode?.response?.map((address, index) => (
                            <div className="text-dark mt-2 mb-2" onClick={()=>handleSelectPostalCode(address)} role="button" key={index}>
                                {address.formatted_address}
                            </div>
                        )) : (
                            postalCode?.postal_code && (
                            <div className="text-dark mt-2 mb-2">
                                Please add complete zip code
                            </div>
                            )
                        )}
                    </div>
                    {/* <AutoCompleteInput
                        placeholder="Type your area address"
                        handleOnChange={handleOnChange}
                        handleOnSelect={handleOnSelect}
                        value={zipCode?.address}
                    ></AutoCompleteInput> */}
                    {/* <input
                        {...register("name", { required: true })}
                        
                        placeholder="Enter location"
                    /> */}
                </div>

                <div className="zip-code d-flex flex-wrap">
                    {zipCode?.zip_code?.map((zip, index) => (
                        <div
                            key={index}
                            className="badge-ctm d-flex align-items-center justify-content-between mr-2 mb-1"
                        >
                            {zip}{" "}
                            <span
                                className="fa fa-times ml-1"
                                onClick={() => {
                                    handleZipCode({
                                        zip_code: zipCode?.zip_code.filter(
                                            (zip) => zip !== zip
                                        ),
                                    });
                                }}
                            ></span>
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-between">
                    <button
                        className="btn btn-primary w-100 mt-3"
                        id="step-4-back"
                        type="button"
                        onClick={() => handleStep(3)}
                    >
                        Back
                    </button>
                    <div className="px-3"></div>
                    <button
                        className="btn btn-primary w-100 mt-3"
                        id="step-4"
                        type="submit"
                        disabled={
                            zipCode?.zip_code?.length === 0 ||
                            serviceDetail?.loading
                        }
                    >
                        {serviceDetail?.loading ? (
                            <span>
                                <i className={`fa fa-spinner fa-pulse`}></i>{" "}
                                Loading...
                            </span>
                        ) : (
                            "Next"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

const ProviderType = ({
    step,
    handleStep,
    providerType,
    handleProviderType,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleOnSubmit = (data) => {
        handleStep(6);
    };

    return (
        <div className="login-from step-5">
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <div className="common-input mb-4">
                    <div className="form-title mb-3">Choose your role?</div>
                </div>

                <label className="custom-radio">
                    I am a individual
                    <input
                        type="radio"
                        name="type"
                        value="Individual"
                        {...register("type", {
                            required: true,
                            onChange: (e) => {
                                handleProviderType(e.target.value);
                            },
                        })}
                        defaultChecked={providerType === "Individual"}
                    />
                    <span className="checkmark"></span>
                </label>
                <label className="custom-radio">
                    We are a company
                    <input
                        type="radio"
                        name="type"
                        value="Business"
                        {...register("type", {
                            required: true,
                            onChange: (e) => {
                                handleProviderType(e.target.value);
                            },
                        })}
                        defaultChecked={providerType === "Business"}
                    />
                    <span className="checkmark"></span>
                </label>

                {/* <!--  --> */}

                <div className="d-flex justify-content-between">
                    <button
                        className="btn btn-primary w-100 mt-3"
                        id="step-4-back"
                        type="button"
                        onClick={() => handleStep(4)}
                    >
                        Back
                    </button>
                    <div className="px-3"></div>
                    <button
                        className="btn btn-primary w-100 mt-3"
                        disabled={providerType == undefined}
                        id="step-4"
                        type="submit"
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

const ProfileDetail = ({
    step,
    handleStep,
    profile,
    providerType,
    handleProfile,
    handleProfileDetails,
    profileDetails,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleImage = (image) => {
        handleProfile({
            image: image ? URL.createObjectURL(image) : "",
            file: image,
        });
    };
    const handleDatePick = (date) => {
        handleProfile(date);
    };

    const handleOnSubmitProfile = (data) => {
        const form = new FormData();
        if (providerType === "Individual") {
            let dob = moment(profile?.dob).format("MM/DD/YYYY");
            form.append("dob", dob);
            form.append("first_name", profile?.first_name);
            form.append("last_name", profile?.last_name);
        }
        if (providerType === "Business") {
            let founded = moment(profile?.founded).format("MM/DD/YYYY");
            form.append("founded", founded);
            form.append("business_name", data?.business_name);
            form.append("number_of_employees", data?.number_of_employees);
        }
        if (profile?.file) {
            form.append("image", profile.file);
        }
        form.append("type", providerType);
        form.append("rourly_rate", data.rourly_rate);
        form.append("street_address", data.street_address);
        form.append("suite_number", data.suite_number);
        form.append("zip_code", data.zip_code);
        form.append("city", data.city);
        form.append("state", data.state);
        form.append("bio", data.bio);
        handleProfileDetails(form);
    };
    return (
        <div className="login-from step-6-user">
            <form onSubmit={handleSubmit(handleOnSubmitProfile)}>
                <div className="common-input mb-4">
                    <div className="form-title mb-3 text-center">Profile Setting</div>

                    <div className="user-profile">
                        <div className="user-image d-flex align-items-center justify-content-center">
                            <img
                                src={profile?.image}
                                className="img-fluid"
                                alt=""
                            />
                        </div>
                        <label htmlFor="file-upload1" className="upload-image">
                            <i className="fas fa-pencil-alt"></i>
                            <input
                                type="file"
                                className="d-none"
                                id="file-upload1"
                                accept="image/*"
                                onChange={(e) => {
                                    handleImage(e?.target?.files[0]);
                                }}
                            />
                        </label>
                    </div>
                </div>

                {providerType === "Individual" && (
                    <>
                        <div className="common-input mb-4">
                            {/* <div className="form-title mb-3">Legal Name</div> */}
                            <label htmlFor="name">First Name</label>
                            <input
                                type="text"
                                
                                placeholder="First name"
                                value={profile?.first_name}
                                readOnly
                            />
                        </div>
                        <div className="common-input mb-4">
                            <label htmlFor="name">Last Name</label>
                            <input
                                type="text"
                                
                                placeholder="last name"
                                value={profile?.last_name}
                                readOnly
                            />
                        </div>
                    </>
                )}
                {providerType === "Business" && (
                    <>
                        <div className="common-input mb-4">
                            <label htmlFor="name">Business Name</label>
                            <input
                                type="text"
                                className={` ${
                                    errors?.business_name ? "is-invalid" : ""
                                }`}
                                placeholder="Business name"
                                defaultValue={profile?.business_name}
                                {...register("business_name", {
                                    required: true,
                                    onChange: (e) => {
                                        handleProfile({
                                            business_name: e.target.value,
                                        });
                                    },
                                })}
                            />
                            {errors.business_name && (
                                <strong className="text-danger">
                                    business name is required
                                </strong>
                            )}
                        </div>
                        <div className="common-input mb-4">
                            <label htmlFor="name">
                                How many you have Employees
                            </label>
                            <input
                                type="text"
                                className={` ${
                                    errors?.number_of_employees
                                        ? "is-invalid"
                                        : ""
                                }`}
                                placeholder="Number of employees"
                                defaultValue={profile?.number_of_employees}
                                {...register("number_of_employees", {
                                    required: true,
                                    pattern: /^[0-9]*$/,
                                    onChange: (e) => {
                                        handleProfile({
                                            number_of_employees: e.target.value,
                                        });
                                    },
                                })}
                            />
                            {errors?.number_of_employees &&
                                ((errors.number_of_employees.type ===
                                    "required" && (
                                    <strong className="text-danger">
                                        Number of employees is required
                                    </strong>
                                )) ||
                                    (errors.number_of_employees.type ===
                                        "pattern" && (
                                        <strong className="text-danger">
                                            Number of employees must be a number
                                        </strong>
                                    )))}
                        </div>
                    </>
                )}

                <div className="common-input mb-4">
                    <label htmlFor="name">
                        {providerType === "Business"
                            ? "Founded date"
                            : "Date of birth"}
                    </label>
                    <input
                        type="date"
                        className={` ${
                            errors?.dob || errors?.founded ? "is-invalid" : ""
                        }`}
                        defaultValue={
                            providerType === "Business"
                                ? profile?.founded
                                : profile?.dob
                        }
                        onChange={(date) => {
                            if (providerType === "Business") {
                                handleDatePick({ founded: date });
                            } else {
                                handleDatePick({ dob: date });
                            }
                        }}
                        {...register(
                            providerType === "Business" ? "founded" : "dob",
                            {
                                required: true,
                                onChange: (e) => {
                                    if (providerType === "Business") {
                                        handleDatePick({
                                            founded: e.target.value,
                                        });
                                    } else {
                                        handleDatePick({ dob: e.target.value });
                                    }
                                },
                            }
                        )}
                    />
                    {/* <DatePicker
                        className={` ${
                            errors?.dob ? "is-invalid" : ""
                        }`}
                        selected={
                            providerType === "Business"
                                ? profile?.founded || new Date()
                                : profile?.dob || new Date()
                        }
                        onChange={(date) => {
                            if (providerType === "Business") {
                                handleDatePick({ founded: date });
                            } else {
                                handleDatePick({ dob: date });
                            }
                        }}
                        // {...register("dob", {
                        //     required: true,
                        //     onChange: (e) => {
                        //         handleProfile({ dob: e.target.value });
                        //     },
                        // })}
                    /> */}
                    {errors?.dob && errors.dob.type === "required" && (
                        <strong className="text-danger">
                            Date of birth is required
                        </strong>
                    )}
                </div>
                <div className="common-input mb-4">
                    <label htmlFor="name">Hourly rate</label>
                    <input
                        type="text"
                        className={` ${
                            errors?.hourly_rate ? "is-invalid" : ""
                        }`}
                        placeholder="Add hourly rate like 12"
                        {...register("hourly_rate", {
                            required: true,
                            pattern: /^[0-9]*$/,
                            onChange: (e) => {
                                handleProfile({ hourly_rate: e.target.value });
                            },
                        })}
                        defaultValue={profile?.hourly_rate}
                    />
                    {errors?.hourly_rate &&
                        ((errors.hourly_rate?.type === "required" && (
                            <strong className="text-danger">
                                Hourly rate is required
                            </strong>
                        )) ||
                            (errors.hourly_rate?.type === "pattern" && (
                                <strong className="text-danger">
                                    Hourly rate must be number
                                </strong>
                            )))}
                </div>
                <div className="common-input mb-4">
                    <label htmlFor="name">Address</label>
                    <input
                        type="text"
                        className={` ${
                            errors?.street_address ? "is-invalid" : ""
                        }`}
                        placeholder="street address"
                        {...register("street_address", {
                            required: true,
                            onChange: (e) => {
                                handleProfile({
                                    street_address: e?.target?.value,
                                });
                            },
                        })}
                        defaultValue={profile?.street_address}
                    />
                    {errors?.street_address &&
                        errors.street_address.type === "required" && (
                            <strong className="text-danger">
                                Address is required
                            </strong>
                        )}
                </div>
                <div className="common-input mb-4">
                    <input
                        type="text"
                        className={` ${
                            errors?.suite_number ? "is-invalid" : ""
                        }`}
                        placeholder="suit or #"
                        {...register("suite_number", {
                            required: true,
                            onChange: (e) => {
                                handleProfile({ suite_number: e.target.value });
                            },
                        })}
                        defaultValue={profile?.suite_number}
                    />
                    {errors?.suite_number && (
                        <strong className="text-danger">
                            Suite number is required
                        </strong>
                    )}
                </div>
                <div className="common-input mb-4">
                    <input
                        type="text"
                        className={` ${
                            errors?.zip_code ? "is-invalid" : ""
                        }`}
                        placeholder="zip code"
                        {...register("zip_code", {
                            required: true,
                            onChange: (e) => {
                                handleProfile({ zip_code: e.target.value });
                            },
                        })}
                        defaultValue={profile?.zip_code}
                    />
                    {errors?.zip_code && (
                        <strong className="text-danger">
                            Zip code is required
                        </strong>
                    )}
                </div>
                <div className="common-input mb-4">
                    <input
                        type="text"
                        className={` ${
                            errors?.city ? "is-invalid" : ""
                        }`}
                        placeholder="City"
                        {...register("city", {
                            required: true,
                            onChange: (e) => {
                                handleProfile({ city: e.target.value });
                            },
                        })}
                        defaultValue={profile?.city}
                    />
                    {errors?.city && (
                        <strong className="text-danger">
                            City is required
                        </strong>
                    )}
                </div>
                <div className="common-input mb-4">
                    <input
                        type="text"
                        className={` ${
                            errors?.state ? "is-invalid" : ""
                        }`}
                        placeholder="state"
                        {...register("state", {
                            required: true,
                            onChange: (e) => {
                                handleProfile({ state: e.target.value });
                            },
                        })}
                        defaultValue={profile?.state}
                    />
                    {errors?.state && (
                        <strong className="text-danger">
                            State is required
                        </strong>
                    )}
                </div>

                <div className="common-input mb-4">
                    <label htmlFor="name">Bio</label>
                    <textarea
                        type="text"
                        className={` ${
                            errors?.bio ? "is-invalid" : ""
                        }`}
                        id="name"
                        placeholder="Enter you bio"
                        {...register("bio", {
                            required: true,
                            minLength: 20,
                            maxLength: 500,
                            onChange: (e) => {
                                handleProfile({ bio: e.target.value });
                            },
                        })}
                        defaultValue={profile?.bio}
                    ></textarea>
                    {errors?.bio &&
                        ((errors.bio.type === "required" && (
                            <strong className="text-danger">
                                Bio is required
                            </strong>
                        )) ||
                            (errors?.bio?.type === "minLength" && (
                                <strong className="text-danger">
                                    Bio must be at least 20 characters
                                </strong>
                            )) ||
                            (errors?.bio?.type === "maxLength" && (
                                <strong className="text-danger">
                                    Bio must be less than 500 characters
                                </strong>
                            )))}
                </div>
                <div className="form-term mb-2">
                    {" "}
                    Please make sure all information you submit is accurate
                    before submit.
                </div>

                <div className="d-flex justify-content-between">
                    <button
                        className="btn btn-primary w-100 mt-3"
                        id="step-6-back"
                        type="button"
                        onClick={() => handleStep(5)}
                        disabled={profileDetails?.loading}
                    >
                        Back
                    </button>
                    <div className="px-3"></div>
                    <button
                        className="btn btn-primary w-100 mt-3"
                        id="submit"
                        type="submit"
                        disabled={profileDetails?.loading}
                    >
                        {profileDetails?.loading ? (
                            <span>
                                <i className={`fa fa-spinner fa-pulse`}></i>{" "}
                                Loading...
                            </span>
                        ) : (
                            "submit"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

// const Company = ({ handleStep }) => {
//     return (
//         <div className="login-from step-6-company">
//             <div className="common-input mb-4">
//                 <div className="form-title mb-3"> Company Profile Setting</div>

//                 <div className="user-profile">
//                     <div className="user-image d-flex align-items-center justify-content-center">
//                         <img
//                             src="img/images.png"
//                             className="img-fluid"
//                             alt=""
//                         />
//                     </div>
//                     <label htmlFor="file-upload" className="upload-image">
//                         <i className="fas fa-pencil-alt"></i>
//                         <input
//                             type="file"
//                             id="file-upload1"
//                             className="d-none"
//                         />
//                     </label>
//                 </div>
//             </div>

//             <div className="common-input mb-4">
//                 <div className="form-title mb-3">Legal Name</div>
//                 <label htmlFor="name">First Name</label>
//                 <input
//                     type="text"
//                     
//                     id="name"
//                     placeholder="First name"
//                 />
//             </div>
//             <div className="common-input mb-4">
//                 <label htmlFor="name">Last Name</label>
//                 <input
//                     type="text"
//                     
//                     id="name"
//                     placeholder="last name"
//                 />
//             </div>
//             <div className="common-input mb-4">
//                 <label htmlFor="name">Date of birth</label>
//                 <input
//                     type="text"
//                     
//                     id="name"
//                     placeholder="select Date"
//                 />
//             </div>
//             <div className="common-input mb-4">
//                 <label htmlFor="name">Hourly rate</label>
//                 <input
//                     type="text"
//                     
//                     id="name"
//                     placeholder="$10 per hour"
//                 />
//             </div>
//             <div className="common-input mb-4">
//                 <label htmlFor="name">Home Address</label>
//                 <input
//                     type="text"
//                     
//                     id="name"
//                     placeholder="street address"
//                 />
//             </div>
//             <div className="common-input mb-4">
//                 <input
//                     type="text"
//                     
//                     id="name"
//                     placeholder="suit or #"
//                 />
//             </div>
//             <div className="common-input mb-4">
//                 <input
//                     type="text"
//                     
//                     id="name"
//                     placeholder="utrecht"
//                 />
//             </div>
//             <div className="common-input mb-4">
//                 <input
//                     type="text"
//                     
//                     id="name"
//                     placeholder="utrecht"
//                 />
//             </div>
//             <div className="common-input mb-4">
//                 <input
//                     type="text"
//                     
//                     id="name"
//                     placeholder="1078GZ n/a, 3527 kz"
//                 />
//             </div>

//             <div className="common-input mb-4">
//                 <label htmlFor="name">Bio</label>
//                 <textarea
//                     type="text"
//                     
//                     id="name"
//                     placeholder="Enter you bio"
//                 ></textarea>
//             </div>
//             <div className="form-term mb-2">
//                 {" "}
//                 Please make sure all information you submit is accurate before
//                 submit.
//             </div>

//             <div className="d-flex justify-content-between">
//                 <button
//                     className="btn btn-primary w-100 mt-3"
//                     id="step-6-back-c"
//                     type="button"
//                     onClick={() => handleStep(5)}
//                 >
//                     Back
//                 </button>
//                 <div className="px-3"></div>
//                 <button
//                     className="btn btn-primary w-100 mt-3"
//                     id="submit-company"
//                     type="button"
//                 >
//                     submit
//                 </button>
//             </div>
//         </div>
//     );
// };

export {
    Basic,
    Otp,
    BasicInfo,
    SelectZipCode,
    ProviderType,
    ProfileDetail,
    // Company,
};
