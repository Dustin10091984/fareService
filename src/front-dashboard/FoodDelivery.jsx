import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderList } from "./../store/Slices/order/orderSlice";
import Breadcrumb from "./../components/Breadcrumb";
import OrderHistory from "./components/OrderHistory";
import { ProductType } from "../constants";

export const FoodDelivery = (props) => {
    const [state, setState] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrderList({ type: ProductType.FOOD }));
    }, []);
    const orderLoading = useSelector(
        (state) => state.orderReducer?.list?.loading
    );
    const orderError = useSelector((state) => state.orderReducer?.list?.error);
    const orderList = useSelector((state) => state.orderReducer?.list?.data);
    return (
        <>
            {(() => {
                const data = [
                    { title: "Home", to: "/" },
                    { title: "Dashboard", to: "/dashboard" },
                    { title: "Food Delivery" },
                ];
                return <Breadcrumb data={data} />;
            })()}
            <OrderHistory title={"Food Delivery"} list={orderList} />
        </>
    );
};

// <div className="col-md-6">
//     <div className="order-card d-flex align-items-center justify-content-between">
//         <div className="order-des-b">
//             <div className="title">
//                 KFC Family Bucket
//             </div>
//             <div className="sub-title">
//                 Kentucky Fried Chicken (KFC)
//             </div>
//             <div className="order-time">
//                 19, january 2020 - 12:00 PM
//             </div>
//         </div>
//         <div className="order-btn-b">
//             <Link
//                 to="/order-detail"
//                 className="btn-view"
//             >
//                 View
//             </Link>
//             <div className="btn-price">1550PKR</div>
//         </div>
//     </div>
// </div>
// <div className="col-md-6">
//     <div className="order-card d-flex align-items-center justify-content-between">
//         <div className="order-des-b">
//             <div className="title">
//                 KFC Family Bucket
//             </div>
//             <div className="sub-title">
//                 Kentucky Fried Chicken (KFC)
//             </div>
//             <div className="order-time">
//                 19, january 2020 - 12:00 PM
//             </div>
//         </div>
//         <div className="order-btn-b">
//             <Link
//                 to="/order-detail"
//                 className="btn-view"
//             >
//                 View
//             </Link>
//             <div className="btn-price">1550PKR</div>
//         </div>
//     </div>
// </div>
// <div className="col-md-6">
//     <div className="order-card d-flex align-items-center justify-content-between">
//         <div className="order-des-b">
//             <div className="title">
//                 KFC Family Bucket
//             </div>
//             <div className="sub-title">
//                 Kentucky Fried Chicken (KFC)
//             </div>
//             <div className="order-time">
//                 19, january 2020 - 12:00 PM
//             </div>
//         </div>
//         <div className="order-btn-b">
//             <Link
//                 to="/order-detail"
//                 className="btn-view"
//             >
//                 View
//             </Link>
//             <div className="btn-price">1550PKR</div>
//         </div>
//     </div>
// </div>
// <div className="col-md-6">
//     <div className="order-card d-flex align-items-center justify-content-between">
//         <div className="order-des-b">
//             <div className="title">
//                 KFC Family Bucket
//             </div>
//             <div className="sub-title">
//                 Kentucky Fried Chicken (KFC)
//             </div>
//             <div className="order-time">
//                 19, january 2020 - 12:00 PM
//             </div>
//         </div>
//         <div className="order-btn-b">
//             <Link
//                 to="/order-detail"
//                 className="btn-view"
//             >
//                 View
//             </Link>
//             <div className="btn-price">1550PKR</div>
//         </div>
//     </div>
// </div>
// <div className="col-md-6">
//     <div className="order-card d-flex align-items-center justify-content-between">
//         <div className="order-des-b">
//             <div className="title">
//                 KFC Family Bucket
//             </div>
//             <div className="sub-title">
//                 Kentucky Fried Chicken (KFC)
//             </div>
//             <div className="order-time">
//                 19, january 2020 - 12:00 PM
//             </div>
//         </div>
//         <div className="order-btn-b">
//             <Link
//                 to="/order-detail"
//                 className="btn-view"
//             >
//                 View
//             </Link>
//             <div className="btn-price">1550PKR</div>
//         </div>
//     </div>
// </div>
