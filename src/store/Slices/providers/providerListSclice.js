import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const providerSlice = createSlice({
    name: 'provider',
    initialState: [],
    reducers: {
        getProvider: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        setStateProvider: (state, action) => {
            return action.payload
        }
    }
});

export default providerSlice.reducer;

const { getProvider } = providerSlice.actions;
export const { setStateProvider } = providerSlice.actions;


export const getProviderList = (params) => async dispatch => {
    try {
        dispatch(getProvider({ error: false, loading: true }));
        await axios({
            method: 'get',
            // headers: {
            //     Authorization: `Bearer ${localStorage.userToken}`
            // },
            url: process.env.REACT_APP_API_BASE_URL + `/api/user/services/provider-list${params}`,
        }).then((response) => {
            //handle success
            let data = response.data;
            data.loading = false;
            dispatch(getProvider(response.data));
        }).catch((error) => {
            //handle error
            let data = error.response.data;
            data.loading = false;
            dispatch(getProvider(error.response.data));
        });
    } catch (error) {
        dispatch(getProvider({ error: true, loading: false, message: "something went wrong!" }));
    }
}