// import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import ServiceType from "./../../constants/ServiceType";
// import PlacesAutocomplete from "react-places-autocomplete";
// import moment from "moment";
// import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
// import Calendar from "react-calendar";
// import { MapLoadedApiContext } from "../../helper/context";
// import { ServiceArea } from "./components/ServiceArea";
// import { classNames } from "../../helper/class-name";
// import axios from "axios";
// import { GOOGLE_API, HOST } from "../../constants";

// export const Moving = (props) => {
//     const {
//         subServiceId,
//         movingState,
//         handleMovingState,
//         countriesData,
//         cityCountry,
//         handleCountryCityOrStateChange,
//     } = props;
//     const [state, setState] = useState({
//         vehicle_type_id: "",
//         from_address: "",
//         to_address: "",
//         start_lat: "",
//         start_lng: "",
//         end_lat: "",
//         end_lng: "",
//         date: new Date(),
//         zip_code: "",
//         place_id: "",
//         address: "",
//         service_type: ServiceType.MOVING,
//     });

//     const [googleAddress, setGoogleAddress] = useState();

//     const [zipCodes, setZipCodes] = useState();
//     const [zipCodesList, setZipCodesList] = useState();
//     const closeRef = useRef(null);

//     const [errors, setErrors] = useState();

//     useEffect(() => {
//         // dispatch(getVehicleTypes());
//         if (movingState) {
//             setState({
//                 ...movingState,
//             });
//         }
//     }, []);

//     useEffect(() => {
//         handleMovingState(state);
//     }, [state]);

//     useEffect(() => {
//         if (cityCountry?.state) {
//             setZipCodes(
//                 countriesData?.data
//                     ?.find(
//                         (countryData) => countryData.id == cityCountry?.country
//                     )
//                     ?.states?.find((state) => state.id == cityCountry?.state)
//                     ?.zip_codes
//             );
//         }
//     }, [cityCountry?.state]);

//     useEffect(() => {
//         setZipCodesList();
//     }, [cityCountry?.state, cityCountry?.country]);

//     const handleChangeZipCode = async (e) => {
//         const { name, value } = e.target;
//         // handleSearchZipCode(e);
//         setState((state) => ({
//             ...state,
//             address: value,
//             selectedZipCode: false,
//         }));
//         setGoogleAddress((prevState) => ({
//             ...prevState,
//             loading: true,
//         }));
//         await axios({
//             method: "get",
//             url: `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${GOOGLE_API}`,
//         })
//             .then(function (response) {
//                 if (response.data.results.length > 0) {
//                     setGoogleAddress((prevState) => ({
//                         ...prevState,
//                         response: response.data.results,
//                         errorMessage: null,
//                         loading: false,
//                     }));
//                 } else {
//                     setGoogleAddress((prevState) => ({
//                         ...prevState,
//                         response: null,
//                         errorMessage: "Not match any address",
//                         loading: false,
//                     }));
//                 }
//             })
//             .catch((error) => {
//                 setGoogleAddress((prevState) => ({
//                     ...prevState,
//                     response: null,
//                     errorMessage: "Please Enter Valid Address",
//                     loading: false,
//                 }));
//             });
//     };

//     const handleSelectAddress = async (address) => {
//         const { place_id, address_components, formatted_address } = address;
//         const postalCode = address_components?.find((address) => {
//             return address?.types?.includes("postal_code")
//                 ? address?.long_name
//                 : null;
//         });

//         setState((prev) => ({
//             ...prev,
//             address: formatted_address,
//         }));

//         let prms = new URLSearchParams();
//         prms.append("place_id", place_id);
//         if (state?.zip_code) {
//             prms.append("zip_code", state?.zip_code);
//         }
//         prms.append(
//             "vehicle_type_id",
//             props?.vehicle_type_id || state?.vehicle_type_id
//         );

