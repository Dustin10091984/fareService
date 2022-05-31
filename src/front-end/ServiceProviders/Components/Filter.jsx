import React, { memo } from "react";
const Filter = memo(() => {
    console.log("Filter.jsx");
    return (
        <div className="col-md-4" style={{ zIndex: 0 }}>
            <div className="sticky-top">
                <div className="service-time-box">
                    <div className="date-ser mb-4">
                        <div className="title-servic px-2">Date</div>

                        <div className="time-list-pro">
                            <div className="mx-2 select-time">Today</div>
                            <div className="mx-2 select-time">
                                Within 3 days
                            </div>
                            <div className="mx-2 select-time">
                                Within a week
                            </div>
                            <div className="mx-2 select-time">Chose Dates</div>
                        </div>
                    </div>
                    <hr />
                    <div className="title-servic px-2 mt-4">Timing</div>
                    <ul className="time-list mt-4 d-flex align-items-center justify-content-between flex-wrap">
                        <li className="d-flex align-items-center justify-content-center">
                            Morning (8AM - 12PM)
                        </li>
                        <li className="d-flex align-items-center justify-content-center">
                            Afternoon (12PM - 5PM)
                        </li>
                        <li className="d-flex align-items-center justify-content-center">
                            Afternoon (12PM - 5PM)
                        </li>
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
                        <div className="mx-2 select-time">Weekly</div>
                        <div className="mx-2 select-time">Every 2 Weeks</div>
                        <div className="mx-2 select-time">Every 4 Weeks</div>
                        <div className="mx-2 select-time">Just Once</div>
                    </div>
                    <div className="ser-des">
                        Amet minim mollit non deserunt ullamco est sit aliqua
                        dolor do amet sint. Velit officia consequat duis enim
                        velit mollit. Exercitation veniam consequat sunt nostrud
                        amet.
                    </div>

                    <hr />

                    <ul className="time-list mt-4 d-flex align-items-start flex-column">
                        <li className="d-flex align-items-center justify-content-center">
                            Elite Tasker
                        </li>
                        <li className="d-flex align-items-center justify-content-center">
                            Great Value
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
});

export { Filter };
