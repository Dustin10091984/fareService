import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const requestServiceSlice = createSlice({
    name: 'requestService',
    initialState: '',
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
        dispatch(requestService({error: false, loading: true}));
        await axios({
            method: 'post',
            headers: {
                Authorization: `${localStorage.userToken}`
            },
            url: `${process.env.REACT_APP_API_BASE_URL}api/user/services/service-request`,
            data: payload,
        }).then((response) => {
            const data = response.data;
            data.loading = false
            dispatch(requestService(response.data));
        }).catch((error) => {
            const data = error.response.data;
            data.loading = false
            dispatch(requestService(error.response.data))
        });
    } catch (error) {
        dispatch(requestService({ error: true, message: "Something went wrong!", loading: false }))
    }
};

export const getInitialRequestService = () => async dispatch => {
    dispatch(requestService(''))
};
