import React, { Component } from 'react';
import { Link } from "react-router-dom";
export class Product extends Component {
    render() {
        return (
            <>

                <div>
                    <Link to="food-details" className="product-card d-flex justify-content-center flex-column">
                        <div className="prod-img mx-auto">
                            <img src="assets/img/product.png" alt="" />
                        </div>
                        <div className="prod-detail">
                            <div className="title">[two or more lines of product title here.]</div>
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
                            <Link to='/food-details' className="button-common">View Menu</Link>
                            <button className="button-common-2 d-none">Closed</button>
                            </div>
                        </div>
                    </Link>
                </div>

            </>
        )
    }
}