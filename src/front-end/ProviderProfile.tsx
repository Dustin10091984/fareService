import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProviderProfile } from "../store/Slices/providers/ProviderProfileSclice";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import Loading from "./common/Loading";
import { HOST } from "../constants";
import ProfileAvatar from "./Profile/profile.avatar";
import ProfilePortfolio from "./Profile/profile.portfolio";
import ProfileServices from "./Profile/profile.services";
import ProfileAvailability from "./Profile/profile.availability";
import ProfileHistory from "./Profile/profile.history";
import ProfileReviews from "./Profile/profile.reviews";
import BookProviderQuotation from "./BookProvider/service.request.quotation";
import { useModal } from "react-hooks-use-modal";
import { RootState } from "../store";
import BookServiceHourly from "./BookProvider/service.request.hourly";
import SubHeader from "./common/header/header.sub";
import ProfilePaymentMethods from "./Profile/profile.payment";
import { getMinutesFromTimeString } from "../helper/utils";
import { getQuestionAnswers } from "../store/Slices/services/QuestionAnswersSlice";
import { toast } from "react-toastify";
const modalConfig = {
  preventScroll: false,
  focusTrapOptions: {
    clickOutsideDeactivates: false,
  },
};
export const ProviderProfile = (props) => {
  const { id } = props.match.params;

  const [Modal, openBook, closeBook, isBookOpen] = useModal(
    "root",
    modalConfig
  );

  const dispatch = useDispatch();

  const providerProfile = useSelector<
    RootState,
    DataResponse<{ provider: IProvider; feedbacks: IFeedback[] }>
  >((state) => state.providerProfile as any);
  const questionAnswers = useSelector<RootState>((state) =>
    getQuestionAnswers(state.questionAnswers)
  );

  useEffect(() => {
    dispatch(getProviderProfile(id));
  }, [id]);

  const { error: err = false, message = "", data } = providerProfile ?? {};
  const { provider } = data ?? {};
  const {
    verified_at = "",
    provider_profile = null,
    provider_type = "Individual",
    schedules = [],
  } = provider ?? {};
  //const isService = provider_profile?.hourly_rate != null;
  const isService = provider_type == "Individual";
  const hoursPerWeek = Math.round(
    schedules.reduce(
      (total, schedule) =>
        total +
        getMinutesFromTimeString(schedule.to_time) -
        getMinutesFromTimeString(schedule.from_time),
      0
    ) / 60
  );

  const verification = (
    <p>
      ID: &ensp;
      <span className="text-gray-500">
        {verified_at ? (
          <>
            Verified&ensp;
            <img src="/assets/img/check.svg" className="d-inline" />
          </>
        ) : (
          "Not Verified"
        )}
      </span>
    </p>
  );
  const onBookClick = () => {
    const is_loggedin = !!localStorage.getItem("userToken");
    if (is_loggedin) {
      openBook();
    } else {
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
  /* const pp: IProvider = {
    ...provider,
    schedules: [
      {
        day: "Mon",
        from_time: "12:00",
        to_time: "18:00",
        id: 0,
        is_custom: 0,
        provider_id: 0,
      },
      {
        day: "Wed",
        from_time: "12:00",
        to_time: "18:00",
        id: 0,
        is_custom: 0,
        provider_id: 0,
      },
    ],
    blocked_slots: [
      {
        date: "2022-12-07",
        from_time: "08:00",
        to_time: "12:00",
      },
    ],
  }; */
  return (
    <>
      <Loading loading={providerProfile?.loading} />
      <Modal>
        {isService ? (
          <BookServiceHourly provider={provider} close={closeBook} />
        ) : (
          <BookProviderQuotation provider={provider} close={closeBook} />
        )}
      </Modal>
      <SubHeader title="Profile">
        <button className="fare-btn fare-btn-primary" onClick={onBookClick}>
          {isService ? "Book service" : "Book provider"}
        </button>
      </SubHeader>

      <section className="service-provider-sec py-16">
        {!providerProfile && (
          <div
            className="col-12 alert alert-warnig text-center"
            role="alert"
            style={{ fontSize: 20 }}
          >
            Please wait
          </div>
        )}
        {err && (
          <div
            className="col-12 alert alert-danger text-center"
            role="alert"
            style={{ fontSize: 20 }}
          >
            {providerProfile?.message}
          </div>
        )}
        {data?.provider && (
          <div className="container">
            <div className="d-flex xl:flex-nowrap md:flex-wrap gap-16">
              <div className="d-flex flex-column gap-16 basis-[38.4rem] flex-shrink-0">
                <ProfileAvatar provider={data.provider} />
                <ProfileAvailability provider={data.provider} />
                <ProfileServices provider={data.provider} />

                <div className="fare-card">
                  <h2>Hours per week</h2>
                  <p className="text-gray-500">
                    More than {hoursPerWeek || 30} hrs/week
                  </p>
                  <br />
                  <h2>Languages</h2>
                  <p>
                    English:&ensp;<span className="text-gray-500">Fluent</span>
                  </p>
                  <br />
                  <h2>Verification</h2>
                  {verification}
                </div>
                <ProfilePaymentMethods />
              </div>

              <div className="d-flex flex-column flex-grow gap-16">
                <div className="fare-card">
                  <h1 className="text-xl">Bio</h1>
                  <p>{data.provider.bio}</p>
                </div>

                <ProfilePortfolio provider={data.provider} />
                <ProfileHistory provider={data.provider} />
                <ProfileReviews
                  provider={data.provider}
                  feedbacks={data.feedbacks}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
