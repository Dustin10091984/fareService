import React, { useState, useEffect } from 'react';
import { Product } from './common/product';
import { useDispatch, useSelector } from 'react-redux';
import { getProviderList } from '../store/Slices/providers/providerListSclice';
import { Link } from "react-router-dom";
export const ServiceProviders = (props) =>{

const [state, setState] = useState();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProviderList(props.location.search));
    }, [])

    const providerList = useSelector((state) => state.provider);
    useEffect(() => {
        if (providerList !== undefined && !providerList.length) {
            setState(state => ({
                ...state,
                providerList: providerList
            }));
        }
    }, [providerList]);
    return (
            <>
                {/* <div className="breadcrumb-sec-2 d-flex align-items-center justify-content-center flex-column">
                    <div className="title">Our Home Cleaning Service Providers</div>
                    <div className="detail">
                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat<br /> duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                    </div>
                </div> */}

                <section className="service-provider-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="sticky-top">
                                    <div className="service-time-box">
                                        <div className="date-ser mb-4">
                                            <div className="title-servic px-2">Date</div>

                                            <div className="time-list-pro">
                                                <div className="mx-2 select-time">
                                                    Today
                                                </div>
                                                <div className="mx-2 select-time">
                                                    Within 3 days
                                                </div>
                                                <div className="mx-2 select-time">
                                                    Within a week
                                                </div>
                                                <div className="mx-2 select-time">
                                                    Chose Dates
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="title-servic px-2 mt-4">Timming</div>
                                        <ul className="time-list mt-4 d-flex align-items-center justify-content-between flex-wrap">
                                            <li className="d-flex align-items-center justify-content-center">Morning (8AM - 12PM)</li>
                                            <li className="d-flex align-items-center justify-content-center">Afternoon (12PM - 5PM)</li>
                                            <li className="d-flex align-items-center justify-content-center">Afternoon (12PM - 5PM)</li>
                                        </ul>

                                        <div className="common-input mb-4 ml-3 w-auto">
                                            <select name="" id="">
                                                <option value="">Choose specific time</option>
                                                <option value="">Choose specific time</option>
                                                <option value="">Choose specific time</option>
                                                <option value="">Choose specific time</option>
                                                <option value="">Choose specific time</option>
                                            </select>
                                        </div>

                                        <hr />

                                        <div className="title-servic px-2 mt-4">How offten</div>
                                        <div className="time-list-pro">
                                            <div className="mx-2 select-time">
                                                Weekly
                                            </div>
                                            <div className="mx-2 select-time">
                                                Every 2 Weeks
                                            </div>
                                            <div className="mx-2 select-time">
                                                Every 4 Weeks
                                            </div>
                                            <div className="mx-2 select-time">
                                                Just Once
                                            </div>
                                        </div>
                                        <div className="ser-des">
                                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                                            Velit officia consequat duis enim velit mollit.
                                            Exercitation veniam consequat sunt nostrud amet.
                                        </div>

                                        <hr />

                                        <ul className="time-list mt-4 d-flex align-items-start flex-column">
                                            <li className="d-flex align-items-center justify-content-center">Elite Tasker</li>
                                            <li className="d-flex align-items-center justify-content-center">Great Value</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        
                            <div className="col-md-8">
                            {providerList !== undefined && providerList !== null && providerList.data && providerList.data.data ? providerList.data.data.map((provider,index)=>{
                                return(
                                    <div key={index} className="job-provider-card">
                                        <div className="user-des d-flex align-items-centet justify-content-start w-100">
                                            <div className="user-img d-flex align-items-center justify-content-center">
                                                <img src="/assets/img/user4.jpg" className="img-fluid" alt="" />
                                            </div>
                                            <div className="user-detail w-100">
                                                <div className=" w-100 d-flex align-items-centet justify-content-between">
                                                    <div className="title">{provider.first_name} {provider.last_name}</div>
                                                    <Link to='/profile' className="button-common">View Profile</Link>
                                                </div>
                                                <div className="job-status">179 Jobs Completed</div>
                                                <div className="stars-rating w-100  d-flex align-items-centet justify-content-between">
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

                                                    <Link to='/payment' className="button-common-2">Conitnue with this Provider</Link>
                                                </div>
                                                <div className="user-price">$20.00</div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="useer-qust">
                                            <div className="title">How can i help ?</div>
                                            <div className="des">I'm Sharonda! I have over 8 years of
                                                experience in housekeeping. My goal is to delight my customers
                                                by providing a deep, thorough cleaning. Dusted surfaces, baseboards,
                                                ceiling fans, and polished appliances are a big deal to me. I pay
                                                close detail to all the nooks and cranies!</div>
                                        </div>

                                        <div className="top-reviews-list">
                                            <div className="review-title">Top Review</div>

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
                                )
                            }) : (
                                    <>ksjhdjkfhdsjkfhsdkjfhjksdhfjks</>
                                 ) }
                               
                            
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
}


    // <div className="job-provider-card">
    //                                 <div className="user-des d-flex align-items-centet justify-content-start w-100">
    //                                     <div className="user-img d-flex align-items-center justify-content-center">
    //                                         <img src="/assets/img/user4.jpg" className="img-fluid" alt=""/>
    //                                     </div>
    //                                     <div className="user-detail w-100">
    //                                         <div className=" w-100 d-flex align-items-centet justify-content-between">
    //                                             <div className="title">Ekstrom Bothman</div>
    //                                             <Link to='/profile'  className="button-common">View Profile</Link>
    //                                         </div>
    //                                         <div className="job-status">179 Jobs Completed</div>
    //                                         <div className="stars-rating w-100  d-flex align-items-centet justify-content-between">
    //                                             <div className="star-rating-area">
    //                                                 <div className="rating-static clearfix mr-3" rel="4">
    //                                                     <label className="full" title="{{ 'Awesome - 5 stars' | translate }}" ></label>
    //                                                     <label className="half" title="{{ 'Excellent - 4.5 stars' | translate }}" ></label>
    //                                                     <label className="full" title="{{ 'Excellent - 4 stars' | translate }}" ></label>
    //                                                     <label className="half" title="{{ 'Better - 3.5 stars' | translate }}" ></label>
    //                                                     <label className="full" title="{{ 'Good - 3 stars' | translate }}" ></label>
    //                                                     <label className="half" title="{{ 'Good - 2.5 stars' | translate }}" ></label>
    //                                                     <label className="full" title="{{ 'Fair - 2 stars' | translate }}" ></label>
    //                                                     <label className="half" title="{{ 'Fair - 1.5 stars' | translate }}" ></label>
    //                                                     <label className="full" title="{{ 'Bad - 1 star' | translate }}" ></label>
    //                                                     <label className="half" title="{{ 'Bad - 0.5 stars' | translate }}" ></label>
    //                                                 </div>
    //                                                 {/* <div className="ratilike ng-binding">5</div> */}
    //                                             </div>

    //                                             <Link to='/payment' className="button-common-2">Conitnue with this Provider</Link>
    //                                         </div>
    //                                         <div className="user-price">$20.00</div>
    //                                     </div>
    //                                 </div>
    //                                 <hr/>
    //                                 <div className="useer-qust">
    //                                     <div className="title">How can i help ?</div>
    //                                     <div className="des">I'm Sharonda! I have over 8 years of
    //                                      experience in housekeeping. My goal is to delight my customers 
    //                                      by providing a deep, thorough cleaning. Dusted surfaces, baseboards,
    //                                       ceiling fans, and polished appliances are a big deal to me. I pay 
    //                                      close detail to all the nooks and cranies!</div>
    //                                 </div>

    //                                 <div className="top-reviews-list">
    //                                     <div className="review-title">Top Review</div>

    //                                     <div className="review-item d-flex align-itmes-centetr justifu-content-between">
    //                                         <div className="review-img">
    //                                         <img src="/assets/img/user4.jpg" className="img-fluid" alt=""/>
    //                                         </div>

    //                                         <div className="review-detail">
    //                                         I'm Sharonda! I have over 8 years of experience in housekeeping. 
    //                                         My goal is to delight my customers by providing a deep, thorough cleaning.
    //                                          Dusted surfaces, baseboards, ceiling fans, and polished appliances 
    //                                          are a big deal to me. I pay close detail to all the nooks and cranies.
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             <div className="job-provider-card">
    //                                 <div className="user-des d-flex align-items-centet justify-content-start w-100">
    //                                     <div className="user-img d-flex align-items-center justify-content-center">
    //                                         <img src="/assets/img/user4.jpg" className="img-fluid" alt=""/>
    //                                     </div>
    //                                     <div className="user-detail w-100">
    //                                         <div className=" w-100 d-flex align-items-centet justify-content-between">
    //                                             <div className="title">Ekstrom Bothman</div>
    //                                             <Link to='/profile'  className="button-common">View Profile</Link>
    //                                         </div>
    //                                         <div className="job-status">179 Jobs Completed</div>
    //                                         <div className="stars-rating w-100  d-flex align-items-centet justify-content-between">
    //                                             <div className="star-rating-area">
    //                                                 <div className="rating-static clearfix mr-3" rel="4">
    //                                                     <label className="full" title="{{ 'Awesome - 5 stars' | translate }}" ></label>
    //                                                     <label className="half" title="{{ 'Excellent - 4.5 stars' | translate }}" ></label>
    //                                                     <label className="full" title="{{ 'Excellent - 4 stars' | translate }}" ></label>
    //                                                     <label className="half" title="{{ 'Better - 3.5 stars' | translate }}" ></label>
    //                                                     <label className="full" title="{{ 'Good - 3 stars' | translate }}" ></label>
    //                                                     <label className="half" title="{{ 'Good - 2.5 stars' | translate }}" ></label>
    //                                                     <label className="full" title="{{ 'Fair - 2 stars' | translate }}" ></label>
    //                                                     <label className="half" title="{{ 'Fair - 1.5 stars' | translate }}" ></label>
    //                                                     <label className="full" title="{{ 'Bad - 1 star' | translate }}" ></label>
    //                                                     <label className="half" title="{{ 'Bad - 0.5 stars' | translate }}" ></label>
    //                                                 </div>
    //                                                 {/* <div className="ratilike ng-binding">5</div> */}
    //                                             </div>

    //                                             <Link to='/payment' className="button-common-2">Conitnue with this Provider</Link>
    //                                         </div>
    //                                         <div className="user-price">$20.00</div>
    //                                     </div>
    //                                 </div>
    //                                 <hr/>
    //                                 <div className="useer-qust">
    //                                     <div className="title">How can i help ?</div>
    //                                     <div className="des">I'm Sharonda! I have over 8 years of
    //                                      experience in housekeeping. My goal is to delight my customers 
    //                                      by providing a deep, thorough cleaning. Dusted surfaces, baseboards,
    //                                       ceiling fans, and polished appliances are a big deal to me. I pay 
    //                                      close detail to all the nooks and cranies!</div>
    //                                 </div>

    //                                 <div className="top-reviews-list">
    //                                     <div className="review-title">Top Review</div>

    //                                     <div className="review-item d-flex align-itmes-centetr justifu-content-between">
    //                                         <div className="review-img">
    //                                         <img src="/assets/img/user4.jpg" className="img-fluid" alt=""/>
    //                                         </div>

    //                                         <div className="review-detail">
    //                                         I'm Sharonda! I have over 8 years of experience in housekeeping. 
    //                                         My goal is to delight my customers by providing a deep, thorough cleaning.
    //                                          Dusted surfaces, baseboards, ceiling fans, and polished appliances 
    //                                          are a big deal to me. I pay close detail to all the nooks and cranies.
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
