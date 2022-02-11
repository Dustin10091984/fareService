import { connect } from 'react-redux';

import { MovingRequest } from './MovingRequest';

const mapStateToProps = (state) => ({
    headerMenu: state?.headerMenuReducer,
    serviceData: state?.service,
    vehicleTypes: state?.movingReducer?.list,
});

const mapDispatchToProps = (dispatch) => {
    return {

        // getServiceQuestion: (id) => {
        //     dispatch(getServiceQuestion(id));
        // },
        // getVehicleTypes: () => {
        //     dispatch(getVehicleTypes());
        // },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(MovingRequest);
