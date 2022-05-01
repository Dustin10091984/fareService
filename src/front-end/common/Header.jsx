import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, withRouter, useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import ServiceType from "../../constants/ServiceType";
import { Chat } from "../Chat/Chat";
import { useSelector, useDispatch } from "react-redux";
import { getNotifications } from "../../store/Slices/notification";
import { headerMenu } from "../../store/Slices/HeaderMenuSlice";
import { pageLinks } from "../../store/Slices/footer";

const Header = (props) => {

    const { notification } = props;

    const [state, setState] = useState({
        notificationOpen: false,
        is_loggedin: false,
        header_menu: [],
        isChatOpen: false,
    });

    const ref = useRef(null);

    const location = useLocation();

    const history = useHistory();

    const dispatch = useDispatch();

    const notifications = useSelector(
        (state) => state.notificationReducer.list
    );

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
        }
    }, [localStorage.getItem("userToken")]);

    useEffect(() => {
        if(state?.is_loggedin){
            if(notification?.fcmMessageId){
                console.log(notification);
                ref.current.click();
            }
        }
    }, [notification?.fcmMessageId]);

    const handleLogout = () => {
        localStorage.clear();
        setState((state) => ({
            ...state,
            is_loggedin: false,
        }));
    };

    const header_menu = state.header_menu.map((menu, idx) => {
        return (
            <li className="nav-item" key={`menu-${idx}`}>
                <div
                    className="nav-link"
                    style={{
                        cursor: "default",
                    }}
                >
                    {menu.name}{" "}
                    <i className="fa fa-angle-down pl-1" aria-hidden="true"></i>
                </div>
                {menu.sub_services && menu.sub_services.length ? (
                    <ul className="dropdownmenu">
                        {menu.sub_services.map((sub_menu, index) => {
                            return (
                                <li
                                    className="nav-item"
                                    key={`sub-menu-${index}`}
                                >
                                    <NavLink
                                        to={`/services/${menu.id}/${sub_menu.id}#cleaning-services`}
                                        // ${
                                        //     menu.id == 3
                                        //         ? "?service_type=" +
                                        //           ServiceType.MOVING
                                        //         : ""
                                        // }`}
                                        className="nav-link border-bottom"
                                    >
                                        <i
                                            className="fa fa-angle-right pr-2"
                                            aria-hidden="true"
                                        ></i>{" "}
                                        {sub_menu.name}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    ""
                )}
            </li>
        );
    });

    return (
        <>
            <header className="header-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 d-flex align-items-center justify-content-between flex-wrap flex-md-nowrap">
                            <div className="header-logo">
                                <Link to={location => ({
                                    ...location,
                                    pathname: "/",
                                })} >
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

                            <div className="header-search d-flex align-items-center order-2 order-md-1">
                                <form action="">
                                    <div className="input-box d-flex align-items-center">
                                        <div className="icon-div">
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M7.5 1.18269C8.74969 1.18155 9.97165 1.55108 11.0113 2.24454C12.0509 2.938 12.8615 3.92423 13.3405 5.07847C13.8196 6.23271 13.9455 7.50309 13.7024 8.7289C13.4593 9.95472 12.8581 11.0809 11.9748 11.965C11.0916 12.849 9.96593 13.4513 8.74034 13.6955C7.51474 13.9397 6.24425 13.8149 5.08958 13.337C3.9349 12.859 2.94793 12.0493 2.25352 11.0103C1.55911 9.9713 1.18847 8.74969 1.18846 7.5C1.19604 5.82788 1.86325 4.22631 3.04509 3.04339C4.22694 1.86047 5.82789 1.1918 7.5 1.18269ZM7.5 0C6.01664 0 4.56659 0.439867 3.33323 1.26398C2.09986 2.08809 1.13856 3.25943 0.570907 4.62987C0.00324974 6.00032 -0.145275 7.50832 0.144114 8.96318C0.433503 10.418 1.14781 11.7544 2.1967 12.8033C3.2456 13.8522 4.58197 14.5665 6.03682 14.8559C7.49168 15.1453 8.99968 14.9967 10.3701 14.4291C11.7406 13.8614 12.9119 12.9001 13.736 11.6668C14.5601 10.4334 15 8.98336 15 7.5C15 5.51088 14.2098 3.60322 12.8033 2.1967C11.3968 0.790176 9.48913 0 7.5 0Z"
                                                    fill="#B6BCC1"
                                                />
                                                <path
                                                    d="M17.84 17.0655L13.7819 13L13 13.7726L17.0581 17.8381C17.1091 17.8891 17.1697 17.9297 17.2364 17.9575C17.3032 17.9853 17.3748 17.9997 17.4471 18C17.5195 18.0003 17.5912 17.9863 17.6581 17.959C17.725 17.9317 17.7859 17.8915 17.8373 17.8408C17.8886 17.7901 17.9294 17.7298 17.9573 17.6634C17.9852 17.5969 17.9997 17.5257 18 17.4537C18.0003 17.3817 17.9863 17.3104 17.9588 17.2438C17.9314 17.1772 17.891 17.1166 17.84 17.0655Z"
                                                    fill="#B6BCC1"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search for services (e.g. “cleaning”)"
                                        />
                                        <button type="button">Search</button>
                                    </div>
                                </form>
                            </div>
                            <div className="d-flex align-items-center order-1 order-md-2">
                                <div className="header-links-login">
                                    <ul className="nav-l d-flex align-items-center">
                                        {!state.is_loggedin && (
                                            <li className="item-list">
                                            <NavLink
                                                to={location => ({
                                                    ...location,
                                                    pathname: "/provider/registration",
                                                })}
                                                className="link"
                                            >
                                                <img
                                                    src="/assets/img/outline-user.svg"
                                                    className="img-fluid"
                                                />{" "}
                                                Become a Provider
                                            </NavLink>
                                        </li>
                                        )}
                                        <li className="item-list">
                                            {state.is_loggedin && (
                                                <span
                                                    ref={ref}
                                                    type="button"
                                                    className="link"
                                                    data-backdrop="static"
                                                    data-keyboard="false"
                                                    data-toggle="modal"
                                                    data-target="#chat"
                                                    onClick={() =>
                                                        setState({
                                                            ...state,
                                                            isChatOpen: true,
                                                        })
                                                    }
                                                >
                                                    <i
                                                        className="fa fa-comments-o"
                                                        aria-hidden="true"
                                                    ></i>{" "}
                                                    Chat
                                                </span>
                                            )}
                                        </li>

                                        {state.is_loggedin ? (
                                            <>
                                                {/* <li
                                                    className="item-list"
                                                    style={{
                                                        fontSize: "2rem",
                                                    }}
                                                    onClick={() => {
                                                        setState({
                                                            ...state,
                                                            notificationOpen:
                                                                !state.notificationOpen,
                                                        });
                                                        dispatch(
                                                            getNotifications()
                                                        );
                                                    }}
                                                >
                                                    {state.notificationOpen && (
                                                        <div>
                                                            <span className="user-name-farenow">
                                                                Notification
                                                            </span>
                                                            <img
                                                                src="/assets/img/outline-bell.svg"
                                                                className="img-fluid"
                                                            />
                                                        </div>
                                                    )}
                                                    {!state.notificationOpen && (
                                                        <div>
                                                            <span className="user-name-farenow">
                                                                Notification
                                                            </span>
                                                            <img
                                                                src="/assets/img/outline-bell.svg"
                                                                className="img-fluid"
                                                            />
                                                        </div>
                                                    )}
                                                    {state?.notificationOpen && (
                                                        <></>
                                                    )}
                                                </li> */}
                                                <li className="dropdown item-list">
                                                    <div onClick={()=>{
                                                        setState({
                                                            ...state,
                                                            notificationOpen:
                                                                !state.notificationOpen,
                                                        });
                                                        dispatch(
                                                            getNotifications()
                                                        );
                                                    }}>
                                                        <div
                                                            // className="btn btn-secondary dropdown-toggle"
                                                            className="link"
                                                            id="notificationDropdown"
                                                            data-toggle="dropdown"
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            <span className="user-name-farenow">
                                                                Notification
                                                            </span>
                                                            <img
                                                                src="/assets/img/outline-bell.svg"
                                                                className="img-fluid"
                                                            />
                                                        </div>
                                                        <div
                                                            className="dropdown-menu dropdown-menu-right mt-2 notification-dropdown-menu"
                                                            aria-labelledby="notificationDropdown"
                                                            style={{
                                                                fontSize: "1.5rem",
                                                            }}
                                                        >
                                                                <div className="notification-scroll">
                                                                    {notifications.loading && (
                                                                        <div className="notifications-item">
                                                                            <div className="text-center">
                                                                                Loading...
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    {!notifications.loading &&
                                                                        notifications.error && (
                                                                            <div className="notifications-item">
                                                                                <div className="text-center">
                                                                                    {
                                                                                        notifications.message
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    {(!notifications.loading &&
                                                                        notifications
                                                                            ?.data
                                                                            ?.length >
                                                                            0) ?
                                                                        notifications?.data?.map(
                                                                            (
                                                                                notification,
                                                                                index
                                                                            ) => (
                                                                                <div
                                                                                    className="notifications-item"
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    onClick={() => {
                                                                                        if (
                                                                                            notification
                                                                                                ?.data
                                                                                                ?.type ==
                                                                                                "SERVICE_REQUEST" ||
                                                                                            notification
                                                                                                ?.data
                                                                                                ?.type ==
                                                                                                "MOVING"
                                                                                        ) {
                                                                                            if(notification?.data?.service_request_id){
                                                                                                history?.push(`/service-detail/${notification?.data?.service_request_id}`);
                                                                                            }
                                                                                        } else if(notification?.data?.type == "MESSAGE"){
                                                                                            
                                                                                        }
                                                                                        setState(
                                                                                            {
                                                                                                ...state,
                                                                                                notificationOpen:
                                                                                                    !state.notificationOpen,
                                                                                            }
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    {" "}
                                                                                    {/* <img
                                                                                    src="https://i.imgur.com/uIgDDDd.jpg"
                                                                                    alt="img"
                                                                                /> */}
                                                                                    <div className="text">
                                                                                        <h4>
                                                                                            {
                                                                                                notification
                                                                                                    ?.data
                                                                                                    ?.title
                                                                                            }
                                                                                        </h4>
                                                                                        <p>
                                                                                            {
                                                                                                notification
                                                                                                    ?.data
                                                                                                    ?.body
                                                                                            }
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        ) : (
                                                                            <> </>
                                                                        )}
                                                                    {/* <div className="notifications-item">
                                                                    {" "}
                                                                    <img
                                                                    src="https://img.icons8.com/flat_round/64/000000/vote-badge.png"
                                                                    alt="img"
                                                                />
                                                                    <div className="text">
                                                                        <h4>
                                                                            John
                                                                            Silvester
                                                                        </h4>
                                                                        <p>
                                                                            +20
                                                                            vista
                                                                            badge
                                                                            earned
                                                                        </p>
                                                                    </div>
                                                                </div> */}
                                                                </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="dropdown show item-list">
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
                                                        <span className="user-name-farenow">
                                                            {
                                                                JSON.parse(
                                                                    localStorage.getItem(
                                                                        "user_data"
                                                                    )
                                                                )?.first_name
                                                            }
                                                        </span>
                                                        <img
                                                            src="/assets/img/outline-user.svg"
                                                            className="img-fluid"
                                                        />
                                                        {/* <i
                                                            className="fa fa-sort-desc ml-2"
                                                            aria-hidden="true"
                                                        ></i> */}
                                                    </div>
                                                    <div
                                                        className="dropdown-menu dropdown-menu-right mt-2 user-dropdown-menu"
                                                        aria-labelledby="dropdownMenuLink"
                                                        style={{
                                                            fontSize: "1.5rem",
                                                        }}
                                                    >
                                                        <Link
                                                            to="/dashboard"
                                                            className=" dropdown-item"
                                                        >
                                                            <i
                                                                className="fa fa-tachometer mr-2"
                                                                aria-hidden="true"
                                                            ></i>
                                                            Dashboard
                                                        </Link>
                                                        <Link
                                                            to="/my-account"
                                                            className=" dropdown-item"
                                                        >
                                                            <i
                                                                className="fa fa-user mr-2"
                                                                aria-hidden="true"
                                                            ></i>
                                                            My Account
                                                        </Link>
                                                        <Link
                                                            to=""
                                                            onClick={
                                                                handleLogout
                                                            }
                                                            className="dropdown-item"
                                                        >
                                                            <i
                                                                className="fa fa-sign-out mr-2"
                                                                aria-hidden="true"
                                                            ></i>
                                                            Logout
                                                        </Link>
                                                    </div>
                                                </li>
                                            </>
                                        ) : (
                                            <li className="item-list">
                                                <Link
                                                    to="/login"
                                                    className="link"
                                                >
                                                    Login{" "}
                                                    <i
                                                        className="fa fa-sign-in fa-1x"
                                                        aria-hidden="true"
                                                    ></i>
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <header className="nav-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <nav className="navbar navbar-expand-md navbar-light">
                                <div className="menu-icon-mobile d-md-none">
                                    <div className="title--menu"> menu</div>
                                    <button
                                        className="navbar-toggler"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target="#navbarSupportedContent"
                                        aria-controls="navbarSupportedContent"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation"
                                    >
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                </div>
                                <div
                                    className="collapse navbar-collapse"
                                    id="navbarSupportedContent"
                                >
                                    <ul className="navbar-nav mr-auto">
                                        {header_menu}
                                        {state.header_menu?.length ? (
                                            <>
                                                <li className="nav-item">
                                                    <NavLink
                                                        to={`/restaurants`}
                                                        className="nav-link"
                                                    >
                                                        {"Restaurants "}
                                                    </NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink
                                                        to={`/grocery-stores`}
                                                        className="nav-link"
                                                    >
                                                        {"Grocery Stores "}
                                                    </NavLink>
                                                </li>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

            <div
                className="modal fade bd-example-modal-lg"
                id="chat"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered modal-lg"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2
                                className="modal-title"
                                id="exampleModalLongTitle"
                            >
                                Chat
                            </h2>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() =>
                                    setState({ ...state, isChatOpen: false })
                                }
                            >
                                <span
                                    aria-hidden="true"
                                    style={{
                                        fontSize: "3rem",
                                    }}
                                >
                                    &times;
                                </span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row m-2">
                                <div className="col-12">
                                    <Chat
                                        notification={notification}
                                        isChatOpen={state?.isChatOpen}
                                        is_loggedin={state?.is_loggedin}
                                        {...props}
                                    ></Chat>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
