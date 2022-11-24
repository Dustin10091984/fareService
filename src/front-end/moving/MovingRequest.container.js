import { connect } from 'react-redux';
import { makeMovingRequest, movingRequest as clear } from '../../store/Slices/moving/movingSlice';
import { MovingRequest } from './MovingRequest';

const mapStateToProps = (state) => ({
    movingRequestLoading: state.movingReducer?.movingRequest?.loading,
    movingRequestData: state.movingReducer?.movingRequest?.data,
    movingRequestError: state.movingReducer?.movingRequest?.error,
    movingRequestMessage: state.movingReducer?.movingRequest?.message,
});

const mapDispatchToProps = (dispatch) => ({
    makeMovingRequest: (data) => dispatch(makeMovingRequest(data)),
    clearMovingRequest: (data) => dispatch(clear(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(MovingRequest);
