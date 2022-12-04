import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { HOST } from "../../constants";
import { useHistory } from "react-router-dom";
import OTPVerifyInput from "./OTPVerifyInput";
import { toast } from "react-toastify";

const ForgotPasswordWithEmail = () => {
  const [state, setState] = useState({
    loading: false,
    email: "",
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

  const handleBasic = async ({ email }) => {
    setState((state) => ({
      ...state,
      loading: true,
    }));
    await axios({
      method: "post",
      data: { email: email },
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

  const handleOtpSubmit = async () => {
    setState((state) => ({
      ...state,
      loading: true,
    }));
    await axios({
      method: "post",
      data: { otp: state.otp, email: state.email, for_password: true },
      url: `${HOST}/api/user/signup/email/verify`,
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
          otpVerifyErrorMessage: data.message?.otp || data.message,
          loading: false,
        }));
      });
  };

  const handleChangePassword = async () => {
    setState((state) => ({
      ...state,
      loading: true,
    }));
    try {
      const response = await axios({
        method: "post",
        data: {
          email: state.email,
          token: state.token,
          password: state?.password,
          password_confirmation: state?.password_confirmation,
        },
        url: `${HOST}/api/user/change-password`,
      });
      toast.success("Password change successfully");

      history.push({
        pathname: "/login",
        state: {
          from: "forgot-password",
        },
      });
    } catch (error) {
      let data = error.response.data;
      setState((state) => ({
        ...state,
        passwordChangeMessage: data.message,
        loading: false,
      }));
      let message = "";
      if (typeof data.message == "string") message = data.message;
      else if (typeof data.message == "object") {
        message = (
          <>
            {Object.keys(data.message).map((key) => (
              <p>
                <b>{key}:</b> {data.message[key]}
              </p>
            ))}
          </>
        );
        toast.error(message);
      }
    }
  };
  return (
    <>
      <div className="login-sec d-flex bg-gray-50">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="login-box h-auto mx-auto">
                <div className="login-heading text-center text-4xl">
                  Forget Password
                </div>
                {state?.section == 0 && (
                  <form onSubmit={handleSubmit(handleBasic)} className="mx-6">
                    <div className="common-input mb-4">
                      <input
                        type="tel"
                        name="email"
                        placeholder="Enter your email address"
                        {...register("email", {
                          required: true,
                          defaultValue: !!state?.email && state?.email,
                          onChange: ({ target: { value } }) => {
                            setState((prevState) => ({
                              ...prevState,
                              otpErrorMessage: "",
                              email: value,
                            }));
                          },
                        })}
                      />
                      {!!state?.otpErrorMessage && (
                        <div className="text-danger">
                          {state?.otpErrorMessage}
                        </div>
                      )}
                      {errors?.email &&
                        (() => {
                          if (errors.email.type === "required") {
                            return (
                              <div className="text-danger">
                                email is required
                              </div>
                            );
                          }
                        })()}
                    </div>
                    <button
                      disabled={state?.loading}
                      type="submit"
                      className="fare-btn fare-btn-primary fare-btn-lg w-100 my-3"
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
                  </form>
                )}
                {state?.section == 1 && (
                  <div className="inner-box-log mx-auto text-base">
                    {!!state?.otpSuccessMessage && (
                      <div className="text-center -mt-8 mb-8 text-gray-500">
                        {state?.otpSuccessMessage}
                      </div>
                    )}
                    <form onSubmit={handleSubmit(handleOtpSubmit)}>
                      <div className="row">
                        <div className="mx-auto">
                          <div className="text-left">
                            <OTPVerifyInput
                              length={4}
                              onComplete={(value) => {
                                setState((prevState) => ({
                                  ...prevState,
                                  otpErrorMessage: "",
                                  otp: value,
                                }));
                              }}
                            />
                          </div>
                          {!!state?.otpVerifyErrorMessage && (
                            <div className="text-danger">
                              {state?.otpVerifyErrorMessage}
                            </div>
                          )}
                          {errors.otp &&
                            (() => {
                              if (errors.otp.type === "required") {
                                return (
                                  <div className="text-danger">
                                    Otp is required
                                  </div>
                                );
                              }
                              if (errors.otp.type === "minLength") {
                                return (
                                  <div className="text-danger">
                                    Otp must be at least 4 digits
                                  </div>
                                );
                              }
                              if (errors.otp.type === "maxLength") {
                                return (
                                  <div className="text-danger">
                                    Otp must be at most 4 digits
                                  </div>
                                );
                              }
                            })()}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mx-auto col-md-12 mt-12">
                          <button
                            disabled={state?.loading}
                            type="submit"
                            className="fare-btn fare-btn-primary fare-btn-lg w-100 mb-5"
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
                    </form>
                  </div>
                )}
                {state?.section == 2 && (
                  <form onSubmit={handleSubmit(handleChangePassword)}>
                    {typeof state?.passwordChangeMessage === "string" && (
                      <div className="login-detail text-danger mt-0 mb-5 text-center">
                        {state?.passwordChangeMessage}
                      </div>
                    )}
                    <div className="row">
                      <div className="col-md-12 mx-auto">
                        <div className="common-input">
                          <label className="rem-1-5">Password</label>
                          <strong className="text-danger">*</strong>
                          <input
                            {...register("password", {
                              required: true,
                              minLength: 6,
                              maxLength: 64,
                              defaultValue: "",
                              onChange: ({ target: { value } }) => {
                                setState((state) => ({
                                  ...state,
                                  password: value,
                                }));
                              },
                            })}
                            type="password"
                            placeholder="New password"
                          />
                        </div>
                        {typeof state?.passwordChangeMessage === "object" && (
                          <div className="text-danger">
                            {state?.passwordChangeMessage["password"]}
                          </div>
                        )}
                        {errors.password &&
                          (() => {
                            if (errors.password.type === "required") {
                              return (
                                <div className="text-danger">
                                  Password is required
                                </div>
                              );
                            }
                            if (errors.password.type === "minLength") {
                              return (
                                <div className="text-danger">
                                  Password must be at least 6 characters
                                </div>
                              );
                            }
                            if (errors.password.type === "maxLength") {
                              return (
                                <div className="text-danger">
                                  Password must be at least 64 characters
                                </div>
                              );
                            }
                          })()}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mx-auto">
                        <div className="common-input mt-4">
                          <label className="rem-1-5">Confirm Password</label>
                          <strong className="text-danger">*</strong>
                          <input
                            {...register("password_confirmation", {
                              required: true,
                              minLength: 6,
                              maxLength: 64,
                              defaultValue: "",
                              validate: (value) =>
                                value === state?.password ||
                                "The passwords do not match",
                              onChange: ({ target: { value } }) => {
                                setState((state) => ({
                                  ...state,
                                  password_confirmation: value,
                                }));
                              },
                            })}
                            type="password"
                            placeholder="Re enter password"
                          />
                          {typeof state?.passwordChangeMessage === "object" && (
                            <div className="text-danger">
                              {
                                state?.passwordChangeMessage[
                                  "passwopassword_confirmationrd"
                                ]
                              }
                            </div>
                          )}
                          {errors.password_confirmation &&
                            (() => {
                              if (
                                errors.password_confirmation.type === "required"
                              ) {
                                return (
                                  <div className="text-danger">
                                    Confirm Password is required
                                  </div>
                                );
                              }
                              if (
                                errors.password_confirmation.type ===
                                "minLength"
                              ) {
                                return (
                                  <div className="text-danger">
                                    Password must be at least 6 characters
                                  </div>
                                );
                              }
                              if (
                                errors.password_confirmation.type ===
                                "maxLength"
                              ) {
                                return (
                                  <div className="text-danger">
                                    Password must be at least 64 characters
                                  </div>
                                );
                              }
                              if (
                                errors.password_confirmation.type === "validate"
                              ) {
                                return (
                                  <div className="text-danger">
                                    {errors.password_confirmation?.message}
                                  </div>
                                );
                              }
                            })()}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mx-auto">
                        <button
                          disabled={state?.loading}
                          className="fare-btn fare-btn-primary fare-btn-lg w-100 mt-4"
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

                {/* <div className="d-flex justify-content-between"> */}
                {/*
                * === not provided in the design ===
                 {state?.section == 1 && (
                  <div className="float-left angle-icon">
                    <i
                      className="fas fa-angle-left fa-1x"
                      onClick={() => {
                        setState((state) => ({
                          ...state,
                          section: 0,
                        }));
                      }}
                    ></i>
                  </div>
                )}
                {state?.section == 0 && !!state?.otpSuccessMessage && (
                  <div className="float-right angle-icon">
                    <i
                      className="fas fa-angle-right fa-1x"
                      onClick={() => {
                        setState((state) => ({
                          ...state,
                          section: 1,
                        }));
                      }}
                    ></i>
                  </div>
                )} */}
                <hr className="my-4 mx-8" />
                <div className="text-[1.6rem] text-gray-400 text-center px-8">
                  By signing and clicking Get a Price, you affirm you have read
                  and agree to the Farenow Terms, and you agree and authorize
                  Farenow and its affiliates, and their networks of service
                  professionals, to deliver marketing calls or texts using
                  automated technology to the number you provided above
                  regarding your project and other home services offers. Consent
                  is not a condition of purchase.
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordWithEmail;