//         await axios({
//             method: "get",
//             url: `${HOST}/api/user/services/check-place/${place_id}?${prms.toString()}`,
//         })
//             .then(function (response) {
//                 setState((prev) => ({
//                     ...prev,
//                     place_id,
//                     address: formatted_address,
//                     selectedZipCode: true,
//                 }));
//                 !!postalCode?.long_name &&
//                     handleSelectZipCode(postalCode?.long_name);
//                 showError(false);
//             })
//             .catch((error) => {
//                 setState((prev) => ({
//                     ...prev,
//                     place_id,
//                     address: "",
//                     selectedZipCode: false,
//                 }));
//                 // handleZipCodeChange({
//                 //     target: {
//                 //         name: "address",
//                 //         value: "",
//                 //     },
//                 // });
//                 showError(true);
//             });

//         // if (postalCode?.long_name) {
//         //     const data = zipCodes?.find(
//         //         ({ code }) => code == postalCode?.long_name
//         //     );
//         //     if (data) {
//         //         handleSelectZipCode(data?.code);
//         //         error(false);
//         //     } else {
//         //         handleSelectZipCode("");
//         //         error(true);
//         //     }
//         // } else {
//         //     handleSelectZipCode("");
//         //     error(true);
//         // }
//     };

//     const showError = (isError) => {
//         setState((prevState) => ({
//             ...prevState,
//             errors: {
//                 ...prevState.errors,
//                 notFound: isError ? "Not found provider on this location" : "",
//             },
//         }));
//     };

//     const handleSearchZipCode = ({ target }) => {
//         const data = zipCodes?.filter(({ code }) =>
//             code.includes(target.value)
//         );
//         // setZipCodesList(data);
//         setErrors({
//             notFound: data?.length ? "" : "Zip Code not found",
//         });
//     };

//     const handleFromAdessSelect = (from_address) => {
//         setState((state) => ({
//             ...state,
//             from_address,
//         }));

//         geocodeByAddress(from_address)
//             .then((results) => getLatLng(results[0]))
//             .then(({ lat, lng }) => {
//                 setState((state) => ({
//                     ...state,
//                     start_lat: `${lat}`,
//                     start_lng: `${lng}`,
//                 }));
//             });
//     };

//     const handleToAdessSelect = (to_address) => {
//         setState((state) => ({
//             ...state,
//             to_address,
//         }));

//         geocodeByAddress(to_address)
//             .then((results) => getLatLng(results[0]))
//             .then(({ lat, lng }) => {
//                 setState((state) => ({
//                     ...state,
//                     end_lat: `${lat}`,
//                     end_lng: `${lng}`,
//                 }));
//             });
//     };

//     const handleCalendarClick = (selectedDate) => {
//         // let newDate = new Date();
//         // if (moment(selectedDate).isSameOrAfter(newDate.setHours(0, 0, 0, 0))) {
//         closeRef.current.click();
//         setState((state) => ({
//             ...state,
//             date: selectedDate,
//         }));
//         // }
//     };

//     const handleSelectZipCode = (code) => {
//         setState((state) => ({
//             ...state,
//             zip_code: code ? code : "",
//             zipCodeErr: code ? "" : "Please select a zip code",
//             selectedZipCode: code ? true : false,
//         }));
//     };

//     return (
//         <>
//             <div className="title-move mb-5">
//                 please select your moving location.
//             </div>

