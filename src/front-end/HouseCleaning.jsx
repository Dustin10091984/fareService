import React, { useState, useEffect } from 'react';
import { Product } from '../front-end/common/product';
import {Question} from './common/Question';
export const HouseCleaning = (props) => {

        return (
            <>
                <div
                    className="breadcrumb-sec d-flex align-items-center justify-content-center"
                    style={{
                        backgroundImage: `url("/assets/img/moving-help.jpg")`,
                    }}
                ></div>

                <div className="moving-help-sec ">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="moving-search-box house-cleaning-sec">
                                    <div className="title-move mb-5">
                                        House Cleaning
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="m-search-left-box w-100">
                                            <div className="mb-4 d-flex align-items-center justify-content-between">
                                                <div className="common-input">
                                                    <input
                                                        type="text"
                                                        placeholder="Zip Code"
                                                    />
                                                </div>
                                                <div className="common-input px-4">
                                                    <input
                                                        type="text"
                                                        placeholder="State"
                                                    />
                                                </div>
                                                <div className="common-input">
                                                    <input
                                                        type="text"
                                                        placeholder="City"
                                                    />
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between">
                                                <div className="common-input mb-4 mr-3">
                                                    <select name="" id="">
                                                        <option value="">
                                                            1 Bedroom
                                                        </option>
                                                        <option value="">
                                                            2 Bedroom
                                                        </option>
                                                        <option value="">
                                                            3 Bedroom
                                                        </option>
                                                        <option value="">
                                                            4 Bedroom
                                                        </option>
                                                        <option value="">
                                                            5 Bedroom
                                                        </option>
                                                    </select>
                                                </div>

                                                <div className="common-input mb-4 ml-3">
                                                    <select name="" id="">
                                                        <option value="">
                                                            1 Bedroom
                                                        </option>
                                                        <option value="">
                                                            2 Bedroom
                                                        </option>
                                                        <option value="">
                                                            3 Bedroom
                                                        </option>
                                                        <option value="">
                                                            4 Bedroom
                                                        </option>
                                                        <option value="">
                                                            5 Bedroom
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="mb-4 d-flex align-items-center justify-content-between">
                                                <div className="common-input pr-3">
                                                    <input
                                                        type="text"
                                                        placeholder="Phone Number"
                                                    />
                                                </div>
                                                <div className="common-input pl-3">
                                                    <input
                                                        type="text"
                                                        placeholder="Email"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center mt-0">
                                        {/* <Link to="/service-providers" className="button-common mt-5 w-100">Get a Price</Link> */}
                                    </div>

                                    {/* <Question serviceId={1} {...props}/> */}
                                    <div className="moving-des mt-5">
                                        <div className="title">
                                            For your home size, We recommend
                                        </div>

                                        <ul className="time-list d-flex align-items-center justify-content-between flex-wrap">
                                            <li className="d-flex align-items-center justify-content-center">
                                                1 Hours
                                            </li>
                                            <li className="d-flex align-items-center justify-content-center">
                                                4 Hours
                                            </li>
                                            <li className="d-flex align-items-center justify-content-center">
                                                6 Hours
                                            </li>
                                            <li className="d-flex align-items-center justify-content-center">
                                                8 Hours
                                            </li>
                                            <li className="d-flex align-items-center justify-content-center">
                                                10 Hours
                                            </li>
                                            <li className="d-flex align-items-center justify-content-center">
                                                2 Hours
                                            </li>
                                        </ul>
                                        <p className="text-center">
                                            By signing and clicking Get a Price,
                                            you affirm you have read and agree
                                            to the Farenow Terms, and you agree
                                            and authorize Farenow and its
                                            affiliates, and their networks of
                                            service professionals, to deliver
                                            marketing calls or texts using
                                            automated technology to the number
                                            you provided above regarding your
                                            project and other home services
                                            offers. Consent is not a condition
                                            of purchase.
                                        </p>
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
                                    <div className="title">
                                        How Farenow Works
                                    </div>
                                    <div className="sub-des">
                                        liked or admired by many people or by a
                                        particular person or group.
                                    </div>
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
                                            Choose a weekly, biweekly, or
                                            monthly cleaning plan. We schedule
                                            your recurring bookings to make
                                            things easy - but don’t worry, you
                                            can always reschedule if things
                                            change. Amet minim mollit non
                                            deserunt ullamco est sit aliqua
                                            dolor do amet sint. Velit officia
                                            consequat duis enim velit mollit.
                                            Exercitation veniam consequat sunt
                                            nostrud amet.
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
                                            Amet minim mollit non deserunt
                                            ullamco est sit aliqua dolor do amet
                                            sint. Velit officia consequat duis
                                            enim velit mollit. Exercitation
                                            veniam consequat sunt nostrud amet.
                                            Amet minim mollit non deserunt
                                            ullamco est sit aliqua dolor do amet
                                            sint. Velit officia consequat duis
                                            enim velit mollit. Exercitation
                                            veniam consequat sunt nostrud amet.
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
                                                Sit Back and <br />
                                                Relax
                                            </div>
                                        </div>
                                        <div className="detail-handy">
                                            An experienced, fully-equipped
                                            housekeeping professional will be
                                            there on time. Amet minim mollit non
                                            deserunt ullamco est sit aliqua
                                            dolor do amet sint. Velit officia
                                            consequat duis enim velit mollit.
                                            Exercitation veniam consequat sunt
                                            nostrud amet. Amet minim mollit non
                                            deserunt ullamco est sit aliqua
                                            dolor do amet sint. Velit officia.
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
                                    <div className="title">
                                        What's Included in a House Cleaning?
                                    </div>
                                    <div className="sub-des">
                                        Here is what you can expect from a house
                                        cleaning from a Farenow professional.
                                        Download the app to share furthe
                                        <br />
                                        cleaning details and instructions!
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="service-card-des d-flex align-items-center ">
                                    <div className="src-image-box">
                                        <img
                                            src="/assets/img/service-caed-2.jpg"
                                            className="img-fluid"
                                            alt="image"
                                        />
                                    </div>
                                    <div className="service-card-detail">
                                        <div className="title">
                                            Bedroom, Living Room & Common Areas
                                        </div>
                                        <div className="des">
                                            <ul>
                                                <li>
                                                    Dust all accessible surfaces
                                                </li>
                                                <li>
                                                    Wipe down all mirrors and
                                                    glass fixtures
                                                </li>
                                                <li>
                                                    Clean all floor surfaces
                                                </li>
                                                <li>
                                                    Take out garbage and
                                                    recycling
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="service-card-des d-flex align-items-center ">
                                    <div className="src-image-box">
                                        <img
                                            src="/assets/img/service-caed-2-2.jpg"
                                            className="img-fluid"
                                            alt="image"
                                        />
                                    </div>
                                    <div className="service-card-detail">
                                        <div className="title">
                                            Bathroom
                                            <br /> Cleaning
                                        </div>
                                        <div className="des">
                                            <ul>
                                                <li>
                                                    Wash and sanitize the
                                                    toilet, shower, tub and sink
                                                </li>
                                                <li>
                                                    Dust all accessible surfaces
                                                </li>
                                                <li>
                                                    Wipe down all mirrors and
                                                    glass fixtures
                                                </li>
                                                <li>
                                                    {" "}
                                                    Clean all floor surfaces
                                                </li>
                                                <li>
                                                    Take out garbage and
                                                    recycling
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="service-card-des d-flex align-items-center ">
                                    <div className="src-image-box">
                                        <img
                                            src="/assets/img/service-caed-2-3.jpg"
                                            className="img-fluid"
                                            alt="image"
                                        />
                                    </div>
                                    <div className="service-card-detail">
                                        <div className="title">
                                            Kitchen
                                            <br /> Cleaning
                                        </div>
                                        <div className="des">
                                            <ul>
                                                <li>
                                                    Dust all accessible surfaces
                                                </li>
                                                <li>
                                                    Empty sink and load up
                                                    dishwasher with dirty dishes
                                                </li>
                                                <li>
                                                    Wipe down exterior of stove,
                                                    oven and fridge
                                                </li>
                                                <li>
                                                    {" "}
                                                    Clean all floor surfaces
                                                </li>
                                                <li>
                                                    Take out garbage and
                                                    recycling
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="service-card-des d-flex align-items-center ">
                                    <div className="src-image-box">
                                        <img
                                            src="/assets/img/service-caed-2-3.jpg"
                                            className="img-fluid"
                                            alt="image"
                                        />
                                    </div>
                                    <div className="service-card-detail">
                                        <div className="title">Extras</div>
                                        <div className="des">
                                            For a deeper clean, consider adding
                                            one or more cleaning extras. Most
                                            cleaning extras add one half hour of
                                            time and cost to your booking.
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
                    {" "}
                    <section className="qustions-sec pad-y">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="common-heading text-center">
                                        <div className="title">
                                            Frequently Asked Questions
                                        </div>
                                        <div className="sub-des">
                                            Amet minim mollit non deserunt
                                            ullamco est sit aliqua dolor do amet
                                            sint. Velit officia consequat duis
                                            enim velit
                                            <br /> mollit. Exercitation veniam
                                            consequat sunt nostrud amet.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="qusr-list">
                                        <div className="title">
                                            What's included in a cleaning?
                                        </div>
                                        <div className="des">
                                            See what's included in a cleaning
                                            service.
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div id="accordion">
                                        <div className="qusr-list mb-2">
                                            <div id="headingOne">
                                                <button
                                                    className="btn text-left title w-100 d-flex align-items-center justify-content-between"
                                                    data-toggle="collapse"
                                                    data-target="#qust1"
                                                    aria-expanded="true"
                                                    aria-controls="collapseOne"
                                                >
                                                    Which Farenow professional
                                                    will come to my place?
                                                    <i
                                                        className="fa fa-angle-down pl-1"
                                                        aria-hidden="true"
                                                    ></i>
                                                </button>
                                            </div>

                                            <div
                                                id="qust1"
                                                className="collapse show"
                                                aria-labelledby="headingOne"
                                                data-parent="#accordion"
                                            >
                                                <div className="des">
                                                    <ul>
                                                        <li>
                                                            Farenow has a vast
                                                            network of
                                                            experienced,
                                                            top-rated cleaners.
                                                            Based on the time
                                                            and date of your
                                                            request, we work to
                                                            assign the best
                                                            professional
                                                            available.
                                                        </li>
                                                        <li>
                                                            Like working with a
                                                            specific pro? Add
                                                            them to your Pro
                                                            Team from the mobile
                                                            app and they'll be
                                                            requested first for
                                                            all future bookings.
                                                        </li>
                                                        <li>
                                                            You will receive an
                                                            email with details
                                                            about your
                                                            professional prior
                                                            to your appointment.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="qusr-list mb-2">
                                            <div id="headingOne">
                                                <button
                                                    className="btn text-left title w-100 d-flex align-items-center justify-content-between"
                                                    data-toggle="collapse"
                                                    data-target="#qust2"
                                                    aria-expanded="true"
                                                    aria-controls="collapseOne"
                                                >
                                                    Can I skip or reschedule
                                                    bookings?
                                                    <i
                                                        className="fa fa-angle-down pl-1"
                                                        aria-hidden="true"
                                                    ></i>
                                                </button>
                                            </div>

                                            <div
                                                id="qust2"
                                                className="collapse"
                                                aria-labelledby="headingOne"
                                                data-parent="#accordion"
                                            >
                                                <div className="des">
                                                    <ul>
                                                        <li>
                                                            Farenow has a vast
                                                            network of
                                                            experienced,
                                                            top-rated cleaners.
                                                            Based on the time
                                                            and date of your
                                                            request, we work to
                                                            assign the best
                                                            professional
                                                            available.
                                                        </li>
                                                        <li>
                                                            Like working with a
                                                            specific pro? Add
                                                            them to your Pro
                                                            Team from the mobile
                                                            app and they'll be
                                                            requested first for
                                                            all future bookings.
                                                        </li>
                                                        <li>
                                                            You will receive an
                                                            email with details
                                                            about your
                                                            professional prior
                                                            to your appointment.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="qusr-list mb-2">
                                            <div id="headingOne">
                                                <button
                                                    className="btn text-left title w-100 d-flex align-items-center justify-content-between"
                                                    data-toggle="collapse"
                                                    data-target="#qust3"
                                                    aria-expanded="true"
                                                    aria-controls="collapseOne"
                                                >
                                                    How much are house cleaning
                                                    services?
                                                    <i
                                                        className="fa fa-angle-down pl-1"
                                                        aria-hidden="true"
                                                    ></i>
                                                </button>
                                            </div>

                                            <div
                                                id="qust3"
                                                className="collapse"
                                                aria-labelledby="headingOne"
                                                data-parent="#accordion"
                                            >
                                                <div className="des">
                                                    <ul>
                                                        <li>
                                                            Farenow has a vast
                                                            network of
                                                            experienced,
                                                            top-rated cleaners.
                                                            Based on the time
                                                            and date of your
                                                            request, we work to
                                                            assign the best
                                                            professional
                                                            available.
                                                        </li>
                                                        <li>
                                                            Like working with a
                                                            specific pro? Add
                                                            them to your Pro
                                                            Team from the mobile
                                                            app and they'll be
                                                            requested first for
                                                            all future bookings.
                                                        </li>
                                                        <li>
                                                            You will receive an
                                                            email with details
                                                            about your
                                                            professional prior
                                                            to your appointment.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="qusr-list mb-2">
                                            <div id="headingOne">
                                                <button
                                                    className="btn text-left title w-100 d-flex align-items-center justify-content-between"
                                                    data-toggle="collapse"
                                                    data-target="#qust4"
                                                    aria-expanded="true"
                                                    aria-controls="collapseOne"
                                                >
                                                    Are house cleaning services
                                                    worth it?
                                                    <i
                                                        className="fa fa-angle-down pl-1"
                                                        aria-hidden="true"
                                                    ></i>
                                                </button>
                                            </div>

                                            <div
                                                id="qust4"
                                                className="collapse"
                                                aria-labelledby="headingOne"
                                                data-parent="#accordion"
                                            >
                                                <div className="des">
                                                    <ul>
                                                        <li>
                                                            Farenow has a vast
                                                            network of
                                                            experienced,
                                                            top-rated cleaners.
                                                            Based on the time
                                                            and date of your
                                                            request, we work to
                                                            assign the best
                                                            professional
                                                            available.
                                                        </li>
                                                        <li>
                                                            Like working with a
                                                            specific pro? Add
                                                            them to your Pro
                                                            Team from the mobile
                                                            app and they'll be
                                                            requested first for
                                                            all future bookings.
                                                        </li>
                                                        <li>
                                                            You will receive an
                                                            email with details
                                                            about your
                                                            professional prior
                                                            to your appointment.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="qusr-list mb-2">
                                            <div id="headingOne">
                                                <button
                                                    className="btn text-left title w-100 d-flex align-items-center justify-content-between"
                                                    data-toggle="collapse"
                                                    data-target="#qust5"
                                                    aria-expanded="true"
                                                    aria-controls="collapseOne"
                                                >
                                                    I need more help
                                                    <i
                                                        className="fa fa-angle-down pl-1"
                                                        aria-hidden="true"
                                                    ></i>
                                                </button>
                                            </div>

                                            <div
                                                id="qust5"
                                                className="collapse"
                                                aria-labelledby="headingOne"
                                                data-parent="#accordion"
                                            >
                                                <div className="des">
                                                    <ul>
                                                        <li>
                                                            Farenow has a vast
                                                            network of
                                                            experienced,
                                                            top-rated cleaners.
                                                            Based on the time
                                                            and date of your
                                                            request, we work to
                                                            assign the best
                                                            professional
                                                            available.
                                                        </li>
                                                        <li>
                                                            Like working with a
                                                            specific pro? Add
                                                            them to your Pro
                                                            Team from the mobile
                                                            app and they'll be
                                                            requested first for
                                                            all future bookings.
                                                        </li>
                                                        <li>
                                                            You will receive an
                                                            email with details
                                                            about your
                                                            professional prior
                                                            to your appointment.
                                                        </li>
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
                                    <div className="title">
                                        Meet Some of Our Top House Cleaning
                                        Professionals
                                    </div>
                                    <div className="sub-des">
                                        Build a Pro Team so that you always have
                                        a great group of go-to professionals for
                                        all your home cleaning services.{" "}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="team-card">
                                        <div className="team-img">
                                            <img
                                                src="/assets/img/user1.jpg"
                                                className="img-fluid"
                                                alt="avatar"
                                            />
                                        </div>
                                        <div className="title">Sharonda H.</div>
                                        <div className="job-cmplte">
                                            179 Jobs Completed
                                        </div>
                                        <div className="stars-rating ">
                                            <div className="star-rating-area d-flex align-items-center justify-content-center">
                                                <div
                                                    className="rating-static clearfix mr-3"
                                                    rel="4"
                                                >
                                                    <label
                                                        className="full"
                                                        title="{{ 'Awesome - 5 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="half"
                                                        title="{{ 'Excellent - 4.5 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="full"
                                                        title="{{ 'Excellent - 4 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="half"
                                                        title="{{ 'Better - 3.5 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="full"
                                                        title="{{ 'Good - 3 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="half"
                                                        title="{{ 'Good - 2.5 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="full"
                                                        title="{{ 'Fair - 2 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="half"
                                                        title="{{ 'Fair - 1.5 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="full"
                                                        title="{{ 'Bad - 1 star' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="half"
                                                        title="{{ 'Bad - 0.5 stars' | translate }}"
                                                    ></label>
                                                </div>
                                                {/* <div className="ratilike ng-binding">5</div> */}
                                            </div>
                                        </div>

                                        <div className="detail-team">
                                            Choose a weekly, biweekly, or
                                            monthly cleaning plan. We schedule
                                            your recurring bookings to make
                                            things easy - but don’t worry, you
                                            can always reschedule if things
                                            change. Amet minim mollit non
                                            deserunt ullamco est sit aliqua
                                            dolor do amet sint. Velit officia
                                            consequat duis enim velit mollit.
                                            Exercitation veniam consequat sunt
                                            nostrud amet.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="team-card">
                                        <div className="team-img">
                                            <img
                                                src="/assets/img/user2.jpg"
                                                className="img-fluid"
                                                alt="avatar"
                                            />
                                        </div>
                                        <div className="title">Justin R.</div>
                                        <div className="job-cmplte">
                                            19 Jobs Completed
                                        </div>
                                        <div className="stars-rating ">
                                            <div className="star-rating-area d-flex align-items-center justify-content-center">
                                                <div
                                                    className="rating-static clearfix mr-3"
                                                    rel="4"
                                                >
                                                    <label
                                                        className="full"
                                                        title="{{ 'Awesome - 5 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="half"
                                                        title="{{ 'Excellent - 4.5 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="full"
                                                        title="{{ 'Excellent - 4 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="half"
                                                        title="{{ 'Better - 3.5 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="full"
                                                        title="{{ 'Good - 3 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="half"
                                                        title="{{ 'Good - 2.5 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="full"
                                                        title="{{ 'Fair - 2 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="half"
                                                        title="{{ 'Fair - 1.5 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="full"
                                                        title="{{ 'Bad - 1 star' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="half"
                                                        title="{{ 'Bad - 0.5 stars' | translate }}"
                                                    ></label>
                                                </div>
                                                {/* <div className="ratilike ng-binding">5</div> */}
                                            </div>
                                        </div>

                                        <div className="detail-team">
                                            My name is Justin I've been home
                                            cleaning for as long as I can
                                            remember. Cleaning was a part of
                                            life, and now has become a passion,
                                            going above and beyond is a thing I
                                            like to do, and I do best.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="team-card">
                                        <div className="team-img">
                                            <img
                                                src="/assets/img/user3.jpg"
                                                className="img-fluid"
                                                alt="avatar"
                                            />
                                        </div>
                                        <div className="title">Milagros K.</div>
                                        <div className="job-cmplte">
                                            1219 Jobs Completed
                                        </div>
                                        <div className="stars-rating ">
                                            <div className="star-rating-area d-flex align-items-center justify-content-center">
                                                <div
                                                    className="rating-static clearfix mr-3"
                                                    rel="4"
                                                >
                                                    <label
                                                        className="full"
                                                        title="{{ 'Awesome - 5 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="half"
                                                        title="{{ 'Excellent - 4.5 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="full"
                                                        title="{{ 'Excellent - 4 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="half"
                                                        title="{{ 'Better - 3.5 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="full"
                                                        title="{{ 'Good - 3 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="half"
                                                        title="{{ 'Good - 2.5 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="full"
                                                        title="{{ 'Fair - 2 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="half"
                                                        title="{{ 'Fair - 1.5 stars' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="full"
                                                        title="{{ 'Bad - 1 star' | translate }}"
                                                    ></label>
                                                    <label
                                                        className="half"
                                                        title="{{ 'Bad - 0.5 stars' | translate }}"
                                                    ></label>
                                                </div>
                                                {/* <div className="ratilike ng-binding">5</div> */}
                                            </div>
                                        </div>

                                        <div className="detail-team">
                                            My name is Milagros and I have been
                                            a housekeeper for 17 years. I have
                                            worked with a family from the
                                            Spanish Embassy in Washington, DC
                                            for 2 years, then I met a nice
                                            family that I worked for 11 years as
                                            a live in housekeeper.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="d-none">
                    <div className="container">
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
                                        <div className="title">
                                            Here's Why Farenow is the Best House
                                            Cleaning Service
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="clen-info">
                                        <strong>
                                            Instant online booking with 7am-11pm
                                            availability
                                        </strong>
                                        Book online instantly, and schedule your
                                        first cleaning for as early as tomorrow.
                                        Get your home cleaned anytime from 7am
                                        to 11pm, 7 days a week.
                                        <br />
                                        <br />
                                        <br />
                                        <strong>
                                            Friendly, vetted professionals
                                        </strong>
                                        All professionals on the Farenow
                                        platform are screened, background
                                        checked, and are rated by customers like
                                        you to ensure quality.
                                        <br />
                                        <br />
                                        <br />
                                        <strong>
                                            Cleaned the way you want
                                        </strong>
                                        Professionals bring supplies and work
                                        from a comprehensive checklist that you
                                        can tailor to your liking. You can work
                                        with the same cleaner every time.
                                        Farenow strives to match you with the
                                        right professional for you and your
                                        home. We also provide you with a team of
                                        professionals to provide backup in case
                                        of scheduling conflicts.
                                        <br />
                                        <br />
                                        <br />
                                        <strong>Flexible scheduling</strong>
                                        Set a schedule that fits your life.
                                        Farenow helps you automatically schedule
                                        your weekly, biweekly, or monthly
                                        cleaning, so you can focus on the other
                                        things in your life. Reschedule or
                                        adjust the frequency of your cleanings
                                        as needed. Get the benefit of a
                                        regularly cleaned home. Easy and secure
                                        online payments. No more last minute
                                        runs to the bank. Pay online and tip at
                                        your discretion.
                                        <br />
                                        <br />
                                        <br />
                                        <strong>
                                            See the progress of your cleaning
                                            from your phone
                                        </strong>
                                        Not able to be home during the cleaning?
                                        No problem. The Farenow app allows your
                                        to see when your cleaner arrives and
                                        check the progress of their cleaning.
                                        <br />
                                        <br />
                                        <br />
                                        <strong>
                                            The Farenow Happiness Guarantee
                                        </strong>
                                        Your happiness is our goal. If you're
                                        not satisfied with the quality of the
                                        service, we'll send another pro to make
                                        it right at no extra charge.
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

                <div className="cleaning-affordable pad-y">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="affordable-detail">
                                    <div className="title">
                                        Make House Cleaning Your Affordable
                                        Luxury
                                    </div>
                                    <p className="des">
                                        Imagine a world without Farenow. You’ve
                                        put in a 12 hour day at the office, your
                                        train is 30 minutes late, and by the
                                        time you finally walk into your
                                        apartment, there are dirty dishes
                                        stacked high in the sink, dirty clothes
                                        are strewn everywhere, your bed is
                                        unmade, the shower is starting to smell
                                        a bit like mildew, and the floors are
                                        covered with mud. A professional maid
                                        service probably sounds pretty good
                                        right about now, doesn't it? The last
                                        thing in the world you want to do is
                                        pull on your yellow rubber gloves and
                                        begin scrubbing the floors and vacuuming
                                        the carpets. With Farenow, you don’t
                                        have to.
                                        <br />
                                        <br />
                                        There is no feeling quite like coming
                                        home from work and walking into a
                                        beautiful, fresh-smelling, clean home.
                                        Rather than clean the toilet, dust the
                                        shelves, and wipe down the countertops,
                                        you can instead unwind on the couch,
                                        curled up under a blanket, maybe pour
                                        yourself that glass of wine you’ve been
                                        thinking about, and start that new TV
                                        show everyone’s been talking about. A
                                        visit from a housekeeping service is one
                                        of the best gifts you can give yourself.
                                        Book a home cleaning with Farenow
                                        today.If you’re in need of home
                                        cleaning, apartment cleaning, or a maid
                                        service, we’re simply the best, most
                                        convenient home cleaning service out
                                        there. We know you want the cheapest
                                        house cleaning available while still
                                        having the confidence that you will
                                        receive a cleaner who is thorough and
                                        professional, with keen attention to
                                        detail. When you sign up for a Farenow
                                        house cleaning plan, we aim to offer you
                                        just that. And Farenow helps schedule
                                        your recurring cleanings automatically
                                        for you, so you can focus on the other
                                        things in your life.
                                    </p>
                                </div>
                                <div className="affordable-detail mt-5 pt-5">
                                    <div className="title">
                                        Fairly Priced and Convenient Cleaning
                                        Services
                                    </div>
                                    <p className="des">
                                        Price is important. Nobody likes it when
                                        they think they’re paying one price for
                                        a home cleaning service provider, and
                                        then they are informed that the price is
                                        actually going to be much higher. With
                                        Farenow, we let you know up front what
                                        you’re going to pay. And with incredibly
                                        affordable hourly rates given at a
                                        discount to loyal customers who sign up
                                        for weekly, bi-weekly or monthly house
                                        cleaning services, we’re confident
                                        you’ll be satisfied.
                                        <br />
                                        <br />
                                        Admit it, we’ve all been there. Your
                                        home cleaning or maid service is coming
                                        the next morning and you realize at 9 PM
                                        that you don’t have any cash to pay
                                        them. So you reluctantly put on your
                                        shoes, find your jacket, and drive to
                                        the nearest bank to take money out of
                                        the ATM. Farenow is entirely cashless --
                                        pay your cleaner in the app with a
                                        credit card, simple as that. We’ll even
                                        save it for next time. And if you’re so
                                        thrilled with how beautiful and clean
                                        your apartment looks and you want to tip
                                        your house cleaning pro something extra,
                                        you can do that with your credit card in
                                        the app as well.
                                    </p>
                                </div>
                                <div className="affordable-detail mt-5 pt-5">
                                    <div className="title">
                                        Ensuring Your House Cleaner Does the
                                        Perfect Job
                                    </div>
                                    <p className="des">
                                        We know that when you book a maid
                                        service, housekeeping service, or house
                                        cleaning service through Farenow, you
                                        are allowing a stranger to enter your
                                        home. When you book a house cleaner
                                        through the Farenow platform, you can
                                        rest assured that they’ve been vetted
                                        before they arrive at your door. You can
                                        give your Farenow professional
                                        additional instructions when filling out
                                        your cleaning preferences online. If you
                                        have particular allergies to detergents,
                                        for instance, or a special way of
                                        cleaning that you prefer, you can easily
                                        let your house cleaner know ahead of
                                        time. You can even prioritize the
                                        various home cleaning tasks that your
                                        Farenow professional will tackle in the
                                        order that you prefer, so you can make
                                        sure your biggest concerns will get
                                        extra love and attention.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
}