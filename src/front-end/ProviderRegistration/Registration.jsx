import {
    Basic,
    Otp,
    BasicInfo,
    SelectZipCode,
    ProviderType,
    Individual,
    Company,
} from "./Steps";

const Registration = (props) => {
    return (
        <>
            <div
                class="main-registration"
                style={{
                    background:
                        "url(/assets/img/banner.jpg) no-repeat center/cover",
                    // fontSize: "1.5rem",
                }}
            >
                {/* <div class="container">
                    <div class="row">
                        <div class="col-md-12 d-flex align-items-center justify-content-between py-5">
                            <div class="logo-main">
                                <img
                                    src="img/logo.png"
                                    class="img-fluid"
                                    alt=""
                                />
                            </div>
                            <div class="login-btn">
                                <a
                                    href="#"
                                    class="login-now text-capitalize text-white"
                                >
                                    login
                                </a>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div class="driver-from pt-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-10 col-md-6 col-lg-6 offset-lg-1 p-b-md">
                                <div class="banner-content">
                                    <h1 class="banner-title">
                                        Drive with Farerun
                                    </h1>
                                    <div class="banner-des">
                                        Earn good money with your vehicle.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-10 col-md-6 col-lg-4 mt-5 mt-md-0">
                                {/* <!-- step 1 --> */}
                                <Basic />
                                {/* <!-- step 2 --> */}
                                {/* <Otp /> */}
                                {/* <!-- step 3 --> */}
                                {/* <BasicInfo /> */}
                                {/* <!-- step 4 --> */}
                                {/* <SelectZipCode /> */}
                                {/* <!-- step 5 --> */}
                                {/* <ProviderType /> */}
                                {/* <!-- step 6 user --> */}
                                {/* <Individual /> */}
                                {/* <!-- step 6 company--> */}
                                {/* <Company /> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div class="arrow-down-banner text-center">
                    <i class="fas fa-angle-down"></i>
                </div> */}
            </div>
        </>
    );
};

export default Registration;
