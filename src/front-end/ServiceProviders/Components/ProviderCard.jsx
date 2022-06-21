import { memo } from "react";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import ServiceType from "../../../constants/ServiceType";
import Rating from "../../../components/Rating";
import { HOST } from "../../../constants";

const ProviderCard = memo(({ list, is_loggedin, handleContinueClick }) => {
    const history = useHistory();
    const location = useLocation();

    const handleDisableLoad = (provider) => {
        return (
            (location?.state?.service_type &&
                (location?.state?.service_type == ServiceType.MOVING &&
                (provider.service_type == ServiceType.MOVING ||
                    ServiceType.MULTIPLE)
                    ? false
                    : true)) ||
            (provider.account_type === "BASIC" &&
                provider?.provider_profile?.hourly_rate &&
                provider?.provider_schedules_count == 0 &&
                (provider.service_type != ServiceType.MOVING ||
                    ServiceType.MULTIPLE))
        );
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
                                                    history?.push({
                                                        pathname:
                                                            "/moving-request",
                                                        state: {
                                                            date: location
                                                                ?.state?.date,
                                                            end_lat:
                                                                location?.state
                                                                    ?.end_lat,
                                                            end_lng:
                                                                location?.state
                                                                    ?.end_lng,
                                                            from_address:
                                                                location?.state
                                                                    ?.from_address,
                                                            service_type:
                                                                location?.state
                                                                    ?.service_type,
                                                            start_lat:
                                                                location?.state
                                                                    ?.start_lat,
                                                            start_lng:
                                                                location?.state
                                                                    ?.start_lng,
                                                            to_address:
                                                                location?.state
                                                                    ?.to_address,
                                                            provider_id:
                                                                provider.id,
                                                            sub_service_id:
                                                                location?.state
                                                                    ?.sub_service_id,
                                                            vehicle_type_id:
                                                                location?.state
                                                                    ?.vehicle_type_id,
                                                            zip_code:
                                                                location?.state
                                                                    ?.zip_code,
                                                            date: moment(
                                                                location.state
                                                                    .date
                                                            ).format(
                                                                "YYYY-MM-DD"
                                                            ),
                                                        },
                                                    });
                                                    return;
                                                } else {
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
                                                }
                                            }}
                                            value={provider.id}
                                            type="button"
                                            data-backdrop="static"
                                            data-keyboard="false"
                                            className="button-common-2"
                                            data-toggle="modal"
                                            data-target={
                                                location.state.service_type !=
                                                    ServiceType.MOVING &&
                                                (provider.account_type ===
                                                    "BASIC" &&
                                                (provider?.provider_profile
                                                    ?.hourly_rate ||
                                                    (provider.service_type ==
                                                        ServiceType.MULTIPLE &&
                                                        provider?.provider_schedules_count ==
                                                            0))
                                                    ? "#hourly"
                                                    : "#quotation")
                                            }
                                            disabled={handleDisableLoad(
                                                provider
                                            )}
                                        >
                                            {(() => {
                                                if (
                                                    (provider.service_type ==
                                                        ServiceType.MOVING ||
                                                        ServiceType.MULTIPLE) &&
                                                    provider?.provider_schedules_count ==
                                                        0
                                                ) {
                                                    return "Get a Qoutation";
                                                } else if (
                                                    provider.account_type ===
                                                        "BASIC" &&
                                                    provider?.provider_profile
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
                                            onClick={(event) => {
                                                handleContinueClick(
                                                    event,
                                                    provider.account_type ===
                                                        "BASIC"
                                                        ? true
                                                        : false,
                                                    provider
                                                );
                                            }}
                                        >
                                            {provider.account_type === "BASIC"
                                                ? "Make a Request"
                                                : "Get a Qoutation"}
                                        </button>
                                    )}
                                </div>
                                <div className="user-price">
                                    {!!provider?.provider_profile
                                        ?.hourly_rate &&
                                    provider.service_type != ServiceType.MOVING
                                        ? `$${provider?.provider_profile?.hourly_rate}`
                                        : ""}
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
                                                            (provider
                                                                ?.user_feedbacks[0]
                                                                ?.user?.image &&
                                                                process.env
                                                                    .REACT_APP_API_BASE_URL +
                                                                    provider
                                                                        ?.user_feedbacks[0]
                                                                        ?.user
                                                                        ?.image) ||
                                                            ""
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
