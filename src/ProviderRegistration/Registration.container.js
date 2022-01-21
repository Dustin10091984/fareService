import { connect } from 'react-redux';
import Registration from './Registration';

const mapStateToProps = (state) => ({
    // deliveries: state.deliveryReducer.deliveries,
    // pharmacy: state.pharmacyReducer.pharmacy,
});
// console.log(state);

// const mapDispatchToProps = (dispatch) => {
//     return {
//       handlePostProperty: (propertyStore) => {
//         dispatch(propertyActions.createProperty.request(propertyStore), propertyStore);
//       },
//     };
//   };
//   export default connect(mapDispatchToProps, mapStateToProps)(PropertyForm);
export default connect(mapStateToProps, null)(Registration);
