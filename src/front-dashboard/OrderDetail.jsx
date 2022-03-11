import React, { useState, useEffect, useRef } from "react";
import Rating from "./../components/Rating";
import { useSelector, useDispatch } from "react-redux";
import { getOrder } from "./../store/Slices/order/orderSlice";
import { Link } from "react-router-dom";
import Loading from "../front-end/common/Loading";
import { HOST } from "../constants";

export const OrderDetail = (props) => {
    const { match } = props;

    const dispatch = useDispatch();

    const order = useSelector((state) => state.orderReducer.showOrder);

    useEffect(() => {
        dispatch(getOrder(match?.params?.id));
    }, []);

    return (
        <>
            <Loading loading={order?.loading} />
            <div
                className="breadcrumb-sec product-detail-bread d-flex align-items-center justify-content-center"
                style={{
                    backgroundImage: `url("/assets/img/bread-bg.jpg")`,
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="shop-search prod-des-card d-flex align-items-center justify-content-center mx-auto">
                                {/* <a href="#" className="button-common-2">
                                    Go Back
                                </a> */}
                                {order?.error ? (
                                    <div className="col-md-12 order-box-des">
                                        <div className="order-num text-center">
                                            Not Found Data
                                        </div>
                                    </div>
                                ) : (
                                    <div className="product-detail-card-item">
                                        {(() => {
                                            let orderItem =
                                                order?.data?.food ||
                                                order?.data?.product;
                                            let orderProvider =
                                                order?.data?.restaurant ||
                                                order?.data?.grocery_store;
                                            return (
                                                <div>
                                                    <Link
                                                        to="product-detail"
                                                        className="product-card box-shadow-none d-flex justify-content-center flex-column"
                                                    >
                                                        <div className="prod-img mx-auto">
                                                            <img
                                                                className="img-fluid"
                                                                src={
                                                                    (orderItem?.image &&
                                                                        `${HOST}${orderItem?.image}`) ||""
                                                                }
                                                                alt=""
                                                                onError={(
                                                                    e
                                                                ) => {
                                                                    e.target.onerror =
                                                                        null;
                                                                    e.target.src =
                                                                        "/assets/img/product.png";
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="prod-detail">
                                                            <div className="title">
                                                                {
                                                                    orderItem?.name
                                                                }
                                                            </div>
                                                            <div className="sub-title">
                                                                {
                                                                    orderProvider?.name
                                                                }
                                                            </div>
                                                            <div className="price">
                                                                {`$${orderItem?.price}`}
                                                            </div>
                                                            {(orderItem?.rating && (
                                                                <Rating
                                                                    rating={
                                                                        orderItem?.rating
                                                                    }
                                                                />
                                                            )) ||
                                                                ""}
                                                            <div className="text-center">
                                                                <button className="button-common d-none">
                                                                    View Menu
                                                                </button>
                                                                <button className="button-common-2 d-none">
                                                                    Closed
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                )}
                                {/* <a href="#" className="button-common">
                                    Open
                                </a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashborad-box order-history pad-y">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title">Order Details</div>
                        </div>
                        {order?.error ? (
                            <div className="col-md-12 order-box-des d-flex  align-items-center justify-content-center">
                                <div className="order-num">Not Found Data</div>
                            </div>
                        ) : (
                            <>
                                {(() => {
                                    let orderItem =
                                        order?.data?.food ||
                                        order?.data?.product;
                                    let orderProvider =
                                        order?.data?.restaurant ||
                                        order?.data?.grocery_store;
                                    return (
                                        <>
                                            <div className="col-md-12">
                                                <div className="order-box-des d-flex  align-items-center justify-content-between">
                                                    <div>
                                                        <div className="order-num">
                                                            Order Details
                                                        </div>
                                                        <div className="order-title">
                                                            Order Number
                                                        </div>
                                                    </div>
                                                    <div className="div">
                                                        <div className="order-number">
                                                            {
                                                                order?.data
                                                                    ?.order_no
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="order-box-des d-flex  align-items-center justify-content-between">
                                                    <div>
                                                        <div className="order-num">
                                                            Payment Method
                                                        </div>
                                                        <div className="order-title">
                                                            {order?.data
                                                                ?.payment_type ==
                                                            "CARD"
                                                                ? "Card"
                                                                : "Cash"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="order-box-des d-flex  align-items-center justify-content-between">
                                                    <div>
                                                        <div className="order-num active">
                                                            {
                                                                order?.data
                                                                    ?.quantity
                                                            }{" "}
                                                            x
                                                        </div>
                                                        <div className="order-title">
                                                            {orderItem?.name}
                                                        </div>
                                                    </div>
                                                    <div className="div">
                                                        <div className="order-number">
                                                            {`$${order?.data?.total_amount}`}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="order-box-des">
                                                    <div>
                                                        <div className="order-title mb-5">
                                                            Subtotal
                                                        </div>
                                                    </div>

                                                    <div className="d-flex subtotal-box  align-items-center justify-content-between mb-4">
                                                        <div>
                                                            <div className="order-num">
                                                                Total
                                                            </div>
                                                        </div>
                                                        <div className="div">
                                                            <div className="order-number bg-none">
                                                                {`$${order?.data?.total_amount}`}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="d-flex subtotal-box align-items-center justify-content-between  mb-4">
                                                <div>
                                                    <div className="order-num">
                                                        Discount
                                                    </div>
                                                </div>
                                                <div className="div">
                                                    <div className="order-number">
                                                        -RS 240.00
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex subtotal-box align-items-center justify-content-between  mb-4">
                                                <div>
                                                    <div className="order-num">
                                                        Tax
                                                    </div>
                                                </div>
                                                <div className="div">
                                                    <div className="order-number pink">
                                                        -RS 240.00
                                                    </div>
                                                </div>
                                            </div> */}

                                                    {/* <div className="text-right mt-5 pt-5">
                                                        <button className="button-common">
                                                            Reorder
                                                        </button>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </>
                                    );
                                })()}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
