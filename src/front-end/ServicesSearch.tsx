import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { RootState } from "../store";
import {
  getServiceQuestion,
  ServiceState,
} from "../store/Slices/services/ServiceSclice";
import ServiceWizard from "./Services/services.wizard";
import Loading from "./common/Loading";

export interface IServicesSearchPageProps {}

export default function ServicesSearchPage(props: IServicesSearchPageProps) {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const service = useSelector<RootState, ServiceState>(
    (state) => state.service
  );
  const searchParams = new URLSearchParams(location.search);
  const subServiceId = searchParams.get("subService");
  const serviceId = searchParams.get("serviceId");
  const placeId = searchParams.get("place_id") || "";
  const zipCode = searchParams.get("zip_code") || "";

  const getProviders = () => {
    let url = `/service-providers?subService=${subServiceId}`;
    if (zipCode) url = url + `&zip_code=${zipCode}`;
    if (placeId) url = url + `&place_id=${placeId}`;
    history.push(url);
  };
  React.useEffect(() => {
    dispatch(getServiceQuestion(subServiceId));
  }, [subServiceId]);
  return (
    <div className="container py-32">
      {service?.loading && <Loading loading={true} backdrop={false} />}
      {service?.data && (
        <ServiceWizard service={service.data} onComplete={getProviders} />
      )}
    </div>
  );
}
