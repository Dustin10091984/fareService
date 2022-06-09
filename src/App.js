import './App.css';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import {
  // Route,
  // Switch,
  // Redirect,
  useLocation
} from "react-router-dom";
// import ProtectedRoute from './components/ProtectedRoute';

// import Login from './front-end/Auth/Login';
// import Register from './front-end/Auth/Register';
// import ForgotPassword from './front-end/Auth/ForgotPassword';
import Header from './front-end/common/Header';
import Footer from './front-end/common/Footer';

// import { Index } from './front-end/Index';
// import { Shop } from './front-end/Shop';
// import { ShopTwo } from './front-end/ShopTwo';
// import { MovingHelp } from './front-end/MovingHelp';
// import { HouseCleaning } from './front-end/HouseCleaning';
// import { ServiceProviders } from './front-end/ServiceProviders';
// import { ProviderProfile } from './front-end/ProviderProfile';
// import { LatestNews } from './front-end/LatestNews';
// import { Scolarship } from './front-end/Scolarship';
// import { Retail } from './front-end/Retail';
// import { AboutUs } from './front-end/AboutUs';
// import { Payment } from './front-end/Payment';
// import { Apply } from './front-end/Apply';
// import { ProductDetail } from './front-end/ProductDetail';
// import { Gaurantee } from './front-end/Gaurantee';
// import { GroceryStore } from './front-end/GroceryStore';
// import { Restaurant } from './front-end/Restaurant';
// import { RestaurantPage } from './front-end/RestaurantPage';
// import { GroceryStorePage } from './front-end/GroceryStorePage';
// import { FoodDetails } from './front-end/FoodDetails';
// import { Cart } from './front-end/Cart';
// import { ServicesPage } from './views/ServicesPage';
// import { Dashboard } from './front-dashboard/Dashboard';
// import { OrderHistory } from './front-dashboard/OrderHistory';
// import { FoodDelivery } from './front-dashboard/FoodDelivery';
// import { ProductDelivery } from './front-dashboard/ProductDelivery';
// import { ServicesHistory } from './front-dashboard/ServicesHistory';
// import { OrderDetail } from './front-dashboard/OrderDetail';
// import { ServicesDetail } from './front-dashboard/ServicesDetail';
// import { ChangeP } from "./front-dashboard/ChangeP";
// import { MyAccount } from "./front-dashboard/MyAccount/MyAccount";
// import { PaymentCard } from "./front-dashboard/PaymentCard";
// import { RegistrationPage } from "./views/Provider/Registration";
// import { Page } from "./front-end/Page";

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
// import { MovingRequest } from './front-end/moving';
import { HOST } from './constants';
import { getMessaging, onMessage } from "firebase/messaging";
import Routes from './Routes';
import { LoginContext, MapLoadedApiContext } from './helper/context';
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
  host: "http://localhost:6001",
  broadcaster: 'socket.io',
};
if (typeof window.io != 'undefined') {
  window.Echo = new Echo(liveOption);
  // client: io,
  // auth: {headers: {Authorization: localStorage.userToken }}

  window.Echo.connector.socket.on('connect', function () {
    console.log("connect");
  });

  window.Echo.connector.socket.on('disconnect', function () {
    console.log("disconnect");
  });
}

// (function (d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) { return; }
//   js = d.createElement(s); js.id = id;
//   js.src = "https://connect.facebook.net/en_US/sdk.js";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));

// window.fbAsyncInit = function () {
//   window.FB.init({
//     appId: '389930956527300',
//     cookie: true,
//     xfbml: true,
//     version: 'v14.0'
//   });

//   window.FB.AppEvents.logPageView();
// };


function App() {
  const [notification, setNotification] = useState();
  const [state, setState] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const { hash } = useLocation();


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
  useEffect(async () => {
    if (!!localStorage?.userToken) {
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
    if (!!localStorage.userToken) {
      setIsLoggedIn(true)
    } else {
      localStorage.clear();
      setIsLoggedIn(false)
    }
  }, [localStorage.userToken])

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
        //   <Switch>
        //     <Route exact path='/' component={Index} />

        //     {/* <Redirect
        //     exact
        //     from="/"
        //     to="/"
        //   /> */}

        //     <Route path='/provider/registration' component={RegistrationPage} />
        //     <Route path='/register' component={Register} />
        //     <Route path='/login' component={Login} />
        //     <Route path='/forgot-password' component={ForgotPassword} />

        //     <ProtectedRoute path='/dashboard' component={Dashboard} />
        //   <ProtectedRoute path='/payment' component={Payment} />
        //   <ProtectedRoute path='/services-history' component={ServicesHistory} />
        //   <ProtectedRoute path='/my-account' component={MyAccount} />
        //   <ProtectedRoute path='/order-detail/:id' component={OrderDetail} />
        //   <ProtectedRoute path='/cart' component={Cart} />
        //   <ProtectedRoute path='/service-detail/:id' component={ServicesDetail} />

        //   <Route path='/service-providers' component={ServiceProviders} />
        //   <Route path='/shop' component={Shop} />
        //   <Route path='/shop2' component={ShopTwo} />
        //   <Route path='/moving-help' component={MovingHelp} />
        //   <Route path='/moving-request' component={MovingRequest} />
        //   <Route path='/house-cleaning' component={HouseCleaning} />
        //   <Route path='/provider/profile/:id' component={ProviderProfile} />
        //   <Route path='/latest-news' component={LatestNews} />
        //   <Route path='/scolarship' component={Scolarship} />
        //   <Route path='/retail' component={Retail} />
        //   <Route path='/about-us' component={AboutUs} />
        //   <Route path='/apply' component={Apply} />
        //   <Route path='/product-detail/:id' component={ProductDetail} />
        //   <Route path='/gaurantee' component={Gaurantee} />
        //   {/* <Route path='/grocery-stores/:id/product/:productId' component={GroceryStore} /> */}
        //   {/* <Route path='/grocery-stores/:id' component={GroceryStore} /> */}
        //   <Route path='/grocery-stores' component={GroceryStore} />
        //   <Route path='/grocery-stores-page/:id' component={GroceryStorePage} />
        //   {/* <Route path='/restaurants/:id/foods/:foodId' component={Restaurant} /> */}
        //   {/* <Route path='/restaurants/:id' component={Restaurant} /> */}
        //   <Route path='/restaurants' component={Restaurant} />
        //   <Route path='/restaurant-page/:id' component={RestaurantPage} />
        //   <Route path='/food-details' component={FoodDetails} />
        //   <Route path='/services/:serviceId/:subServiceId' component={ServicesPage} />
        //   <Route path='/services' component={ServicesPage} />
        //   <Route path='/order-history' component={OrderHistory} />
        //   <Route path='/food-delivery' component={FoodDelivery} />
        //   <Route path='/product-delivery' component={ProductDelivery} />
        //   <Route path='/change-password' component={ChangeP} />
        //   <Route path='/payment-card' component={PaymentCard} />
        //   <Route path='/page/:name' component={Page} />
        //   <Redirect to="/not-found" />
        // </Switch>