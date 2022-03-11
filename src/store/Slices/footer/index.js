import { createSlice } from '@reduxjs/toolkit'

const FooterSlice = createSlice({
    name: 'footer',
    initialState: {
        pageLinks: [],
    },
    reducers: {
        pageLinks: (state, action) => {
            return {
                ...state, pageLinks: action.payload
            };
        },

    },
});
export default FooterSlice.reducer
export const { pageLinks } = FooterSlice.actions