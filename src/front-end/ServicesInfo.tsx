import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { RootState } from 'store';
import Loading from "front-end/common/Loading";

export interface IServicesInfoProps {
}

export default function ServicesInfo(props: IServicesInfoProps) {
  let { service, subService, location } = useParams<{ service: string, subService: string, location?: string }>();
  const services = useSelector<RootState, IMenu[]>(state => state.headerMenuReducer);
  service = service.toLowerCase();
  subService = subService.toLowerCase();
  const matchingService = services.find(s => s.name.toLowerCase().replace(" ", "-") == service);
  const matchingSubService = matchingService?.sub_services.find(s => s.name.toLowerCase().replace(" ", "-") == subService);

  const loading = !services || services.length <= 0;
  if(loading)
    return (
      <Loading loading backdrop={false} className={'h-[40rem]'} />
    );
  if (matchingSubService?.id)
    return (
      <Redirect to={`/services/search?subService=${matchingSubService.id}&zip_code=${location}`} />
    );
  return <Redirect to={'/404'} />
}
