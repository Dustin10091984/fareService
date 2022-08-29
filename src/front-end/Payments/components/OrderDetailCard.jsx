const OrderDetailCard = ({ state, cartList, HOST }) => {
    return (
        <>
            {state?.cart_ids?.map((item) => {
                const cart = cartList?.find((cart) => cart.id == item);
                const food = cart?.food;
                const product = cart?.product;
                if (food || product) {
                    return (
                        <div
                            key={item}
                            className="cart-total cart-page d-flex align-items-center justify-content-between"
                        >
                            <div className="d-flex align-items-center justify-content">
                                <div className="cart-img">
                                    <img
                                        style={{
                                            width: "16rem",
                                            height: "16rem",
                                        }}
                                        src={
                                            (food?.image &&
                                                HOST + food.image) ||
                                            (product?.image &&
                                                HOST + product.image) ||
                                            ""
                                        }
                                        className="img-fluid"
                                        alt=""
                                        onError={(e) => {
                                            e.target.src =
                                                "/assets/img/cart-prod.jpg";
                                        }}
                                    />
                                </div>
                                <div className="cart-title">
                                    {(food?.name && food.name) ||
                                        (product?.name && product.name)}
                                </div>
                            </div>
                            <div className="price-qnt-subtotal d-flex align-items-center justify-content-between flex-column">
                                <ul className="list-heading d-flex align-items-center justify-content-between w-100">
                                    <li>Price</li>
                                    <li>Quantity</li>
                                    <li>Subtotal</li>
                                </ul>
                                <ul className="list-des d-flex align-items-center justify-content-between w-100">
                                    <li>
                                        $
                                        {(food?.price && food.price) ||
                                            (product?.price && product.price)}
                                    </li>
                                    <li
                                        className={
                                            "d-flex justify-content-center"
                                        }
                                    >
                                        {cart?.quantity}
                                    </li>
                                    <li>${cart?.price}</li>
                                </ul>
                            </div>
                        </div>
                    );
                }
            }) || "NOT FOUND"}
            {state?.type && state?.cart_ids && (
                <div className="cart-price">
                    Total
                    {` $${(() => {
                        let total = 0;
                        state?.cart_ids?.forEach((item) => {
                            total += parseInt(
                                cartList?.find((cart) => cart.id == item)?.price
                            );
                        });
                        return total;
                    })()}`}
                </div>
            )}
        </>
    );
};

export { OrderDetailCard };
