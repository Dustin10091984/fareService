import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        list: '',
    },
    reducers: {
        categoryList: (state, action) => {
            return {
                ...state,
                list: action.payload
            };
        },
    },
});
export default categorySlice.reducer;

export const { categoryList } = categorySlice.actions;

export const getCategoryList = (params) => async dispatch => {
    try {
        dispatch(categoryList({ error: false, loading: true }))
        await axios({
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `/api/user/category?${params}`,
        }).then((response) => {
            //handle success
            let data = response.data;
            data.loading = false;
            dispatch(categoryList(data));
        }).catch((error) => {
            //handle error
            let data = error?.response?.data;
            data.loading = false;
            dispatch(categoryList(data))
        });
    } catch (error) {
        dispatch(categoryList({ error: true, loading: true, message: "Something went wrong!" }))
    }
}

