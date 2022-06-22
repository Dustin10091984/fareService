import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const providerScheduleSlice = createSlice({
    name: 'providerSchedule',
    initialState: [],
    reducers: {
        getSchedule: (state, action) => {
            return action.payload
        }
    }
});

export default providerScheduleSlice.reducer;

const { getSchedule } = providerScheduleSlice.actions;


export const getProviderSchedule = (id) => async dispatch => {
    try {
        dispatch(getSchedule({ error: false, loading: true }));
        await axios({
            method: 'get',
            headers: {
                Authorization: `${localStorage.userToken}`
            },
            url: process.env.REACT_APP_API_BASE_URL + `/api/user/services/provider-schedule/${id}`,
        }).then((response) => {
            //handle success
            let data = response.data;
            data.loading = false;
            dispatch(getSchedule(response.data));
        }).catch((error) => {
            //handle error
            if (error.response.status === 401) {
                localStorage.clear();
                window.location.href = "/";
            }
            let data = error.response.data;
            data.loading = false;
            dispatch(getSchedule(error.response.data));
        });
    } catch (error) {
        dispatch(getSchedule({ error: true, loading: false, message: "something went wrong!" }));
    }
}