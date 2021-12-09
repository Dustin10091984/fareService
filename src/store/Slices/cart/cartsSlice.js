import { createSlice } from '@reduxjs/toolkit'
import { helperAxios } from "../../../helper/axios/index";

const cartsSlice = createSlice({
    name: 'carts',
    initialState: {
        list: '',
        cart: '',
        updateCart: '',
    },
    reducers: {
        cartList: (state, action) => {
            return {
                ...state,
                list: action.payload
            };
        },
        updateCart: (state, action) => {
            return {
                ...state,
                updateCart: action.payload
            };
        },
        cart: (state, action) => {
            return {
                ...state,
                cart: action.payload
            };
        },
    },
});
export default cartsSlice.reducer;

const { cartList, updateCart, cart } = cartsSlice.actions;

const url = `/api/user/cart`;

export const getCartList = () => async dispatch => {
    dispatch(helperAxios("get", url, cartList, true));
}

export const addToCart = (data) => async dispatch => {
    dispatch(helperAxios("post", url, cart, true, data));
}

export const updateQuantity = (data) => async dispatch => {
    if(data.id && data.quantity) {
        dispatch(helperAxios("PUT", `${url}/${data.id}`, updateCart, true, { quantity: data.quantity }));
    }
}

export const removeCart = (id) => async dispatch => {
    url = `/api/restaurant/food/list/${id}`;
    // dispatch(helperAxios("get", url, foods));
}

