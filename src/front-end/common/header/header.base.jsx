import { useEffect, useState, useRef } from "react";
import {
  Link,
  NavLink,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import axios from "axios";
// import ServiceType from "../../constants/ServiceType";
import { Chat } from "../../Chat/Chat";
import { useSelector, useDispatch } from "react-redux";
import { getNotifications } from "../../../store/Slices/notification";
import { headerMenu } from "../../../store/Slices/HeaderMenuSlice";
import { pageLinks } from "../../../store/Slices/footer";
import _ from "lodash";
import { useModal } from "react-hooks-use-modal";
import clsx from "clsx";

export const BaseHeader = (props) => {
  const { notification, children } = props;

  const [state, setState] = useState({
    notificationOpen: false,
    is_loggedin: false,
    header_menu: [],
    isChatOpen: false,
    is_search: false,
    subServices: [],
    showMenu: false,
  });

  const ref = useRef(null);

  const location = useLocation();
  const history = useHistory();
  const routeLoginMatch = useRouteMatch("/login");

  const dispatch = useDispatch();

  const notifications = useSelector((state) => state.notificationReducer.list);
  const [Modal, openChat, closeChat, isChatOpen] = useModal("root", {
    focusTrapOptions: { clickOutsideDeactivates: false },
  });

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setState((state) => ({
        ...state,
        is_loggedin: true,
      }));
      dispatch(getNotifications());
    }

    axios({
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/api/user/get-menu",
    })
      .then(function (response) {
        setState((state) => ({
          ...state,
          header_menu: response.data.data,
        }));
        dispatch(headerMenu(response.data.data));
        dispatch(pageLinks(response.data.links));
      })
      .catch((error) => {
        //handle error
        // console.log(error.response);
      });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setState((state) => ({
        ...state,
        is_loggedin: true,
      }));
    } else {
      setState((state) => ({
        ...state,
        is_loggedin: false,
      }));
    }
  }, [localStorage.getItem("userToken")]);

  useEffect(() => {
    if (state?.is_loggedin && notification?.fcmMessageId) {
      ref.current.click();
    }
  }, [notification?.fcmMessageId]);

  const handleLogout = () => {
    window.FB.getLoginStatus(function (response) {
      if (response.status === "connected") {
        window.FB.logout(function (response) {});
      }
    });
    window?.google?.accounts?.id?.disableAutoSelect();
    localStorage.clear();
    setState((state) => ({
      ...state,
      is_loggedin: false,
    }));
    history.push("/");
  };

  const mySearch = ({ target: { value } }) => {
    if (value) {
      setState((prev) => ({
        ...prev,
        is_search: true,
      }));
      const includesValue = (word, obj) =>
        _.some(obj?.name, (value) => _.includes(value.toLowerCase(), word));
      const words = _.words(value);
      let subServices = [];
      state?.header_menu.forEach((menu) => {
        if (menu.sub_services) {
          const searchResult = menu?.sub_services?.filter((subService) =>
            words.every((word) =>
              includesValue(word?.toLowerCase(), subService)
            )
          );
          if (searchResult?.length > 0) {
            subServices = [
              ...subServices,
              ...searchResult.map((data) => ({
                ...data,
                service: menu.name,
              })),
            ];
            setState((prev) => ({
              ...prev,
              subServices,
            }));
          }
        }
      });
    } else {
      setState((prev) => ({
        ...prev,
        is_search: false,
        subServices: [],
      }));
    }
  };

  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const headerUserSection = (
    <div className="d-flex space-x-6">
      <div
        ref={ref}
        type="button"
        className="link mr-3"
        data-backdrop="static"
        data-keyboard="false"
        data-toggle="modal"
        data-target="#chat"
        onClick={() => {
          openChat();
        }}
      >
        <img src="/assets/img/message.svg" className="img-fluid" />
      </div>

      <div className="dropdown">
        <div
          onClick={() => {
            setState({
              ...state,
              notificationOpen: !state.notificationOpen,
            });
            dispatch(getNotifications());
          }}
        >
          <div
            // className="btn btn-secondary dropdown-toggle"
            className="link"
            id="notificationDropdown"
            data-toggle="dropdown"
            style={{
              cursor: "pointer",
            }}
          >
            {/* <span className="user-name-farenow">Notification</span> */}
            <img src="/assets/img/notification.svg" className="img-fluid" />
          </div>
          <div
            className="dropdown-menu dropdown-menu-right mt-2 notification-dropdown-menu w-[48rem]"
            aria-labelledby="notificationDropdown"
            style={{
              fontSize: "1.5rem",
            }}
          >
            <div className="px-4 py-3 border-bottom text-sm text-primary-main font-medium">
              Notifications
            </div>
            <div className="notification-scroll">
              {notifications.loading && (
                <div className="notifications-item">
                  <div className="text-center">Loading...</div>
                </div>
              )}
              {!notifications.loading && notifications.error && (
                <div className="notifications-item">
                  <div className="text-center">{notifications.message}</div>
                </div>
              )}
              {!notifications.loading && notifications?.data?.length > 0 ? (
                notifications?.data?.map((notification, index) => (
                  <div
                    className="notifications-item px-3 d-flex gap-6"
                    key={index}
                    onClick={() => {
                      if (
                        notification?.data?.type == "SERVICE_REQUEST" ||
                        notification?.data?.type == "MOVING"
                      ) {
                        if (notification?.data?.service_request_id) {
                          history?.push(
                            `/service-detail/${notification?.data?.service_request_id}`
                          );
                        }
                      } else if (notification?.data?.type == "MESSAGE") {
                      }
                      setState({
                        ...state,
                        notificationOpen: !state.notificationOpen,
                      });
                    }}
                  >
                    <div className="bg-gray-300 flex-shrink-0 rounded-md mt-3 w-[1.2rem] h-[1.2rem]"></div>
                    <div className="text">
                      <div className="text-sm font-medium">
                        {notification?.data?.title}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(notification?.created_at).toLocaleString()}
                      </div>
                      <div className="text-[1.6rem] text-dark">
                        {notification?.data?.body}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <> </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="dropdown">
        <div
          // className="btn btn-secondary dropdown-toggle"
          className="link"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          style={{
            cursor: "pointer",
          }}
        >
          <img
            src={
              user_data?.image
                ? process.env.REACT_APP_API_BASE_URL + user_data.image
                : "/assets/img/user.svg"
            }
            className="img-fluid user-avatar"
          />
        </div>
        <div
          className="dropdown-menu dropdown-menu-right mt-2 user-dropdown-menu"
          aria-labelledby="dropdownMenuLink"
          style={{
            fontSize: "1.5rem",
          }}
        >
          <div className="px-4 py-3  border-solid border-b border-gray-100 text-sm text-primary-main font-medium">
            {user_data?.first_name}&ensp;{user_data?.last_name}
          </div>
          <Link
            to="/dashboard"
            className="dropdown-item border-solid border-b border-gray-100"
          >
            <i className="la la-home px-2 w-[3.6rem]" aria-hidden="true"></i>
            Dashboard
          </Link>
          <Link
            to="/my-account"
            className="dropdown-item  border-solid border-b border-gray-100"
          >
            <i className="la la-user px-2 w-[3.6rem] " aria-hidden="true"></i>
            My Account
          </Link>
          <Link to="" onClick={handleLogout} className="dropdown-item">
            <i
              className="la la-sign-out px-2 w-[3.6rem]"
              aria-hidden="true"
            ></i>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
  return (
    <header className="header-sec">
      <div className="container">
        <div className="row">
          <div className="col-md-12 d-flex align-items-center justify-content-between flex-wrap lg:flex-no-wrap">
            <div className="header-logo">
              {/**
               * Brand Logo
               */}
              <Link
                to={(location) => ({
                  ...location,
                  pathname: "/",
                  hash: "",
                })}
                onClick={(e) => {
                  if (location?.pathname == "/") {
                    e.preventDefault();
                  }
                }}
              >
                <img
                  src="/assets/img/logo.png"
                  alt=""
                  className="img-fluid"
                  // style={{
                  //     height: "15vh",
                  //     width: "auto",
                  // }}
                />
              </Link>
            </div>
            {children}
            <div className="d-flex align-items-center order-1 order-md-2">
              {state.is_loggedin ? (
                headerUserSection
              ) : (
                <>
                  <Link
                    to="/login"
                    className={clsx([
                      "fare-btn mx-2",
                      routeLoginMatch?.isExact
                        ? "fare-btn-primary"
                        : "fare-btn-outline-primary",
                    ])}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={clsx([
                      "fare-btn mx-2",
                      !routeLoginMatch
                        ? "fare-btn-primary"
                        : "fare-btn-outline-primary",
                    ])}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal>
        <div className="fare-card max-w-[120rem] w-[80vw] p-0">
          <div className="modal-header bg-primary-main text-white py-3 px-6 items-center">
            <h3
              className="modal-title text-[4rem] mx-6"
              id="exampleModalLongTitle"
            >
              Chats
            </h3>
            <button
              type="button"
              className="fare-btn text-white bg-[#ffffff30]"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => closeChat()}
            >
              &times;&ensp;Close
            </button>
          </div>
          <div className="modal-body p-0">
            <Chat
              notification={notification}
              isChatOpen={isChatOpen}
              is_loggedin={state?.is_loggedin}
              {...props}
            ></Chat>
          </div>
        </div>
      </Modal>
    </header>
  );
};