//             <div className="mb-1">
//                 {/* <hr /> */}
//                 {/* <div className="col-md-12 px-0 text-dark rem-2">
//                     Choose service area
//                     <strong className="text-danger">*</strong>
//                 </div>
//                 <div className="d-flex justify-content-between">
//                     <ServiceArea
//                         {...{
//                             countriesData: countriesData?.data,
//                             cityCountry,
//                             handleCountryCityOrStateChange,
//                         }}
//                     />
//                 </div> */}
//                 <div
//                     className="col-md-12 px-0 text-dark"
//                     style={{ fontSize: "2rem" }}
//                 >
//                     Service area
//                     <strong className="text-danger">*</strong>
//                 </div>
//                 <div className={classNames("common-input", "pr-1", "rem-1-5")}>
//                     <input
//                         // disabled={!cityCountry?.state}
//                         type="text"
//                         name="zip_code"
//                         placeholder="Enter location"
//                         value={state.address}
//                         onChange={handleChangeZipCode}
//                         // onChange={(e) => {
//                         //     handleChangeZipCode(e);
//                         //     handleSearchZipCode(e);
//                         // }}
//                         // onClick={(e) => {
//                         //     handleSearchZipCode(e);
//                         // }}
//                         autoComplete="off"
//                     />
//                     {!state?.selectedZipCode &&
//                         googleAddress?.response?.length > 0 &&
//                         googleAddress?.response?.map((address, index) => (
//                             <div
//                                 className="text-dark mt-2 mb-2"
//                                 onClick={() => handleSelectAddress(address)}
//                                 role="button"
//                                 key={index}
//                             >
//                                 {address.formatted_address}
//                             </div>
//                         ))}
//                     {(() => {
//                         if (googleAddress?.errorMessage)
//                             return (
//                                 <div className="text-danger mt-2 mb-2">
//                                     {googleAddress?.errorMessage}
//                                 </div>
//                             );
//                         else if (googleAddress?.loading)
//                             return (
//                                 <div className="text-dark mt-2 mb-2">
//                                     Loading...
//                                 </div>
//                             );
//                         else if (state?.errors?.notFound)
//                             return (
//                                 <div className="text-danger mt-2 mb-2">
//                                     {state?.errors?.notFound}
//                                 </div>
//                             );
//                         else if (state?.zipCodeErr)
//                             return (
//                                 <div className="text-danger mt-2 mb-2">
//                                     {state?.zipCodeErr}
//                                 </div>
//                             );
//                         else return null;
//                     })()}
//                 </div>
//             </div>
//             {/*
//             {!!zipCodesList?.length ? (
//                 state?.selectedZipCode == false && (
//                     <>
//                         <center
//                             className="col-md-12 text-dark mb-1 mt-1"
//                             style={{
//                                 fontSize: "1.5rem",
//                             }}
//                         >
//                             Please Select Zip Code
//                         </center>
//                         {zipCodesList?.map((data, index) => (
//                             <div
//                                 key={index}
//                                 className="col-md-12 text-dark mb-1 mt-1"
//                                 style={{
//                                     fontSize: "1.5rem",
//                                     border: "1px solid #F1F2F7",
//                                     backgroundColor: "#F1F2F7",
//                                     borderRadius: "5px",
//                                     cursor: "pointer",
//                                 }}
//                                 data-code={data?.code}
//                                 onClick={() => handleSelectZipCode(data?.code)}
//                             >
//                                 {data?.code}
//                             </div>
//                         ))}
//                     </>
//                 )
//             ) : (
//                 <></>
//             )} */}

