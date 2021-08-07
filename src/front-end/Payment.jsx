import React, { Component } from 'react';
import { Product } from '../front-end/common/product';
import { Link } from "react-router-dom";
export class Payment extends Component {
    render() {
        return (
            <>


                <div className="moving-help-sec pad-Y m-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="moving-search-box">

                                    <div className="d-flex justify-content-between">
                                        <div className="m-search-left-box">
                                            <div className="title-move mb-5">
                                                Add Adress
                                            </div>
                                            <div className="mb-4 d-flex align-items-center justify-content-between">
                                                <div className="common-input pr-2">
                                                    <input type="text" placeholder="First Name" />
                                                </div>
                                                <div className="common-input pl-2">
                                                    <input type="text" placeholder="Last Name" />
                                                </div>
                                            </div>
                                            <div className="mb-4 d-flex align-items-center justify-content-between">
                                                <div className="common-input pr-2">
                                                    <input type="text" placeholder="Street" />
                                                </div>
                                                <div className="common-input pl-2">
                                                    <input type="text" placeholder="City" />
                                                </div>
                                            </div>
                                            <div className="mb-4 d-flex align-items-center justify-content-between">
                                                <div className="common-input">
                                                    <input type="text" placeholder="Zip Code" />
                                                </div>
                                                <div className="common-input px-4">
                                                    <input type="text" placeholder="State" />
                                                </div>
                                                <div className="common-input">
                                                    <input type="text" placeholder="Apt" />
                                                </div>
                                            </div>
                                            <div className="common-input">
                                                <input type="text" placeholder="+92 : Phone Number" />
                                            </div>
                                        </div>

                                        {/* right box */}
                                        <div className="m-search-right-box">
                                            <div className="title-move mb-5">
                                                Payment Information
                                            </div>




                                            <div className="mb-4 d-flex align-items-center">
                                                <div className="common-input">
                                                    <input type="text" placeholder="Credit Card Number" />
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between">
                                                <div className="common-input mb-4 pr-2">
                                                    <input type="text" placeholder="Expiration date" />
                                                </div>
                                                <div className="common-input mb-4 pl-2">
                                                    <input type="text" placeholder="CVC" />
                                                </div>
                                            </div>

                                            <div className="card-img">
                                                <img src="/assets/img/card-imgs.png" className="img-fluid" alt="" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="moving-des mt-5">
                                        <p className="text-center">
                                            By clicking the button below, I agree to Handy's Terms of <br className="d-none d-md-block" />
                                        Use and Cancellation Policy and understand that my<br className="d-none d-md-block" />
                                         payment method will be charged.
                                        </p>

                                    </div>

                                    <div className="text-center">
                                        <Link to='/services-history' className="button-common mt-5 w-50">Place Order</Link>
                                    </div>


                                    <div className="row pad-t">
                                        <div className="col-md-12 pb-5">
                                            <hr />
                                        </div>

                                        <div className="col-md-12">
                                            <div className="cart-total d-flex align-items-center justify-content-between">
                                                <div className="cart-title">Industrial Three-piece Dark Bronze<br/> Compact Dining Set</div>
                                                <div className="price-qnt-subtotal">
                                                    <ul className="list-heading d-flex align-items-center justify-content-between w-100">
                                                        <li>Price</li>
                                                        <li>Quantity</li>
                                                        <li>Subtotal</li>
                                                    </ul>
                                                    <ul className="list-des d-flex align-items-center justify-content-between w-100">
                                                        <li>$122.00</li>
                                                        <li></li>
                                                        <li>$122.00</li>
                                                    </ul>

                                                    <ul className="list-heading d-flex align-items-center justify-content-between w-100">
                                                        <li></li>
                                                        <li>Shipping</li>
                                                        <li>Total</li>
                                                    </ul>
                                                    <ul className="list-des d-flex align-items-center justify-content-between w-100">
                                                        <li></li>
                                                        <li>00</li>
                                                        <li>$122.00</li>
                                                    </ul>
                                                </div>
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
}