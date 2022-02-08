import { connect } from 'react-redux';
import { Services } from './Services.jsx';
// import { providerSignup, verifyPhoneNo } from "./../../store/Slices/providers/registration";

const mapStateToProps = (state) => ({
    headerMenu: state.headerMenuReducer,
    // verifyOpt: state.registrationReducer?.verify,
});

const mapDispatchToProps = (dispatch) => {
    return {
        // handleProviderSignup: (signupData) => {
        //     dispatch(providerSignup(signupData));
        // },
        // handleverifyPhoneNo: (otpData) => {
        //     dispatch(verifyPhoneNo(otpData));
        // },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Services);
