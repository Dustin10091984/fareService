import { createSlice } from '@reduxjs/toolkit'
import { helperAxios } from "./../../helper/axios";
import { StateType } from "./../../constants/index";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        address: "",
        addresses: "",
    },
    reducers: {
        address: (state, action) => {
            return {
                ...state,
                address: action.payload
            };
        },
        addresses: (state, action) => {
            return {
                ...state,
                addresses: action.payload
            };
        }
    },
});
export default userSlice.reducer


const { address, addresses } = userSlice.actions

export const addAddress = (data) => async dispatch => {
    const url = `/api/user/address/store`;
    dispatch(helperAxios("post", url, address, true, data, false, null));
};

export const getAddresses = () => async dispatch => {
    const url = `/api/user/address`;
    dispatch(helperAxios("get", url, addresses, true));
};