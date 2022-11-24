import { createSlice } from '@reduxjs/toolkit';
import { addMessage } from './messageListSclice'
import axios from 'axios';

const messageSlice = createSlice({
    name: 'message',
    initialState: [],
    reducers: {
        message: (state, action) => {
            return action.payload
        }
    }
});

export default messageSlice.reducer;

const { message } = messageSlice.actions;

export const sendMessage = (msg) => async dispatch => {
    try {
        dispatch(message({error: false, loading: true}));
        await axios({
            method: 'post',
            headers: {
                Authorization: `${localStorage.userToken}`
            },
            url: process.env.REACT_APP_API_BASE_URL + `/api/user/message/send`,
            data: msg,
        }).then((response) => {
            let data = response.data;
            data.loading = false
            dispatch(addMessage(data.data));
            dispatch(message(data));
        }).catch((error) => {
            if (error.response.status === 401) {
                localStorage.clear();
                window.location.href = "/";
            }
            let data = error.response.data;
            data.loading = false
            dispatch(message(data));
        });
    } catch (error) {
        dispatch(message({error: true, loading: false, message: "something went wrong!"}));
    }
}