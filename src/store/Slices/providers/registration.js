import { createSlice } from '@reduxjs/toolkit';
import { HOST } from "../../../constants";
import axios from 'axios';

const registrationSlice = createSlice({
    name: 'registration',
    initialState: {
        signupProvider: "",
        verify: "",
    },
    reducers: {
        signupProvider: (state, action) => {
            return {
                ...state,
                signupProvider: action.payload
            }
        },
        verifyCode: (state, action) => {
            return {
                ...state,
                verify: action.payload
            }
        }
    }
});

export default registrationSlice.reducer;

const { signupProvider, verifyCode } = registrationSlice.actions;



export const providerSignup = (data) => async dispatch => {
    try {
        dispatch(signupProvider({ error: false, loading: true }));
        await axios({
            method: 'post',
            data,
            url: HOST + `/api/provider/signup`,
        }).then((response) => {
            //handle success
            let data = response.data;
            data.loading = false;
            dispatch(signupProvider(response.data));
        }).catch((error) => {
            //handle error
            let data = error.response.data;
            data.loading = false;
            dispatch(signupProvider(error.response.data));
        });
    } catch (error) {
        dispatch(signupProvider({ error: true, loading: false, message: "something went wrong!" }));
    }
}

export const verifyPhoneNo = (data) => async dispatch => {
    try {
        dispatch(verifyCode({ error: false, loading: true }));
        await axios({
            method: 'post',
            data,
            url: HOST + `/api/provider/signup/phone/verify`,
        }).then((response) => {
            //handle success
            let data = response.data;
            data.loading = false;
            dispatch(verifyCode(response.data));
        }).catch((error) => {
            //handle error
            let data = error.response.data;
            data.loading = false;
            dispatch(verifyCode(error.response.data));
        });
    } catch (error) {
        dispatch(verifyCode({ error: true, loading: false, message: "something went wrong!" }));
    }
}