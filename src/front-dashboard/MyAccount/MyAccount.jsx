import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import ProfileCard from "../../components/ProfileCard";
import {
    addAddress,
    deleteAddress,
    getAddresses,
    getProfile,
    initialState,
} from "../../store/Slices/UserSlice";
import {
    getPaymentCards,
    addPaymentCard,
    deleteCard,
    paymentInitialState,
} from "./../../store/Slices/payments/paymentSlice";
import { toast } from "react-toastify";
import AddPaymentCard from "./AddPaymentCard";
import Profile from "./Profile";
import Loading from "../../front-end/common/Loading";
import AutoCompleteInput from "../../components/AutoCompleteInput";
import Swal from "sweetalert2";

export const MyAccount = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [state, setState] = useState({ type: "HOME", addCardError: true });
    const [checkoutError, setCheckoutError] = useState();
    const dispatch = useDispatch();
    const cardLoading = useRef(null);
    const loading = useRef(null);
    const success = useRef(null);
    const error = useRef(null);
    const closeRef = useRef(null);
    const closeAddressModalRef = useRef(null);
    const profile = useSelector((state) => state.userReducer?.profile);
    const address = useSelector((state) => state.userReducer?.address);
    const addressList = useSelector((state) => state.userReducer?.addresses);
    const delAddress = useSelector((state) => state.userReducer?.delAddress);

    const paymentCard = useSelector((state) => state.paymentReducer?.list);

    const removeCard = useSelector((state) => state.paymentReducer?.removeCard);

    const addCard = useSelector((state) => state.paymentReducer?.addCard);

    useEffect(() => {
        if (localStorage.getItem("user_data")) {
            let user = JSON.parse(localStorage.getItem("user_data"));
            dispatch(getProfile(user.id));
            dispatch(getAddresses());
            dispatch(getPaymentCards());
        } else {
            localStorage.clear();
        }
    }, []);

    useEffect(() => {
        if (delAddress?.loading) {
            loading.current = toast.info("Address list loading...", {
                toastId: loading.current,
                autoClose: false,
            });
            return true;
        }

        if (delAddress?.error == false && delAddress?.data) {
            toast.dismiss(loading.current);
            toast.success(delAddress?.message, {
                toastId: success.current,
            });
            return true;
        }

        if (delAddress?.error) {
            toast.dismiss(loading.current);
            toast.error(delAddress?.message, {
                toastId: error.current,
            });
            return true;
        }
    }, [delAddress]);

    useEffect(() => {
        if (address?.loading) {
            loading.current = toast.info("Address adding...", {
                toastId: loading.current,
                autoClose: false,
            });
            return true;
        }

        if (address?.error == false && address?.data) {
            closeAddressModalRef.current.click();
            toast.dismiss(loading.current);
            toast.success("Address added successfully", {
                toastId: success.current,
            });
            return true;
        }

        if (address?.error) {
            toast.dismiss(loading.current);
            toast.error(address?.message || "Address adding failed", {
                toastId: error.current,
            });
            return true;
        }
    }, [address]);

    useEffect(() => {
        if (removeCard?.loading) {
            loading.current = toast.info("Card deleting...", {
                toastId: loading.current,
                autoClose: false,
            });
            return true;
        }

        if (removeCard?.error == false && removeCard?.data) {
            toast.dismiss(loading.current);
            toast.success("Card deleted successfully", {
                toastId: success.current,
            });
            return true;
        }

        if (removeCard?.error) {
            toast.dismiss(loading.current);
            toast.error(removeCard?.message || "Card deleting failed", {
                toastId: error.current,
            });
            return true;
        }
    }, [removeCard]);

    useEffect(() => {
        if (addCard?.loading) {
            cardLoading.current = toast.info("Card adding...", {
                toastId: loading.current,
                autoClose: false,
            });
            return true;
        }

        if (addCard?.error == false) {
            closeRef.current.click();
            toast.dismiss(cardLoading.current);
            toast.success("Card added successfully", {
                toastId: success.current,
            });
            return true;
        }

        if (addCard?.error) {
            toast.dismiss(cardLoading.current);
            toast.error(addCard?.message || "Card adding failed", {
                toastId: error.current,
            });
            return true;
        }
    }, [addCard]);

    const handleChangeZipCode = (e) => {
        const { name, value } = e.target;
        setState((state) => ({ ...state, [name]: value }));
        let errorMsg = "Zip Code may not be less than 3 grater than 15";
        if ((value.length > 3 && value.length < 15) || value.length == 0) {
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

    const handleCardDetailsChange = (e) => {
        if (e.error) {
            setCheckoutError(e.error.message);
            setState((state) => ({
                ...state,
                addCardError: true,
            }));
        } else {
            setState((state) => ({
                ...state,
                addCardError: false,
            }));
            setCheckoutError();
        }
    };

    const handleAddCardClick = async () => {
        try {
            loading.current = toast.info("Card adding...", {
                toastId: loading.current,
                autoClose: false,
            });
            setState((state) => ({
                ...state,
                error: { ...state.error, stripeErr: undefined },
            }));
            const { error, token } = await stripe.createToken(
                elements.getElement(CardElement)
            );
            if (token) {
                dispatch(addPaymentCard({ token: token.id }));
            }
            if (error) {
                setState((state) => ({
                    ...state,
                    error: { ...state.error, stripeErr: error.message },
                }));
            }
        } catch (error) {
            setState((state) => ({
                ...state,
                error: { ...state.error, stripeErr: error.message },
            }));
        }
    };

    return (
        <>
            <Loading
                loading={
                    addressList?.loading ||
                    profile?.loading ||
                    paymentCard?.loading
                }
            />
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
                    <div className="col-lg-4">
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
                        className="col-lg-8 mt-5 mb-5 service-time-box"
                        style={{
                            fontSize: "1.5rem",
                        }}
                    >
                        <div
                            className="text-left"
                            style={{
                                fontWeight: "bold",
                                fontSize: "2rem",
                                marginBottom:'1rem',
                            }}
                        >
                            Profile
                        </div>
                        <Profile profile={profile} />
                    </div>
                    <div className="col-md-12 mb-5 service-time-box time-list d-flex align-items-center justify-content-between flex-wrap">
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
                                data-target={`#addCard`}
                                className="button-common mb-4"
                            >
                                <i className="fa fa-plus"></i> Add Card
                            </button>
                        </div>
                        {paymentCard?.data?.data?.length > 0 ? (
                            paymentCard?.data?.data?.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="col-md-6 d-flex"
                                    >
                                        <div className="order-card d-flex align-items-center justify-content-between w-100">
                                            <div>
                                                {item.brand == "Visa" && (
                                                    <i
                                                        className="fa fa-cc-visa fa-5x text-primary"
                                                        aria-hidden="true"
                                                    ></i>
                                                )}
                                                {item.brand == "MasterCard" && (
                                                    <i
                                                        className="fa fa-cc-mastercard fa-5x"
                                                        // "text-primary"
                                                        aria-hidden="true"
                                                    ></i>
                                                )}
                                                {/* <img
                                                    src="/assets/img/master-card.svg"
                                                    alt=""
                                                /> */}
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="order-des-b ml-4">
                                                    <div className="title">
                                                        {`${item?.brand}****${item?.last4}`}
                                                    </div>
                                                    {/* <div className="order-time">
                                                        primary
                                                    </div> */}
                                                    <div className="order-time">
                                                        Expires{" "}
                                                        {`${item?.exp_month}/${item?.exp_year}`}
                                                    </div>
                                                </div>
                                                <div className="order-btn-b m-3 align-baseline">
                                                    <button
                                                        className="btn-view-profile"
                                                        // data-backdrop="static"
                                                        // data-keyboard="false"
                                                        // data-toggle="modal"
                                                        // data-target="#delete"
                                                        onClick={() => {
                                                            Swal.fire({
                                                                title: "Are you sure?",
                                                                text: "You won't be able to revert this!",
                                                                icon: "warning",
                                                                showCancelButton: true,
                                                                confirmButtonColor: "#3085d6",
                                                                cancelButtonColor: "#d33",
                                                                confirmButtonText: "Yes, delete it!",
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    dispatch(deleteCard(item.id));
                                                                }
                                                            });
                                                            // setState({
                                                            //     ...state,
                                                            //     delete_card_id:
                                                            //         item.id,
                                                            // });
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                    {/* <div className="btn-price-serv">
                                                        edit
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-md-12 d-flex">Not Found</div>
                        )}
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
                                        >
                                            <div className="col-md-9">
                                                {address?.address}
                                            </div>
                                            <div className="col-md-3">
                                                <span
                                                    // data-backdrop="static"
                                                    // data-keyboard="false"
                                                    // data-toggle="modal"
                                                    // data-target="#delete"
                                                    style={{
                                                        fontSize: "1.5rem",
                                                        float: "right",
                                                        color: "#ff0000",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                        Swal.fire({
                                                            title: "Are you sure?",
                                                            text: "You won't be able to revert this!",
                                                            icon: "warning",
                                                            showCancelButton: true,
                                                            confirmButtonColor: "#3085d6",
                                                            cancelButtonColor: "#d33",
                                                            confirmButtonText: "Yes, delete it!",
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                dispatch(deleteAddress(address.id));
                                                            }
                                                        });
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
                className="modal fade bd-example-modal"
                id="addCard"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered modal"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title "
                                style={{
                                    fontSize: "1.5rem",
                                }}
                                id="exampleModalLongTitle"
                            >
                                Add new card
                            </h5>
                            <button
                                // type="button"
                                ref={closeRef}
                                style={{
                                    fontSize: "2rem",
                                }}
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                    setState({
                                        ...state,
                                    });
                                    dispatch(paymentInitialState("addCard"));
                                }}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div
                                    className="col-md-12 text-center"
                                    style={{
                                        fontSize: "1.5rem",
                                    }}
                                >
                                    Please add your card
                                    <CardElement
                                        onChange={handleCardDetailsChange}
                                        className="m-5"
                                    />
                                    <p className="text-danger">
                                        {checkoutError}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="button-common"
                                data-dismiss="modal"
                                onClick={() => {
                                    dispatch(paymentInitialState("addCard"));
                                }}
                            >
                                <i className="fa fa-close"></i> Cancel
                            </button>
                            <button
                                type="button"
                                className="button-common-2"
                                onClick={handleAddCardClick}
                                disabled={
                                    !stripe ||
                                    !elements ||
                                    checkoutError ||
                                    state?.addCardError
                                }
                            >
                                <i className="fa fa-plus"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade bd-example-modal"
                id="delete"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered modal"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title "
                                style={{
                                    fontSize: "1.5rem",
                                }}
                                id="exampleModalLongTitle"
                            >
                                Delete
                            </h5>
                            <button
                                // type="button"
                                style={{
                                    fontSize: "2rem",
                                }}
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                    setState({
                                        ...state,
                                        delete_card_id: null,
                                        delete_address_id: null,
                                    });
                                    state?.delete_card_id &&
                                        dispatch(
                                            paymentInitialState("removeCard")
                                        );
                                    state?.delete_address_id &&
                                        dispatch(initialState("delAddress"));
                                }}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div
                                    className="col-md-12"
                                    style={{
                                        fontSize: "2rem",
                                    }}
                                >
                                    {state?.delete_card_id &&
                                        "Are you sure you want to delete card?"}
                                    {state?.delete_address_id &&
                                        "Are you sure you want to delete address?"}
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
                                        delete_card_id: null,
                                        delete_address_id: null,
                                    });
                                    state?.delete_card_id &&
                                        dispatch(
                                            paymentInitialState("removeCard")
                                        );
                                    state?.delete_address_id &&
                                        dispatch(initialState("delAddress"));
                                }}
                            >
                                <i className="fa fa-close"></i> Cancel
                            </button>
                            <button
                                type="button"
                                className="button-common-2"
                                style={{
                                    backgroundColor: "#ff0000",
                                }}
                                onClick={() => {
                                    if (state?.delete_card_id) {
                                        dispatch(
                                            deleteCard(state?.delete_card_id)
                                        );
                                    }
                                    if (state?.delete_address_id) {
                                        dispatch(
                                            deleteAddress(
                                                state?.delete_address_id
                                            )
                                        );
                                    }
                                    setState({
                                        ...state,
                                        delete_card_id: null,
                                        delete_address_id: null,
                                    });
                                }}
                                data-dismiss="modal"
                            >
                                <i className="fa fa-trash"></i> Delete
                            </button>
                        </div>
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
                                ref={closeAddressModalRef}
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
                                <ul className="time-list d-flex align-items-center justify-content-center ">
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
                                    state?.error?.zip_codeErr != "" ||
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
