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
        await axios({
            method: 'get',
            headers: {
                Authorization: `${localStorage.userToken}`
            },
            url: process.env.REACT_APP_API_BASE_URL + `api/user/services/provider-schedule/${id}`,
        }).then((response) => {
            //handle success
            dispatch(getSchedule(response.data));
        }).catch((error) => {
            dispatch(getSchedule(error.response.data));
        });
    } catch (error) {
        dispatch(getSchedule({ error: true, message: "something went wrong!" }));
    }
}