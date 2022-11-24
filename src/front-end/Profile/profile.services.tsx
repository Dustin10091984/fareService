import * as React from "react";

export interface IProfileServicesProps {
  provider: IProvider;
}

export default function ProfileServices(props: IProfileServicesProps) {
  const { provider } = props;
  return (
    <div className="fare-card">
      <h1>Services</h1>
      <hr />

      <ul className="profile-links-left">
        {provider?.provider_services?.map((service, index) => {
          return (
            <li className="item" key={index}>
              <div className="link">
                <i className="fa fa-angle-right pr-2" aria-hidden="true"></i>{" "}
                {service?.sub_service?.name}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
