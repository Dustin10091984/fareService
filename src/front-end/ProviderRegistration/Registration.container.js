import { connect } from 'react-redux';
import Registration from './Registration';
import { providerSignup, verifyPhoneNo, postBasicInfo, postServiceDetails } from "./../../store/Slices/providers/registration";

const mapStateToProps = (state) => ({
    providerSignup: state.registrationReducer?.signupProvider,
    verifyOpt: state.registrationReducer?.verify,
    basicInfoRes: state.registrationReducer?.basicInfo,
    serviceDetail: state.registrationReducer?.serviceDetail,
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
        },
        handleServiceDetails: (serviceDetails) => {
            dispatch(postServiceDetails(serviceDetails));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Registration);
