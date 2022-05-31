import React, { useState, useEffect, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
    getProviderList,
    setStateProvider,
} from "../store/Slices/providers/providerListSclice";
import { getProviderSchedule } from "../store/Slices/providers/providerScheduleSclice";
import { postRequestService } from "../store/Slices/services/RequestServiceSclice";
import { getInitialRequestService } from "../store/Slices/services/RequestServiceSclice";
import {
    makeMovingRequest,
    movingRequest as clearMovingRequest,
} from "../store/Slices/moving/movingSlice";
import ServiceType from "../constants/ServiceType";
import { GoogleMap } from "../components/GoogleMap/GoogleMap";
import { Link } from "react-router-dom";
// import Calendar from "react-calendar";
import PlacesAutocomplete from "react-places-autocomplete";
import { HOST } from "./../constants";
import Rating from "../components/Rating";
import Loading from "./common/Loading";
import Swal from "sweetalert2";
import DayPicker, { DateUtils } from "react-day-picker";
// import "react-day-picker/lib/style.css";
import "./Styles.css";
import { MapLoadedApiContext } from "../helper/context";

export const ServiceProviders = (props) => {
    const { location, history } = props;
    const [open, setOpen] = useState(false);

    const movingRef = useRef("movingModal");
    const qautationRef = useRef("qaotationModal");

    const isLoaded = useContext(MapLoadedApiContext);

    const [state, setState] = useState({
        is_loggedin: false,
        loggedinErr: "",
        selectedSlot: "",
        is_hourly: "",
        hours: "",
        address: "",
        addressErr: "",
        phone: "",
        detail: "",
        images: [],
        previewImages: [],
        detailErr: "",
        questionsErr: "",
        submitting: false,
        error: "",
        serviceRequest: "",
    });

    const { detail, detailErr } = state;

    const [value, setValue] = useState();

    const dispatch = useDispatch();

    const providerList = useSelector((state) => state.provider);
    const providerSchedule = useSelector((state) => state.providerSchedule);
    const serviceRequest = useSelector((state) => state.serviceRequest);

    const movingLoading = useSelector(
        (state) => state.movingReducer?.movingRequest?.loading
    );
    const movingRequest = useSelector(
        (state) => state.movingReducer?.movingRequest?.data
    );
    const movingError = useSelector(
        (state) => state.movingReducer?.movingRequest?.error
    );
    const movingMessage = useSelector(
        (state) => state.movingReducer?.movingRequest?.message
    );

    useEffect(() => {
        return () => {
            dispatch(getInitialRequestService());
            dispatch(setStateProvider(""));
        };
    }, []);

    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            setState((state) => ({
                ...state,
                is_loggedin: true,
            }));
        }
        if (location?.state?.service_type === ServiceType.MOVING) {
            let searchParams = new URLSearchParams({
                service_type: location?.state?.service_type,
                vehicle_type_id: location?.state?.vehicle_type_id,
            }).toString();
            dispatch(
                getProviderList(
                    `${
                        props.location.search !== ""
                            ? props.location.search + searchParams
                            : `?${searchParams}`
                    }`
                )
            );
        } else {
            dispatch(getProviderList(props.location.search));
        }
    }, [
        props.location.search,
        location?.state?.service_type,
        location?.state?.vehicle_type_id,
    ]);

    useEffect(() => {
        if (providerList !== undefined && !providerList.length) {
            setState((state) => ({
                ...state,
                providerList: providerList,
            }));
        }
        if (providerSchedule !== undefined && !providerSchedule.length) {
            setState((state) => ({
                ...state,
                providerSchedule: providerSchedule,
            }));
            handleCalendarClick(new Date());
        }
        // if(serviceRequest !== undefined && serviceRequest !== null){
        //     setState(state => ({
        //         ...state,
        //         serviceRequest: serviceRequest,
        //         submitting: false
        //     }));
        // }
    }, [
        providerList,
        providerSchedule,
        // serviceRequest
    ]);

    useEffect(() => {
        if (movingError == true) {
            Swal.fire({
                title: "Error",
                text: movingMessage,
                confirmButtonText: "Close",
                icon: "error",
                confirmButtonColor: "#fea629",
            });
            return;
        }
        if (movingError == false && movingMessage) {
            movingRef.current.click();
            Swal.fire({
                title: "Success!",
                text: "Request Successfully Sent",
                confirmButtonText: "Go To Services History",
                icon: "success",
                confirmButtonColor: "#fea629",
            }).then((result) => {
                if (result.isConfirmed) {
                    handleGoToServicesHistory();
                    dispatch(clearMovingRequest(""));
                }
            });
        }
    }, [movingError, movingMessage]);

    function handleContinueClick(
        event,
        type,
        provider,
        provider_service_requests_count
    ) {
        setOpen(true);
        const { value } = event.target;
        if (state.is_loggedin) {
            if (props.location.state !== undefined) {
                setState((state) => ({
                    ...state,
                    is_hourly: type,
                    provider_id: value,
                    provider,
                    provider_service_requests_count,
                }));
                if (location?.state?.service_type !== ServiceType.MOVING) {
                    if (type == true) {
                        dispatch(getProviderSchedule(value));
                    }
                }
            } else {
                setState((state) => ({
                    ...state,
                    error: (
                        <center
                            className="col-md-12 alert alert-danger"
                            role="alert"
                            style={{ fontSize: 15 }}
                        >
                            please select category from header
                        </center>
                    ),
                }));
            }
        } else {
            setState((state) => ({
                ...state,
                error: (
                    <center
                        className="col-md-12 alert alert-primary"
                        role="alert"
                        style={{ fontSize: 15 }}
                    >
                        please login
                    </center>
                ),
            }));
        }
    }

    const handleCalendarClick = (selectedDate) => {
        setValue(selectedDate);
        let timeSlots = providerSchedule?.data?.data.filter((slot) => {
            if (slot?.provider_schedule) {
                return (
                    +slot.provider_schedule?.year ===
                        selectedDate.getFullYear() &&
                    +slot.provider_schedule.month ===
                        selectedDate.getMonth() + 1 &&
                    +slot.provider_schedule.date === selectedDate.getDate()
                );
            }
        });
        if (timeSlots) {
            setState((state) => ({ ...state, timeSlots: timeSlots }));
        } else {
            setState((state) => ({ ...state, timeSlots: undefined }));
        }
        return;
    };

    const handleHoursClick = (e) => {
        const { value } = e.target;
        setState((state) => ({ ...state, hours: value }));
    };

    const handleSlotClick = (e) => {
        const { value } = e.target;

        setState((state) => ({
            ...state,
            selectedSlot: state.selectedSlot == value ? "" : value,
        }));

        // if (!selectedSlot.includes(value)){
        //     selectedSlot.push(value);
        //     setState((state) => ({ ...state, selectedSlot }));
        // } else {
        //     selectedSlot = selectedSlot.filter((selected)=> selected !== value);
        //     setState((state) => ({ ...state, selectedSlot }));
        // }
    };

    const handleAddressChange = (address) => {
        if (address.length < 5) {
            setState((state) => ({ ...state, address }));
            setState((state) => ({
                ...state,
                addressErr: (
                    <div
                        className="col-md-12 text-danger mt-2"
                        style={{ fontSize: 15 }}
                    >
                        Address's character minimum 5
                    </div>
                ),
            }));
        } else {
            setState((state) => ({ ...state, address }));
            setState((state) => ({ ...state, addressErr: "" }));
        }
    };

    const handleDetailChange = (e) => {
        const { name, value } = e.target;
        setState((state) => ({ ...state, [name]: value }));
        let errorMsg =
            "Detail may not be less than 20 and greater than 200 characters";
        if (value == "" || (value.length > 20 && value.length < 200)) {
            errorMsg = "";
        }
        setState((state) => ({ ...state, [`${name}Err`]: errorMsg }));
    };

    const handleAddPaymentClick = (e) => {
        e.preventDefault();
        if (location.state !== undefined) {
            const {
                selectedSlot,
                address,
                hours,
                is_hourly,
                provider_id,
                detail,
                provider,
            } = state;
            // setState((state) => ({ ...state, submitting: true }));
            if (
                is_hourly == true &&
                location.state.service_type != ServiceType.MOVING
            ) {
                props.history.push({
                    pathname: "/payment",
                    state: {
                        slots: [selectedSlot],
                        is_hourly: is_hourly,
                        hours: hours != "" ? hours : 1,
                        address,
                        questions: props.location.state,
                        token: "",
                        provider_id,
                        provider,
                    },
                });
            } else if (location?.state?.service_type == ServiceType.MOVING) {
                let moreDetails = {
                    name: state?.name || null,
                    phone: state?.phone || null,
                    email: state?.email || null,
                    detail: state?.detail || null,
                };
                dispatch(
                    makeMovingRequest({
                        ...moreDetails,
                        ...location.state,
                        date: moment(location.state.date).format("YYYY-MM-DD"),
                        provider_id,
                    })
                );
            } else if (
                is_hourly == false &&
                location.state.service_type != ServiceType.MOVING
            ) {
                let formData = new FormData();
                formData.append("is_hourly", 0);
                formData.append("address", address);
                detail && formData.append("detail", detail);
                if (state.images.length > 0) {
                    for (const file of state?.images) {
                        formData.append("images[]", file);
                    }
                }
                formData.append(
                    "questions",
                    JSON.stringify(props.location.state)
                );
                formData.append("provider_id", provider_id);
                dispatch(postRequestService(formData, true));
            }
        } else {
            setState((state) => ({
                ...state,
                questionsErr: (
                    <center
                        className="col-md-12 alert alert-danger"
                        role="alert"
                        style={{ fontSize: 15 }}
                    >
                        please select category and select questions from header
                    </center>
                ),
            }));
        }
    };

    const handleGoToServicesHistory = () => {
        dispatch(getInitialRequestService());
        props.history.replace({
            pathname: "/services-history",
        });
    };

    const handleCloseModalClick = () => {
        setOpen(false);
        setState((state) => ({
            ...state,
            is_hourly: "",
            selectedSlot: "",
            address: "",
            hours: "",
            token: "",
            previewImages: [],
        }));
        dispatch(getInitialRequestService());
    };

    const handleImagesChange = (e) => {
        let matcher = true;
        var regExp = new RegExp("image.(jpeg|png|jpg|gif|svg|bmp)", "i");
        let images = e.target.files;
        setState((state) => ({ ...state, previewImages: [] }));
        let previewImages = [];
        if (images.length > 0 && images.length < 11) {
            for (const image of images) {
                matcher = regExp.test(image.type);
                previewImages.push(URL.createObjectURL(image));
                if (!matcher) {
                    break;
                }
            }
        } else {
            matcher = false;
        }
        if (matcher == true) {
            setState({ ...state, images, previewImages });
        } else {
            setState({ ...state, images: [], previewImages: [] });
        }
    };

    const handleMoreDetailChange = (e) => {
        const { name, value } = e.target;
        if (name == "phone") {
            let regex =
                /^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/;
            if (regex.test(value)) {
                setState({
                    ...state,
                    [`${name}Err`]: "",
                });
            } else {
                setState({
                    ...state,
                    [`${name}Err`]:
                        value == "" ? "Required" : "e.g. +923331234567",
                });
            }
        }
        setState((state) => ({ ...state, [name]: value }));
    };

    const handleLoadMoreClick = (page) => {
        dispatch(
            getProviderList(
                !!location?.search && `${location?.search}&page=${page}`
            )
        );
        window.scrollTo(0, 0);
    };

    return (
        <>
            {/* <div className="breadcrumb-sec-2 d-flex align-items-center justify-content-center flex-column">
                    <div className="title">Our Home Cleaning Service Providers</div>
                    <div className="detail">
                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat<br /> duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                    </div>
                </div> */}

            <Loading
                loading={
                    movingLoading == true ||
                    (providerList?.error == false && providerList == undefined)
                }
            />
            <section className="service-provider-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4" style={{ zIndex: 0 }}>
                            <div className="sticky-top">
                                <div className="service-time-box">
                                    <div className="date-ser mb-4">
                                        <div className="title-servic px-2">
                                            Date
                                        </div>

                                        <div className="time-list-pro">
                                            <div className="mx-2 select-time">
                                                Today
                                            </div>
                                            <div className="mx-2 select-time">
                                                Within 3 days
                                            </div>
                                            <div className="mx-2 select-time">
                                                Within a week
                                            </div>
                                            <div className="mx-2 select-time">
                                                Chose Dates
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="title-servic px-2 mt-4">
                                        Timming
                                    </div>
                                    <ul className="time-list mt-4 d-flex align-items-center justify-content-between flex-wrap">
                                        <li className="d-flex align-items-center justify-content-center">
                                            Morning (8AM - 12PM)
                                        </li>
                                        <li className="d-flex align-items-center justify-content-center">
                                            Afternoon (12PM - 5PM)
                                        </li>
                                        <li className="d-flex align-items-center justify-content-center">
                                            Afternoon (12PM - 5PM)
                                        </li>
                                    </ul>

                                    <div className="common-input mb-4 ml-3 w-auto">
                                        <select name="" id="">
                                            <option value="">
                                                Choose specific time
                                            </option>
                                            <option value="">
                                                Choose specific time
                                            </option>
                                            <option value="">
                                                Choose specific time
                                            </option>
                                            <option value="">
                                                Choose specific time
                                            </option>
                                            <option value="">
                                                Choose specific time
                                            </option>
                                        </select>
                                    </div>

                                    <hr />

                                    <div className="title-servic px-2 mt-4">
                                        How often
                                    </div>
                                    <div className="time-list-pro">
                                        <div className="mx-2 select-time">
                                            Weekly
                                        </div>
                                        <div className="mx-2 select-time">
                                            Every 2 Weeks
                                        </div>
                                        <div className="mx-2 select-time">
                                            Every 4 Weeks
                                        </div>
                                        <div className="mx-2 select-time">
                                            Just Once
                                        </div>
                                    </div>
                                    <div className="ser-des">
                                        Amet minim mollit non deserunt ullamco
                                        est sit aliqua dolor do amet sint. Velit
                                        officia consequat duis enim velit
                                        mollit. Exercitation veniam consequat
                                        sunt nostrud amet.
                                    </div>

                                    <hr />

                                    <ul className="time-list mt-4 d-flex align-items-start flex-column">
                                        <li className="d-flex align-items-center justify-content-center">
                                            Elite Tasker
                                        </li>
                                        <li className="d-flex align-items-center justify-content-center">
                                            Great Value
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            {state.error}
                            {state.loggedinErr}
                            {providerList !== undefined &&
                            providerList !== null &&
                            providerList.error !== undefined &&
                            providerList.error === false &&
                            providerList?.data?.data?.length ? (
                                providerList.data.data.map(
                                    (provider, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="job-provider-card"
                                            >
                                                <div className="user-des d-flex align-items-center justify-content-start w-100">
                                                    <div className="user-img d-flex align-items-center justify-content-center">
                                                        <img
                                                            src={
                                                                (provider.image &&
                                                                    `${process.env.REACT_APP_API_BASE_URL}${provider.image}`) ||
                                                                ""
                                                            }
                                                            onError={(e) => {
                                                                e.target.onerror =
                                                                    null;
                                                                e.target.src =
                                                                    "/assets/img/Profile_avatar.png";
                                                            }}
                                                            className="img-fluid"
                                                            alt="Not Found"
                                                        />
                                                    </div>
                                                    <div className="user-detail w-100">
                                                        <div className=" w-100 d-flex align-items-center justify-content-between">
                                                            <div className="title">
                                                                {
                                                                    provider.first_name
                                                                }{" "}
                                                                {
                                                                    provider.last_name
                                                                }
                                                            </div>
                                                            <Link
                                                                to={`/provider/profile/${provider.id}`}
                                                                className="button-common"
                                                            >
                                                                View Profile
                                                            </Link>
                                                        </div>
                                                        <div className="job-status">
                                                            {
                                                                provider.provider_service_requests_count
                                                            }{" "}
                                                            Jobs Completed
                                                        </div>
                                                        <div className="stars-rating w-100  d-flex align-items-center justify-content-between">
                                                            <Rating
                                                                rating={
                                                                    provider?.rating
                                                                }
                                                            />

                                                            {props.location
                                                                .state !==
                                                                undefined &&
                                                            state.is_loggedin ===
                                                                true ? (
                                                                <button
                                                                    onClick={(
                                                                        event
                                                                    ) => {
                                                                        if (
                                                                            location
                                                                                .state
                                                                                .service_type ==
                                                                            ServiceType.MOVING
                                                                        ) {
                                                                            props?.history?.push(
                                                                                {
                                                                                    pathname:
                                                                                        "/moving-request",
                                                                                    state: {
                                                                                        date: location
                                                                                            ?.state
                                                                                            ?.date,
                                                                                        end_lat:
                                                                                            location
                                                                                                ?.state
                                                                                                ?.end_lat,
                                                                                        end_lng:
                                                                                            location
                                                                                                ?.state
                                                                                                ?.end_lng,
                                                                                        from_address:
                                                                                            location
                                                                                                ?.state
                                                                                                ?.from_address,
                                                                                        service_type:
                                                                                            location
                                                                                                ?.state
                                                                                                ?.service_type,
                                                                                        start_lat:
                                                                                            location
                                                                                                ?.state
                                                                                                ?.start_lat,
                                                                                        start_lng:
                                                                                            location
                                                                                                ?.state
                                                                                                ?.start_lng,
                                                                                        to_address:
                                                                                            location
                                                                                                ?.state
                                                                                                ?.to_address,
                                                                                        provider_id:
                                                                                            provider.id,
                                                                                        sub_service_id:
                                                                                            location
                                                                                                ?.state
                                                                                                ?.sub_service_id,
                                                                                        vehicle_type_id:
                                                                                            location
                                                                                                ?.state
                                                                                                ?.vehicle_type_id,
                                                                                        zip_code:
                                                                                            location
                                                                                                ?.state
                                                                                                ?.zip_code,
                                                                                        date: moment(
                                                                                            location
                                                                                                .state
                                                                                                .date
                                                                                        ).format(
                                                                                            "YYYY-MM-DD"
                                                                                        ),
                                                                                    },
                                                                                }
                                                                            );
                                                                            return;
                                                                        }
                                                                        handleContinueClick(
                                                                            event,
                                                                            provider.account_type ===
                                                                                "BASIC" &&
                                                                                provider
                                                                                    ?.provider_profile
                                                                                    ?.hourly_rate
                                                                                ? true
                                                                                : false,
                                                                            provider,
                                                                            provider?.provider_service_requests_count
                                                                        );
                                                                    }}
                                                                    value={
                                                                        provider.id
                                                                    }
                                                                    type="button"
                                                                    data-backdrop="static"
                                                                    data-keyboard="false"
                                                                    className="button-common-2"
                                                                    data-toggle="modal"
                                                                    data-target={
                                                                        location
                                                                            .state
                                                                            .service_type !=
                                                                            ServiceType.MOVING &&
                                                                        (provider.account_type ===
                                                                            "BASIC" &&
                                                                        provider
                                                                            ?.provider_profile
                                                                            ?.hourly_rate
                                                                            ? "#hourly"
                                                                            : "#quotation")
                                                                    }
                                                                    disabled={
                                                                        (location
                                                                            ?.state
                                                                            ?.service_type &&
                                                                            (location
                                                                                ?.state
                                                                                ?.service_type ==
                                                                                ServiceType.MOVING &&
                                                                            provider.service_type ==
                                                                                ServiceType.MOVING
                                                                                ? false
                                                                                : true)) ||
                                                                        (provider.account_type ===
                                                                            "BASIC" &&
                                                                            provider
                                                                                ?.provider_profile
                                                                                ?.hourly_rate &&
                                                                            provider?.provider_schedules_count ==
                                                                                0 &&
                                                                            provider.service_type !=
                                                                                ServiceType.MOVING)
                                                                    }
                                                                >
                                                                    {(() => {
                                                                        if (
                                                                            provider.service_type ==
                                                                            ServiceType.MOVING
                                                                        ) {
                                                                            return "Get a Qoutation";
                                                                        } else if (
                                                                            provider.account_type ===
                                                                                "BASIC" &&
                                                                            provider
                                                                                ?.provider_profile
                                                                                ?.hourly_rate &&
                                                                            provider.service_type !=
                                                                                ServiceType.MOVING
                                                                        ) {
                                                                            return provider?.provider_schedules_count >
                                                                                0
                                                                                ? "Make a Request"
                                                                                : "Not Available";
                                                                        } else {
                                                                            return "Get a Qoutation";
                                                                        }
                                                                    })()}
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    type="button"
                                                                    className="button-common-2"
                                                                    onClick={(
                                                                        event
                                                                    ) =>
                                                                        handleContinueClick(
                                                                            event,
                                                                            provider.account_type ===
                                                                                "BASIC"
                                                                                ? true
                                                                                : false,
                                                                            provider
                                                                        )
                                                                    }
                                                                >
                                                                    {provider.account_type ===
                                                                    "BASIC"
                                                                        ? "Make a Request"
                                                                        : "Get a Qoutation"}
                                                                </button>
                                                            )}
                                                        </div>
                                                        <div className="user-price">
                                                            {!!provider
                                                                ?.provider_profile
                                                                ?.hourly_rate &&
                                                            provider.service_type !=
                                                                ServiceType.MOVING
                                                                ? `$${provider?.provider_profile?.hourly_rate}`
                                                                : ""}
                                                        </div>
                                                    </div>
                                                </div>
                                                {provider.bio !== undefined &&
                                                    provider
                                                        ?.user_feedbacks[0] !==
                                                        undefined && <hr />}
                                                {provider.bio && (
                                                    <div className="useer-qust">
                                                        <div className="title">
                                                            Bio
                                                        </div>
                                                        <div className="des">
                                                            {provider.bio}
                                                        </div>
                                                    </div>
                                                )}
                                                <>
                                                    {(() => {
                                                        if (
                                                            provider
                                                                ?.user_feedbacks[0] !==
                                                            undefined
                                                        ) {
                                                            return (
                                                                <div className="top-reviews-list">
                                                                    <div className="review-title">
                                                                        Top
                                                                        Review
                                                                    </div>
                                                                    <div className="review-item d-flex align-itmes-centetr justifu-content-between">
                                                                        <div className="review-img">
                                                                            <img
                                                                                src={
                                                                                    (provider
                                                                                        ?.user_feedbacks[0]
                                                                                        ?.user
                                                                                        ?.image &&
                                                                                        process
                                                                                            .env
                                                                                            .REACT_APP_API_BASE_URL +
                                                                                            provider
                                                                                                ?.user_feedbacks[0]
                                                                                                ?.user
                                                                                                ?.image) ||
                                                                                    ""
                                                                                }
                                                                                className="img-fluid"
                                                                                alt="Not have"
                                                                                onError={(
                                                                                    e
                                                                                ) => {
                                                                                    e.target.onerror =
                                                                                        null;
                                                                                    e.target.src =
                                                                                        "/assets/img/Profile_avatar.png";
                                                                                }}
                                                                            />
                                                                        </div>
                                                                        {provider
                                                                            ?.user_feedbacks[0] && (
                                                                            <>
                                                                                <div className="review-detail">
                                                                                    {
                                                                                        provider
                                                                                            ?.user_feedbacks[0]
                                                                                            .comment
                                                                                    }
                                                                                </div>
                                                                                <div className="review-rating">
                                                                                    {/* ldskjflksdjflksdj */}
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    })()}
                                                </>
                                            </div>
                                        );
                                    }
                                )
                            ) : providerList.error === true ? (
                                <>
                                    {(() => {
                                        Swal.fire({
                                            title: "Error",
                                            text:
                                                serviceRequest?.message ||
                                                "Not found provider",
                                            confirmButtonText: "Close",
                                            icon: "error",
                                            confirmButtonColor: "#fea629",
                                        });
                                    })()}
                                    <div className="text-center display-4">
                                        {providerList.message}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center display-4">
                                    Please Wait we are working on it . . .
                                </div>
                            )}
                            {providerList?.data?.current_page !=
                                providerList?.data?.last_page && (
                                <center>
                                    <button
                                        className="button-common"
                                        onClick={() =>
                                            handleLoadMoreClick(
                                                providerList?.data
                                                    ?.current_page + 1
                                            )
                                        }
                                    >
                                        Load More
                                    </button>
                                </center>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div
                className="modal fade bd-example-modal-lg"
                id="hourly"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered modal-lg"
                    role="document"
                >
                    <div className="modal-content rqst-q-modal">
                        <div className="modal-header">
                            <div className="job-provider-card border-0 shadow-none w-100 mb-0 p-5">
                                <div className="user-des d-flex align-items-center justify-content-start w-100">
                                    <div className="user-img d-flex align-items-center justify-content-center">
                                        <img
                                            src={
                                                (state?.provider?.image &&
                                                    HOST +
                                                        state?.provider
                                                            ?.image) ||
                                                ""
                                            }
                                            className="img-fluid"
                                            alt="Not Found"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src =
                                                    "/assets/img/Profile_avatar.png";
                                            }}
                                        />
                                    </div>
                                    <div className="user-detail w-100 d-flex align-items-center justify-content-between">
                                        <div>
                                            <div className=" w-100 ">
                                                <div className="title">
                                                    {
                                                        state?.provider
                                                            ?.first_name
                                                    }{" "}
                                                    {state?.provider?.last_name}
                                                </div>
                                            </div>
                                            <div className="job-status">
                                                {
                                                    state?.provider_service_requests_count
                                                }{" "}
                                                Jobs Completed
                                            </div>
                                            <Rating
                                                rating={5}
                                                justify="start"
                                            />
                                            {/* <div className="stars-rating w-100  d-flex align-items-center justify-content-between">
                                                <div className="star-rating-area">
                                                    <div className="star-rating-area d-flex align-items-center justify-content-center">
                                                        <div
                                                            className="rating-static clearfix mr-3"
                                                            rel="4.6"
                                                        >
                                                            <label
                                                                className="full"
                                                                title="{{ 'Awesome - 5 stars' | translate }}"
                                                            ></label>
                                                            <label
                                                                className="half"
                                                                title="{{ 'Excellent - 4.5 stars' | translate }}"
                                                            ></label>
                                                            <label
                                                                className="full"
                                                                title="{{ 'Excellent - 4 stars' | translate }}"
                                                            ></label>
                                                            <label
                                                                className="half"
                                                                title="{{ 'Better - 3.5 stars' | translate }}"
                                                            ></label>
                                                            <label
                                                                className="full"
                                                                title="{{ 'Good - 3 stars' | translate }}"
                                                            ></label>
                                                            <label
                                                                className="half"
                                                                title="{{ 'Good - 2.5 stars' | translate }}"
                                                            ></label>
                                                            <label
                                                                className="full"
                                                                title="{{ 'Fair - 2 stars' | translate }}"
                                                            ></label>
                                                            <label
                                                                className="half"
                                                                title="{{ 'Fair - 1.5 stars' | translate }}"
                                                            ></label>
                                                            <label
                                                                className="full"
                                                                title="{{ 'Bad - 1 star' | translate }}"
                                                            ></label>
                                                            <label
                                                                className="half"
                                                                title="{{ 'Bad - 0.5 stars' | translate }}"
                                                            ></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>

                                        {/* <a className="button-common" href="#">
                                            Select & Continue
                                        </a> */}
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="close modal-close-btn"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M18.2003 0.308788L10 8.50904L1.79974 0.308789C1.60203 0.111076 1.33387 1.42189e-06 1.05427 1.42189e-06C0.774658 1.42189e-06 0.5065 0.111076 0.308787 0.308789C0.111074 0.506502 0 0.774659 0 1.05427C0 1.33388 0.111074 1.60203 0.308787 1.79974L8.50904 10L0.308788 18.2003C0.111075 18.398 8.88678e-08 18.6661 8.88678e-08 18.9457C8.88678e-08 19.2253 0.111075 19.4935 0.308788 19.6912C0.401995 19.7918 0.515676 19.8712 0.642169 19.9241C0.768663 19.977 0.90503 20.0022 1.04208 19.998C1.17913 19.9937 1.31368 19.9602 1.43666 19.8995C1.55964 19.8389 1.6682 19.7526 1.75502 19.6465L9.95527 11.4462L18.2003 19.6912C18.398 19.8889 18.6661 20 18.9457 20C19.2253 20 19.4935 19.8889 19.6912 19.6912C19.8889 19.4935 20 19.2253 20 18.9457C20 18.6661 19.8889 18.398 19.6912 18.2003L11.491 10L19.6912 1.79974C19.8889 1.60203 20 1.33387 20 1.05427C20 0.774658 19.8889 0.506501 19.6912 0.308788C19.4935 0.111075 19.2253 0 18.9457 0C18.6661 0 18.398 0.111075 18.2003 0.308788Z"
                                        fill="#606060"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <center className="col-12">
                                            {state.questionsErr}
                                        </center>
                                        {/* {state.serviceRequest !== undefined && state.serviceRequest.error === true ? (
                                            <center className="col-12 ">
                                                <div className="col-12  alert alert-danger" role="alert" style={{fontSize: 15}}>
                                                    {state.serviceRequest.message}
                                                </div>
                                            </center>
                                        ) : (
                                            ''
                                        )}
                                        {state.serviceRequest !== undefined && state.serviceRequest.error === false ? (
                                            <center className="col-12 ">
                                                <div className="col-12  alert alert-success" role="alert" style={{ fontSize: 15 }}>
                                                    {state.serviceRequest.message}
                                                </div>
                                            </center>
                                        ) : (
                                            ''
                                        )} */}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 align-items-center justify-content-center">
                                            <div
                                                style={{
                                                    marginLeft: 25,
                                                    fontSize: "1.5em",
                                                }}
                                            >
                                                {providerSchedule?.loading && (
                                                    <div className="text-center">
                                                        <i
                                                            className="fa fa-spinner fa-pulse fa-2x"
                                                            // aria-hidden="true"
                                                        ></i>{" "}
                                                        Loading...
                                                    </div>
                                                )}
                                                {providerSchedule?.error && (
                                                    <div className="text-center text-danger">
                                                        <i className="fa fa-exclamation-triangle fa-2x"></i>{" "}
                                                        {providerSchedule?.message ||
                                                            "No Schedule Found"}
                                                    </div>
                                                )}
                                                {(() => {
                                                    const available = `.DayPicker-Day--highlighted {
                                                                            background-color: orange;
                                                                            color: black;
                                                                            }`;

                                                    const modifiers = {
                                                        highlighted: [
                                                            ...(providerSchedule?.data?.data?.map(
                                                                (schedule) => {
                                                                    if (
                                                                        moment(
                                                                            moment().format(
                                                                                "YYYY-MM-DD"
                                                                            )
                                                                        ).isSameOrBefore(
                                                                            moment(
                                                                                new Date(
                                                                                    `${schedule?.provider_schedule?.year}-${schedule?.provider_schedule?.month}-${schedule?.provider_schedule?.date}`
                                                                                )
                                                                            )
                                                                        )
                                                                    ) {
                                                                        return new Date(
                                                                            `${schedule?.provider_schedule?.year}-${schedule?.provider_schedule?.month}-${schedule?.provider_schedule?.date}`
                                                                        );
                                                                    }
                                                                }
                                                            ) || []),
                                                        ],
                                                    };

                                                    const disabledDays = [
                                                        ...(providerSchedule?.data?.data?.map(
                                                            (schedule) => {
                                                                if (
                                                                    moment(
                                                                        moment().format(
                                                                            "YYYY-MM-DD"
                                                                        )
                                                                    ).isSameOrBefore(
                                                                        moment(
                                                                            new Date(
                                                                                `${schedule?.provider_schedule?.year}-${schedule?.provider_schedule?.month}-${schedule?.provider_schedule?.date}`
                                                                            )
                                                                        )
                                                                    )
                                                                ) {
                                                                    return new Date(
                                                                        `${schedule?.provider_schedule?.year}-${schedule?.provider_schedule?.month}-${schedule?.provider_schedule?.date}`
                                                                    );
                                                                }
                                                            }
                                                        ) || []),
                                                    ];
                                                    function isDayDisabled(
                                                        day
                                                    ) {
                                                        return !disabledDays.some(
                                                            (disabledDay) =>
                                                                DateUtils.isSameDay(
                                                                    day,
                                                                    disabledDay
                                                                ) &&
                                                                !DateUtils.isDayBefore(
                                                                    day,
                                                                    new Date()
                                                                )
                                                        );
                                                    }

                                                    return (
                                                        <div>
                                                            <style>
                                                                {available}
                                                            </style>
                                                            <DayPicker
                                                                showOutsideDays
                                                                modifiers={
                                                                    modifiers
                                                                }
                                                                month={
                                                                    new Date()
                                                                }
                                                                selectedDays={
                                                                    value
                                                                }
                                                                disabledDays={
                                                                    isDayDisabled
                                                                }
                                                                fromMonth={
                                                                    new Date()
                                                                }
                                                                onDayClick={(
                                                                    day,
                                                                    {
                                                                        highlighted,
                                                                    }
                                                                ) => {
                                                                    if (
                                                                        highlighted
                                                                    ) {
                                                                        handleCalendarClick(
                                                                            day
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                        // <DayPicker
                                                        //     fromMonth={new Date()}
                                                        //     selectedDays={[
                                                        //         ...(providerSchedule?.data?.data?.map(
                                                        //             (schedule) => {
                                                        //                 return new Date(
                                                        //                     `${schedule?.provider_schedule?.year}-${schedule?.provider_schedule?.month}-${schedule?.provider_schedule?.date}`
                                                        //                 );
                                                        //             }
                                                        //         ) || []),
                                                        //     ]}
                                                        //     disabledDays={[
                                                        //         { before: new Date() },
                                                        //         {
                                                        //             ...(providerSchedule?.data?.data?.map(
                                                        //                 (
                                                        //                     schedule,
                                                        //                     index
                                                        //                 ) => {
                                                        //                     return {
                                                        //                         afterAll:
                                                        //                             new Date(
                                                        //                                 `${schedule?.provider_schedule?.year}-${schedule?.provider_schedule?.month}-${schedule?.provider_schedule?.date}`
                                                        //                             ),
                                                        //                     };
                                                        //                 }
                                                        //             ) || {
                                                        //                 after: new Date(),
                                                        //             }),
                                                        //         },
                                                        //     ]}
                                                        // />
                                                        // <Calendar
                                                        //     onChange={
                                                        //         handleCalendarClick
                                                        //     }
                                                        //     minDate={mindate}
                                                        //     maxDate={maxDate}
                                                        //     value={value}
                                                        //     maxDetail="month"
                                                        //     // tileDisabled={({
                                                        //     //     activeStartDate,
                                                        //     //     date,
                                                        //     //     view,
                                                        //     // }) =>
                                                        //     //     date.getDay() ===
                                                        //     //     mindate.getDate()
                                                        //     // }
                                                        // />
                                                    );
                                                })()}
                                            </div>
                                        </div>
                                        <div
                                            className="col-md-6 justify-center"
                                            style={{ marginLeft: -20 }}
                                        >
                                            <div className="common-input ml-3 w-auto">
                                                <select
                                                    className="hours"
                                                    id=""
                                                    onChange={handleHoursClick}
                                                >
                                                    <option defaultValue>
                                                        please select hours
                                                    </option>
                                                    {[...Array(12).keys()].map(
                                                        (index) => (
                                                            <option
                                                                key={index + 1}
                                                                value={
                                                                    index + 1
                                                                }
                                                            >
                                                                {`${
                                                                    index + 1
                                                                } hours`}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                            <ul className="time-list d-flex align-items-center justify-content-center flex-wrap">
                                                <li
                                                    style={{
                                                        backgroundColor:
                                                            "#2F88E7",
                                                        color: "white",
                                                    }}
                                                    className="d-flex align-items-center justify-content-center col-8 m-4"
                                                >
                                                    {" "}
                                                    Available time Slots
                                                </li>
                                                {/* {slots.map((time, index) =>{
                                                    let slot = state?.timeSlots?.find((slot) => slot.start === time || slot.end === time);
                                                    return(
                                                        <React.Fragment key={index}>
                                                            {slot ? (
                                                                <li style={{backgroundColor: "#2F88E7", color: 'white'}} onClick={handleSlotClick} slot-id={slot.id} value={time} className="d-flex align-items-center justify-content-center">{time}</li>
                                                                ) : (
                                                                <li style={{color: 'black'}} value={time} className="d-flex align-items-center justify-content-center">{time}</li>
                                                            )}
                                                        </React.Fragment>

                                                    )}
                                                )} */}
                                                {state !== undefined &&
                                                state.timeSlots !==
                                                    undefined ? (
                                                    state.timeSlots.map(
                                                        (slot, index) => {
                                                            return (
                                                                <React.Fragment
                                                                    key={index}
                                                                >
                                                                    {state.selectedSlot ==
                                                                    slot.id ? (
                                                                        <li
                                                                            key={
                                                                                index
                                                                            }
                                                                            style={{
                                                                                backgroundColor:
                                                                                    "#2F88E7",
                                                                                color: "white",
                                                                            }}
                                                                            onClick={
                                                                                handleSlotClick
                                                                            }
                                                                            value={
                                                                                slot.id
                                                                            }
                                                                            className="d-flex align-items-center justify-content-center m-2 col-5"
                                                                        >
                                                                            {
                                                                                slot.start
                                                                            }
                                                                        </li>
                                                                    ) : (
                                                                        <li
                                                                            key={
                                                                                index
                                                                            }
                                                                            style={{
                                                                                color: "black",
                                                                            }}
                                                                            onClick={
                                                                                handleSlotClick
                                                                            }
                                                                            value={
                                                                                slot.id
                                                                            }
                                                                            className="d-flex align-items-center justify-content-center m-2 col-5"
                                                                        >
                                                                            {
                                                                                slot.start
                                                                            }
                                                                        </li>
                                                                    )}
                                                                </React.Fragment>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <center
                                                        className="col-12 text-dark"
                                                        style={{ fontSize: 20 }}
                                                    >
                                                        Not Available
                                                    </center>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div
                                            className="col-md-11 mx-auto text-dark mb-2 mb-2"
                                            style={{ fontSize: 20 }}
                                        >
                                            Address
                                        </div>
                                        <div className="common-input col-md-11 mx-auto">
                                            <PlacesAutocomplete
                                                value={state.address}
                                                onChange={(address) =>
                                                    setState((state) => ({
                                                        ...state,
                                                        address,
                                                    }))
                                                }
                                                onSelect={handleAddressChange}
                                                googleCallbackName="initOne"
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
                                                                placeholder:
                                                                    "From ...",
                                                                className:
                                                                    "location-search-input m-1",
                                                            })}
                                                        />
                                                        <div className="autocomplete-dropdown-container">
                                                            {loading && (
                                                                <div>
                                                                    Loading...
                                                                </div>
                                                            )}
                                                            {suggestions.map(
                                                                (
                                                                    suggestion
                                                                ) => {
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
                                            {/* <input type="text" onChange={handleAddressChange} name="address" value={state.address} placeholder="Address" /> */}
                                        </div>
                                        {state.addressErr}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="button-common"
                                onClick={handleCloseModalClick}
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                data-dismiss="modal"
                                disabled={
                                    !state.selectedSlot ||
                                    state.addressErr !== "" ||
                                    state.address === "" ||
                                    state.submitting === true
                                        ? true
                                        : false
                                }
                                onClick={handleAddPaymentClick}
                                type="button"
                                className="button-common-2"
                            >
                                Add payment detail
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade bd-example-modal-lg"
                id="quotation"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered modal-lg"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title display-4"
                                id="exampleModalLongTitle"
                            >
                                Service Request
                            </h5>
                            {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button> */}
                        </div>
                        <div className="modal-body">
                            {/* <div className="row">
                            </div> */}
                            <div className="row m-2">
                                <div className="col-12">
                                    <center className="col-12">
                                        {state.questionsErr}
                                    </center>
                                    {serviceRequest != "" &&
                                        (() => {
                                            if (
                                                serviceRequest.error == false &&
                                                serviceRequest.loading == true
                                            ) {
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

                                            if (
                                                serviceRequest.error == true &&
                                                serviceRequest.loading == false
                                            ) {
                                                switch (
                                                    typeof serviceRequest.message
                                                ) {
                                                    case "string":
                                                        Swal.fire({
                                                            title: "Error",
                                                            text:
                                                                serviceRequest.message ||
                                                                "something went wrong",
                                                            confirmButtonText:
                                                                "Close",
                                                            icon: "error",
                                                            confirmButtonColor:
                                                                "#fea629",
                                                        });
                                                        return (
                                                            <div
                                                                className="col-12  alert alert-danger text-center"
                                                                role="alert"
                                                                style={{
                                                                    fontSize: 15,
                                                                }}
                                                            >
                                                                {
                                                                    serviceRequest.message
                                                                }
                                                            </div>
                                                        );
                                                        break;
                                                    case "array":
                                                        const errorMsg =
                                                            Object.values(
                                                                serviceRequest.message
                                                            );
                                                        return (
                                                            <div
                                                                className="col-12  alert alert-danger text-center"
                                                                role="alert"
                                                                style={{
                                                                    fontSize: 15,
                                                                }}
                                                            >
                                                                {errorMsg.map(
                                                                    (
                                                                        msg,
                                                                        index
                                                                    ) => (
                                                                        <React.Fragment
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {
                                                                                msg
                                                                            }
                                                                        </React.Fragment>
                                                                    )
                                                                )}
                                                            </div>
                                                        );
                                                        break;
                                                }
                                            }

                                            if (
                                                serviceRequest.error == false &&
                                                serviceRequest.loading == false
                                            ) {
                                                switch (
                                                    typeof serviceRequest.message
                                                ) {
                                                    case "string":
                                                        qautationRef.current.click();
                                                        Swal.fire({
                                                            title: "Success!",
                                                            text: "Successfully created request service",
                                                            confirmButtonText:
                                                                "Go To Service History",
                                                            icon: "success",
                                                            confirmButtonColor:
                                                                "#fea629",
                                                        }).then((result) => {
                                                            if (
                                                                result.isConfirmed
                                                            ) {
                                                                handleGoToServicesHistory();
                                                            }
                                                        });
                                                        return (
                                                            <div
                                                                className="col-12  alert alert-success text-center"
                                                                role="alert"
                                                                style={{
                                                                    fontSize: 15,
                                                                }}
                                                            >
                                                                {
                                                                    "Service request sent successfully"
                                                                }
                                                            </div>
                                                        );
                                                        break;
                                                }
                                            }
                                        })()}
                                    {serviceRequest?.error == false &&
                                    serviceRequest?.loading == false &&
                                    serviceRequest.message ? (
                                        ""
                                    ) : (
                                        <>
                                            <div
                                                className="col-md-12 text-dark mb-2"
                                                style={{ fontSize: 20 }}
                                            >
                                                Address
                                            </div>
                                            <div className="common-input">
                                                <PlacesAutocomplete
                                                    googleCallbackName="initTwo"
                                                    value={state.address}
                                                    onChange={(address) =>
                                                        setState((state) => ({
                                                            ...state,
                                                            address,
                                                        }))
                                                    }
                                                    onSelect={
                                                        handleAddressChange
                                                    }
                                                >
                                                    {({
                                                        getInputProps,
                                                        suggestions,
                                                        getSuggestionItemProps,
                                                        loading,
                                                    }) => (
                                                        <div>
                                                            <input
                                                                {...getInputProps(
                                                                    {
                                                                        placeholder:
                                                                            "From ...",
                                                                        className:
                                                                            "location-search-input m-1",
                                                                    }
                                                                )}
                                                            />
                                                            <div className="autocomplete-dropdown-container">
                                                                {loading && (
                                                                    <div>
                                                                        Loading...
                                                                    </div>
                                                                )}
                                                                {suggestions.map(
                                                                    (
                                                                        suggestion
                                                                    ) => {
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
                                                {/* <input type="text" onChange={handleAddressChange} name="address" value={state.address} placeholder="Address" /> */}
                                            </div>
                                            {state.addressErr}
                                            <div
                                                className="col-md-12 text-dark mb-2"
                                                style={{ fontSize: 20 }}
                                            >
                                                Details
                                            </div>
                                            <div className="common-input">
                                                <textarea
                                                    type="text"
                                                    onChange={
                                                        handleDetailChange
                                                    }
                                                    name="detail"
                                                    value={detail}
                                                    placeholder="please add some details..."
                                                />
                                            </div>
                                            <div
                                                className="col-md-12 text-danger mt-2"
                                                style={{ fontSize: 15 }}
                                            >
                                                {detailErr}
                                            </div>
                                            <input
                                                type="file"
                                                accept=".jpeg,.png,.jpg,.svg"
                                                name="images"
                                                id="file"
                                                className="inputfile"
                                                onChange={handleImagesChange}
                                                multiple={true}
                                            />
                                            <label htmlFor="file">
                                                Choose Images
                                            </label>
                                            {/* <div className='col-md-12 text-danger mt-2' style={{ fontSize: 15 }}>{"imagesErr"}</div> */}
                                            <div className="text-center">
                                                <div className="row">
                                                    <div className="col-md-12 d-flex justify-content-around">
                                                        {state?.previewImages.map(
                                                            (image, index) => (
                                                                <img
                                                                    key={index}
                                                                    src={image}
                                                                    className="rounded col-md-4"
                                                                    alt="..."
                                                                    style={{
                                                                        height: "27.5rem",
                                                                    }}
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="button-common"
                                onClick={handleCloseModalClick}
                                data-dismiss="modal"
                                ref={qautationRef}
                            >
                                Close
                            </button>
                            <button
                                data-dismiss={
                                    serviceRequest.message == "success"
                                        ? "modal"
                                        : ""
                                }
                                disabled={
                                    state.addressErr !== "" ||
                                    state.address === "" ||
                                    detailErr ||
                                    state.submitting === true
                                        ? true
                                        : false || detail == ""
                                }
                                onClick={
                                    serviceRequest.message == "success"
                                        ? handleGoToServicesHistory
                                        : handleAddPaymentClick
                                }
                                type="button"
                                className="button-common-2"
                            >
                                {serviceRequest.message == "success"
                                    ? "Go to Services History"
                                    : "Get Quotation"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade bd-example-modal-lg"
                id="moving"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3
                                className="modal-title display-4"
                                id="exampleModalLongTitle"
                            >
                                Moving Request
                            </h3>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                ref={movingRef}
                                onClick={handleCloseModalClick}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* <div className="row">
                            </div> */}
                            <div className="row m-2">
                                <div className="col-12">
                                    {movingRequest != undefined &&
                                        (() => {
                                            if (
                                                movingError == false &&
                                                movingLoading == true
                                            ) {
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

                                            if (
                                                movingError == true &&
                                                movingLoading == false
                                            ) {
                                                switch (typeof movingMessage) {
                                                    case "string":
                                                        return (
                                                            <div
                                                                className="col-12  alert alert-danger text-center"
                                                                role="alert"
                                                                style={{
                                                                    fontSize: 15,
                                                                }}
                                                            >
                                                                {movingMessage}
                                                            </div>
                                                        );
                                                        break;
                                                    case "object":
                                                        const errorMsg =
                                                            Object.values(
                                                                movingMessage
                                                            );
                                                        return (
                                                            <div
                                                                className="col-12  alert alert-danger text-center"
                                                                role="alert"
                                                                style={{
                                                                    fontSize: 15,
                                                                }}
                                                            >
                                                                {errorMsg.map(
                                                                    (
                                                                        msg,
                                                                        index
                                                                    ) => (
                                                                        <React.Fragment
                                                                            key={
                                                                                index
                                                                            }
                                                                            style={{
                                                                                fontSize: 15,
                                                                            }}
                                                                        >
                                                                            {
                                                                                msg
                                                                            }
                                                                            <br />
                                                                        </React.Fragment>
                                                                    )
                                                                )}
                                                            </div>
                                                        );
                                                        break;
                                                }
                                            }

                                            if (
                                                movingError == false &&
                                                movingLoading == false
                                            ) {
                                                switch (typeof movingMessage) {
                                                    case "string":
                                                        return (
                                                            <div
                                                                className="col-12  alert alert-success text-center"
                                                                role="alert"
                                                                style={{
                                                                    fontSize: 15,
                                                                }}
                                                            >
                                                                {movingMessage ==
                                                                "OK"
                                                                    ? "Request Successfully Sent"
                                                                    : movingMessage}
                                                            </div>
                                                        );
                                                        break;
                                                }
                                            }
                                        })()}
                                    {/* {movingError == false ||
                                        (!movingMessage && (
                                            <GoogleMap
                                                {...props}
                                                open={open}
                                                moreDetails={{
                                                    name: state?.name,
                                                    email: state?.email,
                                                    phone: state?.phone,
                                                    phoneErr: state?.phoneErr,
                                                    detail: state?.detail,
                                                }}
                                                handleMoreDetailChange={
                                                    handleMoreDetailChange
                                                }
                                            />
                                        ))} */}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="button-common"
                                onClick={handleCloseModalClick}
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                data-dismiss={
                                    movingMessage == "OK" ? "modal" : ""
                                }
                                disabled={(() => {
                                    if (
                                        ServiceType.MOVING ==
                                        location?.state?.service_type
                                    ) {
                                        const {
                                            from_address,
                                            to_address,
                                            date,
                                            zip_code,
                                            start_lat,
                                            start_lng,
                                            end_lat,
                                            end_lng,
                                        } = location?.state;
                                        return (
                                            from_address === "" ||
                                            to_address === "" ||
                                            date === "" ||
                                            zip_code === "" ||
                                            start_lat === "" ||
                                            start_lng === "" ||
                                            end_lat === "" ||
                                            end_lng === "" ||
                                            state?.phone === "" ||
                                            state?.phoneErr !== "" ||
                                            from_address === undefined ||
                                            to_address === undefined ||
                                            date === undefined ||
                                            zip_code === undefined ||
                                            start_lat === undefined ||
                                            start_lng === undefined ||
                                            end_lat === undefined ||
                                            end_lng === undefined
                                        );
                                    }
                                    return state.submitting === true
                                        ? true
                                        : false;
                                })()}
                                onClick={
                                    movingMessage == "OK"
                                        ? handleGoToServicesHistory
                                        : handleAddPaymentClick
                                }
                                type="button"
                                className="button-common-2"
                            >
                                {movingMessage == "OK"
                                    ? "Go to Services History"
                                    : "Get Quotation"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
