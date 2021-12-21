import Rating from "./Rating";
const ProfileCard = ({ profile }) => {
    return (
        <div className="profile-info service-time-box text-center mt-5 mb-5 h-auto mx-auto">
            {profile?.loading ? (
                <>
                    <i className="fa fa-spinner fa-pulse fa-5x fa-fw m-5"></i>
                    <span className="sr-only">Loading...</span>
                </>
            ) : (
                <>
                    <div className="pro-pic">
                        <img
                            src={profile?.image || "/assets/img/user4.jpg"}
                            className="img-fluid"
                            alt=""
                        />
                    </div>
                    <div className="pro-title">{profile?.name || "Name"}</div>
                    <div className="pro-price">
                        {profile?.sub_title || "BASIC"}
                    </div>
                    <div className="pro-jos-status">4</div>
                    {<Rating rating={profile?.rating || 0} />}
                </>
            )}
        </div>
    );
};

export default ProfileCard;
