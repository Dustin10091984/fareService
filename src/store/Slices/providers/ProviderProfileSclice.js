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
        getProvider({ error: false, loading: true });
        await axios({
            method: 'get',
            // headers: {
            //     Authorization: `Bearer ${localStorage.userToken}`
            // },
            url: process.env.REACT_APP_API_BASE_URL + `/api/user/provider/${id}`,
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