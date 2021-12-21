import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProviderProfile } from "../store/Slices/providers/ProviderProfileSclice";
import { Link } from "react-router-dom";
import Rating from "./../components/Rating";
export const ProviderProfile = (props) => {
    const { id } = props.match.params;

    const [state, setState] = useState();

    const dispatch = useDispatch();

    const providerProfile = useSelector((state) => state.providerProfile);

    useEffect(() => {
        dispatch(getProviderProfile(id));
    }, []);

    useEffect(() => {
        if (providerProfile !== undefined) {
            setState((state) => ({
                ...state,
                providerProfile: providerProfile,
            }));
        }
    }, [providerProfile]);

    return (
        <>
            <section className="service-provider-sec ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-info service-time-box text-center mt-5 ">
                                {(() => {
                                    const providerProfile =
                                        state?.providerProfile;
                                    if (providerProfile == undefined) {
                                        return (
                                            <center
                                                className="col-12 alert alert-warnig"
                                                role="alert"
                                                style={{ fontSize: 20 }}
                                            >
                                                Please wait
                                            </center>
                                        );
                                    } else if (providerProfile.error == true) {
                                        return (
                                            <center
                                                className="col-12 alert alert-danger"
                                                role="alert"
                                                style={{ fontSize: 20 }}
                                            >
                                                {state?.providerProfile.message}
                                            </center>
                                        );
                                    } else if (
                                        (providerProfile &&
                                            providerProfile.error == false,
                                        providerProfile?.data)
                                    ) {
                                        const data = providerProfile?.data;
                                        return (
                                            <>
                                                <div className="pro-pic">
                                                    <img
                                                        src={
                                                            data?.provider
                                                                ?.image
                                                                ? `${process.env.REACT_APP_API_BASE_URL}${data?.provider?.image}`
                                                                : "/assets/img/user4.jpg"
                                                        }
                                                        className="img-fluid"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="pro-title">{`${data?.provider?.first_name} ${data?.provider?.last_name}`}</div>
                                                <div className="pro-price">
                                                    {data?.provider
                                                        .account_type ==
                                                        "BASIC" &&
                                                    data?.provider
                                                        ?.provider_profile
                                                        ?.hourly_rate
                                                        ? `$${data?.provider?.provider_profile.hourly_rate} hourly rate`
                                                        : "PREMIUM"}
                                                </div>
                                                <div className="pro-jos-status">{`${data?.provider?.provider_service_requests_count} Jobs Completed`}</div>
                                                <Rating
                                                    rating={
                                                        data?.provider?.rating
                                                    }
                                                />
                                            </>
                                        );
                                    }
                                })()}
                            </div>
                            <div className="service-time-box mt-5 mb-5">
                                <div className="title-servic px-2 mb-4">
                                    How offten
                                </div>

                                <div className="ser-des text-left mb-4">
                                    Amet minim mollit non deserunt ullamco est
                                    sit aliqua dolor do amet sint. Velit officia
                                    consequat duis enim velit mollit.
                                    Exercitation veniam consequat sunt nostrud
                                    amet.
                                </div>

                                <hr />

                                <div className="amet-minim d-flex align-items-center py-3">
                                    <div className="amet-img mr-3">
                                        {/* <img src="" className="img-fluid" alt=""/> */}
                                    </div>
                                    <h5>Amet minim mollit non deserunt.</h5>
                                </div>
                                <div className="amet-minim d-flex align-items-center py-3">
                                    <div className="amet-img mr-3">
                                        {/* <img src="" className="img-fluid" alt=""/> */}
                                    </div>
                                    <h5>Amet minim mollit non deserunt.</h5>
                                </div>
                                <div className="amet-minim d-flex align-items-center py-3">
                                    <div className="amet-img mr-3">
                                        {/* <img src="" className="img-fluid" alt=""/> */}
                                    </div>
                                    <h5>Amet minim mollit non deserunt.</h5>
                                </div>
                                <div className="amet-minim d-flex align-items-center py-3">
                                    <div className="amet-img mr-3">
                                        {/* <img src="" className="img-fluid" alt=""/> */}
                                    </div>
                                    <h5>Amet minim mollit non deserunt.</h5>
                                </div>
                                <hr />

                                <ul className="profile-links-left">
                                    {state?.providerProfile?.data?.provider?.provider_services?.map(
                                        (service, index) => {
                                            return (
                                                <li
                                                    className="item"
                                                    key={index}
                                                >
                                                    <a
                                                        href="#"
                                                        className="link"
                                                    >
                                                        <i
                                                            className="fa fa-angle-right pr-2"
                                                            aria-hidden="true"
                                                        ></i>{" "}
                                                        {
                                                            service?.sub_service
                                                                ?.name
                                                        }
                                                    </a>
                                                </li>
                                            );
                                        }
                                    )}
                                    {/* <li className="item">
                                        <a href="#" className="link">
                                            <i className="fa fa-angle-right pr-2" aria-hidden="true"></i> Sewing
                                        </a>
                                    </li>  */}
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-8 mt-5">
                            <div className="job-provider-card">
                                {(() => {
                                    const providerProfile =
                                        state?.providerProfile;
                                    if (
                                        (providerProfile &&
                                            providerProfile.error == false,
                                        providerProfile?.data)
                                    ) {
                                        const provider =
                                            providerProfile?.data?.provider;
                                        if (provider?.bio) {
                                            return (
                                                <div className="useer-qust mt-0 mb-3">
                                                    <div className="title">
                                                        How can i help ?
                                                    </div>
                                                    <div className="des">
                                                        {provider.bio}
                                                    </div>
                                                </div>
                                            );
                                        }
                                    }
                                })()}
                                {(() => {
                                    const providerProfile =
                                        state?.providerProfile;
                                    if (
                                        (providerProfile &&
                                            providerProfile.error == false,
                                        providerProfile?.data)
                                    ) {
                                        const feedbacks =
                                            providerProfile?.data?.feedback;
                                        if (feedbacks?.length > 0) {
                                            return (
                                                <>
                                                    {feedbacks.map(
                                                        (feedback, index) =>
                                                            feedback.user && (
                                                                <div
                                                                    key={index}
                                                                    className="top-reviews-list"
                                                                >
                                                                    <div className="revie-card">
                                                                        <div className="d-flex align-itmes-center justify-content-between">
                                                                            <div className="title">{`${feedback?.user?.first_name} ${feedback?.user?.last_name[0]}.`}</div>
                                                                            <Rating
                                                                                rating={
                                                                                    feedback?.rating
                                                                                }
                                                                            />
                                                                        </div>

                                                                        <div className="review-item d-flex align-itmes-centetr justifu-content-between">
                                                                            <div className="review-img">
                                                                                <img
                                                                                    src="/assets/img/user4.jpg"
                                                                                    className="img-fluid"
                                                                                    alt=""
                                                                                />
                                                                            </div>
                                                                            {feedback?.comment ? (
                                                                                <div className="review-detail">
                                                                                    {
                                                                                        feedback?.comment
                                                                                    }
                                                                                </div>
                                                                            ) : (
                                                                                ""
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                    )}
                                                </>
                                            );
                                        }
                                    }
                                    return (
                                        <center
                                            className="col-12 alert alert-warnig"
                                            role="alert"
                                            style={{ fontSize: 20 }}
                                        >
                                            Not have reviews
                                        </center>
                                    );
                                })()}
                                {/* <div className="top-reviews-list">
                                    <div className="revie-card">
                                        <div className="d-flex align-itmes-center justify-content-between">
                                        <div className="title">Justin Donin</div>
                                        <div className="star-rating-area">
                                            <div className="rating-static clearfix mr-3" rel="4">
                                                <label className="full" title="{{ 'Awesome - 5 stars' | translate }}" ></label>
                                                <label className="half" title="{{ 'Excellent - 4.5 stars' | translate }}" ></label>
                                                <label className="full" title="{{ 'Excellent - 4 stars' | translate }}" ></label>
                                                <label className="half" title="{{ 'Better - 3.5 stars' | translate }}" ></label>
                                                <label className="full" title="{{ 'Good - 3 stars' | translate }}" ></label>
                                                <label className="half" title="{{ 'Good - 2.5 stars' | translate }}" ></label>
                                                <label className="full" title="{{ 'Fair - 2 stars' | translate }}" ></label>
                                                <label className="half" title="{{ 'Fair - 1.5 stars' | translate }}" ></label>
                                                <label className="full" title="{{ 'Bad - 1 star' | translate }}" ></label>
                                                <label className="half" title="{{ 'Bad - 0.5 stars' | translate }}" ></label>
                                            </div> */}
                                {/* <div className="ratilike ng-binding">5</div> */}
                                {/* </div>
                                        </div>

                                        <div className="review-item d-flex align-itmes-centetr justifu-content-between">
                                            <div className="review-img">
                                                <img src="/assets/img/user4.jpg" className="img-fluid" alt="" />
                                            </div>

                                            <div className="review-detail">
                                                I'm Sharonda! I have over 8 years of experience in housekeeping.
                                                My goal is to delight my customers by providing a deep, thorough cleaning.
                                                Dusted surfaces, baseboards, ceiling fans, and polished appliances
                                                are a big deal to me. I pay close detail to all the nooks and cranies.
                                        </div>
                                        </div>
                                    </div> */}

                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
