const Basic = (props) => {
    return (
        <div class="login-from step-1">
            <div class="form-title mb-3">Set Up Your Business Profile.</div>
            <div class="form-term mb-2">
                How Whould you like customer to contact you?
            </div>

            <div class="form-group">
                <label for="name">Email</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="john.doe@gmail.com"
                />
            </div>
            <div className="row">
                <div class="form-group col-12">
                    <label>Phone</label>
                    <div class="d-flex phone-input">
                        <select
                            class="js-example-basic-single form-control col-3"
                            name="state"
                        >
                            <option value="+1">+1 </option>
                            <option value="+92">+92</option>
                        </select>
                        <input
                            type="text"
                            class="form-control col-9"
                            placeholder="51112345"
                        />
                    </div>
                </div>
            </div>
            {/* <label class="custom-check">
                                        Enable text messages
                                        <input
                                            type="checkbox"
                                            checked="checked"
                                        />
                                        <span class="checkmark"></span>
                                    </label> */}
            {/* <div class="form-term mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                facere suscipit earum voluptatibus doloremque quia?
            </div> */}
            <div class="form-group">
                <label for="name">Password</label>
                <input
                    type="password"
                    class="form-control"
                    id="name"
                    placeholder="password"
                />
            </div>
            <div class="form-group d-none">
                <label class="mb-0">Citis</label>
                <select
                    class="js-example-basic-single form-control"
                    name="state"
                >
                    <option value="AL">City </option>
                    <option value="WY">Warri</option>
                    <option value="WY">Benin</option>
                </select>
            </div>
            <div class="form-term my-2">
                By tapping continue with Facebook or Continue with Google. you
                adree to the <br /> <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.{" "}
            </div>

            <button
                class="btn btn-primary w-100 mt-3"
                id="step-1"
                type="button"
            >
                Next
            </button>
        </div>
    );
};

