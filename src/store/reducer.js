import { combineReducers } from "redux";
import userSclice from "./Slices/UserSlice";
import cleaningSclice from "./Slices/services/CleaningSclice";

export default combineReducers({
    user: userSclice,
    cleaning: cleaningSclice,
});