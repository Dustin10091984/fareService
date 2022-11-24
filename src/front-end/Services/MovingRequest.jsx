import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { GOOGLE_API } from "../../constants";
import ServiceType from "../../constants/ServiceType";
import { Moving } from "./components/Moving";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { HOST } from "../../constants";

const MovingRequest = (props) => {
    const {
        vehicleTypes,
        serviceData,
        getVehicleTypes,
        handleSelectTypeClick,
        subServiceId,
        // handleStepClick,
        // countriesData,
        // cityCountry,
        // handleCountryCityOrStateChange,
        // getCountriesList,
    } = props;
    const ref = useRef(null);
    const closeRef = useRef(null);

    const [state, setState] = useState({
        selected: {},
        vehicle_type_id: "",
        from_address: "",
        to_address: "",
        start_lat: "",
        start_lng: "",
        end_lat: "",
        end_lng: "",
        date: new Date(),
        zip_code: "",
        place_id: "",
        address: "",
        service_type: ServiceType.MOVING,
    });

    const [googleAddress, setGoogleAddress] = useState();

    useEffect(() => {
        if (!vehicleTypes) getVehicleTypes();
    }, []);

    useEffect(() => {
        if (vehicleTypes?.data) {
            ref?.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [vehicleTypes?.data]);

    const handleChangeQuestion = ({ name, value }) => {
        setState({
            ...state,
            selected: {
                ...state?.selected,
                [name]: value,
            },
        });
    };

    const handleChangeZipCode = async (e) => {
        const { name, value } = e.target;
        // handleSearchZipCode(e);
        setState((state) => ({
            ...state,
            address: value,
            selectedZipCode: false,
        }));
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

    const handleSelectAddress = async (address) => {
        const { place_id, address_components, formatted_address } = address;
        const postalCode = address_components?.find((address) => {
            return address?.types?.includes("postal_code")
                ? address?.long_name
                : null;
        });

        setState((prev) => ({
            ...prev,
            address: formatted_address,
        }));

        let prms = new URLSearchParams();
        prms.append("place_id", place_id);
        if (state?.zip_code) {
            prms.append("zip_code", state?.zip_code);
        }
        prms.append("vehicle_type_id", state?.vehicle_type_id?.value);

        await axios({
            method: "get",
            url: `${HOST}/api/user/services/check-place/${place_id}?${prms.toString()}`,
        })
            .then(function (response) {
                setState((prev) => ({
                    ...prev,
                    place_id,
                    address: formatted_address,
                    selectedZipCode: true,
                }));
                !!postalCode?.long_name &&
                    handleSelectZipCode(postalCode?.long_name);
                showError(false);
            })
            .catch((error) => {
                setState((prev) => ({
                    ...prev,
                    place_id,
                    address: "",
                    selectedZipCode: false,
                }));
                // handleZipCodeChange({
                //     target: {
                //         name: "address",
                //         value: "",
                //     },
                // });
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

    const handleSelectZipCode = (code) => {
        setState((state) => ({
            ...state,
            zip_code: code ? code : "",
            zipCodeErr: code ? "" : "Please select a zip code",
            selectedZipCode: code ? true : false,
        }));
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

    return (
        <>
            <div className="moving-new-secion" id="moving-section">
                <div className="new-imag-moving text-center">
                    {vehicleTypes?.error && (
                        <div className="text-danger">
                            <i className="fa fa-exclamation-triangle fa-4x" />
                            <span className="display-4">
                                {" "}
                                {vehicleTypes?.message ||
                                    "Something went wrong"}
                            </span>
                        </div>
                    )}
                    {vehicleTypes?.loading && (
                        <div className="text-dark">
                            <i className="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
                            <span className="display-4"> Loading...</span>
                        </div>
                    )}
                    <img
                        src="/assets/img/new-moving.svg"
                        className="img-fluid"
                        alt=""
                    />
                    <div
                        ref={ref}
                        style={{
                            position: "absolute",
                            top: "40%",
                        }}
                    ></div>
                </div>
            </div>
            {/* {moving?.step == 0 && (
                <>
                    {vehicleTypes?.loading == false &&
                        vehicleTypes?.error == false && (
                            <div className="col-md-12">
                                <div className="title-move mb-5">
                                    Please select your vehicle type.
                                </div>
                            </div>
                        )}
                    <div className="col-md-6 mx-auto mb-5">
                        <div className="row">
                            {vehicleTypes?.data?.map((item, index) => {
                                return (
                                    <div className="col-6 col-md-4" key={index}>
                                        <div
                                            className="d-flex bd-highlight mb-5 justify-content-center align-items-center"
                                            style={{
                                                width: "100%",
                                                height: "18rem",
                                                boxShadow: `.2rem .2rem .6rem .8rem ${
                                                    item.id ===
                                                    moving?.vehicle_type_id
                                                        ? "#fea629"
                                                        : "#cccccc"
                                                }`,
                                                borderRadius: ".5rem",
                                            }}
                                            onClick={() => {
                                                handleSelectTypeClick(item.id);
                                                getCountriesList({
                                                    vehicle_type_id: item.id,
                                                });
                                            }}
                                        >
                                            <div
                                                className="d-flex flex-column justify-content-end align-items-center flex-column m-3 moving-vehiclei-box"
                                                style={{ fontSize: 15 }}
                                            >
                                                <img
                                                    src={
                                                        item.image
                                                            ? process.env
                                                                  .REACT_APP_API_BASE_URL +
                                                              item.image
                                                            : ""
                                                    }
                                                    className="img-fluid m-1"
                                                    alt="..."
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src =
                                                            "/assets/img/vehicle-placeholder.svg";
                                                    }}
                                                />
                                                <div className="vehicle-title mt-3">
                                                    {item.title}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}moving?.step == 1 &&  */}
            <div className="container col-md-12 moving-push-top mb-6">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row justify-content-center">
                            <div
                                className="col-lg-6 p-5"
                                style={{
                                    background: "#fff",
                                    boxShadow:
                                        "rgb(204, 204, 204) 0.01rem 0.01rem 0.5rem 0.5rem",
                                    borderRadius: "0.5rem",
                                    minHeight: "50vh",
                                }}
                            >
                                <Moving
                                    {...props}
                                    {...{
                                        subServiceId,
                                        googleAddress,
                                        state,
                                        setState,
                                        vehicleTypes: vehicleTypes?.data,
                                        closeRef,
                                        handleChangeQuestion,
                                        questions: serviceData?.data?.questions,
                                        questionsLoading: serviceData?.loading,
                                        handleChangeZipCode,
                                        handleFromAdessSelect,
                                        handleToAdessSelect,
                                        handleSelectAddress,
                                        handleCalendarClick,
                                        handleSelectTypeClick,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="col-md-7 mx-auto mb-5">
                <div className="row">
                    <div className="col-md-6">
                        {moving?.step == 1 && (
                            <span
                                onClick={() => handleStepClick(0)}
                                style={{
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    color: "#fea619",
                                }}
                            >
                                <i className="fa fa-angle-left fa-5x"></i>
                            </span>
                        )}
                    </div>
                    <div className="col-md-6">
                        {moving?.step == 0 && moving?.vehicle_type_id && (
                            <span
                                onClick={() => handleStepClick(1)}
                                className="float-right"
                                style={{
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    color: "#fea619",
                                }}
                            >
                                <i
                                    className="fa fa-angle-right fa-5x"
                                    style={{
                                        marginTop: "1rem",
                                    }}
                                ></i>
                            </span>
                        )}
                    </div>
                </div>
            </div> */}
        </>
    );
};

export { MovingRequest };
