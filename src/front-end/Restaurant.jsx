import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Restaurant as RestaurantCard, Food } from "./common/Cards";
import { useDispatch, useSelector } from "react-redux";
import {
    getRestaurants,
    getRestaurant,
    getRestaurantFoods,
} from "../store/Slices/restauransts/restaurantsSlice";
import Rating from "../components/Rating";
import { HOST, ProductType } from "../constants";
import Paginate from "./../components/Paginate";
import Loading from "./common/Loading";
export const Restaurant = (props) => {
    /**
     * @location and @history get from props
     */
    const { location, history, match } = props;
    /**
     * @state is the state of the component
     */
    const [state, setState] = useState();

    /**
     * @dispatch is used to dispatch actions
     */
    const dispatch = useDispatch();

    /**
     * @Restaurants get from redux store
     */
    const list = useSelector((state) => state.restaurantsReducer?.list);
    const listMeta = useSelector(
        (state) => state.restaurantsReducer?.list?.meta
    );
    const restaurantLoading = useSelector(
        (state) => state.restaurantsReducer?.restaurant?.loading
    );
    const restaurantData = useSelector(
        (state) => state.restaurantsReducer?.restaurant?.data
    );
    const restaurantError = useSelector(
        (state) => state.restaurantsReducer?.restaurant?.error
    );
    const restaurantMessage = useSelector(
        (state) => state.restaurantsReducer?.restaurant?.message
    );

    const foodsLoading = useSelector(
        (state) => state.restaurantsReducer?.foods?.loading
    );
    const foodsData = useSelector(
        (state) => state.restaurantsReducer?.foods?.data
    );
    const foodsLinks = useSelector(
        (state) => state.restaurantsReducer?.foods?.links
    );
    const foodsMeta = useSelector(
        (state) => state.restaurantsReducer?.foods?.meta
    );
    const foodsError = useSelector(
        (state) => state.restaurantsReducer?.foods?.error
    );
    const foodsMsg = useSelector(
        (state) => state.restaurantsReducer?.foods?.message
    );

    /**
     * @useEffect is used to call the action
     */
    useEffect(() => {
        if (match?.params?.id) {
            dispatch(getRestaurant(match.params.id));
            dispatch(getRestaurantFoods({ id: match.params.id }));
        } else {
            dispatch(getRestaurants({ params: "" }));
        }
    }, [match?.params?.id]);

    const Worker = ({ foodId }) => {
        return (() => {
            if (restaurantLoading == true) {
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

            if (restaurantError) {
                return (
                    <div
                        className="col-12  alert alert-danger text-center"
                        role="alert"
                        style={{ fontSize: 15 }}
                    >
                        {restaurantMessage}
                    </div>
                );
            }

            if ((restaurantError == false && restaurantData) || foodId) {
                const food =
                    foodId && foodsData?.find((food) => food.id == foodId);
                return (
                    <>
                        {food && (
                            <button
                                onClick={() => {
                                    history.push(
                                        `/restaurants/${food.restaurant_id}`
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
                                                (foodId &&
                                                    HOST + food?.image) ||
                                                HOST + restaurantData?.image ||
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
                                            {(foodId && food?.name) ||
                                                restaurantData?.name}
                                        </div>
                                        <div className="sub-title col-md-12 text-truncate">
                                            {(foodId && food?.name) ||
                                                restaurantData?.restaurant_type}
                                        </div>
                                        {foodId && food?.price && (
                                            <div className="price">
                                                {`$${food?.price}`}
                                            </div>
                                        )}
                                        <Rating
                                            rating={
                                                restaurantData?.user?.rating
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
                        {food && (
                            <Link
                                to={`/product-detail/${food.id}?type=${ProductType.FOOD}`}
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
                className="breadcrumb-sec product-detail-bread d-flex align-items-center justify-content-center"
                style={{ backgroundImage: `url("/assets/img/restaurant.jpg")` }}
            >
                <Loading
                    loading={restaurantLoading || foodsLoading || list?.loading}
                />
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {match?.params?.id ? (
                                <div className="shop-search prod-des-card d-flex align-items-center justify-content-center mx-auto">
                                    <Worker foodId={match?.params?.foodId} />
                                </div>
                            ) : (
                                <div className="shop-search d-flex align-items-center justify-content-center mx-auto">
                                    <div className="header-search d-flex align-items-center justify-content-center flex-column">
                                        <div className="shop-serch-title mb-5">
                                            Popular Restaurants
                                        </div>
                                        <form action="">
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
                                                    placeholder="Search for Restaurants"
                                                    onChange={(e) => {
                                                        setState({
                                                            ...state,
                                                            search: `?${e.target.value}`,
                                                        });
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (state?.search)
                                                            dispatch(
                                                                getRestaurants({
                                                                    params: state?.search,
                                                                })
                                                            );
                                                    }}
                                                >
                                                    Search
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
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
                                        North Indian
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="filter-check">
                                        South Indian
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="filter-check">
                                        American
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="filter-check">
                                        Arabian
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
                                        African
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
                                        <input type="checkbox" />
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
                        <div className="col-md-9 col-sm-9">
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <div className="shop-left-box">
                                        <div className="title text-center">
                                            {match?.params?.id
                                                ? "Foods"
                                                : "Restaurants"}
                                        </div>
                                    </div>
                                </div>
                                {foodsError ? (
                                    <div
                                        className="col-12  alert alert-danger text-center"
                                        role="alert"
                                        style={{ fontSize: 15 }}
                                    >
                                        {foodsMsg}
                                    </div>
                                ) : (
                                    <>
                                        {match?.params?.id == undefined &&
                                            list?.data?.map(
                                                (restaurant, index) => (
                                                    <div
                                                        key={index}
                                                        className="col-md-4 col-sm-6"
                                                    >
                                                        <RestaurantCard
                                                            restaurant={
                                                                restaurant
                                                            }
                                                        ></RestaurantCard>
                                                    </div>
                                                )
                                            )}
                                        {match?.params?.id &&
                                            foodsData?.map((food, index) => (
                                                <div
                                                    key={index}
                                                    className="col-md-4 col-sm-6"
                                                >
                                                    <Food
                                                        props={props}
                                                        food={food}
                                                    ></Food>
                                                </div>
                                            ))}
                                    </>
                                )}
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    {(() => {
                                        let data = {
                                            current_page: 0,
                                            total: 0,
                                        };
                                        if (match?.params?.id && foodsMeta) {
                                            data.id = match?.params?.id;
                                            data.last_page =
                                                foodsMeta?.last_page;
                                            data.current_page =
                                                foodsMeta?.current_page;
                                            data.func = getRestaurantFoods;
                                            return <Paginate {...data} />;
                                        }
                                        if (!match?.params?.id && listMeta) {
                                            data.last_page =
                                                listMeta?.last_page;
                                            data.current_page =
                                                listMeta?.current_page;
                                            data.func = getRestaurants;
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
