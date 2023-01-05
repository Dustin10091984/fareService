import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { HOST } from "../../constants";
import OTPVerifyInput from "./OTPVerifyInput";
import CommonInput from "../../components/input.common";

const RegisterWithEmail = (props) => {
  const { history } = props;

  const [state, setState] = useState({
    isLoading: false,
    otpLoading: false,
    values: {
      first_name: "",
      last_name: "",
      email: "",
      zip_code: "",
      password: "",
      password_confirmation: "",
    },
    errors: {},
    step: 1,
    timeLeft: 30,
    send: false,
    otpMessage: "",
    errorMessage: "",
  });

  const countdown = () => {
    setState({ ...state, otpLoading: true, send: true });
    let timeLeft = 29;
    let timerId = setInterval(() => {
      if (timeLeft == 0) {
        clearTimeout(timerId);
        setState((prevState) => ({
          ...prevState,
          timeLeft: 29,
          send: false,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          timeLeft: timeLeft--,
        }));
      }
    }, 1000);
    axios({
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/api/user/signup/email",
      data: state.values,
    })
      .then(function (response) {
        setState((prevState) => ({
          ...prevState,
          otpMessage: "OTP sent successfully",
          otpLoading: false,
        }));
      })
      .catch((error) => {
        //handle error
        if (error.response && error.response.data["error"]) {
          setState((state) => ({
            ...state,

            errors: {
              ...(state.errors = error.response.data.message),
            },
          }));
        }
        setState((prevState) => ({
          ...prevState,
          otpLoading: false,
        }));
      });
  };

  useEffect(() => {
    if ((localStorage.userToken, localStorage.userToken)) {
      history.push("/dashboard");
    }
  }, [localStorage.userToken, localStorage.userToken]);

  const handleChange = (event) => {
    event.persist();
    setState((state) => ({
      ...state,
      values: {
        ...state.values,
        [event.target.name]: event.target.value,
      },
      errors: {
        ...state.errors,
        [event.target.name]: "",
      },
    }));
  };
  const handleOptChange = (optCodes) => {
    setState((state) => ({
      ...state,
      values: {
        ...state.values,
        otp: optCodes,
      },
    }));
  };

  const handleEmailSignUp = (event) => {
    !!event && event.preventDefault();
    setState((state) => ({
      ...state,
      isLoading: true,
    }));
    const { email } = state.values;
    const hiddenEmail =
      email.substring(0, 2) + "****" + email.substring(email.lastIndexOf("@"));
    axios({
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/api/user/signup/email",
      data: state.values,
    })
      .then(function (response) {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          step: 2,
          values: {
            ...state.values,
            otp: "",
          },
          otpMessage: `We have sent a verification code to your email at ${hiddenEmail}`,
        }));
      })
      .catch((error) => {
        //handle error
        if (error.response && error.response.data["error"]) {
          setState((state) => ({
            ...state,
            errors: {
              ...(state.errors = error.response.data.message),
            },
          }));
        }
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      });
  };

  const handleOtpSignUp = (event) => {
    event.preventDefault();
    setState((state) => ({
      ...state,
      isLoading: true,
    }));

    axios({
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/api/user/signup/email/verify",
      data: {
        email: state.values.email,
        otp: state.values.otp,
      },
    })
      .then(function (response) {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          step: 3,
        }));
      })
      .catch((error) => {
        //handle error
        if (error.response && error.response.data["error"]) {
          setState((state) => ({
            ...state,
            errors: {
              ...(state.errors = error.response.data.message),
            },
          }));
        }
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    setState((state) => ({
      ...state,
      isLoading: true,
    }));

    axios({
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/api/user/signup",
      data: state.values,
    })
      .then(function (response) {
        const data = response.data.data;
        localStorage.setItem("userToken", data.auth_token);
        localStorage.setItem("user_data", JSON.stringify(data.user));
        history.push("/dashboard");
      })
      .catch((error) => {
        //handle error
        if (error.response && error.response.data["error"]) {
          setState((state) => ({
            ...state,
            errors: {
              ...(state.errors = error.response.data.message),
            },
          }));
        }
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      });
  };

  const hasError = (field) => (state.errors[field] ? true : false);

  return (
    <div className="login-sec d-flex align-items-center bg-gray-50">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="login-box h-auto mx-auto">
              <div className="login-heading text-center text-4xl">Sign up</div>
              <div
                className="text-center text-success"
                style={{
                  fontSize: "1.5rem",
                }}
              >
                {state?.success &&
                  "Successfully registered. Please wait for the admin to approve your account."}
              </div>
              {(() => {
                switch (state.step) {
                  case 1:
                    return (
                      <div className="inner-box-log mx-auto">
                        <form onSubmit={handleEmailSignUp}>
                          <div className="common-input mb-5">
                            <label>Email Address</label>
                            <input
                              type="text"
                              name="email"
                              placeholder="Enter your email address"
                              required
                              value={state.values.email || ""}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p className="text-danger">
                              {hasError("email") ? state.errors.email : ""}
                            </p>
                          </div>
                          <button
                            type="submit"
                            className="fare-btn fare-btn-lg fare-btn-primary w-100 my-3"
                            disabled={state.isLoading}
                          >
                            Submit{" "}
                            {state.isLoading ? (
                              <i className="fas fa-spinner fa-spin ml-3"></i>
                            ) : (
                              ""
                            )}
                          </button>
                        </form>

                        {/* <div className="other-login text-center">
                                                    OR
                                                </div> */}

                        {/* <button className="login-gmail mt-5">
                                                    Login with Google
                                                </button>
                                                <button className="login-facebook mt-5"> || ""
                                                    Login with Facebook
                                                </button> */}
                      </div>
                    );
                  case 2:
                    return (
                      <div className="inner-box-log mx-auto text-base">
                        <div className="text-center -mt-8 mb-8 text-gray-500">
                          {state?.otpMessage}
                        </div>
                        <form onSubmit={handleOtpSignUp}>
                          <div className="my-4">
                            <OTPVerifyInput
                              length={4}
                              onComplete={handleOptChange}
                            />
                          </div>
                          {/* <div className="common-input">
                            <input
                              type="text"
                              name="otp"
                              placeholder="OTP"
                              required
                              value={state.values.otp}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p className="text-danger">
                              {hasError("otp") ? state.errors.otp : ""}
                            </p>
                          </div> */}
                          <div className="item show-all rem-1-5 text-center my-3">
                            {state?.timeLeft > 0 && state?.timeLeft < 29 ? (
                              <span className="rem-1-5 m-2 text-base">
                                Resent after {state?.timeLeft} seconds
                              </span>
                            ) : (
                              <a
                                className="btn-link m-2 text-base"
                                onClick={countdown}
                              >
                                Resend Code
                              </a>
                            )}
                          </div>
                          <button
                            type="submit"
                            className="fare-btn fare-btn-primary fare-btn-lg  w-100 my-3"
                            disabled={state.isLoading}
                          >
                            Submit{" "}
                            {state.isLoading ? (
                              <i className="fas fa-spinner fa-spin ml-3"></i>
                            ) : (
                              ""
                            )}
                          </button>
                        </form>
                      </div>
                    );
                  case 3:
                    return (
                      <form onSubmit={handleSignUp}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="common-input mb-5">
                              <label>First Name</label>
                              <input
                                type="text"
                                placeholder="First Name"
                                name="first_name"
                                value={state.values.first_name}
                                onChange={handleChange}
                              />
                              <p className="text-danger">
                                {hasError("first_name")
                                  ? state.errors.first_name
                                  : ""}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="common-input mb-5">
                              <label>Last Name</label>
                              <input
                                type="text"
                                placeholder="Last Name"
                                name="last_name"
                                value={state.values.last_name}
                                onChange={handleChange}
                              />
                              <p className="text-danger">
                                {hasError("last_name")
                                  ? state.errors.last_name
                                  : ""}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="common-input mb-5">
                              <label>Email Address</label>
                              <input
                                type="text"
                                placeholder="Email"
                                name="email"
                                value={state.values.email}
                                onChange={handleChange}
                              />
                              <p className="text-danger">
                                {hasError("email") ? state.errors.email : ""}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="common-input mb-5">
                              <label>Zip Code</label>
                              <input
                                type="text"
                                placeholder="ZIP Code"
                                name="zip_code"
                                value={state.values.zip_code}
                                onChange={handleChange}
                              />
                              <p className="text-danger">
                                {hasError("zip_code")
                                  ? state.errors.zip_code
                                  : ""}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <CommonInput
                              label="Password"
                              type="password"
                              placeholder="Password"
                              name="password"
                              value={state.values.password}
                              onChange={handleChange}
                              error={
                                hasError("password")
                                  ? state.errors.password
                                  : ""
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <CommonInput
                              label="Confirm Password"
                              type="password"
                              placeholder="Confirm Password"
                              name="password_confirmation"
                              value={state.values.password_confirmation}
                              onChange={handleChange}
                              error={
                                hasError("password_confirmation")
                                  ? state.errors.password_confirmation
                                  : ""
                              }
                            />
                          </div>
                          <div className="col-md-12">
                            <button
                              type="submit"
                              className="fare-btn fare-btn-lg  fare-btn-primary w-100 my-3"
                              disabled={state.isLoading || state?.success}
                            >
                              Submit{" "}
                              {state.isLoading ? (
                                <i className="fas fa-spinner fa-spin ml-3"></i>
                              ) : (
                                ""
                              )}
                            </button>
                          </div>
                        </div>
                      </form>
                    );
                  default:
                    return "";
                }
              })()}
              <div className="text-sm my-4 text-center">
                Already have account? &ensp;
                <Link to="/login" className="btn-link">
                  Login
                </Link>
              </div>
              <hr className="my-4 mx-8" />
              <div className="text-[1.6rem] text-gray-400 text-center px-8">
                By signing and clicking Get a Price, you affirm you have read
                and agree to the Farenow Terms, and you agree and authorize
                Farenow and its affiliates, and their networks of service
                professionals, to deliver marketing calls or texts using
                automated technology to the number you provided above regarding
                your project and other home services offers. Consent is not a
                condition of purchase.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(RegisterWithEmail);
