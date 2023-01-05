import Rating from "../../../components/Rating";

const ProfileCard = ({
    profileloading,
    profileError,
    profileMessage,
    profile,
    HOST,
}) => {
    if (profileloading)
        return (
            <center
                className="col-12 alert alert-warnig"
                role="alert"
                style={{ fontSize: 20 }}
            >
                Please wait
            </center>
        );
    else if (profileError)
        return (
            <center
                className="col-12 alert alert-danger"
                role="alert"
                style={{ fontSize: 20 }}
            >
                {profileMessage}
            </center>
        );
    else if (profile)
        return (
            <>
                <div className="pro-pic">
                    <img
                        src={
                            (profile?.provider?.image &&
                                `${HOST}${profile?.provider?.image}`) ||
                            ""
                        }
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assets/img/Profile_avatar.png";
                        }}
                        className="img-fluid"
                        alt=""
                    />
                </div>
                <div className="pro-title">{`${profile?.provider?.first_name} ${profile?.provider?.last_name}`}</div>
                <div className="pro-price">
                    {profile?.provider.account_type == "BASIC" &&
                    profile?.provider?.provider_profile?.hourly_rate
                        ? `$${profile?.provider?.provider_profile.hourly_rate} hourly rate`
                        : "PREMIUM"}
                </div>
                <div className="pro-jos-status">{`${profile?.provider?.provider_service_requests_count} Jobs Completed`}</div>
                <Rating rating={profile?.provider?.rating} />
            </>
        );
    else return null;
};

export { ProfileCard };
