import React, { useState, useEffect } from "react";

const Basic = ({ step, basic, handleStep, handleBasic }) => {
    const isError = (name) => (basic.error[name] ? basic.error[name] : null);
    return (
        <div className="login-from step-1">
            <div className="form-title mb-3">Set Up Your Business Profile.</div>
            <div className="form-term mb-2">
                How Whould you like customer to contact you?
            </div>

            <div className="form-group">
                <label htmlFor="name">Email</label>
                <strong className="text-danger">*</strong>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="john.doe@gmail.com"
                    onChange={handleBasic}
                />
                <div className="text-danger">{isError("email")}</div>
            </div>
            <div className="row">
                <div className="form-group col-12">
                    <label>Phone</label>
                    <strong className="text-danger">*</strong>
                    <div className="d-flex phone-input">
                        <select
                            className="js-example-basic-single form-control col-3"
                            name="code"
                            onChange={handleBasic}
                        >
                            <option value="+1">+1 </option>
                            <option defaultValue value="+92">
                                +92
                            </option>
                        </select>
                        <input
                            type="text"
                            name="phone"
                            className="form-control col-9"
                            placeholder="51112345"
                            onChange={handleBasic}
                        />
                    </div>
                    <div className="text-danger">{isError("phone")}</div>
                </div>
            </div>
            {/* <label className="custom-check">
                                        Enable text messages
                                        <input
                                            type="checkbox"
                                            checked="checked"
                                        />
                                        <span className="checkmark"></span>
                                    </label> */}
            {/* <div className="form-term mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                facere suscipit earum voluptatibus doloremque quia?
            </div> */}
            <div className="form-group">
                <label htmlFor="name">Password</label>
                <strong className="text-danger">*</strong>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="password"
                    onChange={handleBasic}
                />
                <div className="text-danger">{isError("password")}</div>
            </div>
            <div className="form-group d-none">
                <label className="mb-0">Citis</label>
                <select
                    className="js-example-basic-single form-control"
                    name="state"
                    onChange={handleBasic}
                >
                    <option value="AL">City </option>
                    <option value="WY">Warri</option>
                    <option value="WY">Benin</option>
                </select>
            </div>
            <div className="form-term my-2">
                By tapping continue with Facebook or Continue with Google. you
                adree to the <br /> <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.{" "}
            </div>

            <button
                disabled={(() => {
                    let error = false;
                    Object.keys(basic.error).map((key) => {
                        if (basic.error[key] !== "") {
                            error = true;
                        }
                    });
                    return (
                        error ||
                        basic?.email == "" ||
                        basic?.password == "" ||
                        basic?.phone == ""
                    );
                })()}
                className="btn btn-primary w-100 mt-3"
                id="step-1"
                type="button"
                onClick={() => handleStep(step + 1)}
            >
                Next
            </button>
        </div>
    );
};

