import React, {useState, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
                sub_services = [...sub_services, sub_service];
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
                                to={`/services/${sub_service.service_id}/${sub_service.id}#services-section`}
                                className="link"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={(e) => {
                                    if (
                                        location?.pathname ==
                                            `/services/${sub_service.service_id}/${sub_service.id}` &&
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
                                    to={`/services/${
                                        sub_services[index + 1].service_id
                                    }/${
                                        sub_services[index + 1].id
                                    }#services-section`}
                                    className="link"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={(e) => {
                                        if (
                                            location?.pathname ==
                                                `/services/${
                                                    sub_services[index + 1]
                                                        .service_id
                                                }/${
                                                    sub_services[index + 1].id
                                                }` &&
                                            location?.hash ==
                                                `#services-section`
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
            return otherLinks.map((link, index) => (
                <div className="item col-md-6" key={link?.id}>
                    <a
                        href={link?.url}
                        className=" link close"
                        data-dismiss="modal"
                        aria-label="Close"
                        target="_blank"
                    >
                        {link?.name || link?.page}
                    </a>
                </div>
            ));
        }
        if (state?.modal?.type == "blog") {
            const blogLinks = state?.links?.filter((link) => link?.is_blog);
            return blogLinks.map((link, index) => (
                <div className="item col-md-6" key={link?.id}>
                    <a
                        href={link?.url}
                        className="link close"
                        data-dismiss="modal"
                        aria-label="Close"
                        target="_blank"
                    >
                        {link?.name || link?.page}
                    </a>
                </div>
            ));
        }
        return <></>;
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <hr />
                    </div>
                </div>
            </div>

            <footer className="footer-sec pt-5 mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-md-4">
                            <ul className="footer-link">
                                <div className="title">Pages</div>
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
                                                <a
                                                    href={link?.url}
                                                    className="link"
                                                    target="_blank"
                                                >
                                                    {link?.name || link?.page}
                                                </a>
                                            </li>
                                        );
                                    }
                                })}
                                {state?.links?.filter(
                                    (link) =>
                                        link.type == null &&
                                        link.is_blog == false
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
                        <div className="col-6 col-md-4">
                            <div className="d-flex align-items-center justify-content-md-center">
                                <ul className="footer-link">
                                    <div className="title">City Blog Links</div>
                                    {state?.links?.map((link, index) => {
                                        let countLink = 0;
                                        if (
                                            link.is_blog == true &&
                                            countLink < 8
                                        ) {
                                            countLink = countLink + 1;
                                            return (
                                                <li
                                                    className="item"
                                                    key={link?.id}
                                                >
                                                    <a
                                                        href={link?.url}
                                                        className="link"
                                                        target="_blank"
                                                    >
                                                        {link?.name ||
                                                            link?.page}
                                                    </a>
                                                </li>
                                            );
                                        }
                                    })}
                                    {state?.links?.filter(
                                        (link) => link.is_blog == true
                                    ).length >= 8 && (
                                        <li className="item">
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
                                                            title: "blog links",
                                                            type: "blog",
                                                        },
                                                    })
                                                }
                                            >
                                                See all blog links
                                            </span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="d-flex align-items-center justify-content-md-center">
                                <ul className="footer-link">
                                    <div className="title">
                                        Popular Services
                                    </div>
                                    {(() => {
                                        let total = 0;
                                        return headerMenu?.map((service) =>
                                            service?.sub_services?.map(
                                                (sub_service) => {
                                                    if (
                                                        total < 8 &&
                                                        total != null
                                                    ) {
                                                        total++;
                                                        return (
                                                            <li
                                                                className="item"
                                                                key={`${service.id}_${sub_service.id}`}
                                                            >
                                                                <Link
                                                                    to={`/services/${service.id}/${sub_service.id}#services-section`}
                                                                    className="link"
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        if (
                                                                            location?.pathname ==
                                                                                `/services/${service.id}/${sub_service.id}` &&
                                                                            location?.hash ==
                                                                                "#services-section"
                                                                        ) {
                                                                            e.preventDefault();
                                                                        }
                                                                        window.scrollTo(
                                                                            {
                                                                                top: 0,
                                                                                behavior:
                                                                                    "smooth",
                                                                            }
                                                                        );
                                                                    }}
                                                                >
                                                                    {
                                                                        sub_service.name
                                                                    }
                                                                </Link>
                                                                {/* <a href="#" className="link">
                                                            </a> */}
                                                            </li>
                                                        );
                                                    } else if (
                                                        total == 8 &&
                                                        total != null
                                                    ) {
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
                                                                        setState(
                                                                            {
                                                                                ...state,
                                                                                modal: {
                                                                                    title: "All Services",
                                                                                    type: "services",
                                                                                },
                                                                            }
                                                                        )
                                                                    }
                                                                >
                                                                    See all
                                                                    Services
                                                                </span>
                                                            </li>
                                                        );
                                                    }
                                                }
                                            )
                                        );
                                    })()}
                                    {/* <li className="item">
                                        <a href="#" className="link">
                                            Handyman
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href="#" className="link">
                                            Plumbing
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href="#" className="link">
                                            Electrical
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href="#" className="link">
                                            Moving Help
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href="#" className="link">
                                            Painting
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href="#" className="link">
                                            Furniture Assembly
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href="#" className="link">
                                            Smart Home
                                        </a>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                        {/* <div className="col-6 col-md-3">
                            <div className="d-flex align-items-center justify-content-md-center">
                                <ul className="footer-link">
                                    <div className="title">
                                        POPULAR SEARCHES
                                    </div>
                                    <li className="item">
                                        <a href="#" className="link">
                                            Cleaning services dc
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href="#" className="link">
                                            Maid service seattle
                                        </a>
                                    </li>
                                    <li className="item">
                                        <Link
                                            to="/house-cleaning"
                                            className="link"
                                        >
                                            House cleaning
                                        </Link>
                                    </li>
                                    <li className="item">
                                        <a href="#" className="link">
                                            House keeping
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href="#" className="link">
                                            Houston move out cleaning
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href="#" className="link">
                                            Chicago apartment cleaning
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href="#" className="link">
                                            Furniture Assembly
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href="#" className="link">
                                            Los angeles housekeeping
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href="#" className="link">
                                            Seattle cleaning service
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div> */}
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

            <footer className="footer-sec2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 d-flex align-items-center justify-content-between flex-column flex-md-row">
                            <div className="footer-lgoo mb-5">
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
                                <p>
                                    Connect with us on social media - Be part of
                                    our budding community and share your
                                    experience. Get the latest updates for all
                                    our services.
                                </p>
                            </div>
                            <div className="footer-social-link">
                                <ul className="social d-flex">
                                    {state?.links?.map((link) => {
                                        if (link.type != null) {
                                            if (link.type == "FACEBOOK") {
                                                return (
                                                    <li
                                                        className="item facebook mr-4"
                                                        key={link.id}
                                                    >
                                                        <a
                                                            href={link.url}
                                                            target="_blank"
                                                        >
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
                                                        className="item instragram mr-4"
                                                        key={link.id}
                                                    >
                                                        <a
                                                            href={link.url}
                                                            target="_blank"
                                                        >
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
                                                        className="item twitter mr-4"
                                                        key={link.id}
                                                    >
                                                        <a
                                                            href={link.url}
                                                            target="_blank"
                                                        >
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
                                                    <li
                                                        className="item twitter mr-4"
                                                        key={link.id}
                                                    >
                                                        <a
                                                            href={link.url}
                                                            target="_blank"
                                                        >
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
                                    {/* <li className="item facebook mr-4">
                                        <a href="#">
                                            <img
                                                src="/assets/img/facebook.png"
                                                className="img-fluid"
                                                alt="socail"
                                            />
                                        </a>
                                    </li>
                                    <li className="item instragram mr-4">
                                        <a href="#">
                                            <img
                                                src="/assets/img/instagram.png"
                                                className="img-fluid"
                                                alt="socail"
                                            />
                                        </a>
                                    </li>
                                    <li className="item twitter mr-4">
                                        <a href="#">
                                            <img
                                                src="/assets/img/twitter.png"
                                                className="img-fluid"
                                                alt="socail"
                                            />
                                        </a>
                                    </li>
                                    <li className="item whatsapp mr-0">
                                        <a href="#">
                                            <img
                                                src="/assets/img/whatsapp.png"
                                                className="img-fluid"
                                                alt="socail"
                                            />
                                        </a>
                                    </li> */}
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
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-between flex-column flex-md-row">
                            <div className="copy-des">
                                {year} Farenow. All rights reserved.
                            </div>

                            <div className="footer-info-link mt-5">
                                <ul className="d-flex align-items-center justify-content-center  flex-wrap flex-md-nowrap">
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
                                        >
                                            <Link
                                                to={`/page/${page.name}`}
                                                onClick={(e) => {
                                                    if (
                                                        location?.pathname ==
                                                        `/page/${page.name}`
                                                    ) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                {page.name}
                                            </Link>
                                            {/* <a href="#">{page?.name}</a> */}
                                        </li>
                                    ))}
                                    {/* <li>
                                        <a href="#">Privacy</a>
                                    </li>
                                    <li>
                                        <a href="#">Cookies</a>
                                    </li>
                                    <li>
                                        <a href="#">Terms</a>
                                    </li>
                                    <li>
                                        <a href="#">Help</a>
                                    </li>
                                    <li>
                                        <a href="#">Cancellation Policy</a>
                                    </li> */}
                                </ul>
                            </div>
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
                            <h2
                                className="modal-title"
                                id="exampleModalLongTitle"
                            >
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