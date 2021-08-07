import React, { Component } from 'react';
import { Product } from './common/product';
export class Apply extends Component {
    render() {
        return (
            <>
                <div className="login-sec d-flex align-items-center" style={{ backgroundImage: `url("/assets/img/apply-bg.jpg")` }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="moving-search-box">

                                    <div className="d-flex justify-content-between">
                                        <div className="m-search-left-box mx-auto">
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
                                                    <input type="text" placeholder="Email" />
                                                </div>
                                                <div className="common-input pl-2">
                                                    <input type="text" placeholder="Zip Code" />
                                                </div>
                                            </div>
                                            <div className="mb-4 d-flex align-items-center justify-content-between">
                                                <div className="common-input">
                                                    <input type="text" placeholder="Your Primary Services" />
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <button className="button-common mt-5 w-50">Place Order</button>
                                    </div>

                                    <div className="row pad-t">
                                        <div className="col-md-4">
                                            <div className="team-card">
                                                <div className="team-img">
                                                    <img src="/assets/img/boss1.jpg" className="img-fluid" alt="" />
                                                </div>
                                                <div className="title px-0">
                                                    great pay
                                            </div>


                                                <div className="detail-team">
                                                    Make up to $22/hour/job as a cleaner or $45/hour/job as a handyman or $62/hour/job as a lawn care pro. Our top professionals make more than $1,000 a week.
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="team-card">
                                                <div className="team-img">
                                                    <img src="/assets/img/boss2.jpg" className="img-fluid" alt="" />
                                                </div>
                                                <div className="title px-0">
                                                    flexible shedule
                                            </div>
                                                <div className="detail-team">
                                                    You choose when you want to work and how much. Build a full schedule of your customers or simply add a few jobs on the side.
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="team-card">
                                                <div className="team-img">
                                                    <img src="/assets/img/boss3.jpg" className="img-fluid" alt="" />
                                                </div>
                                                <div className="title px-0">
                                                    easy payments
                                            </div>
                                                <div className="detail-team">
                                                    No more tracking down your customers for payments. Your payments are direct deposited into your bank account soon after the job is complete.
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