import React, { useEffect } from "react";
import { Moving } from "./Moving";

const MovingRequest = ({
    moving,
    getVehicleTypes,
    vehicleTypes,
    handleSelectTypeClick,
    subServiceId,
}) => {
    console.log("====================================");
    console.log(moving);
    console.log("====================================");
    useEffect(() => {
        getVehicleTypes();
    }, []);
    return (
        <>
            <div className="moving-new-secion">
                <div className="new-imag-moving text-center">
                    <img
                        src={
                            moving?.step == 0
                                ? "/assets/img/moving-image-.png"
                                : `/assets/img/new-moving.svg`
                        }
                        className="img-fluid"
                        alt=""
                    />
                </div>
            </div>
            {moving?.step == 0 && (
                <>
                    <div className="col-md-12">
                        <div className="title-move mb-5">
                            Please select your vehicle type.
                        </div>
                    </div>
                    <div className="col-md-6 mx-auto">
                        <div className="row">
                            {(() => {
                                return vehicleTypes?.data?.map(
                                    (item, index) => (
                                        <div
                                            className="col-6 col-md-3"
                                            key={index}
                                        >
                                            <div
                                                className="d-flex bd-highlight mb-5 justify-content-center align-items-center"
                                                style={{
                                                    width: "100%",
                                                    height: "17rem",
                                                    boxShadow: `.2rem .2rem .6rem .8rem ${
                                                        item.id ===
                                                        moving?.vehicle_type_id
                                                            ? "#fea629"
                                                            : "#cccccc"
                                                    }`,
                                                    borderRadius: ".5rem",
                                                }}
                                                onClick={() => {
                                                    handleSelectTypeClick(
                                                        item.id
                                                    );
                                                }}
                                            >
                                                <div
                                                    className="d-flex flex-column justify-content-end align-items-center flex-column m-3 moving-vehiclei-box"
                                                    style={{ fontSize: 15 }}
                                                >
                                                    {item.image ? (
                                                        <img
                                                            src={
                                                                process.env
                                                                    .REACT_APP_API_BASE_URL +
                                                                item.image
                                                            }
                                                            className="img-fluid m-1"
                                                            alt="..."
                                                        />
                                                    ) : (
                                                        <i
                                                            className="fa fa-car fa-5x"
                                                            aria-hidden="true"
                                                        ></i>
                                                    )}
                                                    <div className="vehicle-title mt-3">
                                                        {item.title}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                );
                            })()}
                        </div>
                    </div>
                </>
            )}
            {moving?.step == 1 && (
                <div className="container col-md-12 moving-push-top">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row justify-content-center">
                                <div
                                    className="col-lg-6 p-5"
                                    style={{
                                        background: "#fff",
                                        boxShadow:
                                            "rgb(204, 204, 204) 0.01rem 0.01rem 0.5rem 0.5rem",
                                        borderRadius: "0.5rem",
                                        minHeight: "50vh",
                                    }}
                                >
                                    <Moving
                                        vehicle_type_id={
                                            moving?.vehicle_type_id
                                        }
                                        subServiceId={subServiceId}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-12 mt-5">
                            <div className="row justify-content-center">
                                <div
                                    className="col-lg-5 p-5"
                                    style={{
                                        background: "#fff",
                                        boxShadow:
                                            "rgb(204, 204, 204) 0.01rem 0.01rem 0.5rem 0.5rem",
                                        borderRadius: "0.5rem",
                                        minHeight: "50vh",
                                    }}
                                >
                                    <>
                                        <div className="title-move mb-5">
                                            please select your moving location.
                                        </div>
                                        <div className="mb-3">
                                            <div
                                                className="col-md-12 px-0 text-dark"
                                                style={{
                                                    fontSize: "2rem",
                                                }}
                                            >
                                                Moving From
                                                <strong className="text-danger">
                                                    *
                                                </strong>
                                            </div>
                                            <div className="common-input p-1">
                                                <div>
                                                    <input
                                                        type="text"
                                                        autoComplete="off"
                                                        role="combobox"
                                                        aria-autocomplete="list"
                                                        aria-expanded="false"
                                                        placeholder="From ..."
                                                        className="location-search-input m-1"
                                                        value=""
                                                    />
                                                    <div className="autocomplete-dropdown-container"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <div
                                                className="col-md-12 px-0 text-dark"
                                                style={{
                                                    fontSize: "2rem",
                                                }}
                                            >
                                                Moving To
                                                <strong className="text-danger">
                                                    *
                                                </strong>
                                            </div>
                                            <div className="common-input pr-1">
                                                <div>
                                                    <input
                                                        type="text"
                                                        autoComplete="off"
                                                        role="combobox"
                                                        aria-autocomplete="list"
                                                        aria-expanded="false"
                                                        placeholder="To ..."
                                                        className="location-search-input m-1"
                                                        value=""
                                                    />
                                                    <div className="autocomplete-dropdown-container"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <div
                                                className="col-md-12 px-0 text-dark"
                                                style={{
                                                    fontSize: "2rem",
                                                }}
                                            >
                                                Moving Date
                                                <strong className="text-danger">
                                                    *
                                                </strong>
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
                                                    value="2022-02-10"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <div
                                                className="col-md-12 px-0 text-dark"
                                                style={{
                                                    fontSize: "2rem",
                                                }}
                                            >
                                                Zip Code
                                                <strong className="text-danger">
                                                    *
                                                </strong>
                                            </div>
                                            <div className="common-input pr-1">
                                                <input
                                                    disabled=""
                                                    type="text"
                                                    name="zip_code"
                                                    placeholder="Zip Code e.g 00000"
                                                    value=""
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12 text-danger"></div>
                                        <div className="text-center">
                                            <button
                                                disabled=""
                                                type="button"
                                                className="button-common mt-4 w-100"
                                            >
                                                Get Providers
                                            </button>
                                        </div>
                                    </>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            )}
        </>
    );
};

export { MovingRequest };
