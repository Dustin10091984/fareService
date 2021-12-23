import React, { Component } from "react";
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
                                        <li className="breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link to="/dashboard">
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page"
                                        >
                                            Services History
                                        </li>
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
                                <div className="page-title">
                                    Payment Settings
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
