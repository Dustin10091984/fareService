import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import { getServiceRequestList, serviceRequestListUpdate } from "../store/Slices/services/RequestServiceSclice";
import { pay } from "../store/Slices/payments/paymentSlice";
import {
    addFeedback,
    initialFeedback,
} from "../store/Slices/feedbacks/feedbackSlice";
import Loading from "../front-end/common/Loading";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Rating from "../components/Rating";
import Paginate from "./../components/Paginate";
import { HOST } from "../constants";
import { ReactSwal } from "../helper/swal";

export const ServicesHistory = (props) => {
    const { location, history } = props;
    // const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState({
        second: 0,
        payable: "",
        error: "",
    });

    const ref = useRef(null);
    const payRef = useRef(null);

    const [feedback, setFeedback] = useState({
        service_request_id: "",
        provider_id: "",
        comment: "",
        rating: "",
    });
    const stripe = useStripe();
    const elements = useElements();
    const [checkoutError, setCheckoutError] = useState();

    const dispatch = useDispatch();

    const loading = useSelector(
        (state) => state?.serviceRequest?.list?.loading
    );
    const error = useSelector((state) => state?.serviceRequest?.list?.error);
    const message = useSelector(
        (state) => state?.serviceRequest?.list?.message
    );
    const serviceRequestList = useSelector(
        (state) => state?.serviceRequest?.list?.data
    );

    const payLoading = useSelector(
        (state) => state?.paymentReducer?.payment?.loading
    );
    const payError = useSelector(
        (state) => state?.paymentReducer?.payment?.error
    );
    const payMessage = useSelector(
        (state) => state?.paymentReducer?.payment?.message
    );
    const payData = useSelector(
        (state) => state?.paymentReducer?.payment?.data
    );

    const feedbackLoading = useSelector(
        (state) => state?.feedbackReducer?.loading
    );
    const feedbackError = useSelector((state) => state?.feedbackReducer?.error);
    const feedbackMessage = useSelector(
        (state) => state?.feedbackReducer?.message
    );
    const feedbackData = useSelector((state) => state?.feedbackReducer?.data);

    // useEffect(() => {
    //     if (feedbackData) {
    //         getServiceRequestList(location.search)
    //         serviceRequestListUpdate(feedbackData?.service_request);
    //     }
    // }, [feedbackData])

    useEffect(() => {
        !serviceRequestList?.data?.length &&
            dispatch(getServiceRequestList(location?.search || ""));
        const interval = setInterval(() => {
            setState((state) => ({ ...state, second: state.second + 1 }));
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        location?.search && dispatch(getServiceRequestList(location.search));
    }, [location.search]);

    useEffect(() => {
        if (feedbackMessage && feedbackError == false) {
            ref.current.click();
            ReactSwal.fire({
                position: "top-end",
                icon: "success",
                title: "Feedback added successfully!",
                showConfirmButton: false,
                timer: 1000,
                allowOutsideClick: false,
                showCloseButton: true,
            });
            dispatch(serviceRequestListUpdate(feedbackData.service_request));
            // dispatch(getServiceRequestList(location.search));
            return;
        }
    }, [feedbackMessage, feedbackError]);

    useEffect(() => {
        if (payMessage && payError == false) {
            ReactSwal.fire({
                position: "top-end",
                icon: "success",
                title: payMessage,
                showConfirmButton: false,
                timer: 1000,
                allowOutsideClick: false,
                showCloseButton: true,
            });
            payRef.current.click();
        }
    }, [payData]);

    /**
     * get payable object and set state
     *
     * @param {object} payable
     */
    const handlePaymentClick = (payable) => {
        setState((state) => ({ ...state, payable }));
    };

    /**
     * close modal and remove payable state
     */
    const handleCloseClick = () => {
        setState((state) => ({ ...state, payable: "" }));
        if (feedback.rating) {
            dispatch(initialFeedback([]));
            setFeedback((state) => ({
                ...state,
                service_request_id: "",
                provider_id: "",
                comment: "",
                rating: "",
            }));
        }
    };

    /**
     * handle Feedback click
     *
     * @param {object} data
     */
    const handleFeedbackClick = (service_request_id, provider_id) => {
        setFeedback((state) => ({ ...state, service_request_id, provider_id }));
    };

    /**
     * handle card details change
     *
     * @param {object} event
     */
    const handleCardDetailsChange = (event) => {
        console.log();
        if (event.error) {
            setCheckoutError(event.error.message);
        } else {
            // setState((state) => ({ ...state, error: { ...state.error, stripeErr: undefined } }))
            setCheckoutError();
        }
    };

    /**
     * handle pay click
     */
    const handlePayClick = async () => {
        setIsLoading(true);
        const cardElement = elements.getElement("card");
        try {
            const { error, token } = await stripe.createToken(
                elements.getElement(CardElement)
            );
            if (token && state.payable !== undefined) {
                dispatch(
                    pay({ token: token.id, payable_id: state.payable.id })
                );
                setIsLoading(false);
            }
            if (error) {
                setState((state) => ({
                    ...state,
                    error: { ...state.error, stripeErr: error.message },
                }));
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            setState((state) => ({
                ...state,
                error: { ...state.error, stripeErr: error.message },
            }));
        }
    };

    /**
     * handle select feedback click
     *
     * @param {int} rating
     */
    const handleSelectFeedbackClick = (rating) => {
        setFeedback((state) => ({ ...state, rating }));
    };

    /**
     * handle change comment
     */
    const handleCommentChange = (event) => {
        setFeedback((state) => ({ ...state, comment: event.target.value }));
    };

    /**
     * handle feedback submit
     */
    const handleFeedbackSubmit = () => {
        if (
            feedback.rating !== "" &&
            feedback.provider_id !== "" &&
            feedback.service_request_id !== ""
        ) {
            dispatch(
                addFeedback({
                    service_request_id: feedback.service_request_id,
                    provider_id: feedback.provider_id,
                    comment: feedback.comment,
                    rating: feedback.rating,
                })
            );
        }
    };

    // const TimeCounter = ({ worked_times }) => {
    //     const [time, setTime] = useState(new Date());
    //     useEffect(() => {
    //         setTime(new Date());
    //     }, [time]);
    //     return (
    //         <div className="time-counter">
    //             {time.getHours() +
    //                 ":" +
    //                 time.getMinutes() +
    //                 ":" +
    //                 time.getSeconds()}
    //         </div>
    //     );
    // };

    return (
        <>
            <div className="breadcrumb-dash">
                <Loading loading={loading} />
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li
                                        className="breadcrumb-item active"
                                        aria-current="page"
                                    >
                                        Services History
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="dashborad-box order-history pb-5"
                // style={{
                //     backgroundImage: `url("/assets/img/apply-bg.jpg")`,
                //     backgroundSize: "cover",
                //     backgroundAttachment: "fixed",
                // }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {loading == false && error == true && message ? (
                                <>
                                    <div className="page-title">{message}</div>
                                    <div className="text-center">
                                        <i className="fa fa-frown-o fa-5x" />
                                    </div>
                                </>
                            ) : (
                                <div className="page-title">
                                    Services History
                                </div>
                            )}
                        </div>
                        <>
                            {serviceRequestList?.data?.length > 0 &&
                                serviceRequestList?.data?.map(
                                    (serviceRequest, index) => (
                                        <div
                                            className="col-9 mobile-auto-col col-sm-6 col-lg-4"
                                            key={index}
                                        >
                                            <Link
                                                to={`service-detail/${serviceRequest.id}`}
                                                className="font-weight-bold"
                                                style={{
                                                    color: "#000",
                                                }}
                                                onClick={(evt) => {
                                                    !!evt.target.getAttribute(
                                                        "data-feature"
                                                    ) && evt.preventDefault();
                                                }}
                                            >
                                                <div className="order-card order-history-card-11 d-flex">
                                                    <div className="row">
                                                        <div className="col-8 order-des-b">
                                                            Service#{" "}
                                                            {serviceRequest.id}
                                                            <div className="order-time">
                                                                {moment(
                                                                    serviceRequest.created_at
                                                                ).format(
                                                                    "ddd, MM Do YYYY, h:mm:ss A"
                                                                )}
                                                            </div>
                                                            <div className="order-btn-b">
                                                                <div className="btn-price-serv mb-3 mt-3">
                                                                    {
                                                                        (() => {
                                                                            if (
                                                                                serviceRequest.status ===
                                                                                "PENDING"
                                                                            ) {
                                                                                return "Pending";
                                                                            }
                                                                            if (
                                                                                serviceRequest.working_status ==
                                                                                null
                                                                            ) {
                                                                                return "Not Started yet!";
                                                                            }

                                                                            if (
                                                                                serviceRequest.working_status ==
                                                                                "STARTED"
                                                                            ) {
                                                                                if (
                                                                                    serviceRequest
                                                                                        ?.worked_times
                                                                                        ?.length >
                                                                                    0
                                                                                ) {
                                                                                    let breakTime = 0;
                                                                                    let started =
                                                                                        moment(
                                                                                            serviceRequest
                                                                                                .worked_times[0]
                                                                                                .start_at
                                                                                        );
                                                                                    serviceRequest?.worked_times?.forEach(
                                                                                        (
                                                                                            time
                                                                                        ) => {
                                                                                            if (
                                                                                                time.is_pause &&
                                                                                                time.end_at !=
                                                                                                    null
                                                                                            ) {
                                                                                                breakTime =
                                                                                                    moment(
                                                                                                        time.start_at
                                                                                                    ).diff(
                                                                                                        time.end_at,
                                                                                                        "seconds"
                                                                                                    );
                                                                                            }
                                                                                        }
                                                                                    );
                                                                                    let now =
                                                                                        moment();
                                                                                    let duration =
                                                                                        moment.duration(
                                                                                            now.diff(
                                                                                                started
                                                                                            )
                                                                                        );
                                                                                    duration =
                                                                                        duration.subtract(
                                                                                            moment(
                                                                                                breakTime
                                                                                            ),
                                                                                            "seconds"
                                                                                        );
                                                                                    // `${ duration.asDays().toFixed( 0 ) > 0 ? duration.asDays().toFixed(0) + "d" : ""}`
                                                                                    return `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
                                                                                }
                                                                                return "Started";
                                                                            }

                                                                            if (
                                                                                serviceRequest.working_status ==
                                                                                "PAUSED"
                                                                            ) {
                                                                                return "Paused";
                                                                            }

                                                                            if (
                                                                                serviceRequest.working_status ==
                                                                                    "ENDED" &&
                                                                                serviceRequest.is_completed ==
                                                                                    true
                                                                            ) {
                                                                                return "Completed";
                                                                            }
                                                                        })()
                                                                        // serviceRequest?.payable_amount != null ? "$"+(parseInt(serviceRequest?.payable_amount) + parseInt(serviceRequest?.paid_amount)) : "$"+serviceRequest?.paid_amount
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="order-btn-b">
                                                                {serviceRequest.paid_amount &&
                                                                    (() => {
                                                                        if (
                                                                            serviceRequest?.payment_status ==
                                                                                false &&
                                                                            serviceRequest?.payable
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    data-feature="true"
                                                                                    type="button"
                                                                                    className="btn-price-serv mb-3 mt-3 preventDefault"
                                                                                    style={{
                                                                                        backgroundColor:
                                                                                            "red",
                                                                                    }}
                                                                                    onClick={() => {
                                                                                        handlePaymentClick(
                                                                                            serviceRequest?.payable
                                                                                        );
                                                                                    }}
                                                                                    data-backdrop="static"
                                                                                    data-keyboard="false"
                                                                                    data-toggle="modal"
                                                                                    data-target="#payable"
                                                                                    ref={
                                                                                        payRef
                                                                                    }
                                                                                >
                                                                                    {serviceRequest?.payable_amount !=
                                                                                    null
                                                                                        ? "$" +
                                                                                          (parseInt(
                                                                                              serviceRequest?.payable_amount
                                                                                          ) +
                                                                                              parseInt(
                                                                                                  serviceRequest?.paid_amount
                                                                                              ))
                                                                                        : "$" +
                                                                                          serviceRequest?.paid_amount}
                                                                                </div>
                                                                            );
                                                                        } else {
                                                                            return (
                                                                                <>
                                                                                    {(() => {
                                                                                        if (
                                                                                            serviceRequest?.payable_amount !=
                                                                                            null
                                                                                        ) {
                                                                                            return (
                                                                                                <div className="btn-price-serv mb-3 mt-3">
                                                                                                    {"$" +
                                                                                                        (parseInt(
                                                                                                            serviceRequest?.payable_amount
                                                                                                        ) +
                                                                                                            parseInt(
                                                                                                                serviceRequest?.paid_amount
                                                                                                            ))}
                                                                                                </div>
                                                                                            );
                                                                                        } else if (
                                                                                            serviceRequest?.paid_amount !=
                                                                                            null
                                                                                        ) {
                                                                                            return (
                                                                                                <div className="btn-price-serv mb-3 mt-3">
                                                                                                    {"$" +
                                                                                                        serviceRequest?.paid_amount}
                                                                                                </div>
                                                                                            );
                                                                                        } else {
                                                                                            return (
                                                                                                <div className="btn-price-serv mb-3 mt-3">
                                                                                                    {
                                                                                                        "Not Paid"
                                                                                                    }
                                                                                                </div>
                                                                                            );
                                                                                        }
                                                                                    })()}
                                                                                </>
                                                                            );
                                                                        }
                                                                    })()}
                                                                {/* <div className="btn-price-serv mb-3 mt-3">
                                                                        price
                                                                    </div> */}
                                                            </div>
                                                            <div className="font-weight-bold">
                                                                Service:{" "}
                                                                {serviceRequest.sub_service ||
                                                                    serviceRequest.type}
                                                            </div>
                                                        </div>
                                                        <div className="col-4">
                                                            <img
                                                                className="img-fluid"
                                                                style={{
                                                                    height: "8.1rem",
                                                                    width: "8.1rem",
                                                                    objectFit:
                                                                        "cover",
                                                                    borderRadius:
                                                                        "100%",
                                                                }}
                                                                src={
                                                                    (serviceRequest
                                                                        ?.provider
                                                                        ?.image &&
                                                                        HOST +
                                                                            serviceRequest
                                                                                ?.provider
                                                                                ?.image) ||
                                                                    ""
                                                                }
                                                                alt=""
                                                                onError={(
                                                                    e
                                                                ) => {
                                                                    e.target.src =
                                                                        "/assets/img/Profile_avatar.png";
                                                                }}
                                                            />
                                                            <div className="order-btn-b mt-2">
                                                                <Link
                                                                    style={{
                                                                        marginLeft:
                                                                            "-.8rem",
                                                                    }}
                                                                    to={`/provider/profile/${serviceRequest?.provider?.id}`}
                                                                    className="btn-view-profile"
                                                                >
                                                                    View Profile
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        {(() => {
                                                            if (
                                                                serviceRequest
                                                                    ?.user_feeback
                                                                    ?.rating
                                                            ) {
                                                                return (
                                                                    <div className="col-12">
                                                                        <div className="float-right">
                                                                            <Rating
                                                                                rating={
                                                                                    serviceRequest
                                                                                        ?.user_feeback
                                                                                        ?.rating
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                            if (
                                                                serviceRequest?.is_completed &&
                                                                serviceRequest?.working_status ===
                                                                    "ENDED"
                                                            ) {
                                                                return (
                                                                    <div className="order-des-b w-100">
                                                                        <div
                                                                            data-feature="true"
                                                                            type="button"
                                                                            className="button-common w-100"
                                                                            onClick={(
                                                                                evt
                                                                            ) => {
                                                                                // evt.preventDefault();
                                                                                handleFeedbackClick(
                                                                                    serviceRequest.id,
                                                                                    serviceRequest
                                                                                        .provider
                                                                                        .id
                                                                                );
                                                                            }}
                                                                            data-backdrop="static"
                                                                            data-keyboard="false"
                                                                            data-toggle="modal"
                                                                            data-target="#feedback"
                                                                        >
                                                                            Give
                                                                            Feedback
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        })()}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                )}
                        </>
                        {/* {serviceRequestList?.data?.length > 0 &&
                            serviceRequestList?.data?.map(
                                (serviceRequest, index) => (
                                    <div className="col-md-4" key={index}>
                                        <div
                                            className="order-card d-flex align-items-center justify-content-between"
                                            style={{
                                                minHeight: "23vh",
                                            }}
                                        >
                                            <div className="order-des-b">
                                                <div className="title">{`${serviceRequest?.provider?.first_name} ${serviceRequest?.provider?.last_name}`}</div>
                                                {serviceRequest?.sub_service && (
                                                    <div className="service-label">
                                                        {
                                                            serviceRequest.sub_service
                                                        }
                                                    </div>
                                                )}
                                                {(() => {
                                                    if (
                                                        serviceRequest
                                                            ?.user_feeback
                                                            ?.rating
                                                    ) {
                                                        return (
                                                            <Rating
                                                                rating={
                                                                    serviceRequest
                                                                        ?.user_feeback
                                                                        ?.rating
                                                                }
                                                            />
                                                        );
                                                    }
                                                    if (
                                                        serviceRequest?.is_completed &&
                                                        serviceRequest?.working_status ===
                                                            "ENDED"
                                                    ) {
                                                        return (
                                                            <div
                                                                type="button"
                                                                className="service-label"
                                                                style={{
                                                                    backgroundColor:
                                                                        "blue",
                                                                }}
                                                                onClick={() =>
                                                                    handleFeedbackClick(
                                                                        serviceRequest.id,
                                                                        serviceRequest
                                                                            .provider
                                                                            .id
                                                                    )
                                                                }
                                                                data-backdrop="static"
                                                                data-keyboard="false"
                                                                data-toggle="modal"
                                                                data-target="#feedback"
                                                            >
                                                                Give Feedback
                                                            </div>
                                                        );
                                                    }
                                                })()}
                                                <div className="order-time">
                                                    {moment(
                                                        serviceRequest?.created_at
                                                    ).fromNow()}
                                                </div>
                                            </div>
                                            <div className="order-btn-b">
                                                <div className="btn-price-serv mb-3">
                                                    {
                                                        (() => {
                                                            if (
                                                                serviceRequest.working_status ==
                                                                null
                                                            ) {
                                                                return "Not Started yet!";
                                                            }

                                                            if (
                                                                serviceRequest.working_status ==
                                                                "STARTED"
                                                            ) {
                                                                return "Started";
                                                            }

                                                            if (
                                                                serviceRequest.working_status ==
                                                                "PAUSED"
                                                            ) {
                                                                return "Paused";
                                                            }

                                                            if (
                                                                serviceRequest.working_status ==
                                                                    "ENDED" &&
                                                                serviceRequest.is_completed ==
                                                                    true
                                                            ) {
                                                                return "Completed";
                                                            }
                                                        })()
                                                        // serviceRequest?.payable_amount != null ? "$"+(parseInt(serviceRequest?.payable_amount) + parseInt(serviceRequest?.paid_amount)) : "$"+serviceRequest?.paid_amount
                                                    }
                                                </div>
                                                <Link
                                                    to={`/provider/profile/${serviceRequest?.provider?.id}`}
                                                    className="btn-view-profile"
                                                >
                                                    View Profile
                                                </Link>
                                                {serviceRequest.paid_amount &&
                                                    (() => {
                                                        if (
                                                            serviceRequest?.payment_status ==
                                                                false &&
                                                            serviceRequest?.payable
                                                        ) {
                                                            return (
                                                                <div
                                                                    type="button"
                                                                    className="btn-price-serv"
                                                                    style={{
                                                                        backgroundColor:
                                                                            "red",
                                                                    }}
                                                                    onClick={() =>
                                                                        handlePaymentClick(
                                                                            serviceRequest?.payable
                                                                        )
                                                                    }
                                                                    data-backdrop="static"
                                                                    data-keyboard="false"
                                                                    data-toggle="modal"
                                                                    data-target="#payable"
                                                                >
                                                                    {serviceRequest?.payable_amount !=
                                                                    null
                                                                        ? "$" +
                                                                          (parseInt(
                                                                              serviceRequest?.payable_amount
                                                                          ) +
                                                                              parseInt(
                                                                                  serviceRequest?.paid_amount
                                                                              ))
                                                                        : "$" +
                                                                          serviceRequest?.paid_amount}
                                                                </div>
                                                            );
                                                        } else {
                                                            return (
                                                                <div className="btn-price-serv">
                                                                    {serviceRequest?.payable_amount !=
                                                                    null
                                                                        ? "$" +
                                                                          (parseInt(
                                                                              serviceRequest?.payable_amount
                                                                          ) +
                                                                              parseInt(
                                                                                  serviceRequest?.paid_amount
                                                                              ))
                                                                        : "$" +
                                                                          serviceRequest?.paid_amount}
                                                                </div>
                                                            );
                                                        }
                                                    })()}
                                            </div>
                                        </div>
                                    </div>
                                )
                            )} */}
                    </div>
                    {!!serviceRequestList?.last_page > 0 && (
                        <div
                            style={{
                                backgroundColor: "white",
                                padding: "3rem",
                                borderRadius: "1rem",
                            }}
                        >
                            <Paginate
                                {...{
                                    last_page: serviceRequestList?.last_page,
                                    current_page:
                                        serviceRequestList?.current_page,
                                    func: getServiceRequestList,
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div
                className="modal fade bd-example-modal-md"
                id="feedback"
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
                        <div className="modal-header">
                            <h5
                                className="modal-title display-4"
                                id="exampleModalLongTitle"
                            >
                                Add Feedback
                            </h5>
                            <button
                                ref={ref}
                                type="button"
                                onClick={handleCloseClick}
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">
                                    <i className="fas fa-times"></i>
                                </span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row m-2">
                                <div className="col-12">
                                    <center className="col-12">
                                        {(() => {
                                            if (feedbackLoading == false) {
                                                if (
                                                    feedbackMessage &&
                                                    feedbackError == true
                                                ) {
                                                    return (
                                                        <div
                                                            className={`col-12  alert alert-danger text-center`}
                                                            role="alert"
                                                            style={{
                                                                fontSize: 15,
                                                            }}
                                                        >
                                                            {feedbackMessage}
                                                        </div>
                                                    );
                                                }
                                            }
                                        })()}
                                    </center>
                                    <div
                                        className="col-md-12 text-dark mb-2"
                                        style={{ fontSize: 20 }}
                                    >
                                        Add comment
                                    </div>
                                    <div className="common-input">
                                        <textarea
                                            type="text"
                                            onChange={handleCommentChange}
                                            name="detail"
                                            value={feedback.comment}
                                            placeholder="please add some details..."
                                        />
                                    </div>
                                    <div
                                        className="col-md-12 text-dark mb-2"
                                        style={{
                                            fontSize: 15,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Rating
                                    </div>
                                    <div className="star-rating-area d-flex align-items-center justify-content-start">
                                        <div
                                            className="rating-static clearfix mr-3"
                                            rel={feedback.rating}
                                        >
                                            <label
                                                className="full"
                                                title="{{ 'Awesome - 5 stars' | translate }}"
                                                onClick={() =>
                                                    handleSelectFeedbackClick(5)
                                                }
                                            ></label>
                                            <label
                                                className="half"
                                                title="{{ 'Excellent - 4.5 stars' | translate }}"
                                                onClick={() =>
                                                    handleSelectFeedbackClick(5)
                                                }
                                            ></label>
                                            <label
                                                className="full"
                                                title="{{ 'Excellent - 4 stars' | translate }}"
                                                onClick={() =>
                                                    handleSelectFeedbackClick(4)
                                                }
                                            ></label>
                                            <label
                                                className="half"
                                                title="{{ 'Better - 3.5 stars' | translate }}"
                                                onClick={() =>
                                                    handleSelectFeedbackClick(4)
                                                }
                                            ></label>
                                            <label
                                                className="full"
                                                title="{{ 'Good - 3 stars' | translate }}"
                                                onClick={() =>
                                                    handleSelectFeedbackClick(3)
                                                }
                                            ></label>
                                            <label
                                                className="half"
                                                title="{{ 'Good - 2.5 stars' | translate }}"
                                                onClick={() =>
                                                    handleSelectFeedbackClick(3)
                                                }
                                            ></label>
                                            <label
                                                className="full"
                                                title="{{ 'Fair - 2 stars' | translate }}"
                                                onClick={() =>
                                                    handleSelectFeedbackClick(2)
                                                }
                                            ></label>
                                            <label
                                                className="half"
                                                title="{{ 'Fair - 1.5 stars' | translate }}"
                                                onClick={() =>
                                                    handleSelectFeedbackClick(2)
                                                }
                                            ></label>
                                            <label
                                                className="full"
                                                title="{{ 'Bad - 1 star' | translate }}"
                                                onClick={() =>
                                                    handleSelectFeedbackClick(1)
                                                }
                                            ></label>
                                            <label
                                                className="half"
                                                title="{{ 'Bad - 0.5 stars' | translate }}"
                                                onClick={() =>
                                                    handleSelectFeedbackClick(1)
                                                }
                                            ></label>
                                        </div>
                                        {/* <div className="ratilike ng-binding">5</div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="button-common"
                                data-dismiss="modal"
                                onClick={handleCloseClick}
                                disabled={feedbackLoading}
                            >
                                Close
                            </button>
                            <button
                                onClick={handleFeedbackSubmit}
                                disabled={
                                    feedback.rating == "" ||
                                    feedback.provider_id == "" ||
                                    feedback.service_request_id == "" ||
                                    feedbackLoading ||
                                    feedbackError == false
                                        ? true
                                        : false
                                }
                                type="button"
                                className="button-common-2"
                            >
                                {feedbackLoading ? (
                                    <>
                                        <i className="fa fa-spinner fa-pulse"></i>{" "}
                                        Loading
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade bd-example-modal-md"
                id="payable"
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
                        <div className="modal-header">
                            <h5
                                className="modal-title display-4"
                                id="exampleModalLongTitle"
                            >
                                Pending Payment
                            </h5>
                        </div>
                        <div className="modal-body">
                            <div className="row m-2">
                                <div className="col-12">
                                    <center className="col-12">
                                        {(() => {
                                            if (checkoutError) {
                                                return (
                                                    <div
                                                        className="col-12  alert alert-danger text-center"
                                                        role="alert"
                                                        style={{ fontSize: 15 }}
                                                    >
                                                        {checkoutError}
                                                    </div>
                                                );
                                            }
                                            if (payLoading == false) {
                                                if (payError) {
                                                    return (
                                                        <div
                                                            className={`col-12  alert alert-${
                                                                payError ==
                                                                false
                                                                    ? "success"
                                                                    : "danger"
                                                            } text-center`}
                                                            role="alert"
                                                            style={{
                                                                fontSize: 15,
                                                            }}
                                                        >
                                                            {payMessage}
                                                        </div>
                                                    );
                                                }
                                            }
                                            if (payLoading || isLoading) {
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
                                        })()}
                                        <div
                                            className="text-center"
                                            style={{ fontSize: "2.5rem" }}
                                        >
                                            {"Please Enter Card details"}
                                        </div>
                                        <CardElement
                                            onChange={handleCardDetailsChange}
                                            className="m-5"
                                        />
                                        <hr />
                                        <div className="row justify-content-md-between mt-3">
                                            <div
                                                className="col-6"
                                                style={{ fontSize: "2rem" }}
                                            >
                                                Payable Amount
                                            </div>
                                            <div
                                                className="col-6"
                                                style={{ fontSize: "2rem" }}
                                            >{`$${state?.payable?.amount}`}</div>
                                        </div>
                                    </center>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="button-common"
                                data-dismiss="modal"
                                onClick={handleCloseClick}
                            >
                                Close
                            </button>
                            <button
                                onClick={handlePayClick}
                                disabled={
                                    payLoading ||
                                    isLoading ||
                                    state?.payable?.amount == null ||
                                    checkoutError != null
                                }
                                type="button"
                                className="button-common-2"
                            >
                                Pay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