const Otp = ({ step, handleStep }) => {
    return (
        <div className="login-from step-2">
            <div className="form-title mb-3">Please enter OTP Code.</div>
            <div className="form-term mb-2">
                How Whould you like customer to contact you?
            </div>

            <div className="form-group">
                <label htmlFor="name">Code.</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="0 0 0 0"
                />
            </div>
            <div className="form-term my-2">
                Didn't you receive any code? <br />{" "}
                <a href="#">Resend New Code</a>{" "}
            </div>
            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-primary w-100 mt-3"
                    id="step-2-back"
                    type="button"
                    onClick={() => handleStep(step - 1)}
                >
                    Back
                </button>
                <div className="px-3"></div>
                <button
                    className="btn btn-primary w-100 mt-3"
                    id="step-2"
                    type="button"
                    onClick={() => handleStep(step + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const BasicInfo = ({ step, handleStep }) => {
    return (
        <div className="login-from step-3">
            <div className="form-title mb-3">
                To start , help us get to know you and your business
            </div>
            <div className="form-term mb-2">
                This info helps our team provide customized support -- it won't
                be public.
            </div>

            <div className="form-group">
                <div className="form-title mb-3">What is your name?</div>
                <label htmlFor="name">First Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="First Name"
                />
            </div>

            <div className="form-group">
                <label htmlFor="name">Last Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Last Name"
                />
            </div>

            <div className="form-title mb-3">
                How much do you spend each month on online marketing
            </div>

            <label className="custom-radio">
                $1-$100
                <input type="radio" checked="checked" name="online-marketing" />
                <span className="checkmark"></span>
            </label>

            <label className="custom-radio">
                $100-$400
                <input type="radio" name="online-marketing" />
                <span className="checkmark"></span>
            </label>

            <label className="custom-radio">
                $400-$600
                <input type="radio" name="online-marketing" />
                <span className="checkmark"></span>
            </label>

            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-primary w-100 mt-3"
                    id="step-3-back"
                    type="button"
                    onClick={() => handleStep(step - 1)}
                >
                    Back
                </button>
                <div className="px-3"></div>
                <button
                    className="btn btn-primary w-100 mt-3"
                    id="step-3"
                    type="button"
                    onClick={() => handleStep(step + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const SelectZipCode = ({ step, handleStep }) => {
    return (
        <div className="login-from step-4">
            <div className="form-group">
                <div className="form-title mb-3">Where do you work?</div>
                <label htmlFor="name">Enter location</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter location"
                />
            </div>

            <div className="zip-code d-flex flex-wrap">
                <div className="badge-ctm d-flex align-items-center justify-content-between mr-2 mb-1">
                    1078 GZ <span className="fa fa-times ml-1"></span>
                </div>
            </div>

            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-primary w-100 mt-3"
                    id="step-4-back"
                    type="button"
                    onClick={() => handleStep(step - 1)}
                >
                    Back
                </button>
                <div className="px-3"></div>
                <button
                    className="btn btn-primary w-100 mt-3"
                    id="step-4"
                    type="button"
                    onClick={() => handleStep(step + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const ProviderType = ({ step, handleStep, providerType }) => {
    return (
        <div className="login-from step-5">
            <div className="form-group">
                <div className="form-title mb-3">Choose your role?</div>
            </div>

            <label className="custom-radio">
                I am a individual
                <input type="radio" id="individual" name="role" />
                <span className="checkmark"></span>
            </label>
            <label className="custom-radio">
                We are a company
                <input type="radio" id="company" name="role" />
                <span className="checkmark"></span>
            </label>

            {/* <!--  --> */}

            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-primary w-100 mt-3"
                    id="step-4-back"
                    type="button"
                    onClick={() => handleStep(step - 1)}
                >
                    Back
                </button>
                <div className="px-3"></div>
                <button
                    className="btn btn-primary w-100 mt-3"
                    disabled={providerType == undefined}
                    id="step-4"
                    type="button"
                    onClick={() => handleStep(step + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const Individual = ({ step, handleStep }) => {
    return (
        <div className="login-from step-6-user">
            <div className="form-group">
                <div className="form-title mb-3">Profile Setting</div>

                <div className="user-profile">
                    <div className="user-image d-flex align-items-center justify-content-center">
                        <img
                            src="img/images.png"
                            className="img-fluid"
                            alt=""
                        />
                    </div>
                    <label htmlFor="file-upload1" className="upload-image">
                        <i className="fas fa-pencil-alt"></i>
                        <input
                            type="file"
                            className="d-none"
                            id="file-upload1"
                        />
                    </label>
                </div>
            </div>

            <div className="form-group">
                <div className="form-title mb-3">Legal Name</div>
                <label htmlFor="name">First Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="First name"
                />
            </div>
            <div className="form-group">
                <label htmlFor="name">Last Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="last name"
                />
            </div>
            <div className="form-group">
                <label htmlFor="name">Date of birth</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="select Date"
                />
            </div>
            <div className="form-group">
                <label htmlFor="name">Hourly rate</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="$10 per hour"
                />
            </div>
            <div className="form-group">
                <label htmlFor="name">Home Address</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="street address"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="suit or #"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="utrecht"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="utrecht"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="1078GZ n/a, 3527 kz"
                />
            </div>

            <div className="form-group">
                <label htmlFor="name">Bio</label>
                <textarea
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter you bio"
                ></textarea>
            </div>
            <div className="form-term mb-2">
                {" "}
                Please make sure all information you submit is accurate before
                submit.
            </div>

            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-primary w-100 mt-3"
                    id="step-6-back"
                    type="button"
                    onClick={() => handleStep(step - 1)}
                >
                    Back
                </button>
                <div className="px-3"></div>
                <button
                    className="btn btn-primary w-100 mt-3"
                    id="submit"
                    type="button"
                >
                    submit
                </button>
            </div>
        </div>
    );
};

const Company = (props) => {
    return (
        <div className="login-from step-6-company">
            <div className="form-group">
                <div className="form-title mb-3"> Company Profile Setting</div>

                <div className="user-profile">
                    <div className="user-image d-flex align-items-center justify-content-center">
                        <img
                            src="img/images.png"
                            className="img-fluid"
                            alt=""
                        />
                    </div>
                    <label htmlFor="file-upload" className="upload-image">
                        <i className="fas fa-pencil-alt"></i>
                        <input
                            type="file"
                            id="file-upload1"
                            className="d-none"
                        />
                    </label>
                </div>
            </div>

            <div className="form-group">
                <div className="form-title mb-3">Legal Name</div>
                <label htmlFor="name">First Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="First name"
                />
            </div>
            <div className="form-group">
                <label htmlFor="name">Last Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="last name"
                />
            </div>
            <div className="form-group">
                <label htmlFor="name">Date of birth</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="select Date"
                />
            </div>
            <div className="form-group">
                <label htmlFor="name">Hourly rate</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="$10 per hour"
                />
            </div>
            <div className="form-group">
                <label htmlFor="name">Home Address</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="street address"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="suit or #"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="utrecht"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="utrecht"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="1078GZ n/a, 3527 kz"
                />
            </div>

            <div className="form-group">
                <label htmlFor="name">Bio</label>
                <textarea
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter you bio"
                ></textarea>
            </div>
            <div className="form-term mb-2">
                {" "}
                Please make sure all information you submit is accurate before
                submit.
            </div>

            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-primary w-100 mt-3"
                    id="step-6-back-c"
                    type="button"
                >
                    Back
                </button>
                <div className="px-3"></div>
                <button
                    className="btn btn-primary w-100 mt-3"
                    id="submit-company"
                    type="button"
                >
                    submit
                </button>
            </div>
        </div>
    );
};

export {
    Basic,
    Otp,
    BasicInfo,
    SelectZipCode,
    ProviderType,
    Individual,
    Company,
};
