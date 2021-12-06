import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        updateUser: (state, action) => {
            return action.payload;
        },
    },
});
export default userSlice.reducer


const { updateUser } = userSlice.actions
export const getUser = () => async dispatch => {
    try {
        await axios({
            method: 'get',
            headers: {
                Authorization: `Bearer ${localStorage.userToken}`
            },
            url: process.env.REACT_APP_API_BASE_URL+`/api/public/chat/conversations`,
            // params: {
            //     chat_mark_read_id: chat_mark_read_id
            // }
        }).then((response) => {
            //handle success
            dispatch(updateUser(response.data.data));
        }).catch((error) => {
            //handle error
            console.log(error);
        });
    } catch (error) {
        console.log("error", error);
    }
};