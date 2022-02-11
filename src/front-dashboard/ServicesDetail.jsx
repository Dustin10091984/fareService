import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import Loading from "../front-end/common/Loading";
import { getServiceRequest } from "../store/Slices/services/RequestServiceSclice";
import { GoogleMap as Map, DirectionsRenderer } from "@react-google-maps/api";
import { HOST } from "../constants";
export const ServicesDetail = (props) => {
    const [state, setState] = useState({});
    const dispatch = useDispatch();
    const serviceRequestDetail = useSelector(
        (state) => state?.serviceRequest?.serviceRequestDetail
    );

    useEffect(() => {
        dispatch(getServiceRequest(props?.match?.params?.id));
    }, []);

    useEffect(() => {
        if (window.google) {
            const directionsService =
                new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: serviceRequestDetail?.data?.quotation_info
                        ?.from_address,
                    destination:
                        serviceRequestDetail?.data?.quotation_info?.to_address,
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
    }, [serviceRequestDetail]);

    return (
        <>
            <Loading loading={serviceRequestDetail?.loading} />
            <div className="dashborad-box order-history pad-y">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title">Service Detail</div>
                        </div>
                        <div className="col-md-12">
                            <div className="order-box-des">
                                {(() => {
                                    if (serviceRequestDetail?.error) {
                                        return (
                                            <div
                                                className="text text-danger text-center"
                                                style={{
                                                    fontSize: "2.5rem",
                                                }}
                                            >
                                                {serviceRequestDetail?.message}
                                            </div>
                                        );
                                    }
                                    let data = null;

                                    if (serviceRequestDetail?.data) {
                                        data = serviceRequestDetail?.data;
                                    }

                                    return (
                                        <>
                                            <div className="col-md-9 mx-auto">
                                                <div className="job-provider-card service-card-des">
                                                    <div className="user-des d-flex align-items-centet justify-content-start w-100">
                                                        <div className="user-img d-flex align-items-center justify-content-center">
                                                            <img
                                                                src={
                                                                    data
                                                                        ?.provider
                                                                        ?.image
                                                                        ? `${HOST}${data?.provider?.image}`
                                                                        : `/assets/img/user4.jpg`
                                                                }
                                                                className="img-fluid"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="user-detail w-100">
                                                            <div className=" w-100 d-flex align-items-centet justify-content-between">
                                                                <div className="title">
                                                                    {
                                                                        data
                                                                            ?.provider
                                                                            ?.first_name
                                                                    }{" "}
                                                                    {
                                                                        data
                                                                            ?.provider
                                                                            ?.last_name
                                                                    }
                                                                </div>
                                                                <Link
                                                                    to={`/provider/profile/${data?.provider?.id}`}
                                                                    className="button-common"
                                                                >
                                                                    View Profile
                                                                </Link>
                                                            </div>
                                                            {/* <div className="service-name my-4">
                                                                House Cleaner
                                                            </div> */}
                                                            {/* <div className="job-status">
                                                                {
                                                                    data?.competed_service_request
                                                                }{" "}
                                                                completed Jobs
                                                            </div> */}
                                                            <div className="stars-rating w-100  d-flex align-items-centet justify-content-between">
                                                                <Rating
                                                                    rating={
                                                                        typeof data
                                                                            ?.provider
                                                                            ?.rating ==
                                                                            "float" &&
                                                                        data?.provider?.rating?.toFixed(
                                                                            1
                                                                        )
                                                                    }
                                                                    isCenter={
                                                                        false
                                                                    }
                                                                />

                                                                {/* <button className="button-common-2">
                                                        Conitnue with this
                                                        Provider
                                                    </button> */}
                                                            </div>
                                                            <div className="user-price text-green">
                                                                {(data?.provider
                                                                    ?.provider_profile
                                                                    ?.hourly_rate !==
                                                                    null &&
                                                                data?.provider
                                                                    ?.provider_profile
                                                                    ?.hourly_rate !==
                                                                    undefined)
                                                                    ? `$${data?.provider?.provider_profile?.hourly_rate}/Per Hour`
                                                                    : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>
                                            </div>
                                            <div className="pb-5">
                                                <div className="order-title mb-5 text-center">
                                                    Subtotal
                                                </div>
                                            </div>
                                            <div className="d-flex  align-items-center justify-content-between mb-5">
                                                <div>
                                                    <div className="order-num">
                                                        Order Details
                                                    </div>
                                                    <div className="order-title">
                                                        Request Status :{" "}
                                                        <span className="order-num active">
                                                            {data?.status}
                                                        </span>
                                                    </div>
                                                    <div className="order-title">
                                                        Working Status :{" "}
                                                        <span className="order-num active">
                                                            {data?.working_status ||
                                                                "Pending"}
                                                        </span>
                                                    </div>
                                                    <div className="order-title">
                                                        Worked hours :{" "}
                                                        <span className="order-num active">
                                                            {data?.worked_hours ||
                                                                0}
                                                        </span>
                                                    </div>
                                                    <div className="order-title">
                                                        Address :{" "}
                                                        <span className="order-num active">
                                                            {data?.address}
                                                        </span>
                                                    </div>
                                                    {data?.type ==
                                                        "SERVICE_REQUEST" && (
                                                        <div className="order-title">
                                                            Requested Hours :{" "}
                                                            <span className="order-num active">
                                                                {data?.hours}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className="order-title">
                                                        Type :{" "}
                                                        <span className="order-num active">
                                                            {data?.requested_sub_service ||
                                                                data?.type}
                                                        </span>
                                                    </div>
                                                    {data?.type ==
                                                        "MOVING_REQUEST" && (
                                                        <>
                                                            <div className="order-title">
                                                                From Address :{" "}
                                                                <span className="order-num active">
                                                                    {
                                                                        data
                                                                            ?.quotation_info
                                                                            ?.from_address
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="order-title">
                                                                To Address :{" "}
                                                                <span className="order-num active">
                                                                    {
                                                                        data
                                                                            ?.quotation_info
                                                                            ?.to_address
                                                                    }
                                                                </span>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="div">
                                                    <div className="order-number ">
                                                        #{data?.id}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" d-flex  align-items-center justify-content-between mb-5">
                                                {data?.type ==
                                                    "MOVING_REQUEST" &&
                                                    state?.response && (
                                                        <Map
                                                            // required
                                                            id="direction-example"
                                                            // required
                                                            mapContainerStyle={{
                                                                height: "400px",
                                                                width: "100%",
                                                            }}
                                                            center={{
                                                                lat: 0,
                                                                lng: -180,
                                                            }}
                                                            // required
                                                            zoom={7}
                                                        >
                                                            <DirectionsRenderer
                                                                // required
                                                                options={{
                                                                    directions:
                                                                        state?.response,
                                                                }}
                                                            />
                                                        </Map>
                                                    )}
                                            </div>
                                            {data?.type == "SERVICE_REQUEST" ? (
                                                <>
                                                    {/* <div className=" d-flex  align-items-center justify-content-between mb-5 py-5">
                                                        <div>
                                                            <div className="order-num active">
                                                                Work done?
                                                            </div>
                                                            <div className="order-title">
                                                                KFC Family
                                                                Bucket
                                                            </div>
                                                        </div>
                                                        <div className="div">
                                                            <div className="order-number bg-none">
                                                                RS 240.00
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    <div className="d-flex subtotal-box  align-items-center justify-content-between mb-4">
                                                        <div>
                                                            <div className="order-num">
                                                                Total
                                                            </div>
                                                        </div>
                                                        <div className="div">
                                                            <div className="order-number bg-none">
                                                                $
                                                                {data?.paid_amount ||
                                                                    0}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="d-flex subtotal-box align-items-center justify-content-between  mb-4">
                                                        <div>
                                                            <div className="order-num">
                                                                Discount
                                                            </div>
                                                        </div>
                                                        <div className="div">
                                                            <div className="order-number">
                                                                -RS 240.00
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex subtotal-box align-items-center justify-content-between  mb-4">
                                                        <div>
                                                            <div className="order-num">
                                                                Tax
                                                            </div>
                                                        </div>
                                                        <div className="div">
                                                            <div className="order-number pink">
                                                                -RS 240.00
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                            {/* <div className="text-right mt-5 pt-5">
                                                <button className="button-common">
                                                    Reorder
                                                </button>
                                            </div> */}
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
