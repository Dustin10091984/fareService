import { combineReducers } from "redux";
import userSclice from "./Slices/UserSlice";

export default combineReducers({
    user: userSclice,
});