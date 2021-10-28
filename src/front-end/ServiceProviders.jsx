import React, { useState, useEffect } from 'react';
import { Product } from './common/product';
import { useDispatch, useSelector } from 'react-redux';
import { getProviderList } from '../store/Slices/providers/providerListSclice';
import { getProviderSchedule } from '../store/Slices/providers/providerScheduleSclice';
import { postRequestService } from '../store/Slices/services/RequestServiceSclice';
import { getInitialRequestService } from '../store/Slices/services/RequestServiceSclice';
import { Link } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const ServiceProviders = (props) =>{

    const [state, setState] = useState({
        is_loggedin : false,
        loggedinErr: '',
        selectedSlot : '',
        is_hourly : '',
        hours : '',
        address : '',
        addressErr : '',
        questionsErr : '',
        submitting : false,
        error : '',
        serviceRequest: ''
    });
    const [value, setValue] = useState(new Date());

    const dispatch = useDispatch();

    const providerList = useSelector((state) => state.provider);
    const providerSchedule = useSelector((state) => state.providerSchedule);
    // const serviceRequest = useSelector((state) => state.serviceRequest);
    
    useEffect(() => {
        if(localStorage.getItem('userToken')){
            setState((state)=> ({
                ...state, is_loggedin : true
            }));
        }
        dispatch(getProviderList(props.location.search));
    }, [props.location.search])

    useEffect(() => {
        if (providerList !== undefined && !providerList.length) {
            setState(state => ({
                ...state,
                providerList: providerList
            }));
        }
        if (providerSchedule !== undefined && !providerSchedule.length) {
            setState(state => ({
                ...state,
                providerSchedule: providerSchedule
            }));
            handleCalendarClick(new Date());
        }
        // if(serviceRequest !== undefined && serviceRequest !== null){
        //     setState(state => ({
        //         ...state,
        //         serviceRequest: serviceRequest,
        //         submitting: false
        //     }));
        // }
    }, [
        providerList,
        providerSchedule,
        // serviceRequest
    ]);

    function handleContinueClick(event, type) {
        const {value} = event.target
        if(state.is_loggedin) {
            if(props.location.state !== undefined){
                setState(state => ({...state, is_hourly: type, provider_id:value}))
                dispatch(getProviderSchedule(value));
            } else {
                setState(state => ({
                    ...state, error: <center className="col-md-12 alert alert-danger" role="alert" style={{ fontSize: 15 }}>please select category from header</center>}))
            }
        } else {
            setState(state => ({
                ...state, error: <center className="col-md-12 alert alert-primary" role="alert" style={{fontSize: 15}}>please login</center>
            }))
        }
    }

    const handleCalendarClick = (selectedDate) => {
        let date = new Date();
        
        if (new Date(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`) <= new Date(`${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}`)){
            setValue(selectedDate);
            let timeSlots = providerSchedule?.data?.data.filter((slot) =>
                +slot.provider_schedule.year === selectedDate.getFullYear() && +slot.provider_schedule.month === selectedDate.getMonth() + 1 && +slot.provider_schedule.date === selectedDate.getDate()
            );
            if (timeSlots){ 
                setState((state) => ({ ...state, timeSlots: timeSlots }));
            } else {
                setState((state) => ({ ...state, timeSlots: undefined }));
            }
        }
    }


    const handleHoursClick = (e) => {
        const { value } = e.target;
        setState((state) => ({ ...state, hours: value }));
    }

    const handleSlotClick = (e) => {
        const { value } = e.target;
        
        setState((state) => ({ ...state, selectedSlot : state.selectedSlot == value ? '' : value }));
        
        // if (!selectedSlot.includes(value)){
            //     selectedSlot.push(value);
            //     setState((state) => ({ ...state, selectedSlot }));
        // } else {
        //     selectedSlot = selectedSlot.filter((selected)=> selected !== value);
        //     setState((state) => ({ ...state, selectedSlot }));
        // }
    }

    const handleAddressChange = (e) => {
       const {name, value} = e.target;
        if (value.length <= 20 || value.length >= 100 ){
            setState((state) => ({ ...state, [name]: value }));
            setState((state) => ({ ...state, addressErr: <div className='col-md-12 text-danger mt-2' style={{ fontSize: 15 }}>Address's character should be in between 20 or 100</div> }));
        } else {
            setState((state) => ({ ...state, [name]: value }));
            setState((state) => ({ ...state, addressErr: '' }));
        }
    }

    const handleAddPaymentClick = (e) => {
        e.preventDefault();
        const {selectedSlot, address, hours, is_hourly, provider_id} = state;
        if (props.location.state !== undefined){
            setState((state) => ({ ...state, submitting: true }));
            props.history.push({
                pathname: '/payment',
                state: { slots: [selectedSlot], is_hourly : is_hourly, hours: hours != '' ?  hours : 1, address, questions: props.location.state, token: '', provider_id }
            });
            // dispatch(postRequestService({ slots: selectedSlot, hours: hours , address, questions: props.location.state }));
        }
        //  else {
        //     setState((state) => ({ ...state, questionsErr:  }));
        // }
    }

    const handleCloseModalClick = () => {
        setState((state) => ({ ...state, is_hourly : '',selectedSlot: '', address: '', hours : '', token: '' }));
        dispatch(getInitialRequestService());
    } 


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
                            <div className="col-md-4" style={{zIndex : 0}}>
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

                                        <div className="title-servic px-2 mt-4">How often</div>
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
                            {state.error}{state.loggedinErr}
                            {providerList !== undefined && providerList !== null && providerList.error !== undefined && providerList.error === false && providerList?.data?.data ? providerList.data.data.map((provider,index)=>{
                                return(
                                    <div key={index} className="job-provider-card">
                                        <div className="user-des d-flex align-items-center justify-content-start w-100">
                                            <div className="user-img d-flex align-items-center justify-content-center">
                                                <img src={`${process.env.REACT_APP_Media_BASE_URL}${provider.image}`} className="img-fluid" alt="Not Found" />
                                            </div>
                                            <div className="user-detail w-100">
                                                <div className=" w-100 d-flex align-items-center justify-content-between">
                                                    <div className="title">{provider.first_name} {provider.last_name}</div>
                                                    <Link to={`/profile/${provider.id}`} className="button-common">View Profile</Link>
                                                </div>
                                                <div className="job-status">{provider.provider_service_requests_count} Jobs Completed</div>
                                                <div className="stars-rating w-100  d-flex align-items-center justify-content-between">
                                                    <div className="star-rating-area">
                                                        <div className="rating-static clearfix mr-3" rel={provider?.rating}>
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
                                                    {
                                                        
                                                        props.location.state !== undefined && state.is_loggedin === true ? (
                                                            <button onClick={(event)=>handleContinueClick(event, provider.account_type === 'BASIC' ? true :  false)} value={provider.id} type="button"
                                                            data-backdrop="static"
                                                            data-keyboard="false" 
                                                            className="button-common-2" 
                                                            data-toggle="modal" 
                                                            data-target={provider.account_type === 'BASIC' ? "#hourly" : "#quotation"}
                                                            >
                                                                {provider.account_type === 'BASIC' ? "Make a Request" : "Get a Qoutation"}
                                                        </button>
                                                        ) : (
                                                            <button type="button" className="button-common-2" onClick={(event)=>handleContinueClick(event, provider.account_type === 'BASIC' ? true :  false)}>{provider.account_type === 'BASIC' ? "Make a Request" : "Get a Qoutation"}</button>
                                                        )
                                                    }
                                                </div>
                                                <div className="user-price">{`$${provider.provider_profile.hourly_rate}`}</div>
                                            </div>
                                        </div>
                                        {
                                            provider.bio !== undefined && provider?.user_feedbacks[0] !== undefined && <hr />
                                        }
                                        {
                                            provider.bio && (
                                                <div className="useer-qust">
                                                    <div className="title">How can i help ?</div>
                                                    <div className="des">{provider.bio}</div>
                                                </div>
                                            ) 
                                        }
                                        <>
                                        {
                                            (()=>{
                                                if (provider?.user_feedbacks[0] !== undefined){
                                                    return <div className="top-reviews-list">
                                                        <div className="review-title">Top Review</div>
                                                        <div className="review-item d-flex align-itmes-centetr justifu-content-between">
                                                            <div className="review-img">
                                                                <img src={process.env.REACT_APP_Media_BASE_URL + provider?.user_feedbacks[0]?.user?.image} className="img-fluid" alt="Not have" />
                                                            </div>
                                                            {
                                                                provider?.user_feedbacks[0] && <div className="review-detail">
                                                                    {provider?.user_feedbacks[0].comment}
                                                                </div>
                                                            }
                                                            
                                                        </div>
                                                    </div>
                                                }
                                            })()
                                        }
                                        </>
                                    </div>
                                )
                            }) : providerList.error === true ? (
                            <>
                                        <div className="text-center display-4">{providerList.message}</div>
                            </>) : (
                                <div className="text-center display-4">Please Wait we are working on it . . .</div>
                            )}
                            </div>
                        </div>
                    </div>
                </section>

            <div className="modal fade bd-example-modal-lg" id="hourly" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title display-4" id="exampleModalLongTitle">Service Request</h5>
                            {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button> */}
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <center className="col-12">
                                    {state.questionsErr}
                                </center>
                                {/* {state.serviceRequest !== undefined && state.serviceRequest.error === true ? (
                                    <center className="col-12 ">
                                        <div className="col-12  alert alert-danger" role="alert" style={{fontSize: 15}}>
                                            {state.serviceRequest.message}
                                        </div>
                                    </center>
                                ) : (
                                    ''
                                )}
                                {state.serviceRequest !== undefined && state.serviceRequest.error === false ? (
                                    <center className="col-12 ">
                                        <div className="col-12  alert alert-success" role="alert" style={{ fontSize: 15 }}>
                                            {state.serviceRequest.message}
                                        </div>
                                    </center>
                                ) : (
                                    ''
                                )} */}
                            </div>
                            <div className="row">
                                <div className="col-md-6 align-items-center justify-content-center">
                                    <div style={{ marginLeft: 25 }}>
                                        <Calendar
                                            onChange={handleCalendarClick}
                                            value={value}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 justify-center" style={{ marginLeft: -20 }}>
                                    <div className="common-input ml-3 w-auto">
                                        <select className="hours" id="" onChange={handleHoursClick}>
                                            <option defaultValue>please select hours</option>
                                            {[...Array(12).keys()].map((index)=>(
                                                <option 
                                                    key={index+1}
                                                    value={index+1}
                                                >
                                                    {`${index+1} hours`}
                                                </option>
                                                ))}
                                        </select> 
                                    </div>
                                    <ul className="time-list d-flex align-items-center justify-content-center flex-wrap s">
                                        <li style={{ backgroundColor: "#2F88E7", color: 'white' }}  className="d-flex align-items-center justify-content-center col-8 m-4"> Available time Slots</li>
                                        {/* {slots.map((time, index) =>{
                                            let slot = state?.timeSlots?.find((slot) => slot.start === time || slot.end === time);
                                            return(
                                                <React.Fragment key={index}>
                                                    {slot ? (
                                                        <li style={{backgroundColor: "#2F88E7", color: 'white'}} onClick={handleSlotClick} slot-id={slot.id} value={time} className="d-flex align-items-center justify-content-center">{time}</li>
                                                        ) : (
                                                        <li style={{color: 'black'}} value={time} className="d-flex align-items-center justify-content-center">{time}</li>
                                                    )}
                                                </React.Fragment>

                                            )}
                                        )} */}
                                            {state !== undefined && state.timeSlots !== undefined ? state.timeSlots.map((slot, index) =>{ 
                                                return(
                                                    <React.Fragment key={index}>
                                                        {state.selectedSlot == slot.id ? (
                                                            <li key={index} style={{ backgroundColor:"#2F88E7", color: 'white' }} onClick={handleSlotClick} value={slot.id} className="d-flex align-items-center justify-content-center m-2 col-5">{slot.start + " - " + slot.end}</li>
                                                        ):(
                                                            <li key={index} style={{ color: 'black' }} onClick={handleSlotClick} value={slot.id} className="d-flex align-items-center justify-content-center m-2 col-5">{slot.start + " - " + slot.end}</li>
                                                        )}
                                                    </React.Fragment>
                                                )
                                            }): (
                                                <center className="col-12 text-dark" style={{ fontSize: 20 }}>Not Available</center>
                                            )}
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 p-5">
                                    <div className='col-md-12 text-dark mb-2' style={{fontSize: 20}}>Address</div>
                                    <div className="common-input">
                                        <input type="text" onChange={handleAddressChange} name="address" value={state.address} placeholder="Address" />
                                    </div>
                                    {state.addressErr}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="button-common" onClick={handleCloseModalClick} data-dismiss="modal">Close</button>
                            <button data-dismiss="modal" disabled={!state.selectedSlot || state.addressErr !== '' || state.address === '' || state.submitting === true ? true : false} onClick={handleAddPaymentClick} type="button" className="button-common-2">Add payment detail</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="modal fade bd-example-modal-md" id="quotation" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title display-4" id="exampleModalLongTitle">Service Request</h5>
                            {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button> */}
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <center className="col-12">
                                    {state.questionsErr}
                                </center>
                                {state.serviceRequest !== undefined && state.serviceRequest.error === true ? (
                                    <center className="col-12 ">
                                        <div className="col-12  alert alert-danger" role="alert" style={{fontSize: 15}}>
                                            {state.serviceRequest.message}
                                        </div>
                                    </center>
                                ) : (
                                    ''
                                )}
                                {state.serviceRequest !== undefined && state.serviceRequest.error === false ? (
                                    <center className="col-12 ">
                                        <div className="col-12  alert alert-success" role="alert" style={{ fontSize: 15 }}>
                                            {state.serviceRequest.message}
                                        </div>
                                    </center>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="row">
                                <div className="col-md-6 align-items-center justify-content-center">
                                    <div style={{ marginLeft: 25 }}>
                                        <Calendar
                                            onChange={handleCalendarClick}
                                            value={value}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 justify-center" style={{ marginLeft: -20 }}>
                                    <ul className="time-list d-flex align-items-center justify-content-center flex-wrap s">
                                        <li style={{ backgroundColor: "#2F88E7", color: 'white' }}  className="d-flex align-items-center justify-content-center col-8 m-4"> Available time Slots</li>
                                        {/* {slots.map((time, index) =>{
                                            let slot = state?.timeSlots?.find((slot) => slot.start === time || slot.end === time);
                                            return(
                                                <React.Fragment key={index}>
                                                    {slot ? (
                                                        <li style={{backgroundColor: "#2F88E7", color: 'white'}} onClick={handleSlotClick} slot-id={slot.id} value={time} className="d-flex align-items-center justify-content-center">{time}</li>
                                                        ) : (
                                                        <li style={{color: 'black'}} value={time} className="d-flex align-items-center justify-content-center">{time}</li>
                                                    )}
                                                </React.Fragment>

                                            )}
                                        )} */}
                                            {/* {state !== undefined && state.timeSlots !== undefined ? state.timeSlots.map((slot, index) =>{ 
                                                return(
                                                    <React.Fragment key={index}>
                                                        {state.selectedSlot.includes(slot.id) ? (
                                                            <li key={index} style={{ backgroundColor:"#2F88E7", color: 'white' }} onClick={handleSlotClick} value={slot.id} className="d-flex align-items-center justify-content-center m-2 col-5">{slot.start + " - " + slot.end}</li>
                                                        ):(
                                                            <li key={index} style={{ color: 'black' }} onClick={handleSlotClick} value={slot.id} className="d-flex align-items-center justify-content-center m-2 col-5">{slot.start + " - " + slot.end}</li>
                                                        )}
                                                    </React.Fragment>
                                                )
                                            }): (
                                                <center className="col-12 text-dark" style={{ fontSize: 20 }}>Not Available</center>
                                            )} */}
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 p-5">
                                    <div className='col-md-12 text-dark mb-2' style={{fontSize: 20}}>Address</div>
                                    <div className="common-input">
                                        <input type="text" onChange={handleAddressChange} name="address" value={state.address} placeholder="Address" />
                                    </div>
                                    {state.addressErr}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="button-common" onClick={handleCloseModalClick} data-dismiss="modal">Close</button>
                            <button disabled={!state.selectedSlot.length || state.addressErr !== '' || state.address === '' || state.submitting === true ? true : false} onClick={handleAddPaymentClick} type="button" className="button-common-2">Create Request</button>
                        </div>
                    </div>
                </div>
            </div>

            </>
        )
}


    // <div className="job-provider-card">
    //                                 <div className="user-des d-flex align-items-center justify-content-start w-100">
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
