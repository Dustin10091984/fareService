import React, { Component } from 'react';
import { Product } from '../front-end/common/product';
import { Link } from "react-router-dom";
export class OrderDetail extends Component {
    render() {
        return (
            <>
                <div className="breadcrumb-sec product-detail-bread d-flex align-items-center justify-content-center" style={{ backgroundImage: `url("/assets/img/bread-bg.jpg")` }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="shop-search prod-des-card d-flex align-items-center justify-content-center mx-auto">
                                    <a href="#" className="button-common-2">Go Back</a>
                                    <div className="product-detail-card-item">
                                        <div>
                                            <Link to="product-detail" className="product-card box-shadow-none d-flex justify-content-center flex-column">
                                                <div className="prod-img mx-auto">
                                                    <img src="/assets/img/product.png" alt="" />
                                                </div>
                                                <div className="prod-detail">
                                                    <div className="title">KFC Family Bucket</div>
                                                    <div className="sub-title">Veg, Non-Vegetarian</div>
                                                    <div className="price">$100.0</div>
                                                    <div className="stars-rating ">
                                                        <div className="star-rating-area d-flex align-items-center justify-content-center">
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
                                                    </div>
                                                    <div className="text-center">
                                                        <button className="button-common d-none">View Menu</button>
                                                        <button className="button-common-2 d-none">Closed</button>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <a href="#" className="button-common">Open</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dashborad-box order-history pad-y">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="page-title">Order Details</div>
                            </div>
                            <div className="col-md-12">
                                <div className="order-box-des d-flex  align-items-center justify-content-between">
                                    <div>
                                        <div className="order-num">Order Details</div>
                                        <div className="order-title">Order Details</div>
                                    </div>
                                    <div className="div">
                                        <div className="order-number">qw1231214</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="order-box-des d-flex  align-items-center justify-content-between">
                                    <div>
                                        <div className="order-num">Payment Method</div>
                                        <div className="order-title">Cash on Delivery</div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="order-box-des d-flex  align-items-center justify-content-between">
                                    <div>
                                        <div className="order-num active">1x</div>
                                        <div className="order-title">KFC Family Bucket</div>
                                    </div>
                                    <div className="div">
                                        <div className="order-number">RS 240.00</div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="order-box-des">
                                    <div>
                                        <div className="order-title mb-5">Subtotal</div>
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
