import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Calendar from "react-calendar";
import { MapLoadedApiContext } from "../../../helper/context";
import { classNames } from "../../../helper/class-name";
import AutoCompleteInput from "../../../components/AutoCompleteInput";
import { ReactSelect } from "../../../components/ReactSelect/ReactSelect";
import { Question } from "./Question";

const Message = ({ errorMessage, loading, notFound, zipCodeErr }) => {
    if (errorMessage)
        return <div className="text-danger mt-2 mb-2">{errorMessage}</div>;
    else if (loading)
        return <div className="text-dark mt-2 mb-2">Loading...</div>;
    else if (notFound)
        return <div className="text-danger mt-2 mb-2">{notFound}</div>;
    else if (zipCodeErr)
        return <div className="text-danger mt-2 mb-2">{zipCodeErr}</div>;
    else return null;
};

const Moving = (props) => {
    const {
        googleAddress,
        state,
        setState,
        vehicleTypes,
        closeRef,
        questions,
        questionsLoading,
        handleChangeZipCode,
        handleChangeQuestion,
        handleFromAdessSelect,
        handleToAdessSelect,
        handleSelectAddress,
        handleCalendarClick,
        subServiceId,
    } = props;

    return (
        <>
            <div className="title-move mb-5">
                please select your moving location.
            </div>
            {questionsLoading && (
                <div className="text-center">
                    <i className="fa fa-spinner fa-pulse rem-2" />
                </div>
            )}
            {questions && (
                <>
                    <Question
                        {...{
                            handleChangeQuestion,
                            questions,
                            service: state,
                        }}
                    />
                    <hr className="mb-3" />
                </>
            )}
            <div className="mb-1">
                <div className="col-md-12 px-0 text-dark rem-2">
                    Select Vehicle
                    <strong className="text-danger">*</strong>
                </div>
                <ReactSelect
                    {...{
                        name: "vehicle_type",
                        value: state?.vehicle_type_id,
                        onChange: (data) => {
                            setState((prevState) => ({
                                ...prevState,
                                vehicle_type_id: data,
                            }));
                        },
                        placeholder: "Select Vehicle",
                        options: vehicleTypes?.map((item) => ({
                            value: item.id,
                            label: item.title,
                        })),
                        withImage: true,
                    }}
                />
                <div className="col-md-12 px-0 text-dark rem-2">
                    Service Area
                    <strong className="text-danger">*</strong>
                </div>
                <div className="common-input pr-1 rem-1-5">
                    <input
                        type="text"
                        name="zip_code"
                        placeholder="Enter location"
                        value={state.address}
                        onChange={handleChangeZipCode}
                        autoComplete="off"
                    />
                    {!state?.selectedZipCode &&
                        googleAddress?.response?.map((address, index) => (
                            <div
                                className="text-dark mt-2 mb-2"
                                onClick={() => handleSelectAddress(address)}
                                role="button"
                                key={index}
                            >
                                {address.formatted_address}
                            </div>
                        ))}
                    <Message
                        {...{
                            errorMessage: googleAddress?.errorMessage,
                            loading: googleAddress?.loading,
                            notFound: state?.errors?.notFound,
                            zipCodeErr: state?.zipCodeErr,
                        }}
                    />
                </div>
            </div>
            <MapLoadedApiContext.Consumer>
                {(isLoading) =>
                    isLoading && (
                        <>
                            <div className="mb-3">
                                <div className="col-md-12 px-0 text-dark rem-2">
                                    Moving From
                                    <strong className="text-danger">*</strong>
                                </div>
                                <AutoCompleteInput
                                    {...{
                                        placeholder: "Enter address",
                                        value: state.from_address,
                                        handleOnChange: (from_address) =>
                                            setState((state) => ({
                                                ...state,
                                                from_address,
                                            })),
                                        handleOnSelect: handleFromAdessSelect,
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <div className="col-md-12 px-0 text-dark rem-2">
                                    Moving To
                                    <strong className="text-danger">*</strong>
                                </div>
                                <AutoCompleteInput
                                    {...{
                                        placeholder: "Enter address",
                                        value: state.to_address,
                                        handleOnChange: (to_address) =>
                                            setState((state) => ({
                                                ...state,
                                                to_address,
                                            })),
                                        handleOnSelect: handleToAdessSelect,
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <div className="col-md-12 px-0 text-dark rem-2">
                                    Moving Date
                                    <strong className="text-danger">*</strong>
                                </div>
                                <div
                                    className="common-input pr-1"
                                    data-backdrop="static"
                                    data-keyboard="false"
                                    data-toggle="modal"
                                    data-target="#date"
                                >
                                    <input
                                        type="text"
                                        placeholder="date e.g 2222-12-30"
                                        value={
                                            state.date
                                                ? moment(state.date).format(
                                                      "YYYY-MM-DD"
                                                  )
                                                : null
                                        }
                                        onChange={(e) =>
                                            setState((state) => ({
                                                ...state,
                                                date: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        </>
                    )
                }
            </MapLoadedApiContext.Consumer>
            <div className="text-center">
                {state.from_address !== "" &&
                state.to_address !== "" &&
                state.date !== "" &&
                (state.zip_code !== "" || state?.place_id) &&
                props?.vehicle_type_id !== "" &&
                state?.selectedZipCode ? (
                    <Link
                        type="button"
                        to={{
                            pathname: "/service-providers",
                            state: {
                                ...state,
                                sub_service_id: subServiceId,
                            },
                            search: `?subService=3`,
                        }}
                        className="button-common mt-4 w-100"
                    >
                        Get Providers
                    </Link>
                ) : (
                    <button
                        disabled
                        type="button"
                        className="button-common mt-4 w-100"
                    >
                        Get Providers
                    </button>
                )}
            </div>

            <div
                className="modal fade bd-example-modal-md"
                id="date"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered modal-md"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header rem-1-5">
                            <h4
                                className="modal-title mt-2"
                                id="exampleModalLongTitle"
                            >
                                Select Date
                            </h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                ref={closeRef}
                            >
                                <span
                                    aria-hidden="true"
                                    style={{
                                        fontSize: "3rem",
                                    }}
                                >
                                    &times;
                                </span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row m-2">
                                <div className="col-12">
                                    <center className="col-12">
                                        <div className="row justify-content-md-center rem-1-5">
                                            <Calendar
                                                onChange={handleCalendarClick}
                                                minDate={new Date()}
                                                value={state?.date}
                                            />
                                        </div>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export { Moving };
