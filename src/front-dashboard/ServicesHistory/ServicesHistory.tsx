import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import Loading from "../../front-end/common/Loading";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Rating from "../../components/Rating";
import Paginate from "../../components/Paginate";
import { HOST } from "../../constants";
import { ReactSwal } from "../../helper/swal";
import { WorkStatus } from "./components/WrokStatus";
import SubHeader from "../../front-end/common/header/header.sub";
import ServiceHistoryItem from "./components/service.history.item";
export const ServicesHistory = (props) => {
  const { location, history } = props;

  // dispach functions
  const {
    getServiceRequestList,
    handleServiceRequestNotification,
    serviceRequestListUpdate,
    pay,
    addFeedback,
    initialFeedback,
  } = props;

  // redux state
  const {
    loading,
    error,
    message,
    serviceRequestList,
    payLoading,
    payError,
    payMessage,
    payData,
    feedbackLoading,
    feedbackError,
    feedbackMessage,
    feedbackData,
  } = props;

  // const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    second: 0,
    payable: {} as any,
    error: {} as any,
  });

  const ref = useRef(null);
  const payRef = useRef<HTMLButtonElement>(null);

  const [feedback, setFeedback] = useState({
    service_request_id: "",
    provider_id: "",
    comment: "",
    rating: "",
  });
  const stripe = useStripe();
  const elements = useElements();
  const [checkoutError, setCheckoutError] = useState();

  // useEffect(() => {
  //     if (feedbackData) {
  //         getServiceRequestList(location.search)
  //         serviceRequestListUpdate(feedbackData?.service_request);
  //     }
  // }, [feedbackData])

  useEffect(() => {
    !serviceRequestList?.data?.length &&
      getServiceRequestList(location?.search || "");
  }, []);

  useEffect(() => {
    location?.search && getServiceRequestList(location.search);
  }, [location.search]);

  useEffect(() => {
    if (feedbackMessage && feedbackError == false) {
      ref.current.click();
      ReactSwal.fire({
        position: "top-end",
        icon: "success",
        title: "Feedback added successfully!",
        showConfirmButton: false,
        timer: 1000,
        allowOutsideClick: false,
        showCloseButton: true,
      });
      serviceRequestListUpdate(feedbackData.service_request);
      // dispatch(getServiceRequestList(location.search));
      return;
    }
  }, [feedbackMessage, feedbackError]);

  useEffect(() => {
    if (payMessage && payError == false) {
      ReactSwal.fire({
        position: "top-end",
        icon: "success",
        title: payMessage,
        showConfirmButton: false,
        timer: 1000,
        allowOutsideClick: false,
        showCloseButton: true,
      });

      handleServiceRequestNotification(payData.service_request_id);
      payRef.current.click();
    }
  }, [payData]);

  /**
   * get payable object and set state
   *
   * @param {object} payable
   */
  const handlePaymentClick = (payable) => {
    setState((state) => ({ ...state, payable }));
  };

  /**
   * close modal and remove payable state
   */
  const handleCloseClick = () => {
    setState((state) => ({ ...state, payable: "" }));
    if (feedback.rating) {
      initialFeedback([]);
      setFeedback((state) => ({
        ...state,
        service_request_id: "",
        provider_id: "",
        comment: "",
        rating: "",
      }));
    }
  };

  /**
   * handle Feedback click
   *
   * @param {object} data
   */
  const handleFeedbackClick = (service_request_id, provider_id) => {
    setFeedback((state) => ({ ...state, service_request_id, provider_id }));
  };

  /**
   * handle card details change
   *
   * @param {object} event
   */
  const handleCardDetailsChange = (event) => {
    if (event.error) {
      setCheckoutError(event.error.message);
    } else {
      // setState((state) => ({ ...state, error: { ...state.error, stripeErr: undefined } }))
      setCheckoutError(null);
    }
  };

  /**
   * handle pay click
   */
  const handlePayClick = async () => {
    setIsLoading(true);
    const cardElement = elements.getElement("card");
    try {
      const { error, token } = await stripe.createToken(
        elements.getElement(CardElement)
      );
      if (token && state.payable !== undefined) {
        pay({ token: token.id, payable_id: state.payable.id });
        setIsLoading(false);
      }
      if (error) {
        setState((state) => ({
          ...state,
          error: { ...state.error, stripeErr: error.message },
        }));
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setState((state) => ({
        ...state,
        error: { ...state.error, stripeErr: error.message },
      }));
    }
  };

  /**
   * handle select feedback click
   *
   * @param {int} rating
   */
  const handleSelectFeedbackClick = (rating: number) => {
    setFeedback((state) => ({
      ...state,
      rating: Math.ceil(rating).toString(),
    }));
  };

  /**
   * handle change comment
   */
  const handleCommentChange = (event) => {
    setFeedback((state) => ({ ...state, comment: event.target.value }));
  };

  /**
   * handle feedback submit
   */
  const handleFeedbackSubmit = () => {
    if (
      feedback.rating !== "" &&
      feedback.provider_id !== "" &&
      feedback.service_request_id !== ""
    ) {
      addFeedback({
        service_request_id: feedback.service_request_id,
        provider_id: feedback.provider_id,
        comment: feedback.comment,
        rating: feedback.rating,
      });
    }
  };

  // const TimeCounter = ({ worked_times }) => {
  //     const [time, setTime] = useState(new Date());
  //     useEffect(() => {
  //         setTime(new Date());
  //     }, [time]);
  //     return (
  //         <div className="time-counter">
  //             {time.getHours() +
  //                 ":" +
  //                 time.getMinutes() +
  //                 ":" +
  //                 time.getSeconds()}
  //         </div>
  //     );
  // };

  return (
    <>
      <SubHeader title="Service History"></SubHeader>

      <div
        className="dashborad-box order-history py-16 bg-gray-100"
        // style={{
        //     backgroundImage: `url("/assets/img/apply-bg.jpg")`,
        //     backgroundSize: "cover",
        //     backgroundAttachment: "fixed",
        // }}
      >
        <Loading loading={loading} backdrop={false} />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {loading == false && error == true && message && (
                <>
                  <div className="page-title">{JSON.stringify(message)}</div>
                  <div className="text-center">
                    <i className="fa fa-frown-o fa-5x" />
                  </div>
                </>
              )}
            </div>
            <>
              {serviceRequestList?.data?.length > 0 &&
                serviceRequestList?.data?.map((serviceRequest, index) => (
                  <div
                    className="col-9 mobile-auto-col col-sm-6 col-lg-4"
                    key={index}
                  >
                    <ServiceHistoryItem
                      handleFeedbackClick={handleFeedbackClick}
                      handlePaymentClick={handlePaymentClick}
                      serviceRequest={serviceRequest}
                    />
                  </div>
                ))}
            </>
          </div>
          {serviceRequestList?.last_page > 0 && (
            <div
              style={{
                backgroundColor: "white",
                padding: "3rem",
                borderRadius: "1rem",
              }}
            >
              <Paginate
                {...{
                  last_page: serviceRequestList?.last_page,
                  current_page: serviceRequestList?.current_page,
                  func: getServiceRequestList,
                }}
              />
            </div>
          )}
        </div>
      </div>
      <button
        data-feature="true"
        className="d-none"
        data-backdrop="static"
        data-keyboard="false"
        data-toggle="modal"
        data-target="#payable"
        ref={payRef}
      ></button>
      <div
        className="modal fade bd-example-modal-md"
        id="feedback"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-md  max-w-[80rem]"
          role="document"
        >
          <div className="modal-content fare-card px-24">
            <button
              className="fare-btn fare-btn-default fare-btn-large absolute right-8 top-8"
              onClick={handleCloseClick}
              data-dismiss="modal"
              ref={ref}
            >
              <i className="la la-times mr-2 "></i>Close
            </button>

            <div className="d-flex flex-column items-center gap-12 mt-16">
              <h5 className="title font-medium text-3xl">Add Feedback</h5>
              <div className="w-100">
                <label>Add Comment</label>
                <div className="common-input">
                  <textarea
                    onChange={handleCommentChange}
                    name="detail"
                    value={feedback.comment}
                    placeholder="Enter feedback here"
                  />
                </div>
              </div>
              <div className="align-self-start">
                <label>Add Rating</label>
                <Rating
                  onChange={handleSelectFeedbackClick}
                  rating={Number(feedback.rating)}
                  className="text-orange-400"
                />
              </div>
              <div className="d-flex gap-12 w-100">
                <button
                  type="button"
                  className="fare-btn fare-btn-default flex-grow-1"
                  data-dismiss="modal"
                  onClick={handleCloseClick}
                  disabled={feedbackLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleFeedbackSubmit}
                  disabled={
                    feedback.rating == "" ||
                    feedback.provider_id == "" ||
                    feedback.service_request_id == "" ||
                    feedbackLoading ||
                    feedbackError == false
                      ? true
                      : false
                  }
                  type="button"
                  className="fare-btn fare-btn-primary flex-grow-1"
                >
                  {feedbackLoading ? (
                    <>
                      <i className="fa fa-spinner fa-pulse"></i> Loading
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>

            {/* <div className="modal-body d-none">
              <div className="row m-2">
                <div className="col-12">
                  {(() => {
                    if (feedbackLoading == false) {
                      if (feedbackMessage && feedbackError == true) {
                        return (
                          <div
                            className={`col-12  alert alert-danger text-center`}
                            role="alert"
                            style={{
                              fontSize: 15,
                            }}
                          >
                            {feedbackMessage}
                          </div>
                        );
                      }
                    }
                  })()}
                  <div
                    className="col-md-12 text-dark mb-2"
                    style={{ fontSize: 20 }}
                  >
                    Add comment
                  </div>
                  <div className="common-input">
                    <textarea
                      onChange={handleCommentChange}
                      name="detail"
                      value={feedback.comment}
                      placeholder="please add some details..."
                    />
                  </div>
                  <div
                    className="col-md-12 text-dark mb-2"
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Rating
                  </div>
                  <div className="star-rating-area d-flex align-items-center justify-content-start">
                    <div
                      className="rating-static clearfix mr-3"
                      data-rel={feedback.rating}
                    >
                      <label
                        className="full"
                        title="{{ 'Awesome - 5 stars' | translate }}"
                        onClick={() => handleSelectFeedbackClick(5)}
                      ></label>
                      <label
                        className="half"
                        title="{{ 'Excellent - 4.5 stars' | translate }}"
                        onClick={() => handleSelectFeedbackClick(5)}
                      ></label>
                      <label
                        className="full"
                        title="{{ 'Excellent - 4 stars' | translate }}"
                        onClick={() => handleSelectFeedbackClick(4)}
                      ></label>
                      <label
                        className="half"
                        title="{{ 'Better - 3.5 stars' | translate }}"
                        onClick={() => handleSelectFeedbackClick(4)}
                      ></label>
                      <label
                        className="full"
                        title="{{ 'Good - 3 stars' | translate }}"
                        onClick={() => handleSelectFeedbackClick(3)}
                      ></label>
                      <label
                        className="half"
                        title="{{ 'Good - 2.5 stars' | translate }}"
                        onClick={() => handleSelectFeedbackClick(3)}
                      ></label>
                      <label
                        className="full"
                        title="{{ 'Fair - 2 stars' | translate }}"
                        onClick={() => handleSelectFeedbackClick(2)}
                      ></label>
                      <label
                        className="half"
                        title="{{ 'Fair - 1.5 stars' | translate }}"
                        onClick={() => handleSelectFeedbackClick(2)}
                      ></label>
                      <label
                        className="full"
                        title="{{ 'Bad - 1 star' | translate }}"
                        onClick={() => handleSelectFeedbackClick(1)}
                      ></label>
                      <label
                        className="half"
                        title="{{ 'Bad - 0.5 stars' | translate }}"
                        onClick={() => handleSelectFeedbackClick(1)}
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="modal-footer d-none">
              <button
                type="button"
                className="button-common"
                data-dismiss="modal"
                onClick={handleCloseClick}
                disabled={feedbackLoading}
              >
                Close
              </button>
              <button
                onClick={handleFeedbackSubmit}
                disabled={
                  feedback.rating == "" ||
                  feedback.provider_id == "" ||
                  feedback.service_request_id == "" ||
                  feedbackLoading ||
                  feedbackError == false
                    ? true
                    : false
                }
                type="button"
                className="button-common-2"
              >
                {feedbackLoading ? (
                  <>
                    <i className="fa fa-spinner fa-pulse"></i> Loading
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade bd-example-modal-md"
        id="payable"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-md"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title display-4" id="exampleModalLongTitle">
                Pending Payment
              </h5>
            </div>
            <div className="modal-body">
              <div className="row m-2">
                <div className="col-12">
                  {(() => {
                    if (checkoutError) {
                      return (
                        <div
                          className="col-12  alert alert-danger text-center"
                          role="alert"
                          style={{ fontSize: 15 }}
                        >
                          {checkoutError}
                        </div>
                      );
                    }
                    if (payLoading == false) {
                      if (payError) {
                        return (
                          <div
                            className={`col-12  alert alert-${
                              payError == false ? "success" : "danger"
                            } text-center`}
                            role="alert"
                            style={{
                              fontSize: 15,
                            }}
                          >
                            {payMessage}
                          </div>
                        );
                      }
                    }
                    if (payLoading || isLoading) {
                      return (
                        <div
                          className="col-12  alert alert-info text-center"
                          role="alert"
                          style={{ fontSize: 15 }}
                        >
                          <i className="fa fa-spinner fa-spin"></i>{" "}
                          Processing...
                        </div>
                      );
                    }
                  })()}
                  <div className="text-center" style={{ fontSize: "2.5rem" }}>
                    {"Please Enter Card details"}
                  </div>
                  <CardElement
                    onChange={handleCardDetailsChange}
                    className="m-5"
                  />
                  <hr />
                  <div className="row justify-content-md-between mt-3">
                    <div className="col-6" style={{ fontSize: "2rem" }}>
                      Payable Amount
                    </div>
                    <div
                      className="col-6"
                      style={{ fontSize: "2rem" }}
                    >{`$${state?.payable?.amount}`}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="button-common"
                data-dismiss="modal"
                onClick={handleCloseClick}
              >
                Close
              </button>
              <button
                onClick={handlePayClick}
                disabled={
                  payLoading ||
                  isLoading ||
                  state?.payable?.amount == null ||
                  checkoutError != null
                }
                type="button"
                className="button-common-2"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
