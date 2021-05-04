import React, { Component } from 'react';
import { Product } from './common/product';
import { Link } from "react-router-dom";
export class Login extends Component {
    render() {
        return (
            <>
                <div className="login-sec d-flex align-items-center" style={{ backgroundImage: `url("assets/img/login-bg.jpg")` }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="login-box mx-auto">
                                    <div className="login-heading text-center">Login to [site_name]</div>

                                    <div className="inner-box-log mx-auto">
                                    <div className="common-input mb-5">
                                        <input type="text" placeholder="Email" />
                                    </div>
                                    <div className="common-input mb-5">
                                        <input type="password" placeholder="Password" />
                                    </div>

                                    <Link to="/dashboard" className="button-common w-100 mb-5">Login</Link>

                                    <div className="other-login text-center">OR</div>

                                    <button className="login-gmail mt-5">Login with Google</button>
                                    <button className="login-facebook mt-5">Login with Facebook</button>

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