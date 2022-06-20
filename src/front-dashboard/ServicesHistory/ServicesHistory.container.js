import { connect } from 'react-redux';
import { ServicesHistory } from './ServicesHistory';
import {
    getServiceRequestList,
    handleServiceRequestNotification,
    serviceRequestListUpdate,
} from './../../store/Slices/services/RequestServiceSclice'
import { pay } from '../../store/Slices/payments/paymentSlice';
import { addFeedback, initialFeedback } from "./../../store/Slices/feedbacks/feedbackSlice";

const mapStateToProps = (state) => ({
    loading: state?.serviceRequest?.list?.loading,
    error: state?.serviceRequest?.list?.error,
    message: state?.serviceRequest?.list?.message,
    serviceRequestList: state?.serviceRequest?.list?.data,
    payLoading: state?.paymentReducer?.payment?.loading,
    payError: state?.paymentReducer?.payment?.error,
    payMessage: state?.paymentReducer?.payment?.message,
    payData: state?.paymentReducer?.payment?.data,
    feedbackLoading: state?.feedbackReducer?.loading,
    feedbackError: state?.feedbackReducer?.error,
    feedbackMessage: state?.feedbackReducer?.message,
    feedbackData: state?.feedbackReducer?.data,
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
