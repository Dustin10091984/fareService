import React, { Component } from 'react';
import { Product } from '../front-end/common/product';
import { Link } from "react-router-dom";
export class  FoodDetails extends Component {
    render() {
        return (
            <>
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
                                    <a href="#" className="button-common-2">
                                        Go Back
                                    </a>
                                    <div className="product-detail-card-item">
                                        <div>
                                            <Link
                                                to="product-detail"
                                                className="product-card box-shadow-none d-flex justify-content-center flex-column"
                                            >
                                                <div className="prod-img mx-auto">
                                                    <img
                                                        src="/assets/img/product.png"
                                                        alt="product"
                                                    />
                                                </div>
                                                <div className="prod-detail">
                                                    <div className="title">
                                                        [two or more lines of
                                                        product title here.]
                                                    </div>
                                                    <div className="sub-title">
                                                        Veg, Non-Vegetarian
                                                    </div>
                                                    <div className="price">
                                                        $100.0
                                                    </div>
                                                    <div className="stars-rating ">
                                                        <div className="star-rating-area d-flex align-items-center justify-content-center">
                                                            <div
                                                                className="rating-static clearfix mr-3"
                                                                rel="4"
                                                            >
                                                                <label
                                                                    className="full"
                                                                    title="{{ 'Awesome - 5 stars' | translate }}"
                                                                ></label>
                                                                <label
                                                                    className="half"
                                                                    title="{{ 'Excellent - 4.5 stars' | translate }}"
                                                                ></label>
                                                                <label
                                                                    className="full"
                                                                    title="{{ 'Excellent - 4 stars' | translate }}"
                                                                ></label>
                                                                <label
                                                                    className="half"
                                                                    title="{{ 'Better - 3.5 stars' | translate }}"
                                                                ></label>
                                                                <label
                                                                    className="full"
                                                                    title="{{ 'Good - 3 stars' | translate }}"
                                                                ></label>
                                                                <label
                                                                    className="half"
                                                                    title="{{ 'Good - 2.5 stars' | translate }}"
                                                                ></label>
                                                                <label
                                                                    className="full"
                                                                    title="{{ 'Fair - 2 stars' | translate }}"
                                                                ></label>
                                                                <label
                                                                    className="half"
                                                                    title="{{ 'Fair - 1.5 stars' | translate }}"
                                                                ></label>
                                                                <label
                                                                    className="full"
                                                                    title="{{ 'Bad - 1 star' | translate }}"
                                                                ></label>
                                                                <label
                                                                    className="half"
                                                                    title="{{ 'Bad - 0.5 stars' | translate }}"
                                                                ></label>
                                                            </div>
                                                            {/* <div className="ratilike ng-binding">5</div> */}
                                                        </div>
                                                    </div>
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
                                    </div>
                                    <Link
                                        to="/product-detail"
                                        className="button-common"
                                    >
                                        Open
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="shop-page pad-y">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="shop-left-box">
                                    <div className="title mt-5 pt-5">
                                        Recommended
                                    </div>

                                    <div className="filters-list">
                                        <label className="filter-check">
                                            Non Veg
                                            <input
                                                type="checkbox"
                                                checked="checked"
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label className="filter-check">
                                            Pure Veg
                                            <input type="checkbox" checked="" />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label className="filter-check">
                                            Free Delivery
                                            <input type="checkbox" checked="" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="shop-left-box">
                                            <div className="title text-center">
                                                Food Store
                                            </div>
                                        </div>

                                        <form
                                            action=""
                                            className="d-flex justify-content-center mb-5 pb-5"
                                        >
                                            <div className="input-box d-flex align-items-center">
                                                <div className="icon-div">
                                                    <svg
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 18 18"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M7.5 1.18269C8.74969 1.18155 9.97165 1.55108 11.0113 2.24454C12.0509 2.938 12.8615 3.92423 13.3405 5.07847C13.8196 6.23271 13.9455 7.50309 13.7024 8.7289C13.4593 9.95472 12.8581 11.0809 11.9748 11.965C11.0916 12.849 9.96593 13.4513 8.74034 13.6955C7.51474 13.9397 6.24425 13.8149 5.08958 13.337C3.9349 12.859 2.94793 12.0493 2.25352 11.0103C1.55911 9.9713 1.18847 8.74969 1.18846 7.5C1.19604 5.82788 1.86325 4.22631 3.04509 3.04339C4.22694 1.86047 5.82789 1.1918 7.5 1.18269ZM7.5 0C6.01664 0 4.56659 0.439867 3.33323 1.26398C2.09986 2.08809 1.13856 3.25943 0.570907 4.62987C0.00324974 6.00032 -0.145275 7.50832 0.144114 8.96318C0.433503 10.418 1.14781 11.7544 2.1967 12.8033C3.2456 13.8522 4.58197 14.5665 6.03682 14.8559C7.49168 15.1453 8.99968 14.9967 10.3701 14.4291C11.7406 13.8614 12.9119 12.9001 13.736 11.6668C14.5601 10.4334 15 8.98336 15 7.5C15 5.51088 14.2098 3.60322 12.8033 2.1967C11.3968 0.790176 9.48913 0 7.5 0Z"
                                                            fill="#B6BCC1"
                                                        />
                                                        <path
                                                            d="M17.84 17.0655L13.7819 13L13 13.7726L17.0581 17.8381C17.1091 17.8891 17.1697 17.9297 17.2364 17.9575C17.3032 17.9853 17.3748 17.9997 17.4471 18C17.5195 18.0003 17.5912 17.9863 17.6581 17.959C17.725 17.9317 17.7859 17.8915 17.8373 17.8408C17.8886 17.7901 17.9294 17.7298 17.9573 17.6634C17.9852 17.5969 17.9997 17.5257 18 17.4537C18.0003 17.3817 17.9863 17.3104 17.9588 17.2438C17.9314 17.1772 17.891 17.1166 17.84 17.0655Z"
                                                            fill="#B6BCC1"
                                                        />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search for Products"
                                                />
                                                <button type="button">
                                                    Search
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-4">
                                        <Product></Product>
                                    </div>
                                    <div className="col-md-4">
                                        <Product></Product>
                                    </div>
                                    <div className="col-md-4">
                                        <Product></Product>
                                    </div>
                                    <div className="col-md-4">
                                        <Product></Product>
                                    </div>
                                    <div className="col-md-4">
                                        <Product></Product>
                                    </div>
                                    <div className="col-md-4">
                                        <Product></Product>
                                    </div>
                                    <div className="col-md-4">
                                        <Product></Product>
                                    </div>
                                    <div className="col-md-4">
                                        <Product></Product>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
