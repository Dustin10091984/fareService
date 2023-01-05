import moment from "moment";
import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { WorkStatus } from "./WrokStatus";
import { HOST } from "./../../../constants/index";
import Rating from "../../../components/Rating";
import { padNumber } from "../../../helper/utils";
export interface IServiceHistoryItemProps {
  serviceRequest: IServiceRequest;
  handlePaymentClick: (payable: boolean) => void;
  handleFeedbackClick: (historyId: number, providerId: number) => void;
}

export default function ServiceHistoryItem(props: IServiceHistoryItemProps) {
  const history = useHistory();
  const { serviceRequest, handlePaymentClick, handleFeedbackClick } = props;
  let {
    paid_amount = "500",
    payable = true,
    payment_status = false,
    payable_amount = "1000",
    provider,
    user_feeback,
    created_at,
    is_completed,
    working_status,
  } = serviceRequest;
  return (
    <div>
      <div className="fare-card order-card d-flex gap-4 flex-column">
        <div className="d-flex justify-between items-center">
          <span>
            <span className="text-gray-500">Service No.</span>&ensp;
            <b>#{serviceRequest.id}</b>
          </span>
          <WorkStatus serviceRequest={serviceRequest} />
        </div>
        <div>
          <b className="text-sm">
            {serviceRequest.sub_service || serviceRequest.type}
          </b>
          <div className="order-time text-gray-500 text-xs">
            {moment(serviceRequest.created_at).format(
              "ddd, MM Do YYYY, h:mm:ss A"
            )}
          </div>
        </div>
        <div className="d-flex items-center gap-12">
          {user_feeback && (
            <div>
              <i className="fa fa-star text-orange-400"></i>
              &nbsp;
              <b>{user_feeback?.rating ?? 0}</b>&nbsp;
              <span>({padNumber(provider?.user_feedbacks_count, 2)})</span>
            </div>
          )}
          <div className="order-btn-b">
            {paid_amount &&
              (() => {
                if (payment_status == false && payable) {
                  return (
                    <button
                      data-feature="true"
                      className="btn-price-serv mb-3 mt-3 preventDefault"
                      style={{
                        backgroundColor: "red",
                      }}
                      onClick={() => {
                        handlePaymentClick(payable);
                      }}
                      data-backdrop="static"
                      data-keyboard="false"
                      data-toggle="modal"
                      data-target="#payable"
                    >
                      {payable_amount != null
                        ? "$" +
                          (parseInt(payable_amount) + parseInt(paid_amount))
                        : "$" + paid_amount}
                    </button>
                  );
                } else {
                  return (
                    <>
                      {(() => {
                        if (payable_amount != null) {
                          return (
                            <div className="btn-price-serv mb-3 mt-3">
                              {"$" +
                                (parseInt(payable_amount) +
                                  parseInt(paid_amount))}
                            </div>
                          );
                        } else if (paid_amount != null) {
                          return (
                            <div className="btn-price-serv mb-3 mt-3">
                              {"$" + paid_amount}
                            </div>
                          );
                        } else {
                          return (
                            <div className="btn-price-serv mb-3 mt-3">
                              {"Not Paid"}
                            </div>
                          );
                        }
                      })()}
                    </>
                  );
                }
              })()}
          </div>
        </div>
        <div className="d-flex justify-start gap-6 items-center">
          <img
            className="img-fluid"
            style={{
              height: "8.1rem",
              width: "8.1rem",
              objectFit: "cover",
              borderRadius: "100%",
            }}
            src={(provider?.image && HOST + provider?.image) || ""}
            alt=""
            onError={(e) => {
              e.currentTarget.src = "/assets/img/Profile_avatar.png";
            }}
          />
          <Link
            to={`/provider/profile/${provider?.id}`}
            className="fare-btn fare-btn-default"
          >
            View Profile
          </Link>
          <Link
            to={`service-detail/${serviceRequest.id}`}
            className="fare-btn fare-btn-primary"
          >
            View order
          </Link>
        </div>
        <div>
          {user_feeback ? (
            <></>
          ) : (
            <button
              data-feature="true"
              className="fare-btn fare-btn-primary w-100"
              onClick={(evt) => {
                // evt.preventDefault();
                handleFeedbackClick(
                  serviceRequest.id,
                  serviceRequest.provider_id
                );
              }}
              disabled={!Boolean(is_completed && working_status === "ENDED")}
              data-backdrop="static"
              data-keyboard="false"
              data-toggle="modal"
              data-target="#feedback"
            >
              Give Feedback
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
