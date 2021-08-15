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
        await axios({
            method: 'get',
            // headers: {
            //     Authorization: `Bearer ${localStorage.userToken}`
            // },
            url: process.env.REACT_APP_API_BASE_URL + `api/user/questions/${serviceId}`,
            // params: {
            //     chat_mark_read_id: chat_mark_read_id
            // }
        }).then((response) => {
            //handle success
            dispatch(serviceQuestion(response.data));
        }).catch((error) => {
            dispatch(serviceQuestion(error.response.data))
        });
    } catch (error) {
        dispatch(serviceQuestion({error: true, message: "Something went wrong!"}))
    }
};