//             <MapLoadedApiContext.Consumer>
//                 {(isLoading) =>
//                     isLoading && (
//                         <>
//                             <div className="mb-3">
//                                 <div
//                                     className="col-md-12 px-0 text-dark"
//                                     style={{ fontSize: "2rem" }}
//                                 >
//                                     Moving From
//                                     <strong className="text-danger">*</strong>
//                                 </div>
//                                 <div className="common-input p-1">
//                                     <PlacesAutocomplete
//                                         value={state.from_address}
//                                         onChange={(from_address) =>
//                                             setState((state) => ({
//                                                 ...state,
//                                                 from_address,
//                                             }))
//                                         }
//                                         onSelect={handleFromAdessSelect}
//                                         // googleCallbackName="initOne"
//                                     >
//                                         {({
//                                             getInputProps,
//                                             suggestions,
//                                             getSuggestionItemProps,
//                                             loading,
//                                         }) => (
//                                             <div>
//                                                 <input
//                                                     {...getInputProps({
//                                                         placeholder: "From ...",
//                                                         className:
//                                                             "location-search-input m-1",
//                                                     })}
//                                                 />
//                                                 <div className="autocomplete-dropdown-container">
//                                                     {loading && (
//                                                         <div>Loading...</div>
//                                                     )}
//                                                     {suggestions.map(
//                                                         (suggestion) => {
//                                                             const className =
//                                                                 suggestion.active
//                                                                     ? "suggestion-item--active"
//                                                                     : "suggestion-item";
//                                                             // inline style for demonstration purpose
//                                                             const style =
//                                                                 suggestion.active
//                                                                     ? {
//                                                                           backgroundColor:
//                                                                               "#fafafa",
//                                                                           cursor: "pointer",
//                                                                           fontSize: 15,
//                                                                           margin: "5px",
//                                                                       }
//                                                                     : {
//                                                                           backgroundColor:
//                                                                               "#ffffff",
//                                                                           cursor: "pointer",
//                                                                           fontSize: 15,
//                                                                           margin: "5px",
//                                                                       };
//                                                             return (
//                                                                 <div
//                                                                     key={
//                                                                         suggestion.index
//                                                                     }
//                                                                     {...getSuggestionItemProps(
//                                                                         suggestion,
//                                                                         {
//                                                                             className,
//                                                                             style,
//                                                                         }
//                                                                     )}
//                                                                 >
//                                                                     <span>
//                                                                         {
//                                                                             suggestion.description
//                                                                         }
//                                                                     </span>
//                                                                 </div>
//                                                             );
//                                                         }
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </PlacesAutocomplete>
//                                 </div>
//                             </div>
//                             <div className="mb-3">
//                                 <div
//                                     className="col-md-12 px-0 text-dark"
//                                     style={{ fontSize: "2rem" }}
//                                 >
//                                     Moving To
//                                     <strong className="text-danger">*</strong>
//                                 </div>
//                                 <div className="common-input pr-1">
//                                     <PlacesAutocomplete
//                                         value={state.to_address}
//                                         onChange={(to_address) =>
//                                             setState((state) => ({
//                                                 ...state,
//                                                 to_address,
//                                             }))
//                                         }
//                                         onSelect={handleToAdessSelect}
//                                         // googleCallbackName="initTwo"
//                                     >
//                                         {({
//                                             getInputProps,
//                                             suggestions,
//                                             getSuggestionItemProps,
//                                             loading,
//                                         }) => (
//                                             <div>
//                                                 <input
//                                                     {...getInputProps({
//                                                         placeholder: "To ...",
//                                                         className:
//                                                             "location-search-input m-1",
//                                                     })}
//                                                 />
//                                                 <div className="autocomplete-dropdown-container">
//                                                     {loading && (
//                                                         <div>Loading...</div>
//                                                     )}
//                                                     {suggestions.map(
//                                                         (suggestion) => {
//                                                             const className =
//                                                                 suggestion.active
//                                                                     ? "suggestion-item--active"
//                                                                     : "suggestion-item";
//                                                             // inline style for demonstration purpose
//                                                             const style =
//                                                                 suggestion.active
//                                                                     ? {
//                                                                           backgroundColor:
//                                                                               "#fafafa",
//                                                                           cursor: "pointer",
//                                                                           fontSize: 15,
//                                                                           margin: "5px",
//                                                                       }
//                                                                     : {
//                                                                           backgroundColor:
//                                                                               "#ffffff",
//                                                                           cursor: "pointer",
//                                                                           fontSize: 15,
//                                                                           margin: "5px",
//                                                                       };
//                                                             return (
//                                                                 <div
//                                                                     key={
//                                                                         suggestion.index
//                                                                     }
//                                                                     {...getSuggestionItemProps(
//                                                                         suggestion,
//                                                                         {
//                                                                             className,
//                                                                             style,
//                                                                         }
//                                                                     )}
//                                                                 >
//                                                                     <span>
//                                                                         {
//                                                                             suggestion.description
//                                                                         }
//                                                                     </span>
//                                                                 </div>
//                                                             );
//                                                         }
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </PlacesAutocomplete>
//                                 </div>
//                             </div>
//                             <div className="mb-3">
//                                 <div
//                                     className="col-md-12 px-0 text-dark"
//                                     style={{ fontSize: "2rem" }}
//                                 >
//                                     Moving Date
//                                     <strong className="text-danger">*</strong>
//                                 </div>
//                                 <div
//                                     className="common-input pr-1"
//                                     data-backdrop="static"
//                                     data-keyboard="false"
//                                     data-toggle="modal"
//                                     data-target="#date"
//                                 >
//                                     <input
//                                         type="text"
//                                         placeholder="date e.g 2222-12-30"
//                                         value={
//                                             state.date
//                                                 ? moment(state.date).format(
//                                                       "YYYY-MM-DD"
//                                                   )
//                                                 : ""
//                                         }
//                                         onChange={(e) =>
//                                             setState((state) => ({
//                                                 ...state,
//                                                 date: e.target.value,
//                                             }))
//                                         }
//                                     />
//                                 </div>
//                             </div>
//                         </>
//                     )
//                 }
//             </MapLoadedApiContext.Consumer>

