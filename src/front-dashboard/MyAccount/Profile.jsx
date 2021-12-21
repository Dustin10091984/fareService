import React, { useState, useEffect, useRef } from "react";
import { patchupdateProfile, initialState } from "../../store/Slices/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
const Profile = ({ profile }) => {
    const loading = useRef(null);
    const dispatch = useDispatch();
    const [state, setState] = useState({ errors: {} });
    const updateProfile = useSelector(
        (state) => state.userReducer.updateProfile
    );

    useEffect(() => {
        return () => {
            dispatch(initialState("profile"));
            dispatch(initialState("updateProfile"));
        };
    }, []);

    useEffect(() => {
        if (updateProfile?.loading) {
            loading.current = toast.info("updating profile", {
                autoClose: false,
            });
            return true;
        }

        if (updateProfile?.error == false) {
            toast.dismiss(loading.current);
            toast.success("Profile updated successfully");
            return true;
        }

        if (updateProfile?.error) {
            toast.dismiss(loading.current);
            typeof updateProfile?.message !== "object"
                ? toast.error(updateProfile?.message)
                : setState({ ...state, errors: updateProfile?.message });
            return true;
        }
    }, [updateProfile]);

    const handleChange = (e) => {
        if (e.target.value == "") {
            setState({
                ...state,
                profile: { ...state.profile, [e.target.name]: e.target.value },
                errors: {
                    [e.target.name]: " Required",
                },
            });
        } else {
            setState({
                ...state,
                profile: { [e.target.name]: e.target.value },
                errors: {
                    ...state.errors,
                    [e.target.name]: "",
                },
            });
        }
    };

    const handleSubmit = () => {
        let data = { ...profile?.data };
        data.first_name = state?.profile?.first_name || data?.first_name;
        data.last_name = state?.profile?.last_name || data?.last_name;
        data.zip_code = state?.profile?.zip_code || data?.zip_code;
        dispatch(patchupdateProfile(data));
    };

    const hasError = (field) => state?.errors[field] && state?.errors[field];

    return (
        <div className="row">
            <div className="col-md-6">
                <div className="common-input mb-2">
                    First Name
                    <input
                        type="text"
                        placeholder="First Name"
                        name="first_name"
                        defaultValue={profile?.data?.first_name}
                        onChange={handleChange}
                    />
                    <p className="text-danger">{hasError("first_name")}</p>
                </div>
            </div>
            <div className="col-md-6">
                <div className="common-input mb-2">
                    Last Name
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="last_name"
                        defaultValue={profile?.data?.last_name}
                        onChange={handleChange}
                    />
                    <p className="text-danger">{hasError("last_name")}</p>
                </div>
            </div>
            <div className="col-md-6">
                <div className="common-input mb-2">
                    Email
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        defaultValue={profile?.data?.email}
                        readOnly
                    />
                </div>
            </div>
            <div className="col-md-6">
                <div className="common-input mb-2">
                    Phone
                    <input
                        type="text"
                        placeholder="Phone No"
                        name="phone"
                        defaultValue={profile?.data?.phone}
                        readOnly
                    />
                </div>
            </div>
            <div className="col-md-6">
                <div className="common-input mb-2">
                    Zip Code
                    <input
                        type="text"
                        placeholder="ZIP Code"
                        name="zip_code"
                        defaultValue={profile?.data?.zip_code}
                    />
                    <p className="text-danger">{hasError("zip_code")}</p>
                </div>
            </div>
            <div className="col-md-12 mt-4">
                <button
                    disabled={
                        state?.profile?.first_name === "" ||
                        state?.profile?.last_name === "" ||
                        state?.profile?.zip_code === ""
                    }
                    type="submit"
                    className="button-common w-100 mb-5"
                    onClick={handleSubmit}
                >
                    Update{" "}
                </button>
            </div>
        </div>
    );
};

export default Profile;
