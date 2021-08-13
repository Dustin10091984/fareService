import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const requestServiceSlice = createSlice({
    name: 'requestService',
    initialState: [],
    reducers: {
        requestService: (state, action) => {
            return action.payload;
        },
    },
});
export default requestServiceSlice.reducer


const { requestService } = requestServiceSlice.actions
export const postRequestService = (payload) => async dispatch => {
    try {
        await axios({
            method: 'post',
            headers: {
                Authorization: `${localStorage.userToken}`
            },
            url: `${process.env.REACT_APP_API_BASE_URL}api/user/services/service-request`,
            data: payload,
        }).then((response) => {
            //handle success
            dispatch(requestService(response.data));
        }).catch((error) => {
            dispatch(requestService(error.response.data))
        });
    } catch (error) {
        dispatch(requestService({ error: true, message: "Something went wrong!" }))
    }
};

export const getInitialRequestService = () => async dispatch => {
    dispatch(requestService(''))
};
