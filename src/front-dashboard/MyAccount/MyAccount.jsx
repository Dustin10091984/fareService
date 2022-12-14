import React, { useState, useEffect, useRef, useContext } from "react";
import { useDispatch } from "react-redux";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import ProfileCard from "../../components/ProfileCard";
import { toast } from "react-toastify";
import AddPaymentCard from "./AddPaymentCard";
import Profile from "./Profile";
import Loading from "../../front-end/common/Loading";
import AutoCompleteInput from "../../components/AutoCompleteInput";
import { MapLoadedApiContext } from "./../../helper/context";
import { ReactSwal } from "../../helper/swal";

export const MyAccount = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [state, setState] = useState({
    type: "HOME",
    addCardError: true,
    loadingForToken: false,
  });
  const [checkoutError, setCheckoutError] = useState();

  const {
    //states
    profile,
    address,
    addressList,
    delAddress,
    paymentCard,
    removeCard,
    addCard,

    // dispatch functions
    addAddress,
    deleteAddress,
    getAddresses,
    getProfile,
    initialState,
    getPaymentCards,
    addPaymentCard,
    deleteCard,
    paymentInitialState,
  } = props;

  // const isLoaded = useContext(MapLoadedApi);
  const loading = useRef(null);
  const success = useRef(null);
  const error = useRef(null);
  const closeRef = useRef(null);
  const closeAddressModalRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("user_data")) {
      let user = JSON.parse(localStorage.getItem("user_data"));
      !!!profile?.data && getProfile(user.id);
      !!!addressList?.data && getAddresses();
      !!!paymentCard?.data && getPaymentCards();
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
  }, [delAddress?.loading]);

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
  }, [address?.loading]);

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
  }, [removeCard?.loading]);

  useEffect(async () => {
    if (addCard?.error == false && addCard.loading == false) {
      closeRef.current.click();
      await ReactSwal.fire({
        icon: "success",
        title: "Card added successfully",
        showConfirmButton: false,
        timer: 1000,
        allowOutsideClick: false,
        showCloseButton: true,
      });
      return true;
    }

    if (addCard?.error && addCard?.loading == false) {
      await ReactSwal.fire({
        icon: "error",
        title: addCard?.message || "card not added",
        showConfirmButton: false,
        timer: 1000,
        allowOutsideClick: false,
        showCloseButton: true,
      });
      return true;
    }
  }, [addCard.loading]);

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
    addAddress({
      type: state.type,
      address: state.address,
      flat_no: state.flat_no,
      zip_code: state.zip_code,
    });
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
      setState((state) => ({
        ...state,
        loadingForToken: true,
        error: { ...state.error, stripeErr: undefined },
      }));
      const { error, token } = await stripe.createToken(
        elements.getElement(CardElement)
      );
      if (token) {
        setState((state) => ({
          ...state,
          loadingForToken: false,
        }));
        addPaymentCard({ token: token.id });
      }
      if (error) {
        setState((state) => ({
          ...state,
          loadingForToken: false,
          error: { ...state.error, stripeErr: error.message },
        }));
      }
    } catch (error) {
      setState((state) => ({
        ...state,
        loadingForToken: false,
        error: { ...state.error, stripeErr: error.message },
      }));
    }
  };

  return (
    <MapLoadedApiContext.Consumer>
      {(isLoaded) => (
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
                <Profile profile={profile} />
              </div>
              <div className="col-md-12 mb-5 service-time-box d-flex align-items-center justify-content-between flex-wrap">
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
                {!!paymentCard?.loading && (
                  <>
                    <i className=" text-center fa fa-spinner fa-pulse fa-5x fa-fw m-5"></i>
                    <span className="sr-only">Loading...</span>
                  </>
                )}
                {paymentCard?.data?.data?.length > 0
                  ? paymentCard?.data?.data?.map((item, index) => {
                      return (
                        <div key={index} className="col-md-6 d-flex">
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
                                  onClick={async () => {
                                    await ReactSwal.fire({
                                      title: "Are you sure?",
                                      text: "You won't be able to revert this!",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Yes, delete it!",
                                      allowOutsideClick: false,
                                      showCloseButton: true,
                                    }).then((result) => {
                                      result.isConfirmed && deleteCard(item.id);
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
                  : !paymentCard?.loading && (
                      <div className="col-md-12 d-flex">Not Found</div>
                    )}
              </div>
              <div className="col-md-12 service-time-box d-flex align-items-center justify-content-center flex-wrap">
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
                    disabled={!isLoaded}
                  >
                    <i className="fa fa-plus"></i> Add Address
                  </button>
                </div>
                {(() => {
                  if (addressList?.data) {
                    return addressList?.data?.map((address, index) => (
                      <div
                        style={{
                          cursor: "default",
                        }}
                        key={index}
                        className="address-card row"
                      >
                        <div className="col-md-9">{address?.address}</div>
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
                            onClick={async () => {
                              await ReactSwal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                                allowOutsideClick: false,
                                showCloseButton: true,
                              }).then((result) => {
                                result.isConfirmed && deleteAddress(address.id);
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
                    ));
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
                      paymentInitialState("addCard");
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
                      <p className="text-danger">{checkoutError}</p>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="fare-btn fare-btn-default px-16 mx-3"
                    data-dismiss="modal"
                    disabled={addCard?.loading || state.loadingForToken}
                    onClick={() => paymentInitialState("addCard")}
                  >
                    <i className="fa fa-close"></i> Cancel
                  </button>
                  <button
                    type="button"
                    className="fare-btn fare-btn-primary px-16"
                    onClick={handleAddCardClick}
                    disabled={
                      !stripe ||
                      !elements ||
                      checkoutError ||
                      state?.addCardError ||
                      addCard?.loading ||
                      state.loadingForToken
                    }
                  >
                    {addCard?.loading || state.loadingForToken ? (
                      <>
                        <i className={`fa fa-spinner fa-pulse`}></i> Adding...
                      </>
                    ) : (
                      <>
                        <i className="fa fa-plus"></i> Add
                      </>
                    )}
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
                        paymentInitialState("removeCard");
                      state?.delete_address_id && initialState("delAddress");
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
                        paymentInitialState("removeCard");
                      state?.delete_address_id && initialState("delAddress");
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
                        deleteCard(state?.delete_card_id);
                      }
                      if (state?.delete_address_id) {
                        deleteAddress(state?.delete_address_id);
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
            className="modal fade bd-example-modal"
            id="model"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header p-4">
                  <h5
                    className="modal-title text-2xl font-medium mx-4"
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
                      initialState("address");
                    }}
                    // type="button"
                    style={{
                      fontSize: "2rem",
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
                                backgroundColor: "#2F88E7",
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
                                backgroundColor: "#2F88E7",
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
                                backgroundColor: "#2F88E7",
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
                    {isLoaded && (
                      <AutoCompleteInput
                        title="Address"
                        classes=""
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
                    )}

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
                    className="fare-btn fare-btn-default px-16 mx-3"
                    data-dismiss="modal"
                    disabled={address?.loading}
                    onClick={() => {
                      setState({
                        ...state,
                        type: "HOME",
                        address: "",
                        flat_no: "",
                        zip_code: "",
                      });
                      initialState("address");
                    }}
                  >
                    <i className="fa fa-close"></i> Close
                  </button>
                  <button
                    type="button"
                    className="fare-btn fare-btn-primary px-16"
                    disabled={
                      state?.address?.length < 5 ||
                      state?.error?.zip_codeErr != "" ||
                      !state?.type ||
                      address?.loading
                    }
                    onClick={handleAddAddress}
                  >
                    {address?.loading ? (
                      <>
                        <i className={`fa fa-spinner fa-pulse`}></i> Adding...
                      </>
                    ) : (
                      <>
                        <i className="fa fa-plus"></i> Add Address
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </MapLoadedApiContext.Consumer>
  );
};
