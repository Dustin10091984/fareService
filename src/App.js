import './App.css';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';

import Login from './front-end/Auth/Login';
import Register from './front-end/Auth/Register';
import Header from './front-end/common/Header';
import Footer from './front-end/common/Footer';

import { Index } from './front-end/Index';
import { Shop } from './front-end/Shop';
import { ShopTwo } from './front-end/ShopTwo';
import { MovingHelp } from './front-end/MovingHelp';
import { HouseCleaning } from './front-end/HouseCleaning';
import { ServiceProviders } from './front-end/ServiceProviders';
import { ProviderProfile } from './front-end/ProviderProfile';
import { LatestNews } from './front-end/LatestNews';
import { Scolarship } from './front-end/Scolarship';
import { Retail } from './front-end/Retail';
import { AboutUs } from './front-end/AboutUs';
import { Payment } from './front-end/Payment';
import { Apply } from './front-end/Apply';
import { ProductDetail } from './front-end/ProductDetail';
import { Gaurantee } from './front-end/Gaurantee';
import { GroceryStore } from './front-end/GroceryStore';
import { Restaurant } from './front-end/Restaurant';
import { RestaurantPage } from './front-end/RestaurantPage';
import { GroceryStorePage } from './front-end/GroceryStorePage';
import { FoodDetails } from './front-end/FoodDetails';
import { Cart } from './front-end/Cart';
import { ServicesPage } from './views/ServicesPage';
import { Dashboard } from './front-dashboard/Dashboard';
import { OrderHistory } from './front-dashboard/OrderHistory';
import { FoodDelivery } from './front-dashboard/FoodDelivery';
import { ProductDelivery } from './front-dashboard/ProductDelivery';
import { ServicesHistory } from './front-dashboard/ServicesHistory';
import { OrderDetail } from './front-dashboard/OrderDetail';
import { ServicesDetail } from './front-dashboard/ServicesDetail';
import { ChangeP } from "./front-dashboard/ChangeP";
import { MyAccount } from "./front-dashboard/MyAccount/MyAccount";
import { PaymentCard } from "./front-dashboard/PaymentCard";
import { RegistrationPage } from "./views/Provider/Registration";

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartList } from './store/Slices/cart/cartsSlice';
import Echo from "laravel-echo";
import io from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { onMessageListener, getToken } from './firebaseInit';
import Notifications from './components/notification/Notifications';
import ReactNotificationComponent from './components/notification/ReactNotification';
import axios from 'axios'
import { MovingRequest } from './front-end/moving';
import { HOST } from './constants';

const stripePromise = loadStripe(
  process.env.React_APP_STRIPE_PUBLIC_KEY
);

function App() {
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [state, setState] = useState();
  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload.data.title,
        body: payload.data.body,
      });
    });
    
    const handleMessageClick = (data) => {
      setState(data)
    }

  const dispatch = useDispatch();
  useEffect(async () => {
    if (localStorage?.userToken) {
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

  window.io = io;
  // const option = {
  //   host: `${HOST}:6001`,
  //   broadcaster: 'socket.io',
  // };
  const liveOption = {
    host: "http://api.farenow.com:6001",
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

    // window.Echo.connector.socket.on('connect', function () {
    //   console.log("connect");
    // });

    // window.Echo.connector.socket.on('disconnect', function () {
    //   console.log("disconnect");
    // });
  }


  return (
    <Elements stripe={stripePromise} >
      <div className="App">
        {/* {JSON.parse(localStorage.getItem('user_data'))?.device_token ? null : <Notifications /> } */}
        <ReactNotificationComponent {...notification} handleMessageClick={handleMessageClick} />
        <Header notification={state}></Header>

        <Switch>
          <Route exact path='/' component={Index} />

          <Redirect
            exact
            from="/"
            to="/"
          />

          <Route path='/provider/registration' component={RegistrationPage} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />

          <ProtectedRoute path='/dashboard' component={Dashboard} />
          <ProtectedRoute path='/payment' component={Payment} />
          <ProtectedRoute path='/services-history' component={ServicesHistory} />
          <ProtectedRoute path='/my-account' component={MyAccount} />
          <ProtectedRoute path='/order-detail/:id' component={OrderDetail} />
          <ProtectedRoute path='/cart' component={Cart} />

          <Route path='/service-providers' component={ServiceProviders} />
          <Route path='/shop' component={Shop} />
          <Route path='/shop2' component={ShopTwo} />
          <Route path='/moving-help' component={MovingHelp} />
          <Route path='/moving-request' component={MovingRequest} />
          <Route path='/house-cleaning' component={HouseCleaning} />
          <Route path='/provider/profile/:id' component={ProviderProfile} />
          <Route path='/latest-news' component={LatestNews} />
          <Route path='/scolarship' component={Scolarship} />
          <Route path='/retail' component={Retail} />
          <Route path='/about-us' component={AboutUs} />
          <Route path='/apply' component={Apply} />
          <Route path='/product-detail/:id' component={ProductDetail} />
          <Route path='/gaurantee' component={Gaurantee} />
          {/* <Route path='/grocery-stores/:id/product/:productId' component={GroceryStore} /> */}
          {/* <Route path='/grocery-stores/:id' component={GroceryStore} /> */}
          <Route path='/grocery-stores' component={GroceryStore} />
          <Route path='/grocery-stores-page/:id' component={GroceryStorePage} />
          {/* <Route path='/restaurants/:id/foods/:foodId' component={Restaurant} /> */}
          {/* <Route path='/restaurants/:id' component={Restaurant} /> */}
          <Route path='/restaurants' component={Restaurant} />
          <Route path='/restaurant-page/:id' component={RestaurantPage} />
          <Route path='/food-details' component={FoodDetails} />
          <Route path='/services/:serviceId/:subServiceId' component={ServicesPage} />
          <Route path='/services' component={ServicesPage} />
          <Route path='/order-history' component={OrderHistory} />
          <Route path='/food-delivery' component={FoodDelivery} />
          <Route path='/product-delivery' component={ProductDelivery} />
          <Route path='/service-detail/:id' component={ServicesDetail} />
          <Route path='/change-password' component={ChangeP} />
          <Route path='/payment-card' component={PaymentCard} />
          <Redirect to="/not-found" />
        </Switch>

        <Footer></Footer>
        <div style={{
          fontSize: '1.5rem',
        }}>
          <ToastContainer autoClose={5000} position={toast.POSITION.TOP_CENTER} />
        </div>
      </div>
    </Elements>
  );
}

export default App;
