import { connect } from 'react-redux';
import { getVehicleTypes } from '../../store/Slices/moving/movingSlice.js';
import { getServiceQuestion } from '../../store/Slices/services/ServiceSclice.js';
import { Services } from './Services.jsx';

const mapStateToProps = (state) => ({
    headerMenu: state.headerMenuReducer,
    serviceData: state?.service,
    vehicleTypes: state?.movingReducer?.list,
});

const mapDispatchToProps = (dispatch) => {
    return {

        getServiceQuestion: (id) => {
            dispatch(getServiceQuestion(id));
        },
        getVehicleTypes: () => {
            dispatch(getVehicleTypes());
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Services);
