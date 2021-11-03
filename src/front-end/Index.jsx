import React,{Component} from 'react';
import { Link } from "react-router-dom";
export const Index = (props) => {
    return(
        <>
            <div className="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="banner-sec d-flex align-items-center justify-content-between">
                                <div className="banner-text">
                                    <div className="title">The easy, </div>
                                    <div className="subtitle">reliable way to take care of your home.</div>
                                    <div className="des">
                                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                                        Velit officia consequat duis enim velit mollit. Exercitation <br/>
                                        veniam consequat sunt nostrud amet.
                                    </div>
                                    <a href="#" className="button-common">See all Services</a>
                                </div>

                                <div className="banner-image d-flex align-items-center justify-content-center">
                                    <img src='/assets/img/banner-img.jpg' className="img-fluid" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="services-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="common-heading text-center">
                                <div className="title">Popular Services</div>
                                <div className="sub-des">liked or admired by many people or by a particular person or group.</div>
                            </div>
                        </div>

                        <div className="col-md-12 d-flex align-content-center justify-content-between flex-wrap">
                            <div className="service-box">
                                <Link to="/house-cleaning">
                                <img src="/assets/img/service1.jpg" className="img-fluid" alt=""/>
                                <div className="cat-title d-flex align-items-center justify-content-center">Home Cleaning</div>
                                </Link>
                            </div>
                            <div className="service-box">
                                <Link to="/food-grocery">
                                <img src="/assets/img/service2.jpg" className="img-fluid" alt=""/>
                                <div className="cat-title d-flex align-items-center justify-content-center">Groceries</div>
                                </Link>
                            </div>
                            <div className="service-box">
                                <Link to="/food-grocery">
                                <img src="/assets/img/service3.jpg" className="img-fluid" alt=""/>
                                <div className="cat-title d-flex align-items-center justify-content-center">Food</div>
                                </Link>
                            </div>
                            <div className="service-box">
                                <Link to="/moving-help">
                                <img src="/assets/img/service4.jpg" className="img-fluid" alt=""/>
                                <div className="cat-title d-flex align-items-center justify-content-center">Hanging Pictures & Shelves</div>
                                </Link>
                            </div>
                            <div className="service-box">
                                <Link to="/house-cleaning">
                                <img src="/assets/img/service5.jpg" className="img-fluid" alt=""/>
                                <div className="cat-title d-flex align-items-center justify-content-center">Office Cleaning</div>
                                </Link>
                            </div>
                            <div className="service-box">
                                <Link to="/moving-help">
                                <img src="/assets/img/service6.jpg" className="img-fluid" alt=""/>
                                <div className="cat-title d-flex align-items-center justify-content-center">TV Mounting</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <div className="row">
                <div className="col-12">
                    <hr/>
                </div>
                </div>
            </div>

            <section className="background-checked pad-y">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="common-heading text-center">
                                <div className="title">Vetted, Background-Checked Professionals</div>
                                <div className="sub-des">
                                Cleaning and handyman tasks booked and paid for directly through the Handy platform are performed by 
                                <br className="d-none d-md-block"/>experienced, background-checked professionals who are highly rated by customers like you. Learn more.
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="back-check-box d-flex align-items-center justify-content-between">
                                <div className="check-img">
                                    <img src="/assets/img/back-check-layer.svg" className="img-fluid layer-img" alt=""/>
                                    <div className="layer-main-img">
                                    <img src="/assets/img/back-check.jpg" className="img-fluid" alt=""/>
                                    </div>
                                </div>
                                <div className="back-check-text">
                                    <div className="title">
                                    Your Happiness,<br/>Guaranteed
                                    </div>
                                    <div className="check-des">
                                        Your Happiness, GuaranteedYour happiness is our goal. If you’re not happy,
                                        we’ll work to make it right. Our friendly customer service agents are 
                                        available 24 hours a day, 7 days a week. The Handy Happiness Guarantee 
                                        only applies when you book and pay for a service directly through the Handy 
                                        platform. <a href="#">Learn more</a>
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
                    <hr/>
                </div>
                </div>
            </div>

            <section className="download-apps pad-y">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="common-heading text-center">
                                <div className="title">Get the Handy App</div>
                                <div className="sub-des">
                                Book and manage appointments, message your pro, view pro profiles and ratings, see real-time location of
                                <br className="d-none d-md-block"/>
                                your pro and so much more.
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="phone-box text-center">
                                <img src="/assets/img/phone.png" className="img-fluid" alt=""/>
                            </div>

                            <div className="app-links mx-auto d-flex align-items-center justify-content-between pad-t">
                                <a href="#">
                                    <img src="/assets/img/play-store.png" className="img-fluid" alt=""/>
                                </a>
                                <a href="#">
                                    <img src="/assets/img/ios.png" className="img-fluid" alt=""/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container">
                <div className="row">
                <div className="col-12">
                    <hr/>
                </div>
                </div>
            </div>
            
            <section className="shop-for-home pad-y">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="common-heading text-center">
                                <div className="title">Shop for your Home with Handy</div>
                                <div className="sub-des">
                                Shop furniture, electronics, appliances, and more. Everything comes with expert installation by Handy.
                                </div>
                            </div>
                        </div>


                        <div className="col-md-12">
                            <div className="shop-baner">
                            <div className="hany-shop-img">
                                <img src="/assets/img/shop-home.jpg" alt="" className="img-fluid"/>
                                <div className="back-layer">
                                    {/* <img src="/assets/img/layer-2.jpg" alt="" className="img-fluid"/> */}
                                </div>
                                <div className="inner-btn d-flex align-items-center justify-content-center">
                                    <a href="#" className="button-common">Show all Home Products</a>
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
                    <hr/>
                </div>
                </div>
            </div>


            <section className="five-star-sec pad-y">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="stre-detail">
                                <div className="title">Are You a Five Star Pro?</div>
                                <div className="des">
                                From cleaners to handymen to smart home installers, Handy is always 
                                looking for service professionals who are experts in their trade and provide
                                    great service to their customers. The best home service professionals use 
                                    Handy for the great pay and flexible scheduling.
                                </div>
                                <a href="#" className="button-common">Become a Handy Pro</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container">
                <div className="row">
                <div className="col-12">
                    <hr/>
                </div>
                </div>
            </div>


            <section className="our-partners-sec pad-y">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="common-heading text-center">
                                <div className="title">Our Partners</div>
                                <div className="sub-des">
                                Handy works with partners who want to provide their customers, tenants,
                                    or employees easy access to quality <br className="d-none d-md-block"/>home services at affordable prices.
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="partner-logos d-flex align-items-center justify-content-between flex-wrap">
                                <div className="p-logo text-right w-50 px-5 mb-5">
                                    <img src="/assets/img/partner-1.png" className="partner" alt=""/>
                                </div>
                                <div className="p-logo text-left w-50 px-5 mb-5">
                                    <img src="/assets/img/partner-2.png" className="partner" alt=""/>
                                </div>
                                <div className="p-logo text-right w-50 px-5">
                                    <img src="/assets/img/partner-3.png" className="partner" alt=""/>
                                </div>
                                <div className="p-logo text-left w-50 px-5">
                                    <img src="/assets/img/partner-4.png" className="partner" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
        </>
    )
}
