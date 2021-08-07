import { combineReducers } from "redux";
import userSclice from "./Slices/UserSlice";
import serviceSclice from "./Slices/services/ServiceSclice";
import providerSclice from "./Slices/providers/providerListSclice";

export default combineReducers({
    user: userSclice,
    service: serviceSclice,
    provider: providerSclice,
});