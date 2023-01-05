import React, { useState, useEffect, useRef } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { HOST } from "../../constants";
import OTPVerifyInput from "./OTPVerifyInput";
// import { GoogleLogin } from "react-google-login";
import { type } from "./../../store/Slices/services/QuestionAnswersSlice";

const Login = (props) => {
  const { history, location } = props;
  const divGoogle = useRef(null);
  const [state, setState] = useState({
    socialLoading: false,
    isLoading: false,
    values: {
      user_name: "",
      password: "",
    },
    errors: {},
    isVisible: false,
    socialError: "",
  });

  const [tokenData, setTokenData] = useState(null);
  const tokenClient = useRef(null);

  // useEffect(() => {
  //     if (window.FB) {
  //         window?.FB?.login(({ authResponse }) => {
  //             if (authResponse) {
  //             }
  //         });
  //     }
  // }, []);

  useEffect(() => {
    if (localStorage.userToken) history.push("/dashboard");
  }, []);

  useEffect(() => {
    window?.FB?.XFBML.parse();
  }, []);

  useEffect(() => {
    console.log("div Google", divGoogle);
    if (divGoogle.current) {
      console.log(window.google.accounts.id);
      window.google?.accounts?.id?.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: ({ credential }, error) => {
          console.log("here", credential);
          if (credential) {
            setTokenData({ token: credential, provider: "google" });
            handleSocialLogin({
              provider: "google",
              token: credential,
            });
          }
        },
      });

      const r = window.google?.accounts?.id?.renderButton(divGoogle.current, {
        type: "standard",
        width: "200px",
        theme: "filled_blue",
        size: "large",
        text: "signin_with",
        logo_alignment: "left",
        shape: "pill",
      });

      tokenClient.current = window.google?.accounts?.oauth2?.initTokenClient({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/contacts.readonly",
        prompt: "select_account", // '' | 'none' | 'consent' | 'select_account'
        callback: (data, error) => {
          const { access_token } = data;
          console.log("here", data);
          if (access_token) {
            setTokenData({
              token: access_token,
              provider: "google",
            });
            handleSocialLogin({
              provider: "google",
              token: access_token,
            });
          }
        }, // your function to handle the response after login. 'access_token' will be returned as property on the response
      });
    }
  }, [divGoogle.current]);

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

  const gotoReturnUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    const returnUrl = searchParams.get("returnUrl");
    if (returnUrl) {
      const rUrl = new URL(decodeURIComponent(returnUrl));
      history.push({
        pathname: rUrl.pathname,
        search: rUrl.search,
      });
    } else if (
      history.action === "POP" ||
      location?.state?.from == "forgot-password"
    ) {
      history.push("/dashboard");
    } else {
      history.goBack();
    }
  };
  const handleSignUp = async (event) => {
    event.preventDefault();
    setState((state) => ({
      ...state,
      isLoading: true,
    }));
    try {
      const response = await axios({
        method: "post",
        url: process.env.REACT_APP_API_BASE_URL + "/api/user/login",
        data: state.values,
      });

      const data = response.data.data;
      localStorage.setItem("userToken", data.auth_token);
      localStorage.setItem("user_data", JSON.stringify(data.user));

      gotoReturnUrl();
    } catch (error) {
      //handle error
      if (error.response && error.response.data["error"]) {
        let errors = null;
        if (typeof error.response.data.message == "string") {
          errors = error.response.data.message;
        }
        setState((state) => ({
          ...state,
          errors: errors
            ? errors
            : {
                ...(state.errors = error.response.data.message),
              },
        }));
      }
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  const handleSocialLogin = async ({ provider, token }) => {
    await axios({
      method: "post",
      url: `${HOST}/api/user/login/${provider}/callback`,
      data: {
        token,
      },
    })
      .then(function ({ data }) {
        setState((state) => ({
          ...state,
          socialLoading: false,
          socialError: "",
        }));
        localStorage.setItem("userToken", data.data.auth_token);
        localStorage.setItem("user_data", JSON.stringify(data.data.user));
        if (provider === "facebook") {
          window.FB?.logout();
        }
        if (provider === "google") {
          window.google?.accounts?.id.disableAutoSelect();
        }
        gotoReturnUrl();
      })
      .catch(({ response }) => {
        setState((state) => ({
          ...state,
          socialLoading: false,
          socialError: response.data.message,
        }));
        if (provider === "facebook") {
          window.FB?.logout();
        }
        if (provider === "google") {
          window.google?.accounts?.id.disableAutoSelect();
        }
      });
  };

  const statusChangeCallback = (response) => {
    const { authResponse, status } = response;
    if (authResponse && status === "connected") {
      const { accessToken } = authResponse;
      setTokenData({ token: accessToken, provider: "facebook" });
      handleSocialLogin({
        provider: "facebook",
        token: accessToken,
      });
    } else if (status === "not_authorized") {
      setState((state) => ({
        ...state,
        socialError: "You have not authorized the app",
      }));
    } else if (status === "unknown") {
      setState((state) => ({
        ...state,
        socialError: "facebook login failed",
      }));
    }
  };

  window.handleFBLogin = () => {
    window?.FB?.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  };

  const hasError = (field) => (state.errors[field] ? true : false);

  const togglePasswordVisibility = () => {
    setState((state) => ({
      ...state,
      isVisible: !state.isVisible,
    }));
  };

  return (
    <div className="login-sec d-flex align-items-center bg-gray-50">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="login-box shadow rounded-[32px] mx-auto">
              <div className="login-heading text-center text-4xl">Login</div>

              <div className="text-center text-danger mb-2">
                {state.socialError}
                {typeof state.errors == "string" && state.errors}
                {hasError("user_name") ? state.errors.user_name : ""}
              </div>
              <div className="mx-6">
                <form onSubmit={handleSignUp}>
                  <div className="common-input mb-5">
                    <label>Email Address</label>
                    <input
                      type="text"
                      name="user_name"
                      placeholder="Enter your email address"
                      required
                      value={state.values.user_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="common-input">
                    <label>Password</label>
                    <input
                      id="password"
                      type={state?.isVisible ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      required
                      value={state.values.password}
                      onChange={handleChange}
                    />
                    {!state?.isVisible && (
                      <i
                        onClick={togglePasswordVisibility}
                        className="la la-eye-slash float-right pr-3 eye-icon text-xl text-gray-600"
                      ></i>
                    )}
                    {state?.isVisible && (
                      <i
                        onClick={togglePasswordVisibility}
                        className="la la-eye float-right pr-3 eye-icon text-xl text-gray-600"
                      ></i>
                    )}
                    <p className="text-danger">
                      {hasError("password") ? state.errors.password : ""}
                    </p>
                  </div>
                  <div className="flex my-4 items-center">
                    <input type="checkbox" className="mr-3 w-[2rem] h-[2rem]" />
                    <div className="text-sm">Remember me</div>
                    <div className="flex-grow-1"></div>
                    <Link
                      to="/forgot-password"
                      className="btn btn-link text-sm"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="fare-btn fare-btn-primary fare-btn-lg  w-100 mb-4"
                    disabled={state.isLoading}
                  >
                    Login{" "}
                    {state.isLoading ? (
                      <i className="fas fa-spinner fa-spin ml-3"></i>
                    ) : (
                      ""
                    )}
                  </button>
                </form>

                <div className="other-login text-center mb-4">
                  or continue with
                </div>
                <div className="d-flex justify-center items-center gap-4 flex-wrap">
                  <button
                    className="rounded-pill bg-gray-100 border text-[1.6rem] px-12 py-2 hover:bg-gray-50 d-flex items-center"
                    onClick={() => {
                      window.FB?.login();
                    }}
                  >
                    <img
                      src="/assets/img/facebook.svg"
                      className="float-left"
                    />
                    &ensp; Facebook
                  </button>
                  <button
                    className="rounded-[16px] bg-gray-100 border text-base px-16 py-3 hover:bg-gray-50 d-none"
                    onClick={() => {
                      tokenClient.current?.requestAccessToken();
                    }}
                  >
                    <img src="/assets/img/google.svg" className="float-left" />
                    &ensp; Google
                  </button>
                  <div
                    id="google-button"
                    ref={divGoogle}
                    // id="g_id_onload"
                    // data-client_id={
                    //     process.env
                    //         .REACT_APP_GOOGLE_CLIENT_ID
                    // }
                    // data-callback="handleCredentialResponse"
                    // data-auto_prompt="false"
                  ></div>
                </div>
                <div className="text-center mb-4 mx-auto d-none">
                  <div
                    className="fb-login-button w-100"
                    data-width="100%"
                    data-size="medium"
                    data-button-type="continue_with"
                    data-layout="default"
                    data-auto-logout-link="false"
                    data-use-continue-as="false"
                    data-scope="public_profile,email"
                    data-onlogin="handleFBLogin"
                  ></div>
                </div>

                <div className="text-center text-sm my-4">
                  Don't have an account?&ensp;
                  <Link to="/register" className="btn-link">
                    Sign up
                  </Link>
                </div>
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

export default withRouter(Login);
