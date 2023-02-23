import { createSlice } from "@reduxjs/toolkit";

const HeaderMenuSlice = createSlice({
  name: "header_menu",
  initialState: [] as IMenu[],
  reducers: {
    headerMenu: (state, action) => {
      return action.payload;
    },
  },
});
export default HeaderMenuSlice.reducer;
export const { headerMenu } = HeaderMenuSlice.actions;
