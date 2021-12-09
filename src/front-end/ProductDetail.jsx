import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { getFood } from '../store/Slices/restauransts/restaurantsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { HOST } from "../constants";
import moment from "moment";
import { toast } from "react-toastify";
import { addToCart } from '../store/Slices/cart/cartsSlice';

const ProductDetail = (props) => {
    const { match } = props;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFood(match?.params?.id));
    }, [match?.params?.id]);

    const { food } = useSelector((state) => state.restaurantsReducer);
    const { cart } = useSelector((state) => state.cartsReducer);
    
    const loading = useRef(null);

    useEffect(() => {
        cart?.loading && (loading.current = toast.info("Loading..."));
        cart?.loading == false && toast.dismiss(loading.current);
        !cart?.loading && !cart?.error && cart?.message && toast.success(cart.message);
        !cart?.loading && cart?.error == true && cart?.message && toast.error(cart.message);
    }, [cart?.loading, cart?.error, cart?.message]);

    const handleCartClick = () => {
        dispatch(addToCart({food_id: food?.data?.id, quantity: 1}));
    }
    
    return (
        <>
            <section className="product-detail-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div className="product-title-sec">
                                {food?.data?.name}
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="product-des-imgs">
                                <div className="img-g">
                                    <img
                                        src={
                                            HOST + food?.data?.image ||
                                            "/assets/img/product-d1.jpg"
                                        }
                                        className="img-fluid"
                                        alt=""
                                        onError={(e) => {
                                            e.target.src =
                                                "/assets/img/product-d1.jpg";
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
                                    rating={food?.data?.rating || 0}
                                    isCenter={false}
                                />
                                <div className="detail-price">
                                    {`$${food?.data?.price || 0}`}
                                    {/* <span>$[deduction].00</span> */}
                                </div>
                                <div className="detail-sub-title">
                                    Product description
                                </div>
                                <div className="detail-des-d">
                                    <p>{` ${moment(
                                        food?.data?.created_at
                                    ).format("dddd, MMMM Do YYYY")}`}</p>
                                    <p>{food?.data?.description}</p>
                                </div>
                                {/* <div className="detail-des-d">
                                    <p>
                                        Professional installation by Handy is
                                        included in the price. After you
                                        purchase, Handy will automatically book
                                        and schedule your service for shortly
                                        after your product arrives and send a
                                        confirmation email. You can reschedule
                                        anytime.
                                        <a href="#">Learn more..</a>
                                    </p>
                                </div> */}
                            </div>
                            {cart?.data?.food_id == food?.data?.id ? (
                                <>
                                    <Link
                                        to="/cart"
                                        className="button-common w-100 mt-5"
                                    >
                                        Go to cart
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="button-common w-100 mt-5"
                                        onClick={handleCartClick}
                                    >
                                        Add to Cart
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="col-md-3 mt-5">
                            <div className="add-box"></div>
                        </div>
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
}

export {ProductDetail};