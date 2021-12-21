import { createSlice } from '@reduxjs/toolkit'
import { helperAxios } from "./../../helper/axios";
import { StateType } from "./../../constants/index";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: "",
        updateProfile: "",
        address: "",
        addresses: "",
    },
    reducers: {
        profile: (state, action) => {
            return {
                ...state,
                profile: action.payload
            }
        },
        updateProfile: (state, action) => {
            return {
                ...state,
                updateProfile: action.payload
            }
        },
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
        },
        initialState: (state, action) => {
            return {
                ...state,
                [action.payload]: ""
            }
        }
    },
});
export default userSlice.reducer


export const { address, addresses, profile, updateProfile, initialState } = userSlice.actions

export const getProfile = (id) => async dispatch => {
    const url = `/api/user/profile/${id}`;
    dispatch(helperAxios("get", url, profile, true));
};

export const patchupdateProfile = (data) => async dispatch => {
    const url = `/api/user/update-profile/${data.id}`;
    dispatch(helperAxios("patch", url, updateProfile, true, data));
};



export const addAddress = (data) => async dispatch => {
    const url = `/api/user/address/store`;
    dispatch(helperAxios("post", url, address, true, data, false, null));
};

export const getAddresses = () => async dispatch => {
    const url = `/api/user/address`;
    dispatch(helperAxios("get", url, addresses, true));
};