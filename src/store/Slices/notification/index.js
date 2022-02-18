import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        list: '',
    },
    reducers: {
        notifications: (state, action) => {
            return {
                ...state,
                list: action.payload
            };
        },
    },
});
export default notificationSlice.reducer;

const { notifications } = notificationSlice.actions;
// export const { clearCartState } = notificationSlice.actions;

export const getNotifications = () => async dispatch => {
    try {
        dispatch(notifications({ error: false, loading: true }))
        await axios({
            method: 'get',
            headers: {
                Authorization: `${localStorage.userToken}`
            },
            url: process.env.REACT_APP_API_BASE_URL + `/api/user/notification`,
        }).then((response) => {
            //handle success
            let data = response.data;
            data.loading = false;
            dispatch(notifications(data));
        }).catch((error) => {
            //handle error
            if (error.response.status === 401) {
                localStorage.clear();
            }
            let data = error?.response?.data;
            data.loading = false;
            dispatch(notifications(data))
        });
    } catch (error) {
        dispatch(notifications({ error: true, loading: true, message: "Something went wrong!" }))
    }
}
