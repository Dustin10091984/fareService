import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCartList, updateQuantity } from "../store/Slices/cart/cartsSlice";
import { Product } from '../front-end/common/product';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const Cart = (props) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({wait: null, cart: {id: null, quantity: null}});
    useEffect(() => {
        dispatch(getCartList()); // get cart list
    }, []);
    
    const loading = useRef(null);

    const {list} = useSelector(state => state.cartsReducer);
    const { updateCart } = useSelector((state) => state.cartsReducer);

    useEffect(() => {
        updateCart?.loading == false && toast.dismiss(loading.current);
    }, [updateCart?.loading]);

    useEffect(() => {
        updateCart?.loading == false &&
            updateCart?.error == true &&
            updateCart?.message &&
            toast.error(updateCart.message);
    }, [updateCart?.error]);

    useEffect(() => {
        updateCart?.loading == false && updateCart?.error == false &&
            updateCart?.message && state.wait !== null &&
            toast.success(updateCart.message);
        
    }, [updateCart?.message]);

    // useEffect(() => {
    //     if(updateCart?.error == false, updateCart?.message){
    //         dispatch(getCartList());
    //     }
    // }, [updateCart?.error, updateCart?.message]);

    useEffect(() => {
        if(state.wait == false && state?.cart?.id != null && state?.cart?.quantity != null){
            dispatch(
                updateQuantity({ id: state?.cart?.id, quantity: state?.cart?.quantity })
            );
        }
    }, [state.wait])

    const sleep = (ms) => {
        return new Promise((resolve ) => {
            setState((state) => ({ ...state, wait: true }));
            setTimeout(resolve, ms);
        });
    }

    const handleMinusClick = (data) => {
        if(data.quantity > 1)
            setState({
                ...state,
                cart: {
                    ...state.cart,
                     id: data.id,
                     quantity: data.quantity - 1
                },
            });
        if (state.wait === false || state.wait === null) {
            loading.current = toast.info("Loading...");
            const ONE_SECOND = 1000;
            sleep(ONE_SECOND).then(() => {
                setState((state) => ({ ...state, wait: false }));
            });
        }
    }

    const handlePlusClick = (data) => {
        if (data.quantity < 100)
            setState({
                ...state,
                cart: {
                    ...state.cart,
                    id: data.id,
                    quantity: data.quantity + 1,
                },
            });
        if(state.wait === false || state.wait === null) {
            loading.current = toast.info("Loading...");
            sleep(2000).then(() => {
                setState((state) => ({ ...state, wait: false }));
            });
        }
    }
    return (
        <>
            <div className="moving-help-sec pad-y m-0">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-center">
                                <div className="product-title-sec">
                                    {" "}
                                    Your Cart
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <hr />
                                </div>
                                {list?.cart?.map((item) => {
                                    const food = item.food;
                                    const product = item.product;
                                    if (food || product) {
                                        return (
                                            <React.Fragment key={item.id}>
                                                <div className="col-md-12">
                                                    <div className="cart-total cart-page d-flex align-items-center justify-content-between">
                                                        <div className="d-flex align-items-center justify-content">
                                                            {/* <input type="radio"  className="m-5"/> */}
                                                            <div className="cart-img">
                                                                <img
                                                                    src={
                                                                        (food?.image &&
                                                                            food.image) ||
                                                                        "/assets/img/cart-prod.jpg" ||
                                                                        (product?.image &&
                                                                            product.image) ||
                                                                        "/assets/img/cart-prod.jpg"
                                                                    }
                                                                    className="img-fluid"
                                                                    alt=""
                                                                    onError={(
                                                                        e
                                                                    ) => {
                                                                        e.target.src =
                                                                            "/assets/img/cart-prod.jpg";
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="cart-title">
                                                                {(food?.name &&
                                                                    food.name) ||
                                                                    (product?.name &&
                                                                        product.name)}
                                                            </div>
                                                        </div>
                                                        <div className="price-qnt-subtotal d-flex align-items-center justify-content-between flex-column">
                                                            <ul className="list-heading d-flex align-items-center justify-content-between w-100">
                                                                <li>Price</li>
                                                                <li>
                                                                    Quantity
                                                                </li>
                                                                <li>
                                                                    Subtotal
                                                                </li>
                                                            </ul>
                                                            <ul className="list-des d-flex align-items-center justify-content-between w-100">
                                                                <li>
                                                                    $
                                                                    {(food?.price &&
                                                                        food.price) ||
                                                                        (product?.price &&
                                                                            product.price)}
                                                                </li>
                                                                <li
                                                                    className={
                                                                        "d-flex justify-content-center"
                                                                    }
                                                                >
                                                                    <div className="col-6">
                                                                        <div className="input-group">
                                                                            <span className="input-group-btn">
                                                                                <button
                                                                                    type="button"
                                                                                    className="quantity-left-minus btn btn-danger btn-number"
                                                                                    data-type="minus"
                                                                                    data-field=""
                                                                                    onClick={() =>
                                                                                        handleMinusClick(
                                                                                            {
                                                                                                id: item.id,
                                                                                                quantity: item?.id == state?.cart?.id
                                                                                                    ? state?.cart?.quantity
                                                                                                    : parseInt(item.quantity),
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <span
                                                                                        className="glyphicon glyphicon-minus"
                                                                                        style={{
                                                                                            fontSize:
                                                                                                "2rem",
                                                                                        }}
                                                                                    >
                                                                                        -
                                                                                    </span>
                                                                                </button>
                                                                            </span>
                                                                            <input
                                                                                type="text"
                                                                                id="quantity"
                                                                                name="quantity"
                                                                                className="form-control input-number"
                                                                                style={{
                                                                                    fontSize:
                                                                                        "2rem",
                                                                                }}
                                                                                min="1"
                                                                                max="100"
                                                                                value={
                                                                                    (item?.id == state?.cart?.id &&
                                                                                        state?.cart?.quantity) ||
                                                                                    item?.quantity
                                                                                }
                                                                                readOnly
                                                                            />
                                                                            <span className="input-group-btn">
                                                                                <button
                                                                                    type="button"
                                                                                    className="quantity-right-plus btn btn-success btn-number"
                                                                                    data-type="plus"
                                                                                    data-field=""
                                                                                    onClick={() =>
                                                                                        handlePlusClick(
                                                                                            {
                                                                                                id: item.id,
                                                                                                quantity: item?.id == state?.cart?.id
                                                                                                    ? state?.cart?.quantity
                                                                                                    : parseInt(item.quantity),
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <span
                                                                                        className="glyphicon glyphicon-plus"
                                                                                        style={{
                                                                                            fontSize:
                                                                                                "2rem",
                                                                                        }}
                                                                                    >
                                                                                        +
                                                                                    </span>
                                                                                </button>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    $
                                                                    {item?.price}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-12 pb-5">
                                                    <hr />
                                                </div>
                                            </React.Fragment>
                                        );
                                    }
                                }) || "NOT FOUND"}

                                <div className="check-box w-100 text-right">
                                    <div className="cart-price">
                                        {`$${list?.total_price || 0.00}`}
                                    </div>
                                    <Link
                                        to="/food-grocery"
                                        className="update-cart"
                                    >
                                        Add More Product
                                    </Link>
                                    <div className="email-check-out ml-auto d-flex align-items-center justify-content-end">
                                        {/* <div className="common-input pr-5">
                                            <input
                                                type="text"
                                                placeholder="Expiration date"
                                            />
                                        </div> */}
                                        <Link
                                            to="/payment"
                                            className="button-common"
                                        >
                                            Continue to Checkout
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}