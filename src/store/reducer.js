import { combineReducers } from "redux";
import userSclice from "./Slices/UserSlice";
import serviceSclice from "./Slices/services/ServiceSclice";
import requestServiceSlice from "./Slices/services/RequestServiceSclice";
import providerSclice from "./Slices/providers/providerListSclice";
import providerProfileSclice from "./Slices/providers/ProviderProfileSclice";
import providerSchedule from "./Slices/providers/providerScheduleSclice";
import chatlistSclice from "./Slices/chat/chatlistSclice";
import messageListSclice from "./Slices/chat/messageListSclice";
import messageSlice from "./Slices/chat/messageSlice";
import paymentSlice from "./Slices/payments/paymentSlice";
import feedbackSlice from "./Slices/feedbacks/feedbackSlice";

export default combineReducers({
    user: userSclice,
    service: serviceSclice,
    serviceRequest: requestServiceSlice,
    provider: providerSclice,
    providerProfile: providerProfileSclice,
    providerSchedule: providerSchedule,
    chatlistReducer : chatlistSclice,
    messageListReducer : messageListSclice,
    messageReducer : messageSlice,
    paymentReducer: paymentSlice,
    feedbackReducer: feedbackSlice
});