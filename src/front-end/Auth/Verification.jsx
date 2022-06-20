import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { HOST } from "../../constants";

const Verification = (props) => {
    const { location, history } = props;

    const {
        state: { verification },
    } = location;

    const [state, setState] = useState({
        loading: false,
        phone: "",
        code: "+1",
        section: 0,
        token: "",
        password: "",
        password_confirmation: "",
        otpSuccessMessage: "",
        otpErrorMessage: "",
        passwordChangeMessage: "",
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setState((state) => ({
            ...state,
            loading: false,
        }));
    }, []);

    const handleBasic = async ({ phone }) => {
        setState((state) => ({
            ...state,
            loading: true,
        }));
        await axios({
            method: "post",
            data: {
                email: verification.email,
                phone: state?.code + phone,
            },
            url: `${HOST}/api/user/send-otp`,
        })
            .then((response) => {
                let data = response.data;
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
            data: {
                otp,
                email: verification.email,
                phone: state?.code + state.phone,
                for_verification: true,
            },
            url: `${HOST}/api/user/signup/phone/verify`,
        })
            .then((response) => {
                const data = response?.data;
                if (data?.data) {
                    localStorage.setItem("userToken", data?.data.auth_token);
                    localStorage.setItem(
                        "user_data",
                        JSON.stringify(data?.data?.user)
                    );
                    setState((state) => ({
                        ...state,
                        loading: false,
                    }));
                    history.push("/dashboard");
                } else {
                    localStorage.clear();
                    history.push("/login");
                }
            })
            .catch((error) => {
                let data = error.response?.data;
                setState((state) => ({
                    ...state,
                    otpVerifyErrorMessage: data.message,
                    loading: false,
                }));
                localStorage.clear();
                history.push("/login");
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
                                            Please enter your phone number for
                                            Verification
                                        </div>
                                        <div className="row">
                                            <div className="mx-auto rem-1-5 mb-2 col-md-6">
                                                <strong>
                                                    {`Email: ${verification.email}`}
                                                </strong>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="common-input mb-4 col-6 mx-auto">
                                                <label className="rem-1-5">
                                                    Phone
                                                </label>
                                                <strong className="text-danger">
                                                    *
                                                </strong>
                                                <div className="d-flex phone-input">
                                                    <select
                                                        className="js-example-basic-single col-4"
                                                        name="code"
                                                        defaultValue={
                                                            state?.code
                                                        }
                                                        onChange={({
                                                            target: { value },
                                                        }) =>
                                                            setState(
                                                                (state) => ({
                                                                    ...state,
                                                                    code: value,
                                                                })
                                                            )
                                                        }
                                                    >
                                                        <option value={"+1"}>
                                                            +1{" "}
                                                        </option>
                                                        <option value={"+92"}>
                                                            +92
                                                        </option>
                                                        <option value={"+234"}>
                                                            +234
                                                        </option>
                                                    </select>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        className="phone-input-2 col-8"
                                                        placeholder="1234567890"
                                                        {...register("phone", {
                                                            required: true,
                                                            minLength: 10,
                                                            maxLength: 10,
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
                                                    />
                                                </div>
                                                {!!state?.otpErrorMessage && (
                                                    <div className="text-danger">
                                                        {typeof state?.otpErrorMessage ==
                                                            "string" &&
                                                            state?.otpErrorMessage}
                                                        {typeof state?.otpErrorMessage ==
                                                            "object" &&
                                                            state
                                                                ?.otpErrorMessage[
                                                                "phone"
                                                            ]}
                                                    </div>
                                                )}
                                                {errors?.phone &&
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
                                                                    10 digits
                                                                </div>
                                                            );
                                                        }
                                                    })()}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <center className="col-md-6 mt-3 mx-auto">
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
                                            </center>
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
                                                        <label className="rem-1-5 float-left">
                                                            Phone
                                                            <strong className="text-danger">
                                                                *
                                                            </strong>
                                                        </label>
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

                                {/* <div className="d-flex justify-content-between"> */}
                                {state?.section == 1 && (
                                    <div className="float-left angle-icon">
                                        <i
                                            className="fas fa-angle-left fa-5x"
                                            onClick={() => {
                                                setState((state) => ({
                                                    ...state,
                                                    section: 0,
                                                }));
                                            }}
                                        ></i>
                                    </div>
                                )}
                                {state?.section == 0 &&
                                    !!state?.otpSuccessMessage && (
                                        <div className="float-right angle-icon">
                                            <i
                                                className="fas fa-angle-right fa-5x"
                                                onClick={() => {
                                                    setState((state) => ({
                                                        ...state,
                                                        section: 1,
                                                    }));
                                                }}
                                            ></i>
                                        </div>
                                    )}
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Verification;
