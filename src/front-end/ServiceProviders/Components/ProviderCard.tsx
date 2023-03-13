import { memo } from "react";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import ServiceType from "../../../constants/ServiceType";
import Rating, { RatingWithLabel } from "../../../components/Rating";
import { HOST } from "../../../constants";
import { classNames } from "../../../helper/class-name";
import React from "react";
import { padNumber } from "../../../helper/utils";

interface IProviderCardProps {
  list: IProvider[];
  is_loggedin: boolean;
  handleContinueClick: (provider: IProvider) => void;
}

const ProviderCard: React.FC<IProviderCardProps> = ({
  list,
  is_loggedin,
  handleContinueClick,
}) => {
  const history = useHistory();
  const location = useLocation<any>();

  const showHourlyRate = (provider) => {
    {
      if (
        provider.provider_type == "Individual" &&
        !!provider?.provider_profile?.hourly_rate
      ) {
        return (
          <div>
            <b>${provider.provider_profile.hourly_rate}</b>
            <span className="text-secondary">/hr</span>
          </div>
        );
      }
    }
  };

  const showButtonText = (provider, isDisabled) => {
    if (isDisabled) return "Not Available";
    if (provider.provider_type == "Individual") return "Book service";
    else if (provider.provider_type == "Business") return "Get a Quotation";
  };

  const handleDisableLoad = (provider) => {
    if (provider.provider_type == "Business") {
      return false;
    } else {
      const array = [
        provider.provider_type == "Individual",
        provider?.provider_profile?.hourly_rate,
        //provider?.provider_schedules_count,
      ];
      return array.includes(false);
    }
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
    if (location?.state?.service_type == ServiceType.MOVING) return null;
    else if (provider?.provider_type == "Individual") return "#hourly";
    else if (provider?.provider_type == "Business") return "#quotation";
  };

  return (
    <>
      {list?.map((provider, index) => {
        return (
          <div key={index} className="job-provider-card space-y-10">
            <div className="user-des d-flex align-items-center justify-content-start w-100 space-x-12">
              <div className="user-img d-flex align-items-center justify-content-center relative">
                <img
                  src={(provider.image && `${HOST}${provider.image}`) || ""}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/assets/img/Profile_avatar.png";
                  }}
                  className="img-fluid"
                  alt="Not Found"
                />
                <div className="dot border-[3px] border-white bg-green-500 w-[2.4rem] h-[2.4rem] absolute right-3 -bottom-1 rounded-full"></div>
              </div>
              <div className="user-detail w-100 space-y-2">
                <div className=" w-100 d-flex align-items-center justify-content-between">
                  <div className="title">
                    {provider?.provider_type == "Individual" ? (
                      <>
                        {provider.first_name} {provider.last_name}
                      </>
                    ) : (
                      provider?.provider_profile?.business_name
                    )}
                    <img
                      src="/assets/img/check.svg"
                      className="d-inline mx-4"
                    />
                  </div>
                </div>
                <div className="job-status">
                  {provider.provider_completed_service_requests_count} Jobs
                  Completed
                </div>
                <div className="stars-rating w-100 d-flex items-center justify-start space-x-6">
                  {showHourlyRate(provider)}
                  <div>
                    <RatingWithLabel rating={provider?.rating ?? 0} />
                    <span>
                      ({padNumber(provider?.user_feedbacks_count, 2)})
                    </span>
                  </div>
                </div>
              </div>
              <button className="border-[1px] border-green-500 text-green-500 rounded-pill self-start text-[1.6rem] px-4 py-2">
                Available
              </button>
            </div>
            {provider.bio && (
              <div className="useer-qust">
                <div className="title">Bio</div>
                <div className="des">{provider.bio}</div>
              </div>
            )}
            <div className="d-flex items-center space-x-4">
              <div className="flex-grow text-sm">
                <i className="las la-map-marker text-gray-500 text-xl"></i>
                &nbsp; {provider?.provider_profile.city}
              </div>
              <Link
                type="button"
                to={`/provider/profile/${provider.first_name.toLowerCase()+'-'+provider?.last_name.toLowerCase()}`}
                className="fare-btn fare-btn-default"
              >
                View Profile
              </Link>
              <ContinueBtn
                service_type={location?.state?.service_type}
                provider={provider}
                is_loggedin={is_loggedin}
                handleMovingContinueClick={(data) =>
                  handleMovingContinueClick(data)
                }
                handleContinueClick={(data) => handleContinueClick(data)}
                handleTargetModel={(data) => handleTargetModel(data)}
                showButtonText={(data, check) => showButtonText(data, check)}
                handleDisableLoad={(data) => handleDisableLoad(data)}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

interface IContinueBtnProps {
  is_loggedin: boolean;
  service_type: string;
  provider: IProvider;
  handleMovingContinueClick: (id: number) => void;
  handleContinueClick: (data: IProvider) => void;
  handleTargetModel: (data: IProvider) => void;
  showButtonText: (provider: IProvider, isDisabled: boolean) => string;
  handleDisableLoad: (provider: IProvider) => boolean;
}
const ContinueBtn = (props: IContinueBtnProps) => {
  const {
    is_loggedin,
    service_type,
    provider,
    handleMovingContinueClick,
    handleContinueClick,
    handleTargetModel,
    showButtonText,
    handleDisableLoad,
  } = props;
  const isDisabled = handleDisableLoad(provider);
  return (
    <button
      onClick={() => {
        if (service_type == ServiceType.MOVING)
          handleMovingContinueClick(provider.id);
        else handleContinueClick(provider);
      }}
      value={provider.id}
      type="button"
      data-backdrop="static"
      data-keyboard="false"
      className={classNames(
        "fare-btn fare-btn-primary",
        `${isDisabled ? "disabled-btn" : ""}`
      )}
      data-toggle={is_loggedin && "modal"}
      data-target={handleTargetModel(provider)}
      disabled={isDisabled}
    >
      {showButtonText(provider, isDisabled)}
    </button>
  );
};
export default memo(ProviderCard);
