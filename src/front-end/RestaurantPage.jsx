import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductType } from "../constants";
import { addToCart, getCartList } from "../store/Slices/cart/cartsSlice";
import {
    getRestaurant,
    getRestaurantFoods,
} from "../store/Slices/restauransts/restaurantsSlice";
import Rating from "./../components/Rating";
import { ProductCard } from "./common/Cards";
import { Cart } from "./common/Cart";
import Loading from "./common/Loading";
export const RestaurantPage = (props) => {
    const { match, location } = props;
    const dispatch = useDispatch();
    const loading = useRef(null);

    useEffect(() => {
        if (match?.params?.id) {
            dispatch(getRestaurant(match.params.id));
            dispatch(getCartList());
            dispatch(
                getRestaurantFoods({
                    id: match.params.id,
                })
            );
        }
    }, [match?.params?.id]);

    const restaurant = useSelector(
        (state) => state.restaurantsReducer?.restaurant
    );

    const foods = useSelector((state) => state.restaurantsReducer?.foods);

    const cartList = useSelector((state) => state.cartsReducer?.list);

    const cart = useSelector((state) => state.cartsReducer?.cart);

    useEffect(() => {
        if (cart?.error == false && cart?.data) {
            toast.dismiss(loading.current);
            toast.success(cart?.message || "Added to cart");
        }
        if (cart?.error && cart?.loading == false) {
            toast.dismiss(loading.current);
            toast.error(cart?.message || "Something went wrong");
        }
    }, [cart]);

    const handleAddToCart = (id) => {
        toast.dismiss(loading.current);
        loading.current = toast.info("Adding to cart", {
            autoClose: false,
        });
        dispatch(addToCart({ food_id: id, quantity: 1 }));
    };

    return (
        <div className="container-fluid">
            <Loading
                loading={
                    restaurant?.loading || cartList?.loading || foods?.loading
                }
            />
            <div className="row restaurant-page">
                <div
                    className="col-md-9 "
                    style={{
                        paddingRight: "0px",
                    }}
                >
                    <div className="row">
                        <div className="col-md-12">
                            <img
                                src={
                                    restaurant?.data?.cover_image ||
                                    "/assets/img/restaurant.jpg"
                                }
                                className="restaurant-banner"
                            ></img>
                            <div className="col-md-12">
                                <div className="row d-flex align-items-center">
                                    <div className="col-md-8  restaurant-name">
                                        {restaurant?.data?.name}
                                    </div>
                                    <div className="col-md-4 restaurant-rating d-flex justify-content-end">
                                        <Rating rating={3}></Rating>
                                    </div>
                                    <div className="col-md-12 restaurant-address">
                                        {restaurant?.data?.address}
                                    </div>
                                    <div className="col-md-12 restaurant-category">
                                        {restaurant?.data?.about}
                                    </div>
                                </div>
                                <div className="col-md-12 ">
                                    <div className="row mt-4">
                                        {foods?.data?.map((food, index) => {
                                            const {
                                                id,
                                                name,
                                                description,
                                                price,
                                                rating,
                                                image,
                                            } = food;
                                            return (
                                                <div
                                                    className="col-md-6 mb-4"
                                                    key={index}
                                                >
                                                    <ProductCard
                                                        {...{
                                                            id,
                                                            title: name,
                                                            description,
                                                            price: `$${price}`,
                                                            rating,
                                                            image,
                                                            link: `/product-detail/${id}?type=FOOD`,
                                                            handleAddToCart:
                                                                () =>
                                                                    handleAddToCart(
                                                                        id
                                                                    ),
                                                        }}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <Cart data={cartList}></Cart>;
                </div>
            </div>
        </div>
    );
};
