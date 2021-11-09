import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const paymentSlice = createSlice({
    name: 'payment',
    initialState: [],
    reducers: {
        payment: (state, action) => {
            return action.payload;
        },
    },
});
export default paymentSlice.reducer;

const { payment } = paymentSlice.actions;

export const pay = (data) => async dispatch => {
    try {
        dispatch(payment({ error: false, loading: true }));
        await axios({
            method: 'post',
            headers: {
                Authorization: `${localStorage.userToken}`
            },
            url: process.env.REACT_APP_API_BASE_URL + `api/user/transaction/payable-amount`,
            data: data
        }).then((response) => {
            let data = response.data;
            data.loading = false
            dispatch(payment(data));
        }).catch((error) => {
            let data = error.response.data;
            data.loading = false
            dispatch(payment(data));
        });
    } catch (error) {
        dispatch(payment({ error: true, loading: false, message: "something went wrong!" }));
    }
}