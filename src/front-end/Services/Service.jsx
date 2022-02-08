const Service = ({ headerMenu, ...props }) => {
    const { serviceId, subServiceId } = props.match.params;
    console.log(serviceId, subServiceId, headerMenu);
    const service = headerMenu.find((item) => item.id == serviceId);
    const sub_service = service?.sub_services.find(
        (item) => item.id == subServiceId
    );
    return (
        <div className="moving-search-box house-cleaning-sec">
            <div className="title-move mb-5">{sub_service?.name}</div>
            <div className="d-flex justify-content-between">
                <div className="m-search-left-box w-100">
                    <div className="mb-4 d-flex align-items-center justify-content-between">
                        <div className="common-input mx-3">
                            <input type="text" placeholder="Zip Code" />
                        </div>
                        <div className="common-input mx-3">
                            <input type="text" placeholder="State" />
                        </div>
                        {/* <div className="common-input">
                                                    <input type="text" placeholder="City" />
                                                </div> */}
                    </div>

                    <div className="d-flex justify-content-between">
                        <div className="common-input mb-4 mx-3">
                            <select name="" id="">
                                <option value="">1 Bedroom</option>
                                <option value="">2 Bedroom</option>
                                <option value="">3 Bedroom</option>
                                <option value="">4 Bedroom</option>
                                <option value="">5 Bedroom</option>
                            </select>
                        </div>

                        <div className="common-input mb-4 mx-3">
                            <select name="" id="">
                                <option value="">1 Bedroom</option>
                                <option value="">2 Bedroom</option>
                                <option value="">3 Bedroom</option>
                                <option value="">4 Bedroom</option>
                                <option value="">5 Bedroom</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4 d-flex align-items-center justify-content-between">
                        <div className="common-input mx-3">
                            <input type="text" placeholder="Phone Number" />
                        </div>
                        <div className="common-input mx-3">
                            <input type="text" placeholder="Email" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-0 mx-3">
                <div className="button-common mt-5 w-100">Get a Price</div>
            </div>

            <div className="moving-des mt-5">
                <div className="title">For your home size, We recommend</div>

                <ul className="time-list d-flex align-items-center justify-content-between flex-wrap">
                    <li className="d-flex align-items-center justify-content-center">
                        1 Hours
                    </li>
                    <li className="d-flex align-items-center justify-content-center">
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
                    </li>
                </ul>
                <p className="text-center">
                    By signing and clicking Get a Price, you affirm you have
                    read and agree to the Handy Terms, and you agree and
                    authorize Handy and its affiliates, and their networks of
                    service professionals, to deliver marketing calls or texts
                    using automated technology to the number you provided above
                    regarding your project and other home services offers.
                    Consent is not a condition of purchase.
                </p>
            </div>
        </div>
    );
};

export { Service };
