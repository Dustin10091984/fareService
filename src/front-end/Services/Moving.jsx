import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Select from "react-select";
import ServiceType from "./../../constants/ServiceType";
import PlacesAutocomplete from "react-places-autocomplete";
import moment from "moment";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Calendar from "react-calendar";
import { MapLoadedApiContext } from "../../helper/context";
import { ServiceArea } from "./components/ServiceArea";
import { classNames } from "../../helper/class-name";

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

    const [zipCodes, setZipCodes] = useState();
    const [zipCodesList, setZipCodesList] = useState();
    const closeRef = useRef(null);

    const [errors, setErrors] = useState();

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

    useEffect(() => {
        if (cityCountry?.city) {
            setZipCodes(
                countriesData?.data
                    ?.find(
                        (countryData) => countryData.id == cityCountry?.country
                    )
                    ?.cities?.find((cities) => cities.id == cityCountry?.city)
                    ?.zip_codes
            );
        }
    }, [cityCountry?.city]);

    useEffect(() => {
        setZipCodesList();
    }, [cityCountry?.city, cityCountry?.country]);

    const handleChangeZipCode = (e) => {
        const { name, value } = e.target;
        let re = /^(0|[1-9][0-9]*)$/;

        setState((state) => ({
            ...state,
            [name]: value,
            selectedZipCode: false,
        }));
    };

    const handleSearchZipCode = ({ target }) => {
        const data = zipCodes?.filter(({ code }) =>
            code.includes(target.value)
        );
        setZipCodesList(data);
        setErrors({
            notFound: data?.length ? "" : "Zip Code not found",
        });
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
            <div className="title-move mb-5">
                please select your moving location.
            </div>

            <div className="mb-1">
                {/* <hr /> */}
                <h4 className="mx-3 my-1">
                    Choose service area
                    <strong className="text-danger">*</strong>
                </h4>
                <div className="d-flex justify-content-between">
                    <ServiceArea
                        {...{
                            countriesData: countriesData?.data,
                            cityCountry,
                            handleCountryCityChange,
                        }}
                    />
                </div>
                <div
                    className="col-md-12 px-0 text-dark"
                    style={{ fontSize: "2rem" }}
                >
                    Zip Code
                    <strong className="text-danger">*</strong>
                </div>
                <div className={classNames(["common-input", "pr-1"])}>
                    <input
                        // disabled={props?.vehicle_type_id == "" ? true : false}
                        type="text"
                        name="zip_code"
                        placeholder="Zip Code e.g 00000"
                        value={state.zip_code}
                        onChange={(e) => {
                            handleChangeZipCode(e);
                            handleSearchZipCode(e);
                        }}
                        // onClick={(e) => {
                        //     handleSearchZipCode(e);
                        // }}
                        autoComplete="off"
                    />
                </div>
                {!!errors?.notFound && (
                    <strong className="text-danger">{errors?.notFound}</strong>
                )}
            </div>

            {!!zipCodesList?.length ? (
                state?.selectedZipCode == false && (
                    <>
                        <center
                            className="col-md-12 text-dark mb-1 mt-1"
                            style={{
                                fontSize: "1.5rem",
                            }}
                        >
                            Please Select Zip Code
                        </center>
                        {zipCodesList?.map((data, index) => (
                            <div
                                key={index}
                                className="col-md-12 text-dark mb-1 mt-1"
                                style={{
                                    fontSize: "1.5rem",
                                    border: "1px solid #F1F2F7",
                                    backgroundColor: "#F1F2F7",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                                data-code={data?.code}
                                onClick={() => handleSelectZipCode(data?.code)}
                            >
                                {data?.code}
                            </div>
                        ))}
                    </>
                )
            ) : (
                <></>
            )}

            <MapLoadedApiContext.Consumer>
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
            </MapLoadedApiContext.Consumer>

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
                    </div>
                </div>
            </div>
        </>
    );
};
