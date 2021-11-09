import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

const messageListSlice = createSlice({
    name: 'message',
    initialState: [],
    reducers: {
        getMessages: (state, action) => {
            if(state?.data?.data && action.payload.error == false && action.payload.loading == false ){
                // state.data.data.filter((data)=>{
                //     if(data && action.payload.data.data){
                //         data.push(action.payload.data.data);
                //     }
                // });
                action.payload?.data?.data.push(...state?.data?.data);
            }
            return {
                ...state,
                ...action.payload
            }
        },

        clearMessages: (state, action) => {
            return action.payload;
        }, 

        addMessage: (state, action) => {
            const dataList = JSON.parse(JSON.stringify(state?.data?.data));
            let newData = null;
            if(dataList){
                newData = [...dataList, action.payload];
            }
            
            return {
                ...state,
                data : {
                    ...state.data, data:newData == null ? [action.payload] : newData
                },
            }
        }
    }
});

export default messageListSlice.reducer;
export const { clearMessages, addMessage } = messageListSlice.actions;
const { getMessages } = messageListSlice.actions;

export const messageList = (data) => async dispatch => {
    try {
        dispatch(getMessages({error: false, loading: true}));
        await axios({
            method: 'get',
            headers: {
                Authorization: `${localStorage.userToken}`
            },
            url: process.env.REACT_APP_API_BASE_URL + `api/user/message/chat/${data.id}${
                data.orderId && data.nextPage ? `?service_request_id=${data.orderId}&page=${data.nextPage}` :
                data.orderId ? `?service_request_id=${data.orderId}` : ''
            }`,
        }).then((response) => {
            let data = response.data;
            data?.data?.data.reverse();
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