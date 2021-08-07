import React, { Component } from 'react';
import { Product } from './common/product';
export class Scolarship extends Component {
    render() {
        return (
            <>
                <div className="breadcrumb-sec d-flex align-items-center justify-content-center" style={{ backgroundImage: `url("/assets/img/news-media.png")` }}>
                    <div className="title">Scolarship</div>
                </div>

                <div className="cleaning-affordable pad-y">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="affordable-detail">
                                    <div className="title">Overview</div>
                                    <p className="des">
                                        Since its inception, Handy has sought to make the world a better place by using technology to connect customers in need of home services with talented professionals ready to provide them. Regardless of whether a customer needs a maid service, a cleaning service, a furniture assembly, or a TV mounting, we want to connect them with the right pro for the job. As we continue to march toward our goal of "Every service, every home" we’ve created new economic opportunities for the thousands of housekeeping and handyman professionals who use our platform and provided immeasurable help and convenience to the customers who’ve booked our services.
                                        Now, we’d like to provide an opportunity to help out a bright, passionate, and ambitious student who is also working to improve the world in their own way. That is why we created the Handy Scholarship.
                                        The winner will receive a $1,000 academic scholarship grant.
                                    </p>
                                </div>
                                <div className="affordable-detail mt-5 pt-5">
                                    <div className="title">Eligibility</div>
                                    <p className="des">
                                        Any student currently enrolled in high school, college, university or trade school is eligible to apply for the Handy Scholarship.

                                    </p>
                                </div>
                                <div className="affordable-detail mt-5 pt-5">
                                    <div className="title">Guidlines & Process</div>
                                    <p className="des">
                                        Applying is easy! Just follow these three steps
                                        Create a short video (maximum 3 minutes) telling us how you plan to change the world for the better. Simple as that!
                                        Host it on YouTube and be sure to include “Handy Scholarship” somewhere in the title and a link to https://www.handy.com in the video description.
                                        Send us an e-mail at scholarships@handy.com with your name, e-mail address, a link to your video, and the name of your educational institution.
                                    </p>
                                </div>
                                <div className="affordable-detail mt-5 pt-5">
                                    <div className="title">Deadline</div>
                                    <p className="des">
                                        The deadline for applying to the Handy Scholarship is August 31, 2018. The winner will be notified via email by September 30, 2018. The winner will then have two weeks to respond and claim their scholarship by providing verification of their educational enrollment.
                                    </p>
                                </div>
                                <div className="affordable-detail mt-5 pt-5">
                                    <div className="title">Legal Disclaimer</div>
                                    <p className="des">
                                    Publicity: Except where prohibited, participation in the Scholarship constitutes Winner’s consent to Handy’s and its respective agents’ use of Winner’s name, likeness, photograph, voice, opinions, hometown, and state for Scholarship-related and promotional purposes in any media, worldwide (with or without attribution), without further payment or consideration.
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
