import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getServiceQuestion } from "../../store/Slices/services/ServiceSclice";
import axios from "axios";
import Loading from "./Loading";
import { HOST } from "../../constants";

export const Question = (props) => {
    const { serviceId, subServiceId } = props;
    const [state, setState] = useState({
        question: [],
        currentStep: 0,
        error: "",
        zipCode: "",
        zipCodeErr: "",
        zipCodeData: "",
        zipCodeDataErr: "",
        selectedZipCode: false,
    });
    const [select, setSelect] = useState({});
    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getServiceQuestion(subServiceId));
    // }, []);

    useEffect(() => {
        dispatch(getServiceQuestion(subServiceId));
    }, [subServiceId]);

    const questionArray = useSelector((state) => state.service);

    useEffect(() => {
        if (
            questionArray &&
            questionArray !== undefined &&
            questionArray !== null
        ) {
            setState((state) => ({
                ...state,
                question: questionArray,
            }));
        }
    }, [questionArray, state.question]);
    const handleRadioChange = (e) => {
        setSelect((select) => ({
            ...select,
            [e.target.name]: parseInt(e.target.value),
        }));

        setState((state) => ({ ...state, error: "" }));
    };

    const handleBackClick = () => {
        if (state.question && state.question.data && state.currentStep > 0) {
            setState((state) => ({
                ...state,
                currentStep: state.currentStep - 1,
            }));
        }
    };

    const handleNextClick = (e) => {
        if (
            state.question &&
            state.question.data &&
            state.currentStep < state.question.data.questions.length - 1
        ) {
            if (
                select[
                    `question_${
                        state.question.data.questions[state.currentStep].id
                    }`
                ]
            ) {
                setState((state) => ({
                    ...state,
                    currentStep: state.currentStep + 1,
                    error: "",
                }));
            } else {
                setState((state) => ({
                    ...state,
                    error: (
                        <center
                            className="col-md-12 text-danger"
                            style={{ fontSize: 15 }}
                        >
                            {" "}
                            please seclect a option!
                        </center>
                    ),
                }));
            }
        } else if (
            state.question &&
            state.question.data &&
            state.currentStep === state.question.data.questions.length - 1
        ) {
            e.preventDefault();
            if (
                select[
                    `question_${
                        state.question.data.questions[state.currentStep].id
                    }`
                ]
            ) {
                setState((state) => ({
                    ...state,
                    currentStep: state.currentStep + 1,
                    error: "",
                }));
                // var queryString = Object.keys(select).map(key => key[9] + '=' + `${select[key]}`).join('&');
                props.history.push({
                    pathname: "/service-providers",
                    search: `?zipCode=${state.zipCode}&service=${serviceId}&subService=${subServiceId}`,
                    state: select,
                });
            } else {
                setState((state) => ({
                    ...state,
                    error: (
                        <center className="col-md-12 text-danger">
                            {" "}
                            please seclect a option!
                        </center>
                    ),
                }));
            }
        }
    };

    const handleZipCodeChange = (e) => {
        const { name, value } = e.target;
        // let re = /^(0|[1-9][0-9]*)$/;

        setState((state) => ({
            ...state,
            [name]: value,
            selectedZipCode: false,
        }));
        if (value.length < 1 || value.length > 12) {
            setState((state) => ({
                ...state,
                zipCodeErr: (
                    <div
                        className="col-md-12 text-danger mt-2"
                        style={{ fontSize: 15 }}
                    >
                        Zip Code characher(Number only) should be in between 2
                        and 12
                    </div>
                ),
            }));
        } else {
            setState((state) => ({ ...state, zipCodeErr: "" }));
            axios({
                method: "get",
                url:
                    HOST +
                    `/api/user/services/zip-code?zipCode=${value}&sub_service_id=${subServiceId}`,
            })
                .then(function (response) {
                    setState((state) => ({
                        ...state,
                        zipCodeData: response?.data?.data?.data,
                        zipCodeDataErr: "",
                    }));
                })
                .catch((error) => {
                    setState((state) => ({
                        ...state,
                        zipCodeData: "",
                        zipCodeDataErr: error?.response?.data?.message,
                    }));
                });
        }
    };

    const handleSelectZipCode = (code) => {
        setState((state) => ({
            ...state,
            zipCode: code,
            zipCodeErr: "",
            selectedZipCode: true,
        }));
    };
    return (
        <div className="row">
            <Loading loading={questionArray?.loading} />
            <div className="col-md-12">
                <div className="title-move mb-5">
                    {state.question && state?.question?.error === undefined ? (
                        <>{"Please wait"}</>
                    ) : state?.question?.error === false ? (
                        state?.question?.data?.name
                    ) : (
                        state?.question?.message
                    )}
                </div>
                {state?.question !== undefined &&
                state?.question?.error === undefined ? (
                    ""
                ) : state?.question?.error === false ? (
                    <>
                        <div className="question">
                            {state?.question && state?.question !== undefined
                                ? state?.question?.data &&
                                  state?.question?.data?.questions?.length
                                    ? `${
                                          state?.question?.data?.questions[
                                              state?.currentStep
                                          ].question
                                      }?`
                                    : ""
                                : ""}
                        </div>
                        <div className="row">
                            {state?.error}
                            {state?.question &&
                            state?.question !== undefined &&
                            state?.question?.data &&
                            state?.question?.data?.questions[state?.currentStep]
                                ?.options.length ? (
                                state?.question?.data?.questions[
                                    state.currentStep
                                ]?.options?.map((data, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="col-md-12 mt-3 ml-5"
                                        >
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input radio"
                                                    checked={
                                                        parseInt(
                                                            select[
                                                                "question_" +
                                                                    state
                                                                        .question
                                                                        .data
                                                                        .questions[
                                                                        state
                                                                            .currentStep
                                                                    ].id
                                                            ]
                                                        ) === data.id
                                                    }
                                                    defaultValue={data.id}
                                                    type="radio"
                                                    name={`question_${
                                                        state?.question?.data
                                                            ?.questions[
                                                            state?.currentStep
                                                        ].id
                                                    }`}
                                                    id={`radio${index}`}
                                                    onChange={handleRadioChange}
                                                />
                                                <label
                                                    className="form-check-label ml-4 option"
                                                    htmlFor={`radio${index}`}
                                                >
                                                    {data?.option}
                                                </label>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <center
                                    className="col-md-12 text-dark"
                                    style={{ fontSize: 30 }}
                                >
                                    {" "}
                                    something went wrong{" "}
                                </center>
                            )}
                            {state?.currentStep ===
                                state?.question?.data?.questions?.length -
                                    1 && (
                                <>
                                    <div
                                        className="col-md-12 text-dark mb-2 mt-3"
                                        style={{ fontSize: 20 }}
                                    >
                                        ZipCode
                                    </div>
                                    <div className="common-input">
                                        <input
                                            type="text"
                                            onChange={handleZipCodeChange}
                                            name="zipCode"
                                            value={state?.zipCode}
                                            placeholder="Address"
                                        />
                                    </div>
                                    {state?.zipCodeData !== "" &&
                                        state?.selectedZipCode == false && (
                                            <>
                                                <center
                                                    className="col-md-12 text-dark mb-1 mt-1"
                                                    style={{
                                                        fontSize: "1.5rem",
                                                    }}
                                                >
                                                    Please Select ZipCode
                                                </center>
                                                {state?.zipCodeData?.map(
                                                    (data, index) => (
                                                        <div
                                                            key={index}
                                                            className="col-md-12 text-dark mb-1 mt-1"
                                                            style={{
                                                                fontSize:
                                                                    "1.5rem",
                                                                border: "1px solid #F1F2F7",
                                                                backgroundColor:
                                                                    "#F1F2F7",
                                                                borderRadius:
                                                                    "5px",
                                                            }}
                                                            data-code={
                                                                data?.code
                                                            }
                                                            onClick={() =>
                                                                handleSelectZipCode(
                                                                    data?.code
                                                                )
                                                            }
                                                        >
                                                            {data?.code}
                                                        </div>
                                                    )
                                                )}
                                            </>
                                        )}
                                    <div className="col-md-12 text-danger">
                                        {state?.zipCodeDataErr}
                                    </div>
                                    {state?.zipCodeErr}
                                </>
                            )}
                        </div>
                        <div className="text-center mt-0">
                            {state?.currentStep === 0 ? (
                                <button
                                    disabled
                                    onClick={handleBackClick}
                                    className="button-common-2 float-left mt-5 w-25"
                                >
                                    Back
                                </button>
                            ) : (
                                <button
                                    onClick={handleBackClick}
                                    className="button-common-2 float-left mt-5 w-25"
                                >
                                    Back
                                </button>
                            )}

                            {state?.question?.data &&
                            state?.question?.data?.questions &&
                            state?.currentStep ===
                                state?.question?.data?.questions?.length - 1 ? (
                                <button
                                    onClick={handleNextClick}
                                    disabled={
                                        state?.zipCode === "" ||
                                        state?.zipCodeErr !== "" ||
                                        state?.selectedZipCode === false
                                    }
                                    className="button-common float-right mt-5 w-25"
                                >
                                    Search
                                </button>
                            ) : (
                                <button
                                    onClick={handleNextClick}
                                    className="button-common float-right mt-5 w-25"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};
