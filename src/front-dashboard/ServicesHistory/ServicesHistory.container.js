import { connect } from "react-redux";
import { ServicesHistory } from "./ServicesHistory";
import {
  getServiceRequestList,
  handleServiceRequestNotification,
  serviceRequestListUpdate,
} from "./../../store/Slices/services/RequestServiceSclice";
import { pay } from "../../store/Slices/payments/paymentSlice";
import { getOrderList } from "./../../store/Slices/order/orderSlice";
import {
  addFeedback,
  initialFeedback,
} from "./../../store/Slices/feedbacks/feedbackSlice";

const mapStateToProps = ({
  serviceRequest,
  paymentReducer,
  feedbackReducer,
  orderReducer,
}) => ({
  loading: orderReducer?.list?.loading,
  error: orderReducer?.list?.error,
  message: orderReducer?.list?.message,
  serviceRequestList: orderReducer?.list?.data,
  orderList: orderReducer?.list?.data,
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
    getServiceRequestList: (payload) => dispatch(getOrderList(payload)),
    getOrderList: (payload) => dispatch(getOrderList(payload)),
    handleServiceRequestNotification: (payload) =>
      dispatch(handleServiceRequestNotification(payload)),
    serviceRequestListUpdate: (payload) =>
      dispatch(serviceRequestListUpdate(payload)),
    pay: (payload) => dispatch(pay(payload)),
    addFeedback: (payload) => dispatch(addFeedback(payload)),
    initialFeedback: (payload) => dispatch(initialFeedback(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ServicesHistory);
