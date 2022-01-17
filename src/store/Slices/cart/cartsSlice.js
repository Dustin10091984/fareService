import { createSlice } from '@reduxjs/toolkit';
import { StateType } from '../../../constants';
import { helperAxios } from "../../../helper/axios/index";

const cartsSlice = createSlice({
    name: 'carts',
    initialState: {
        list: '',
        cart: '',
        updateCart: '',
        deleteCart: '',
    },
    reducers: {
        cartList: (state, action) => {
            return {
                ...state,
                list: action.payload
            };
        },
        cart: (state, action) => {
            if (action.payload.data) {
                if (state?.list?.cart) {
                    return {
                        ...state,
                        list: {
                            ...state.list, cart: [action.payload.data, ...state.list.cart],
                            total_price: action.payload.total_price
                        },
                        cart: action.payload
                    }
                }
            }
            return {
                ...state,
                cart: action.payload
            };
        },
        updateCart: (state, action) => {
            // let cartIndex = null;
            if (action?.payload?.data && state?.list?.cart) {
                // cartIndex = state.list?.cart.findIndex(item => item.id === action.payload?.data?.id);
                return {
                    ...state,
                    list: {
                        ...state.list, cart: [
                            // {...state.list.cart[cartIndex], ...action.payload?.data},
                            ...state.list.cart.map(item => {
                                if (item.id === action.payload?.data?.id) {
                                    return action.payload?.data;
                                }
                                return item;
                            }),
                        ],
                        total_price: action.payload.total_price
                    },
                    updateCart: action.payload
                };
            }
            return {
                ...state,
                updateCart: action.payload
            }
        },
        remove: (state, action) => {
            if (action?.payload?.data) {
                return {
                    ...state,
                    list: {
                        ...state.list, cart: [
                            ...state.list.cart.filter(item => item.id !== action.payload?.data?.id),
                        ],
                        total_price: action.payload.total_price
                    },
                    deleteCart: action.payload
                }
            }
            return {
                ...state,
                deleteCart: action.payload
            }
        },
        clearCartState: (state, action) => {
            return {
                ...state,
                [action.payload]: ''
            }
        }
    },
});
export default cartsSlice.reducer;

const { cartList, updateCart, cart, remove } = cartsSlice.actions;
export const { clearCartState } = cartsSlice.actions;

const url = `/api/user/cart`;

export const getCartList = () => async dispatch => {
    dispatch(helperAxios("get", url, cartList, true));
}

export const addToCart = (data) => async dispatch => {
    dispatch(helperAxios("post", url, cart, true, data));
}

export const updateQuantity = (data) => async dispatch => {
    if (data.id && data.quantity) {
        dispatch(helperAxios("PUT", `${url}/${data.id}`, updateCart, true, { quantity: data.quantity }));
    }
}

export const deleteCart = (id) => async dispatch => {
    dispatch(helperAxios("delete", `${url}/${id}`, remove, true, null, false, null));
}

