import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import {
    getFood,
    food as initialFood,
} from "../store/Slices/restauransts/restaurantsSlice";
import {
    getProduct,
    product as initialProduct,
} from "../store/Slices/grocery/groceryStoreSlice";
import { useDispatch, useSelector } from "react-redux";
import { HOST, ProductType } from "../constants";
import moment from "moment";
import { toast } from "react-toastify";
import { addToCart } from "../store/Slices/cart/cartsSlice";
import Loading from "./common/Loading";

const ProductDetail = (props) => {
    const { location, match } = props;
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(initialProduct(""));
            dispatch(initialFood(""));
        };
    }, []);
    useEffect(() => {
        if (type === ProductType.FOOD) {
            dispatch(getFood(match?.params?.id));
        }
        if (type === ProductType.GROCERY) {
            dispatch(getProduct(match?.params?.id));
        }
    }, [match?.params?.id]);

    const { food } = useSelector((state) => state.restaurantsReducer);
    const { cart } = useSelector((state) => state.cartsReducer);
    const { list } = useSelector((state) => state.cartsReducer);

    const { product } = useSelector((state) => state.groceryStoreReducer);

    const loading = useRef(null);

    useEffect(() => {
        cart?.loading &&
            (loading.current = toast.info("Loading...", {
                autoClose: false,
            }));
        cart?.loading == false && toast.dismiss(loading.current);
        !cart?.loading &&
            !cart?.error &&
            cart?.message &&
            toast.success(cart.message);
        !cart?.loading &&
            cart?.error == true &&
            cart?.message &&
            toast.error(cart.message);
    }, [cart?.loading, cart?.error, cart?.message]);

    const handleCartClick = () => {
        let data = { quantity: 1 };
        type === ProductType.FOOD && (data.food_id = food?.data?.id);
        type === ProductType.GROCERY && (data.product_id = product?.data?.id);
        dispatch(addToCart(data));
    };

    return (
        <>
            <section className="product-detail-sec">
                <Loading loading={food?.loading || product?.loading} />
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div className="product-title-sec">
                                {food?.data?.name || product?.data?.name}
                            </div>
                        </div>
                        {(type === ProductType.FOOD ||
                            type === ProductType.GROCERY) && (
                            <>
                                <div className="col-md-12">
                                    <div className="product-des-imgs">
                                        <div className="">
                                            <img
                                                src={
                                                    (food?.data?.image &&
                                                        HOST +
                                                            food?.data
                                                                ?.image) ||
                                                    (product?.data?.image &&
                                                        HOST +
                                                            product?.data
                                                                ?.image) ||
                                                    "/assets/img/food.svg"
                                                }
                                                className="img-fluid"
                                                alt=""
                                                onError={(e) => {
                                                    e.target.src =
                                                        "/assets/img/food.svg";
                                                }}
                                                style={{
                                                    width: "100%",
                                                    height: "400px",
                                                    borderRadius: "2rem",
                                                }}
                                            />
                                        </div>
                                        {/* <div className="img-g">
                                    <img
                                        src="/assets/img/product-d2.jpg"
                                        className="img-fluid"
                                        alt=""
                                    />
                                </div>
                                <div className="img-g">
                                    <img
                                        src="/assets/img/product-d3.jpg"
                                        className="img-fluid"
                                        alt=""
                                    />
                                </div> */}
                                    </div>
                                </div>
                                <div className="col-md-9 mt-5">
                                    <div className="detail-ses-box mt-5">
                                        <Rating
                                            rating={
                                                food?.data?.rating ||
                                                product?.data?.rating ||
                                                0
                                            }
                                            isCenter={false}
                                        />
                                        <div className="detail-price">
                                            {`$${
                                                food?.data?.price ||
                                                product?.data?.price ||
                                                0
                                            }`}
                                            {/* <span>$[deduction].00</span> */}
                                        </div>
                                        <div className="detail-sub-title">
                                            Product description
                                        </div>
                                        <div className="detail-des-d">
                                            <p>{` ${moment(
                                                food?.data?.created_at ||
                                                    product?.data?.created_at
                                            ).format(
                                                "dddd, MMMM Do YYYY"
                                            )}`}</p>
                                            <p>
                                                {food?.data?.description ||
                                                    product?.data?.description}
                                            </p>
                                        </div>
                                    </div>
                                    {(() => {
                                        let check =
                                            (cart?.data?.food_id ==
                                                food?.data?.id &&
                                                cart?.data?.food_id !==
                                                    undefined &&
                                                food?.data?.id !== undefined) ||
                                            (cart?.data?.product_id ==
                                                product?.data?.id &&
                                                cart?.data?.product_id !==
                                                    undefined &&
                                                product?.data?.id !==
                                                    undefined) ||
                                            list?.cart?.find(
                                                (item) =>
                                                    item?.food_id ==
                                                        match?.params?.id ||
                                                    item?.product_id ==
                                                        match?.params?.id
                                            );
                                        if (check) {
                                            return (
                                                <Link
                                                    to="/cart"
                                                    className="button-common w-100 mt-5"
                                                >
                                                    Go to cart
                                                </Link>
                                            );
                                        } else {
                                            return localStorage.getItem(
                                                "userToken"
                                            ) ? (
                                                <button
                                                    className="button-common w-100 mt-5"
                                                    onClick={handleCartClick}
                                                >
                                                    Add to Cart
                                                </button>
                                            ) : (
                                                <Link
                                                    to="/login"
                                                    className="button-common w-100 mt-5"
                                                >
                                                    Login for add to cart
                                                </Link>
                                            );
                                        }
                                    })()}
                                </div>
                                <div className="col-md-3 mt-5">
                                    <div className="add-box"></div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* <div className="row pad-y">
                        <div className="col-12">
                            <div className="common-heading text-center">
                                <div className="title">Related Products</div>

                            </div>
                        </div>
                        <div className="col-md-3">
                            <Product></Product>
                        </div>
                        <div className="col-md-3">
                            <Product></Product>
                        </div>
                        <div className="col-md-3">
                            <Product></Product>
                        </div>
                        <div className="col-md-3">
                            <Product></Product>
                        </div>
                    </div> */}
                </div>
            </section>
        </>
    );
};

export { ProductDetail };
