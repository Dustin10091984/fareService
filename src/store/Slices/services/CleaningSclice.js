import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const cleaningSlice = createSlice({
    name: 'cleaning',
    initialState: [],
    reducers: {
        cleaningQuestion: (state, action) => {
            return action.payload;
        },
    },
});
export default cleaningSlice.reducer


const { cleaningQuestion } = cleaningSlice.actions
export const getCleaningQuestion = () => async dispatch => {
    try {
        await axios({
            method: 'get',
            headers: {
                Authorization: `Bearer ${localStorage.userToken}`
            },
            url: process.env.REACT_APP_API_BASE_URL + `api/user/questions/1`,
            // params: {
            //     chat_mark_read_id: chat_mark_read_id
            // }
        }).then((response) => {
            //handle success
            dispatch(cleaningQuestion(response.data));
        }).catch((error) => {
            //handle error
            console.log(error);
        });
    } catch (error) {
        console.log("error", error);
    }
};
