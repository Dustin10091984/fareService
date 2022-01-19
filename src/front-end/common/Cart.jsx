import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HOST } from "../../constants";
import { deleteCart, updateQuantity } from "../../store/Slices/cart/cartsSlice";
import { CheckOutCard } from "./Cards";
import Swal from "sweetalert2";
import Loading from "./Loading";
import { Link } from "react-router-dom";

export const Cart = ({ data }) => {
    const [state, setState] = useState({
        is_loggedin: false,
        wait: null,
    });

    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            setState((state) => ({
                ...state,
                is_loggedin: true,
            }));
        } else {
            setState((state) => ({
                ...state,
                is_loggedin: false,
            }));
        }
    }, []);
    const loading = useRef(null);

    const dispatch = useDispatch();

    const updateCart = useSelector((state) => state.cartsReducer?.updateCart);

    const delCart = useSelector((state) => state.cartsReducer?.deleteCart);

    useEffect(() => {
        if (
            state.wait == false &&
            state?.cart?.id != null &&
            state?.cart?.quantity != null &&
            state.is_logedin == true
        ) {
            dispatch(
                updateQuantity({
                    id: state?.cart?.id,
                    quantity: state?.cart?.quantity,
                })
            );
        }
    }, [state.wait]);

    useEffect(() => {
        if (delCart?.loading == false && delCart?.error == false) {
            toast.dismiss(loading.current);
            toast.success(delCart?.message || "Cart Removed successfully");
        }
        if (delCart?.error == true) {
            toast.dismiss(loading.current);
            toast.error(delCart?.message || "Something went wrong");
        }
    }, [delCart]);

    useEffect(() => {
        if (updateCart?.loading == false && updateCart?.error == false) {
            toast.dismiss(loading.current);
            toast.success("Cart updated successfully");
        }
        if (updateCart?.error == true) {
            toast.dismiss(loading.current);
            toast.error(updateCart?.message || "Something went wrong");
        }
    }, [updateCart]);

    const sleep = (ms) => {
        return new Promise((resolve) => {
            setState((state) => ({ ...state, wait: true }));
            setTimeout(resolve, ms);
        });
    };

    const handlePlusClick = (data) => {
        if (data.quantity < 100) {
            setState({
                ...state,
                cart: {
                    ...state.cart,
                    id: data.id,
                    quantity: data.quantity + 1,
                },
            });
            if (state.wait === false || state.wait === null) {
                toast.dismiss(loading.current);
                loading.current = toast.info("Loading...", {
                    autoClose: false,
                });
                const ONE_SECOND = 1000;
                sleep(ONE_SECOND * 2).then(() => {
                    setState((state) => ({ ...state, wait: false }));
                });
            }
        }
    };

    const handleMinusClick = (data) => {
        if (data.quantity > 1) {
            setState({
                ...state,
                cart: {
                    ...state.cart,
                    id: data.id,
                    quantity: data.quantity - 1,
                },
            });
            if (state.wait === false || state.wait === null) {
                toast.dismiss(loading.current);
                loading.current = toast.info("Loading...", {
                    autoClose: false,
                });
                const ONE_SECOND = 1000;
                sleep(ONE_SECOND * 2).then(() => {
                    setState((state) => ({ ...state, wait: false }));
                });
            }
        }
    };

    const handleRemoveCartClick = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                loading.current = toast.info("Loading...", {
                    autoClose: false,
                });
                dispatch(deleteCart(id));
                // Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        });
    };

    return (
        <>
            {/* <Loading loading={updateCart?.loading} /> */}
            <div
                className="container-fluid sticky-top"
                style={{
                    borderTop: ".1rem solid #e6e6e6",
                    borderLeft: ".1rem solid #e6e6e6",
                    borderRadius: "0.5rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    marginBottom: "1rem",
                }}
            >
                <div className="row cart-sec">
                    <div
                        className="col-md-12 mb-3"
                        style={{
                            paddingLeft: "0px",
                            paddingRight: "0px",
                        }}
                    >
                        <div className="text-center">
                            <h3>Your Order</h3>
                        </div>
                        <div className="text-center mb-5">
                            <h5>Add item to your cart</h5>
                        </div>
                        <div
                            style={{
                                overflow: "auto",
                                width: "100%",
                                height: "80vh",
                                paddingTop: "1rem",
                            }}
                        >
                            {(() => {
                                if (state?.is_loggedin == true) {
                                    if (data?.error) {
                                        return (
                                            <div className="text-center">
                                                <h5>
                                                    {data?.message ||
                                                        "No items in your cart"}
                                                </h5>
                                            </div>
                                        );
                                    }
                                    if (
                                        data?.error == false &&
                                        data?.cart?.length > 0
                                    ) {
                                        return data?.cart?.map(
                                            (item, index) => {
                                                const { food, product } = item;
                                                if (food || product) {
                                                    let cartData =
                                                        food || product;
                                                    return (
                                                        <CheckOutCard
                                                            key={index}
                                                            {...{
                                                                id: item.id,
                                                                image: `${HOST}${cartData?.image}`,
                                                                title: cartData?.name,
                                                                price: `$${cartData?.price}`,
                                                                quantity:
                                                                    (item?.id ==
                                                                        state
                                                                            ?.cart
                                                                            ?.id &&
                                                                        state
                                                                            ?.cart
                                                                            ?.quantity) ||
                                                                    item?.quantity,
                                                                handlePlusClick:
                                                                    () =>
                                                                        handlePlusClick(
                                                                            {
                                                                                id: item.id,
                                                                                quantity:
                                                                                    item?.id ==
                                                                                    state
                                                                                        ?.cart
                                                                                        ?.id
                                                                                        ? state
                                                                                              ?.cart
                                                                                              ?.quantity
                                                                                        : parseInt(
                                                                                              item.quantity
                                                                                          ),
                                                                            }
                                                                        ),
                                                                handleMinusClick:
                                                                    () =>
                                                                        handleMinusClick(
                                                                            {
                                                                                id: item.id,
                                                                                quantity:
                                                                                    item?.id ==
                                                                                    state
                                                                                        ?.cart
                                                                                        ?.id
                                                                                        ? state
                                                                                              ?.cart
                                                                                              ?.quantity
                                                                                        : parseInt(
                                                                                              item.quantity
                                                                                          ),
                                                                            }
                                                                        ),
                                                                handleRemoveCartClick:
                                                                    () =>
                                                                        handleRemoveCartClick(
                                                                            item.id
                                                                        ),
                                                            }}
                                                        />
                                                    );
                                                }
                                            }
                                        );
                                    }
                                } else {
                                    return (
                                        <div className="text-center">
                                            <h5>
                                                Please login to view your cart
                                            </h5>
                                        </div>
                                    );
                                }
                            })()}
                        </div>
                        <hr className="mt-4" />
                    </div>
                    {/* <div className="col-8">Subtotal</div>
                    <div className="col-4">
                        <span className=" float-right">35374</span>
                    </div> */}
                    <div className="col-8">Total</div>
                    <div className="col-4">
                        <span className=" float-right">
                            {`$${data?.total_price || "0"}`}
                        </span>
                    </div>
                    <div className="col-md-12">
                        <Link
                            to="/cart"
                            className=" btn btn-block"
                            style={{
                                border: "none",
                                padding: "1.5rem",
                                marginBottom: "1rem",
                                marginTop: "1rem",
                                backgroundColor: "#c5c4c4",
                                color: "white",
                                fontSize: "2rem",
                                fontWeight: "bold",
                            }}
                        >
                            GO TO CHECKOUT
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
