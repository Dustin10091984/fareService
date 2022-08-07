import { memo } from "react";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import ServiceType from "../../../constants/ServiceType";
import Rating from "../../../components/Rating";
import { HOST } from "../../../constants";
import { classNames } from "../../../helper/class-name";

const ProviderCard = memo(({ list, is_loggedin, handleContinueClick }) => {
    const history = useHistory();
    const location = useLocation();

    const showHourlyRate = (provider) => {
        {
            if (
                provider.provider_type == "Individual" &&
                !!provider?.provider_profile?.hourly_rate
            ) {
                return (
                    <>
                        <span>${provider.provider_profile.hourly_rate}</span>
                        <span>/hr</span>
                    </>
                );
            }
        }
    };

    const showButtonText = (provider) => {
        if (provider.provider_type == "Individual") return "Make a Request";
        else if (provider.provider_type == "Business") return "Get a Qoutation";

        // if (location?.state?.service_type == ServiceType.MOVING) {
        //     return "Get a Qoutation";
        // } else {
        //     if (
        //         (provider.account_type === "BASIC" ||
        //             provider.account_type === "PREMIUM") &&
        //         provider?.service_type == ServiceType.MULTIPLE
        //     ) {
        //         if (
        //             provider?.provider_schedules_count > 0 &&
        //             provider?.provider_profile?.hourly_rate
        //         ) {
        //             return "Make a Request";
        //         } else {
        //             return "Get a Qoutation";
        //         }
        //     } else if (
        //         provider.account_type === "BASIC" &&
        //         provider?.service_type !== ServiceType.MULTIPLE &&
        //         provider?.provider_profile?.hourly_rate
        //     ) {
        //         return provider?.provider_schedules_count > 0
        //             ? "Make a Request"
        //             : "Not Available";
        //     } else if (
        //         provider?.account_type == "PREMIUM" &&
        //         provider?.service_type !== ServiceType.MULTIPLE
        //     ) {
        //         return "Get a Qoutation";
        //     } else {
        //         return "Not Available";
        //     }
        // }
    };

    const handleDisableLoad = (provider) => {
        if (provider.provider_type == "Business") {
            return false;
        } else {
            const array = [
                provider.provider_type == "Individual",
                !!provider?.provider_profile?.hourly_rate,
                !!provider?.provider_schedules_count,
            ];
            return array.includes(false);
        }

        // if (provider?.service_type === ServiceType.MULTIPLE) {
        //     return false;
        // } else if (
        //     location?.state?.service_type == ServiceType.MOVING &&
        //     provider.service_type == ServiceType.MOVING
        // ) {
        //     return false;
        // } else if (
        //     provider.account_type === "BASIC" &&
        //     provider?.provider_profile?.hourly_rate &&
        //     provider?.provider_schedules_count > 0
        // ) {
        //     return false;
        // } else if (provider.account_type === "PREMIUM") {
        //     return false;
        // }
        // return false;
    };

    const handleMovingContinueClick = (provider_id) => {
        const {
            state: {
                date,
                end_lat,
                end_lng,
                from_address,
                service_type,
                start_lat,
                start_lng,
                to_address,
                sub_service_id,
                vehicle_type_id,
                zip_code,
            },
        } = location;
        history?.push({
            pathname: "/moving-request",
            state: {
                date,
                end_lat,
                end_lng,
                from_address,
                service_type,
                start_lat,
                start_lng,
                to_address,
                provider_id,
                sub_service_id,
                vehicle_type_id,
                zip_code,
                date: moment(date).format("YYYY-MM-DD"),
            },
        });
        return;
    };

    const handleTargetModel = (provider) => {
        if (!location.state.service_type == ServiceType.MOVING) {
            if (provider.provider_type == "Individual") return "#hourly";
            else if (provider.provider_type == "Business") return "#quotation";
        }
        return null;
    };

    return (
        <>
            {list?.map((provider, index) => {
                return (
                    <div key={index} className="job-provider-card">
                        <div className="user-des d-flex align-items-center justify-content-start w-100">
                            <div className="user-img d-flex align-items-center justify-content-center">
                                <img
                                    src={
                                        (provider.image &&
                                            `${HOST}${provider.image}`) ||
                                        ""
                                    }
                                    onError={(e) => {
                                        e.target.onerror = null;
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
                                        {provider.first_name}{" "}
                                        {provider.last_name}
                                    </div>
                                    <Link
                                        to={`/provider/profile/${provider.id}`}
                                        className="button-common"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                                <div className="job-status">
                                    {provider.provider_service_requests_count}{" "}
                                    Jobs Completed
                                </div>
                                <div className="stars-rating w-100  d-flex align-items-center justify-content-between">
                                    <Rating rating={provider?.rating} />

                                    {location.state !== undefined &&
                                    is_loggedin === true ? (
                                        <button
                                            onClick={(event) => {
                                                if (
                                                    location.state
                                                        .service_type ==
                                                    ServiceType.MOVING
                                                ) {
                                                    handleMovingContinueClick(
                                                        provider.id
                                                    );
                                                } else {
                                                    handleContinueClick(
                                                        provider
                                                    );
                                                }
                                            }}
                                            value={provider.id}
                                            type="button"
                                            data-backdrop="static"
                                            data-keyboard="false"
                                            className={classNames(
                                                "button-common-2",
                                                `${
                                                    handleDisableLoad(provider)
                                                        ? "disabled-btn"
                                                        : ""
                                                }`
                                            )}
                                            data-toggle="modal"
                                            data-target={handleTargetModel(
                                                provider
                                            )}
                                            disabled={handleDisableLoad(
                                                provider
                                            )}
                                        >
                                            {showButtonText(provider)}
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className={classNames(
                                                "button-common-2",
                                                `${
                                                    handleDisableLoad(provider)
                                                        ? "disabled-btn"
                                                        : ""
                                                }`
                                            )}
                                            onClick={() => {
                                                handleContinueClick(provider);
                                            }}
                                        >
                                            {showButtonText(provider)}
                                        </button>
                                    )}
                                </div>
                                <div className="user-price">
                                    {showHourlyRate(provider)}
                                </div>
                            </div>
                        </div>
                        {provider.bio !== undefined &&
                            provider?.user_feedbacks[0] !== undefined && <hr />}
                        {provider.bio && (
                            <div className="useer-qust">
                                <div className="title">Bio</div>
                                <div className="des">{provider.bio}</div>
                            </div>
                        )}
                        <>
                            {(() => {
                                if (provider?.user_feedbacks[0] !== undefined) {
                                    return (
                                        <div className="top-reviews-list">
                                            <div className="review-title">
                                                Top Review
                                            </div>
                                            <div className="review-item d-flex align-itmes-centetr justifu-content-between">
                                                <div className="review-img">
                                                    <img
                                                        src={
                                                            provider
                                                                ?.user_feedbacks[0]
                                                                ?.user?.image
                                                                ? `${HOST}${provider?.user_feedbacks[0]?.user?.image}`
                                                                : ""
                                                        }
                                                        className="img-fluid"
                                                        alt="Not have"
                                                        onError={(e) => {
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
            })}
        </>
    );
});

export { ProviderCard };
