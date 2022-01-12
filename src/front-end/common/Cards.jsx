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
    description,
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
                    <div className="prod-img ">
                        <img
                            src={image}
                            alt=""
                            onError={(e) => {
                                e.target.src = errorImage;
                            }}
                        ></img>
                    </div>
                    <div className="prod-tag">{sub_title}</div>
                    <div className="prod-detail">
                        <div className="title">
                            {title}{" "}
                            <i
                                className="fa fa-star"
                                aria-hidden="true"
                                style={{
                                    float: "right",
                                    color: "gold",
                                }}
                            >
                                <span className="text-dark">&nbsp;4.6/5</span>
                            </i>
                        </div>
                        <div className="desc text-truncate">{description}</div>
                        {price && <div className="price">{`$${price}`}</div>}
                    </div>
                </Link>
            </div>
        </>
    );
};

export const CheckOutCard = ({
    id,
    image,
    title,
    price,
    quantity,
    handlePlusClick,
    handleMinusClick,
    handleRemoveCartClick,
}) => {
    return (
        <div className="col-md-12 col-sm-12 col-xs-12 mb-4">
            <div className="food-card d-flex">
                <div className="col-md-4 col-sm-3 col-xs-3 food-img">
                    <img
                        style={{
                            zIndex: "0",
                        }}
                        src={image}
                        className="food-img align-self-center img-fluid"
                        onError={(e) => {
                            e.target.src = "/assets/img/food.svg";
                        }}
                    ></img>
                </div>
                <div className="col-md-8 col-sm-9 col-xs-9 d-flex justify-content-between">
                    <i
                        className="fa fa-times-circle-o"
                        aria-hidden="true"
                        style={{
                            color: "#474747",
                            cursor: "default",
                            position: "absolute",
                            fontSize: "2.5rem",
                            top: "-1rem",
                            right: "-1rem",
                        }}
                        onClick={handleRemoveCartClick}
                    ></i>
                    <div className="align-self-start mt-3">
                        <div className="align-self-start card-name">
                            <div
                                className="text-truncate"
                                style={{
                                    width: "19rem",
                                }}
                            >
                                {title}
                            </div>
                        </div>
                        <div className="">{price}</div>
                        <div className="float-right">
                            <span className="font-weight-bold">{quantity}</span>
                            &nbsp;&nbsp;
                            <i
                                className="fa fa-minus"
                                aria-hidden="true"
                                style={{
                                    cursor: "default",
                                    color: "white",
                                    backgroundColor: "blue",
                                    borderRadius: "100%",
                                    padding: ".4rem",
                                    paddingLeft: ".5rem",
                                    paddingRight: ".5rem",
                                }}
                                onClick={handleMinusClick}
                            ></i>
                            &nbsp;
                            <i
                                className="fa fa-plus"
                                aria-hidden="true"
                                style={{
                                    cursor: "default",
                                    color: "white",
                                    backgroundColor: "#fea629",
                                    borderRadius: "100%",
                                    padding: ".4rem",
                                    paddingLeft: ".5rem",
                                    paddingRight: ".5rem",
                                }}
                                onClick={handlePlusClick}
                            ></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ProductCard = ({
    id,
    title,
    description,
    price,
    rating,
    image,
    link,
    handleAddToCart,
}) => {
    return (
        <div className="food-card d-flex">
            <Link to={link || ""}>
                <div className="col-md-8 d-flex justify-content-between">
                    <div className="align-self-center">
                        <div
                            className="align-self-start card-name d-inline-block text-truncate"
                            style={{
                                width: "15rem",
                            }}
                        >
                            {title}
                        </div>
                        <div
                            className="align-self-end card-description d-inline-block text-truncate"
                            style={{
                                width: "11rem",
                            }}
                        >
                            {description}
                        </div>
                        <div className="text-dark">{price}</div>
                    </div>
                    <div className="align-self-end mb-3">
                        <i
                            className="fa fa-star"
                            aria-hidden="true"
                            style={{
                                float: "right",
                                color: "gold",
                            }}
                        >
                            <span className="text-dark">&nbsp;{rating}/5</span>
                        </i>
                    </div>
                </div>
            </Link>
            <div className="col-md-4 food-img">
                <Link to={link || ""}>
                    <img
                        style={{
                            zIndex: "0",
                        }}
                        src={`${HOST}${image}` || "/assets/img/shop-home.jpg"}
                        className="food-img align-self-center img-fluid"
                        onError={(e) => {
                            e.target.src = "/assets/img/shop-home.jpg";
                        }}
                    ></img>
                </Link>
                <i
                    className="fa fa-plus-square fa-2x food-add-cart"
                    aria-hidden="true"
                    style={{
                        cursor: "default",
                    }}
                    onClick={handleAddToCart}
                ></i>
            </div>
        </div>
    );
};

export const Restaurant = ({ restaurant }) => {
    let data = {};
    data.link = `/restaurant-page/${restaurant.id}`;
    data.image = restaurant?.profile_image
        ? HOST + restaurant?.profile_image
        : "/assets/img/food.svg";
    data.errorImage = "/assets/img/food.svg";
    data.title = restaurant?.name !== null && restaurant?.name;
    data.sub_title = (restaurant?.restaurant_type !== null &&
        restaurant?.restaurant_type) || <span>&nbsp;</span>;
    data.rating = restaurant?.rating !== null && restaurant?.rating;
    data.description = restaurant?.about || "";
    data.viewMenu = false;
    return <Card {...data} />;
};

export const Food = ({ food, props }) => {
    let data = {};
    data.link = food.link;
    data.image = food?.image ? HOST + food?.image : "/assets/img/food.svg";
    data.errorImage = "/assets/img/food.svg";
    data.title = food?.name !== null && food?.name;
    data.sub_title = (food !== null && food?.restaurant_type) || (
        <span>&nbsp;</span>
    );
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

// export const ProductCard = ({ product, props }) => {
//     let data = {};
//     data.link = product.link;
//     data.image = product?.image
//         ? HOST + product?.image
//         : "/assets/img/food.svg";
//     data.errorImage = "/assets/img/food.svg";
//     data.title = product?.name !== null && product?.name;
//     data.sub_title = product !== null && product?.restaurant_type;
//     data.price = product?.price !== null && product?.price;
//     data.rating = product?.rating !== null && product?.rating;
//     return <Card {...data} />;
// };
