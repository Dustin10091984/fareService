import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import ServiceType from "./../../constants/ServiceType";
import PlacesAutocomplete from "react-places-autocomplete";
import { HOST } from "./../../constants";
import Rating from "./../../components/Rating";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DayPicker, { DateUtils } from "react-day-picker";
import "./Styles/Styles.css";
import { Filter } from "./Components/Filter";
import { ProviderCard } from "./Components/ProviderCard";

export const ServiceProviders = (props) => {
    const { location, history } = props;
    const [open, setOpen] = useState(false);

    const qautationRef = useRef("qaotationModal");

    const ReactSwal = withReactContent(Swal);

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

    // States
    const { providerList, providerSchedule, serviceRequest } = props;

    // Dispatch functions
    const {
        getProviderList,
        getProviderSchedule,
        makeMovingRequest,
        postRequestService,
        getInitialRequestService,
    } = props;

    useEffect(() => {
        return () => {
            getInitialRequestService();
            // dispatch(setStateProvider(""));
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
            getProviderList({
                search: `${
                    props.location.search !== ""
                        ? props.location.search + searchParams
                        : `?${searchParams}`
                }`,
            });
        } else {
            getProviderList({
                search: props.location.search ?? "",
            });
        }
    }, [
        props.location.search,
        location?.state?.service_type,
        location?.state?.vehicle_type_id,
    ]);

    useEffect(async () => {
        if (providerList.length) {
            setState((state) => ({
                ...state,
                providerList: providerList,
            }));
        }
        if (providerSchedule.length) {
            setState((state) => ({
                ...state,
                providerSchedule: providerSchedule,
            }));
            handleCalendarClick(new Date());
        }
        if (!providerList?.loading && providerList?.error) {
            await ReactSwal.fire({
                title: "Error",
                text: providerList?.message || "Not found provider",
                confirmButtonText: "Close",
                icon: "error",
                confirmButtonColor: "#fea629",
            });
        }
    }, [providerList, providerSchedule]);

    useEffect(async () => {
        const { error, loading } = serviceRequest;
        if (
            error == false &&
            loading == false &&
            serviceRequest?.message == "success"
        ) {
            qautationRef.current.click();
            await ReactSwal.fire({
                title: "Success!",
                text: "Successfully created request service",
                confirmButtonText: "Go To Service History",
                icon: "success",
                confirmButtonColor: "#fea629",
                allowOutsideClick: false,
                showCloseButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    handleGoToServicesHistory();
                }
                setState((state) => ({
                    ...state,
                    address: "",
                    detail: "",
                    images: [],
                    previewImages: [],
                }));
            });
        }
        if (
            error == true &&
            loading == false &&
            typeof serviceRequest?.message == "string"
        ) {
            qautationRef.current.click();
            await ReactSwal.fire({
                title: "Error!",
                text: serviceRequest?.message,
                icon: "error",
                confirmButtonText: "Ok",
                confirmButtonColor: "#fea629",
                allowOutsideClick: false,
                showCloseButton: true,
            });
        }
    }, [serviceRequest]);

    const handleContinueClick = (provider) => {
        if (state.is_loggedin) {
            if (props.location.state) {
                setState((state) => ({
                    ...state,
                    is_hourly:
                        provider.provider_type == "Individual" ? true : false,
                    provider_id: provider.id,
                    provider,
                    provider_service_requests_count:
                        provider?.provider_service_requests_count,
                }));
                if (
                    location?.state?.service_type !== ServiceType.MOVING &&
                    provider.provider_type == "Individual"
                ) {
                    getProviderSchedule(provider.id);
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
    };

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
                makeMovingRequest({
                    ...moreDetails,
                    ...location.state,
                    date: moment(location.state.date).format("YYYY-MM-DD"),
                    provider_id,
                });
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
                postRequestService(formData, true);
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
        getInitialRequestService();
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
        getInitialRequestService();
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

    const handleLoadMoreClick = (page) => {
        getProviderList({
            search: !!location?.search && location.search,
            params: {
                page,
            },
            loadMore: true,
        });
        window.scrollTo(0, 0);
    };

    return (
        <>
            <section className="service-provider-sec">
                <div className="container">
                    <div className="row">
                        <Filter
                            providerType={location?.state?.service_type}
                        ></Filter>
                        <div className="col-md-8">
                            {state.error}
                            {state.loggedinErr}
                            {providerList?.data?.error && (
                                <div className="text-center display-4">
                                    {providerList?.data.message}
                                </div>
                            )}
                            {providerList?.data?.loading && (
                                <div className="text-center display-4 mb-5">
                                    Please Wait we are working on it . . .
                                </div>
                            )}
                            {!!providerList?.data?.data?.data?.length && (
                                <ProviderCard
                                    list={providerList?.data?.data?.data}
                                    is_loggedin={state?.is_loggedin}
                                    handleContinueClick={handleContinueClick}
                                ></ProviderCard>
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
                                        </div>
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
                                onClick={() => handleCloseModalClick}
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
                                                onSelect={handleAddressChange}
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
                                        <div
                                            className="col-md-12 text-dark mb-2"
                                            style={{ fontSize: 20 }}
                                        >
                                            Details
                                        </div>
                                        <div className="common-input">
                                            <textarea
                                                type="text"
                                                onChange={handleDetailChange}
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
                                    {/* )} */}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="button-common"
                                onClick={() => handleCloseModalClick}
                                data-dismiss="modal"
                                ref={qautationRef}
                            >
                                Close
                            </button>
                            <button
                                disabled={
                                    state.addressErr !== "" ||
                                    state.address === "" ||
                                    detailErr ||
                                    state.submitting === true
                                        ? true
                                        : false ||
                                          detail == "" ||
                                          serviceRequest.loading
                                }
                                onClick={handleAddPaymentClick}
                                type="button"
                                className="button-common-2"
                            >
                                {serviceRequest?.loading ? (
                                    <>
                                        <i
                                            className={`fa fa-spinner fa-pulse`}
                                        ></i>{" "}
                                        Loading...
                                    </>
                                ) : (
                                    "Get Quotation"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
