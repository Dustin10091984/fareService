import { connect } from "react-redux";
import { getVehicleTypes } from "../../store/Slices/moving/movingSlice";
import { getServiceQuestion } from "../../store/Slices/services/ServiceSclice";
import { getCountriesList } from "../../store/Slices/common";
import { Services } from "./Services";

const mapStateToProps = (state) => ({
  headerMenu: state.headerMenuReducer,
  serviceData: state?.service,
  vehicleTypes: state?.movingReducer?.list,
  countriesData: state?.commonReducer?.countries,
});
const mapDispatchToProps = (dispatch) => {
  return {
    getServiceQuestion: (id) => {
      dispatch(getServiceQuestion(id));
    },
    getVehicleTypes: () => {
      dispatch(getVehicleTypes());
    },
    getCountriesList: (params) => {
      dispatch(getCountriesList(params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Services);
