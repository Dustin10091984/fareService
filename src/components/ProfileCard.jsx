import { useEffect, memo } from "react";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { changeImage, initialState } from "./../store/Slices/UserSlice";
import { HOST } from "../constants";

const ProfileCard = ({ profile }) => {
    const dispatch = useDispatch();
    const imageUpdate = useSelector((state) => state.userReducer.imageUpdate);

    useEffect(() => {
        return () => {
            dispatch(initialState("imageUpdate"));
        };
    }, []);

    // useEffect(() => {
    //     if (imageUpdate?.error) {
    //         toast.dismiss(imgLoading.current);
    //         toast.error(profile?.imageUpdate?.message);
    //         return true;
    //     }
    // }, [imageUpdate]);
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            let formData = new FormData();
            formData.append("image", e.target.files[0]);
            formData.append("_method", "PATCH");
            dispatch(changeImage(formData));
        }
    };
    return (
        <div className="profile-info service-time-box text-center mt-5 mb-5 h-auto">
            {!!imageUpdate?.error && (
                <div className="alert alert-danger">
                    <strong>{imageUpdate?.message}</strong>
                </div>
            )}
            {profile?.loading ? (
                <>
                    <i className="fa fa-spinner fa-pulse fa-5x fa-fw m-5"></i>
                    <span className="sr-only">Loading...</span>
                </>
            ) : (
                <>
                    <div className="profile-box-11">
                        <div className="pro-pic">
                            <img
                                src={
                                    profile?.image
                                        ? HOST + profile?.image
                                        : "/assets/img/Profile_avatar.png"
                                }
                                className="img-fluid"
                                alt=""
                            />
                            <input
                                type="file"
                                id="image"
                                className="d-none"
                                onChange={handleImageChange}
                            ></input>
                            {!!imageUpdate?.loading && (
                                <i
                                    style={{
                                        position: "absolute",
                                        top: "40%",
                                        left: "40%",
                                        // transform: "translate(-50%, -50%)",
                                        fontSize: "30px",
                                        // backgroundColor: "rgba(0,0,0,0.5)",
                                        redius: "50%",
                                        color: "white",
                                        cursor: "pointer",
                                    }}
                                    className="fa fa-spinner fa-pulse fa-4x"
                                ></i>
                            )}
                            <label
                                className="fa fa-camera-retro fa-2x"
                                style={{
                                    backgroundColor: "white",
                                    border: "3px solid #000000000",
                                    borderRadius: "50%",
                                    position: "absolute",
                                    zIndex: "1",
                                    bottom: "10%",
                                    right: "0px",
                                    cursor: "pointer",
                                }}
                                htmlFor="image"
                            ></label>
                        </div>
                    </div>
                    <div className="pro-title">{profile?.name || "Name"}</div>
                    <div className="pro-price">
                        {profile?.sub_title || "BASIC"}
                    </div>
                    {/* <div className="pro-jos-status">{profile?.rating || 0}</div> */}
                    {<Rating rating={profile?.rating || 0} />}
                </>
            )}
        </div>
    );
};

export default memo(ProfileCard);
