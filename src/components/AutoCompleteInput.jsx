import PlacesAutocomplete from "react-places-autocomplete";
import { classNames } from "../helper/class-name";

const AutoCompleteInput = ({
    id = "location",
    title,
    classes,
    placeholder,
    value,
    handleOnChange,
    handleOnSelect,
}) => {
    return (
        <div className={classNames("common-input", classes)}>
            {title && (
                <div
                    className="col-md-12 text-dark mb-2"
                    style={{ fontSize: 20 }}
                >
                    {title}
                </div>
            )}
            <PlacesAutocomplete
                value={value ? value : ""}
                onChange={handleOnChange}
                onSelect={handleOnSelect}
                // googleCallbackName="initOne"
            >
                {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder,
                                className: "location-search-input m-1",
                                id,
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && (
                                <div style={{ fontSize: 15 }}>Loading...</div>
                            )}
                            {suggestions.map((suggestion) => {
                                const className = suggestion.active
                                    ? "suggestion-item--active"
                                    : "suggestion-item";
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? {
                                          backgroundColor: "#fafafa",
                                          cursor: "pointer",
                                          fontSize: 15,
                                          margin: "5px",
                                      }
                                    : {
                                          backgroundColor: "#ffffff",
                                          cursor: "pointer",
                                          fontSize: 15,
                                          margin: "5px",
                                      };
                                return (
                                    <div
                                        key={suggestion.index}
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </div>
    );
};
export default AutoCompleteInput;
