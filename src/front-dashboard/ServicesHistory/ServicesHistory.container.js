import { connect } from 'react-redux';
import { ServicesHistory } from './ServicesHistory';
import {
    getServiceRequestList,
    handleServiceRequestNotification,
    serviceRequestListUpdate,
} from './../../store/Slices/services/RequestServiceSclice'
import { pay } from '../../store/Slices/payments/paymentSlice';
import { addFeedback, initialFeedback } from "./../../store/Slices/feedbacks/feedbackSlice";

const mapStateToProps = ({ serviceRequest, paymentReducer, feedbackReducer }) => ({
    loading: serviceRequest?.list?.loading,
    error: serviceRequest?.list?.error,
    message: serviceRequest?.list?.message,
    serviceRequestList: serviceRequest?.list?.data,
    payLoading: paymentReducer?.payment?.loading,
    payError: paymentReducer?.payment?.error,
    payMessage: paymentReducer?.payment?.message,
    payData: paymentReducer?.payment?.data,
    feedbackLoading: feedbackReducer?.loading,
    feedbackError: feedbackReducer?.error,
    feedbackMessage: feedbackReducer?.message,
    feedbackData: feedbackReducer?.data,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getServiceRequestList: (payload) => dispatch(getServiceRequestList(payload)),
        handleServiceRequestNotification: (payload) => dispatch(handleServiceRequestNotification(payload)),
        serviceRequestListUpdate: (payload) => dispatch(serviceRequestListUpdate(payload)),
        pay: (payload) => dispatch(pay(payload)),
        addFeedback: (payload) => dispatch(addFeedback(payload)),
        initialFeedback: (payload) => dispatch(initialFeedback(payload))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ServicesHistory);
