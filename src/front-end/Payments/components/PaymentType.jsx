const PaymentType = ({ state, handleChangePaymentMethod }) => {
    if (state.type && state.cart_ids)
        return (
            <>
                <div
                    className="form-check ml-5"
                    onClick={() => handleChangePaymentMethod(0)}
                >
                    <input
                        type="radio"
                        className="form-check-input radio"
                        checked={state.paymentMethod === 0}
                        defaultValue={0}
                        readOnly
                        // onClick={handleChangePaymentMethod(0)}
                    />
                    <label
                        className="form-check-label ml-4 option"
                        htmlFor={`radio`}
                    >
                        Cash on Delivery
                    </label>
                </div>
                <div
                    className="form-check ml-5 mt-2"
                    onClick={() => handleChangePaymentMethod(1)}
                >
                    <input
                        type="radio"
                        className="form-check-input radio"
                        checked={state.paymentMethod === 1}
                        defaultValue={1}
                        readOnly
                    />
                    <label
                        className="form-check-label ml-4 option"
                        htmlFor={`radio`}
                    >
                        Online pay
                    </label>
                </div>
            </>
        );
    else return null;
};

export { PaymentType };
