import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import HomeSearchBar from "../searchbar/searchbar.home";
import { BaseHeader } from "./header.base";
export interface ISearchBarHeaderProps {}

export default function SearchBarHeader(props: ISearchBarHeaderProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return (
    <BaseHeader>
      {
        <div className="">
          <HomeSearchBar
            zipCode={Number(searchParams.get("zip_code")) || 0}
            subServiceId={Number(searchParams.get("subService")) || 0}
            placeId={searchParams.get("place_id")}
          />
        </div>
      }
    </BaseHeader>
  );
}
