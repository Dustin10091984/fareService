import React, { Component } from 'react';
import { Product } from '../front-end/common/product';
import { Link } from "react-router-dom";
export class Cart extends Component {
    render() {
        return (
            <>


                <div className="moving-help-sec pad-Y m-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="text-center">
                                    <div className="product-title-sec"> Your Cart</div>

                                </div>

                                <div className="row pad-y">
                                    <div className="col-md-12 pb-5">
                                        <hr />
                                    </div>

                                    <div className="col-md-12">
                                        <div className="cart-total cart-page d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center justify-content">
                                                <div className="cart-img">
                                                    <img src="/assets/img/cart-prod.jpg" className="img-fluid" alt="" />
                                                </div>
                                                <div className="cart-title">Industrial Three-piece Dark Bronze<br /> Compact Dining Set</div>
                                            </div>
                                            <div className="price-qnt-subtotal d-flex align-items-center justify-content-between flex-column">
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

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 pb-5">
                                        <hr />
                                    </div>

                                    <div className="check-box w-100 text-right">
                                        <div className="cart-price">$122.00</div>
                                        <Link to="/food-grocery" className="update-cart">Add More Product</Link>
                                        <div className="email-check-out ml-auto d-flex align-items-center justify-content-between">
                                            <div className="common-input pr-5">
                                                <input type="text" placeholder="Expiration date" />
                                            </div>
                                            <Link to='/payment' className="button-common">Continue to Checkout</Link>
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