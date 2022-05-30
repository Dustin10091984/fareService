import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import {HOST} from './../../../constants/index'

const commonSlice = createSlice({
    name: 'common',
    initialState: {
        countries: ""
    },
    reducers: {
        getCountries: (state, action) => {
            return {
                ...state,
                countries: action.payload
            };
        },
    },
});
export default commonSlice.reducer


const { getCountries } = commonSlice.actions
export const getCountriesList = (params) => async dispatch => {
    try {
        dispatch(getCountries({ error: false, loading: true }))
        await axios({
            method: 'get',
            url: `${HOST}/api/user/services/countries`,
            params,
        }).then((response) => {
            //handle success
            let data = response.data;
            data.loading = false;
            dispatch(getCountries(data));
        }).catch((error) => {
            //handle error
            let data = error?.response?.data;
            data.loading = false;
            dispatch(getCountries(data))
        });
    } catch (error) {
        dispatch(getCountries({ error: true, loading: true, message: "Something went wrong!" }))
    }
};
