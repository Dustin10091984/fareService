import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { HOST } from "../../constants";
import { async } from "@firebase/util";

const ForgotPassword = () => {
    const [state, setState] = useState({
        loading: false,
        phone: "",
        otpSuccessMessage: "",
        otpErrorMessage: "",
        section: 1,
    });
    console.log(state);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const handleBasic = async ({ phone }) => {
        setState((state) => ({
            ...state,
            loading: true,
        }));
        await axios({
            method: "post",
            data: { phone: "+" + phone },
            url: `${HOST}/api/user/forgot-password`,
        })
            .then((response) => {
                let data = response.data;
                console.log(data);
                setState((state) => ({
                    ...state,
                    otpSuccessMessage: data.message,
                    section: 1,
                    loading: false,
                }));
            })
            .catch((error) => {
                let data = error.response.data;
                setState((state) => ({
                    ...state,
                    otpErrorMessage: data.message,
                    loading: false,
                }));
            });
    };

    const handleOtpSubmit = async ({ otp }) => {
        setState((state) => ({
            ...state,
            loading: true,
        }));
        await axios({
            method: "post",
            data: { otp, phone: state.phone || "+923224578466" },
            url: `${HOST}/api/user/signup/phone/verify`,
        })
            .then((response) => {
                let data = response.data;
                setState((state) => ({
                    ...state,
                    otpVerifySuccessMessage: data.message,
                    loading: false,
                    section: 2,
                }));
            })
            .catch((error) => {
                let data = error.response.data;
                setState((state) => ({
                    ...state,
                    otpVerifyErrorMessage: data.message,
                    loading: false,
                }));
            });
    };

    return (
        <>
            <div className="login-sec d-flex">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="login-box h-auto mx-auto">
                                <div className="login-heading mb-4 text-center">
                                    Farenow
                                </div>
                                {state?.section == 0 && (
                                    <form onSubmit={handleSubmit(handleBasic)}>
                                        <div className="login-detail mt-0 mb-5 text-center">
                                            Forgot your password, Enter your
                                            phone below.
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mx-auto">
                                                <span className="rem-1-5">
                                                    phone start with +92, +1 or
                                                    +234
                                                </span>
                                                <div className="common-input mt-2">
                                                    <input
                                                        {...register("phone", {
                                                            required: true,
                                                            minLength: 10,
                                                            maxLength: 15,
                                                            defaultValue:
                                                                !!state?.phone &&
                                                                state?.phone,
                                                            onChange: ({
                                                                target: {
                                                                    value,
                                                                },
                                                            }) => {
                                                                setState(
                                                                    (
                                                                        prevState
                                                                    ) => ({
                                                                        ...prevState,
                                                                        otpErrorMessage:
                                                                            "",
                                                                        phone: value,
                                                                    })
                                                                );
                                                            },
                                                        })}
                                                        type="number"
                                                        defaultValue={""}
                                                        placeholder="+923210000000"
                                                        min={0}
                                                    />
                                                </div>
                                                {!!state?.otpErrorMessage && (
                                                    <div className="text-danger">
                                                        {state?.otpErrorMessage}
                                                    </div>
                                                )}
                                                {errors.phone &&
                                                    (() => {
                                                        if (
                                                            errors.phone
                                                                .type ===
                                                            "required"
                                                        ) {
                                                            return (
                                                                <div className="text-danger">
                                                                    phone is
                                                                    required
                                                                </div>
                                                            );
                                                        }
                                                        if (
                                                            errors.phone
                                                                .type ===
                                                            "minLength"
                                                        ) {
                                                            return (
                                                                <div className="text-danger">
                                                                    phone must
                                                                    be at least
                                                                    10 digits
                                                                </div>
                                                            );
                                                        }
                                                        if (
                                                            errors.phone
                                                                .type ===
                                                            "maxLength"
                                                        ) {
                                                            return (
                                                                <div className="text-danger">
                                                                    phone must
                                                                    be at most
                                                                    15 digits
                                                                </div>
                                                            );
                                                        }
                                                    })()}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mt-3 mx-auto">
                                                <button
                                                    disabled={state?.loading}
                                                    type="submit"
                                                    className="button-common w-100 mb-5"
                                                >
                                                    {!!state?.loading ? (
                                                        <>
                                                            Please wait{" "}
                                                            <i className="fas fa-spinner fa-pulse"></i>
                                                        </>
                                                    ) : (
                                                        "Send OTP"
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                                {state?.section == 1 && (
                                    <form
                                        onSubmit={handleSubmit(handleOtpSubmit)}
                                    >
                                        <div className="text-center">
                                            <div className="row mb-2">
                                                {!!state?.otpSuccessMessage && (
                                                    <div className="col-md-6 mx-auto">
                                                        <span className="rem-1-5 text-success">
                                                            {
                                                                state?.otpSuccessMessage
                                                            }
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mx-auto">
                                                    <div className="common-input">
                                                        <input
                                                            {...register(
                                                                "otp",
                                                                {
                                                                    required: true,
                                                                    minLength: 4,
                                                                    maxLength: 4,
                                                                    defaultValue:
                                                                        !!state?.otp &&
                                                                        state?.otp,
                                                                    onChange: ({
                                                                        target: {
                                                                            value,
                                                                        },
                                                                    }) => {
                                                                        setState(
                                                                            (
                                                                                prevState
                                                                            ) => ({
                                                                                ...prevState,
                                                                                otpErrorMessage:
                                                                                    "",
                                                                                otp: value,
                                                                            })
                                                                        );
                                                                    },
                                                                }
                                                            )}
                                                            placeholder="0 0 0 0"
                                                            type="number"
                                                        />
                                                    </div>
                                                    {!!state?.otpVerifyErrorMessage && (
                                                        <div className="text-danger">
                                                            {
                                                                state?.otpVerifyErrorMessage
                                                            }
                                                        </div>
                                                    )}
                                                    {errors.otp &&
                                                        (() => {
                                                            if (
                                                                errors.otp
                                                                    .type ===
                                                                "required"
                                                            ) {
                                                                return (
                                                                    <div className="text-danger">
                                                                        Otp is
                                                                        required
                                                                    </div>
                                                                );
                                                            }
                                                            if (
                                                                errors.otp
                                                                    .type ===
                                                                "minLength"
                                                            ) {
                                                                return (
                                                                    <div className="text-danger">
                                                                        Otp must
                                                                        be at
                                                                        least 4
                                                                        digits
                                                                    </div>
                                                                );
                                                            }
                                                            if (
                                                                errors.otp
                                                                    .type ===
                                                                "maxLength"
                                                            ) {
                                                                return (
                                                                    <div className="text-danger">
                                                                        Otp must
                                                                        be at
                                                                        most 4
                                                                        digits
                                                                    </div>
                                                                );
                                                            }
                                                        })()}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mx-auto mt-4">
                                                    <button
                                                        disabled={
                                                            state?.loading
                                                        }
                                                        type="submit"
                                                        className="button-common w-100 mb-5"
                                                    >
                                                        {!!state?.loading ? (
                                                            <>
                                                                Please wait{" "}
                                                                <i className="fas fa-spinner fa-pulse"></i>
                                                            </>
                                                        ) : (
                                                            "Verify"
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )}
                                {state?.section == 2 && (
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6 mx-auto">
                                                <div className="common-input mb-5">
                                                    <input
                                                        type="password"
                                                        placeholder="New password"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mx-auto">
                                                <div className="common-input mb-5">
                                                    <input
                                                        type="password"
                                                        placeholder="Re enter password"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mx-auto">
                                                <button className="button-common w-100 mb-5">
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
