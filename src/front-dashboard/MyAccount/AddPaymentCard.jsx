const AddPaymentCard = () => {
    return (
        <>
            <div className="login-box h-auto mx-auto">
                <div className="login-heading mb-4 text-center">
                    Secure Credit Form
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="common-input mb-5">
                            <input
                                type="text"
                                placeholder="Credit card number"
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img src="/assets/img/card.svg" alt="" />
                    </div>
                    <div className="col-md-3 mr-2">
                        <div className="common-input mb-5">
                            <input type="text" placeholder="MM/YY" />
                        </div>
                    </div>
                    <div className="col-md-3 ml-2">
                        <div className="common-input mb-5">
                            <input type="text" placeholder="CVC" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-8 ml-auto">
                                <button className="button-common w-100 mb-5">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AddPaymentCard;
