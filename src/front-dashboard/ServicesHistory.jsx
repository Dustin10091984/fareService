import React, { Component } from 'react';
import { Link } from "react-router-dom";
export const ServicesHistory = (props) => {
    return (
        <>
            <div className="breadcrumb-dash">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Services History</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashborad-box order-history pad-y">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title">Services History</div>
                        </div>

                        <div className="col-md-6">
                            <div className="order-card d-flex align-items-center justify-content-between">
                                <div className="order-des-b">
                                    <div className="title">Ekstrom Bothman</div>
                                    <div className="service-label">House Cleaner</div>
                                    <div className="star-rating-area d-flex align-items-center justify-content-start">
                                        <div className="rating-static clearfix mr-3" rel="4">
                                            <label className="full" title="{{ 'Awesome - 5 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Excellent - 4.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Excellent - 4 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Better - 3.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Good - 3 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Good - 2.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Fair - 2 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Fair - 1.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Bad - 1 star' | translate }}" ></label>
                                            <label className="half" title="{{ 'Bad - 0.5 stars' | translate }}" ></label>
                                        </div>
                                        {/* <div className="ratilike ng-binding">5</div> */}
                                    </div>
                                    <div className="order-time">19, january 2020  - 12:00 PM</div>
                                </div>
                                <div className="order-btn-b">
                                    <button className="btn-view-profile">View Profile</button>
                                    <div className="btn-price-serv">$600</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="order-card d-flex align-items-center justify-content-between">
                                <div className="order-des-b">
                                    <div className="title">Ekstrom Bothman</div>
                                    <div className="service-label">House Cleaner</div>
                                    <div className="star-rating-area d-flex align-items-center justify-content-start">
                                        <div className="rating-static clearfix mr-3" rel="4">
                                            <label className="full" title="{{ 'Awesome - 5 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Excellent - 4.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Excellent - 4 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Better - 3.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Good - 3 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Good - 2.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Fair - 2 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Fair - 1.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Bad - 1 star' | translate }}" ></label>
                                            <label className="half" title="{{ 'Bad - 0.5 stars' | translate }}" ></label>
                                        </div>
                                        {/* <div className="ratilike ng-binding">5</div> */}
                                    </div>
                                    <div className="order-time">19, january 2020  - 12:00 PM</div>
                                </div>
                                <div className="order-btn-b">
                                    <button className="btn-view-profile">View Profile</button>
                                    <div className="btn-price-serv">$600</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="order-card d-flex align-items-center justify-content-between">
                                <div className="order-des-b">
                                    <div className="title">Ekstrom Bothman</div>
                                    <div className="service-label">House Cleaner</div>
                                    <div className="star-rating-area d-flex align-items-center justify-content-start">
                                        <div className="rating-static clearfix mr-3" rel="4">
                                            <label className="full" title="{{ 'Awesome - 5 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Excellent - 4.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Excellent - 4 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Better - 3.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Good - 3 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Good - 2.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Fair - 2 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Fair - 1.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Bad - 1 star' | translate }}" ></label>
                                            <label className="half" title="{{ 'Bad - 0.5 stars' | translate }}" ></label>
                                        </div>
                                        {/* <div className="ratilike ng-binding">5</div> */}
                                    </div>
                                    <div className="order-time">19, january 2020  - 12:00 PM</div>
                                </div>
                                <div className="order-btn-b">
                                    <button className="btn-view-profile">View Profile</button>
                                    <div className="btn-price-serv">$600</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="order-card d-flex align-items-center justify-content-between">
                                <div className="order-des-b">
                                    <div className="title">Ekstrom Bothman</div>
                                    <div className="service-label">House Cleaner</div>
                                    <div className="star-rating-area d-flex align-items-center justify-content-start">
                                        <div className="rating-static clearfix mr-3" rel="4">
                                            <label className="full" title="{{ 'Awesome - 5 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Excellent - 4.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Excellent - 4 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Better - 3.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Good - 3 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Good - 2.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Fair - 2 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Fair - 1.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Bad - 1 star' | translate }}" ></label>
                                            <label className="half" title="{{ 'Bad - 0.5 stars' | translate }}" ></label>
                                        </div>
                                        {/* <div className="ratilike ng-binding">5</div> */}
                                    </div>
                                    <div className="order-time">19, january 2020  - 12:00 PM</div>
                                </div>
                                <div className="order-btn-b">
                                    <button className="btn-view-profile">View Profile</button>
                                    <div className="btn-price-serv">$600</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="order-card d-flex align-items-center justify-content-between">
                                <div className="order-des-b">
                                    <div className="title">Ekstrom Bothman</div>
                                    <div className="service-label">House Cleaner</div>
                                    <div className="star-rating-area d-flex align-items-center justify-content-start">
                                        <div className="rating-static clearfix mr-3" rel="4">
                                            <label className="full" title="{{ 'Awesome - 5 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Excellent - 4.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Excellent - 4 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Better - 3.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Good - 3 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Good - 2.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Fair - 2 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Fair - 1.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Bad - 1 star' | translate }}" ></label>
                                            <label className="half" title="{{ 'Bad - 0.5 stars' | translate }}" ></label>
                                        </div>
                                        {/* <div className="ratilike ng-binding">5</div> */}
                                    </div>
                                    <div className="order-time">19, january 2020  - 12:00 PM</div>
                                </div>
                                <div className="order-btn-b">
                                    <button className="btn-view-profile">View Profile</button>
                                    <div className="btn-price-serv">$600</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="order-card d-flex align-items-center justify-content-between">
                                <div className="order-des-b">
                                    <div className="title">Ekstrom Bothman</div>
                                    <div className="service-label">House Cleaner</div>
                                    <div className="star-rating-area d-flex align-items-center justify-content-start">
                                        <div className="rating-static clearfix mr-3" rel="4">
                                            <label className="full" title="{{ 'Awesome - 5 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Excellent - 4.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Excellent - 4 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Better - 3.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Good - 3 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Good - 2.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Fair - 2 stars' | translate }}" ></label>
                                            <label className="half" title="{{ 'Fair - 1.5 stars' | translate }}" ></label>
                                            <label className="full" title="{{ 'Bad - 1 star' | translate }}" ></label>
                                            <label className="half" title="{{ 'Bad - 0.5 stars' | translate }}" ></label>
                                        </div>
                                        {/* <div className="ratilike ng-binding">5</div> */}
                                    </div>
                                    <div className="order-time">19, january 2020  - 12:00 PM</div>
                                </div>
                                <div className="order-btn-b">
                                    <button className="btn-view-profile">View Profile</button>
                                    <div className="btn-price-serv">$600</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}
