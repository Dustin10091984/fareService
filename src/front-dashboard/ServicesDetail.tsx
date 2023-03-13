import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import Loading from "../front-end/common/Loading";
import { getServiceRequest } from "../store/Slices/services/RequestServiceSclice";
import { GoogleMap as Map, DirectionsRenderer } from "@react-google-maps/api";
import { HOST } from "../constants";
import { MapLoadedApiContext } from "../helper/context";
import { RootState } from "../store";
import SubHeader from "../front-end/common/header/header.sub";
import { padNumber } from "../helper/utils";
import { WorkStatus } from "./ServicesHistory/components/WrokStatus";
export const ServicesDetail = (props) => {
  const [state, setState] = useState<{
    reason?: string;
    response?: any;
  }>({});

  const { id } = useParams<{ id: string }>();

  const isLoaded = useContext(MapLoadedApiContext);

  const dispatch = useDispatch();
  const serviceRequestDetailResp = useSelector<
    RootState,
    DataResponse<IServiceRequestDetail>
  >((state) => state?.serviceRequest?.serviceRequestDetail);

  const { user_feeback, provider } = serviceRequestDetailResp?.data || {};
  useEffect(() => {
    if (
      serviceRequestDetailResp?.data?.id != Number(id) ||
      serviceRequestDetailResp?.data == undefined
    ) {
      dispatch(getServiceRequest(id));
    }
  }, []);

  useEffect(() => {
    if (window.google) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: serviceRequestDetailResp?.data?.quotation_info?.from_address,
          destination:
            serviceRequestDetailResp?.data?.quotation_info?.to_address,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setState({
              ...state,
              response: result,
            });
          }
        }
      );
    }
  }, [serviceRequestDetailResp]);

  return (
    <>
      <SubHeader title="Service Details" />
      <Loading loading={serviceRequestDetailResp?.loading} />
      {(
        <div className="dashborad-box order-history order-summary pad-y">
          <div className="container">
            <div className="w-[90rem] mx-auto p-0 fare-card">
              {(() => {
                if (serviceRequestDetailResp?.error) {
                  return (
                    <div
                      className="text text-danger text-center"
                      style={{
                        fontSize: "2.5rem",
                      }}
                    >
                      {serviceRequestDetailResp?.message}
                    </div>
                  );
                }
                let data = null;

                if (serviceRequestDetailResp?.data) {
                  data = serviceRequestDetailResp?.data;
                }

                return (
                  <ul className="list-group w-100 rounded-[1.2rem]">
                    <li className="list-group-item d-flex justify-between items-center gap-12 py-16">
                      <img
                        src={
                          data?.provider?.image
                            ? `${HOST}${data?.provider?.image}`
                            : `/assets/img/Profile_avatar.png`
                        }
                        className="img-fluid w-[12rem] h-[12rem] flex-shrink-0 rounded-full my-6 object-cover"
                        alt=""
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "/assets/img/Profile_avatar.png";
                        }}
                      />
                      <div className="flex-grow-1">
                        <div className="title text-3xl font-medium">
                          {data?.provider?.first_name}{" "}
                          {data?.provider?.last_name}
                        </div>
                        <div className="stars-rating w-100  d-flex align-items-centet justify-content-between">
                          <div>
                            <i className="fa fa-star text-orange-400"></i>
                            &nbsp;
                            <b>{user_feeback?.rating ?? 0}</b>&nbsp;
                            <span>
                              ({padNumber(provider?.user_feedbacks_count, 2)})
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link
                        to={`/provider/profile/${data?.provider?.first_name.toLowerCase()+'-'+data?.provider?.last_name.toLowerCase()}`}
                        className="fare-btn fare-btn-primary"
                      >
                        View Profile
                      </Link>
                    </li>
                    <li className="list-group-item d-flex justify-between bg-gray-200 border-0 items-center">
                      <span className="font-bold">Order Detail</span>
                      <WorkStatus serviceRequest={data} />
                    </li>
                    <li className="list-group-item d-flex justify-between">
                      Service Number:
                      <span className="font-bold">#{data?.id}</span>
                    </li>
                    <li className="list-group-item d-flex justify-between">
                      Request Status:
                      <span className="font-bold">{data?.status}</span>
                    </li>
                    <li className="list-group-item d-flex justify-between">
                      Working Status:
                      <span className="font-bold">
                        {data?.working_status || "Pending"}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-between">
                      Worked Hours:
                      <span className="font-bold">
                        {data?.worked_hours || 0}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-between">
                      Address:
                      <span className="font-bold">{data?.address}</span>
                    </li>
                    <li className="list-group-item d-flex justify-between">
                      Service Type:
                      <span className="font-bold">
                        {data?.requested_sub_service?.name || data?.type}
                      </span>
                    </li>
                  </ul>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
