import React, {useState, useEffect, Fragment} from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
const Footer = (props) => {
    const [state, setState] = useState({
        links: [],
        modal: null
    })

    const date = new Date()
    const year = date.getFullYear()

    const getLinks = useSelector((state) => state?.footerReducer?.pageLinks);

    useEffect(() => {
        if(getLinks?.length>0){
            setState({
                links: getLinks
            })
        }
    }, [getLinks]);
    
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
                                {state?.links?.map((link, index) => {
                                    if(link.type == null && link.is_blog == false && index < 6) {
                                        return (
                                            <li className="item" key={link?.id}>
                                                <a href={link?.url} className="link" target="_blank">
                                                    {link?.name || link?.page}
                                                </a>
                                            </li>
                                        )
                                    }
                                })}
                                <li className="item">
                                    <span 
                                        role='button'
                                        className="link"
                                        data-backdrop="static"
                                        data-keyboard="false"
                                        data-toggle="modal"
                                        data-target="#details"
                                        onClick={() => setState({
                                            ...state,
                                             modal: {
                                                title: "Pages",
                                                type: "all",
                                            }
                                        })}
                                    >
                                        See all pages
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="d-flex align-items-center justify-content-md-center">
                                <ul className="footer-link">
                                    <div className="title">City Blog Links</div>
                                    {state?.links?.map((link, index) => (
                                    (link.is_blog == true && index < 6) && (
                                        <li className="item" key={link?.id}>
                                            <a href={link?.url} className="link" target="_blank">
                                                {link?.name || link?.page}
                                            </a>
                                        </li>
                                    )
                                ))}
                                    <li className="item">
                                        <span 
                                            className="link" 
                                            role='button'
                                            data-backdrop="static"
                                            data-keyboard="false"
                                            data-toggle="modal"
                                            data-target="#details"
                                            onClick={() => setState({
                                                ...state,
                                                 modal: {
                                                    title: "Pages",
                                                    type: "blog",
                                                }
                                            })}
                                        >
                                            See all blog links
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="d-flex align-items-center justify-content-md-center">
                                <ul className="footer-link">
                                    <div className="title">
                                        POPULAR SERVICES
                                    </div>
                                    <li className="item">
                                        <a href="#" className="link">
                                            Cleaning
                                        </a>
                                    </li>
                                    <li className="item">
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
                                    </li>
                                    <li className="item">
                                        <a href="#" className="link">
                                            See all Services
                                        </a>
                                    </li>
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
                                <img
                                    src="/assets/img/logo.png"
                                    className="img-fluid"
                                    alt=""
                                />
                            </div>

                            <div className="footer-about text-center text-md-left mb-5">
                                <p>
                                    Connect with us on social media - Be part
                                    of our budding community and share your
                                    experience. Get the latest updates for
                                    all our services.
                                </p>
                            </div>
                            <div className="footer-social-link">
                                <ul className="social d-flex">
                                    {state?.links?.map((link) => {
                                        if(link.type != null){
                                            if(link.type == 'FACEBOOK'){
                                                return (
                                                    <li className="item facebook mr-4" key={link.id}>
                                                        <a href={link.url} target="_blank">
                                                            <img
                                                                src="/assets/img/facebook.png"
                                                                className="img-fluid"
                                                                alt="socail"
                                                            />
                                                        </a>
                                                    </li>
                                                )
                                            }
                                            if(link.type == 'INSTAGRAM'){
                                                return (
                                                    <li className="item instragram mr-4" key={link.id}>
                                                        <a href={link.url} target="_blank">
                                                            <img
                                                                src="/assets/img/instagram.png"
                                                                className="img-fluid"
                                                                alt="socail"
                                                            />
                                                        </a>
                                                    </li>
                                                )
                                            }
                                            if(link.type == 'TWITTER'){
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
                                                )
                                            }
                                            if(link.type == 'WHATS_APP'){
                                                return (
                                                    <li className="item twitter mr-4" key={link.id}>
                                                        <a href={link.url} target="_blank">
                                                            <img src="/assets/img/twitter.png" className="img-fluid" alt="socail" />
                                                        </a>
                                                    </li>
                                                )
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
                                    <li>
                                        <a href="#">Contact</a>
                                    </li>
                                    <li>
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
                                    </li>
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
                                
                            </h2>
                            <button
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
                            <div className="row m-2">
                                <div className="col-12">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withRouter(Footer);