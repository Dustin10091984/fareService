import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { HOST } from "../../constants";
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
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

    const history = useHistory();

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
            data: { phone: state?.code + phone },
            url: `${HOST}/api/user/forgot-password`,
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
            data: { otp, phone: state?.code + state.phone, for_password: true },
            url: `${HOST}/api/user/signup/phone/verify`,
        })
            .then((response) => {
                let data = response.data;
                setState((state) => ({
                    ...state,
                    otpVerifySuccessMessage: data.message,
                    token: data.token,
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

    const handleChangePassword = async () => {
        console.log(state.token);
        setState((state) => ({
            ...state,
            loading: true,
        }));
        await axios({
            method: "post",
            headers: { Authorization: `Bearer ${state.token}` },
            data: {
                password: state?.password,
                password_confirmation: state?.password_confirmation,
            },
            url: `${HOST}/api/user/change-password`,
        })
            .then((response) => {
                history.push({
                    pathname: "/login",
                    state: {
                        from: "forgot-password",
                        message: "Password change successfully",
                    },
                });
            })
            .catch((error) => {
                let data = error.response.data;
                setState((state) => ({
                    ...state,
                    passwordChangeMessage: data.message,
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
                                                        {state?.otpErrorMessage}
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
                                {state?.section == 2 && (
                                    <form
                                        onSubmit={handleSubmit(
                                            handleChangePassword
                                        )}
                                    >
                                        {typeof state?.passwordChangeMessage ===
                                            "string" && (
                                            <div className="login-detail text-danger mt-0 mb-5 text-center">
                                                {state?.passwordChangeMessage}
                                            </div>
                                        )}
                                        <div className="row">
                                            <div className="col-md-6 mx-auto">
                                                <div className="common-input">
                                                    <label className="rem-1-5">
                                                        Password
                                                    </label>
                                                    <strong className="text-danger">
                                                        *
                                                    </strong>
                                                    <input
                                                        {...register(
                                                            "password",
                                                            {
                                                                required: true,
                                                                minLength: 6,
                                                                maxLength: 64,
                                                                defaultValue:
                                                                    "",
                                                                onChange: ({
                                                                    target: {
                                                                        value,
                                                                    },
                                                                }) => {
                                                                    setState(
                                                                        (
                                                                            state
                                                                        ) => ({
                                                                            ...state,
                                                                            password:
                                                                                value,
                                                                        })
                                                                    );
                                                                },
                                                            }
                                                        )}
                                                        type="password"
                                                        placeholder="New password"
                                                    />
                                                </div>
                                                {typeof state?.passwordChangeMessage ===
                                                    "object" && (
                                                    <div className="text-danger">
                                                        {
                                                            state
                                                                ?.passwordErrorMessage[
                                                                "password"
                                                            ]
                                                        }
                                                    </div>
                                                )}
                                                {!!state?.passwordErrorMessage && (
                                                    <div className="text-danger">
                                                        {
                                                            state?.passwordErrorMessage
                                                        }
                                                    </div>
                                                )}
                                                {errors.password &&
                                                    (() => {
                                                        if (
                                                            errors.password
                                                                .type ===
                                                            "required"
                                                        ) {
                                                            return (
                                                                <div className="text-danger">
                                                                    Password is
                                                                    required
                                                                </div>
                                                            );
                                                        }
                                                        if (
                                                            errors.password
                                                                .type ===
                                                            "minLength"
                                                        ) {
                                                            return (
                                                                <div className="text-danger">
                                                                    Password
                                                                    must be at
                                                                    least 6
                                                                    characters
                                                                </div>
                                                            );
                                                        }
                                                        if (
                                                            errors.password
                                                                .type ===
                                                            "maxLength"
                                                        ) {
                                                            return (
                                                                <div className="text-danger">
                                                                    Password
                                                                    must be at
                                                                    least 64
                                                                    characters
                                                                </div>
                                                            );
                                                        }
                                                    })()}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mx-auto">
                                                <div className="common-input mt-4">
                                                    <label className="rem-1-5">
                                                        Confirm Password
                                                    </label>
                                                    <strong className="text-danger">
                                                        *
                                                    </strong>
                                                    <input
                                                        {...register(
                                                            "password_confirmation",
                                                            {
                                                                required: true,
                                                                minLength: 6,
                                                                maxLength: 64,
                                                                defaultValue:
                                                                    "",
                                                                validate: (
                                                                    value
                                                                ) =>
                                                                    value ===
                                                                        state?.password ||
                                                                    "The passwords do not match",
                                                                onChange: ({
                                                                    target: {
                                                                        value,
                                                                    },
                                                                }) => {
                                                                    setState(
                                                                        (
                                                                            state
                                                                        ) => ({
                                                                            ...state,
                                                                            password_confirmation:
                                                                                value,
                                                                        })
                                                                    );
                                                                },
                                                            }
                                                        )}
                                                        type="password"
                                                        placeholder="Re enter password"
                                                    />
                                                    {typeof state?.passwordChangeMessage ===
                                                        "object" && (
                                                        <div className="text-danger">
                                                            {
                                                                state
                                                                    ?.passwordErrorMessage[
                                                                    "passwopassword_confirmationrd"
                                                                ]
                                                            }
                                                        </div>
                                                    )}
                                                    {!!state?.passwordErrorMessage && (
                                                        <div className="text-danger">
                                                            {
                                                                state?.passwordErrorMessage
                                                            }
                                                        </div>
                                                    )}
                                                    {errors.password_confirmation &&
                                                        (() => {
                                                            if (
                                                                errors
                                                                    .password_confirmation
                                                                    .type ===
                                                                "required"
                                                            ) {
                                                                return (
                                                                    <div className="text-danger">
                                                                        Confirm
                                                                        Password
                                                                        is
                                                                        required
                                                                    </div>
                                                                );
                                                            }
                                                            if (
                                                                errors
                                                                    .password_confirmation
                                                                    .type ===
                                                                "minLength"
                                                            ) {
                                                                return (
                                                                    <div className="text-danger">
                                                                        Password
                                                                        must be
                                                                        at least
                                                                        6
                                                                        characters
                                                                    </div>
                                                                );
                                                            }
                                                            if (
                                                                errors
                                                                    .password_confirmation
                                                                    .type ===
                                                                "maxLength"
                                                            ) {
                                                                return (
                                                                    <div className="text-danger">
                                                                        Password
                                                                        must be
                                                                        at least
                                                                        64
                                                                        characters
                                                                    </div>
                                                                );
                                                            }
                                                            if (
                                                                errors
                                                                    .password_confirmation
                                                                    .type ===
                                                                "validate"
                                                            ) {
                                                                return (
                                                                    <div className="text-danger">
                                                                        {
                                                                            errors
                                                                                .password_confirmation
                                                                                ?.message
                                                                        }
                                                                    </div>
                                                                );
                                                            }
                                                        })()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mx-auto">
                                                <button
                                                    disabled={state?.loading}
                                                    className="button-common w-100 mt-4"
                                                    type="submit"
                                                >
                                                    {!!state?.loading ? (
                                                        <>
                                                            Please wait{" "}
                                                            <i className="fas fa-spinner fa-pulse"></i>
                                                        </>
                                                    ) : (
                                                        "Save"
                                                    )}
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
