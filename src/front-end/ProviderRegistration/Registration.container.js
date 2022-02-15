import { connect } from 'react-redux';
import Registration from './Registration';
import { providerSignup, verifyPhoneNo, postBasicInfo } from "./../../store/Slices/providers/registration";

const mapStateToProps = (state) => ({
    providerSignup: state.registrationReducer?.signupProvider,
    verifyOpt: state.registrationReducer?.verify,
    basicInfoRes: state.registrationReducer?.basicInfo,
    headerMenu: state?.headerMenuReducer,
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleProviderSignup: (signupData) => {
            dispatch(providerSignup(signupData));
        },
        handleVerifyPhoneNo: (otpData) => {
            dispatch(verifyPhoneNo(otpData));
        },
        handleBasicInfoSubmit: (basicInfo) => {
            dispatch(postBasicInfo(basicInfo));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Registration);
