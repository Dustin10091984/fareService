import './App.css';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';

import Login from './front-end/Auth/Login';
import Register from './front-end/Auth/Register';
import Header from './front-end/common/Header';

import { Footer } from './front-end/common/Footer';
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
import { FoodDetails } from './front-end/FoodDetails';
import { Cart } from './front-end/Cart';
import { Services } from './front-end/Services';
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

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartList } from './store/Slices/cart/cartsSlice';
import Echo from "laravel-echo";
import io from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const stripePromise = loadStripe('pk_test_51JVYy7CiKsbMzZ4LLhJxG93Gzs85Vbet4WssQvrZQ69xlRdjzPZyAgtKjgbsgdaEyyamStfa1nlDNq0b3nKNxBBq00vXmoyr8R');

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartList());
  }, [])
  window.io = io;
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

        <Header></Header>

        <Switch>
          <Route exact path='/' component={Index} />

          <Redirect
            exact
            from="/"
            to="/"
          />

          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />

          <ProtectedRoute path='/dashboard' component={Dashboard} />
          {/* <ProtectedRoute path='/chat' component={ Chat }/> */}
          <ProtectedRoute path='/payment' component={Payment} />
          <ProtectedRoute path='/services-history' component={ServicesHistory} />


          <Route path='/service-providers' component={ServiceProviders} />
          <Route path='/shop' component={Shop} />
          <Route path='/shop2' component={ShopTwo} />
          <Route path='/moving-help' component={MovingHelp} />
          <Route path='/house-cleaning' component={HouseCleaning} />
          <Route path='/profile/:id' component={ProviderProfile} />
          <Route path='/latest-news' component={LatestNews} />
          <Route path='/scolarship' component={Scolarship} />
          <Route path='/retail' component={Retail} />
          <Route path='/about-us' component={AboutUs} />
          <Route path='/apply' component={Apply} />
          <Route path='/product-detail/:id' component={ProductDetail} />
          <Route path='/gaurantee' component={Gaurantee} />
          <Route path='/grocery-stores/:id/product/:productId' component={GroceryStore} />
          <Route path='/grocery-stores/:id' component={GroceryStore} />
          <Route path='/grocery-stores' component={GroceryStore} />
          <Route path='/restaurants/:id/foods/:foodId' component={Restaurant} />
          <Route path='/restaurants/:id' component={Restaurant} />
          <Route path='/restaurants' component={Restaurant} />
          <Route path='/food-details' component={FoodDetails} />
          <Route path='/services/:serviceId/:subServiceId' component={Services} />
          <Route path='/services' component={Services} />
          <Route path='/cart' component={Cart} />
          <Route path='/order-history' component={OrderHistory} />
          <Route path='/food-delivery' component={FoodDelivery} />
          <Route path='/product-delivery' component={ProductDelivery} />
          <Route path='/order-detail' component={OrderDetail} />
          <Route path='/service-detail' component={ServicesDetail} />
          <Route path='/change-password' component={ChangeP} />
          <Route path='/my-account' component={MyAccount} />
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
