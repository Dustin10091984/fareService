import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const chatListSlice = createSlice({
    name: 'chatlist',
    initialState: [],
    reducers: {
        getChatList: (state, action) => {
            return action.payload
        }
    }
});

export default chatListSlice.reducer;

const { getChatList } = chatListSlice.actions;

export const chatList = (params) => async dispatch => {
    try {
        dispatch(getChatList({error: false, loading: true}));
        await axios({
            method: 'get',
            headers: {
                Authorization: `${localStorage.userToken}`
            },
            url: process.env.REACT_APP_API_BASE_URL + `/api/user/message/active-order-chat`,
        }).then((response) => {
            let data = response.data;
            data.loading = false
            dispatch(getChatList(data));
        }).catch((error) => {
            if (error.response.status === 401) {
                localStorage.clear();
                window.location.href = "/";
            }
            let data = error.response.data;
            data.loading = false
            dispatch(getChatList(data));
        });
    } catch (error) {
        dispatch(getChatList({error: true, loading: false, message: "something went wrong!"}));
    }
}