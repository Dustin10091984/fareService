import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GroceryStoreCard, ProductCard } from "./common/Cards";
import { useDispatch, useSelector } from "react-redux";
import {
    getGroceryStores,
    getGroceryStore,
    getProducts,
    getProduct,
} from "./../store/Slices/grocery/groceryStoreSlice";
import { HOST, ProductType } from "../constants";
import Rating from "./../components/Rating";
import Paginate from "./../components/Paginate";

export const GroceryStore = (props) => {
    const { match, history, location } = props;

    const dispatch = useDispatch();

    /**
     * @GroceryStore get from redux store
     */
    const list = useSelector((state) => state.groceryStoreReducer?.list);
    const listMeta = useSelector(
        (state) => state.groceryStoreReducer?.list?.meta
    );
    const groceryStoreLoading = useSelector(
        (state) => state.groceryStoreReducer?.groceryStore?.loading
    );
    const groceryStoreData = useSelector(
        (state) => state.groceryStoreReducer?.groceryStore?.data
    );
    const groceryStoreLinks = useSelector(
        (state) => state.groceryStoreReducer?.groceryStore?.links
    );
    const groceryStoreMeta = useSelector(
        (state) => state.groceryStoreReducer?.groceryStore?.meta
    );
    const groceryStoreError = useSelector(
        (state) => state.groceryStoreReducer?.groceryStore?.error
    );
    const groceryStoreMessage = useSelector(
        (state) => state.groceryStoreReducer?.groceryStore?.message
    );

    const productsLoading = useSelector(
        (state) => state.groceryStoreReducer?.products?.loading
    );
    const productsData = useSelector(
        (state) => state.groceryStoreReducer?.products?.data
    );
    const productsLinks = useSelector(
        (state) => state.groceryStoreReducer?.products?.links
    );
    const productsMeta = useSelector(
        (state) => state.groceryStoreReducer?.products?.meta
    );
    const productsError = useSelector(
        (state) => state.groceryStoreReducer?.products?.error
    );
    /**
     * @useEffect is used to call the action
     */
    useEffect(() => {
        dispatch(getGroceryStores());
    }, []);

    useEffect(() => {
        if (match?.params?.id) {
            dispatch(getGroceryStore(match.params.id));
            dispatch(getProducts({ id: match.params.id }));
        }
    }, [match?.params?.id]);

    const Worker = ({ productId }) => {
        return (() => {
            if (groceryStoreLoading == true) {
                return (
                    <div
                        className="col-12  alert alert-info text-center"
                        role="alert"
                        style={{ fontSize: 15 }}
                    >
                        <i className="fa fa-spinner fa-spin fa-10x"></i>{" "}
                        Processing...
                    </div>
                );
            }
            if (groceryStoreError) {
                return (
                    <div
                        className="col-12  alert alert-danger text-center"
                        role="alert"
                        style={{ fontSize: 15 }}
                    >
                        {groceryStoreMessage}
                    </div>
                );
            }
            if ((groceryStoreError == false && groceryStoreData) || productId) {
                const product =
                    productId &&
                    productsData?.find((product) => product.id == productId);
                return (
                    <>
                        {product && (
                            <button
                                onClick={() => {
                                    history.push(
                                        `/grocery-stores/${product.grocer_id}`
                                    );
                                }}
                                className="button-common-2"
                            >
                                Go Back
                            </button>
                        )}
                        <div className="product-detail-card-item">
                            <div>
                                <span className="product-card box-shadow-none d-flex justify-content-center flex-column">
                                    <div className="prod-img mx-auto">
                                        <img
                                            className="img-fluid"
                                            src={
                                                (productId &&
                                                    HOST + product?.image) ||
                                                HOST +
                                                    groceryStoreData?.image ||
                                                "/assets/img/food.svg"
                                            }
                                            alt=""
                                            onError={(e) => {
                                                e.target.src =
                                                    "/assets/img/food.svg";
                                            }}
                                        />
                                    </div>
                                    <div className="prod-detail">
                                        <div className="title">
                                            {(productId && product?.name) ||
                                                groceryStoreData?.name}
                                        </div>
                                        {/* <div className="sub-title col-md-12 text-truncate">
                                            {(productId && product?.name) ||
                                                restaurantData?.restaurant_type}
                                        </div> */}
                                        {productId && product?.price && (
                                            <div className="price">
                                                {`$${product?.price}`}
                                            </div>
                                        )}
                                        <Rating
                                            rating={
                                                groceryStoreData?.user?.rating
                                            }
                                        />
                                        {/* <div className="text-center">
                                <button className="button-common d-none">
                                View Menu
                                </button>
                                <button className="button-common-2 d-none">
                                Closed
                                </button>
                            </div> */}
                                    </div>
                                </span>
                            </div>
                        </div>
                        {product && (
                            <Link
                                to={`/product-detail/${product.id}?type=${ProductType.GROCERY}`}
                                className="button-common"
                            >
                                Open
                            </Link>
                        )}
                    </>
                );
            }
            return "";
        })();
    };
    return (
        <>
            <div
                className="breadcrumb-sec d-flex align-items-center justify-content-center"
                style={{
                    backgroundImage: `url("/assets/img/bread-bg.jpg")`,
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="shop-search d-flex align-items-center justify-content-center mx-auto">
                                <div className="header-search d-flex align-items-center justify-content-center flex-column">
                                    {match?.params?.id ? (
                                        <div className="shop-search prod-des-card d-flex align-items-center justify-content-center mx-auto">
                                            <Worker
                                                productId={
                                                    match?.params?.productId
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            <div className="shop-serch-title mb-5">
                                                Search Store
                                            </div>
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
                                        </>
                                    )}
                                </div>
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
                                <div className="title">Search Filters</div>

                                <div className="filters-list">
                                    <label className="filter-check">
                                        North Indian products
                                        <input
                                            type="checkbox"
                                            // checked="checked"
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="filter-check">
                                        South Indian products
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="filter-check">
                                        American products
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="filter-check">
                                        Arabian products
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="filter-check">
                                        Bakers
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="filter-check">
                                        Asian
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="filter-check">
                                        African products
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                                <div className="title mt-5 pt-5">
                                    Quick Filters
                                </div>

                                <div className="filters-list">
                                    <label className="filter-check">
                                        Non Veg
                                        <input
                                            type="checkbox"
                                            // checked="checked"
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="filter-check">
                                        Pure Veg
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="filter-check">
                                        Free Delivery
                                        <input type="checkbox" />
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
                                            {match?.params?.id
                                                ? "Products"
                                                : "Grocery Stores"}
                                        </div>
                                    </div>
                                </div>
                                {match?.params?.id == undefined &&
                                    list?.data?.map((store, index) => (
                                        <div
                                            key={index}
                                            className="col-md-4 col-sm-6"
                                        >
                                            <GroceryStoreCard
                                                groceryStore={store}
                                            ></GroceryStoreCard>
                                        </div>
                                    ))}
                                {match?.params?.id &&
                                    productsData?.map((product, index) => (
                                        <div
                                            key={index}
                                            className="col-md-4 col-sm-6"
                                        >
                                            <ProductCard
                                                props={props}
                                                product={product}
                                            ></ProductCard>
                                        </div>
                                    ))}
                                {/* <div className="col-md-4"> */}
                                {/* <Product></Product> */}
                                {/* </div> */}
                            </div>
                            <div className="row">
                                <div className="col-12 m-5 d-flex justify-content-center">
                                    {(() => {
                                        let data = {
                                            current_page: 0,
                                            total: 0,
                                        };
                                        if (match?.params?.id) {
                                            data.id = match?.params?.id;
                                            data.last_page =
                                                productsMeta?.last_page;
                                            data.current_page =
                                                productsMeta?.current_page;
                                            data.func = getProducts;
                                            return <Paginate {...data} />;
                                        }
                                        if (!match?.params?.id && listMeta) {
                                            data.last_page =
                                                listMeta?.last_page;
                                            data.current_page =
                                                listMeta?.current_page;
                                            data.func = getGroceryStores;
                                            return <Paginate {...data} />;
                                        }
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
