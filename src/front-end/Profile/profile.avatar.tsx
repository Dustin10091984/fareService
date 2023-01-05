import * as React from "react";
import { RatingWithLabel } from "../../components/Rating";
import { HOST } from "../../constants";
import { padNumber } from "../../helper/utils";

export interface IProfileAvatarProps {
  provider: IProvider;
}

export default function ProfileAvatar({ provider }: IProfileAvatarProps) {
  return (
    <div className="fare-card p-0 overflow-auto">
      <img src="/assets/img/profile_avatar_bg.png" className="" />
      <div className="d-flex space-y-2 flex-column align-items-center justify-content-center mb-5">
        <div className="user-img relative mt-[-6rem] ">
          <img
            src={(provider.image && `${HOST}${provider.image}`) || ""}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/assets/img/Profile_avatar.png";
            }}
            className="img-fluid border-white border-[6px] border-solid rounded-full w-[12rem] h-[12rem] object-cover"
            alt="Not Found"
          />
          <div className="dot border-[3px] border-white bg-green-500 w-[2.4rem] h-[2.4rem] absolute right-3 bottom-2 rounded-full"></div>
        </div>
        <div className="text-xl">{`${provider?.first_name} ${provider?.last_name}`}</div>
        <div className="text-base">
          {provider.account_type == "BASIC" &&
          provider?.provider_profile?.hourly_rate
            ? `$${provider?.provider_profile.hourly_rate} hourly rate`
            : "PREMIUM"}
        </div>
        <div className="text-gray-400">{`${provider?.provider_service_requests_count} Jobs Completed`}</div>
        <div>
          <RatingWithLabel rating={provider?.rating} />
          <span>({padNumber(provider?.user_feedbacks_count, 2)})</span>
          <span className="mx-4"></span>
          <i className="fa fa-map-marker text-gray-500"></i>
          &nbsp; {provider?.provider_profile.city}
        </div>
      </div>
    </div>
  );
}
