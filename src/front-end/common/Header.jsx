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
import { Chat } from "../Chat/Chat";
import { useSelector, useDispatch } from "react-redux";
import { getNotifications } from "../../store/Slices/notification";
import { headerMenu } from "../../store/Slices/HeaderMenuSlice";
import { pageLinks } from "../../store/Slices/footer";
import _ from "lodash";
import { BaseHeader } from "./header/header.base";
import { HomeHeader } from "./header/header.home";
import SearchBarHeader from "./header/header.searchbar";

const Header = (props) => {
  const location = useLocation();
  const header =
    location.pathname == "/" ? <HomeHeader /> : <SearchBarHeader />;
  return (
    <div className="shadow-[0_4px_8px_0_#0000000A] relative z-20">{header}</div>
  );
};


export default Header;