const Otp = (props) => {
    return (
        <div class="login-from step-2">
            <div class="form-title mb-3">Please enter OTP Code.</div>
            <div class="form-term mb-2">
                How Whould you like customer to contact you?
            </div>

            <div class="form-group">
                <label for="name">Code.</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="0 0 0 0"
                />
            </div>
            <div class="form-term my-2">
                Didn't you receive any code? <br />{" "}
                <a href="#">Resend New Code</a>{" "}
            </div>
            <div class="d-flex justify-content-between">
                <button
                    class="btn btn-primary w-100 mt-3"
                    id="step-2-back"
                    type="button"
                >
                    Back
                </button>
                <div class="px-3"></div>
                <button
                    class="btn btn-primary w-100 mt-3"
                    id="step-2"
                    type="button"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const BasicInfo = (props) => {
    return (
        <div class="login-from step-3">
            <div class="form-title mb-3">
                To start , help us get to know you and your business
            </div>
            <div class="form-term mb-2">
                This info helps our team provide customized support -- it won't
                be public.
            </div>

            <div class="form-group">
                <div class="form-title mb-3">What is your name?</div>
                <label for="name">First Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="First Name"
                />
            </div>

            <div class="form-group">
                <label for="name">Last Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Last Name"
                />
            </div>

            <div class="form-title mb-3">
                How much do you spend each month on online marketing
            </div>

            <label class="custom-radio">
                $1-$100
                <input type="radio" checked="checked" name="online-marketing" />
                <span class="checkmark"></span>
            </label>

            <label class="custom-radio">
                $100-$400
                <input type="radio" name="online-marketing" />
                <span class="checkmark"></span>
            </label>

            <label class="custom-radio">
                $400-$600
                <input type="radio" name="online-marketing" />
                <span class="checkmark"></span>
            </label>

            <div class="d-flex justify-content-between">
                <button
                    class="btn btn-primary w-100 mt-3"
                    id="step-3-back"
                    type="button"
                >
                    Back
                </button>
                <div class="px-3"></div>
                <button
                    class="btn btn-primary w-100 mt-3"
                    id="step-3"
                    type="button"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const SelectZipCode = (props) => {
    return (
        <div class="login-from step-4">
            <div class="form-group">
                <div class="form-title mb-3">Where do you work?</div>
                <label for="name">Enter location</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Enter location"
                />
            </div>

            <div class="zip-code d-flex flex-wrap">
                <div class="badge-ctm d-flex align-items-center justify-content-between mr-2 mb-1">
                    1078 GZ <span class="fa fa-times ml-1"></span>
                </div>
                <div class="badge-ctm d-flex align-items-center justify-content-between mr-2 mb-1">
                    1078 GZ <span class="fa fa-times ml-1"></span>
                </div>
                <div class="badge-ctm d-flex align-items-center justify-content-between mr-2 mb-1">
                    1078 GZ <span class="fa fa-times ml-1"></span>
                </div>
                <div class="badge-ctm d-flex align-items-center justify-content-between mr-2 mb-1">
                    1078 GZ <span class="fa fa-times ml-1"></span>
                </div>
                <div class="badge-ctm d-flex align-items-center justify-content-between mr-2 mb-1">
                    1078 GZ <span class="fa fa-times ml-1"></span>
                </div>
                <div class="badge-ctm d-flex align-items-center justify-content-between mr-2 mb-1">
                    1078 GZ <span class="fa fa-times ml-1"></span>
                </div>
                <div class="badge-ctm d-flex align-items-center justify-content-between mr-2 mb-1">
                    1078 GZ <span class="fa fa-times ml-1"></span>
                </div>
                <div class="badge-ctm d-flex align-items-center justify-content-between mr-2 mb-1">
                    1078 GZ <span class="fa fa-times ml-1"></span>
                </div>
                <div class="badge-ctm d-flex align-items-center justify-content-between mr-2 mb-1">
                    1078 GZ <span class="fa fa-times ml-1"></span>
                </div>
            </div>

            <div class="d-flex justify-content-between">
                <button
                    class="btn btn-primary w-100 mt-3"
                    id="step-4-back"
                    type="button"
                >
                    Back
                </button>
                <div class="px-3"></div>
                <button
                    class="btn btn-primary w-100 mt-3"
                    id="step-4"
                    type="button"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const ProviderType = (props) => {
    return (
        <div class="login-from step-5">
            <div class="form-group">
                <div class="form-title mb-3">Choose your role?</div>
            </div>

            <label class="custom-radio">
                I am a individual
                <input type="radio" id="individual" name="role" />
                <span class="checkmark"></span>
            </label>
            <label class="custom-radio">
                We are a company
                <input type="radio" id="company" name="role" />
                <span class="checkmark"></span>
            </label>

            {/* <!--  --> */}

            <div class="d-flex justify-content-between">
                <button
                    class="btn btn-primary w-100 mt-3"
                    id="step-5-back"
                    type="button"
                >
                    Back
                </button>
                <div class="px-3"></div>
                <button
                    class="btn btn-primary w-100 mt-3"
                    id="step-individual"
                    type="button"
                >
                    Next
                </button>
                <button
                    class="btn btn-primary w-100 mt-3"
                    id="step-compnay"
                    type="button"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const Individual = (props) => {
    return (
        <div class="login-from step-6-user">
            <div class="form-group">
                <div class="form-title mb-3">Profile Setting</div>

                <div class="user-profile">
                    <div class="user-image d-flex align-items-center justify-content-center">
                        <img src="img/images.png" class="img-fluid" alt="" />
                    </div>
                    <label for="file-upload1" class="upload-image">
                        <i class="fas fa-pencil-alt"></i>
                        <input type="file" class="d-none" id="file-upload1" />
                    </label>
                </div>
            </div>

            <div class="form-group">
                <div class="form-title mb-3">Legal Name</div>
                <label for="name">First Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="First name"
                />
            </div>
            <div class="form-group">
                <label for="name">Last Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="last name"
                />
            </div>
            <div class="form-group">
                <label for="name">Date of birth</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="select Date"
                />
            </div>
            <div class="form-group">
                <label for="name">Hourly rate</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="$10 per hour"
                />
            </div>
            <div class="form-group">
                <label for="name">Home Address</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="street address"
                />
            </div>
            <div class="form-group">
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="suit or #"
                />
            </div>
            <div class="form-group">
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="utrecht"
                />
            </div>
            <div class="form-group">
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="utrecht"
                />
            </div>
            <div class="form-group">
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="1078GZ n/a, 3527 kz"
                />
            </div>

            <div class="form-group">
                <label for="name">Bio</label>
                <textarea
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Enter you bio"
                ></textarea>
            </div>
            <div class="form-term mb-2">
                {" "}
                Please make sure all information you submit is accurate before
                submit.
            </div>

            <div class="d-flex justify-content-between">
                <button
                    class="btn btn-primary w-100 mt-3"
                    id="step-6-back"
                    type="button"
                >
                    Back
                </button>
                <div class="px-3"></div>
                <button
                    class="btn btn-primary w-100 mt-3"
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
        <div class="login-from step-6-company">
            <div class="form-group">
                <div class="form-title mb-3"> Company Profile Setting</div>

                <div class="user-profile">
                    <div class="user-image d-flex align-items-center justify-content-center">
                        <img src="img/images.png" class="img-fluid" alt="" />
                    </div>
                    <label for="file-upload" class="upload-image">
                        <i class="fas fa-pencil-alt"></i>
                        <input type="file" id="file-upload1" class="d-none" />
                    </label>
                </div>
            </div>

            <div class="form-group">
                <div class="form-title mb-3">Legal Name</div>
                <label for="name">First Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="First name"
                />
            </div>
            <div class="form-group">
                <label for="name">Last Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="last name"
                />
            </div>
            <div class="form-group">
                <label for="name">Date of birth</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="select Date"
                />
            </div>
            <div class="form-group">
                <label for="name">Hourly rate</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="$10 per hour"
                />
            </div>
            <div class="form-group">
                <label for="name">Home Address</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="street address"
                />
            </div>
            <div class="form-group">
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="suit or #"
                />
            </div>
            <div class="form-group">
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="utrecht"
                />
            </div>
            <div class="form-group">
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="utrecht"
                />
            </div>
            <div class="form-group">
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="1078GZ n/a, 3527 kz"
                />
            </div>

            <div class="form-group">
                <label for="name">Bio</label>
                <textarea
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Enter you bio"
                ></textarea>
            </div>
            <div class="form-term mb-2">
                {" "}
                Please make sure all information you submit is accurate before
                submit.
            </div>

            <div class="d-flex justify-content-between">
                <button
                    class="btn btn-primary w-100 mt-3"
                    id="step-6-back-c"
                    type="button"
                >
                    Back
                </button>
                <div class="px-3"></div>
                <button
                    class="btn btn-primary w-100 mt-3"
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
