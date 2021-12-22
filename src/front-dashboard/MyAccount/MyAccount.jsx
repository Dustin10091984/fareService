import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileCard from "../../components/ProfileCard";
import {
    addAddress,
    deleteAddress,
    getAddresses,
    getProfile,
    initialState,
} from "../../store/Slices/UserSlice";
import { toast } from "react-toastify";
import AddPaymentCard from "./AddPaymentCard";
import Profile from "./Profile";
import Loading from "../../front-end/common/Loading";
import AutoCompleteInput from "../../components/AutoCompleteInput";

export const MyAccount = (props) => {
    const [state, setState] = useState({ type: "HOME" });
    const dispatch = useDispatch();
    const loading = useRef(null);
    const profile = useSelector((state) => state.userReducer.profile);
    const address = useSelector((state) => state.userReducer?.address);
    const addressList = useSelector((state) => state.userReducer?.addresses);
    const delAddress = useSelector((state) => state.userReducer?.delAddress);

    useEffect(() => {
        if (localStorage.getItem("user_data")) {
            let user = JSON.parse(localStorage.getItem("user_data"));
            dispatch(getProfile(user.id));
            dispatch(getAddresses());
        } else {
            localStorage.clear();
        }
    }, []);

    useEffect(() => {
        if (delAddress?.loading) {
            loading.current = toast.info("Address list loading...", {
                autoClose: false,
            });
            return true;
        }

        if (delAddress?.error == false && delAddress?.data) {
            toast.dismiss(loading.current);
            toast.success(delAddress?.message);
            return true;
        }

        if (delAddress?.error) {
            toast.dismiss(loading.current);
            toast.error(delAddress?.message);
            return true;
        }
    }, [delAddress]);

    useEffect(() => {
        if (address?.loading) {
            loading.current = toast.info("Address adding...", {
                autoClose: false,
            });
            return true;
        }

        if (address?.error == false && address?.data) {
            toast.dismiss(loading.current);
            toast.success("Address added successfully");
            return true;
        }

        if (address?.error) {
            toast.dismiss(loading.current);
            toast.error(address?.message || "Address adding failed");
            return true;
        }
    }, [address]);

    const handleChangeZipCode = (e) => {
        const { name, value } = e.target;
        setState((state) => ({ ...state, [name]: value }));
        let errorMsg = "Zip Code may not be less than 3 grater than 15";
        if (value.length > 3 && value.length < 15) {
            errorMsg = "";
        }
        setState((state) => ({
            ...state,
            error: { ...state.error, [`${name}Err`]: errorMsg },
        }));
    };

    const handleFlatNoChange = (e) => {
        if (e.target.value.length <= 5) {
            setState({
                ...state,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleAddAddress = () => {
        dispatch(
            addAddress({
                type: state.type,
                address: state.address,
                flat_no: state.flat_no,
                zip_code: state.zip_code,
            })
        );
    };
    return (
        <>
            <Loading loading={addressList?.loading || profile?.loading} />
            <div
                className="container"
                style={{
                    border: "1px solid #e5e5e5",
                    borderRadius: "1rem",
                    padding: "5rem",
                    fontSize: "1.5rem",
                    boxShadow: "0px 0px 10px #e5e5e5",
                    marginTop: "2rem",
                }}
            >
                <div
                    className="text-center"
                    style={{
                        fontWeight: "bold",
                        fontSize: "2rem",
                    }}
                >
                    My Account
                </div>
                <div className="row">
                    <div className="col-md-4">
                        {(() => {
                            let data = {};
                            if (profile?.data) {
                                data.name =
                                    profile?.data?.first_name +
                                    " " +
                                    profile?.data?.last_name;
                                data.sub_title = profile?.data?.email;
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
                        <div
                            className="text-center"
                            style={{
                                fontWeight: "bold",
                                fontSize: "2rem",
                            }}
                        >
                            Profile
                        </div>
                        <Profile profile={profile} />
                    </div>
                    <div className="col-md-12 mb-5 service-time-box time-list d-flex align-items-center justify-content-center flex-wrap">
                        <div
                            className="text-center col-md-12"
                            style={{
                                fontWeight: "bold",
                                fontSize: "2rem",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <span>Card</span>
                            <button
                                data-backdrop="static"
                                data-keyboard="false"
                                data-toggle="modal"
                                data-target={`#model`}
                                className="button-common mb-4"
                            >
                                <i className="fa fa-plus"></i> Add Card
                            </button>
                        </div>
                        <div className="col-md-6 d-flex">
                            <div className="order-card d-flex align-items-center justify-content-between">
                                <div>
                                    <img
                                        src="/assets/img/master-card.svg"
                                        alt=""
                                    />
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="order-des-b ml-4">
                                        <div className="title">
                                            mastercar****2232
                                        </div>
                                        <div className="order-time">
                                            primary
                                        </div>
                                        <div className="order-time">
                                            Expires 11/3
                                        </div>
                                    </div>
                                    <div className="order-btn-b">
                                        <button className="btn-view-profile">
                                            Remove
                                        </button>
                                        <div className="btn-price-serv">
                                            edit
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex">
                            <div className="order-card d-flex align-items-center justify-content-between">
                                <div>
                                    <img
                                        src="/assets/img/master-card.svg"
                                        alt=""
                                    />
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="order-des-b ml-4">
                                        <div className="title">
                                            mastercar****2232
                                        </div>
                                        <div className="order-time">
                                            primary
                                        </div>
                                        <div className="order-time">
                                            Expires 11/3
                                        </div>
                                    </div>
                                    <div className="order-btn-b">
                                        <button className="btn-view-profile">
                                            Remove
                                        </button>
                                        <div className="btn-price-serv">
                                            edit
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 service-time-box time-list d-flex align-items-center justify-content-center flex-wrap">
                        <div
                            className="text-center col-md-12"
                            style={{
                                fontWeight: "bold",
                                fontSize: "2rem",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <span>Address details</span>
                            <button
                                data-backdrop="static"
                                data-keyboard="false"
                                data-toggle="modal"
                                data-target={`#model`}
                                className="button-common mb-4"
                            >
                                <i className="fa fa-plus"></i> Add Address
                            </button>
                        </div>
                        {(() => {
                            if (addressList?.data) {
                                return addressList?.data.map(
                                    (address, index) => (
                                        <div
                                            style={{
                                                cursor: "default",
                                            }}
                                            key={index}
                                            className="address-card row"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                        >
                                            <div className="col-md-9">
                                                {address?.address}
                                            </div>
                                            <div className="col-md-3">
                                                <span
                                                    style={{
                                                        fontSize: "1.5rem",
                                                        float: "right",
                                                        color: "#ff0000",
                                                    }}
                                                    onClick={() => {
                                                        dispatch(
                                                            deleteAddress(
                                                                address.id
                                                            )
                                                        );
                                                    }}
                                                >
                                                    Delete{" "}
                                                    <i
                                                        className="fa fa-trash fa-1x"
                                                        aria-hidden="true"
                                                    ></i>
                                                </span>
                                            </div>

                                            <div className="col-md-6">
                                                Zip Code: {address?.zip_code}
                                            </div>
                                            <div className="col-md-6">
                                                <span
                                                    style={{
                                                        float: "right",
                                                    }}
                                                >
                                                    {address.type}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                );
                            }
                        })()}
                    </div>
                </div>
            </div>

            <div
                className="modal fade bd-example-modal-lg"
                id="model"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered modal-lg"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title display-4"
                                id="exampleModalLongTitle"
                            >
                                Add New Address
                            </h5>
                            <button
                                onClick={() => {
                                    setState({
                                        ...state,
                                        type: "HOME",
                                        address: "",
                                        flat_no: "",
                                        zip_code: "",
                                    });
                                    dispatch(initialState("address"));
                                }}
                                // type="button"
                                style={{
                                    fontSize: "4rem",
                                }}
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {address?.data && (
                                <div
                                    className="col-12  alert alert-success text-center"
                                    role="alert"
                                    style={{ fontSize: 15 }}
                                >
                                    Successfully added address
                                </div>
                            )}
                            <div className="col-12">
                                <div
                                    className="text-center"
                                    style={{
                                        fontSize: "2rem",
                                    }}
                                >
                                    Please select your address type
                                </div>
                                <ul className="time-list d-flex align-items-center justify-content-center flex-wrap s">
                                    <li
                                        style={
                                            state.type == "HOME"
                                                ? {
                                                      backgroundColor:
                                                          "#2F88E7",
                                                      color: "white",
                                                  }
                                                : {
                                                      color: "black",
                                                  }
                                        }
                                        onClick={() => {
                                            setState({
                                                ...state,
                                                type: "HOME",
                                            });
                                        }}
                                        className="d-flex align-items-center justify-content-center m-2"
                                    >
                                        {" "}
                                        Home
                                    </li>
                                    <li
                                        style={
                                            state.type == "OFFICE"
                                                ? {
                                                      backgroundColor:
                                                          "#2F88E7",
                                                      color: "white",
                                                  }
                                                : {
                                                      color: "black",
                                                  }
                                        }
                                        onClick={() => {
                                            setState({
                                                ...state,
                                                type: "OFFICE",
                                            });
                                        }}
                                        className="d-flex align-items-center justify-content-center m-2"
                                    >
                                        {" "}
                                        Office
                                    </li>
                                    <li
                                        style={
                                            state.type == "OTHER"
                                                ? {
                                                      backgroundColor:
                                                          "#2F88E7",
                                                      color: "white",
                                                  }
                                                : {
                                                      color: "black",
                                                  }
                                        }
                                        onClick={() => {
                                            setState({
                                                ...state,
                                                type: "OTHER",
                                            });
                                        }}
                                        className="d-flex align-items-center justify-content-center m-2"
                                    >
                                        {" "}
                                        Other
                                    </li>
                                </ul>
                                <AutoCompleteInput
                                    title="Address"
                                    classes="m-5"
                                    placeholder="Add Address"
                                    handleOnChange={(address) => {
                                        let mesError =
                                            state?.address?.length < 5
                                                ? "Address must be at least 5 characters"
                                                : "";
                                        setState({
                                            ...state,
                                            address,
                                            error: {
                                                ...state.error,
                                                addressErr: mesError,
                                            },
                                        });
                                    }}
                                    value={state?.address || ""}
                                    handleOnSelect={(address) =>
                                        setState({
                                            ...state,
                                            address,
                                            error: {
                                                ...state.error,
                                                addressErr: "",
                                            },
                                        })
                                    }
                                />

                                <div className="text-danger">
                                    {state?.error?.addressErr}
                                </div>
                                <label
                                    className="col-md-12 text-dark mb-2"
                                    style={{ fontSize: 20 }}
                                    htmlFor="flat_no"
                                >
                                    Flat No
                                </label>
                                <div className="common-input">
                                    <input
                                        id="flat_no"
                                        name="flat_no"
                                        placeholder="Add flat no"
                                        value={state?.flat_no || ""}
                                        onChange={handleFlatNoChange}
                                    ></input>
                                </div>
                                <label
                                    className="col-md-12 text-dark mb-2"
                                    style={{ fontSize: 20 }}
                                    htmlFor="zip_code"
                                >
                                    Zip Code
                                </label>
                                <div className="common-input">
                                    <input
                                        id="zip_code"
                                        placeholder="Add flat no"
                                        name="zip_code"
                                        value={state?.zip_code || ""}
                                        onChange={handleChangeZipCode}
                                    ></input>
                                </div>
                                <div className="text-danger">
                                    {state?.error?.zip_codeErr}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="button-common"
                                data-dismiss="modal"
                                onClick={() => {
                                    setState({
                                        ...state,
                                        type: "HOME",
                                        address: "",
                                        flat_no: "",
                                        zip_code: "",
                                    });
                                    dispatch(initialState("address"));
                                }}
                            >
                                <i className="fa fa-close"></i> Close
                            </button>
                            <button
                                type="button"
                                className="button-common-2"
                                disabled={
                                    state?.address?.length < 5 ||
                                    state?.zip_code == "" ||
                                    state?.zip_code === undefined ||
                                    state?.error?.zip_codeErr !== "" ||
                                    state?.error?.zip_codeErr === undefined ||
                                    !state?.type
                                }
                                onClick={handleAddAddress}
                            >
                                <i className="fa fa-plus"></i> Add Address
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
