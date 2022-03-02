import axios from "axios";
import React, { useState } from "react";
import Rating from "../../components/Rating";
import { HOST } from "../../constants";
import ServiceType from "../../constants/ServiceType";
import { Moving } from "./Moving";
import { MovingRequest } from "./MovingRequest";
import { Service } from "./Service";
export const Services = (props) => {
    const { serviceId, subServiceId } = props.match.params;
    const { headerMenu } = props;
    const search = props.location.search; // could be '?foo=bar'
    const params = new URLSearchParams(search);
    const [service, setService] = useState({
        selected: {},
        currentStep: 0,
        error: "",
        zipCode: "",
        zipCodeErr: "",
        zipCodeData: "",
        zipCodeDataErr: "",
        selectedZipCode: false,
    });
    const [moving, setMoving] = useState({
        step: 0,
        vehicle_type_id: "",
        fromAddress: "",
        toAddress: "",
        date: "",
        zip_code: "",
    });

    const [error, setError] = useState({
        selected: {},
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

    const handleZipCodeChange = (e) => {
        const { name, value } = e.target;
        // let re = /^(0|[1-9][0-9]*)$/;

        setService((state) => ({
            ...state,
            [name]: value,
            selectedZipCode: false,
        }));
        if (value.length < 1 || value.length > 12) {
            setService((service) => ({
                ...service,
                zipCodeErr: (
                    <div
                        className="col-md-12 text-danger mt-2"
                        style={{ fontSize: 15 }}
                    >
                        Zip Code characher(Number only) should be in between 2
                        and 12
                    </div>
                ),
            }));
        } else {
            setService((service) => ({ ...service, zipCodeErr: "" }));
            axios({
                method: "get",
                url: `${HOST}/api/user/services/zip-code?zipCode=${value}&sub_service_id=${subServiceId}`,
            })
                .then(function (response) {
                    setService((service) => ({
                        ...service,
                        zipCodeData: response?.data?.data?.data,
                        zipCodeDataErr: "",
                    }));
                })
                .catch((error) => {
                    setService((service) => ({
                        ...service,
                        zipCodeData: "",
                        zipCodeDataErr: error?.response?.data?.message,
                    }));
                });
        }
    };

    const handleSelectZipCode = (code) => {
        setService((state) => ({
            ...service,
            zipCode: code,
            zipCodeErr: "",
            selectedZipCode: true,
        }));
    };

    const getProviders = () => {
        props.history.push({
            pathname: "/service-providers",
            search: `?zipCode=${service.zipCode}&subService=${subServiceId}`,
            state: service.selected,
        });
    };

    if (parseInt(serviceId) === 3) {
        const handleSelectTypeClick = (type) => {
            setMoving({
                ...moving,
                vehicle_type_id: moving?.vehicle_type_id == type ? "" : type,
            });
        };

        const handleStepClick = (step) => {
            setMoving((state) => ({
                ...state,
                step,
            }));
        };

        return (
            <MovingRequest
                {...props}
                moving={moving}
                subServiceId={subServiceId}
                handleStepClick={handleStepClick}
                handleSelectTypeClick={handleSelectTypeClick}
            />
        );
    }
    return (
        <>
            <div
                className="breadcrumb-sec d-flex align-items-center justify-content-center"
                style={{
                    backgroundImage: `url("/assets/img/bread-bg.jpg")`,
                    // backgroundRepeat: 'no-repeat',
                    // maxWidth: "100%",
                    // backgroundSize: "cover",
                    // height: "auto",
                }}
            ></div>
            <div className="moving-help-sec ">
                <div className="container ">
                    <div className="row">
                        <div className="col-12">
                            {serviceId && subServiceId ? (
                                <>
                                    {serviceId == 3 ? (
                                        <div className="moving-search-box m-5">
                                            <Moving
                                                {...props}
                                                serviceId={serviceId}
                                                subServiceId={subServiceId}
                                            />
                                        </div>
                                    ) : (
                                        // <div
                                        //     className="moving-search-box  house-cleaning-sec"
                                        //     style={{
                                        //         marginTop: "8rem",
                                        //         marginBottom: "8rem",
                                        //     }}
                                        // >
                                        //     <Question
                                        //         serviceId={serviceId}
                                        //         subServiceId={subServiceId}
                                        //         {...props}
                                        //     />
                                        // </div>
                                        // <></>
                                        <Service
                                            {...props}
                                            service={service}
                                            handleChangeQuestion={
                                                handleChangeQuestion
                                            }
                                            handleZipCodeChange={
                                                handleZipCodeChange
                                            }
                                            handleSelectZipCode={
                                                handleSelectZipCode
                                            }
                                            getProviders={getProviders}
                                        />
                                    )}
                                </>
                            ) : (
                                <div className="shop-search services-serch d-flex align-items-center justify-content-center mx-auto">
                                    <div className="header-search d-flex align-items-center justify-content-center flex-column">
                                        <div className="shop-serch-title mb-5">
                                            Choose a service to get started.
                                        </div>
                                        <form action="">
                                            <div className="input-box d-flex align-items-center">
                                                <div className="icon-div">
                                                    <svg
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 18 18"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M7.5 1.18269C8.74969 1.18155 9.97165 1.55108 11.0113 2.24454C12.0509 2.938 12.8615 3.92423 13.3405 5.07847C13.8196 6.23271 13.9455 7.50309 13.7024 8.7289C13.4593 9.95472 12.8581 11.0809 11.9748 11.965C11.0916 12.849 9.96593 13.4513 8.74034 13.6955C7.51474 13.9397 6.24425 13.8149 5.08958 13.337C3.9349 12.859 2.94793 12.0493 2.25352 11.0103C1.55911 9.9713 1.18847 8.74969 1.18846 7.5C1.19604 5.82788 1.86325 4.22631 3.04509 3.04339C4.22694 1.86047 5.82789 1.1918 7.5 1.18269ZM7.5 0C6.01664 0 4.56659 0.439867 3.33323 1.26398C2.09986 2.08809 1.13856 3.25943 0.570907 4.62987C0.00324974 6.00032 -0.145275 7.50832 0.144114 8.96318C0.433503 10.418 1.14781 11.7544 2.1967 12.8033C3.2456 13.8522 4.58197 14.5665 6.03682 14.8559C7.49168 15.1453 8.99968 14.9967 10.3701 14.4291C11.7406 13.8614 12.9119 12.9001 13.736 11.6668C14.5601 10.4334 15 8.98336 15 7.5C15 5.51088 14.2098 3.60322 12.8033 2.1967C11.3968 0.790176 9.48913 0 7.5 0Z"
                                                            fill="#B6BCC1"
                                                        />
                                                        <path
                                                            d="M17.84 17.0655L13.7819 13L13 13.7726L17.0581 17.8381C17.1091 17.8891 17.1697 17.9297 17.2364 17.9575C17.3032 17.9853 17.3748 17.9997 17.4471 18C17.5195 18.0003 17.5912 17.9863 17.6581 17.959C17.725 17.9317 17.7859 17.8915 17.8373 17.8408C17.8886 17.7901 17.9294 17.7298 17.9573 17.6634C17.9852 17.5969 17.9997 17.5257 18 17.4537C18.0003 17.3817 17.9863 17.3104 17.9588 17.2438C17.9314 17.1772 17.891 17.1166 17.84 17.0655Z"
                                                            fill="#B6BCC1"
                                                        />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search for services (e.g. “cleaning”)"
                                                />
                                                <button type="button">
                                                    Search
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="shop-page pad-y ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-12">
                                <div className="common-heading text-center">
                                    <div className="title">
                                        See all Services
                                    </div>
                                    <div className="sub-des">
                                        liked or admired by many people or by a
                                        particular person or group.
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="row"> */}
                        <div className="col-md-12 ">
                            {/* <div className="d-flex align-items-start justify-content-center mb-5">
                                    <div className="d-flex flex-column align-items-center h-100"> */}
                            {/* <div className="service-name active">
                                            Cleaning
                                        </div>
                                        <div className="service-line"></div> */}
                            <div className="service-items-list d-flex align-items-start justify-content-center w-100 flex-wrap flex-md-nowrap">
                                {headerMenu.map((mainMenu, index) => (
                                    <div
                                        className="service-card mb-4"
                                        key={index}
                                    >
                                        <div className="service-img">
                                            <img
                                                src={
                                                    (mainMenu?.image &&
                                                        HOST +
                                                            mainMenu?.image) ||
                                                    "/assets/img/service-card1.jpg"
                                                }
                                                className="img-fluid"
                                                alt="image"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src =
                                                        "/assets/img/service-card1.jpg";
                                                }}
                                            />
                                        </div>
                                        <ul className="service-list">
                                            {mainMenu?.sub_services?.map(
                                                (subMenu, index) => (
                                                    <li
                                                        className="item"
                                                        key={index}
                                                    >
                                                        <div className="link">
                                                            <i
                                                                className="fa fa-angle-right pr-3"
                                                                aria-hidden="true"
                                                            ></i>
                                                            {subMenu?.name}
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                            {/* <li className="item">
                                                <a href="#" className="link">
                                                    <i
                                                        className="fa fa-angle-right pr-3"
                                                        aria-hidden="true"
                                                    ></i>
                                                    Affordable Maids
                                                </a>
                                            </li>
                                            <li className="item">
                                                <a href="#" className="link">
                                                    <i
                                                        className="fa fa-angle-right pr-3"
                                                        aria-hidden="true"
                                                    ></i>
                                                    Apartment Cleaning
                                                </a>
                                            </li>
                                            <li className="item">
                                                <a href="#" className="link">
                                                    <i
                                                        className="fa fa-angle-right pr-3"
                                                        aria-hidden="true"
                                                    ></i>
                                                    Bedroom Cleaning
                                                </a>
                                            </li>
                                            <li className="item">
                                                <a href="#" className="link">
                                                    <i
                                                        className="fa fa-angle-right pr-3"
                                                        aria-hidden="true"
                                                    ></i>
                                                    Cleaning Service
                                                </a>
                                            </li>
                                            <li className="item">
                                                <a href="#" className="link">
                                                    <i
                                                        className="fa fa-angle-right pr-3"
                                                        aria-hidden="true"
                                                    ></i>
                                                    Housekeeping
                                                </a>
                                            </li>
                                            <li className="item">
                                                <a href="#" className="link">
                                                    <i
                                                        className="fa fa-angle-right pr-3"
                                                        aria-hidden="true"
                                                    ></i>
                                                    Home Sanitization
                                                </a>
                                            </li> */}
                                        </ul>
                                    </div>
                                ))}
                                {/* <div className="service-card mb-4">
                                    <div className="service-img">
                                        <img
                                            src="/assets/img/service-card1.jpg"
                                            className="img-fluid"
                                            alt="image"
                                        />
                                    </div>
                                    <ul className="service-list">
                                        <li className="item">
                                            <a href="#" className="link">
                                                <i
                                                    className="fa fa-angle-right pr-3"
                                                    aria-hidden="true"
                                                ></i>
                                                Maid Service
                                            </a>
                                        </li>
                                        <li className="item">
                                            <a href="#" className="link">
                                                <i
                                                    className="fa fa-angle-right pr-3"
                                                    aria-hidden="true"
                                                ></i>
                                                Move In Cleaning
                                            </a>
                                        </li>
                                        <li className="item">
                                            <a href="#" className="link">
                                                <i
                                                    className="fa fa-angle-right pr-3"
                                                    aria-hidden="true"
                                                ></i>
                                                Move Out Cleaning
                                            </a>
                                        </li>
                                        <li className="item">
                                            <a href="#" className="link">
                                                <i
                                                    className="fa fa-angle-right pr-3"
                                                    aria-hidden="true"
                                                ></i>
                                                Room Cleaning
                                            </a>
                                        </li>
                                        <li className="item">
                                            <a href="#" className="link">
                                                <i
                                                    className="fa fa-angle-right pr-3"
                                                    aria-hidden="true"
                                                ></i>
                                                Home Cleaning
                                            </a>
                                        </li>
                                        <li className="item">
                                            <a href="#" className="link">
                                                <i
                                                    className="fa fa-angle-right pr-3"
                                                    aria-hidden="true"
                                                ></i>
                                                Office Cleaning
                                            </a>
                                        </li>
                                        <li className="item">
                                            <a href="#" className="link">
                                                <i
                                                    className="fa fa-angle-right pr-3"
                                                    aria-hidden="true"
                                                ></i>
                                                Commercial Sanitization
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="service-card mb-4">
                                    <div className="service-img">
                                        <img
                                            src="/assets/img/service-card1.jpg"
                                            className="img-fluid"
                                            alt="image"
                                        />
                                    </div>
                                    <ul className="service-list">
                                        <li className="item">
                                            <a href="#" className="link">
                                                <i
                                                    className="fa fa-angle-right pr-3"
                                                    aria-hidden="true"
                                                ></i>
                                                Vacation Rental Cleaning
                                            </a>
                                        </li>
                                        <li className="item">
                                            <a href="#" className="link">
                                                <i
                                                    className="fa fa-angle-right pr-3"
                                                    aria-hidden="true"
                                                ></i>
                                                Deep Cleaning Service
                                            </a>
                                        </li>
                                        <li className="item">
                                            <a href="#" className="link">
                                                <i
                                                    className="fa fa-angle-right pr-3"
                                                    aria-hidden="true"
                                                ></i>
                                                Kitchen Cleaning
                                            </a>
                                        </li>
                                        <li className="item">
                                            <a href="#" className="link">
                                                <i
                                                    className="fa fa-angle-right pr-3"
                                                    aria-hidden="true"
                                                ></i>
                                                Living Room Cleaning
                                            </a>
                                        </li>
                                        <li className="item">
                                            <a href="#" className="link">
                                                <i
                                                    className="fa fa-angle-right pr-3"
                                                    aria-hidden="true"
                                                ></i>
                                                Local Cleaning Service
                                            </a>
                                        </li>
                                        <li className="item">
                                            <a href="#" className="link">
                                                <i
                                                    className="fa fa-angle-right pr-3"
                                                    aria-hidden="true"
                                                ></i>
                                                Same Day Cleaning
                                            </a>
                                        </li>
                                    </ul>
                                </div> */}
                            </div>
                        </div>
                        {/* </div>
                            </div> */}
                        {/* </div> */}
                    </div>
                </div>
            </div>

            {/* here added the service content  */}
            {/* <section className="handy-works pad-y">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="common-heading text-center">
                                <div className="title">How Handy Works</div>
                                <div className="sub-des">
                                    liked or admired by many people or by a
                                    particular person or group.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="hanfy-card">
                                <div className="inner-card-handy">
                                    <div className="hnady-img">
                                        <img src="" alt="image" />
                                    </div>
                                    <div className="title">
                                        Set Up a Cleaning Plan
                                    </div>
                                </div>
                                <div className="detail-handy">
                                    Choose a weekly, biweekly, or monthly
                                    cleaning plan. We schedule your recurring
                                    bookings to make things easy - but don’t
                                    worry, you can always reschedule if things
                                    change. Amet minim mollit non deserunt
                                    ullamco est sit aliqua dolor do amet sint.
                                    Velit officia consequat duis enim velit
                                    mollit. Exercitation veniam consequat sunt
                                    nostrud amet.
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="hanfy-card">
                                <div className="inner-card-handy">
                                    <div className="hnady-img">
                                        <img src="" alt="image" />
                                    </div>
                                    <div className="title">
                                        Manage Everything Online
                                    </div>
                                </div>
                                <div className="detail-handy">
                                    Amet minim mollit non deserunt ullamco est
                                    sit aliqua dolor do amet sint. Velit officia
                                    consequat duis enim velit mollit.
                                    Exercitation veniam consequat sunt nostrud
                                    amet. Amet minim mollit non deserunt ullamco
                                    est sit aliqua dolor do amet sint. Velit
                                    officia consequat duis enim velit mollit.
                                    Exercitation veniam consequat sunt nostrud
                                    amet.
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="hanfy-card">
                                <div className="inner-card-handy">
                                    <div className="hnady-img">
                                        <img src="" alt="image" />
                                    </div>
                                    <div className="title">
                                        Sit Back and <br />
                                        Relax
                                    </div>
                                </div>
                                <div className="detail-handy">
                                    An experienced, fully-equipped housekeeping
                                    professional will be there on time. Amet
                                    minim mollit non deserunt ullamco est sit
                                    aliqua dolor do amet sint. Velit officia
                                    consequat duis enim velit mollit.
                                    Exercitation veniam consequat sunt nostrud
                                    amet. Amet minim mollit non deserunt ullamco
                                    est sit aliqua dolor do amet sint. Velit
                                    officia.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <hr />
                    </div>
                </div>
            </div> */}

            {props?.serviceData?.data?.service_contents && (
                <section className="service-des-card-sec pad-t">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="common-heading text-center">
                                    <div className="title">
                                        What's Included in a{" "}
                                        {props?.serviceData?.data?.name}?
                                    </div>
                                    <div className="sub-des">
                                        Here is what you can expect from a{" "}
                                        {props?.serviceData?.data?.name}.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                {props?.serviceData?.data?.service_contents?.map(
                                    (item, index) => {
                                        const description =
                                            item?.description?.split(".");
                                        return (
                                            <div
                                                key={index}
                                                className="service-card-des d-flex align-items-center "
                                            >
                                                <div className="src-image-box">
                                                    <img
                                                        src={
                                                            item?.image
                                                                ? HOST +
                                                                  item?.image
                                                                : "/assets/img/service-caed-2.jpg"
                                                        }
                                                        className="img-fluid"
                                                        alt="image"
                                                    />
                                                </div>
                                                <div className="service-card-detail">
                                                    <div className="title">
                                                        {item?.title}
                                                    </div>
                                                    <div className="des">
                                                        <ul>
                                                            {description?.map(
                                                                (
                                                                    point,
                                                                    index
                                                                ) =>
                                                                    point && (
                                                                        <React.Fragment
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <li>
                                                                                {
                                                                                    point
                                                                                }
                                                                            </li>
                                                                        </React.Fragment>
                                                                    )
                                                            )}
                                                            {/* <li>
                                                            Wipe down all
                                                            mirrors and glass
                                                            fixtures
                                                        </li>
                                                        <li>
                                                            Clean all floor
                                                            surfaces
                                                        </li>
                                                        <li>
                                                            Take out garbage and
                                                            recycling
                                                        </li> */}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <hr />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* <section className="qustions-sec pad-y">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="common-heading text-center">
                                <div className="title">
                                    Frequently Asked Questions
                                </div>
                                <div className="sub-des">
                                    Amet minim mollit non deserunt ullamco est
                                    sit aliqua dolor do amet sint. Velit officia
                                    consequat duis enim velit
                                    <br /> mollit. Exercitation veniam consequat
                                    sunt nostrud amet.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="qusr-list">
                                <div className="title">
                                    What's included in a cleaning?
                                </div>
                                <div className="des">
                                    See what's included in a cleaning service.
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div id="accordion">
                                <div className="qusr-list mb-2">
                                    <div id="headingOne">
                                        <button
                                            className="btn text-left title w-100 d-flex align-items-center justify-content-between"
                                            data-toggle="collapse"
                                            data-target="#qust1"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            Which Handy professional will come
                                            to my place?
                                            <i
                                                className="fa fa-angle-down pl-1"
                                                aria-hidden="true"
                                            ></i>
                                        </button>
                                    </div>

                                    <div
                                        id="qust1"
                                        className="collapse show"
                                        aria-labelledby="headingOne"
                                        data-parent="#accordion"
                                    >
                                        <div className="des">
                                            <ul>
                                                <li>
                                                    Handy has a vast network of
                                                    experienced, top-rated
                                                    cleaners. Based on the time
                                                    and date of your request, we
                                                    work to assign the best
                                                    professional available.
                                                </li>
                                                <li>
                                                    Like working with a specific
                                                    pro? Add them to your Pro
                                                    Team from the mobile app and
                                                    they'll be requested first
                                                    for all future bookings.
                                                </li>
                                                <li>
                                                    You will receive an email
                                                    with details about your
                                                    professional prior to your
                                                    appointment.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="qusr-list mb-2">
                                    <div id="headingOne">
                                        <button
                                            className="btn text-left title w-100 d-flex align-items-center justify-content-between"
                                            data-toggle="collapse"
                                            data-target="#qust2"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            Can I skip or reschedule bookings?
                                            <i
                                                className="fa fa-angle-down pl-1"
                                                aria-hidden="true"
                                            ></i>
                                        </button>
                                    </div>

                                    <div
                                        id="qust2"
                                        className="collapse"
                                        aria-labelledby="headingOne"
                                        data-parent="#accordion"
                                    >
                                        <div className="des">
                                            <ul>
                                                <li>
                                                    Handy has a vast network of
                                                    experienced, top-rated
                                                    cleaners. Based on the time
                                                    and date of your request, we
                                                    work to assign the best
                                                    professional available.
                                                </li>
                                                <li>
                                                    Like working with a specific
                                                    pro? Add them to your Pro
                                                    Team from the mobile app and
                                                    they'll be requested first
                                                    for all future bookings.
                                                </li>
                                                <li>
                                                    You will receive an email
                                                    with details about your
                                                    professional prior to your
                                                    appointment.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="qusr-list mb-2">
                                    <div id="headingOne">
                                        <button
                                            className="btn text-left title w-100 d-flex align-items-center justify-content-between"
                                            data-toggle="collapse"
                                            data-target="#qust3"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            How much are house cleaning
                                            services?
                                            <i
                                                className="fa fa-angle-down pl-1"
                                                aria-hidden="true"
                                            ></i>
                                        </button>
                                    </div>

                                    <div
                                        id="qust3"
                                        className="collapse"
                                        aria-labelledby="headingOne"
                                        data-parent="#accordion"
                                    >
                                        <div className="des">
                                            <ul>
                                                <li>
                                                    Handy has a vast network of
                                                    experienced, top-rated
                                                    cleaners. Based on the time
                                                    and date of your request, we
                                                    work to assign the best
                                                    professional available.
                                                </li>
                                                <li>
                                                    Like working with a specific
                                                    pro? Add them to your Pro
                                                    Team from the mobile app and
                                                    they'll be requested first
                                                    for all future bookings.
                                                </li>
                                                <li>
                                                    You will receive an email
                                                    with details about your
                                                    professional prior to your
                                                    appointment.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="qusr-list mb-2">
                                    <div id="headingOne">
                                        <button
                                            className="btn text-left title w-100 d-flex align-items-center justify-content-between"
                                            data-toggle="collapse"
                                            data-target="#qust4"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            Are house cleaning services worth
                                            it?
                                            <i
                                                className="fa fa-angle-down pl-1"
                                                aria-hidden="true"
                                            ></i>
                                        </button>
                                    </div>

                                    <div
                                        id="qust4"
                                        className="collapse"
                                        aria-labelledby="headingOne"
                                        data-parent="#accordion"
                                    >
                                        <div className="des">
                                            <ul>
                                                <li>
                                                    Handy has a vast network of
                                                    experienced, top-rated
                                                    cleaners. Based on the time
                                                    and date of your request, we
                                                    work to assign the best
                                                    professional available.
                                                </li>
                                                <li>
                                                    Like working with a specific
                                                    pro? Add them to your Pro
                                                    Team from the mobile app and
                                                    they'll be requested first
                                                    for all future bookings.
                                                </li>
                                                <li>
                                                    You will receive an email
                                                    with details about your
                                                    professional prior to your
                                                    appointment.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="qusr-list mb-2">
                                    <div id="headingOne">
                                        <button
                                            className="btn text-left title w-100 d-flex align-items-center justify-content-between"
                                            data-toggle="collapse"
                                            data-target="#qust5"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            I need more help
                                            <i
                                                className="fa fa-angle-down pl-1"
                                                aria-hidden="true"
                                            ></i>
                                        </button>
                                    </div>

                                    <div
                                        id="qust5"
                                        className="collapse"
                                        aria-labelledby="headingOne"
                                        data-parent="#accordion"
                                    >
                                        <div className="des">
                                            <ul>
                                                <li>
                                                    Handy has a vast network of
                                                    experienced, top-rated
                                                    cleaners. Based on the time
                                                    and date of your request, we
                                                    work to assign the best
                                                    professional available.
                                                </li>
                                                <li>
                                                    Like working with a specific
                                                    pro? Add them to your Pro
                                                    Team from the mobile app and
                                                    they'll be requested first
                                                    for all future bookings.
                                                </li>
                                                <li>
                                                    You will receive an email
                                                    with details about your
                                                    professional prior to your
                                                    appointment.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            {/* <div className="container">
                <div className="row">
                    <div className="col-12">
                        <hr />
                    </div>
                </div>
            </div> */}
            <section className="handy-works pad-y">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="common-heading text-center">
                                <div className="title">
                                    Meet Some of Our Top{" "}
                                    {props?.serviceData?.data?.name} {""}
                                    Professionals
                                </div>
                                <div className="sub-des">
                                    Build a Pro Team so that you always have a
                                    great group of go-to professionals for all
                                    your home {props?.serviceData?.data?.name}.{" "}
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                {props?.serviceData?.data?.provider?.map(
                                    (provider, index) => (
                                        <div key={index} className="col-md-4">
                                            <div className="team-card">
                                                <div className="team-img">
                                                    <img
                                                        src={
                                                            provider?.image
                                                                ? HOST +
                                                                  provider?.image
                                                                : "/assets/img/Profile_avatar.png"
                                                        }
                                                        className="img-fluid"
                                                        alt="image"
                                                        onError={(e) => {
                                                            e.target.onerror =
                                                                null;
                                                            e.target.src =
                                                                "/assets/img/Profile_avatar.png";
                                                        }}
                                                    />
                                                </div>
                                                <div className="title">
                                                    {`${provider?.first_name} ${provider?.first_name[0]}.`}
                                                </div>
                                                {provider?.provider_service_requests_count ? (
                                                    <div className="job-cmplte">
                                                        {
                                                            provider?.provider_service_requests_count
                                                        }{" "}
                                                        Jobs Completed
                                                    </div>
                                                ) : null}
                                                <div className="stars-rating ">
                                                    <div className="star-rating-area d-flex align-items-center justify-content-center">
                                                        <Rating
                                                            rating={
                                                                provider?.rating &&
                                                                provider?.rating?.toFixed(
                                                                    1
                                                                )
                                                            }
                                                        ></Rating>
                                                        {/* <div
                                                        className="rating-static clearfix mr-3"
                                                        rel="4"
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
                                                    </div> */}
                                                        {/* <div className="ratilike ng-binding">5</div> */}
                                                    </div>
                                                </div>

                                                <div className="detail-team">
                                                    {provider?.bio}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <hr />
                    </div>
                </div>
            </div>

            {/* <section className="best-house-clen pad-y">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="common-heading text-center">
                                <div className="title">
                                    Here's Why Handy is the Best House Cleaning
                                    Service
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="clen-info">
                                <strong>
                                    Instant online booking with 7am-11pm
                                    availability
                                </strong>
                                Book online instantly, and schedule your first
                                cleaning for as early as tomorrow. Get your home
                                cleaned anytime from 7am to 11pm, 7 days a week.
                                <br />
                                <br />
                                <br />
                                <strong>Friendly, vetted professionals</strong>
                                All professionals on the Handy platform are
                                screened, background checked, and are rated by
                                customers like you to ensure quality.
                                <br />
                                <br />
                                <br />
                                <strong>Cleaned the way you want</strong>
                                Professionals bring supplies and work from a
                                comprehensive checklist that you can tailor to
                                your liking. You can work with the same cleaner
                                every time. Handy strives to match you with the
                                right professional for you and your home. We
                                also provide you with a team of professionals to
                                provide backup in case of scheduling conflicts.
                                <br />
                                <br />
                                <br />
                                <strong>Flexible scheduling</strong>
                                Set a schedule that fits your life. Handy helps
                                you automatically schedule your weekly,
                                biweekly, or monthly cleaning, so you can focus
                                on the other things in your life. Reschedule or
                                adjust the frequency of your cleanings as
                                needed. Get the benefit of a regularly cleaned
                                home. Easy and secure online payments. No more
                                last minute runs to the bank. Pay online and tip
                                at your discretion.
                                <br />
                                <br />
                                <br />
                                <strong>
                                    See the progress of your cleaning from your
                                    phone
                                </strong>
                                Not able to be home during the cleaning? No
                                problem. The Handy app allows your to see when
                                your cleaner arrives and check the progress of
                                their cleaning.
                                <br />
                                <br />
                                <br />
                                <strong>The Handy Happiness Guarantee</strong>
                                Your happiness is our goal. If you're not
                                satisfied with the quality of the service, we'll
                                send another pro to make it right at no extra
                                charge.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <hr />
                    </div>
                </div>
            </div>

            <div className="cleaning-affordable pad-y">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="affordable-detail">
                                <div className="title">
                                    Make House Cleaning Your Affordable Luxury
                                </div>
                                <p className="des">
                                    Imagine a world without Handy. You’ve put in
                                    a 12 hour day at the office, your train is
                                    30 minutes late, and by the time you finally
                                    walk into your apartment, there are dirty
                                    dishes stacked high in the sink, dirty
                                    clothes are strewn everywhere, your bed is
                                    unmade, the shower is starting to smell a
                                    bit like mildew, and the floors are covered
                                    with mud. A professional maid service
                                    probably sounds pretty good right about now,
                                    doesn't it? The last thing in the world you
                                    want to do is pull on your yellow rubber
                                    gloves and begin scrubbing the floors and
                                    vacuuming the carpets. With Handy, you don’t
                                    have to.
                                    <br />
                                    <br />
                                    There is no feeling quite like coming home
                                    from work and walking into a beautiful,
                                    fresh-smelling, clean home. Rather than
                                    clean the toilet, dust the shelves, and wipe
                                    down the countertops, you can instead unwind
                                    on the couch, curled up under a blanket,
                                    maybe pour yourself that glass of wine
                                    you’ve been thinking about, and start that
                                    new TV show everyone’s been talking about. A
                                    visit from a housekeeping service is one of
                                    the best gifts you can give yourself. Book a
                                    home cleaning with Handy today.If you’re in
                                    need of home cleaning, apartment cleaning,
                                    or a maid service, we’re simply the best,
                                    most convenient home cleaning service out
                                    there. We know you want the cheapest house
                                    cleaning available while still having the
                                    confidence that you will receive a cleaner
                                    who is thorough and professional, with keen
                                    attention to detail. When you sign up for a
                                    Handy house cleaning plan, we aim to offer
                                    you just that. And Handy helps schedule your
                                    recurring cleanings automatically for you,
                                    so you can focus on the other things in your
                                    life.
                                </p>
                            </div>
                            <div className="affordable-detail mt-5 pt-5">
                                <div className="title">
                                    Fairly Priced and Convenient Cleaning
                                    Services
                                </div>
                                <p className="des">
                                    Price is important. Nobody likes it when
                                    they think they’re paying one price for a
                                    home cleaning service provider, and then
                                    they are informed that the price is actually
                                    going to be much higher. With Handy, we let
                                    you know up front what you’re going to pay.
                                    And with incredibly affordable hourly rates
                                    given at a discount to loyal customers who
                                    sign up for weekly, bi-weekly or monthly
                                    house cleaning services, we’re confident
                                    you’ll be satisfied.
                                    <br />
                                    <br />
                                    Admit it, we’ve all been there. Your home
                                    cleaning or maid service is coming the next
                                    morning and you realize at 9 PM that you
                                    don’t have any cash to pay them. So you
                                    reluctantly put on your shoes, find your
                                    jacket, and drive to the nearest bank to
                                    take money out of the ATM. Handy is entirely
                                    cashless -- pay your cleaner in the app with
                                    a credit card, simple as that. We’ll even
                                    save it for next time. And if you’re so
                                    thrilled with how beautiful and clean your
                                    apartment looks and you want to tip your
                                    house cleaning pro something extra, you can
                                    do that with your credit card in the app as
                                    well.
                                </p>
                            </div>
                            <div className="affordable-detail mt-5 pt-5">
                                <div className="title">
                                    Ensuring Your House Cleaner Does the Perfect
                                    Job
                                </div>
                                <p className="des">
                                    We know that when you book a maid service,
                                    housekeeping service, or house cleaning
                                    service through Handy, you are allowing a
                                    stranger to enter your home. When you book a
                                    house cleaner through the Handy platform,
                                    you can rest assured that they’ve been
                                    vetted before they arrive at your door. You
                                    can give your Handy professional additional
                                    instructions when filling out your cleaning
                                    preferences online. If you have particular
                                    allergies to detergents, for instance, or a
                                    special way of cleaning that you prefer, you
                                    can easily let your house cleaner know ahead
                                    of time. You can even prioritize the various
                                    home cleaning tasks that your Handy
                                    professional will tackle in the order that
                                    you prefer, so you can make sure your
                                    biggest concerns will get extra love and
                                    attention.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
};

{
    /* <div className="service-card-des d-flex align-items-center ">
                                <div className="src-image-box">
                                    <img
                                        src="/assets/img/service-caed-2-2.jpg"
                                        className="img-fluid"
                                        alt="image"
                                    />
                                </div>
                                <div className="service-card-detail">
                                    <div className="title">
                                        Bathroom
                                        <br /> Cleaning
                                    </div>
                                    <div className="des">
                                        <ul>
                                            <li>
                                                Wash and sanitize the toilet,
                                                shower, tub and sink
                                            </li>
                                            <li>
                                                Dust all accessible surfaces
                                            </li>
                                            <li>
                                                Wipe down all mirrors and glass
                                                fixtures
                                            </li>
                                            <li> Clean all floor surfaces</li>
                                            <li>
                                                Take out garbage and recycling
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="service-card-des d-flex align-items-center ">
                                <div className="src-image-box">
                                    <img
                                        src="/assets/img/service-caed-2-3.jpg"
                                        className="img-fluid"
                                        alt="image"
                                    />
                                </div>
                                <div className="service-card-detail">
                                    <div className="title">
                                        Kitchen
                                        <br /> Cleaning
                                    </div>
                                    <div className="des">
                                        <ul>
                                            <li>
                                                Dust all accessible surfaces
                                            </li>
                                            <li>
                                                Empty sink and load up
                                                dishwasher with dirty dishes
                                            </li>
                                            <li>
                                                Wipe down exterior of stove,
                                                oven and fridge
                                            </li>
                                            <li> Clean all floor surfaces</li>
                                            <li>
                                                Take out garbage and recycling
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="service-card-des d-flex align-items-center ">
                                <div className="src-image-box">
                                    <img
                                        src="/assets/img/service-caed-2-3.jpg"
                                        className="img-fluid"
                                        alt="image"
                                    />
                                </div>
                                <div className="service-card-detail">
                                    <div className="title">Extras</div>
                                    <div className="des">
                                        For a deeper clean, consider adding one
                                        or more cleaning extras. Most cleaning
                                        extras add one half hour of time and
                                        cost to your booking.
                                        <ul>
                                            <li>Inside cabinets</li>
                                            <li>Inside fridge</li>
                                            <li>Inside oven</li>
                                            <li>Laundry wash & dry</li>
                                            <li>Interior windows</li>
                                        </ul>
                                    </div>
                                </div>
                            </div> */
}



                            // <div className="col-md-4">
                            //     <div className="team-card">
                            //         <div className="team-img">
                            //             <img
                            //                 src="/assets/img/user2.jpg"
                            //                 className="img-fluid"
                            //                 alt="image"
                            //             />
                            //         </div>
                            //         <div className="title">Justin R.</div>
                            //         <div className="job-cmplte">
                            //             19 Jobs Completed
                            //         </div>
                            //         <div className="stars-rating ">
                            //             <div className="star-rating-area d-flex align-items-center justify-content-center">
                            //                 <div
                            //                     className="rating-static clearfix mr-3"
                            //                     rel="4"
                            //                 >
                            //                     <label
                            //                         className="full"
                            //                         title="{{ 'Awesome - 5 stars' | translate }}"
                            //                     ></label>
                            //                     <label
                            //                         className="half"
                            //                         title="{{ 'Excellent - 4.5 stars' | translate }}"
                            //                     ></label>
                            //                     <label
                            //                         className="full"
                            //                         title="{{ 'Excellent - 4 stars' | translate }}"
                            //                     ></label>
                            //                     <label
                            //                         className="half"
                            //                         title="{{ 'Better - 3.5 stars' | translate }}"
                            //                     ></label>
                            //                     <label
                            //                         className="full"
                            //                         title="{{ 'Good - 3 stars' | translate }}"
                            //                     ></label>
                            //                     <label
                            //                         className="half"
                            //                         title="{{ 'Good - 2.5 stars' | translate }}"
                            //                     ></label>
                            //                     <label
                            //                         className="full"
                            //                         title="{{ 'Fair - 2 stars' | translate }}"
                            //                     ></label>
                            //                     <label
                            //                         className="half"
                            //                         title="{{ 'Fair - 1.5 stars' | translate }}"
                            //                     ></label>
                            //                     <label
                            //                         className="full"
                            //                         title="{{ 'Bad - 1 star' | translate }}"
                            //                     ></label>
                            //                     <label
                            //                         className="half"
                            //                         title="{{ 'Bad - 0.5 stars' | translate }}"
                            //                     ></label>
                            //                 </div>
                            //                 {/* <div className="ratilike ng-binding">5</div> */}
                            //             </div>
                            //         </div>

                            //         <div className="detail-team">
                            //             My name is Justin I've been home
                            //             cleaning for as long as I can remember.
                            //             Cleaning was a part of life, and now has
                            //             become a passion, going above and beyond
                            //             is a thing I like to do, and I do best.
                            //         </div>
                            //     </div>
                            // </div>
                            // <div className="col-md-4">
                            //     <div className="team-card">
                            //         <div className="team-img">
                            //             <img
                            //                 src="/assets/img/user3.jpg"
                            //                 className="img-fluid"
                            //                 alt="image"
                            //             />
                            //         </div>
                            //         <div className="title">Milagros K.</div>
                            //         <div className="job-cmplte">
                            //             1219 Jobs Completed
                            //         </div>
                            //         <div className="stars-rating ">
                            //             <div className="star-rating-area d-flex align-items-center justify-content-center">
                            //                 <div
                            //                     className="rating-static clearfix mr-3"
                            //                     rel="4"
                            //                 >
                            //                     <label
                            //                         className="full"
                            //                         title="{{ 'Awesome - 5 stars' | translate }}"
                            //                     ></label>
                            //                     <label
                            //                         className="half"
                            //                         title="{{ 'Excellent - 4.5 stars' | translate }}"
                            //                     ></label>
                            //                     <label
                            //                         className="full"
                            //                         title="{{ 'Excellent - 4 stars' | translate }}"
                            //                     ></label>
                            //                     <label
                            //                         className="half"
                            //                         title="{{ 'Better - 3.5 stars' | translate }}"
                            //                     ></label>
                            //                     <label
                            //                         className="full"
                            //                         title="{{ 'Good - 3 stars' | translate }}"
                            //                     ></label>
                            //                     <label
                            //                         className="half"
                            //                         title="{{ 'Good - 2.5 stars' | translate }}"
                            //                     ></label>
                            //                     <label
                            //                         className="full"
                            //                         title="{{ 'Fair - 2 stars' | translate }}"
                            //                     ></label>
                            //                     <label
                            //                         className="half"
                            //                         title="{{ 'Fair - 1.5 stars' | translate }}"
                            //                     ></label>
                            //                     <label
                            //                         className="full"
                            //                         title="{{ 'Bad - 1 star' | translate }}"
                            //                     ></label>
                            //                     <label
                            //                         className="half"
                            //                         title="{{ 'Bad - 0.5 stars' | translate }}"
                            //                     ></label>
                            //                 </div>
                            //                 {/* <div className="ratilike ng-binding">5</div> */}
                            //             </div>
                            //         </div>

                            //         <div className="detail-team">
                            //             My name is Milagros and I have been a
                            //             housekeeper for 17 years. I have worked
                            //             with a family from the Spanish Embassy
                            //             in Washington, DC for 2 years, then I
                            //             met a nice family that I worked for 11
                            //             years as a live in housekeeper.
                            //         </div>
                            //     </div>
                            // </div>