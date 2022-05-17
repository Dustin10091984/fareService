import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVehicleTypes } from "./../../store/Slices/moving/movingSlice";
import ServiceType from "./../../constants/ServiceType";
import PlacesAutocomplete from "react-places-autocomplete";
import moment from "moment";
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from "react-places-autocomplete";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Loading from "../common/Loading";
import { MapLoadedApi } from "../../App";

export const Moving = (props) => {
    const {
        subServiceId,
        movingState,
        handleMovingState,
        countriesData,
        cityCountry,
        handleCountryCityChange,
    } = props;
    const [state, setState] = useState({
        vehicle_type_id: "",
        from_address: "",
        to_address: "",
        start_lat: "",
        start_lng: "",
        end_lat: "",
        end_lng: "",
        date: new Date(),
        zip_code: "",
        service_type: ServiceType.MOVING,
    });

    const [isLoading, setIsLoading] = useState(false);

    const closeRef = useRef(null);

    const dispatch = useDispatch();

    // const loading = useSelector((state) => state.movingReducer?.list?.loading);
    // const data = useSelector((state) => state.movingReducer?.list?.data);
    // const error = useSelector((state) => state.movingReducer?.list?.error);
    // const message = useSelector((state) => state.movingReducer?.list?.message);

    useEffect(() => {
        // dispatch(getVehicleTypes());
        if (movingState) {
            setState({
                ...movingState,
            });
        }
    }, []);

    useEffect(() => {
        handleMovingState(state);
    }, [state]);

    const handleSelectTypeClick = (vehicle_type_id) => {
        vehicle_type_id === state.vehicle_type_id
            ? (vehicle_type_id = "")
            : (vehicle_type_id = vehicle_type_id);
        setState((state) => ({
            ...state,
            vehicle_type_id,
        }));
    };

    const handleChangeZipCode = (e) => {
        const { name, value } = e.target;
        let re = /^(0|[1-9][0-9]*)$/;

        setState((state) => ({
            ...state,
            [name]: value,
            selectedZipCode: false,
        }));
        if (value.length < 1 || value.length > 12 || !re.test(value)) {
            setState((state) => ({
                ...state,
                zipCodeErr: "Zip Code characher should be in between 1 and 12",
            }));
        } else {
            setIsLoading(true);
            setState((state) => ({ ...state, zipCodeErr: "" }));
            axios({
                method: "get",
                url:
                    process.env.REACT_APP_API_BASE_URL +
                    `/api/user/services/zip-code?zipCode=${value}&vehicle_type_id=${
                        props?.vehicle_type_id
                    }${cityCountry?.city ? `&city=${cityCountry?.city}` : ""}`,
            })
                .then(function (response) {
                    setIsLoading(false);
                    setState((state) => ({
                        ...state,
                        zipCodeData: response?.data?.data?.data,
                        zipCodeDataErr: "",
                    }));
                })
                .catch((error) => {
                    setIsLoading(false);
                    setState((state) => ({
                        ...state,
                        zipCodeData: "",
                        zipCodeDataErr: error?.response?.data?.message,
                    }));
                });
        }
    };

    const handleFromAdessSelect = (from_address) => {
        setState((state) => ({
            ...state,
            from_address,
        }));

        geocodeByAddress(from_address)
            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                setState((state) => ({
                    ...state,
                    start_lat: `${lat}`,
                    start_lng: `${lng}`,
                }));
            });
    };

    const handleToAdessSelect = (to_address) => {
        setState((state) => ({
            ...state,
            to_address,
        }));

        geocodeByAddress(to_address)
            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                setState((state) => ({
                    ...state,
                    end_lat: `${lat}`,
                    end_lng: `${lng}`,
                }));
            });
    };

    const handleCalendarClick = (selectedDate) => {
        // let newDate = new Date();
        // if (moment(selectedDate).isSameOrAfter(newDate.setHours(0, 0, 0, 0))) {
        closeRef.current.click();
        setState((state) => ({
            ...state,
            date: selectedDate,
        }));
        // }
    };

    const handleSelectZipCode = (code) => {
        setState((state) => ({
            ...state,
            zip_code: code,
            zipCodeErr: "",
            selectedZipCode: true,
        }));
    };

    return (
        <>
            {/* <div className="row"> */}
            {/* <Loading loading={loading} /> */}
            {/* <div className="col-md-12"> */}
            {/* <div className="title-move">
                        Please select your vehicle type.
                    </div> */}
            {/* {(() => {
                        if (loading) {
                            return (
                                <div
                                    className="col-12  alert alert-info text-center"
                                    role="alert"
                                    style={{ fontSize: 15 }}
                                >
                                    <i className="fa fa-spinner fa-spin"></i>{" "}
                                    Processing...
                                </div>
                            );
                        }

                        if (error) {
                            return (
                                <div
                                    className="col-12  alert alert-danger text-center"
                                    role="alert"
                                    style={{ fontSize: 15 }}
                                >
                                    {message}
                                </div>
                            );
                        }
                    })()} */}
            {/* <div className="col-lg-8 mb-5 mx-auto mt-5">
                        <div className="row justify-content-center">
                            {(() => {
                                return data?.map((item, index) => (
                                    <div className="col-6 col-md-4" key={index}>
                                        <div
                                            className="d-flex bd-highlight m-4 justify-content-center align-items-center"
                                            style={{
                                                width: "100%",
                                                height: "17rem",
                                                // background: '#FFFFFF',
                                                boxShadow: `.2rem .2rem .6rem .8rem ${
                                                    item.id ===
                                                    state.vehicle_type_id
                                                        ? "#fea629"
                                                        : "#cccccc"
                                                }`,
                                                borderRadius: ".5rem",
                                            }}
                                            onClick={() =>
                                                handleSelectTypeClick(item.id)
                                            }
                                        >
                                            <div
                                                className="d-flex flex-column justify-content-end align-items-center flex-column m-3 moving-vehiclei-box"
                                                style={{ fontSize: 15 }}
                                            >
                                                {item.image ? (
                                                    <img
                                                        src={
                                                            process.env
                                                                .REACT_APP_API_BASE_URL +
                                                            item.image
                                                        }
                                                        className="img-fluid m-1"
                                                        alt="..."
                                                    />
                                                ) : (
                                                    <i
                                                        className="fa fa-car fa-5x"
                                                        aria-hidden="true"
                                                    ></i>
                                                )}
                                                <div className="vehicle-title mt-3">
                                                    {item.title}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div> */}

            {/* <div className="col-12 mt-5">
                <div className="row justify-content-center"> */}
            {/* <div
                className="col-lg-8 p-5"
                style={{
                    boxShadow: `.01rem .01rem .5rem .5rem ${"#cccccc"}`,
                    borderRadius: ".5rem",
                }}
            > */}

            <div className="title-move mb-5">
                please select your moving location.
            </div>

            <div className="mb-3">
                {/* <hr /> */}
                <h4 className="mx-3 my-1">
                    Choose service area
                    <strong className="text-danger">*</strong>
                </h4>
                <div className="d-flex justify-content-between">
                    <div className="common-input my-2 pr-2">
                        <select
                            name="country"
                            value={cityCountry?.country}
                            onChange={(e) => {
                                handleCountryCityChange(e);
                            }}
                        >
                            <option defaultValue="">Select Country</option>
                            {countriesData?.data?.map((countryData, index) => (
                                <Fragment key={index}>
                                    <option value={countryData.id}>
                                        {countryData.name}
                                    </option>
                                </Fragment>
                            ))}
                        </select>
                    </div>
                    <div className="common-input my-2 pl-2">
                        <select
                            name="city"
                            disabled={!cityCountry?.country}
                            value={cityCountry?.city}
                            onChange={(e) => {
                                handleCountryCityChange(e);
                            }}
                        >
                            <option defaultValue="">Select City</option>
                            {(() => {
                                const countryData = countriesData?.data?.find(
                                    (countryData) =>
                                        countryData.id == cityCountry?.country
                                );
                                return countryData?.cities?.map(
                                    (cityData, index) => (
                                        <Fragment key={index}>
                                            <option value={cityData.id}>
                                                {cityData.name}
                                            </option>
                                        </Fragment>
                                    )
                                );
                            })()}
                        </select>
                    </div>
                </div>
                <div
                    className="col-md-12 px-0 text-dark"
                    style={{ fontSize: "2rem" }}
                >
                    Zip Code
                    <strong className="text-danger">*</strong>
                </div>
                <div className="common-input pr-1">
                    <input
                        // disabled={props?.vehicle_type_id == "" ? true : false}
                        type="text"
                        name="zip_code"
                        placeholder="Zip Code e.g 00000"
                        value={state.zip_code}
                        onChange={handleChangeZipCode}
                        autoComplete="off"
                    />
                </div>
            </div>
            <div className="col-md-12 text-danger">
                {state?.zipCodeDataErr || state?.zipCodeErr}
            </div>

            {state.zipCodeData != "" && state.selectedZipCode == false && (
                <>
                    {/* <center
                        className="col-md-12 text-dark mb-1 mt-1"
                        style={{ fontSize: "1.5rem" }}
                    >
                        Please Select ZipCode
                    </center> */}
                    {isLoading && (
                        <div className="col-md-12 text-dark mb-1 mt-1 zip-code-box">
                            <i className="fa fa-spinner fa-pulse"></i>{" "}
                            Loading...
                        </div>
                    )}
                    {state.zip_code &&
                        state?.zipCodeData?.map((data, index) => (
                            <div
                                key={index}
                                className="col-md-12 text-dark mb-1 mt-1 zip-code-box"
                                data-code={data.code}
                                onClick={() => handleSelectZipCode(data.code)}
                            >
                                {data.code}
                            </div>
                        ))}
                </>
            )}

            <MapLoadedApi.Consumer>
                {(isLoading) =>
                    isLoading && (
                        <>
                            <div className="mb-3">
                                <div
                                    className="col-md-12 px-0 text-dark"
                                    style={{ fontSize: "2rem" }}
                                >
                                    Moving From
                                    <strong className="text-danger">*</strong>
                                </div>
                                <div className="common-input p-1">
                                    <PlacesAutocomplete
                                        value={state.from_address}
                                        onChange={(from_address) =>
                                            setState((state) => ({
                                                ...state,
                                                from_address,
                                            }))
                                        }
                                        onSelect={handleFromAdessSelect}
                                        // googleCallbackName="initOne"
                                    >
                                        {({
                                            getInputProps,
                                            suggestions,
                                            getSuggestionItemProps,
                                            loading,
                                        }) => (
                                            <div>
                                                <input
                                                    {...getInputProps({
                                                        placeholder: "From ...",
                                                        className:
                                                            "location-search-input m-1",
                                                    })}
                                                />
                                                <div className="autocomplete-dropdown-container">
                                                    {loading && (
                                                        <div>Loading...</div>
                                                    )}
                                                    {suggestions.map(
                                                        (suggestion) => {
                                                            const className =
                                                                suggestion.active
                                                                    ? "suggestion-item--active"
                                                                    : "suggestion-item";
                                                            // inline style for demonstration purpose
                                                            const style =
                                                                suggestion.active
                                                                    ? {
                                                                          backgroundColor:
                                                                              "#fafafa",
                                                                          cursor: "pointer",
                                                                          fontSize: 15,
                                                                          margin: "5px",
                                                                      }
                                                                    : {
                                                                          backgroundColor:
                                                                              "#ffffff",
                                                                          cursor: "pointer",
                                                                          fontSize: 15,
                                                                          margin: "5px",
                                                                      };
                                                            return (
                                                                <div
                                                                    key={
                                                                        suggestion.index
                                                                    }
                                                                    {...getSuggestionItemProps(
                                                                        suggestion,
                                                                        {
                                                                            className,
                                                                            style,
                                                                        }
                                                                    )}
                                                                >
                                                                    <span>
                                                                        {
                                                                            suggestion.description
                                                                        }
                                                                    </span>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </PlacesAutocomplete>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div
                                    className="col-md-12 px-0 text-dark"
                                    style={{ fontSize: "2rem" }}
                                >
                                    Moving To
                                    <strong className="text-danger">*</strong>
                                </div>
                                <div className="common-input pr-1">
                                    <PlacesAutocomplete
                                        value={state.to_address}
                                        onChange={(to_address) =>
                                            setState((state) => ({
                                                ...state,
                                                to_address,
                                            }))
                                        }
                                        onSelect={handleToAdessSelect}
                                        // googleCallbackName="initTwo"
                                    >
                                        {({
                                            getInputProps,
                                            suggestions,
                                            getSuggestionItemProps,
                                            loading,
                                        }) => (
                                            <div>
                                                <input
                                                    {...getInputProps({
                                                        placeholder: "To ...",
                                                        className:
                                                            "location-search-input m-1",
                                                    })}
                                                />
                                                <div className="autocomplete-dropdown-container">
                                                    {loading && (
                                                        <div>Loading...</div>
                                                    )}
                                                    {suggestions.map(
                                                        (suggestion) => {
                                                            const className =
                                                                suggestion.active
                                                                    ? "suggestion-item--active"
                                                                    : "suggestion-item";
                                                            // inline style for demonstration purpose
                                                            const style =
                                                                suggestion.active
                                                                    ? {
                                                                          backgroundColor:
                                                                              "#fafafa",
                                                                          cursor: "pointer",
                                                                          fontSize: 15,
                                                                          margin: "5px",
                                                                      }
                                                                    : {
                                                                          backgroundColor:
                                                                              "#ffffff",
                                                                          cursor: "pointer",
                                                                          fontSize: 15,
                                                                          margin: "5px",
                                                                      };
                                                            return (
                                                                <div
                                                                    key={
                                                                        suggestion.index
                                                                    }
                                                                    {...getSuggestionItemProps(
                                                                        suggestion,
                                                                        {
                                                                            className,
                                                                            style,
                                                                        }
                                                                    )}
                                                                >
                                                                    <span>
                                                                        {
                                                                            suggestion.description
                                                                        }
                                                                    </span>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </PlacesAutocomplete>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div
                                    className="col-md-12 px-0 text-dark"
                                    style={{ fontSize: "2rem" }}
                                >
                                    Moving Date
                                    <strong className="text-danger">*</strong>
                                </div>
                                <div
                                    className="common-input pr-1"
                                    data-backdrop="static"
                                    data-keyboard="false"
                                    data-toggle="modal"
                                    data-target="#date"
                                >
                                    <input
                                        type="text"
                                        placeholder="date e.g 2222-12-30"
                                        value={
                                            state.date
                                                ? moment(state.date).format(
                                                      "YYYY-MM-DD"
                                                  )
                                                : ""
                                        }
                                        onChange={(e) =>
                                            setState((state) => ({
                                                ...state,
                                                date: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        </>
                    )
                }
            </MapLoadedApi.Consumer>

            <div className="text-center">
                {state.from_address !== "" &&
                state.to_address !== "" &&
                state.date !== "" &&
                state.zip_code !== "" &&
                props?.vehicle_type_id !== "" &&
                state?.selectedZipCode == true ? (
                    <Link
                        type="button"
                        to={{
                            pathname: "/service-providers",
                            state: {
                                ...state,
                                vehicle_type_id: props?.vehicle_type_id,
                                sub_service_id: props?.subServiceId,
                            },
                        }}
                        className="button-common mt-4 w-100"
                    >
                        Get Providers
                    </Link>
                ) : (
                    <button
                        disabled
                        type="button"
                        className="button-common mt-4 w-100"
                    >
                        Get Providers
                    </button>
                )}
            </div>
            {/* </div> */}
            {/* </div>
            </div> */}

            {/* <div className="moving-des mt-5">
                <p className="text-center">
                    By signing and clicking Get a Price, you affirm you have
                    read and agree to the Handy Terms, and you agree and
                    authorize Handy and its affiliates, and their networks of
                    service professionals, to deliver marketing calls or texts
                    using automated technology to the number you provided above
                    regarding your project and other home services offers.
                    Consent is not a condition of purchase.
                </p>
                <br />
                <br />
                <br />
                <p className="text-center">
                    If you're moving to a new home or relocating your office,
                    you're probably worried about how you're going to get it all
                    done. Luckily, Handy is here to help. When you book moving
                    help through the Handy platform, you'll save time, money and
                    the inevitable stress that comes with any big move. Handy
                    will connect you with local house movers who have the skill,
                    experience, and equipment to make your house move go as
                    smoothly as possible. You're responsible for providing your
                    own moving van or truck, but once you've figured that out,
                    Handy will help you figure out the rest. We will help you
                    find professional furniture movers who can help with
                    everything, from the initial packing and wrapping to heavy
                    lifting and unpacking once you reach your final destination.
                </p>
                <br />
                <br />
                <br />
                <strong className="text-center">
                    Note: This service is for moving help, including packing
                    boxes, unpacking boxes, heavy lifting, and loading items
                    into a vehicle. It is not full-service moving and there is
                    no transportation provided.
                </strong>
            </div> */}
            {/* </div> */}

            <div
                className="modal fade bd-example-modal-md"
                id="date"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered modal-md"
                    role="document"
                >
                    <div className="modal-content">
                        <div
                            className="modal-header"
                            style={{
                                fontSize: "1.5rem",
                            }}
                        >
                            <h4
                                className="modal-title mt-2"
                                id="exampleModalLongTitle"
                            >
                                Select Date
                            </h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                ref={closeRef}
                            >
                                <span
                                    aria-hidden="true"
                                    style={{
                                        fontSize: "3rem",
                                    }}
                                >
                                    &times;
                                </span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row m-2">
                                <div className="col-12">
                                    <center className="col-12">
                                        <div
                                            className="row justify-content-md-center"
                                            style={{
                                                fontSize: "1.5rem",
                                            }}
                                        >
                                            <Calendar
                                                onChange={handleCalendarClick}
                                                minDate={new Date()}
                                                value={state?.date}
                                            />
                                        </div>
                                    </center>
                                </div>
                            </div>
                        </div>
                        {/* <div className="modal-footer">
                            <button
                                className="button-common-2"
                                data-dismiss="modal"
                            >
                                OK
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
            {/* </div> */}

            {/* <div className="row">
            <div className="col-12 mb-5">
                <div className="moving-image-box text-center">
                    <img src="/assets/img/moving-image-.png" className="img-fluid" alt="" />
                </div>
            </div>
            <div className="col-md-12">
            <div className="title-move mb-5">
                    Please select your vehicle type.
                </div>
            </div>
          <div className="col-md-8 mx-auto">
          <div className="row">
                        {(() => {
                            return data?.map((item, index) => (
                                <div
                                    className="col-6 col-md-4"
                                    key={index}
                                >
                                    <div
                                        className="d-flex bd-highlight mb-5 justify-content-center align-items-center"
                                        style={{
                                            width: "100%",
                                            height: "17rem",
                                            // background: '#FFFFFF',
                                            boxShadow: `.2rem .2rem .6rem .8rem ${
                                                item.id ===
                                                state.vehicle_type_id
                                                    ? "#fea629"
                                                    : "#cccccc"
                                            }`,
                                            borderRadius: ".5rem",
                                        }}
                                        onClick={() =>
                                            handleSelectTypeClick(item.id)
                                        }
                                    >
                                        <div
                                            className="d-flex flex-column justify-content-end align-items-center flex-column m-3 moving-vehiclei-box"
                                            style={{ fontSize: 15 }}
                                        >
                                            {item.image ? (
                                                <img
                                                    src={
                                                        process.env
                                                            .REACT_APP_API_BASE_URL +
                                                        item.image
                                                    }
                                                    className="img-fluid m-1"
                                                    alt="..."
                                                />
                                            ) : (
                                                <i
                                                    className="fa fa-car fa-5x"
                                                    aria-hidden="true"
                                                ></i>
                                            )}
                                            <div className="vehicle-title mt-3">{item.title}</div>
                                        </div>
                                    </div>
                                </div>
                            ));
                        })()}
                    </div>
          </div>
        </div> */}

            {/* <div className="row">
        <div className="col-12 mt-5">
                    <div className="row justify-content-center">
                        <div
                            className="col-lg-8 p-5"
                            style={{
                                boxShadow: `.01rem .01rem .5rem .5rem ${"#cccccc"}`,
                                borderRadius: ".5rem",
                            }}
                        >
                            <div className="title-move mb-5">
                                please select your moving location.
                            </div>
                            <div className="mb-3">
                            <div
                                className="col-md-12 px-0 text-dark"
                                style={{ fontSize: "2rem" }}
                            >
                                Moving From
                                <strong className="text-danger">*</strong>
                            </div>
                            <div className="common-input p-1">
                                <PlacesAutocomplete
                                    value={state.from_address}
                                    onChange={(from_address) =>
                                        setState((state) => ({
                                            ...state,
                                            from_address,
                                        }))
                                    }
                                    onSelect={handleFromAdessSelect}
                                     googleCallbackName="myCallbackFunc"
                                >
                                    {({
                                        getInputProps,
                                        suggestions,
                                        getSuggestionItemProps,
                                        loading,
                                    }) => (
                                        <div>
                                            <input
                                                {...getInputProps({
                                                    placeholder: "From ...",
                                                    className:
                                                        "location-search-input m-1",
                                                })}
                                            />
                                            <div className="autocomplete-dropdown-container">
                                                {loading && (
                                                    <div>Loading...</div>
                                                )}
                                                {suggestions.map(
                                                    (suggestion) => {
                                                        const className =
                                                            suggestion.active
                                                                ? "suggestion-item--active"
                                                                : "suggestion-item";
                                                        // inline style for demonstration purpose
                                                        const style =
                                                            suggestion.active
                                                                ? {
                                                                      backgroundColor:
                                                                          "#fafafa",
                                                                      cursor: "pointer",
                                                                      fontSize: 15,
                                                                      margin: "5px",
                                                                  }
                                                                : {
                                                                      backgroundColor:
                                                                          "#ffffff",
                                                                      cursor: "pointer",
                                                                      fontSize: 15,
                                                                      margin: "5px",
                                                                  };
                                                        return (
                                                            <div
                                                                key={
                                                                    suggestion.index
                                                                }
                                                                {...getSuggestionItemProps(
                                                                    suggestion,
                                                                    {
                                                                        className,
                                                                        style,
                                                                    }
                                                                )}
                                                            >
                                                                <span>
                                                                    {
                                                                        suggestion.description
                                                                    }
                                                                </span>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                            </div>
                            </div>
                            <div className="mb-3">
                            <div
                                className="col-md-12 px-0 text-dark"
                                style={{ fontSize: "2rem" }}
                            >
                                Moving To
                                <strong className="text-danger">*</strong>
                            </div>
                            <div className="common-input pr-1">
                                <PlacesAutocomplete
                                    value={state.to_address}
                                    onChange={(to_address) =>
                                        setState((state) => ({
                                            ...state,
                                            to_address,
                                        }))
                                    }
                                    onSelect={handleToAdessSelect}
                                     googleCallbackName="myCallbackFunc"
                                >
                                    {({
                                        getInputProps,
                                        suggestions,
                                        getSuggestionItemProps,
                                        loading,
                                    }) => (
                                        <div>
                                            <input
                                                {...getInputProps({
                                                    placeholder: "To ...",
                                                    className:
                                                        "location-search-input m-1",
                                                })}
                                            />
                                            <div className="autocomplete-dropdown-container">
                                                {loading && (
                                                    <div>Loading...</div>
                                                )}
                                                {suggestions.map(
                                                    (suggestion) => {
                                                        const className =
                                                            suggestion.active
                                                                ? "suggestion-item--active"
                                                                : "suggestion-item";
                                                        // inline style for demonstration purpose
                                                        const style =
                                                            suggestion.active
                                                                ? {
                                                                      backgroundColor:
                                                                          "#fafafa",
                                                                      cursor: "pointer",
                                                                      fontSize: 15,
                                                                      margin: "5px",
                                                                  }
                                                                : {
                                                                      backgroundColor:
                                                                          "#ffffff",
                                                                      cursor: "pointer",
                                                                      fontSize: 15,
                                                                      margin: "5px",
                                                                  };
                                                        return (
                                                            <div
                                                                key={
                                                                    suggestion.index
                                                                }
                                                                {...getSuggestionItemProps(
                                                                    suggestion,
                                                                    {
                                                                        className,
                                                                        style,
                                                                    }
                                                                )}
                                                            >
                                                                <span>
                                                                    {
                                                                        suggestion.description
                                                                    }
                                                                </span>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                            </div>
                            </div>
                           <div className="mb-3">
                           <div
                                className="col-md-12 px-0 text-dark"
                                style={{ fontSize: "2rem" }}
                            >
                                Moving Date
                                <strong className="text-danger">*</strong>
                            </div>
                            <div
                                className="common-input pr-1"
                                data-backdrop="static"
                                data-keyboard="false"
                                data-toggle="modal"
                                data-target="#date"
                            >
                                <input
                                    type="text"
                                    placeholder="date e.g 2222-12-30"
                                    value={
                                        state.date
                                            ? moment(state.date).format(
                                                  "YYYY-MM-DD"
                                              )
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setState((state) => ({
                                            ...state,
                                            date: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                           </div>
                           <div className="mb-3">
                           <div
                                className="col-md-12 px-0 text-dark"
                                style={{ fontSize: "2rem" }}
                            >
                                Zip Code
                                <strong className="text-danger">*</strong>
                            </div>
                            <div className="common-input pr-1">
                                <input
                                    disabled={
                                        props?.vehicle_type_id == ""
                                            ? true
                                            : false
                                    }
                                    type="text"
                                    name="zip_code"
                                    placeholder="Zip Code e.g 00000"
                                    value={state.zip_code}
                                    onChange={handleChangeZipCode}
                                />
                            </div>
                           </div>
                            <div className="col-md-12 text-danger">
                                {state?.zipCodeDataErr}
                            </div>
                            {state?.zipCodeErr}

                            {state.zipCodeData !== "" &&
                                state.selectedZipCode == false && (
                                    <>
                                        <center
                                            className="col-md-12 text-dark mb-1 mt-1"
                                            style={{ fontSize: "1.5rem" }}
                                        >
                                            Please Select ZipCode
                                        </center>
                                        {state?.zipCodeData?.map(
                                            (data, index) => (
                                                <div
                                                    key={index}
                                                    className="col-md-12 text-dark mb-1 mt-1"
                                                    style={{
                                                        fontSize: "1.5rem",
                                                        border: "1px solid #F1F2F7",
                                                        backgroundColor:
                                                            "#F1F2F7",
                                                        borderRadius: "5px",
                                                    }}
                                                    data-code={data.code}
                                                    onClick={() =>
                                                        handleSelectZipCode(
                                                            data.code
                                                        )
                                                    }
                                                >
                                                    {data.code}
                                                </div>
                                            )
                                        )}
                                    </>
                                )}
                            <div className="text-center">
                                {state.from_address !== "" &&
                                state.to_address !== "" &&
                                state.date !== "" &&
                                state.zip_code !== "" &&
                                state.vehicle_type_id !== "" &&
                                state?.selectedZipCode == true ? (
                                    <Link
                                        type="button"
                                        to={{
                                            pathname: "/service-providers",
                                            state: {
                                                ...state,
                                                sub_service_id: subServiceId,
                                            },
                                        }}
                                        className="button-common mt-4 w-100"
                                    >
                                        Get Providers
                                    </Link>
                                ) : (
                                    <button
                                        disabled
                                        type="button"
                                        className="button-common mt-4 w-100"
                                    >
                                        Get Providers
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
        </div> */}
        </>
    );
};
