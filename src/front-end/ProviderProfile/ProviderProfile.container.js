import { connect } from 'react-redux';
import { getProviderProfile } from '../../store/Slices/providers/ProviderProfileSclice';
import { ProviderProfile } from './ProviderProfile';

const mapStateToProps = (state) => ({
    profileloading: state.providerProfile?.loading,
    profileError: state.providerProfile?.error,
    profileMessage: state.providerProfile?.message,
    profile: state.providerProfile?.data,
});

const mapDispatchToProps = (dispatch) => ({
    getProviderProfile: (id) => dispatch(getProviderProfile(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProviderProfile);
