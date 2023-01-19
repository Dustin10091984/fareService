import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ProviderSettings, {
  ProviderSettingSection,
  IProviderSettings,
} from "./Steps/ProviderSettings";
import RegisterSucceed from "./Steps/RegisterSucceed";
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

  const pages = useSelector((state) => state?.footerReducer?.pages);
  const TERMS_AND_CONDITIONS = 1;
  const PRIVACY = 2;
  const terms = pages?.data?.find((page) => page?.type == TERMS_AND_CONDITIONS);
  const privacy = pages?.data?.find((page) => page?.type == PRIVACY);
  const { handleProviderSignup, handleVerifyEmail, handleBasicInfoSubmit } =
    props;
  const {
    providerSignup,
    verifyOpt,
    basicInfoRes,
    serviceDetail,
    profileDetails,
    handleServiceDetails,
    handleProfileDetails,
  } = props;
  const [step, setStep] = useState(1); // @remove-this: 2
  const [basic, setBasic] = useState({
    error: {
      email: "",
      phone: "",
    },
  });

  const [otpData, setOtpData] = useState({});
  const [basicInfo, setBasicInfo] = useState({});
  const [zipCode, setZipCode] = useState({
    address: "",
    zip_code: [],
    service_id: [],
  });
  const [providerType, setProviderType] = useState();
  const [services, setServices] = useState([
    // {
    //     serviceId: 1,
    //     subServiceIds: [1, 2, 3],
    // },
    // {
    //     serviceId: 2,
    //     subServiceIds: [4, 5, 6],
    // },
  ]);
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
        email: basic.email,
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
    if (basicInfoRes?.loading == false && basicInfoRes?.message == "success") {
      handleStep(4);
    }
    if (basicInfoRes.loading == false && basicInfoRes.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        confirmButtonColor: "#fea629",
        showCloseButton: true,
        allowOutsideClick: false,
      });
    }
  }, [basicInfoRes?.loading, basicInfoRes?.message]);

  useEffect(() => {
    if (
      serviceDetail?.loading == false &&
      serviceDetail?.message == "success"
    ) {
      handleStep(4);
    }
    if (serviceDetail.loading == false && serviceDetail.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        confirmButtonColor: "#fea629",
        allowOutsideClick: false,
        showCloseButton: true,
      });
    }
  }, [serviceDetail?.loading, serviceDetail?.message]);

  useEffect(() => {
    if (
      profileDetails?.loading == false &&
      profileDetails?.message == "success"
    ) {
      localStorage.removeItem("providerToken");
      setStep(5);
      // setBasic({
      //   success:
      //     "Congratulation! You are successfully registered. We will let you know when we launch our website. Thank you.",
      //   code: "+92",
      //   error: {
      //     email: "",
      //     phone: "",
      //     password: "",
      //   },
      // });
      // setOtpData({});
      // setBasicInfo({});
      // setZipCode({
      //   address: "",
      //   zip_code: [],
      //   service_id: "",
      // });
      // setProviderType();
      // setProfile({
      //   image: "",
      // });
    }
    if (profileDetails.loading == false && profileDetails.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        confirmButtonColor: "#fea629",
        showCloseButton: true,
        allowOutsideClick: false,
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
    if (name === "email") {
      handleEmailChange(value);
      return;
    } else if (name === "password") {
      handlePasswordChange(value);
      return;
    }
  };

  const handleServiceChange = ({ serviceId, subServiceId }) => {
    setServices((prvServices) => {
      let isExsitsService = prvServices?.find(
        (service) => service.serviceId == serviceId
      );
      if (isExsitsService) {
        let isExsitsSubService = isExsitsService?.subServiceIds?.find(
          (subService) => subService == subServiceId
        );
        if (isExsitsSubService) {
          return [
            ...prvServices?.map((filterService) => {
              if (filterService.serviceId == serviceId) {
                return {
                  serviceId: filterService?.serviceId,
                  subServiceIds: [
                    ...filterService?.subServiceIds?.filter(
                      (subId) => subId != subServiceId
                    ),
                  ],
                };
              } else {
                return {
                  serviceId: filterService?.serviceId,
                  subServiceIds: filterService?.subServiceIds,
                };
              }
            }),
          ];
        } else {
          return [
            ...prvServices?.map((filterService) => {
              if (filterService.serviceId == serviceId) {
                return {
                  serviceId: filterService?.serviceId,
                  subServiceIds: [...filterService.subServiceIds, subServiceId],
                };
              } else {
                return {
                  serviceId: filterService?.serviceId,
                  subServiceIds: filterService?.subServiceIds,
                };
              }
            }),
          ];
        }
      } else {
        return [...prvServices, { serviceId, subServiceIds: [subServiceId] }];
      }
    });
  };

  const handleZipCode = ({ address, zip_code, service_id }) => {
    if (address) {
      setZipCode((zipCode) => ({ ...zipCode, address }));
    }
    if (zip_code) {
      setZipCode((zipCode) => ({ ...zipCode, zip_code: zip_code }));
    }
    if (service_id) {
      setZipCode((zipCode) => ({
        ...zipCode,
        service_id,
      }));
    }
  };

  const handleProfile = (data) => {
    setProfile((profile) => ({ ...profile, ...data }));
  };

  const handleOtp = (value) => {
    console.log(value);
    const name = "otp";
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
      <div className="login-sec d-flex align-items-center bg-gray-50">
        <div className="container">
          <div className="login-box h-auto mx-auto">
            <div className="banner-content"></div>
            {step == 1 && (
              <Basic
                handleStep={(step) => handleStep(step)}
                step={step}
                handleBasic={(e) => handleBasic(e)}
                basic={basic}
                handleProviderSignup={handleProviderSignup}
                providerSignup={providerSignup}
              />
            )}
            {step == 2 && (
              <Otp
                handleStep={(step) => handleStep(step)}
                step={step}
                handleOtp={(e) => handleOtp(e)}
                otpData={otpData}
                handleVerifyEmail={handleVerifyEmail}
                verifyOpt={verifyOpt}
              />
            )}
            {step == 3 && localStorage.getItem("providerToken") && (
              <ProviderSettings
                onComplete={(settings) => {
                  handleBasicInfo(settings);
                  handleBasicInfoSubmit(settings);
                  setProviderType(settings.type);

                  handleServiceChange(settings);
                  handleServiceDetails({
                    ...settings,
                    services: settings.services.filter(
                      (s) => s.subServiceIds.length > 0
                    ),
                    from_web: true,
                  });
                  setStep(4);
                }}
              />
              // <BasicInfo
              //   handleStep={(step) => handleStep(step)}
              //   handleBasicInfoSubmit={handleBasicInfoSubmit}
              //   handleBasicInfo={(data) => handleBasicInfo(data)}
              //   basicInfo={basicInfo}
              //   step={step}
              //   {...props}
              // />
            )}
            {/* {step == 4 && (
              <SelectZipCode
                handleStep={(step) => handleStep(step)}
                step={step}
                handleZipCode={(data) => {
                  handleZipCode(data);
                }}
                zipCode={zipCode}
                services={services}
                providerType={providerType}
                handleProviderType={(data) => setProviderType(data)}
                handleServiceChange={(data) => handleServiceChange(data)}
                {...props}
              />
            )} */}
            {step == 4 &&
              (providerType == "Individual" || providerType == "Business") && (
                <ProfileDetail
                  handleStep={(step) => handleStep(step)}
                  step={step}
                  profile={profile}
                  providerType={providerType}
                  handleProfile={(data) => handleProfile(data)}
                  {...props}
                />
              )}
            {step == 5 && (
              <div className=" w-[54rem] m-auto">
                <RegisterSucceed
                  title="Provider Account Setup Successfully"
                  subTitle="You have successfully setup your provider account. Download the Farenow provider app and Login to continue."
                />
              </div>
            )}
            <div className="form-term my-4 text-center">
              {(!!terms?.name || !!privacy?.name) &&
                "By clicking next you agree to"}
              {!!terms?.name && (
                <>
                  {" "}
                  <Link to={`/page/${terms?.name}`}>Terms of Service</Link>
                </>
              )}
              {!!terms?.name && !!privacy?.name && " and "}
              {!!privacy?.name && (
                <>
                  <Link to={`/page/${privacy?.name}`}>Privacy Policy</Link>.{" "}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
