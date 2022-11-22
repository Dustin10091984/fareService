import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Rating from "../../components/Rating";
export const Product = (props) => {
    return (
        <>
            <div>
                <Link
                    to="food-details"
                    className="product-card d-flex justify-content-center flex-column"
                >
                    <div className="prod-img mx-auto">
                        <img
                            className="col-12"
                            src="/assets/img/product.png"
                            alt="product image"
                        />
                    </div>
                    <div className="prod-detail">
                        <div className="title">
                            [two or more lines of product title here.]
                        </div>
                        <div className="sub-title">Veg, Non-Vegetarian</div>
                        <div className="price">$100.0</div>
                        <Rating rating={""} />
                        <div className="text-center">
                            <button
                                // to='/food-detail'
                                className="button-common"
                            >
                                View Menu
                            </button>
                            <button className="button-common-2 d-none">
                                Closed
                            </button>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
 
}