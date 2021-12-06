import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const providerSlice = createSlice({
    name: 'provider',
    initialState: [],
    reducers: {
        getProvider: (state, action) => {
            return action.payload
        }
    }
});

export default providerSlice.reducer;

const { getProvider } = providerSlice.actions;


export const getProviderList = (params) => async dispatch => {
    try {
        await axios({
            method: 'get',
            // headers: {
            //     Authorization: `Bearer ${localStorage.userToken}`
            // },
            url: process.env.REACT_APP_API_BASE_URL + `/api/user/services/provider-list${params}`,
        }).then((response) => {
            //handle success
            dispatch(getProvider(response.data));
        }).catch((error) => {
            dispatch(getProvider(error.response.data));
        });
    } catch (error) {
        dispatch(getProvider({error: true, message: "something went wrong!"}));
    }
}