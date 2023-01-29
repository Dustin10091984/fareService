import * as React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { StylesConfig } from "react-select";
import LocationInput from "../../components/input.location";
interface ILocation {
  label: string;
  value: string;
  zipCode?: number;
}
export interface IBookLocationProps extends IBookSliderProps {
  onPrev?: () => void;
  onNext?: (value: { location: ILocation }) => void;
}
export default function BookLocation(props: IBookLocationProps) {
  const [location, setLocation] = React.useState<ILocation>();
  const { onPrev, onNext, nextLabel = "Next", title = "Work Address" } = props;
  return (
    <div className="d-flex flex-column items-center gap-8">
      <span className="font-medium text-3xl">{title}</span>
      <div className="w-[48rem] py-12">
        <LocationInput
          isAddress={true}
          onChange={(v) => {
            setLocation(v);
          }}
          placeholder="Enter the location of your project"
        />
      </div>
      <div className="gap-8 d-flex">
        {onPrev && (
          <button
            className="fare-btn fare-btn-default fare-btn-lg"
            onClick={onPrev}
          >
            Previous
          </button>
        )}
        <button
          className="fare-btn fare-btn-primary fare-btn-lg"
          onClick={() => {
            onNext({ location });
          }}
          disabled={!location}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
