import * as React from "react";
import { Link } from "react-router-dom";
import { APP_STORE, GOOGLE_PLAY } from "../../../constants";

export interface IRegisterSucceedProps {
  title?: string;
  subTitle?: string;
}

export default function RegisterSucceed(props: IRegisterSucceedProps) {
  const { title = "", subTitle = "" } = props;
  return (
    <div className="d-flex flex-column items-center gap-8 py-20 ">
      <img src="/assets/img/quotation-succeed.svg" />
      <span className="font-bold text-[3.2rem]">{title}</span>
      <span className="text-gray-500 text-sm text-center">{subTitle}</span>
      <p className="text-xl font-medium text-gray-600">
        Download the Farenow App
      </p>
      <div className="flex gap-6 self-stretch">
        <a
          href={APP_STORE.provider}
          className="grow fare-btn bg-slate-900 text-white flex justify-center items-center gap-8"
        >
          <img
            src="/assets/img/app-store-logo-white.svg"
            className="w-[3rem] -ml-8"
          />
          <div className="text-xs">
            Download on the <br />{" "}
            <span className="font-bold text-sm">App Store</span>
          </div>
        </a>
        <a
          href={GOOGLE_PLAY.provider}
          className="grow fare-btn bg-slate-900 text-white flex justify-center items-center gap-8"
        >
          <img
            src="/assets/img/google-play-logo.svg"
            className="w-[4rem] -ml-8"
          />
          <div className="text-xs">
            Available on the <br />{" "}
            <span className="font-bold text-sm">Google Play</span>
          </div>
        </a>
      </div>
      <Link
        to={"/"}
        className="fare-btn fare-btn-primary fare-btn-lg self-stretch text-center"
      >
        Back Home
      </Link>
    </div>
  );
}
