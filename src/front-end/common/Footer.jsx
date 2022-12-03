import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter, useLocation } from "react-router-dom";
import { getPages } from "./../../store/Slices/footer/index";
const Footer = (props) => {
  const [state, setState] = useState({
    links: [],
    modal: null,
    total: false,
  });

  const location = useLocation();
  const dispatch = useDispatch();

  const ref = useRef(null);

  const year = new Date().getFullYear();

  const getLinks = useSelector((state) => state?.footerReducer?.pageLinks);
  const pages = useSelector((state) => state?.footerReducer?.pages);
  const headerMenu = useSelector((state) => state?.headerMenuReducer);

  useEffect(() => {
    dispatch(getPages());
  }, []);

  useEffect(() => {
    if (getLinks?.length > 0) {
      setState({
        links: getLinks,
      });
    }
  }, [getLinks]);

  const FooterServices = () => {
    let sub_services = [];
    headerMenu?.forEach((service) =>
      service?.sub_services?.forEach((sub_service, index) => {
        sub_services = [
          ...sub_services,
          { ...sub_service, service: service.name },
        ];
      })
    );

    return sub_services.map(
      (sub_service, index) =>
        !!(index % 2 == 0) && (
          <tr className="show-all" key={index}>
            <td
              className="col-6"
              key={`${sub_service.service_id}_${sub_service.id}`}
            >
              <Link
                to={`/services/${sub_service.service}/${sub_service.service_id}/${sub_service.name}/${sub_service.id}#services-section`}
                className="link"
                onClick={(e) => {
                  if (
                    location?.pathname ==
                      `/services/${sub_service.service}/${sub_service.service_id}/${sub_service.name}/${sub_service.id}` &&
                    location?.hash == `#services-section`
                  ) {
                    e.preventDefault();
                  }
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                  ref.current.click();
                }}
              >
                {sub_service.name}
              </Link>
            </td>
            {!!sub_services[index + 1] && (
              <td
                className="col-6"
                key={`${sub_services[index + 1].service_id}_${
                  sub_services[index + 1].id
                }`}
              >
                <Link
                  to={`/services/${sub_services[index + 1].service}/${
                    sub_services[index + 1].service_id
                  }/${sub_services[index + 1].name}/${
                    sub_services[index + 1].id
                  }#services-section`}
                  className="link"
                  onClick={(e) => {
                    if (
                      location?.pathname ==
                        `/services/${sub_services[index + 1].service}/${
                          sub_services[index + 1].service_id
                        }/${sub_services[index + 1].name}/${
                          sub_services[index + 1].id
                        }` &&
                      location?.hash == `#services-section`
                    ) {
                      e.preventDefault();
                    }
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                    ref.current.click();
                  }}
                >
                  {sub_services[index + 1].name}
                </Link>
              </td>
            )}
          </tr>
        )
    );
  };

  const FooterOtherLinks = () => {
    if (state.modal?.type == "all") {
      const otherLinks = state?.links?.filter(
        (link) => link.type == null && link.is_blog == false
      );
      return otherLinks.map(
        (link, index) =>
          !!(index % 2 == 0) && (
            <tr className="show-all" key={index}>
              <td>
                <a href={link?.url} className="link" target="_blank">
                  {link?.name || link?.page}
                </a>
              </td>
              {otherLinks[index + 1] && (
                <td>
                  <a
                    href={otherLinks[index + 1]?.url}
                    className="link"
                    target="_blank"
                  >
                    {otherLinks[index + 1]?.name || otherLinks[index + 1]?.page}
                  </a>
                </td>
              )}
            </tr>
          )
      );
    }
    if (state?.modal?.type == "blog") {
      const blogLinks = state?.links?.filter((link) => link?.is_blog);
      return blogLinks.map(
        (link, index) =>
          !!(index % 2 == 0) && (
            <tr className="show-all" key={index}>
              <td>
                <a href={link?.url} className="link" target="_blank">
                  {link?.name || link?.page}
                </a>
              </td>
              {blogLinks[index + 1] && (
                <td>
                  <a
                    href={blogLinks[index + 1]?.url}
                    className="link"
                    target="_blank"
                  >
                    {blogLinks[index + 1]?.name || blogLinks[index + 1]?.page}
                  </a>
                </td>
              )}
            </tr>
          )
      );
    }
    return <></>;
  };

  return (
    <>
      <footer className="footer-sec pt-32 py-24">
        <div className="container px-16">
          <div className="grid lg:grid-cols-10 gap-4">
            <div className="col-span-3">
              <h1 className="text-3xl text-primary-main font-medium">
                Lets keep you updated
              </h1>
              <p className="text-[1.7rem] py-8 pr-3">
                Subscribe to our newsletter to get feeds, offers and promos.
              </p>
              <div className="rounded-full bg-primary-light d-flex p-3 items-center">
                <i className="fa fa-envelope-o text-sm mx-3"></i>
                <input
                  className="text-sm border-none bg-transparent outline-none w-100 p-2"
                  placeholder="Enter your email"
                />
                <button className="fare-btn fare-btn-primary rounded-full">
                  Send
                </button>
              </div>
              <p className="text-[1.7rem] py-8">Download the Farenow App</p>
              <div>
                <button className="rounded-2xl p-3 bg-slate-900 hover:bg-slate-800 text-white text-[1rem] w-[140px]  mr-8">
                  <img
                    src="/assets/img/app-store-logo-white.svg"
                    className="float-left m-2 w-[20px]"
                  />
                  Download on the <br />{" "}
                  <span className="font-bold text-xs">App Store</span>
                </button>
                <button className="rounded-2xl p-3 bg-slate-900 hover:bg-slate-800 text-white text-[1rem] w-[140px]">
                  <img
                    src="/assets/img/google-play-logo.svg"
                    className="float-left mx-2 w-[28px]"
                  />
                  Available on the <br />{" "}
                  <span className="font-bold text-xs">Google Play</span>
                </button>
              </div>
            </div>
            <div className="col-start-5 col-span-2">
              <div className="d-flex align-items-center md:justify-center">
                <ul className="footer-link">
                  <div className="mb-4 font-bold text-xl">Popular Services</div>
                  {(() => {
                    let total = 0;
                    return headerMenu?.map((service) =>
                      service?.sub_services?.map((sub_service) => {
                        if (total < 8 && total != null) {
                          total++;
                          return (
                            <li
                              className="item"
                              key={`${service.id}_${sub_service.id}`}
                            >
                              <Link
                                to={`/services/search?subService=${sub_service.id}`}
                                className="link"
                                onClick={(e) => {
                                  if (
                                    location?.pathname ==
                                      `/services/${service.id}/${sub_service.id}` &&
                                    location?.hash == "#services-section"
                                  ) {
                                    e.preventDefault();
                                  }
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                }}
                              >
                                {sub_service.name}
                              </Link>
                              {/* <a href="#" className="link">
                              </a> */}
                            </li>
                          );
                        } else if (total == 8 && total != null) {
                          total = null;
                          return (
                            <li
                              className="item"
                              key={`${service.id}_${sub_service.id}`}
                            >
                              <span
                                className="link"
                                role="button"
                                data-backdrop="static"
                                data-keyboard="false"
                                data-toggle="modal"
                                data-target="#details"
                                onClick={() =>
                                  setState({
                                    ...state,
                                    modal: {
                                      title: "All Services",
                                      type: "services",
                                    },
                                  })
                                }
                              >
                                See all Services
                              </span>
                            </li>
                          );
                        }
                      })
                    );
                  })()}
                </ul>
              </div>
            </div>
            <div className="col-span-2">
              <div className="d-flex align-items-center md:justify-center">
                <ul className="footer-link">
                  <div className="mb-4 font-bold text-xl">Pages</div>
                  {state?.links?.map((link) => {
                    let countLink = 0;
                    if (
                      link.type == null &&
                      link.is_blog == false &&
                      countLink < 8
                    ) {
                      countLink = countLink + 1;
                      return (
                        <li className="item" key={link?.id}>
                          <a href={link?.url} className="link" target="_blank">
                            {link?.name || link?.page}
                          </a>
                        </li>
                      );
                    }
                  })}
                  {state?.links?.filter(
                    (link) => link.type == null && link.is_blog == false
                  ).length >= 8 && (
                    <li className="item">
                      <span
                        role="button"
                        className="link"
                        data-backdrop="static"
                        data-keyboard="false"
                        data-toggle="modal"
                        data-target="#details"
                        onClick={() =>
                          setState({
                            ...state,
                            modal: {
                              title: "Pages",
                              type: "all",
                            },
                          })
                        }
                      >
                        See all pages
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-span-2">
              <div className="d-flex align-items-center md:justify-center">
                <ul className="footer-link">
                  <div className="mb-4 font-bold text-xl">Support</div>
                  {pages?.data?.map((page) => (
                    <li
                      key={page?.id}
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          left: 0,
                          behavior: "smooth",
                        });
                      }}
                      className="item"
                    >
                      <Link
                        className="link"
                        to={`/page/${page.name}`}
                        onClick={(e) => {
                          if (location?.pathname == `/page/${page.name}`) {
                            e.preventDefault();
                          }
                        }}
                      >
                        {page.name}
                      </Link>
                      {/* <a href="#">{page?.name}</a> */}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="footer-sec2 bg-primary-dark">
        <div className="container">
          <div className="row">
            <div className="col-md-12 d-flex flex-wrap align-items-center justify-content-between flex-column flex-md-row">
              <div className="footer-lgoo mb-5 p-4 rounded-xl bg-gray-50">
                <Link
                  to={(location) => ({
                    ...location,
                    pathname: "/",
                    hash: "",
                  })}
                  onClick={(e) => {
                    if (location?.pathname == "/") {
                      e.preventDefault();
                    }
                  }}
                >
                  <img
                    src="/assets/img/logo.png"
                    className="img-fluid"
                    alt=""
                  />
                </Link>
              </div>

              <div className="footer-about text-center text-md-left mb-5">
                <p className="text-white">
                  Connect with us on social media - Be part of our budding
                  community and share your experience. Get the latest updates
                  for all our services.
                </p>
              </div>
              <div className="footer-social-link">
                <h1 className="text-xl text-white mb-4 font-bold">
                  Stay Connected
                </h1>
                <ul className="social d-flex">
                  {state?.links?.map((link) => {
                    if (link.type != null) {
                      if (link.type == "FACEBOOK") {
                        return (
                          <li
                            className="item mr-4 bg-[#7AB8FF66]"
                            key={link.id}
                          >
                            <a href={link.url} target="_blank">
                              <img
                                src="/assets/img/facebook.png"
                                className="img-fluid"
                                alt="socail"
                              />
                            </a>
                          </li>
                        );
                      }
                      if (link.type == "INSTAGRAM") {
                        return (
                          <li
                            className="item mr-4 bg-[#7AB8FF66]"
                            key={link.id}
                          >
                            <a href={link.url} target="_blank">
                              <img
                                src="/assets/img/instagram.png"
                                className="img-fluid"
                                alt="socail"
                              />
                            </a>
                          </li>
                        );
                      }
                      if (link.type == "TWITTER") {
                        return (
                          <li
                            className="item mr-4 bg-[#7AB8FF66]"
                            key={link.id}
                          >
                            <a href={link.url} target="_blank">
                              <img
                                src="/assets/img/twitter.png"
                                className="img-fluid"
                                alt="socail"
                              />
                            </a>
                          </li>
                        );
                      }
                      if (link.type == "WHATS_APP") {
                        return (
                          <li className="item twitter mr-4" key={link.id}>
                            <a href={link.url} target="_blank">
                              <img
                                src="/assets/img/twitter.png"
                                className="img-fluid"
                                alt="socail"
                              />
                            </a>
                          </li>
                        );
                      }
                    }
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <hr />
          </div>
        </div>
      </div>

      <div className="copyright-sec">
        <div className="container">
          <div className="row justify-center ">
            <div className="text-[1.6rem] text-gray-400">
              <span className="font-sans">&copy;</span>
              {year} Farenow. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade bd-example-modal"
        id="details"
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
              <h2 className="modal-title" id="exampleModalLongTitle">
                {state.modal?.title}
              </h2>
              <button
                ref={ref}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontSize: "3rem",
                  }}
                >
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body">
              {state?.modal?.type == "services" && (
                <table className="table-borderless table rem-1-5">
                  <thead>
                    <tr>
                      <th scope="col-6">Services</th>
                      <th scope="col-6">Services</th>
                    </tr>
                  </thead>
                  <tbody>
                    <FooterServices></FooterServices>
                  </tbody>
                </table>
              )}
              <div className="row m-2 show-all">
                {/* <div className="d-flex show-all align-items-center justify-content-between flex-wrap"> */}
                {state?.modal?.type != "services" && (
                  <table className="table-borderless table rem-1-5">
                    <tbody>
                      <FooterOtherLinks />
                    </tbody>
                  </table>
                )}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Footer);
