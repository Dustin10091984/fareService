import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderList } from "./../store/Slices/order/orderSlice";
import Breadcrumb from "./../components/Breadcrumb";
import OrderHistory from "./components/OrderHistory";
import { ProductType } from "../constants";
import Loading from "../front-end/common/Loading";

export const ProductDelivery = (props) => {
    const [state, setState] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        if (
            orderList?.length === 0 ||
            (orderList?.length && orderList[0].type != ProductType.GROCERY)
        ) {
            dispatch(getOrderList({ type: ProductType.GROCERY }));
        }
    }, []);
    const orderLoading = useSelector(
        (state) => state.orderReducer?.list?.loading
    );
    const orderError = useSelector((state) => state.orderReducer?.list?.error);
    const orderList = useSelector((state) => state.orderReducer?.list?.data);
    const orderMeta = useSelector((state) => state.orderReducer?.list?.meta);
    const data = [
        { title: "Home", to: "/" },
        { title: "Dashboard", to: "/dashboard" },
        { title: "Product Delivery" },
    ];
    return (
        <>
            <Loading loading={orderLoading} />
            <Breadcrumb data={data} />;
            <OrderHistory
                title={"Product Delivery"}
                list={orderList}
                pagination={{
                    current_page: orderMeta?.current_page,
                    last_page: orderMeta?.last_page,
                }}
                data={{
                    type: ProductType.GROCERY,
                    func: getOrderList,
                }}
            />
        </>
    );
};
