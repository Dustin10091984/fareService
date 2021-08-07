import React, { Component } from 'react';
import { Link } from "react-router-dom";
export class PaymentCard extends Component {
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
                                <div className="page-title">Payment Settings</div>
                            </div>

                            <div className="col-md-6 d-flex">
                                <div className="order-card d-flex align-items-center justify-content-between">
                                <div>
                                   <img src="/assets/img/master-card.svg" alt=""/>
                                </div>
                                   <div className="d-flex align-items-center justify-content-between">
                                   <div className="order-des-b ml-4">
                                        <div className="title">mastercar****2232</div>
                                        <div className="order-time">primary</div>
                                        <div className="order-time">Expires 11/3</div>
                                    </div>
                                    <div className="order-btn-b">
                                        <button className="btn-view-profile">Remove</button>
                                        <div className="btn-price-serv">edit</div>
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
