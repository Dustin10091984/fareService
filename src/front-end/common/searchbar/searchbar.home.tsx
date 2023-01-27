import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { RootState } from "../../../store";
import ReactSelect, { StylesConfig } from "react-select";
import ReactAsyncSelect from "react-select/async";
import * as _ from "lodash";
import { GOOGLE_API } from "../../../constants";
import axios from "axios";
import { useForm } from "react-hook-form";

type SelectValue = {
  value: number | string;
  label: string;
  zipCode?: number;
};
export interface IHomeSearchBarProps {
  subServiceId?: number;
  zipCode?: number;
  placeId?: string;
  size?: "normal" | "large";
  onChange?: (data: { query: string; zipCode: number }) => void;
}

const searchStyle: StylesConfig = {
  control: (provided) => ({
    ...provided,
    border: "none",
    boxShadow: "none",
    background: "transparent",
    minHeight: "3rem",
  }),
  placeholder: (provided) => ({
    ...provided,
    whiteSpace: "nowrap",
    textOverflow: "clip",
  }),
  dropdownIndicator: () => ({
    display: "none",
  }),
  indicatorsContainer: () => ({ display: "none" }),
};

export default function HomeSearchBar(props: IHomeSearchBarProps) {
  const {
    size = "normal",
    subServiceId: propSubServiceId = 0,
    zipCode: propZipCode = 0,
    placeId: propPlaceId = "",
  } = props;

  const history = useHistory();

  /**
   * Sub Services State
   */
  const menus = useSelector<RootState, IMenu[]>(
    (state) => state.headerMenuReducer
  );

  const serviceOptions = menus
    .map((menu) => menu.sub_services)
    .flat()
    .map((s) => ({ value: s.id, label: s.name }));

  const [subService, setSubService] = useState<SelectValue>();

  useEffect(() => {
    if (!propSubServiceId) return;
    setSubService(serviceOptions.find((op) => op.value === propSubServiceId));
  }, [menus]);

  /**
   * Zip Code State
   */
  const loadZipCodeOptions = async (value: string | number) => {
    if (!value) return null;
    const resp = await axios({
      method: "get",
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${GOOGLE_API}`,
    });
    const addresses = resp.data.results as {
      formatted_address: string;
      place_id: string;
    }[];
    return addresses.map((ad) => ({
      value: ad.place_id,
      label: ad.formatted_address,
      zipCode: Number(value),
    }));
  };

  const [zipCode, setZipCode] = useState<SelectValue>();
  const [zipCodeInput, setZipCodeInput] = useState("");

  useEffect(() => {
    loadZipCodeOptions(propZipCode).then((options) => {
      if (!options) return;
      setZipCode(options.find((op) => op.value === propPlaceId));
    });
  }, []);

  const onSearch = () => {
    console.log(subService);
    console.log(zipCode);
    if (!subService?.value || !zipCode?.value) return;
    history.push(
      `/services/search?subService=${subService?.value}&place_id=${zipCode.value}&zip_code=${zipCode.zipCode}`
    );
  };

  const textSizeClsName = size == "normal" ? "text-[1.6rem]" : "text-sm";
  return (
    <>
      <div className="rounded-[24px] bg-primary-light d-flex p-2 items-center border-blue-200 border-x border-y">
        <img
          src="/assets/img/search-normal.svg"
          className="ml-4 mb-1 w-[2.5rem]  h-[2.5rem]"
        />
        <ReactSelect
          styles={searchStyle}
          options={serviceOptions}
          placeholder="What service do you need?"
          isSearchable={true}
          className={clsx([
            "text-sm px-2 grow w-[1px] lg:w-[25rem]",
            textSizeClsName,
          ])}
          name="subServiceId"
          value={subService}
          onChange={(newValue: any) => {
            setSubService(newValue);
          }}
        />
        <div className="bg-primary-main w-[1px] mx-3 my-2 self-stretch"></div>
        <i className="fa fa-map-marker text-sm mx-3 text-secondary d-none"></i>
        <img
          src="/assets/img/icon-map-marker.svg"
          className="ml-4 mb-1 w-[2.5rem] h-[2.5rem]"
        />
        <ReactAsyncSelect
          cacheOptions
          loadOptions={loadZipCodeOptions}
          placeholder="Zip code"
          className={clsx(["px-2 w-[15rem]", textSizeClsName])}
          styles={searchStyle}
          value={zipCode}
          onChange={(newValue: any) => {
            setZipCode(newValue);
          }}
          onInputChange={(val) => {
            setZipCodeInput(val);
          }}
          menuIsOpen={zipCodeInput != ""}
        />
        <button
          className={clsx(
            "fare-btn fare-btn-primary rounded-[24px]  text-[1.8rem] self-stretch",
            size == "normal" ? "py-2 px-5" : "py-4 px-16"
          )}
          onClick={onSearch}
        >
          Search
        </button>
      </div>
    </>
  );
}
