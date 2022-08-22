import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const serviceSlice = createSlice({
    name: 'service',
    initialState: [],
    reducers: {
        serviceQuestion: (state, action) => {
            return action.payload;
        },
    },
});
export default serviceSlice.reducer


const { serviceQuestion } = serviceSlice.actions
export const getServiceQuestion = (serviceId) => async dispatch => {
    try {
        dispatch(serviceQuestion({ error: false, loading: true }))
        await axios({
            method: 'get',
            // headers: {
            //     Authorization: `Bearer ${localStorage.userToken}`
            // },
            url: process.env.REACT_APP_API_BASE_URL + `/api/user/questions/${serviceId}`,
            // params: {
            //     chat_mark_read_id: chat_mark_read_id
            // }
        }).then((response) => {
            //handle success
            let data = response.data;
            data.loading = false;
            dispatch(serviceQuestion(data));
        }).catch((error) => {
            //handle error
            let data = error?.response?.data;
            data.loading = false;
            dispatch(serviceQuestion(data))
        });
    } catch (error) {
        dispatch(serviceQuestion({ error: true, loading: true, message: "Something went wrong!" }))
    }
};
