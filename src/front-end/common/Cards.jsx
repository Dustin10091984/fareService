import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Rating from "../../components/Rating";
import { HOST } from "./../../constants";
const Card = ({ restaurant, food, props }) => {
    return (
        <>
            <div>
                {
                    (restaurant || food) && (
                        <Link
                            to={{
                                pathname: restaurant
                                    ? `/restaurants/${restaurant.id}`
                                    : `/restaurants/${props?.match?.params?.id}/foods/${food.id}`,
                            }}
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
                                    src={
                                        (restaurant &&
                                            restaurant?.image !== null &&
                                            HOST + restaurant?.image) ||
                                        (food &&
                                            food?.image !== null &&
                                            HOST + food?.image) ||
                                        "/assets/img/product.png"
                                    }
                                    alt=""
                                />
                            </div>
                            <div className="prod-detail">
                                <div className="title">
                                    {(restaurant &&
                                        restaurant?.name !== null &&
                                        restaurant?.name) ||
                                        (food &&
                                            food?.name !== null &&
                                            food?.name)}
                                </div>
                                <div className="sub-title">
                                    {props?.restaurant_type}
                                </div>
                                {/* <div className="price">$100.0</div> */}
                                <Rating rating={props?.user?.rating} />
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
                    )
                    // : (
                    //     <>
                    //         <div
                    //             className="product-card d-flex justify-content-center flex-column"
                    //             style={{
                    //                 cursor: "pointer",
                    //             }}
                    //             onClick={()=>{
                    //                 window?.scrollTo({
                    //                     top: 0,
                    //                     behavior: "smooth",
                    //                 });
                    //                 handleFoodClick(food.id);
                    //             }}
                    //         >
                    //             <div className="prod-img mx-auto">
                    //                 <img
                    //                     className="col-12"
                    //                     src="/assets/img/product.png"
                    //                     alt=""
                    //                 />
                    //             </div>
                    //             <div className="prod-detail">
                    //                 <div className="title">{props?.name}</div>
                    //                 <div className="sub-title">
                    //                     {props?.restaurant_type}
                    //                 </div>
                    //                 {/* <div className="price">$100.0</div> */}
                    //                 <Rating rating={props?.user?.rating} />
                    //                 <div className="text-center">
                    //                     <button
                    //                         // to='/food-detail'
                    //                         className="button-common"
                    //                     >
                    //                         View Menu
                    //                     </button>
                    //                     <button className="button-common-2 d-none">
                    //                         Closed
                    //                     </button>
                    //                 </div>
                    //             </div>
                    //         </div>
                    //     </>
                    // )
                }
            </div>
        </>
    );
};

export const Restaurant = ({restaurant, props}) => {
    return (
        <Card restaurant={restaurant} props={props}/>
    );
}

export const Food = ({ food, props, }) => {
    return <Card food={food} props={props} />;
};