import { createSlice, Action } from '@reduxjs/toolkit';
import axios from 'axios';
import { HOST } from "./../../../constants";
const FooterSlice = createSlice({
    name: 'footer',
    initialState: {
        pageLinks: [],
        pages: '',
    },
    reducers: {
        pageLinks: (state, action) => {
            return {
                ...state, pageLinks: action.payload
            };
        },
        pages: (state, action) => {
            return {
                ...state, pages: action.payload
            };
        }
    },
});

export default FooterSlice.reducer
export const { pageLinks, pages } = FooterSlice.actions

export const getPages = () => async dispatch => {
    try {
        dispatch(pages({ error: false, loading: true }));
        await axios({
            method: 'get',
            url: `${HOST}/api/user/page`,
        }).then((response) => {
            //handle success
            let data = response.data;
            data.loading = false;
            dispatch(pages(data));
        }).catch((error) => {
            //handle error
            let data = error?.response?.data;
            data.loading = false;
            dispatch(pages(data))
        });
    } catch (error) {
        dispatch(pages({ error: true, loading: true, message: "Something went wrong!" }))
    }
}