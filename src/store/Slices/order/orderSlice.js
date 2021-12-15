import { createSlice } from '@reduxjs/toolkit';
import { helperAxios } from "../../../helper/axios/index";
import { StateType } from "./../../../constants";

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
        order: (state, action) => {
            return {
                ...state,
                order: action.payload
            }
        },
        initial: (state, action) => {
            return {
                ...state,
                ...action.payload
            }

        },
    },
});
export default orderSlice.reducer;

export const { orderList, order, initial } = orderSlice.actions;



export const getOrderList = (data) => async dispatch => {
    let url = `/api/user/order${data.type ? `?type=${data.type}` : ''}`;
    dispatch(helperAxios("get", url, orderList, true));
}

export const createNewOrder = (data) => async dispatch => {
    let url = `/api/user/order/create`;
    dispatch(helperAxios("post", url, order, true, data, false, null, { type: StateType.ADD }));
}


