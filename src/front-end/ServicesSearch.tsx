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
import LocationInput from "components/input.location";
import clsx from "clsx";
import { Helmet } from 'react-helmet';
export interface IServicesSearchPageProps {}

export default function ServicesSearchPage(props: IServicesSearchPageProps) {
  const _location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const service = useSelector<RootState, ServiceState>(
    (state) => state.service
  );
  console.log(service);
  const searchParams = new URLSearchParams(_location.search);
  const subServiceId = searchParams.get("subService");
  const serviceId = searchParams.get("serviceId");
  const placeId = searchParams.get("place_id") || "";
  const zipCode = searchParams.get("zip_code") || "";
  

  const [location, setLocation] = React.useState<ILocation>();

  const getProviders = () => {
    let url = `/service-providers?subService=${subServiceId}`;
    if (zipCode) url = url + `&zip_code=${zipCode}`;
    if (placeId) url = url + `&place_id=${placeId}`;
    history.push(url);
  };

  React.useEffect(() => {
    dispatch(getServiceQuestion(subServiceId));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [subServiceId]);

  const locationSection = (
    <div className={clsx(["rounded-[32px] bg-white p-16 text-center shadow"])}>
      <div className="max-w-[60rem] mx-auto my-12 space-y-16">
        <div className="text-[4rem] font-medium">Enter your location</div>
        <LocationInput
          placeholder="Enter your location"
          onChange={(value) => {
            setLocation({ placeId: value.value });
          }}
          defaultValue={zipCode}
        />
        <button
          className="fare-btn fare-btn-primary fare-btn-lg"
          disabled={!location}
          onClick={() => {
            history.push(
              `/services/search${_location.search}&place_id=${location.placeId}`
            );
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );

  let meta;
  if (service?.data) {
    meta = (
      <Helmet>
        <title>Farenow - {service?.data?.name}</title>
        <meta name="description" content={service?.data.terms} />
        <meta property="og:title" content={service?.data.name} />
        
        {service?.data?.service_contents.map((content) => (
          <meta property="og:description" content={content.description} />
        ))}
        {service?.data?.service_contents.map((content) => (
          <meta property="og:image" content={content.image} />
        ))}
      </Helmet>
    );
  }
  return (
    <>
      {meta}
      <div className="container py-32">
        {service?.loading && (
          <Loading loading={true} backdrop={false} className="h-[24rem]" />
        )}
        {!service?.loading && !placeId && locationSection}
        {placeId && service?.data && (
          <ServiceWizard service={service.data} onComplete={getProviders} />
        )}
      </div>
    </>
  );
}
