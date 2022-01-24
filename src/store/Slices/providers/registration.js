import { createSlice } from '@reduxjs/toolkit';
import { HOST } from "../../../constants";
import axios from 'axios';

const registrationSlice = createSlice({
    name: 'registration',
    initialState: {
        signupProvider: ""
    },
    reducers: {
        signupProvider: (state, action) => {
            return {
                signupProvider: action.payload
            }
        }
    }
});

export default registrationSlice.reducer;

const { signupProvider } = registrationSlice.actions;

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