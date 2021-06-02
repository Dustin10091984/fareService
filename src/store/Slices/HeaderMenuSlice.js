import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const HeaderMenuSlice = createSlice({
    name: 'header_menu',
    initialState: [],
    reducers: {
        updateHeaderMenu: (state, action) => {
            return action.payload;
        },
    },
});
export default HeaderMenuSlice.reducer
const { updateUser } = userSlice.actions