//             <div className="text-center">
//                 {state.from_address !== "" &&
//                 state.to_address !== "" &&
//                 state.date !== "" &&
//                 (state.zip_code !== "" || state?.place_id) &&
//                 props?.vehicle_type_id !== "" &&
//                 state?.selectedZipCode ? (
//                     <Link
//                         type="button"
//                         to={{
//                             pathname: "/service-providers",
//                             state: {
//                                 ...state,
//                                 vehicle_type_id: props?.vehicle_type_id,
//                                 sub_service_id: props?.subServiceId,
//                                 place_id: state?.place_id,
//                                 zip_code: state?.zip_code,
//                             },
//                         }}
//                         className="button-common mt-4 w-100"
//                     >
//                         Get Providers
//                     </Link>
//                 ) : (
//                     <button
//                         disabled
//                         type="button"
//                         className="button-common mt-4 w-100"
//                     >
//                         Get Providers
//                     </button>
//                 )}
//             </div>

//             <div
//                 className="modal fade bd-example-modal-md"
//                 id="date"
//                 tabIndex="-1"
//                 role="dialog"
//                 aria-labelledby="exampleModalCenterTitle"
//                 aria-hidden="true"
//             >
//                 <div
//                     className="modal-dialog modal-dialog-centered modal-md"
//                     role="document"
//                 >
//                     <div className="modal-content">
//                         <div
//                             className="modal-header"
//                             style={{
//                                 fontSize: "1.5rem",
//                             }}
//                         >
//                             <h4
//                                 className="modal-title mt-2"
//                                 id="exampleModalLongTitle"
//                             >
//                                 Select Date
//                             </h4>
//                             <button
//                                 type="button"
//                                 className="close"
//                                 data-dismiss="modal"
//                                 aria-label="Close"
//                                 ref={closeRef}
//                             >
//                                 <span
//                                     aria-hidden="true"
//                                     style={{
//                                         fontSize: "3rem",
//                                     }}
//                                 >
//                                     &times;
//                                 </span>
//                             </button>
//                         </div>
//                         <div className="modal-body">
//                             <div className="row m-2">
//                                 <div className="col-12">
//                                     <center className="col-12">
//                                         <div
//                                             className="row justify-content-md-center"
//                                             style={{
//                                                 fontSize: "1.5rem",
//                                             }}
//                                         >
//                                             <Calendar
//                                                 onChange={handleCalendarClick}
//                                                 minDate={new Date()}
//                                                 value={state?.date}
//                                             />
//                                         </div>
//                                     </center>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };
