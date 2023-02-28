import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, Redirect, useParams } from 'react-router-dom';
import { RootState } from 'store';
import Loading from "front-end/common/Loading";
import clsx from "clsx";
import LocationInput from "components/input.location";
import {
  getServiceQuestion,
  ServiceState,
} from "../store/Slices/services/ServiceSclice";
import { Helmet } from 'react-helmet';
import ServiceWizard from "./Services/services.wizard";
import { HOST } from "../constants";

export interface IServicesInfoProps {
}

export default function ServicesInfo(props: IServicesInfoProps) {
  let { service, subService } = useParams<{ service: string, subService: string }>();
  let originalServiceName = service;
  let originalSubServiceName = subService;
  // alert(subService)
  const services = useSelector<RootState, IMenu[]>(state => state.headerMenuReducer);
  service = service.toLowerCase();
  subService = subService.toLowerCase();
  const matchingService = services.find(s => s.name.toLowerCase().replace(" ", "-") == service);
  const matchingSubService = matchingService?.sub_services.find(s => s.name.toLowerCase().replace(" ", "-") == subService);

  const _location = useLocation();
  const searchParams = new URLSearchParams(_location.search);
  const subServiceId = matchingSubService?.id;
  const serviceId = matchingService?.id;
  const placeId = searchParams.get("place_id") || "";
  const zipCode = searchParams.get("zip_code") || "";
  // alert(placeId);

  const history = useHistory();
  const dispatch = useDispatch();
  const serviceData = useSelector<RootState, ServiceState>(
    (state) => state.service
  );

  console.log(serviceData?.data, placeId);

  const [locationData, setLocationData] = React.useState<ILocation>();

  const getProviders = () => {
    let url = `/service-providers?subService=${subServiceId}`;
    if (zipCode) url = url + `&zip_code=${zipCode}`;
    if (placeId) url = url + `&place_id=${placeId}`;
    history.push(url);
  };

  React.useEffect(() => {
    console.log("dispatch ready")
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
            setLocationData({ placeId: value.value });
          }}
          defaultValue={zipCode}
        />
        <button
          className="fare-btn fare-btn-primary fare-btn-lg"
          disabled={!locationData}
          onClick={() => {
            history.push(
              `/services/${originalServiceName}/${originalSubServiceName}?${_location.search}&place_id=${locationData.placeId}`
            );
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );

  let meta;
  if (serviceData?.data) {
    meta = (
      <Helmet>
        <title>Farenow - {serviceData?.data?.name}</title>
        <meta name="description" content={serviceData?.data.terms} />
        <meta property="og:title" content={serviceData?.data.name} />
        
        {serviceData?.data?.service_contents.map((content) => (
          <meta property="og:description" content={content.description} />
        ))}
        {serviceData?.data?.service_contents.map((content) => (
          <meta property="og:image" content={content.image} />
        ))}
      </Helmet>
    );
  }

  const loading = !services || services.length <= 0;
  if(loading)
    return (
      <Loading loading backdrop={false} className={'h-[40rem]'} />
    );
  if (matchingSubService?.id)
    return (
      <>
        {meta}
        <div className="container py-32">
          {serviceData?.loading && (
            <Loading loading={true} backdrop={false} className="h-[24rem]" />
          )}
          {!serviceData?.loading && !placeId && locationSection}
          {placeId && serviceData?.data && (
            <ServiceWizard service={serviceData.data} onComplete={getProviders} />
          )}<br/>
          <div className="row">
            <div className="col-2"></div>
            <div className="col-6">
              <div className="font-bold text-3xl text-dark tracking-[-2px] leading-tight">
                <span>{serviceData?.data?.name}</span>
              </div>
            </div>
          </div>
          {serviceData?.data?.service_contents.map((content) => (
            <div className="row">
              <div className="col-2"></div>
              <div className="col-4">
                <div className="text-xl md:text-base text-dark mt-6 px-8">
                  <span>{content.description}</span>
                </div>
              </div>
              <div className="col-4">
                <img
                  src={
                    (content.image) && HOST + content.image ||
                    ""
                  }
                  loading="lazy"
                  className="img-fluid"
                  alt=""
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/assets/img/service1.jpg";
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  return <Redirect to={'/404'} />
}
