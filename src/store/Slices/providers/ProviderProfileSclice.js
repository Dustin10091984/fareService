import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const providerProfileSlice = createSlice({
    name: 'providerProfile',
    initialState: [],
    reducers: {
        getProvider: (state, action) => {
            return action.payload
        }
    }
});

export default providerProfileSlice.reducer;

const { getProvider } = providerProfileSlice.actions;


export const getProviderProfile = (id) => async dispatch => {
    try {
        await axios({
            method: 'get',
            // headers: {
            //     Authorization: `Bearer ${localStorage.userToken}`
            // },
            url: process.env.REACT_APP_API_BASE_URL + `/api/user/provider/${id}`,
        }).then((response) => {
            //handle success
            dispatch(getProvider(response.data));
        }).catch((error) => {
            dispatch(getProvider(error.response.data));
        });
    } catch (error) {
        dispatch(getProvider({ error: true, message: "something went wrong!" }));
    }
}