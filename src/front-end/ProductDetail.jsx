import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Product } from './common/product';
export class ProductDetail extends Component {
    render() {
        return (
            <>

                <section className="product-detail-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 mx-auto">
                                <div className="product-title-sec">Industrial Three-piece Dark Bronze Compact Dining Set</div>
                            </div>

                            <div className="col-md-12">
                                <div className="product-des-imgs">
                                    <div className="img-g">
                                        <img src="/assets/img/product-d1.jpg" className="img-fluid" alt="" />
                                    </div>
                                    <div className="img-g">
                                        <img src="/assets/img/product-d2.jpg" className="img-fluid" alt="" />
                                    </div>
                                    <div className="img-g">
                                        <img src="/assets/img/product-d3.jpg" className="img-fluid" alt="" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-9 mt-5">

                                <div className="detail-ses-box mt-5">
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

                                    <div className="detail-price">
                                        $[amount].00 <span>$[deduction].00</span>
                                    </div>
                                    <div className="detail-sub-title">Product description</div>

                                    <div className="detail-des-d">
                                        <p> 11/14/2016  -  November 2016</p>
                                        <p>
                                            "The risk ended up being worth it. The more customer density
                                            Handy has in a market, the better its business model
                                            works--customer acquisition is cheaper, the greater density
                                            of both cleaners and customers makes it easier for both to get
                                            appointments they want, and referrals jump as a result. Happier
                                            customers means fewer contacts with customer service staff.
                                            Happy staff means higher retention and less need for recruitment
                                            and onboarding assistance. If Handy hadn't stopped its market
                                            expansion, it would not be reaping these benefits today...Handy's
                                           economics are looking healthier with each <a href="#">Show less..</a>
                                        </p>
                                    </div>

                                    <div className="detail-sub-title">Product description</div>
                                    <div className="detail-des-d">
                                        <p>
                                            Professional installation by Handy is included in the price.
                                            After you purchase, Handy will automatically book and schedule
                                            your service for shortly after your product arrives and send a
                                            confirmation email. You can reschedule anytime.
                                                <a href="#">Learn more..</a>
                                        </p>
                                    </div>
                                </div>
                                <Link to='/cart' className="button-common w-100 mt-5">
                                    Add to Cart
                                    </Link>


                            </div>
                            <div className="col-md-3 mt-5">
                                <div className="add-box">

                                </div>
                            </div>


                        </div>

                        <div className="row pad-y">
                            <div className="col-12">
                                <div className="common-heading text-center">
                                    <div className="title">Related Products</div>

                                </div>
                            </div>
                            <div className="col-md-3">
                                <Product></Product>
                            </div>
                            <div className="col-md-3">
                                <Product></Product>
                            </div>
                            <div className="col-md-3">
                                <Product></Product>
                            </div>
                            <div className="col-md-3">
                                <Product></Product>
                            </div>
                        </div>


                    </div>
                </section>
            </>
        )
    }
}