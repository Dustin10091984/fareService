import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "../../components/Rating";
import { HOST } from "../../constants";
import { MovingRequest } from "./MovingRequest";
import { Service } from "./Service";
export const Services = (props) => {
  const { serviceId, subServiceId } = props.match.params;
  const { location, headerMenu, serviceData, vehicleTypes } = props;
  const { getServiceQuestion, getVehicleTypes } = props;

  useEffect(() => {
    if (subServiceId && serviceData?.data?.id != subServiceId) {
      getServiceQuestion(subServiceId);
    }
    // !!subServiceId && getCountriesList({ sub_service_id: subServiceId });
  }, [subServiceId]);

  if (parseInt(serviceId) === 3)
    return (
      <MovingRequest
        {...{
          vehicleTypes,
          serviceData,
          getVehicleTypes,
          subServiceId,
        }}
      />
    );
  else
    return (
      <>
        <div
          className="breadcrumb-sec d-flex align-items-center justify-content-center"
          style={{
            backgroundImage: `url("/assets/img/bread-bg.jpg")`,
          }}
        />

        <div className="moving-help-sec ">
          <div className="container ">
            <div className="row">
              <div className="col-12">
                {serviceId && subServiceId ? (
                  <Service {...props} {...serviceData} />
                ) : (
                  <div className="shop-search services-serch d-flex align-items-center justify-content-center mx-auto">
                    <div className="header-search d-flex align-items-center justify-content-center flex-column">
                      <div className="shop-serch-title mb-5">
                        Something went wrong
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="shop-page pad-y ">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="col-12">
                  <div className="common-heading text-center">
                    <div className="title">See all Services</div>
                    <div className="sub-des">
                      Liked or admired by many people or by a particular person
                      or group.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 ">
                <div className="service-items-list d-flex align-items-start justify-content-center w-100 flex-wrap flex-md-nowrap">
                  {headerMenu.map((mainMenu, index) => (
                    <div className="service-card mb-4" key={index}>
                      <div className="service-img">
                        <img
                          src={
                            (mainMenu?.image && HOST + mainMenu?.image) || ""
                          }
                          className="img-fluid object-cover w-100 h-100"
                          alt="image"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assets/img/service-card1.jpg";
                          }}
                        />
                      </div>
                      <ul className="service-list">
                        {mainMenu?.sub_services?.map(
                          (subMenu, index) =>
                            index < 7 && (
                              <Link
                                to={`/services/${mainMenu.name}/${mainMenu.id}/${subMenu.name}/${subMenu.id}#services-section`}
                                onClick={(e) => {
                                  if (
                                    location?.pathname ==
                                      `/services/${mainMenu.name}/${mainMenu.id}/${subMenu.name}/${subMenu.id}` &&
                                    location?.hash == "#services-section"
                                  ) {
                                    e.preventDefault();
                                  }
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                }}
                                className="item"
                                key={index}
                                role="button"
                              >
                                <div className="link">
                                  <i
                                    className="fa fa-angle-right pr-3"
                                    aria-hidden="true"
                                  ></i>
                                  {subMenu?.name}
                                </div>
                              </Link>
                            )
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {serviceData?.data?.service_contents?.length && (
          <section className="service-des-card-sec pad-t">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="common-heading text-center">
                    <div className="title">
                      What's Included in a {serviceData?.data?.name}?
                    </div>
                    <div className="sub-des">
                      Here is what you can expect from a{" "}
                      {serviceData?.data?.name}.
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {serviceData?.data?.service_contents?.map((item, index) => {
                    const description = item?.description?.split(".");
                    return (
                      <div
                        key={index}
                        className="service-card-des d-flex align-items-center "
                      >
                        <div className="src-image-box">
                          <img
                            src={
                              item?.image
                                ? HOST + item?.image
                                : "/assets/img/service-caed-2.jpg"
                            }
                            className="img-fluid"
                            alt="image"
                          />
                        </div>
                        <div className="service-card-detail">
                          <div className="title">{item?.title}</div>
                          <div className="des">
                            <ul>
                              {description?.map(
                                (point, index) =>
                                  point && (
                                    <React.Fragment key={index}>
                                      <li>{point}</li>
                                    </React.Fragment>
                                  )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <hr />
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="handy-works pad-y">
          <div className="container">
            <div className="row">
              {serviceData?.data?.provider?.length && (
                <div className="col-12">
                  <div className="common-heading text-center">
                    <div className="title">
                      Meet Some of Our Top {serviceData?.data?.name} {""}
                      Professionals
                    </div>
                    <div className="sub-des">
                      Build a Pro Team so that you always have a great group of
                      go-to professionals for all your home{" "}
                      {serviceData?.data?.name}.{" "}
                    </div>
                  </div>
                </div>
              )}
              <div className="col-12">
                <div className="row">
                  {serviceData?.data?.provider?.map((provider, index) => (
                    <div key={index} className="col-md-4">
                      <div className="team-card">
                        <div className="team-img">
                          <img
                            src={
                              (provider?.image && HOST + provider?.image) || ""
                            }
                            className="img-fluid"
                            alt="image"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/assets/img/Profile_avatar.png";
                            }}
                          />
                        </div>
                        <div className="title">
                          {`${provider?.first_name} ${provider?.first_name[0]}.`}
                        </div>
                        {provider?.provider_service_requests_count ? (
                          <div className="job-cmplte">
                            {provider?.provider_service_requests_count} Jobs
                            Completed
                          </div>
                        ) : null}
                        <div className="stars-rating ">
                          <div className="star-rating-area d-flex align-items-center justify-content-center">
                            <Rating
                              rating={
                                provider?.rating && provider?.rating?.toFixed(1)
                              }
                            ></Rating>
                          </div>
                        </div>

                        <div className="detail-team">{provider?.bio}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
};
