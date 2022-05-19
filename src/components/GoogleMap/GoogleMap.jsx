import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { GoogleMap as Map, DirectionsRenderer } from "@react-google-maps/api";
import moment from "moment";
export const GoogleMap = (props) => {
    const [state, setstate] = useState(props.location.state);
    const ref = useRef(null);
    const [directionsService, setDirectionsService] = useState(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (window && window.google) {
            let directions = new Promise(async (resolve) => {
                resolve(new window.google.maps.DirectionsService());
            });
            setDirectionsService(directions);
        }
    }, []);

    useEffect(async () => {
        if ((count <= 1, props.open)) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    scrollToBottom();
                    setCount(count + 1);
                    if (count > 0) {
                        resolve();
                    }
                }, 500);
            });
        }
    }, [props.open]);

    // useEffect(() => {
    //     if (props.open == true) {
    //         if (count <= 3) {
    //             return new Promise((resolve) => {
    //                 setTimeout(() => {
    //                     console.log("count", count);
    //                     scrollToBottom();
    //                     setCount(count + 1);
    //                     if (count > 3) {
    //                         resolve();
    //                     }
    //                 }, 250);
    //             });
    //         }
    //     }
    // }, [props.open]);

    useEffect(() => {
        if (props.open == true) {
            setCount(0);
        }
        if (state?.from_address && state?.to_address && directionsService) {
            directionsService.route(
                {
                    origin: state?.from_address,
                    destination: state?.to_address,
                    travelMode: "DRIVING",
                },
                (result, status) => {
                    if (status === "OK") {
                        setstate({
                            ...state,
                            response: result,
                        });
                    }
                }
            );
        }
    }, [props.open]);

    useEffect(() => {
        if (state?.from_address && state?.to_address && directionsService) {
            directionsService.route(
                {
                    origin: state?.from_address,
                    destination: state?.to_address,
                    travelMode: "DRIVING",
                },
                (result, status) => {
                    if (status === "OK") {
                        setstate({
                            ...state,
                            response: result,
                        });
                    }
                }
            );
        }
    }, [state?.from_address, state?.to_address]);

    const scrollToBottom = async () => {
        await ref.current?.scrollIntoView({
            behavior: "smooth",
            bottom: ref.current.scrollHeight,
        });
    };

    return (
        <>
            <div
                className="row"
                style={{
                    height: "40rem",
                }}
            >
                <div className="col-md-12">
                    <Map
                        // required
                        id="direction-example"
                        // required
                        mapContainerStyle={{
                            height: "40rem",
                            width: "100%",
                        }}
                        center={{
                            lat: 0,
                            lng: -180,
                        }}
                        // required
                        zoom={7}
                    >
                        {state?.response !== null &&
                            state?.response !== undefined &&
                            state?.response !== "" &&
                            state?.from_address &&
                            state?.to_address && (
                                <DirectionsRenderer
                                    // required
                                    options={{
                                        directions: state?.response,
                                    }}
                                />
                            )}
                    </Map>
                </div>
            </div>
            <div
                className="row mt-5 mb-5 m-1 pb-5"
                style={{
                    border: "0.5rem solid #ccc",
                    borderRadius: "5px",
                    boxShadow: "0 0.5rem 1rem rgba(0,0,0,.15)",
                }}
            >
                <div className="col-12">
                    <div className="title-move text-center">Moving Details</div>
                    <div
                        className="col-md-12 text-dark"
                        style={{ fontSize: "2rem" }}
                    >
                        Moving From
                    </div>
                    <div className="common-input pr-1">
                        <input
                            type="text"
                            placeholder="date e.g 2222-12-30"
                            value={state?.from_address}
                            disabled
                        />
                    </div>
                    <div
                        className="col-md-12 text-dark"
                        style={{ fontSize: "2rem" }}
                    >
                        Moving To
                    </div>
                    <div className="common-input pr-1">
                        <input
                            type="text"
                            placeholder="date e.g 2222-12-30"
                            value={state?.to_address}
                            disabled
                        />
                    </div>
                    <div
                        className="col-md-12 text-dark"
                        style={{ fontSize: "2rem" }}
                    >
                        Moving Date
                    </div>
                    <div className="common-input pr-1">
                        <input
                            type="text"
                            placeholder="date e.g 2222-12-30"
                            value={
                                state?.date
                                    ? moment(state?.date).format("YYYY-MM-DD")
                                    : ""
                            }
                            disabled
                        />
                    </div>
                    <div
                        className="col-md-12 text-dark"
                        style={{ fontSize: "2rem" }}
                    >
                        Zip Code
                    </div>
                    <div className="common-input pr-1">
                        <input
                            type="text"
                            name="zip_code"
                            placeholder="Zip Code e.g 00000"
                            value={state?.zip_code}
                            disabled
                        />
                    </div>
                    <div className="common-input pr-1">
                        <div
                            className="col-md-12 text-dark"
                            style={{ fontSize: "2rem" }}
                        >
                            Name
                        </div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            defaultValue={props.moreDetails?.name}
                            onChange={props?.handleMoreDetailChange}
                        />
                    </div>
                    <div className="common-input pr-1">
                        <div
                            className="col-md-12 text-dark"
                            style={{ fontSize: "2rem" }}
                        >
                            Email
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            defaultValue={props.moreDetails?.email}
                            onChange={props?.handleMoreDetailChange}
                        />
                    </div>
                    <div className="common-input pr-1">
                        <div
                            className="col-md-12 text-dark"
                            style={{ fontSize: "2rem" }}
                        >
                            Phone<strong className="text-danger">*</strong>
                        </div>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone No e.g. +3211234567"
                            defaultValue={props.moreDetails?.phone}
                            onChange={props?.handleMoreDetailChange}
                        />
                        <div className="text-danger">
                            {props.moreDetails?.phoneErr}
                        </div>
                    </div>
                    <div className="common-input pr-1">
                        <div
                            className="col-md-12 text-dark"
                            style={{ fontSize: "2rem" }}
                        >
                            Details
                        </div>
                        <textarea
                            type="text"
                            name="detail"
                            placeholder="Add more details"
                            defaultValue={props.moreDetails?.detail}
                            onChange={props?.handleMoreDetailChange}
                        ></textarea>
                    </div>
                </div>
            </div>
            <div ref={ref} />
        </>
    );
};
