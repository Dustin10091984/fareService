import { useState, useEffect, Fragment } from "react";
const Service = ({
    headerMenu,
    getServiceQuestion,
    serviceData,
    service,
    handleZipCodeChange,
    handleSelectZipCode,
    handleChangeQuestion,
    handleCountryCityChange,
    getProviders,
    getCountriesList,
    countriesData,
    cityCountry,
    ...props
}) => {
    const {
        match: {
            params: { subServiceId },
        },
    } = props;

    const [state, setState] = useState({
        errors: {
            notFound: "",
        },
    });
    const [zipCodes, setZipCodes] = useState();
    const [zipCodesList, setZipCodesList] = useState();

    useEffect(() => {
        getCountriesList({ sub_service_id: subServiceId });
    }, []);

    useEffect(() => {
        if (subServiceId && serviceData?.data?.id != subServiceId) {
            getServiceQuestion(subServiceId);
        }
    }, [subServiceId]);

    useEffect(() => {
        if (cityCountry?.city) {
            setZipCodes(
                countriesData?.data
                    ?.find(
                        (countryData) => countryData.id == cityCountry?.country
                    )
                    ?.cities?.find((cities) => cities.id == cityCountry?.city)
                    ?.zip_codes
            );
        }
    }, [cityCountry?.city]);

    useEffect(() => {
        setZipCodesList();
    }, [cityCountry?.city, cityCountry?.country]);

    const handleSearchZipCode = ({ target }) => {
        const data = zipCodes.filter(({ code }) => code.includes(target.value));
        setZipCodesList(data);
        setState((prevState) => ({
            ...prevState,
            errors: {
                ...prevState.errors,
                notFound: data.length ? "" : "No zip code found",
            },
        }));
    };

    return (
        <div
            className="moving-search-box house-cleaning-sec"
            id={"services-section"}
        >
            {serviceData?.loading && (
                <div className="service-loading">
                    <i className="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
                    <span className="sr-only">Loading...</span>
                </div>
            )}
            {!serviceData?.loading && serviceData?.error && (
                <div className="service-loading-error">
                    <i
                        className="fa fa-exclamation-triangle fa-4x fa-fw error-color"
                        aria-hidden="true"
                    ></i>
                    <span className="error-color">
                        {" "}
                        {serviceData?.message == "Not Found"
                            ? "This service is not available at the moment."
                            : serviceData?.message}
                    </span>
                </div>
            )}
            {serviceData?.data && (
                <>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            getProviders();
                        }}
                    >
                        <div className="title-move mb-5">
                            {serviceData?.data?.name}
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="m-search-left-box w-100">
                                <div className="qust-inputs-box">
                                    {serviceData?.data?.questions.map(
                                        (questionData, index, questionsData) =>
                                            index % 2 === 0 && (
                                                <Fragment key={index}>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="common-input mb-4 mx-3">
                                                            <select
                                                                name={`question_${questionData.id}`}
                                                                // data-question={`question_${questionData.id}`}
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const {
                                                                        name,
                                                                        value,
                                                                    } =
                                                                        e.target;
                                                                    handleChangeQuestion(
                                                                        {
                                                                            name,
                                                                            value,
                                                                        }
                                                                    );
                                                                }}
                                                                defaultValue={
                                                                    service
                                                                        .selected[
                                                                        `question_${questionData.id}`
                                                                    ]
                                                                }
                                                                required
                                                            >
                                                                <option
                                                                    // disabled={true}
                                                                    defaultValue=""
                                                                    value=""
                                                                >
                                                                    {
                                                                        questionData.question
                                                                    }
                                                                </option>
                                                                {questionData?.options.map(
                                                                    (
                                                                        optionData,
                                                                        index
                                                                    ) => (
                                                                        <Fragment
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <option
                                                                                value={
                                                                                    optionData?.id
                                                                                }
                                                                            >
                                                                                {
                                                                                    optionData?.option
                                                                                }
                                                                            </option>
                                                                        </Fragment>
                                                                    )
                                                                )}
                                                            </select>
                                                        </div>
                                                        {questionsData[
                                                            index + 1
                                                        ] && (
                                                            <div className="common-input mb-4 mx-3">
                                                                <select
                                                                    name={`question_${
                                                                        questionsData[
                                                                            index +
                                                                                1
                                                                        ]?.id
                                                                    }`}
                                                                    // data-question={`question_${questionData.id}`}
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        const {
                                                                            name,
                                                                            value,
                                                                        } =
                                                                            e.target;
                                                                        handleChangeQuestion(
                                                                            {
                                                                                name,
                                                                                value,
                                                                            }
                                                                        );
                                                                    }}
                                                                    defaultValue={
                                                                        service
                                                                            .selected[
                                                                            `question_${
                                                                                questionsData[
                                                                                    index +
                                                                                        1
                                                                                ]
                                                                                    .id
                                                                            }`
                                                                        ]
                                                                    }
                                                                    required
                                                                >
                                                                    <option
                                                                        // disabled={true}
                                                                        defaultValue=""
                                                                        value=""
                                                                    >
                                                                        {
                                                                            questionsData[
                                                                                index +
                                                                                    1
                                                                            ]
                                                                                ?.question
                                                                        }
                                                                    </option>
                                                                    {questionsData[
                                                                        index +
                                                                            1
                                                                    ]?.options.map(
                                                                        (
                                                                            optionData,
                                                                            index
                                                                        ) => (
                                                                            <Fragment
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                <option
                                                                                    value={
                                                                                        optionData?.id
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        optionData?.option
                                                                                    }
                                                                                </option>
                                                                            </Fragment>
                                                                        )
                                                                    )}
                                                                </select>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Fragment>
                                            )
                                    )}
                                </div>
                                <hr />
                                <h4 className="mx-3 my-1">
                                    Choose service area
                                </h4>
                                <div className="d-flex justify-content-between">
                                    <div className="common-input my-2 mx-3">
                                        <select
                                            name="country"
                                            value={cityCountry?.country}
                                            onChange={(e) => {
                                                handleCountryCityChange(e);
                                            }}
                                        >
                                            <option defaultValue="">
                                                Select Country
                                            </option>
                                            {countriesData?.data?.map(
                                                (countryData, index) => (
                                                    <Fragment key={index}>
                                                        <option
                                                            value={
                                                                countryData.id
                                                            }
                                                        >
                                                            {countryData.name}
                                                        </option>
                                                    </Fragment>
                                                )
                                            )}
                                        </select>
                                    </div>
                                    <div className="common-input my-2 mx-3">
                                        <select
                                            name="city"
                                            disabled={!cityCountry?.country}
                                            value={cityCountry?.city}
                                            onChange={(e) => {
                                                handleCountryCityChange(e);
                                            }}
                                        >
                                            <option defaultValue="">
                                                Select City
                                            </option>
                                            {(() => {
                                                const countryData =
                                                    countriesData?.data?.find(
                                                        (countryData) =>
                                                            countryData.id ==
                                                            cityCountry?.country
                                                    );
                                                return countryData?.cities?.map(
                                                    (cityData, index) => (
                                                        <Fragment key={index}>
                                                            <option
                                                                value={
                                                                    cityData.id
                                                                }
                                                            >
                                                                {cityData.name}
                                                            </option>
                                                        </Fragment>
                                                    )
                                                );
                                            })()}
                                        </select>
                                    </div>
                                </div>
                                <div
                                    className="col-md-12 text-dark mb-2"
                                    style={{ fontSize: "1.5rem" }}
                                >
                                    Zip code
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="common-input mb-2 mx-3">
                                        <input
                                            disabled={!cityCountry?.city}
                                            type="text"
                                            onChange={(e) => {
                                                handleZipCodeChange(e);
                                                handleSearchZipCode(e);
                                            }}
                                            // onClick={(e) => {
                                            //     handleSearchZipCode(e);
                                            // }}
                                            name="zipCode"
                                            value={service?.zipCode}
                                            placeholder="Zip Code"
                                        />
                                    </div>
                                </div>
                                {/* <div className=""> */}
                                {!!zipCodesList?.length ? (
                                    service?.selectedZipCode == false && (
                                        <>
                                            <center
                                                className="col-md-12 text-dark mb-1 mt-1"
                                                style={{
                                                    fontSize: "1.5rem",
                                                }}
                                            >
                                                Please Select ZipCode
                                            </center>
                                            {zipCodesList?.map(
                                                (data, index) => (
                                                    <div
                                                        key={index}
                                                        className="text-dark mb-1 mx-3 mt-1 p-1"
                                                        style={{
                                                            fontSize: "1.5rem",
                                                            border: "1px solid #F1F2F7",
                                                            backgroundColor:
                                                                "#F1F2F7",
                                                            borderRadius: "5px",
                                                            cursor: "pointer",
                                                        }}
                                                        data-code={data?.code}
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
                                    )
                                ) : (
                                    <></>
                                )}
                                <strong className="col-md-12 text-danger">
                                    {state?.errors?.notFound}
                                </strong>
                                {/* {service?.zipCodeErr} */}
                                {/* </div> */}
                            </div>
                        </div>
                        <div className="text-center mt-0 mx-3">
                            <button
                                type="submit"
                                className="button-common mt-5 w-100"
                                disabled={(() => {
                                    let isDisabled = false;
                                    serviceData?.data?.questions.filter(
                                        (question) => {
                                            if (
                                                service.selected[
                                                    `question_${question.id}`
                                                ] === "" ||
                                                service.selected[
                                                    `question_${question.id}`
                                                ] === undefined
                                            ) {
                                                isDisabled = true;
                                                return true;
                                            }
                                            return false;
                                        }
                                    );
                                    if (
                                        service.zipCode === "" ||
                                        service?.selectedZipCode == false
                                    ) {
                                        isDisabled = true;
                                    }

                                    return isDisabled;
                                })()}
                            >
                                Get Providers
                            </button>
                        </div>
                    </form>
                    <div className="moving-des mt-5">
                        {serviceData?.data?.service_requests.length > 0 && (
                            <>
                                <div className="title">We recommend you!</div>
                                <ul className="time-list d-flex align-items-center justify-content-between flex-wrap recommend-times">
                                    {serviceData?.data?.service_requests?.map(
                                        (service, index) => (
                                            <li
                                                key={index}
                                                className="d-flex align-items-center justify-content-center"
                                            >
                                                {service?.hours} hours
                                            </li>
                                        )
                                    )}
                                    {/* <li className="d-flex align-items-center justify-content-center">
                                        4 Hours
                                    </li>
                                    <li className="d-flex align-items-center justify-content-center">
                                        6 Hours
                                    </li>
                                    <li className="d-flex align-items-center justify-content-center">
                                        8 Hours
                                    </li>
                                    <li className="d-flex align-items-center justify-content-center">
                                        10 Hours
                                    </li>
                                    <li className="d-flex align-items-center justify-content-center">
                                        2 Hours
                                    </li>} */}
                                </ul>
                            </>
                        )}
                        <p className="text-center">
                            {serviceData?.data?.terms}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export { Service };
