import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Product } from './common/product';
export class ProviderProfile extends Component {
    render() {
        return (
            <>
                <div className="provider-profile pad-y">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="profile-info text-center">
                                    <div className="pro-pic">
                                        <img src="/assets/img/user4.jpg" className="img-fluid" alt="" />
                                    </div>
                                    <div className="pro-title">Livia Philips</div>
                                    <div className="pro-price">$20.00</div>
                                    <div className="pro-jos-status">120 Jobs Completed</div>
                                    <div className="star-rating-area">
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
                                    <Link to='/payment' className="button-common">Select & Continue</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="service-provider-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="service-time-box">
                                    <div className="title-servic px-2 mb-4">How offten</div>

                                    <div className="ser-des text-left mb-4">
                                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                                        Velit officia consequat duis enim velit mollit.
                                        Exercitation veniam consequat sunt nostrud amet.
                                    </div>

                                    <hr />

                                    <div className="amet-minim d-flex align-items-center py-3">
                                        <div className="amet-img mr-3">
                                            {/* <img src="" className="img-fluid" alt=""/> */}
                                        </div>
                                        <h5>Amet minim mollit non deserunt.</h5>
                                    </div>
                                    <div className="amet-minim d-flex align-items-center py-3">
                                        <div className="amet-img mr-3">
                                            {/* <img src="" className="img-fluid" alt=""/> */}
                                        </div>
                                        <h5>Amet minim mollit non deserunt.</h5>
                                    </div>
                                    <div className="amet-minim d-flex align-items-center py-3">
                                        <div className="amet-img mr-3">
                                            {/* <img src="" className="img-fluid" alt=""/> */}
                                        </div>
                                        <h5>Amet minim mollit non deserunt.</h5>
                                    </div>
                                    <div className="amet-minim d-flex align-items-center py-3">
                                        <div className="amet-img mr-3">
                                            {/* <img src="" className="img-fluid" alt=""/> */}
                                        </div>
                                        <h5>Amet minim mollit non deserunt.</h5>
                                    </div>
                                    <hr />

                                    <ul className="profile-links-left">
                                        <li className="item">
                                            <a href="#" className="link">
                                                <i className="fa fa-angle-right pr-2" aria-hidden="true"></i> Cleaning
                                            </a>
                                        </li>
                                        <li className="item">
                                            <a href="#" className="link">
                                                <i className="fa fa-angle-right pr-2" aria-hidden="true"></i> Organizations
                                            </a>
                                        </li>
                                        <li className="item">
                                            <div className="link">
                                                <i className="fa fa-angle-right pr-2" aria-hidden="true"></i> Errands
                                            </div>
                                        </li>
                                        <li className="item">
                                            <a href="#" className="link">
                                                <i className="fa fa-angle-right pr-2" aria-hidden="true"></i> Packing & Unpacking
                                            </a>
                                        </li>
                                        <li className="item">
                                            <a href="#" className="link">
                                                <i className="fa fa-angle-right pr-2" aria-hidden="true"></i> Sewing
                                            </a>
                                        </li>
                                    </ul>


                                </div>
                            </div>

                            <div className="col-md-8">
                                <div className="job-provider-card" >
                                    <div className="useer-qust mt-0">
                                        <div className="title">How can i help ?</div>
                                        <div className="des">I'm Sharonda! I have over 8 years of
                                        experience in housekeeping. My goal is to delight my customers
                                        by providing a deep, thorough cleaning. Dusted surfaces, baseboards,
                                        ceiling fans, and polished appliances are a big deal to me. I pay
                                         close detail to all the nooks and cranies!</div>
                                    </div>

                                    <div className="top-reviews-list">
                                        <div className="revie-card">
                                            <div className="d-flex align-itmes-center justify-content-between">
                                            <div className="title">Justin Donin</div>
                                            <div className="star-rating-area">
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

                                            <div className="review-item d-flex align-itmes-centetr justifu-content-between">
                                                <div className="review-img">
                                                    <img src="/assets/img/user4.jpg" className="img-fluid" alt="" />
                                                </div>

                                                <div className="review-detail">
                                                    I'm Sharonda! I have over 8 years of experience in housekeeping.
                                                    My goal is to delight my customers by providing a deep, thorough cleaning.
                                                    Dusted surfaces, baseboards, ceiling fans, and polished appliances
                                                    are a big deal to me. I pay close detail to all the nooks and cranies.
                                            </div>
                                            </div>
                                        </div>
                                        <div className="revie-card">
                                            <div className="d-flex align-itmes-center justify-content-between">
                                            <div className="title">Justin Donin</div>
                                            <div className="star-rating-area">
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

                                            <div className="review-item d-flex align-itmes-centetr justifu-content-between">
                                                <div className="review-img">
                                                    <img src="/assets/img/user4.jpg" className="img-fluid" alt="" />
                                                </div>

                                                <div className="review-detail">
                                                    I'm Sharonda! I have over 8 years of experience in housekeeping.
                                                    My goal is to delight my customers by providing a deep, thorough cleaning.
                                                    Dusted surfaces, baseboards, ceiling fans, and polished appliances
                                                    are a big deal to me. I pay close detail to all the nooks and cranies.
                                            </div>
                                            </div>
                                        </div>
                                        <div className="revie-card">
                                            <div className="d-flex align-itmes-center justify-content-between">
                                            <div className="title">Justin Donin</div>
                                            <div className="star-rating-area">
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

                                            <div className="review-item d-flex align-itmes-centetr justifu-content-between">
                                                <div className="review-img">
                                                    <img src="/assets/img/user4.jpg" className="img-fluid" alt="" />
                                                </div>

                                                <div className="review-detail">
                                                    I'm Sharonda! I have over 8 years of experience in housekeeping.
                                                    My goal is to delight my customers by providing a deep, thorough cleaning.
                                                    Dusted surfaces, baseboards, ceiling fans, and polished appliances
                                                    are a big deal to me. I pay close detail to all the nooks and cranies.
                                            </div>
                                            </div>
                                        </div>
                                        <div className="revie-card">
                                            <div className="d-flex align-itmes-center justify-content-between">
                                            <div className="title">Justin Donin</div>
                                            <div className="star-rating-area">
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

                                            <div className="review-item d-flex align-itmes-centetr justifu-content-between">
                                                <div className="review-img">
                                                    <img src="/assets/img/user4.jpg" className="img-fluid" alt="" />
                                                </div>

                                                <div className="review-detail">
                                                    I'm Sharonda! I have over 8 years of experience in housekeeping.
                                                    My goal is to delight my customers by providing a deep, thorough cleaning.
                                                    Dusted surfaces, baseboards, ceiling fans, and polished appliances
                                                    are a big deal to me. I pay close detail to all the nooks and cranies.
                                            </div>
                                            </div>
                                        </div>
                                        <div className="revie-card">
                                            <div className="d-flex align-itmes-center justify-content-between">
                                            <div className="title">Justin Donin</div>
                                            <div className="star-rating-area">
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

                                            <div className="review-item d-flex align-itmes-centetr justifu-content-between">
                                                <div className="review-img">
                                                    <img src="/assets/img/user4.jpg" className="img-fluid" alt="" />
                                                </div>

                                                <div className="review-detail">
                                                    I'm Sharonda! I have over 8 years of experience in housekeeping.
                                                    My goal is to delight my customers by providing a deep, thorough cleaning.
                                                    Dusted surfaces, baseboards, ceiling fans, and polished appliances
                                                    are a big deal to me. I pay close detail to all the nooks and cranies.
                                            </div>
                                            </div>
                                        </div>
                                        <div className="revie-card">
                                            <div className="d-flex align-itmes-center justify-content-between">
                                            <div className="title">Justin Donin</div>
                                            <div className="star-rating-area">
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

                                            <div className="review-item d-flex align-itmes-centetr justifu-content-between">
                                                <div className="review-img">
                                                    <img src="/assets/img/user4.jpg" className="img-fluid" alt="" />
                                                </div>

                                                <div className="review-detail">
                                                    I'm Sharonda! I have over 8 years of experience in housekeeping.
                                                    My goal is to delight my customers by providing a deep, thorough cleaning.
                                                    Dusted surfaces, baseboards, ceiling fans, and polished appliances
                                                    are a big deal to me. I pay close detail to all the nooks and cranies.
                                            </div>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
