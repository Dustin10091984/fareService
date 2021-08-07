import React, { Component } from 'react';
import { Product } from './common/product';
export class Gaurantee extends Component {
    render() {
        return (
            <>
                <div className="breadcrumb-sec d-flex align-items-center justify-content-center" style={{ backgroundImage: `url("/assets/img/gaurantee-bg.jpg")` }}>
                    <div className="title text-center">The [site_name]<br />Happiness Guarantee</div>
                </div>

                <section className="latest-news-sec pad-t">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="service-card-des d-flex align-items-center ">
                                    <div className="src-image-box">
                                        <img src="/assets/img/service-caed-2.jpg" className="img-fluid" alt="" />
                                    </div>
                                    <div className="service-card-detail">
                                        <div className="title">Your experience matters.</div>
                                        <div className="des">
                                            Handy strives to match you with the right pro for you and your home every time.
                                             If you’re not satisfied with the quality of the service you booked and paid for 
                                             directly on the Handy platform, we’ll send another pro at no extra charge for your next booking.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="common-heading text-center">
                                    <div className="title">The professionals you want</div>
                                    <div className="sub-des">
                                        Cleaning and handyman services booked and paid for directly through the Handy platform are performed by
                                     <br className="d-none d-md-block" /> background-checked professionals who are highly rated by customers like you. And for cleaning, your favorite pro
                                    <br className="d-none d-md-block" /> can come back again and again to clean your home just the way you like it.

                                </div>
                                </div>
                            </div>
                            <div className="row pad-b">
                            <div className="col-md-4">
                                <div className="team-card">
                                    <div className="team-img">
                                        <img src="/assets/img/boss1.jpg" className="img-fluid" alt="" />
                                    </div>
                                    <div className="title">
                                    Emerson Botosh
                                            </div>
                                    <div className="stars-rating ">
                                        <div className="star-rating-area d-flex align-items-center justify-content-center">
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

                                    <div className="detail-team">
                                    I'm Sharonda! I have over 8 years of experience in housekeeping. My goal is to delight my customers by providing a deep, thorough cleaning. Dusted surfaces, baseboards, ceiling fans, and polished appliances are a big deal to me. I pay close detail to all the nooks and cranies!
                                            </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="team-card">
                                    <div className="team-img">
                                        <img src="/assets/img/boss2.jpg" className="img-fluid" alt="" />
                                    </div>
                                    <div className="title">
                                    Jaylon Kenter
                                            </div>
                                    <div className="stars-rating ">
                                        <div className="star-rating-area d-flex align-items-center justify-content-center">
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

                                    <div className="detail-team">
                                    My name is Justin I've been home cleaning for as long as I can remember. Cleaning was a part of life, and now has become a passion, going above and beyond is a thing I like to do, and I do best.
                                            </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="team-card">
                                    <div className="team-img">
                                        <img src="/assets/img/boss3.jpg" className="img-fluid" alt="" />
                                    </div>
                                    <div className="title">
                                    Charlie Lipshutz
                                            </div>
                                    <div className="stars-rating ">
                                        <div className="star-rating-area d-flex align-items-center justify-content-center">
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

                                    <div className="detail-team">
                                    My name is Milagros and I have been a housekeeper for 17 years. I have worked with a family from the Spanish Embassy in Washington, DC for 2 years, then I met a nice family that I worked for 11 years as a live in housekeeper.
                                            </div>
                                </div>
                            </div>
                        </div>
                    
                            <div className="col-md-12">
                                <div className="service-card-des d-flex align-items-center ">

                                    <div className="service-card-detail">
                                        <div className="title">We’ve got you covered.</div>
                                        <div className="des">
                                        In the rare event of damage, Handy’s got your back. Bookings made and paid for directly on the Handy platform are insured. Learn more
                                        </div>
                                    </div>
                                    <div className="src-image-box">
                                        <img src="/assets/img/service-caed-2.jpg" className="img-fluid" alt="" />
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
