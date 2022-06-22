import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: [],
    reducers: {
        feedback: (state, action) => {
            return action.payload;
        },
        initialFeedback: (state, action) => {
            return action.payload;
        },
    },
});
export default feedbackSlice.reducer;

const { feedback } = feedbackSlice.actions;

export const addFeedback = (data) => async dispatch => {
    try {
        dispatch(feedback({ error: false, loading: true }));
        await axios({
            method: 'post',
            headers: {
                Authorization: `${localStorage.userToken}`
            },
            url: process.env.REACT_APP_API_BASE_URL + `/api/user/feedback/create`,
            data: data
        }).then((response) => {
            let data = response.data;
            data.loading = false
            dispatch(feedback(data));
        }).catch((error) => {
            if (error.response.status === 401) {
                localStorage.clear();
                window.location.href = "/";
            }
            let data = error.response.data;
            data.loading = false
            dispatch(feedback(data));
        });
    } catch (error) {
        dispatch(feedback({ error: true, loading: false, message: "something went wrong!" }));
    }
}

export const { initialFeedback } = feedbackSlice.actions;