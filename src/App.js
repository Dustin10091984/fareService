import './App.css';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import {
  useLocation,
  useHistory
} from "react-router-dom";

import Header from './front-end/common/Header';
import Footer from './front-end/common/Footer';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartList } from './store/Slices/cart/cartsSlice';
import Echo from "laravel-echo";
import io from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { onMessageListener, getToken } from './firebaseInit';
// import Notifications from './components/notification/Notifications';
import ReactNotificationComponent from './components/notification/ReactNotification';
import axios from 'axios'
import { HOST } from './constants';
import { getMessaging, onMessage } from "firebase/messaging";
import Routes from './Routes';
import { LoginContext, MapLoadedApiContext } from './helper/context';
import { ReactSwal } from './helper/swal';
import { handleBackendEvents } from './helper/backend-events';
// import { useJsApiLoader } from "@react-google-maps/api";

const stripePromise = loadStripe(
  process.env.React_APP_STRIPE_PUBLIC_KEY
);

window.io = io;

const liveOption = {
  host: "https://api.farenow.com",
  broadcaster: 'socket.io',
};
const localOption = {
  host: "http://127.0.0.1:6001",
  broadcaster: 'socket.io',
  client: io,
  authEndpoint: '/broadcasting/auth'
};

if (typeof window.io != 'undefined') {
  window.Echo = new Echo(liveOption);
}

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function () {
  window.FB.init({
    appId: '389930956527300',
    cookie: true,
    xfbml: true,
    version: 'v14.0'
  });

  window.FB.AppEvents.logPageView();
};


function App() {
  const [notification, setNotification] = useState();
  const [state, setState] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const { hash } = useLocation();
  const history = useHistory();


  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    setNotification(payload);
  });

  useEffect(() => {
    if (window.google && 'maps' in window.google) {
      setIsLoaded(window.google.maps.version);
    } else {
      setIsLoaded(false);
    }
  }, [window.google])

  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: process.env.React_APP_GOOGLE_API,
  //   libraries: ['places'],
  // });


  const handleMessageClick = (data) => {
    setState(data);
  }

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(async () => {
    handleBackendEvents(dispatch);
    if (!!localStorage?.userToken) {
      // window.Echo.connector.options.auth.headers['Authorization'] = localStorage.userToken;
      // window.Echo.connector.options.auth.headers['Accept'] = 'application/json';
      const token = await getToken();
      axios({
        method: "post",
        headers: {
          Authorization: `${localStorage.userToken}`
        },
        url: `${HOST}/api/user/device-token`,
        data: { device_token: token },
      })
        .then(function (response) {
        })
        .catch((error) => {
          // console.log(error.response.data.message);
        });
      dispatch(getCartList());
    }
  }, []);



  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === '') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
    else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        // const position = element.getBoundingClientRect().top;
        if (element) {
          element.scrollIntoView({
            // position: position + window.scrollY - 20,
            behavior: 'smooth',
          });
        }
      }, 0);
    }
  }, [hash]); // do this on route change

  useEffect(() => {
    if (!!localStorage?.user_data == true && !!localStorage?.userToken == true) {
      window.addEventListener('click', () => {
        if (localStorage?.user_data) {
          let user = JSON.parse(localStorage?.user_data);
          if ((!!!user.phone || !user.phone_verification)) {
            location?.pathname != '/verification' && (
              history.push({
                pathname: '/verification',
                state: {
                  verification: {
                    email: user?.email,
                    phone: !!user.phone && user?.phone,
                    verified: !!user?.phone_verification,
                  }
                }
              }))
          }
        }
      })
    }
    if (!!localStorage.userToken) {
      // window.Echo.connector.options.auth.headers['Authorization'] = localStorage.userToken;
      // window.Echo.connector.options.auth.headers['Accept'] = 'application/json';
      setIsLoggedIn(true)
    } else {
      // window.Echo.connector.options.auth.headers['Authorization'] = '';
      localStorage.clear();
      setIsLoggedIn(false)
    }
  }, [localStorage?.user_data, localStorage?.user_data])

  return (
    <Elements stripe={stripePromise} >
      <LoginContext.Provider value={isLoggedIn}>
        <MapLoadedApiContext.Provider value={isLoaded}>
          <div className="App">
            {/* {JSON.parse(localStorage.getItem('user_data'))?.device_token ? null : <Notifications /> } */}
            <ReactNotificationComponent {...notification} handleMessageClick={handleMessageClick} />
            <Header notification={state}></Header>
            <Routes />
            <Footer />
            <div className='rem-1-5'>
              <ToastContainer autoClose={5000} position={toast.POSITION.TOP_CENTER} />
            </div>
          </div>
        </MapLoadedApiContext.Provider>
      </LoginContext.Provider>
    </Elements>
  );
}

export default App;
