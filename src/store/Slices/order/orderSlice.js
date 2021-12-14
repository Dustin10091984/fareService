import { createSlice } from '@reduxjs/toolkit';
import { helperAxios } from "../../../helper/axios/index";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        list: '',
        order: '',
    },
    reducers: {
        orderList: (state, action) => {
            return {
                ...state,
                list: action.payload
            };
        },
        createOrder: (state, action) => {
            return {
                ...state,
                order: action.payload
            }
        },
    },
});
export default orderSlice.reducer;

const { orderList, createOrder } = orderSlice.actions;

export const getOrderList = () => async dispatch => {
    let url = `/api/user/order`;
    dispatch(helperAxios("get", url, orderList, true));
}

export const createNewOrder = (data) => async dispatch => {
    let url = `/api/user/order/create`;
    dispatch(helperAxios("post", url, createOrder, true, data));
}


