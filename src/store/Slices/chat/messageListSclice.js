import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const messageListSlice = createSlice({
    name: 'message',
    initialState: [],
    reducers: {
        getMessages: (state, action) => {
            return action.payload
        }
    }
});

export default messageListSlice.reducer;

const { getMessages } = messageListSlice.actions;

export const messageList = (id) => async dispatch => {
    try {
        dispatch(getMessages({error: false, loading: true}));
        await axios({
            method: 'get',
            headers: {
                Authorization: `${localStorage.userToken}`
            },
            url: process.env.REACT_APP_API_BASE_URL + `api/user/message/chat/${id}`,
        }).then((response) => {
            let data = response.data;
            data.loading = false
            dispatch(getMessages(data));
        }).catch((error) => {
            let data = error.response.data;
            data.loading = false
            dispatch(getMessages(data));
        });
    } catch (error) {
        dispatch(getMessages({error: true, loading: false, message: "something went wrong!"}));
    }
}