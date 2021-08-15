import { combineReducers } from "redux";
import userSclice from "./Slices/UserSlice";
import serviceSclice from "./Slices/services/ServiceSclice";
import requestServiceSlice from "./Slices/services/RequestServiceSclice";
import providerSclice from "./Slices/providers/providerListSclice";
import providerSchedule from "./Slices/providers/providerScheduleSclice";

export default combineReducers({
    user: userSclice,
    service: serviceSclice,
    serviceRequest: requestServiceSlice,
    provider: providerSclice,
    providerSchedule: providerSchedule,
});