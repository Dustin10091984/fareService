import { connect } from 'react-redux';
import { getServiceQuestion } from '../../store/Slices/services/ServiceSclice.js';
import { Services } from './Services.jsx';

const mapStateToProps = (state) => ({
    headerMenu: state.headerMenuReducer,
    serviceData: state?.service,
});

const mapDispatchToProps = (dispatch) => {
    return {

        getServiceQuestion: (id) => {
            dispatch(getServiceQuestion(id));
        },
        // handleverifyPhoneNo: (otpData) => {
        //     dispatch(verifyPhoneNo(otpData));
        // },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Services);
