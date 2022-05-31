import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { GoogleMap as Map, DirectionsRenderer } from "@react-google-maps/api";
import Swal from "sweetalert2";
import { MapLoadedApiContext } from "../../helper/context";

const MovingRequest = (props) => {
    const { location } = props;
    const {
        movingRequestLoading,
        movingRequestData,
        movingRequestError,
        clearMovingRequest,
        movingRequestMessage,
    } = props;
    const [directionsService, setDirectionsService] = useState(null);
    const [state, setState] = useState({ response: null });

    const isLoaded = useContext(MapLoadedApiContext);

    useEffect(() => {
        setState({
            ...state,
            from_address: location?.state?.from_address,
            to_address: location?.state?.to_address,
        });
        if (isLoaded) {
            return new Promise(async (resolve) => {
                setDirectionsService(
                    new window.google.maps.DirectionsService()
                );
                resolve();
            });
        }
    }, [isLoaded]);

    useEffect(() => {
        if (movingRequestData && movingRequestLoading == false) {
            Swal.fire({
                title: "Success!",
                text: "Request Successfully Sent",
                confirmButtonText: "Go To Services History",
                icon: "success",
                allowOutsideClick: false,
                confirmButtonColor: "#fea629",
            }).then((result) => {
                if (result.isConfirmed) {
                    clearMovingRequest("");
                    props.history.replace({
                        pathname: "/services-history",
                    });
                }
            });
            return;
        }
        if (movingRequestLoading == false && movingRequestError) {
            Swal.fire({
                title: "Error",
                text: movingRequestMessage,
                confirmButtonText: "Close",
                icon: "error",
                confirmButtonColor: "#fea629",
            });
            return;
        }
    }, [movingRequestData, movingRequestLoading]);

    useEffect(() => {
        if (state?.from_address && state?.to_address && directionsService) {
            directionsService.route(
                {
                    origin: location?.state?.from_address,
                    destination: location?.state?.to_address,
                    travelMode: "DRIVING",
                },
                (result, status) => {
                    if (status === "OK") {
                        setState({
                            ...state,
                            response: result,
                        });
                    }
                }
            );
        }
    }, [state?.from_address, state?.to_address]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        props.makeMovingRequest({
            ...data,
            ...location?.state,
        });
    };

    return (
        <div className="section-requst-qoutes">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="RequestQuote text-center mb-5">
                            Request Quote
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="qoutes-map-box p-4">
                            <div className="map-title mb-3">Moving Address</div>
                            <div className="map-box-new">
                                {isLoaded && (
                                    <Map
                                        // required
                                        id="direction-example"
                                        // required
                                        mapContainerStyle={{
                                            height: "30rem",
                                            width: "100%",
                                        }}
                                        // center={{
                                        //     lat: 0,
                                        //     lng: -180,
                                        // }}
                                        // required
                                        zoom={7}
                                    >
                                        {state?.response !== null && (
                                            <DirectionsRenderer
                                                // required
                                                options={{
                                                    directions: state?.response,
                                                }}
                                            />
                                        )}
                                    </Map>
                                )}
                            </div>

                            <div className="request-information mt-4 p-4">
                                <div className="mb-3">
                                    <div className="moving-form">
                                        Moving From
                                    </div>
                                    <div className="moving-form-map-link">
                                        <span>
                                            {location?.state?.from_address}
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="moving-form">Moving To</div>
                                    <div className="moving-form-map-link">
                                        <span>
                                            {location?.state?.to_address}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div className="moving-form">Move Date</div>
                                    <div className="moving-form-map-link">
                                        <span>{location?.state?.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="qoutes-map-box p-4">
                            <div className="enter-detail-rqt mb-5">
                                Enter Your Detail
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <div
                                        className="col-md-12 px-0 text-dark"
                                        style={{ fontSize: "2rem" }}
                                    >
                                        Name
                                        <strong className="text-danger">
                                            *
                                        </strong>
                                    </div>
                                    <div className="common-input p-1">
                                        <div>
                                            <input
                                                {...register("name", {
                                                    required: true,
                                                })}
                                                placeholder="Name"
                                                className="location-search-input m-1"
                                            />
                                            <div className="text-danger">
                                                {errors.name?.type ===
                                                    "required" &&
                                                    "First name is required"}
                                            </div>
                                            <div className="autocomplete-dropdown-container"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div
                                        className="col-md-12 px-0 text-dark"
                                        style={{ fontSize: "2rem" }}
                                    >
                                        Email Address
                                        <strong className="text-danger">
                                            *
                                        </strong>
                                    </div>
                                    <div className="common-input p-1">
                                        <div>
                                            <input
                                                {...register("email", {
                                                    required: true,
                                                    pattern: /^\S+@\S+$/i,
                                                })}
                                                placeholder="email address"
                                                className="location-search-input m-1"
                                            />
                                            <div className="text-danger">
                                                {errors.email?.type ===
                                                    "required" &&
                                                    "Email is required"}
                                                {errors.email?.type ===
                                                    "pattern" &&
                                                    "Email is invalid"}
                                            </div>
                                            <div className="autocomplete-dropdown-container"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div
                                        className="col-md-12 px-0 text-dark"
                                        style={{ fontSize: "2rem" }}
                                    >
                                        Phone
                                        <strong className="text-danger">
                                            *
                                        </strong>
                                    </div>
                                    <div className="common-input p-1">
                                        <div>
                                            <input
                                                {...register("phone", {
                                                    required: true,
                                                    pattern:
                                                        /^\+(\d{1}\-)?(\d{11,12})$/,
                                                })}
                                                placeholder="+923331234567"
                                                className="location-search-input m-1"
                                            />
                                            <div className="text-danger">
                                                {errors.phone?.type ===
                                                    "required" &&
                                                    "Phone is required"}
                                                {errors.phone?.type ===
                                                    "pattern" &&
                                                    "Phone number is invalid"}
                                            </div>
                                            <div className="autocomplete-dropdown-container"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div
                                        className="col-md-12 px-0 text-dark"
                                        style={{ fontSize: "2rem" }}
                                    >
                                        Description
                                    </div>
                                    <div className="common-input p-1">
                                        <div>
                                            <textarea
                                                {...register("description", {
                                                    maxLength: 200,
                                                })}
                                                cols="30"
                                                rows="10"
                                                placeholder="Description"
                                            ></textarea>
                                            <div className="text-danger">
                                                {errors.description?.type ===
                                                    "maxLength" &&
                                                    "Description is too long"}
                                            </div>
                                            <div className="autocomplete-dropdown-container"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <button
                                        disabled={
                                            movingRequestLoading ||
                                            movingRequestData
                                        }
                                        type="submit"
                                        className="button-common mt-4 w-100"
                                    >
                                        {(movingRequestLoading && (
                                            <i className="fas fa-spinner fa-spin ml-3"></i>
                                        )) ||
                                            "Submit"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { MovingRequest };
