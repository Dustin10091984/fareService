import React, { Component } from 'react';
import ServiceType from '../constants/ServiceType';
import {Moving} from '../front-end/Services/Moving';
import { Question } from './common/Question';
export const Services = (props) => {
    const { serviceId, subServiceId } = props.match.params;
    const search = props.location.search; // could be '?foo=bar'
    const params = new URLSearchParams(search);
    return (
            <>
                <div className="align-items-center justify-content-center" style={{
                    backgroundImage: `url("/assets/img/bread-bg.jpg")`,
                    // backgroundRepeat: 'no-repeat',
                    maxWidth: '100%',
                    backgroundSize: 'cover',
                    height: 'auto',
                }}>
                    <div className="container ">
                        <div className="row">
                            <div className="col-12">
                                {serviceId && subServiceId ? (
                                    <>
                                        {params.get('service_type') === ServiceType.MOVING ? (
                                            <div className="moving-search-box m-5">
                                                <Moving {...props}/>
                                            </div>
                                        ) : (
                                            <div className="moving-search-box house-cleaning-sec" style={{marginTop: "8rem", marginBottom: "8rem" , }}>
                                                <Question serviceId={serviceId} subServiceId={subServiceId} {...props}/>
                                            </div>
                                        )}
                                    </>
                                    ) : (
                                        <div className="shop-search services-serch d-flex align-items-center justify-content-center mx-auto">
                                            <div className="header-search d-flex align-items-center justify-content-center flex-column">
                                                <div className="shop-serch-title mb-5">Choose a service to get started.</div>
                                                <form action="">
                                                    <div className="input-box d-flex align-items-center">
                                                        <div className="icon-div">
                                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M7.5 1.18269C8.74969 1.18155 9.97165 1.55108 11.0113 2.24454C12.0509 2.938 12.8615 3.92423 13.3405 5.07847C13.8196 6.23271 13.9455 7.50309 13.7024 8.7289C13.4593 9.95472 12.8581 11.0809 11.9748 11.965C11.0916 12.849 9.96593 13.4513 8.74034 13.6955C7.51474 13.9397 6.24425 13.8149 5.08958 13.337C3.9349 12.859 2.94793 12.0493 2.25352 11.0103C1.55911 9.9713 1.18847 8.74969 1.18846 7.5C1.19604 5.82788 1.86325 4.22631 3.04509 3.04339C4.22694 1.86047 5.82789 1.1918 7.5 1.18269ZM7.5 0C6.01664 0 4.56659 0.439867 3.33323 1.26398C2.09986 2.08809 1.13856 3.25943 0.570907 4.62987C0.00324974 6.00032 -0.145275 7.50832 0.144114 8.96318C0.433503 10.418 1.14781 11.7544 2.1967 12.8033C3.2456 13.8522 4.58197 14.5665 6.03682 14.8559C7.49168 15.1453 8.99968 14.9967 10.3701 14.4291C11.7406 13.8614 12.9119 12.9001 13.736 11.6668C14.5601 10.4334 15 8.98336 15 7.5C15 5.51088 14.2098 3.60322 12.8033 2.1967C11.3968 0.790176 9.48913 0 7.5 0Z" fill="#B6BCC1" />
                                                                <path d="M17.84 17.0655L13.7819 13L13 13.7726L17.0581 17.8381C17.1091 17.8891 17.1697 17.9297 17.2364 17.9575C17.3032 17.9853 17.3748 17.9997 17.4471 18C17.5195 18.0003 17.5912 17.9863 17.6581 17.959C17.725 17.9317 17.7859 17.8915 17.8373 17.8408C17.8886 17.7901 17.9294 17.7298 17.9573 17.6634C17.9852 17.5969 17.9997 17.5257 18 17.4537C18.0003 17.3817 17.9863 17.3104 17.9588 17.2438C17.9314 17.1772 17.891 17.1166 17.84 17.0655Z" fill="#B6BCC1" />
                                                            </svg>
                                                        </div>
                                                        <input type="text" className="form-control" placeholder="Search for services (e.g. “cleaning”)" />
                                                        <button type="button">Search</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="shop-page pad-y">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-12">
                                    <div className="common-heading text-center">
                                        <div className="title">See all Services</div>
                                        <div className="sub-des">
                                            liked or admired by many people or by a particular person or group.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="service-list-box d-flex align-items-start justify-content-between mb-5">
                                        <div className="d-flex flex-column align-items-center h-100">
                                        <div className="service-name active">Cleaning</div>
                                        <div className="service-line"></div>
                                        </div>
                                        <div className="service-items-list d-flex align-items-start justify-content-between w-100">
                                            <div className="service-card">
                                                <div className="service-img">
                                                    <img src="/assets/img/service-card1.jpg" className="img-fluid" alt="" />
                                                </div>
                                                <ul className="service-list">
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Affordable Cleaning Service</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Affordable Maids</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Apartment Cleaning</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Bedroom Cleaning</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Cleaning Service</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Housekeeping</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Home Sanitization</a></li>
                                                </ul>
                                            </div>

                                            <div className="service-card">
                                                <div className="service-img">
                                                    <img src="/assets/img/service-card1.jpg" className="img-fluid" alt="" />
                                                </div>
                                                <ul className="service-list">
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Maid Service</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Move In Cleaning</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Move Out Cleaning</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Room Cleaning</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Home Cleaning</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Office Cleaning</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Commercial Sanitization</a></li>
                                                </ul>
                                            </div>
                                            <div className="service-card">
                                                <div className="service-img">
                                                    <img src="/assets/img/service-card1.jpg" className="img-fluid" alt="" />
                                                </div>
                                                <ul className="service-list">
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Vacation Rental Cleaning</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Deep Cleaning Service</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Kitchen Cleaning</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Living Room Cleaning</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Local Cleaning Service</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Same Day Cleaning</a></li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="service-list-box d-flex align-items-start justify-content-between mb-5">
                                        <div className="d-flex flex-column align-items-center h-100">
                                        <div className="service-name">Cleaning</div>
                                        {/* <div className="service-line"></div> */}
                                        </div>
                                        <div className="service-items-list d-flex align-items-start justify-content-between w-100 ">
                                            <div className="service-card">
                                                <div className="service-img">
                                                    <img src="/assets/img/service-card1.jpg" className="img-fluid" alt="" />
                                                </div>
                                                <ul className="service-list d-none">
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Affordable Cleaning Service</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Affordable Maids</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Apartment Cleaning</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Bedroom Cleaning</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Cleaning Service</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Housekeeping</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Home Sanitization</a></li>
                                                </ul>
                                            </div>

                                            <div className="service-card">
                                                <div className="service-img">
                                                    <img src="/assets/img/service-card1.jpg" className="img-fluid" alt="" />
                                                </div>
                                                <ul className="service-list d-none">
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Maid Service</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Move In Cleaning</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Move Out Cleaning</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Room Cleaning</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Home Cleaning</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Office Cleaning</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Commercial Sanitization</a></li>
                                                </ul>
                                            </div>
                                            <div className="service-card">
                                                <div className="service-img">
                                                    <img src="/assets/img/service-card1.jpg" className="img-fluid" alt="" />
                                                </div>
                                                <ul className="service-list d-none">
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Vacation Rental Cleaning</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Deep Cleaning Service</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Kitchen Cleaning</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Living Room Cleaning</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Local Cleaning Service</a></li>
                                                    <li className="item"><a href="#" className="link"><i className="fa fa-angle-right pr-3" aria-hidden="true"></i>Same Day Cleaning</a></li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
}
