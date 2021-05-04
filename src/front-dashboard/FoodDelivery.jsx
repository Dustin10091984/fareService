import React, { Component } from 'react';
import { Link } from "react-router-dom";
export class FoodDelivery extends Component {
    render() {
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
                                        <li className="breadcrumb-item active" aria-current="page">Food Delivery</li>
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
                                <div className="page-title">Food Delivery</div>
                            </div>

                            <div className="col-md-6">
                                <div className="order-card d-flex align-items-center justify-content-between">
                                    <div className="order-des-b">
                                        <div className="title">KFC Family Bucket</div>
                                        <div className="sub-title">Kentucky Fried Chicken (KFC)</div>
                                        <div className="order-time">19, january 2020  - 12:00 PM</div>
                                    </div>
                                    <div className="order-btn-b">
                                        <Link to="/order-detail" className="btn-view">View</Link>
                                        <div className="btn-price">1550PKR</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="order-card d-flex align-items-center justify-content-between">
                                    <div className="order-des-b">
                                        <div className="title">KFC Family Bucket</div>
                                        <div className="sub-title">Kentucky Fried Chicken (KFC)</div>
                                        <div className="order-time">19, january 2020  - 12:00 PM</div>
                                    </div>
                                    <div className="order-btn-b">
                                        <Link to="/order-detail" className="btn-view">View</Link>
                                        <div className="btn-price">1550PKR</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="order-card d-flex align-items-center justify-content-between">
                                    <div className="order-des-b">
                                        <div className="title">KFC Family Bucket</div>
                                        <div className="sub-title">Kentucky Fried Chicken (KFC)</div>
                                        <div className="order-time">19, january 2020  - 12:00 PM</div>
                                    </div>
                                    <div className="order-btn-b">
                                        <Link to="/order-detail" className="btn-view">View</Link>
                                        <div className="btn-price">1550PKR</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="order-card d-flex align-items-center justify-content-between">
                                    <div className="order-des-b">
                                        <div className="title">KFC Family Bucket</div>
                                        <div className="sub-title">Kentucky Fried Chicken (KFC)</div>
                                        <div className="order-time">19, january 2020  - 12:00 PM</div>
                                    </div>
                                    <div className="order-btn-b">
                                        <Link to="/order-detail" className="btn-view">View</Link>
                                        <div className="btn-price">1550PKR</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="order-card d-flex align-items-center justify-content-between">
                                    <div className="order-des-b">
                                        <div className="title">KFC Family Bucket</div>
                                        <div className="sub-title">Kentucky Fried Chicken (KFC)</div>
                                        <div className="order-time">19, january 2020  - 12:00 PM</div>
                                    </div>
                                    <div className="order-btn-b">
                                        <Link to="/order-detail" className="btn-view">View</Link>
                                        <div className="btn-price">1550PKR</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="order-card d-flex align-items-center justify-content-between">
                                    <div className="order-des-b">
                                        <div className="title">KFC Family Bucket</div>
                                        <div className="sub-title">Kentucky Fried Chicken (KFC)</div>
                                        <div className="order-time">19, january 2020  - 12:00 PM</div>
                                    </div>
                                    <div className="order-btn-b">
                                        <Link to="/order-detail" className="btn-view">View</Link>
                                        <div className="btn-price">1550PKR</div>
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
