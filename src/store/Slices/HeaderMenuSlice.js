import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const HeaderMenuSlice = createSlice({
    name: 'header_menu',
    initialState: [],
    reducers: {
        headerMenu: (state, action) => {
            return action.payload;
        },
    },
});
export default HeaderMenuSlice.reducer
export const { headerMenu } = HeaderMenuSlice.actions