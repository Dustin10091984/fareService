const MovingRequest = (props) => {
    return (
        <div className="section-requst-qoutes">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="RequestQuote text-center mb-5">
                            Request Quote
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="qoutes-map-box p-4">
                            <div className="map-title mb-3">Moving Address</div>
                            <div className="map-box-new">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26374123.22046753!2d-113.77054417486771!3d36.20310182395501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2s!4v1644470871085!5m2!1sen!2s"
                                    width="100%"
                                    height="100%"
                                    style={{ border: "0" }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                ></iframe>
                            </div>

                            <div className="request-information mt-4 p-4">
                                <div className="mb-3">
                                    <div className="moving-form">
                                        Moving From
                                    </div>
                                    <div className="moving-form-map-link">
                                        <a href="#">
                                            2061 Scenicview Drive,Longview,75601
                                        </a>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="moving-form">Moving To</div>
                                    <div className="moving-form-map-link">
                                        <a href="#">
                                            200 Sundown Lane,Kansas City,64106
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="moving-form">Move Date</div>
                                    <div className="moving-form-map-link">
                                        <a href="#">6/14/2021</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="qoutes-map-box p-4">
                            <div className="enter-detail-rqt mb-5">
                                Enter Your Detail
                            </div>

                            <div className="mb-3">
                                <div
                                    className="col-md-12 px-0 text-dark"
                                    style={{ fontSize: "2rem" }}
                                >
                                    Name
                                    <strong className="text-danger">*</strong>
                                </div>
                                <div className="common-input p-1">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Name"
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
                                    style={{ fontSize: "2rem" }}
                                >
                                    Email Address
                                    <strong className="text-danger">*</strong>
                                </div>
                                <div className="common-input p-1">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="email address"
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
                                    style={{ fontSize: "2rem" }}
                                >
                                    Phone
                                    <strong className="text-danger">*</strong>
                                </div>
                                <div className="common-input p-1">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Number"
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
                                    style={{ fontSize: "2rem" }}
                                >
                                    Phone
                                    <strong className="text-danger">*</strong>
                                </div>
                                <div className="common-input p-1">
                                    <div>
                                        <textarea
                                            name=""
                                            id=""
                                            cols="30"
                                            rows="10"
                                            placeholder="Description"
                                        ></textarea>
                                        <div className="autocomplete-dropdown-container"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    disabled=""
                                    type="button"
                                    className="button-common mt-4 w-100"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { MovingRequest };
