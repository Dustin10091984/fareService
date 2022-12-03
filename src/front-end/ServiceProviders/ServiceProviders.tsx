import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import ServiceType from "../../constants/ServiceType";
import PlacesAutocomplete from "react-places-autocomplete";
import { HOST } from "../../constants";
import Rating from "../../components/Rating";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DayPicker, { DateUtils } from "react-day-picker";
import "./Styles/Styles.css";
import { Filter } from "./Components/Filter";
import ProviderCard from "./Components/ProviderCard";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { getQuestionAnswers } from "./../../store/Slices/services/QuestionAnswersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "react-hooks-use-modal";
import BookServiceHourly from "../BookProvider/service.request.hourly";
import BookProviderQuotation from "../BookProvider/service.request.quotation";
import { RootState } from "../../store";
import { getInitialRequestService } from "../../store/Slices/services/RequestServiceSclice";
import { getProviderList } from "../../store/Slices/providers/providerListSclice";
import { toast } from "react-toastify";
import { getServiceQuestion } from "../../store/Slices/services/ServiceSclice";
const modalConfig = {
  preventScroll: false,
  focusTrapOptions: {
    clickOutsideDeactivates: false,
  },
};
export const ServiceProviders = (props) => {
  const history = useHistory();
  const location = useLocation<any>();

  const searchParams = new URLSearchParams(location.search);

  const subService = searchParams.get("subService");
  const placeId = searchParams.get("place_id");
  const zipCode = searchParams.get("zip_code");
  const questionAnswers = useSelector<RootState>((state) =>
    getQuestionAnswers(state.questionAnswers)
  );

  const dispatch = useDispatch();

  const ReactSwal = withReactContent(Swal);

  const [Modal, openBook, closeBook, isBookOpen] = useModal(
    "root",
    modalConfig
  );

  const [state, setState] = useState<{
    is_loggedin: boolean;
    loggedinErr?: any;
    error?: any;
    provider_id?: number;
    provider?: IProvider;
    /*selectedSlot: any;
    is_hourly: boolean;
    hours: number;
    address: string;
    addressErr: any;
    phone: string;
    detail: any;
    images: any[];
    previewImages: any[];
    detailErr: any;
    questionsErr: any;
    submitting: boolean;
    serviceRequest: any;*/
  }>({
    is_loggedin: false,
    /*selectedSlot: "",
    is_hourly: false,
    hours: 0,
    address: "",
    addressErr: "",
    phone: "",
    detail: "",
    images: [],
    previewImages: [],
    detailErr: "",
    questionsErr: "",
    submitting: false,
    error: "",
    serviceRequest: "",*/
  });

  const [value, setValue] = useState();
  const [isService, setIsService] = useState(false);

  const providerList = useSelector<RootState, { data: DataResponse<any> }>(
    (state) => state.provider
  );
  const providerSchedule: any = useSelector<RootState, any[]>(
    (state) => state.providerSchedule
  );

  useEffect(() => {
    return () => {
      dispatch(getInitialRequestService());
      // dispatch(setStateProvider(""));
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setState((state) => ({
        ...state,
        is_loggedin: true,
      }));
    }

    dispatch(
      getProviderList({
        search: location.search ?? "",
        params: {},
        loadMore: false,
      })
    );
  }, [location.search]);

  useEffect(() => {
    if (providerList?.data?.data?.length) {
      setState((state) => ({
        ...state,
        providerList: providerList,
      }));
    }
    if (providerSchedule.length) {
      setState((state) => ({
        ...state,
        providerSchedule: providerSchedule,
      }));
      handleCalendarClick(new Date());
    }
    if (!providerList?.data?.loading && providerList?.data?.error) {
      ReactSwal.fire({
        title: "Error",
        text: providerList?.data?.message || "Not found provider",
        confirmButtonText: "Close",
        icon: "error",
        confirmButtonColor: "#fea629",
      });
    }
  }, [providerList, providerSchedule]);

  /* useEffect(() => {
    const { error, loading } = serviceRequest;
    if (
      error == false &&
      loading == false &&
      serviceRequest?.message == "success"
    ) {
      qautationRef.current?.click();
      ReactSwal.fire({
        title: "Success!",
        text: "Successfully created request service",
        confirmButtonText: "Go To Service History",
        icon: "success",
        confirmButtonColor: "#fea629",
        allowOutsideClick: false,
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          handleGoToServicesHistory();
        }
        setState((state) => ({
          ...state,
          address: "",
          detail: "",
          images: [],
          previewImages: [],
        }));
      });
    }
    if (
      error == true &&
      loading == false &&
      typeof serviceRequest?.message == "string"
    ) {
      qautationRef.current.click();
      ReactSwal.fire({
        title: "Error!",
        text: serviceRequest?.message,
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#fea629",
        allowOutsideClick: false,
        showCloseButton: true,
      });
    }
  }, [serviceRequest]);
 */
  const handleContinueClick = (provider: IProvider) => {
    if (state.is_loggedin) {
      setState((state) => ({
        ...state,
        is_hourly: provider.provider_type == "Individual" ? true : false,
        provider_id: provider.id,
        provider,
        provider_service_requests_count:
          provider?.provider_service_requests_count,
      }));
      /* if (
          location?.state?.service_type !== ServiceType.MOVING &&
          provider.provider_type == "Individual"
        ) {
          getProviderSchedule(provider.id);
        } */
      setIsService(provider?.provider_type == "Individual");
      if (!questionAnswers) dispatch(getServiceQuestion(subService));
      openBook();
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      /* setState((state) => ({
        ...state,
        error: (
          <div
            className="col-md-12 alert alert-primary rounded-full px-5 bg-blue-400 text-blue-100 text-base font-medium"
            role="alert"
          >
            Please login
          </div>
        ),
      })); */
      toast.warning(
        <div>
          <p>
            You should login first to
            {provider.provider_type == "Individual"
              ? " book service"
              : " get a quotation"}
          </p>
          <Link
            to={`/login?returnUrl=${encodeURIComponent(window.location.href)}`}
          >
            Click here
          </Link>{" "}
          to login
        </div>,
        {
          autoClose: 10000,
          bodyClassName: "w-max",
        }
      );
    }
  };
  const handleCalendarClick = (selectedDate) => {
    setValue(selectedDate);
    let timeSlots = providerSchedule?.data?.data.filter((slot) => {
      if (slot?.provider_schedule) {
        return (
          +slot.provider_schedule?.year === selectedDate.getFullYear() &&
          +slot.provider_schedule.month === selectedDate.getMonth() + 1 &&
          +slot.provider_schedule.date === selectedDate.getDate()
        );
      }
    });
    if (timeSlots) {
      setState((state) => ({ ...state, timeSlots: timeSlots }));
    } else {
      setState((state) => ({ ...state, timeSlots: undefined }));
    }
    return;
  };

  const handleGoToServicesHistory = () => {
    dispatch(getInitialRequestService());
    props.history.replace({
      pathname: "/services-history",
    });
  };

  const handleLoadMoreClick = (page) => {
    getProviderList({
      search: !!location?.search && location.search,
      params: {
        page,
      },
      loadMore: true,
    });
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Modal>
        {isService ? (
          <BookServiceHourly provider={state.provider} close={closeBook} />
        ) : (
          <BookProviderQuotation provider={state.provider} close={closeBook} />
        )}
      </Modal>
      <section className="service-provider-sec py-16">
        <div className="container">
          <h1 className="text-3xl font-medium px-3 mb-16">
            Result of providers near you!
          </h1>

          <div className="row">
            <Filter providerType={location?.state?.service_type}></Filter>
            <div className="col-md-8">
              {state.error}
              {state.loggedinErr}
              {providerList?.data?.error && (
                <div className="text-center display-4">
                  {providerList?.data.message}
                </div>
              )}
              {providerList?.data?.loading && (
                <div className="text-center display-4 mb-5">
                  Please Wait we are working on it . . .
                </div>
              )}
              {!!providerList?.data?.data?.data?.length && (
                <ProviderCard
                  list={providerList?.data?.data?.data}
                  is_loggedin={state?.is_loggedin}
                  handleContinueClick={handleContinueClick}
                ></ProviderCard>
              )}
              {providerList?.data?.data?.current_page !=
                providerList?.data?.data?.last_page && (
                <div>
                  <button
                    className="button-common"
                    onClick={() =>
                      handleLoadMoreClick(
                        providerList?.data?.data?.current_page + 1
                      )
                    }
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
