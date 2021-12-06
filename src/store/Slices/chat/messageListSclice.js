import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { helperAxios } from "../../../helper/axios/index";

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

const reverseData = (data) => {
    data.reverse()
    return data;
}

export const messageList = (data) => async dispatch => {
    let params = (()=>{
        if (data.orderId && data.page){
            return `?service_request_id=${data.orderId}&page=${data.page}`;
        } else if (data.orderId){
            return `?service_request_id=${data.orderId}`;
        } else {
            return '';
        }
    })();
    let url = `/api/user/message/chat/${data.id}${params}`;
    dispatch(helperAxios("get", url, getMessages, true, null, false, reverseData));
}