import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Product } from '../front-end/common/product';
export class MovingHelp extends Component {
    render() {
        return (
            <>
                <div className="breadcrumb-sec d-flex align-items-center justify-content-center" style={{ backgroundImage: `url("/assets/img/moving-help.jpg")` }}>
                </div>

                <div className="moving-help-sec ">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="moving-search-box">
                                    <div className="title-move mb-5">
                                    Handyman Services
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="m-search-left-box">
                                            <div className="mb-4 d-flex align-items-center justify-content-between">
                                                <div className="common-input">
                                                    <input type="text" placeholder="Zip Code" />
                                                </div>
                                                <div className="common-input px-4">
                                                    <input type="text" placeholder="State" />
                                                </div>
                                                <div className="common-input">
                                                    <input type="text" placeholder="City" />
                                                </div>
                                            </div>

                                            <div className="common-input mb-4">
                                                <select name="" id="">
                                                    <option value="">Number of professionals?</option>
                                                    <option value="">Number of professionals?</option>
                                                    <option value="">Number of professionals?</option>
                                                    <option value="">Number of professionals?</option>
                                                    <option value="">Number of professionals?</option>
                                                </select>
                                            </div>

                                            <div className="common-input mb-4">
                                                <select name="" id="">
                                                    <option value="">Is a Certificate of Insurance required?</option>
                                                    <option value="">Is a Certificate of Insurance required?</option>
                                                    <option value="">Is a Certificate of Insurance required?</option>
                                                    <option value="">Is a Certificate of Insurance required?</option>
                                                    <option value="">Is a Certificate of Insurance required?</option>
                                                </select>
                                            </div>

                                            <div className="common-input">
                                                <textarea name="" id="" cols="30" rows="10" placeholder="descripe the job in details..."></textarea>
                                            </div>
                                        </div>

                                        {/* right box */}
                                        <div className="m-search-right-box">
                                            <div className="sub-label text-center mb-4">How many hours would you like to book?</div>
                                            <div className="common-input mb-4">
                                                <select name="" id="">
                                                    <option value="">2 Hours</option>
                                                    <option value="">2 Hours</option>
                                                    <option value="">2 Hours</option>
                                                    <option value="">2 Hours</option>
                                                    <option value="">2 Hours</option>
                                                </select>
                                            </div>

                                            <div className="sub-label text-center mb-4 pt-4">When would you like us to come?</div>

                                            <div className="mb-4 d-flex align-items-center">
                                                <div className="common-input">
                                                    <input type="text" placeholder="14 Fri 2020" />
                                                </div>
                                                <div className="common-input pl-4">
                                                    <input type="text" placeholder="10:00 AM" />
                                                </div>
                                            </div>

                                            <div className="common-input mb-4">
                                                <input type="text" placeholder="Email Adress" />
                                            </div>
                                            <div className="common-input mb-4">
                                                <input type="text" placeholder="Phone Number" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center mt-5">
                                        <Link to="/service-providers" className="button-common mt-5 w-50">Get a Price</Link>
                                    </div>

                                    <div className="moving-des mt-5">
                                        <p className="text-center">By signing and clicking Get a Price, you affirm you
                                        have read and agree to the Handy Terms, and you agree
                                        and authorize Handy and its affiliates, and their networks
                                        of service professionals, to deliver marketing calls or texts
                                        using automated technology to the number you provided above regarding
                                        your project and other home services offers. Consent is not a
                                             condition of purchase.</p>
                                        <br />
                                        <br />
                                        <br />
                                        <p className="text-center">If you're moving to a new home or relocating your office, you're probably worried about
                                        how you're going to get it all done. Luckily, Handy is here to help. When you book moving
                                        help through the Handy platform, you'll save time, money and the inevitable stress that comes
                                        with any big move. Handy will connect you with local house movers who have the skill, experience,
                                        and equipment to make your house move go as smoothly as possible. You're responsible for providing your
                                        own moving van or truck, but once you've figured that out, Handy will help you figure out the rest.
                                        We will help you find professional furniture movers who can help with everything, from the initial
                                              packing and wrapping to heavy lifting and unpacking once you reach your final destination.</p>
                                        <br />
                                        <br />
                                        <br />
                                        <strong className="text-center">Note: This service is for moving help, including packing boxes, unpacking boxes, heavy lifting, and loading items into a vehicle. It is not full-service moving and there is no transportation provided.</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="handy-works pad-y">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="common-heading text-center">
                                    <div className="title">How Handy Works</div>
                                    <div className="sub-des">liked or admired by many people or by a particular person or group.</div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="hanfy-card">
                                        <div className="inner-card-handy">
                                            <div className="hnady-img">
                                                {/* <img src="" alt=""/> */}
                                            </div>
                                            <div className="title">
                                                Set Up a Cleaning Plan
                                        </div>
                                        </div>
                                        <div className="detail-handy">
                                            Choose a weekly, biweekly, or monthly cleaning plan. We schedule your recurring bookings to make things easy - but don’t worry, you can always reschedule if things change.
                                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                                    </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="hanfy-card">
                                        <div className="inner-card-handy">
                                            <div className="hnady-img">
                                                {/* <img src="" alt=""/> */}
                                            </div>
                                            <div className="title">
                                                Manage Everything Online
                                        </div>
                                        </div>
                                        <div className="detail-handy">
                                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                                    </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="hanfy-card">
                                        <div className="inner-card-handy">
                                            <div className="hnady-img">
                                                {/* <img src="" alt=""/> */}
                                            </div>
                                            <div className="title">
                                                Sit Back and <br />Relax
                                        </div>
                                        </div>
                                        <div className="detail-handy">
                                            An experienced, fully-equipped housekeeping professional will be there on time.
                                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia.
                                    </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <hr />
                        </div>
                    </div>
                </div>

                <section className="service-des-card-sec pad-t">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="common-heading text-center">
                                    <div className="title">What's Included in a House Cleaning?</div>
                                    <div className="sub-des">Here is what you can expect from a house cleaning from a Handy professional. Download the app to share furthe<br />cleaning details and instructions!</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="service-card-des d-flex align-items-center ">
                                    <div className="src-image-box">
                                        <img src="/assets/img/service-caed-2.jpg" className="img-fluid" alt="" />
                                    </div>
                                    <div className="service-card-detail">
                                        <div className="title">Bedroom, Living Room & Common  Areas</div>
                                        <div className="des">
                                            <ul>
                                                <li>Dust all accessible surfaces</li>
                                                <li>Wipe down all mirrors and glass fixtures</li>
                                                <li>Clean all floor surfaces</li>
                                                <li>Take out garbage and recycling</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="service-card-des d-flex align-items-center ">
                                    <div className="src-image-box">
                                        <img src="/assets/img/service-caed-2-2.jpg" className="img-fluid" alt="" />
                                    </div>
                                    <div className="service-card-detail">
                                        <div className="title">Bathroom<br /> Cleaning</div>
                                        <div className="des">
                                            <ul>
                                                <li>Wash and sanitize the toilet, shower, tub and sink</li>
                                                <li>Dust all accessible surfaces</li>
                                                <li>Wipe down all mirrors and glass fixtures</li>
                                                <li> Clean all floor surfaces</li>
                                                <li>Take out garbage and recycling</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="service-card-des d-flex align-items-center ">
                                    <div className="src-image-box">
                                        <img src="/assets/img/service-caed-2-3.jpg" className="img-fluid" alt="" />
                                    </div>
                                    <div className="service-card-detail">
                                        <div className="title">Kitchen<br /> Cleaning</div>
                                        <div className="des">
                                            <ul>
                                                <li>Dust all accessible surfaces</li>
                                                <li>Empty sink and load up dishwasher with dirty dishes</li>
                                                <li>Wipe down exterior of stove, oven and fridge</li>
                                                <li> Clean all floor surfaces</li>
                                                <li>Take out garbage and recycling</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="service-card-des d-flex align-items-center ">
                                    <div className="src-image-box">
                                        <img src="/assets/img/service-caed-2-3.jpg" className="img-fluid" alt="" />
                                    </div>
                                    <div className="service-card-detail">
                                        <div className="title">Extras</div>
                                        <div className="des">
                                            For a deeper clean, consider adding one or more
                                            cleaning extras. Most cleaning extras add one half
                                            hour of time and cost to your booking.
                                            <ul>
                                                <li>Inside cabinets</li>
                                                <li>Inside fridge</li>
                                                <li>Inside oven</li>
                                                <li>Laundry wash & dry</li>
                                                <li>Interior windows</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <hr />
                        </div>
                    </div>
                </div>

              <div className="d-none">
              <section className="qustions-sec pad-y">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="common-heading text-center">
                                    <div className="title">Frequently Asked Questions</div>
                                    <div className="sub-des">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit<br /> mollit. Exercitation veniam consequat sunt nostrud amet.</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="qusr-list">
                                    <div className="title">What's included in a cleaning?</div>
                                    <div className="des">See what's included in a cleaning service.</div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div id="accordion">
                                    <div className="qusr-list mb-2">
                                        <div id="headingOne">
                                            <button className="btn text-left title w-100 d-flex align-items-center justify-content-between" data-toggle="collapse" data-target="#qust1" aria-expanded="true" aria-controls="collapseOne">
                                                Which Handy professional will come to my place?<i className="fa fa-angle-down pl-1" aria-hidden="true"></i>
                                            </button>
                                        </div>

                                        <div id="qust1" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                            <div className="des">
                                                <ul>
                                                    <li>Handy has a vast network of experienced, top-rated cleaners. Based on the time and date of your request, we work to assign the best professional available.</li>
                                                    <li>Like working with a specific pro? Add them to your Pro Team from the mobile app and they'll be requested first for all future bookings.</li>
                                                    <li>You will receive an email with details about your professional prior to your appointment.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="qusr-list mb-2">
                                        <div id="headingOne">
                                            <button className="btn text-left title w-100 d-flex align-items-center justify-content-between" data-toggle="collapse" data-target="#qust2" aria-expanded="true" aria-controls="collapseOne">
                                                Can I skip or reschedule bookings?<i className="fa fa-angle-down pl-1" aria-hidden="true"></i>
                                            </button>
                                        </div>

                                        <div id="qust2" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                            <div className="des">
                                                <ul>
                                                    <li>Handy has a vast network of experienced, top-rated cleaners. Based on the time and date of your request, we work to assign the best professional available.</li>
                                                    <li>Like working with a specific pro? Add them to your Pro Team from the mobile app and they'll be requested first for all future bookings.</li>
                                                    <li>You will receive an email with details about your professional prior to your appointment.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="qusr-list mb-2">
                                        <div id="headingOne">
                                            <button className="btn text-left title w-100 d-flex align-items-center justify-content-between" data-toggle="collapse" data-target="#qust3" aria-expanded="true" aria-controls="collapseOne">
                                                How much are house cleaning services?<i className="fa fa-angle-down pl-1" aria-hidden="true"></i>
                                            </button>
                                        </div>

                                        <div id="qust3" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                            <div className="des">
                                                <ul>
                                                    <li>Handy has a vast network of experienced, top-rated cleaners. Based on the time and date of your request, we work to assign the best professional available.</li>
                                                    <li>Like working with a specific pro? Add them to your Pro Team from the mobile app and they'll be requested first for all future bookings.</li>
                                                    <li>You will receive an email with details about your professional prior to your appointment.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="qusr-list mb-2">
                                        <div id="headingOne">
                                            <button className="btn text-left title w-100 d-flex align-items-center justify-content-between" data-toggle="collapse" data-target="#qust4" aria-expanded="true" aria-controls="collapseOne">
                                                Are house cleaning services worth it?<i className="fa fa-angle-down pl-1" aria-hidden="true"></i>
                                            </button>
                                        </div>

                                        <div id="qust4" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                            <div className="des">
                                                <ul>
                                                    <li>Handy has a vast network of experienced, top-rated cleaners. Based on the time and date of your request, we work to assign the best professional available.</li>
                                                    <li>Like working with a specific pro? Add them to your Pro Team from the mobile app and they'll be requested first for all future bookings.</li>
                                                    <li>You will receive an email with details about your professional prior to your appointment.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="qusr-list mb-2">
                                        <div id="headingOne">
                                            <button className="btn text-left title w-100 d-flex align-items-center justify-content-between" data-toggle="collapse" data-target="#qust5" aria-expanded="true" aria-controls="collapseOne">
                                                I need more help<i className="fa fa-angle-down pl-1" aria-hidden="true"></i>
                                            </button>
                                        </div>

                                        <div id="qust5" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                            <div className="des">
                                                <ul>
                                                    <li>Handy has a vast network of experienced, top-rated cleaners. Based on the time and date of your request, we work to assign the best professional available.</li>
                                                    <li>Like working with a specific pro? Add them to your Pro Team from the mobile app and they'll be requested first for all future bookings.</li>
                                                    <li>You will receive an email with details about your professional prior to your appointment.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <hr />
                        </div>
                    </div>
                </div>
              </div>
                <section className="handy-works pad-y">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="common-heading text-center">
                                    <div className="title">Meet Some of Our Top House Cleaning Professionals</div>
                                    <div className="sub-des">Build a Pro Team so that you always have a great group of go-to professionals for all your home cleaning services. </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="team-card">
                                        <div className="team-img">
                                            <img src="/assets/img/user1.jpg" className="img-fluid" alt="" />
                                        </div>
                                        <div className="title">
                                            Sharonda H.
                                            </div>
                                        <div className="job-cmplte">179 Jobs Completed</div>
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
                                            Choose a weekly, biweekly, or monthly cleaning plan. We schedule your recurring bookings to make things easy - but don’t worry, you can always reschedule if things change.
                                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                                            </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="team-card">
                                        <div className="team-img">
                                            <img src="/assets/img/user2.jpg" className="img-fluid" alt="" />
                                        </div>
                                        <div className="title">
                                            Justin R.
                                            </div>
                                        <div className="job-cmplte">19 Jobs Completed</div>
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
                                            <img src="/assets/img/user3.jpg" className="img-fluid" alt="" />
                                        </div>
                                        <div className="title">
                                            Milagros K.
                                            </div>
                                        <div className="job-cmplte">1219 Jobs Completed</div>
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
                        </div>
                    </div>
                </section>
                <div className="d-none"><div className="container">
                    <div className="row">
                        <div className="col-12">
                            <hr />
                        </div>
                    </div>
                </div>

                <section className="best-house-clen pad-y">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="common-heading text-center">
                                    <div className="title">Here's Why Handy is the Best House Cleaning Service</div>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="clen-info">
                                    <strong>Instant online booking with 7am-11pm availability</strong>
                                Book online instantly, and schedule your first cleaning for as early as tomorrow. Get your home cleaned anytime from 7am to 11pm, 7 days a week.
                                <br />
                                    <br /><br />
                                    <strong>Friendly, vetted professionals</strong>
                                All professionals on the Handy platform are screened, background checked, and are rated by customers like you to ensure quality.
                                <br />
                                    <br /><br />
                                    <strong>Cleaned the way you want</strong>
                                Professionals bring supplies and work from a comprehensive checklist that you can tailor to your liking. You can work with the same cleaner every time. Handy strives to match you with the right professional for you and your home. We also provide you with a team of professionals to provide backup in case of scheduling conflicts.
                                <br />
                                    <br /><br />
                                    <strong>Flexible scheduling</strong>
                                Set a schedule that fits your life. Handy helps you automatically schedule your weekly, biweekly, or monthly cleaning, so you can focus on the other things in your life. Reschedule or adjust the frequency of your cleanings as needed. Get the benefit of a regularly cleaned home. Easy and secure online payments. No more last minute runs to the bank. Pay online and tip at your discretion.
                                <br />
                                    <br /><br />
                                    <strong>See the progress of your cleaning from your phone</strong>
                                Not able to be home during the cleaning? No problem. The Handy app allows your to see when your cleaner arrives and check the progress of their cleaning.
                                <br />
                                    <br />
                                    <br />
                                    <strong>The Handy Happiness Guarantee</strong>
                                Your happiness is our goal. If you're not satisfied with the quality of the service, we'll send another pro to make it right at no extra charge.
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <hr />
                        </div>
                    </div>
                </div></div>


                <div className="cleaning-affordable pad-y">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="affordable-detail">
                                    <div className="title">Make House Cleaning Your Affordable Luxury</div>
                                    <p className="des">
                                        Imagine a world without Handy. You’ve put in a 12 hour day at the office, your train is 30 minutes late,
                                        and by the time you finally walk into your apartment, there are dirty dishes stacked high in the sink,
                                        dirty clothes are strewn everywhere, your bed is unmade, the shower is starting to smell a bit like mildew,
                                        and the floors are covered with mud. A professional maid service probably sounds pretty good right about now,
                                        doesn't it? The last thing
                                        in the world you want to do is pull on your yellow rubber gloves
                                        and begin scrubbing the floors and vacuuming the carpets. With Handy, you don’t have to.
                                        <br />
                                        <br />
                                        There is no feeling quite like coming home from work and walking into a beautiful, fresh-smelling,
                                        clean home. Rather than clean the toilet, dust the shelves, and wipe down the countertops, you can instead
                                        unwind on the couch, curled up under a blanket, maybe pour yourself that glass of wine you’ve been thinking about,
                                        and start that new TV show everyone’s been talking about. A visit from a housekeeping service is one of the best gifts
                                        you can give yourself. Book a home cleaning with Handy today.If you’re in need of home cleaning, apartment cleaning, or
                                        a maid service, we’re simply the best, most convenient home cleaning service out there. We know you want the cheapest house cleaning
                                        available while still having the confidence that you will receive a cleaner who is thorough and professional, with keen attention
                                        to detail. When you sign up for a Handy house cleaning plan, we aim to offer you just that. And Handy helps schedule
                                        your recurring cleanings automatically for you, so you can focus on the other things in your life.
                                    </p>
                                </div>
                                <div className="affordable-detail mt-5 pt-5">
                                    <div className="title">Fairly Priced and Convenient Cleaning Services</div>
                                    <p className="des">
                                        Price is important. Nobody likes it when they think they’re paying one price for a home cleaning service provider,
                                        and then they are informed that the price is actually going to be much higher. With Handy,
                                        we let you know up front what you’re going to pay. And with incredibly affordable hourly
                                        rates given at a discount to loyal customers who sign up for weekly, bi-weekly or monthly house
                                        cleaning services, we’re confident you’ll be satisfied.
                                        <br />
                                        <br />
                                        Admit it, we’ve all been there. Your home cleaning or maid service is coming the next morning and you
                                        realize at 9 PM that you don’t have any cash to pay them. So you reluctantly put on your shoes, find your jacket,
                                        and drive to the nearest bank to take money out of the ATM. Handy is entirely cashless -- pay your cleaner in the
                                        app with a credit card, simple as that. We’ll even save it for next time. And if you’re so thrilled with how beautiful
                                        and clean your apartment looks and you want to tip your house cleaning pro something extra, you can do that with
                                        your credit card in the app as well.
                                    </p>
                                </div>
                                <div className="affordable-detail mt-5 pt-5">
                                    <div className="title">Ensuring Your House Cleaner Does the Perfect Job</div>
                                    <p className="des">
                                    We know that when you book a maid service, housekeeping service, or house cleaning service through Handy, you are allowing a stranger to enter your home. When you book a house cleaner through the Handy platform, you can rest assured that they’ve been vetted before they arrive at your door. You can give your Handy professional additional instructions when filling out your cleaning preferences online. If you have particular allergies to detergents, for instance, or a special way of cleaning that you prefer, you can easily let your house cleaner know ahead of time. You can even prioritize the various home cleaning tasks that your Handy professional will tackle in the order that you prefer, so you can make sure your biggest concerns will get extra love and attention.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </>
        )
    }
}