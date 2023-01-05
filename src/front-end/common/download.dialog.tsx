import * as React from "react";
import { APP_STORE, GOOGLE_PLAY } from "../../constants";

export interface IDownloadDialogProps {
  type: "APP_STORE" | "GOOGLE_PLAY";
}

export default function DownloadDialog(props: IDownloadDialogProps) {
  const { type } = props;
  const links = type == "APP_STORE" ? APP_STORE : GOOGLE_PLAY;
  const logo =
    type == "APP_STORE"
      ? "/assets/img/app-store-logo.svg"
      : "/assets/img/google-play-logo.svg";
  const title = type == "APP_STORE" ? "App Store" : "Google Play";
  return (
    <div className="fare-card">
      <h1 className="text-center text-primary-main flex items-center gap-6  px-36">
        <img src={logo} className="" />
        {title}
      </h1>
      <hr className="bg-gray-100 my-3" />
      <ul className="text-center text-gray-600">
        <li className="p-3">
          <i className="la la-service" />
          <a href={links.provider} target="blank">
            Download Provider App
          </a>
        </li>
        <li className="p-3">
          <a href={links.user} target="blank">
            Download User App
          </a>
        </li>
      </ul>
    </div>
  );
}
