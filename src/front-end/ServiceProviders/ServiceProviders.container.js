import { connect } from 'react-redux';
import { makeMovingRequest } from '../../store/Slices/moving/movingSlice';
import { getProviderList } from '../../store/Slices/providers/providerListSclice';
import { getProviderSchedule } from '../../store/Slices/providers/providerScheduleSclice';
import { postRequestService } from '../../store/Slices/services/RequestServiceSclice';
import { ServiceProviders } from './ServiceProviders';

const mapStateToProps = ({
    provider,
    providerSchedule,
    serviceRequest,
    movingRequest
}) => ({
    providerList: provider,
    providerSchedule: providerSchedule,
    serviceRequest: serviceRequest,
    movingLoading: movingRequest?.loading,
    movingRequest: movingRequest?.data,
    movingError: movingRequest?.error,
    movingMessage: movingRequest?.message,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getProviderList: (payload) => dispatch(getProviderList(payload)),
        getProviderSchedule: (payload) => dispatch(getProviderSchedule(payload)),
        makeMovingRequest: (payload) => dispatch(makeMovingRequest(payload)),
        postRequestService: (payload) => dispatch(postRequestService(payload))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ServiceProviders);
