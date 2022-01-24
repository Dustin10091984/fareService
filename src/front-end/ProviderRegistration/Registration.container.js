import { connect } from 'react-redux';
import Registration from './Registration';
import { providerSignup } from "./../../store/Slices/providers/registration";

const mapStateToProps = (state) => ({
    providerSignup: state.registrationReducer?.signupProvider,
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleProviderSignup: (signupData) => {
            dispatch(providerSignup(signupData));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Registration);
