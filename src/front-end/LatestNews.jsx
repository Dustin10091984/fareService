import React, { Component } from 'react';
import { Product } from './common/product';
export class LatestNews extends Component {
    render() {
        return (
            <>
                <div className="breadcrumb-sec d-flex align-items-center justify-content-center" style={{ backgroundImage: `url("/assets/img/news-media.png")` }}>
                    <div className="title">News & Media</div>
                </div>

                <section className="latest-news-sec pad-t">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="common-heading text-center">
                                    <div className="title">Latest News</div>
                                    <div className="sub-des">
                                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit
                                    or employees easy access to quality <br className="d-none d-md-block" /> mollit. Exercitation veniam consequat sunt nostrud amet.
                                </div>
                                </div>
                            </div>

                            <div className="col-md-8">
                                <div className="nes-left-box">
                                    
                                    <div className="new-box  py-5">
                                        <div className="newsimg">
                                            <img src="/assets/img/nesw-1.jpg" className="img-fluid" alt="" />
                                        </div>
                                        <div className="new-title">Faced With Actually Having to Make Money, This Startup Did the Unthinkable</div>
                                        <div className="news-detail">
                                            11/14/2016  -  November 2016<br />
                                        "The risk ended up being worth it. The more customer density
                                         Farenow has in a market, the better its business model works--customer
                                         acquisition is cheaper, the greater density of both cleaners and
                                         customers makes it easier for both to get appointments they want,
                                         and referrals jump as a result. Happier customers means fewer contacts
                                         with customer service staff. Happy staff means higher retention and
                                         less need for recruitment and onboarding assistance. If Farenow hadn't
                                         stopped its market expansion, it would not be reaping these benefits
                                         today...Farenow's economics are looking healthier with each <a href="#">read more</a>..
                                    </div>
                                    </div>
                                    
                                    <div className="new-box  py-5">
                                        <div className="newsimg">
                                            <img src="/assets/img/nesw-2.jpg" className="img-fluid" alt="" />
                                        </div>
                                        <div className="new-title">Uber-like cleaning company tests New York political messaging</div>
                                        <div className="news-detail">
                                            11/14/2016  -  November 2016 <br />
                                            The web platform that connects customers with house cleaners, is
                                            fine-tuning its messaging. In the beginning of March, a pollster
                                            employed by the Flatiron-based tech company asked 800 New Yorkers a
                                            series of questions designed to help Farenow better understand how to
                                            communicate with New York policymakers. The idea was “to make sure we
                                            were communicating in a clear way why people were choosing to work in
                                            a flexible economy,” said Oisin Hanrahan, the company’s CEO." <a href="#"> read more</a>..
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="social-right text-center mb-5">
                                    <div className="social-title  mb-5">Social Contact</div>
                                    <div className="footer-social-link">
                                        <ul className="social d-flex justify-content-center">
                                            <li className="item facebook mr-4"><a href="#"><img src="/assets/img/facebook.png" className="img-fluid" alt="socail"/></a></li>
                                            <li className="item instragram mr-4"><a href="#"><img src="/assets/img/instagram.png" className="img-fluid" alt="socail"/></a></li>
                                            <li className="item twitter mr-4"><a href="#"><img src="/assets/img/twitter.png" className="img-fluid" alt="socail"/></a></li>
                                            <li className="item whatsapp mr-0"><a href="#"><img src="/assets/img/whatsapp.png" className="img-fluid" alt="socail"/></a></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="trending-topics">
                                <div className="social-title text-center mb-5">Trending Topics</div>

                                <ul className="topics-list">
                                    <li className="item"><a href="#" className="link">#trends2020</a></li>
                                    <li className="item"><a href="#" className="link">#newservices</a></li>
                                    <li className="item"><a href="#" className="link">#services</a></li>
                                    <li className="item"><a href="#" className="link">#servicings</a></li>
                                    <li className="item"><a href="#" className="link">#keepclean</a></li>
                                </ul>
                                </div>

                                <div className="add-box">

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
