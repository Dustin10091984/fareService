import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { GOOGLE_API, HOST } from "../../constants";
import { Question } from "./components/Question";

const Service = ({
  headerMenu,
  serviceData,
  handleCountryCityOrStateChange,
  getCountriesList,
  countriesData,
  cityCountry,
  ...props
}) => {
  const {
    match: {
      params: { subServiceId },
    },
  } = props;

  const [state, setState] = useState({
    errors: {
      notFound: "",
    },
  });
  const [googleAddress, setGoogleAddress] = useState();

  const [service, setService] = useState({
    selected: {},
    currentStep: 0,
    error: "",
    zipCode: "",
    place_id: "",
    address: "",
    zipCodeErr: "",
    zipCodeData: "",
    zipCodeDataErr: "",
    selectedZipCode: false,
  });

  const handleChangeQuestion = ({ name, value }) => {
    setService({
      ...service,
      selected: {
        ...service?.selected,
        [name]: value,
      },
    });
  };

  const handleZipCodeChange = ({
    target: { name, value },
    selectedZipCode,
  }) => {
    setService((state) => ({
      ...state,
      [name]: value,
      selectedZipCode: selectedZipCode ?? false,
    }));
  };

  const handleSelectZipCode = (code) => {
    setService((prevState) => ({
      ...prevState,
      zipCode: code ? code : "",
      zipCodeErr: code ? "" : "Please select a zip code",
      selectedZipCode: code ? true : false,
    }));
  };

  const getProviders = () => {
    let prms = new URLSearchParams();
    if (service?.zipCode) prms.append("zip_code", service.zipCode);
    if (service?.place_id) prms.append("place_id", service.place_id);
    prms.append("subService", subServiceId);
    const selected = service?.selected;
    if (selected) {
      let question = null;
      for (let key in selected) {
        const seletedValue = selected[key];
        if (!Array.isArray(seletedValue)) {
          question = question
            ? { ...question, [key]: seletedValue.value }
            : { [key]: seletedValue.value };
        } else if (Array.isArray(seletedValue)) {
          let options = seletedValue.map((option) => option.value);
          question = question
            ? { ...question, [key]: options }
            : { [key]: options };
        }
      }
      props.history.push({
        pathname: "/service-providers",
        search: `?${prms.toString()}`,
        state: { ...question, subServiceName: serviceData?.data?.name },
      });
    }
  };

  const handleChangeZipCode = async (e) => {
    const { value } = e.target;
    handleZipCodeChange({
      target: {
        name: "address",
        value: value,
      },
    });
    showError(false);
    setGoogleAddress((prevState) => ({
      ...prevState,
      loading: true,
    }));
    await axios({
      method: "get",
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${GOOGLE_API}`,
    })
      .then(function (response) {
        if (response.data.results.length > 0) {
          setGoogleAddress((prevState) => ({
            ...prevState,
            response: response.data.results,
            errorMessage: null,
            loading: false,
          }));
        } else {
          setGoogleAddress((prevState) => ({
            ...prevState,
            response: null,
            errorMessage: "Not match any address",
            loading: false,
          }));
        }
      })
      .catch((error) => {
        setGoogleAddress((prevState) => ({
          ...prevState,
          response: null,
          errorMessage: "Please Enter Valid Address",
          loading: false,
        }));
      });
  };

  const handleSelectAddress = async (address) => {
    const { place_id, address_components, formatted_address } = address;
    const postalCode = address_components?.find((address) => {
      return address?.types?.includes("postal_code")
        ? address?.long_name
        : null;
    });
    handleZipCodeChange({
      target: {
        name: "address",
        value: formatted_address,
      },
    });

    let prms = new URLSearchParams();
    prms.append("place_id", place_id);
    prms.append("sub_service_id", subServiceId);
    service?.zip_code && prms.append("zip_code", service?.zip_code);
    subServiceId && prms.append("sub_service_id", subServiceId);

    await axios({
      method: "get",
      url: `${HOST}/api/user/services/check-place/${place_id}?${prms.toString()}`,
    })
      .then(function (response) {
        handleZipCodeChange({
          target: {
            name: "place_id",
            value: place_id,
          },
          selectedZipCode: true,
        });
        !!postalCode?.long_name && handleSelectZipCode(postalCode?.long_name);
      })
      .catch((error) => {
        handleZipCodeChange({
          target: {
            name: "address",
            value: "",
          },
        });
        showError(true);
      });
  };

  const showError = (isError) => {
    setState((prevState) => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        notFound: isError ? "Not found provider on this location" : "",
      },
    }));
  };
  return (
    <div className="moving-search-box house-cleaning-sec" id="services-section">
      {serviceData?.loading && (
        <div className="service-loading">
          <i className="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {!serviceData?.loading && serviceData?.error && (
        <div className="service-loading-error">
          <i
            className="fa fa-exclamation-triangle fa-4x fa-fw error-color"
            aria-hidden="true"
          ></i>
          <span className="error-color">
            {" "}
            {serviceData?.message === "Not Found"
              ? "This service is not available at the moment."
              : serviceData?.message}
          </span>
        </div>
      )}
      {serviceData?.data && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              getProviders();
            }}
          >
            <div className="title-move mb-5">{serviceData?.data?.name}</div>
            <div className="d-flex justify-content-between">
              <div className="m-search-left-box w-100">
                <Question
                  {...{
                    handleChangeQuestion,
                    questions: serviceData?.data?.questions,
                    service,
                  }}
                />
                <div
                  className="col-md-12 text-dark mb-2"
                  style={{ fontSize: "1.5rem" }}
                >
                  Service area
                </div>
                <div className="d-flex justify-content-between">
                  <div className="common-input mb-2 rem-1-5">
                    <input
                      // disabled={!cityCountry?.state}
                      type="text"
                      onChange={handleChangeZipCode}
                      name="zipCode"
                      value={service?.address}
                      placeholder="Enter location"
                    />
                    {googleAddress?.loading && (
                      <>
                        <i className="fa fa-spinner fa-pulse"></i> Loading...
                      </>
                    )}
                    {!service?.selectedZipCode &&
                      googleAddress?.response?.length > 0 &&
                      googleAddress?.response?.map((address, index) => (
                        <div
                          className="text-dark mt-2 mb-2"
                          onClick={() => handleSelectAddress(address)}
                          role="button"
                          key={index}
                        >
                          {address.formatted_address}
                        </div>
                      ))}
                    {(() => {
                      if (googleAddress?.errorMessage)
                        return (
                          <div className="text-danger mt-2 mb-2">
                            {googleAddress?.errorMessage}
                          </div>
                        );
                      else if (googleAddress?.loading)
                        return (
                          <div className="text-dark mt-2 mb-2">Loading...</div>
                        );
                      else if (state?.errors?.notFound)
                        return (
                          <div className="text-danger mt-2 mb-2">
                            {state?.errors?.notFound}
                          </div>
                        );
                      else if (state?.zipCodeErr)
                        return (
                          <div className="text-danger mt-2 mb-2">
                            {state?.zipCodeErr}
                          </div>
                        );
                      else return null;
                    })()}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-0">
              <button
                type="submit"
                className="button-common mt-5 w-100"
                disabled={(() => {
                  let isDisabled = false;
                  serviceData?.data?.questions.filter((question) => {
                    if (
                      service.selected[`question_${question.id}`] === "" ||
                      service.selected[`question_${question.id}`] === undefined
                    ) {
                      isDisabled = true;
                      return true;
                    }
                    return false;
                  });
                  if (
                    (service.zipCode === "" && service?.place_id == "") ||
                    service?.selectedZipCode == false
                  ) {
                    isDisabled = true;
                  }

                  return isDisabled;
                })()}
              >
                Get Providers
              </button>
            </div>
          </form>
          <div className="moving-des mt-5">
            {serviceData?.data?.service_requests.length > 0 && (
              <>
                <div className="title">We recommend you!</div>
                <ul className="time-list d-flex align-items-center justify-content-center flex-wrap recommend-times">
                  {serviceData?.data?.service_requests?.map(
                    (service, index) =>
                      index <= 6 && (
                        <li
                          key={index}
                          className="cursor-default d-flex align-items-center justify-content-center"
                        >
                          {service?.hours == 1
                            ? `${service?.hours} hour`
                            : `${service?.hours} hours`}
                        </li>
                      )
                  )}
                </ul>
              </>
            )}
            <p className="text-center">{serviceData?.data?.terms}</p>
          </div>
        </>
      )}
    </div>
  );
};

export { Service };
