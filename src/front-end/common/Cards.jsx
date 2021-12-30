import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../../components/Rating";
import { HOST } from "./../../constants";
const Card = ({
    link,
    image,
    errorImage,
    title,
    sub_title,
    price,
    rating,
    viewMenu,
}) => {
    return (
        <>
            <div>
                <Link
                    to={link}
                    className="product-card d-flex justify-content-center flex-column"
                    onClick={() => {
                        window?.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });
                    }}
                >
                    <div className="prod-img mx-auto">
                        <img
                            className="col-12"
                            src={image}
                            alt=""
                            onError={(e) => {
                                e.target.src = errorImage;
                            }}
                        />
                    </div>
                    <div className="prod-detail">
                        <div className="title">{title}</div>
                        {sub_title && (
                            <div className="sub-title">{sub_title}</div>
                        )}
                        {price && <div className="price">{`$${price}`}</div>}
                        {rating ? <Rating rating={rating} /> : ""}
                        {viewMenu ? (
                            <div className="text-center">
                                <button className="button-common">
                                    View Menu
                                </button>
                                <button className="button-common-2 d-none">
                                    Closed
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </Link>
            </div>
        </>
    );
};

export const Restaurant = ({ restaurant }) => {
    let data = {};
    data.link = `/restaurants/${restaurant.id}`;
    data.image = restaurant?.image
        ? HOST + restaurant?.image
        : "/assets/img/food.svg";
    data.errorImage = "/assets/img/food.svg";
    data.title = restaurant?.name !== null && restaurant?.name;
    data.sub_title =
        restaurant?.restaurant_type !== null && restaurant?.restaurant_type;
    data.rating = restaurant?.rating !== null && restaurant?.rating;
    data.viewMenu = true;
    return <Card {...data} />;
};

export const Food = ({ food, props }) => {
    let data = {};
    data.link = `/restaurants/${props?.match?.params?.id}/foods/${food.id}`;
    data.image = food?.image ? HOST + food?.image : "/assets/img/food.svg";
    data.errorImage = "/assets/img/food.svg";
    data.title = food?.name !== null && food?.name;
    data.sub_title = food !== null && food?.restaurant_type;
    data.price = food?.price !== null && food?.price;
    data.rating = food?.rating !== null && food?.rating;
    return <Card {...data} />;
};

export const GroceryStoreCard = ({ groceryStore }) => {
    let data = {};
    data.link = `/grocery-stores/${groceryStore.id}`;
    data.image = groceryStore?.image
        ? HOST + groceryStore?.image
        : "/assets/img/food.svg";
    data.errorImage = "/assets/img/food.svg";
    data.title = groceryStore?.name !== null && groceryStore?.name;
    data.rating = groceryStore?.rating !== null && groceryStore?.rating;
    return <Card {...data} />;
};

export const ProductCard = ({ product, props }) => {
    let data = {};
    data.link = `/grocery-stores/${props?.match?.params?.id}/product/${product.id}`;
    data.image = product?.image
        ? HOST + product?.image
        : "/assets/img/food.svg";
    data.errorImage = "/assets/img/food.svg";
    data.title = product?.name !== null && product?.name;
    data.sub_title = product !== null && product?.restaurant_type;
    data.price = product?.price !== null && product?.price;
    data.rating = product?.rating !== null && product?.rating;
    return <Card {...data} />;
};
