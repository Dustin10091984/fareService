import React, { Component } from 'react';
import { Product } from './common/product';
export class AboutUs extends Component {
    render() {
        return (
            <>
                <div
                    className="breadcrumb-sec d-flex align-items-center justify-content-center"
                    style={{
                        backgroundImage: `url("/assets/img/news-media.png")`,
                    }}
                >
                    <div className="title">About Us</div>
                </div>

                <div className="cleaning-affordable pad-t">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 mx-auto">
                                <div className="affordable-detail">
                                    <div className="title">
                                        About [site_name]
                                    </div>
                                    <p className="des">
                                        Farenow is the leading platform for
                                        connecting individuals looking for
                                        household services with top-quality,
                                        pre-screened independent service
                                        professionals. From home cleaning to
                                        handyman services, Farenow instantly
                                        matches thousands of customers every
                                        week with top-rated professionals in
                                        cities all around the world. With a
                                        seamless 60-second booking process,
                                        secure payment, and backed by the
                                        Farenow Happiness Guarantee, Farenow is
                                        the easiest, most convenient way to book
                                        home services.
                                    </p>
                                </div>

                                <div className="affordable-detail mt-5 pt-5">
                                    <div className="title">Our Story</div>
                                    <p className="des">
                                        Farenow is the leading platform for
                                        connecting individuals looking for
                                        household services with top-quality,
                                        pre-screened independent service
                                        professionals. From home cleaning to
                                        handyman services, Farenow instantly
                                        matches thousands of customers every
                                        week with top-rated professionals in
                                        cities all around the world. With a
                                        seamless 60-second booking process,
                                        secure payment, and backed by the
                                        Farenow Happiness Guarantee, Farenow is
                                        the easiest, most convenient way to book
                                        home services.
                                    </p>
                                </div>
                                <div className="affordable-detail mt-5 pt-5">
                                    <div className="title">Our Founder</div>
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

                <section className="handy-works py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="team-card">
                                    <div className="team-img">
                                        <img
                                            src="/assets/img/boss1.jpg"
                                            className="img-fluid"
                                            alt="avatar"
                                        />
                                    </div>
                                    <div className="title">Emerson Botosh</div>
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
                                        I'm Sharonda! I have over 8 years of
                                        experience in housekeeping. My goal is
                                        to delight my customers by providing a
                                        deep, thorough cleaning. Dusted
                                        surfaces, baseboards, ceiling fans, and
                                        polished appliances are a big deal to
                                        me. I pay close detail to all the nooks
                                        and cranies!
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="team-card">
                                    <div className="team-img">
                                        <img
                                            src="/assets/img/boss2.jpg"
                                            className="img-fluid"
                                            alt="avatar"
                                        />
                                    </div>
                                    <div className="title">Jaylon Kenter</div>
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
                                        cleaning for as long as I can remember.
                                        Cleaning was a part of life, and now has
                                        become a passion, going above and beyond
                                        is a thing I like to do, and I do best.
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="team-card">
                                    <div className="team-img">
                                        <img
                                            src="/assets/img/boss3.jpg"
                                            className="img-fluid"
                                            alt="avatar"
                                        />
                                    </div>
                                    <div className="title">
                                        Charlie Lipshutz
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
                                        My name is Milagros and I have been a
                                        housekeeper for 17 years. I have worked
                                        with a family from the Spanish Embassy
                                        in Washington, DC for 2 years, then I
                                        met a nice family that I worked for 11
                                        years as a live in housekeeper.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="cleaning-affordable pad-b">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 mx-auto">
                                <div className="affordable-detail">
                                    <div className="title">
                                        Oisin Hanrahan, CEO
                                    </div>
                                    <p className="des">
                                        Oisin Hanrahan is the Co-Founder and CEO
                                        of Farenow. Prior to founding Farenow,
                                        Oisin founded MiCandidate, a service
                                        that provided real time political
                                        content to media companies in 25
                                        European countries. He also founded
                                        Clearwater Group, a real estate
                                        development business in Budapest,
                                        Hungary. In 2009, Oisin co-founded The
                                        Undergraduate Awards, a foundation that
                                        supports and celebrates outstanding
                                        undergraduate students globally.
                                    </p>
                                </div>

                                <div className="affordable-detail mt-5 pt-5">
                                    <div className="title">Umang Dua, COO</div>
                                    <p className="des">
                                        Umang Dua is the Co-Founder and COO of
                                        Farenow. Prior to founding Farenow,
                                        Umang founded College Connect, an online
                                        platform in India that connected
                                        aspiring college students with enrolled
                                        students around the world. Earlier,
                                        Umang was a Business Analyst at McKinsey
                                        & Company. Umang earned a Bachelor of
                                        Arts degree in Economics and Political
                                        Science from Amherst College.
                                    </p>
                                </div>
                                <div className="affordable-detail mt-5 pt-5">
                                    <div className="title">
                                        Thank you to the many people who helped
                                        Farenow get started.
                                    </div>
                                    <p className="des">
                                        Ignacio Leonhardt and Weina Scott were
                                        the first members of the founding team
                                        at Farenow. After spending 9 months
                                        working with Farenow, Ignacio moved back
                                        to Guatemala and is now running his
                                        family's business. Weina worked with
                                        Farenow for 7 months, building the first
                                        version of the website, and now works on
                                        another startup in California. Bob Davis
                                        and Jeremiah Daly from Highland Capital
                                        Partners invested the first capital in
                                        Farenow, followed by Joel Cutler and
                                        Nitesh Banta from General Catalyst
                                        Partners, David Tisch and Adam
                                        Rothenberg from Box Group, and Art
                                        Papas. Andrew Lurvey was Farenow's first
                                        operations team member. Andrew joined
                                        Farenow when we were four people in a
                                        small room. He spent two years working
                                        with Farenow while we've grown to over
                                        200 hundred people in 28 cities.
                                    </p>
                                </div>
                                <div className="affordable-detail mt-5 pt-5">
                                    <div className="title">
                                        Thank you to the many people who've
                                        subsequently joined the team and
                                        invested in Farenow. It's because of
                                        your help that we're well on our way to
                                        changing the way the world buys
                                        services.
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
