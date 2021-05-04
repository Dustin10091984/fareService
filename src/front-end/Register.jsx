import React, { Component } from 'react';
import { Product } from './common/product';
export class Register extends Component {
    render() {
        return (
            <>
                <div className="login-sec d-flex align-items-center" style={{ backgroundImage: `url("assets/img/login-bg.jpg")` }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="login-box h-auto mx-auto">
                                    <div className="login-heading text-center">Register to [site_name]</div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="common-input mb-5">
                                                <input type="text" placeholder="First Name" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="common-input mb-5">
                                                <input type="text" placeholder="Last Name" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="common-input mb-5">
                                                <input type="text" placeholder="Email" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="common-input mb-5">
                                                <input type="text" placeholder="ZIP Code" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="common-input mb-5">
                                                <input type="text" placeholder="Your Primary Services" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                        <button className="button-common w-100 mb-5">Register</button>
                                        </div>
                                    </div>
                                   
                                    <div className="login-detail mt-5 text-center">
                                        By signing and clicking Get a Price, you affirm you have read and
                                        agree to the Handy Terms, and you agree and authorize Handy and its affiliates,
                                        and their networks of service professionals, to deliver marketing calls or texts
                                        using automated technology to the number you provided above regarding your
                                        project and other home services offers. Consent is not a condition of
                                        purchase.
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