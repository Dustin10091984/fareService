import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import moment from 'moment';
import { getServiceRequestList } from '../store/Slices/services/RequestServiceSclice';
import {Loading} from '../front-end/common/Loading';
export const ServicesHistory = (props) => {

    const [state, setstate] = useState({

    })

    const dispatch = useDispatch();

    const loading = useSelector((state) => state?.serviceRequest?.list?.loading);
    const error = useSelector((state) => state?.serviceRequest?.list?.error);
    const message = useSelector((state) => state?.serviceRequest?.list?.message);
    const serviceRequestList = useSelector((state) => state?.serviceRequest?.list?.data);

    useEffect(() => {
        dispatch(getServiceRequestList());
      return () => {
      };
    }, [])


    return (
        <>
            <div className="breadcrumb-dash">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Services History</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashborad-box order-history pad-y">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title">Services History</div>
                            {loading && <Loading/>}
                            {
                                (loading == false && error == true && message) && 
                                <div className="col-12  alert alert-danger text-center" role="alert" style={{fontSize: 15}}>
                                    {message}
                                </div>
                            }
                        </div>
                        {serviceRequestList?.data && serviceRequestList?.data?.map((serviceRequest, index)=>(
                        <div className="col-md-6" key={index}>
                            <div className="order-card d-flex align-items-center justify-content-between">
                                <div className="order-des-b">
                                    <div className="title">{`${serviceRequest?.provider?.first_name} ${serviceRequest?.provider?.last_name}`}</div>
                                    <div className="service-label">{serviceRequest?.sub_service}</div>
                                    <div className="star-rating-area d-flex align-items-center justify-content-start">
                                        <div className="rating-static clearfix mr-3" rel={serviceRequest?.user_feeback?.rating}>
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
                                    <div className="order-time">{moment(serviceRequest?.created_at).fromNow()}</div>
                                </div>
                                <div className="order-btn-b">
                                    <div className="btn-price-serv mb-3">{
                                        (()=>{
                                            if(serviceRequest.working_status == null){
                                                return "Not Started yet!"
                                            }

                                            if(serviceRequest.working_status == 'STARTED'){
                                                return "Started"
                                            }

                                            if(serviceRequest.working_status == 'PAUSED'){
                                                return "Paused"
                                            }

                                            if(serviceRequest.working_status == 'ENDED' && serviceRequest.is_completed == true){
                                                return "Completed" 
                                            }

                                        })()
                                        // serviceRequest?.payable_amount != null ? "$"+(parseInt(serviceRequest?.payable_amount) + parseInt(serviceRequest?.paid_amount)) : "$"+serviceRequest?.paid_amount
                                    }</div>
                                    <Link to={`/profile/${serviceRequest?.provider?.id}`} className="btn-view-profile">View Profile</Link>
                                    {serviceRequest?.paid_amount !== null ? (
                                        <div className="btn-price-serv" style={serviceRequest?.payment_status == null || serviceRequest?.payment_status == true ? {backgroundColor: 'red'} : {backgroundColor:""}}>{
                                            serviceRequest?.payable_amount != null ? "$"+(parseInt(serviceRequest?.payable_amount) + parseInt(serviceRequest?.paid_amount)) : "$"+serviceRequest?.paid_amount
                                        }</div>
                                    ) : ""}
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

{/* <div className="col-md-6">
    <div className="order-card d-flex align-items-center justify-content-between">
        <div className="order-des-b">
            <div className="title">Ekstrom Bothman</div>
            <div className="service-label">House Cleaner</div>
            <div className="star-rating-area d-flex align-items-center justify-content-start">
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
                </div> */}
                {/* <div className="ratilike ng-binding">5</div> */}
    //         </div>
    //         <div className="order-time">19, january 2020  - 12:00 PM</div>
    //     </div>
    //     <div className="order-btn-b">
    //         <button className="btn-view-profile">View Profile</button>
    //         <div className="btn-price-serv">22222222222222</div>
    //     </div>
    // </div>
    // </div>
    // <div className="col-md-6">
    // <div className="order-card d-flex align-items-center justify-content-between">
    //     <div className="order-des-b">
    //         <div className="title">Ekstrom Bothman</div>
    //         <div className="service-label">House Cleaner</div>
    //         <div className="star-rating-area d-flex align-items-center justify-content-start">
    //             <div className="rating-static clearfix mr-3" rel="4">
    //                 <label className="full" title="{{ 'Awesome - 5 stars' | translate }}" ></label>
    //                 <label className="half" title="{{ 'Excellent - 4.5 stars' | translate }}" ></label>
    //                 <label className="full" title="{{ 'Excellent - 4 stars' | translate }}" ></label>
    //                 <label className="half" title="{{ 'Better - 3.5 stars' | translate }}" ></label>
    //                 <label className="full" title="{{ 'Good - 3 stars' | translate }}" ></label>
    //                 <label className="half" title="{{ 'Good - 2.5 stars' | translate }}" ></label>
    //                 <label className="full" title="{{ 'Fair - 2 stars' | translate }}" ></label>
    //                 <label className="half" title="{{ 'Fair - 1.5 stars' | translate }}" ></label>
    //                 <label className="full" title="{{ 'Bad - 1 star' | translate }}" ></label>
    //                 <label className="half" title="{{ 'Bad - 0.5 stars' | translate }}" ></label>
    //             </div>
                {/* <div className="ratilike ng-binding">5</div> */}
    //         </div>
    //         <div className="order-time">19, january 2020  - 12:00 PM</div>
    //     </div>
    //     <div className="order-btn-b">
    //         <button className="btn-view-profile">View Profile</button>
    //         <div className="btn-price-serv">$600</div>
    //     </div>
    // </div>
    // </div>
    // <div className="col-md-6">
    // <div className="order-card d-flex align-items-center justify-content-between">
    //     <div className="order-des-b">
    //         <div className="title">Ekstrom Bothman</div>
    //         <div className="service-label">House Cleaner</div>
    //         <div className="star-rating-area d-flex align-items-center justify-content-start">
    //             <div className="rating-static clearfix mr-3" rel="4">
    //                 <label className="full" title="{{ 'Awesome - 5 stars' | translate }}" ></label>
    //                 <label className="half" title="{{ 'Excellent - 4.5 stars' | translate }}" ></label>
    //                 <label className="full" title="{{ 'Excellent - 4 stars' | translate }}" ></label>
    //                 <label className="half" title="{{ 'Better - 3.5 stars' | translate }}" ></label>
    //                 <label className="full" title="{{ 'Good - 3 stars' | translate }}" ></label>
    //                 <label className="half" title="{{ 'Good - 2.5 stars' | translate }}" ></label>
    //                 <label className="full" title="{{ 'Fair - 2 stars' | translate }}" ></label>
    //                 <label className="half" title="{{ 'Fair - 1.5 stars' | translate }}" ></label>
    //                 <label className="full" title="{{ 'Bad - 1 star' | translate }}" ></label>
    //                 <label className="half" title="{{ 'Bad - 0.5 stars' | translate }}" ></label>
    //             </div>
                {/* <div className="ratilike ng-binding">5</div> */}
    //         </div>
    //         <div className="order-time">19, january 2020  - 12:00 PM</div>
    //     </div>
    //     <div className="order-btn-b">
    //         <button className="btn-view-profile">View Profile</button>
    //         <div className="btn-price-serv">$600</div>
    //     </div>
    // </div>
    // </div>
    // <div className="col-md-6">
    // <div className="order-card d-flex align-items-center justify-content-between">
    //     <div className="order-des-b">
    //         <div className="title">Ekstrom Bothman</div>
    //         <div className="service-label">House Cleaner</div>
    //         <div className="star-rating-area d-flex align-items-center justify-content-start">
    //             <div className="rating-static clearfix mr-3" rel="4">
    //                 <label className="full" title="{{ 'Awesome - 5 stars' | translate }}" ></label>
    //                 <label className="half" title="{{ 'Excellent - 4.5 stars' | translate }}" ></label>
    //                 <label className="full" title="{{ 'Excellent - 4 stars' | translate }}" ></label>
    //                 <label className="half" title="{{ 'Better - 3.5 stars' | translate }}" ></label>
    //                 <label className="full" title="{{ 'Good - 3 stars' | translate }}" ></label>
    //                 <label className="half" title="{{ 'Good - 2.5 stars' | translate }}" ></label>
    //                 <label className="full" title="{{ 'Fair - 2 stars' | translate }}" ></label>
    //                 <label className="half" title="{{ 'Fair - 1.5 stars' | translate }}" ></label>
    //                 <label className="full" title="{{ 'Bad - 1 star' | translate }}" ></label>
    //                 <label className="half" title="{{ 'Bad - 0.5 stars' | translate }}" ></label>
    //             </div>
                {/* <div className="ratilike ng-binding">5</div> */}
    //         </div>
    //         <div className="order-time">19, january 2020  - 12:00 PM</div>
    //     </div>
    //     <div className="order-btn-b">
    //         <button className="btn-view-profile">View Profile</button>
    //         <div className="btn-price-serv">$600</div>
    //     </div>
    // </div>
    // </div>
    // <div className="col-md-6">
    // <div className="order-card d-flex align-items-center justify-content-between">
    //     <div className="order-des-b">
    //         <div className="title">Ekstrom Bothman</div>
    //         <div className="service-label">House Cleaner</div>
    //         <div className="star-rating-area d-flex align-items-center justify-content-start">
    //             <div className="rating-static clearfix mr-3" rel="4">
    //                 <label className="full" title="{{ 'Awesome - 5 stars' | translate }}" ></label>
    //                 <label className="half" title="{{ 'Excellent - 4.5 stars' | translate }}" ></label>
    //                 <label className="full" title="{{ 'Excellent - 4 stars' | translate }}" ></label>
    //                 <label className="half" title="{{ 'Better - 3.5 stars' | translate }}" ></label>
    //                 <label className="full" title="{{ 'Good - 3 stars' | translate }}" ></label>
    //                 <label className="half" title="{{ 'Good - 2.5 stars' | translate }}" ></label>
    //                 <label className="full" title="{{ 'Fair - 2 stars' | translate }}" ></label>
    //                 <label className="half" title="{{ 'Fair - 1.5 stars' | translate }}" ></label>
    //                 <label className="full" title="{{ 'Bad - 1 star' | translate }}" ></label>
    //                 <label className="half" title="{{ 'Bad - 0.5 stars' | translate }}" ></label>
    //             </div>
                {/* <div className="ratilike ng-binding">5</div> */}
    //         </div>
    //         <div className="order-time">19, january 2020  - 12:00 PM</div>
    //     </div>
    //     <div className="order-btn-b">
    //         <button className="btn-view-profile">View Profile</button>
    //         <div className="btn-price-serv">$600</div>
    //     </div>
    // </div>
// </div>
