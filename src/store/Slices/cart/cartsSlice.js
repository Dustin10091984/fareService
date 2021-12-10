import { createSlice } from '@reduxjs/toolkit'
import { helperAxios } from "../../../helper/axios/index";
import {  } from "lodash";

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
            let cartIndex = null;
            if (action?.payload?.data && state?.list?.cart){
                // cartIndex = state.list?.cart.findIndex(item => item.id === action.payload?.data?.id);
                return {
                    ...state,
                    list: {
                        ...state.list, cart: [

                            // {...state.list.cart[cartIndex], ...action.payload?.data},
                            ...state.list.cart.map(item => {
                                if(item.id === action.payload?.data?.id){
                                   return action.payload?.data;
                                }
                                return item;
                            }),
                        ],
                        total_price: action.payload.total_price,
                    },
                    updateCart: action.payload
                };
            }
            return {
                ...state,
                updateCart: action.payload
            }
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

