import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileCard from "../../components/ProfileCard";
import { getProfile } from "../../store/Slices/UserSlice";
import AddPaymentCard from "./AddPaymentCard";
import Profile from "./Profile";

export const MyAccount = (props) => {
    const dispatch = useDispatch();

    const profile = useSelector((state) => state.userReducer.profile);

    useEffect(() => {
        if (localStorage.getItem("user_data")) {
            let user = JSON.parse(localStorage.getItem("user_data"));
            dispatch(getProfile(user.id));
        } else {
            localStorage.clear();
        }
    }, []);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        {(() => {
                            let data = {};
                            if (profile?.data) {
                                data.name =
                                    profile?.data?.first_name +
                                    " " +
                                    profile?.data?.last_name;
                                data.sub_title = profile?.data?.account_type;
                                data.image = profile?.data?.image;
                                data.rating = profile?.data?.rating;
                            }
                            data.loading = profile?.data?.loading;
                            return <ProfileCard profile={data} />;
                        })()}
                    </div>
                    <div
                        className="col-md-8 mt-5 mb-5 service-time-box"
                        style={{
                            fontSize: "1.5rem",
                        }}
                    >
                        <Profile profile={profile} />
                    </div>
                </div>
            </div>
        </>
    );
};
