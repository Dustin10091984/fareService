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
                    className="product-card restaurant-card box-shadow-none d-flex justify-content-center flex-column"
                    onClick={() => {
                        window?.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });
                    }}
                >
                    <div className="prod-img ">
                        <img
                            className="img-fluid"
                            src={image}
                            alt=""
                            onError={(e) => {
                                e.target.src = errorImage;
                            }}
                        ></img>
                    </div>
                    {sub_title && <div className="prod-tag">{sub_title}</div>}
                    <div className="prod-detail">
                        <div className="title">
                            {title}{" "}
                            <i className="fa fa-star" aria-hidden="true"
                                style={{
                                    fontSize:"1.5rem",
                                    float: "right",
                                    color: "gold",
                                }}
                            >
                                <span className="text-dark">
                                    &nbsp;{rating || 0}/5
                                </span>
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
            <div className="food-card">
               <div className="row">
               {/* <div className="col-md-4 col-sm-3 col-xs-3 food-img">
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
                </div> */}
                <div className="col-md-12 d-flex justify-content-between">
                    <div className="cart-right-box w-100 position-relative">
                    <div className="cart-remove-btn">
                    <i className="fa fa-times m-0 " onClick={handleRemoveCartClick}
                    ></i>
                    </div>
                    <div className="w-100 mt-3">
                        <div className="card-name pr-5">
                            <div className="text-truncate">
                                {title}
                            </div>
                        </div>
                        <div className="">{price}</div>
                        <div className="float-right product-counter">
                            <span className="font-weight-bold">{quantity}</span>
                            &nbsp;&nbsp;
                            <i
                                className="fa fa-minus"
                                aria-hidden="true"
                                style={{
                                    cursor: "pointer",
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
                                    cursor: "pointer",
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
        <div className="food-card d-flex ">
                <div className="col-md-8 pl-0 d-flex justify-content-between">
                <Link to={link || ""} className="w-100">
                    <div className="w-100 d-flex flex-column justify-content-between h-100">
                        <div className="d-flex align-items-center justify-content-between">
                        <div
                            className="card-name  text-truncate w-100 pr-3"
                            style={{
                                width: "15rem",
                            }}
                        >
                            {title}
                        </div>
                        <div className="">
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
                        <div
                            className="card-description text-truncate w-100"
                            style={{
                                width: "11rem",
                            }}
                        >
                            {description}
                        </div>
                        <div className="text-dark price-card-food">{price}</div>
                    </div>
                    
                </Link>
                </div>
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
                        className="fa fa-plus  food-add-cart"  onClick={handleAddToCart}
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
    data.link = `/grocery-stores-page/${groceryStore.id}`;
    data.image = groceryStore?.profile_image
        ? HOST + groceryStore?.profile_image
        : "/assets/img/food.svg";
    data.errorImage = "/assets/img/food.svg";
    data.title = groceryStore?.name !== null && groceryStore?.name;
    data.rating = groceryStore?.rating !== null && groceryStore?.rating;
    data.description = groceryStore?.about || "";
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
