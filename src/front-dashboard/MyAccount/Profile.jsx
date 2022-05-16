import React, { useState, useEffect, useRef } from "react";
import { patchupdateProfile, initialState } from "../../store/Slices/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const Profile = ({ profile }) => {
    const loading = useRef(null);
    const dispatch = useDispatch();
    const [state, setState] = useState({ errors: {} });

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

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
        if (profile) {
            setState((prevState) => ({
                ...prevState,
                profile: profile?.data,
            }));
            reset(profile?.data);
        }
    }, [profile?.data]);

    useEffect(() => {
        if (updateProfile?.error) {
            toast.dismiss(loading.current);
            typeof updateProfile?.message !== "object"
                ? toast.error(updateProfile?.message)
                : setState({ ...state, errors: updateProfile?.message });
            return true;
        }
        if (updateProfile?.error === false && updateProfile?.message) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }, [updateProfile?.error]);

    const handleChange = (e) => {
        // if (e.target.value == "") {
        //     setState({
        //         ...state,
        //         profile: { ...state.profile, [e.target.name]: e.target.value },
        //         errors: {
        //             ...state.errors,
        //             [e.target.name]: " Required",
        //         },
        //     });
        // } else {
        //     setState({
        //         ...state,
        //         profile: { ...state.profile, [e.target.name]: e.target.value },
        //         errors: {
        //             ...state.errors,
        //             [e.target.name]: "",
        //         },
        //     });
        // }
    };

    const handleOnSubmit = (data) => {
        let d = { ...state?.profile, ...data };
        dispatch(patchupdateProfile(d));
    };

    const hasError = (field) => {
        return state?.errors[field] ? (
            <p className="text-danger">{state?.errors[field]}</p>
        ) : null;
    };

    return (
        <>
            <div
                className="text-left"
                style={{
                    fontWeight: "bold",
                    fontSize: "2rem",
                    marginBottom: "1rem",
                }}
            >
                Profile
            </div>
            {/* {updateProfile?.error == false && updateProfile?.message && (
                <div className="text-center text-success">
                    Profile updated successfully
                </div>
            )} */}
            {updateProfile?.error == true &&
                typeof updateProfile?.message !== "string" && (
                    <div className="text-center text-success">
                        {updateProfile?.message}
                    </div>
                )}
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="common-input mb-2">
                            First Name
                            <input
                                type="text"
                                placeholder="First Name"
                                // defaultValue={state?.profile?.first_name || ""}
                                {...register("first_name", {
                                    required: true,
                                    minLength: 2,
                                    maxLength: 25,
                                    onChange: handleChange,
                                })}
                                // {...setValue(
                                //     "first_name",
                                //     state?.profile?.first_name
                                // )}
                            />
                            {errors?.first_name?.type === "required" && (
                                <p className="text-danger">
                                    {errors?.first_name?.message ||
                                        "First Name is required"}
                                </p>
                            )}
                            {errors?.first_name?.type === "minLength" && (
                                <p className="text-danger">
                                    {errors?.first_name?.message ||
                                        "First Name must be at least 2 characters"}
                                </p>
                            )}
                            {errors?.first_name?.type === "maxLength" && (
                                <p className="text-danger">
                                    {errors?.first_name?.message ||
                                        "First Name must be at most 25 characters"}
                                </p>
                            )}
                            {hasError("first_name")}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="common-input mb-2">
                            Last Name
                            <input
                                type="text"
                                placeholder="Last Name"
                                defaultValue={state?.profile?.last_name || ""}
                                {...register("last_name", {
                                    required: true,
                                    minLength: 2,
                                    maxLength: 25,
                                    value: state?.profile?.last_name,
                                    onChange: handleChange,
                                })}
                                // {...setValue(
                                //     "last_name",
                                //     state?.profile?.last_name
                                // )}
                            />
                            {errors?.last_name?.type === "required" && (
                                <p className="text-danger">
                                    {errors?.last_name?.message ||
                                        "Last Name is required"}
                                </p>
                            )}
                            {errors?.last_name?.type === "minLength" && (
                                <p className="text-danger">
                                    {errors?.last_name?.message ||
                                        "Last Name must be at least 2 characters"}
                                </p>
                            )}
                            {errors?.last_name?.type === "maxLength" && (
                                <p className="text-danger">
                                    {errors?.last_name?.message ||
                                        "Last Name must be at most 25 characters"}
                                </p>
                            )}
                            {hasError("last_name")}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="common-input mb-2">
                            Email
                            <input
                                type="email"
                                placeholder="Email"
                                // defaultValue={state?.profile?.email || ""}
                                {...register("email", {
                                    required: true,
                                })}
                                // {...setValue("email", state?.profile?.email)}
                                readOnly
                            />
                            {hasError("email")}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="common-input mb-2">
                            Phone
                            <input
                                type="tel"
                                placeholder="Phone No"
                                defaultValue={state?.profile?.phone || ""}
                                {...register("phone", {
                                    required: true,
                                })}
                                {...setValue("phone", state?.profile?.phone)}
                                readOnly
                            />
                            {hasError("phone")}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="common-input mb-2">
                            Zip Code
                            <input
                                type="text"
                                placeholder="ZIP Code"
                                defaultValue={state?.profile?.zip_code || ""}
                                {...register("zip_code", {
                                    required: true,
                                    minLength: 2,
                                    maxLength: 20,
                                    value: state?.profile?.zip_code,
                                    onChange: handleChange,
                                })}
                                // {...setValue(
                                //     "zip_code",
                                //     state?.profile?.zip_code
                                // )}
                            />
                            {errors?.zip_code?.type === "required" && (
                                <p className="text-danger">
                                    {errors?.zip_code?.message ||
                                        "Zip Code is required"}
                                </p>
                            )}
                            {errors?.zip_code?.type === "minLength" && (
                                <p className="text-danger">
                                    {errors?.zip_code?.message ||
                                        "Zip Code must be at least 2 characters"}
                                </p>
                            )}
                            {errors?.zip_code?.type === "maxLength" && (
                                <p className="text-danger">
                                    {errors?.zip_code?.message ||
                                        "Zip Code must be at most 20 characters"}
                                </p>
                            )}
                            {hasError("zip_code")}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="common-input mb-2">
                            Bio
                            <textarea
                                type="text"
                                placeholder="ZIP Code"
                                defaultValue={state?.profile?.bio || ""}
                                {...register("bio", {
                                    required: true,
                                    minLength: 20,
                                    maxLength: 100,
                                    value: state?.profile?.bio,
                                    onChange: handleChange,
                                })}
                                // {...setValue("bio", state?.profile?.bio)}
                            ></textarea>
                            {errors?.bio?.type === "required" && (
                                <p className="text-danger">
                                    {errors?.bio?.message || "Bio is required"}
                                </p>
                            )}
                            {errors?.bio?.type === "minLength" && (
                                <p className="text-danger">
                                    {errors?.bio?.message ||
                                        "Bio must be at least 20 characters"}
                                </p>
                            )}
                            {errors?.bio?.type === "maxLength" && (
                                <p className="text-danger">
                                    {errors?.bio?.message ||
                                        "Bio must be at most 100 characters"}
                                </p>
                            )}
                            {hasError("bio")}
                        </div>
                    </div>
                    <div className="col-md-12 mt-4">
                        <button
                            disabled={
                                state?.profile?.first_name === "" ||
                                state?.profile?.last_name === "" ||
                                state?.profile?.zip_code === "" ||
                                updateProfile?.loading
                            }
                            type="submit"
                            className="button-common w-100 mb-5"
                        >
                            {updateProfile?.loading ? (
                                <div className="text-center">
                                    <i className="fa fa-spinner fa-pulse" />{" "}
                                    Updating...
                                </div>
                            ) : (
                                "Update"
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Profile;
