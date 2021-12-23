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
        delAddress: "",
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
        imageUpdate: (state, action) => {
            if (action.payload?.data) {
                return {
                    ...state,
                    profile: {
                        ...state.profile, data: {
                            ...state.profile.data,
                            image: action.payload?.data
                        }
                    },
                    imageUpdate: action.payload
                }
            }
            return {
                ...state,
                imageUpdate: action.payload
            }
        },
        address: (state, action) => {
            if (action.payload?.data) {
                return {
                    ...state,
                    addresses: {
                        ...state.addresses, data: [action.payload?.data, ...state.addresses.data]
                    },
                    address: action.payload
                }
            }
            return {
                ...state,
                address: action.payload
            };
        },
        delAddress: (state, action) => {
            if (action.payload?.data) {
                return {
                    ...state,
                    delAddress: action.payload,
                    addresses: {
                        ...state.addresses, data: state.addresses.data.filter(item => item.id !== action.payload.data.id)
                    }
                };
            }
            return {
                ...state,
                delAddress: action.payload
            }
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


export const { address, addresses, profile, updateProfile, imageUpdate, delAddress, initialState } = userSlice.actions

export const getProfile = (id) => async dispatch => {
    const url = `/api/user/profile/${id}`;
    dispatch(helperAxios("get", url, profile, true));
};

export const patchupdateProfile = (data) => async dispatch => {
    const url = `/api/user/update-profile/${data.id}`;
    dispatch(helperAxios("patch", url, updateProfile, true, data));
};

export const changeImage = (data) => async dispatch => {
    const url = `/api/user/profile-image`;
    dispatch(helperAxios("post", url, imageUpdate, true, data));
};

export const addAddress = (data) => async dispatch => {
    const url = `/api/user/address/store`;
    dispatch(helperAxios("post", url, address, true, data, false, null));
};

export const deleteAddress = (id) => async dispatch => {
    const url = `/api/user/address/delete/${id}`;
    dispatch(helperAxios("delete", url, delAddress, true));
};

export const getAddresses = () => async dispatch => {
    const url = `/api/user/address`;
    dispatch(helperAxios("get", url, addresses, true));
};