import React, { Component } from 'react';
import { Product } from '../front-end/common/product';
import { Link } from "react-router-dom";
export class ServicesDetail extends Component {
    render() {
        return (
            <>

                <div className="dashborad-box order-history pad-y">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="page-title">Services History</div>
                            </div>
                            <div className="col-md-12">
                                <div className="order-box-des">
                                    <div className="col-md-9 mx-auto">
                                        <div className="job-provider-card service-card-des">
                                            <div className="user-des d-flex align-items-centet justify-content-start w-100">
                                                <div className="user-img d-flex align-items-center justify-content-center">
                                                    <img src="/assets/img/user4.jpg" className="img-fluid" alt="" />
                                                </div>
                                                <div className="user-detail w-100">
                                                    <div className=" w-100 d-flex align-items-centet justify-content-between">
                                                        <div className="title">Ekstrom Bothman</div>
                                                        <button className="button-common">View Profile</button>
                                                    </div>
                                                    <div className="service-name my-4">
                                                        House Cleaner
                                                    </div>
                                                    <div className="job-status">179 Jobs Completed</div>
                                                    <div className="stars-rating w-100  d-flex align-items-centet justify-content-between">
                                                        <div className="star-rating-area">
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

                                                        <button className="button-common-2">Conitnue with this Provider</button>
                                                    </div>
                                                    <div className="user-price text-green">$20.00 / Per Hour</div>
                                                </div>
                                            </div>
                                            <hr />

                                        </div>

                                    </div>
                                    <div className="pb-5">
                                        <div className="order-title mb-5 text-center">Subtotal</div>
                                    </div>
                                    <div className="d-flex  align-items-center justify-content-between mb-5">
                                        <div>
                                            <div className="order-num">Order Details</div>
                                            <div className="order-title">Order Details</div>
                                        </div>
                                        <div className="div">
                                            <div className="order-number ">qw1231214</div>
                                        </div>
                                    </div>
                                    <div className=" d-flex  align-items-center justify-content-between mb-5">
                                        <div>
                                            <div className="order-num">Payment Method</div>
                                            <div className="order-title">Cash on Delivery</div>
                                        </div>
                                    </div>
                                    <div className=" d-flex  align-items-center justify-content-between mb-5 py-5">
                                        <div>
                                            <div className="order-num active">Work done?</div>
                                            <div className="order-title">KFC Family Bucket</div>
                                        </div>
                                        <div className="div">
                                            <div className="order-number bg-none">RS 240.00</div>
                                        </div>
                                    </div>
                                    <div className="d-flex subtotal-box  align-items-center justify-content-between mb-4">
                                        <div>
                                            <div className="order-num">Total</div>
                                        </div>
                                        <div className="div">
                                            <div className="order-number bg-none">RS 240.00</div>
                                        </div>
                                    </div>
                                    <div className="d-flex subtotal-box align-items-center justify-content-between  mb-4">
                                        <div>
                                            <div className="order-num">Discount</div>
                                        </div>
                                        <div className="div">
                                            <div className="order-number">-RS 240.00</div>
                                        </div>
                                    </div>
                                    <div className="d-flex subtotal-box align-items-center justify-content-between  mb-4">
                                        <div>
                                            <div className="order-num">Tax</div>
                                        </div>
                                        <div className="div">
                                            <div className="order-number pink">-RS 240.00</div>
                                        </div>
                                    </div>
                                    <div className="text-right mt-5 pt-5">
                                        <button className="button-common">Reorder</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
