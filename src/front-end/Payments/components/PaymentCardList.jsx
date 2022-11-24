import { CardElement } from "@stripe/react-stripe-js";

const PaymentCardList = ({
    state,
    paymentCard,
    handlePayemntCard,
    handleCardDetailsChange,
    checkoutError,
    handleCardHolderNameChange,
}) => {
    if (
        state?.paymentMethod === 1 ||
        state?.paymentMethod === undefined ||
        state?.cart_ids == undefined ||
        state?.form?.serviceDetail?.is_hourly == true
    )
        return (
            <>
                {(state?.paymentMethod === 1 ||
                    state?.form?.serviceDetail?.is_hourly) &&
                    paymentCard?.data?.data?.map((item, index) => (
                        <div
                            key={index}
                            className="order-card d-flex align-items-center justify-content-between mt-2"
                            style={
                                state.card_id == item.id
                                    ? {
                                          cursor: "pointer",
                                          backgroundColor: "#fea11188",
                                      }
                                    : {
                                          cursor: "pointer",
                                      }
                            }
                            onClick={() => handlePayemntCard(item.id)}
                        >
                            <div>
                                {item.brand == "Visa" && (
                                    <i
                                        className="fa fa-cc-visa fa-5x text-primary"
                                        aria-hidden="true"
                                    ></i>
                                )}
                                {item.brand == "MasterCard" && (
                                    <i
                                        className="fa fa-cc-mastercard fa-5x "
                                        aria-hidden="true"
                                    ></i>
                                )}
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="order-des-b ml-4">
                                    <div
                                        className="title"
                                        style={
                                            state.card_id == item.id
                                                ? {
                                                      color: "white",
                                                  }
                                                : {
                                                      color: "black",
                                                  }
                                        }
                                    >
                                        {`${item?.brand}****${item?.last4}`}
                                    </div>
                                    {/* <div className="order-time">
                                                                                primary
                                                                            </div> */}
                                    <div className="order-time">
                                        Expires
                                        {"1"}
                                        {`${item?.exp_month}/${item?.exp_year}`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                <div className="common-input mb-3">
                    <input
                        type="text"
                        name="card_holder_name"
                        placeholder="Card Holder Name"
                        value={state?.card_holder_name}
                        onChange={handleCardHolderNameChange}
                    />
                </div>
                <div
                    style={{
                        padding: "0px 10px",
                        borderRadius: "1rem",
                        width: "100%",
                        backgroundColor: "#f1f2f6",
                    }}
                >
                    <CardElement
                        onChange={handleCardDetailsChange}
                        options={{
                            style: {
                                base: {
                                    fontSize: "14px",
                                    lineHeight: "45px",
                                },
                            },
                        }}
                    />
                </div>
                <p className="text-danger">{checkoutError}</p>
            </>
        );
};

export { PaymentCardList };
