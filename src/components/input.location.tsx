import axios from "axios";
import clsx from "clsx";
import * as React from "react";
import { StylesConfig } from "react-select";
import ReactAsyncSelect from "react-select/async";
import { GOOGLE_API } from "../constants";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export interface ILocationInputProps {
  placeholder?: string;
  shadow?: boolean;
  isAddress?: boolean;
  onChange?: (value: {
    value: string;
    label: string;
    zipCode?: number;
  }) => void;
}

const searchStyle: StylesConfig = {
  control: (provided) => ({
    ...provided,
    border: "none",
    boxShadow: "none",
    background: "transparent",
  }),
  dropdownIndicator: () => ({
    display: "none",
  }),
  indicatorsContainer: () => ({ display: "none" }),
};

export default function LocationInput(props: ILocationInputProps) {
  const { placeholder = "", shadow = true, isAddress = false } = props;
  /**
   * Zip Code State
   */
  const [value, setValue] = React.useState<any>();
  const loadZipCodeOptions = async (value: string | number) => {
    const resp = await axios({
      method: "get",
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${GOOGLE_API}`,
    });
    const addresses = resp.data.results as {
      formatted_address: string;
      place_id: string;
      address_components: any;
    }[];
    return addresses.map((ad) => ({
      value: ad.place_id,
      label: ad.formatted_address,
      zipCode: Number(value),
      address_components: ad.address_components,
    }));
  };
  const loadAddressOptions = async (value: string | number) => {
    const resp = await axios({
      method: "get",
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&key=${GOOGLE_API}`,
      headers: {},
    });
    const addresses = resp.data.results as {
      description: string;
      place_id: string;
    }[];
    return addresses.map((ad) => ({
      value: ad.place_id,
      label: ad.description,
    }));
  };
  return (
    <div
      className={clsx([
        "border p-3 d-flex items-center rounded-[1.6rem]",
        shadow ? "shadow-normal" : "",
      ])}
    >
      <i className="fa fa-map-marker text-sm mx-3 text-secondary"></i>
      {isAddress && (
        <GooglePlacesAutocomplete
          selectProps={{
            value: value,
            onChange: (newValue: any) => {
              setValue(newValue);
              console.log(newValue);
              props.onChange &&
                props.onChange({
                  label: newValue.label,
                  value: newValue.value?.place_id,
                });
            },
            styles: {
              ...searchStyle,
              menuList: (provided) => ({
                ...provided,
              }),
            },
            placeholder,
            className: "px-2 w-100 text-base ",
          }}
        />
      )}
      {!isAddress && (
        <ReactAsyncSelect
          cacheOptions
          loadOptions={loadZipCodeOptions}
          placeholder={placeholder}
          className={clsx(["px-2 w-100", "text-base"])}
          styles={searchStyle}
          value={value}
          onChange={(newValue: any) => {
            setValue(newValue);
            props.onChange && props.onChange(newValue);
          }}
        />
      )}
    </div>
  );
}
