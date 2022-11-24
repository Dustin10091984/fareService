import { createSlice } from '@reduxjs/toolkit'
import { helperAxios } from "../../../helper/axios/index";

const groceryStoreSlice = createSlice({
    name: 'groceryStore',
    initialState: {
        list: '',
        groceryStore: '',
        products: '',
        product: '',
    },
    reducers: {
        groceryStores: (state, action) => {
            return {
                ...state,
                list: action.payload
            };
        },
        groceryStore: (state, action) => {
            return {
                ...state,
                groceryStore: action.payload
            };
        },
        products: (state, action) => {
            return {
                ...state,
                products: action.payload
            }
        },
        product: (state, action) => {
            return {
                ...state,
                product: action.payload
            }
        }
    },
});
export default groceryStoreSlice.reducer;

export const { groceryStores, groceryStore, products, product } = groceryStoreSlice.actions;

export const getGroceryStores = (payload) => async dispatch => {
    let url = `/api/grocery/list?${payload}`;
    dispatch(helperAxios("get", url, groceryStores));
}

export const getGroceryStore = (id) => async dispatch => {
    let url = `/api/grocery/show/${id}`;
    dispatch(helperAxios("get", url, groceryStore));
}

export const getProducts = ({ id, params }) => async dispatch => {
    let url = `/api/grocery/product/list/${id}${params ? params : ''}`;
    dispatch(helperAxios("get", url, products));
}

export const getProduct = (id) => async dispatch => {
    let url = `/api/grocery/product/show/${id}`;
    dispatch(helperAxios("get", url, product));
}
