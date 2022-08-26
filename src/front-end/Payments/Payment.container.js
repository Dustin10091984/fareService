import { connect } from 'react-redux';
import { Payment } from './Payment';
import { getCartList } from "../../store/Slices/cart/cartsSlice";
import { addAddress, getAddresses } from "../../store/Slices/UserSlice";
import {
    postRequestService,
    getInitialRequestService,
} from "../../store/Slices/services/RequestServiceSclice";
import {
    createNewOrder,
    getOrderList,
    initial,
} from "../../store/Slices/order/orderSlice";

import { getPaymentCards } from "../../store/Slices/payments/paymentSlice";

const mapStateToProps = (state) => ({
    serviceRequest: state.serviceRequest,
    cartList: state.cartsReducer?.list.cart,
    addressesLoading: state.userReducer?.addresses?.loading,
    addressList: state.userReducer?.addresses?.data,
    addressesError: state.userReducer?.addresses?.error,
    addAddressData: state.userReducer?.address,
    orderLoading: state.orderReducer?.order?.loading,
    orderError: state.orderReducer?.order?.error,
    orderData: state.orderReducer?.order?.data,
    orderMessage: state.orderReducer?.order?.message,
    paymentCard: state.paymentReducer?.list,
});

const mapDispatchToProps = (dispatch) => ({
    getCartList: () => dispatch(getCartList()),
    postRequestService: (data) => dispatch(postRequestService(data)),
    getInitialRequestService: (data) => dispatch(getInitialRequestService(data)),
    addAddress: (data) => dispatch(addAddress(data)),
    getAddresses: (data) => dispatch(getAddresses(data)),
    createNewOrder: (data) => dispatch(createNewOrder(data)),
    getOrderList: (data) => dispatch(getOrderList(data)),
    initial: () => dispatch(initial()),
    getPaymentCards: () => dispatch(getPaymentCards()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
