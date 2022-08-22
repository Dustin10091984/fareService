import React, { Component } from 'react';

export class ChangeP extends Component {
    render() {
        return (
            <>
                <div className="login-sec d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="login-box h-auto mx-auto">
                                    <div className="login-heading mb-4 text-center">Register to [site_name]</div>
                                    <div className="login-detail mt-0 mb-5 text-center">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra tortor.
                                        Est auctor dictumst eu nullam massa bibendum sollicitudin lectus.
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="common-input mb-5">
                                                <input type="password" placeholder="Your old password" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 pt-3">
                                            <a href="#" className=" forget-pass">
                                                Forgot Password?
                                            </a>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="common-input mb-5">
                                                <input type="password" placeholder="New password" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="common-input mb-5">
                                                <input type="password" placeholder="Re enter password" />
                                            </div>
                                        </div>


                                        <div className="col-md-12">
                                            <button className="button-common w-100 mb-5">Save</button>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
