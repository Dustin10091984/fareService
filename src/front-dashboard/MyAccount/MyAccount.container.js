import { connect } from "react-redux";
import { MyAccount } from "./MyAccount";
import {
    addAddress,
    deleteAddress,
    getAddresses,
    getProfile,
    initialState,
} from "../../store/Slices/UserSlice";
import {
    getPaymentCards,
    addPaymentCard,
    deleteCard,
    paymentInitialState,
} from "./../../store/Slices/payments/paymentSlice";

const mapStateToProps = (state) => ({
    profile: state.userReducer?.profile,
    address: state.userReducer?.address,
    addressList: state.userReducer?.addresses,
    delAddress: state.userReducer?.delAddress,
    paymentCard: state.paymentReducer?.list,
    removeCard: state.paymentReducer?.removeCard,
    addCard: state.paymentReducer?.addCard,
});

const mapDispatchToProps = (dispatch) => {
    return {
        addAddress: (data) => dispatch(addAddress(data)),
        deleteAddress: (data) => dispatch(deleteAddress(data)),
        getAddresses: () => dispatch(getAddresses()),
        getProfile: (data) => dispatch(getProfile(data)),
        initialState: (data) => dispatch(initialState(data)),
        getPaymentCards: () => dispatch(getPaymentCards()),
        addPaymentCard: (data) => dispatch(addPaymentCard(data)),
        deleteCard: (data) => dispatch(deleteCard(data)),
        paymentInitialState: (data) => dispatch(paymentInitialState(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)