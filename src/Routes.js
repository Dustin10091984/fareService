import { Redirect } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { Dashboard } from "./front-dashboard/Dashboard";
import { FoodDelivery } from "./front-dashboard/FoodDelivery";
import { MyAccount } from "./front-dashboard/MyAccount";
import { OrderDetail } from "./front-dashboard/OrderDetail";
import { OrderHistory } from "./front-dashboard/OrderHistory";
import { ProductDelivery } from "./front-dashboard/ProductDelivery";
import { ServicesDetail } from "./front-dashboard/ServicesDetail";
import { ServicesHistory } from "./front-dashboard/ServicesHistory/index.js";
import Login from "./front-end/Auth/Login";
import { Cart } from "./front-end/Cart";
import { GroceryStore } from "./front-end/GroceryStore";
import { GroceryStorePage } from "./front-end/GroceryStorePage";
import { Index } from "./front-end/Index";
import { Page } from "./front-end/Page";
import { Payment } from "./front-end/Payment";
import { ProductDetail } from "./front-end/ProductDetail";
import { ProviderProfile } from "./front-end/ProviderProfile";
import { Restaurant } from "./front-end/Restaurant";
import { RestaurantPage } from "./front-end/RestaurantPage";
import { ServiceProviders } from "./front-end/ServiceProviders/index";
import { MovingRequest } from "./front-end/moving/index";
import { RegistrationPage } from "./views/Provider/Registration";
import { ServicesPage } from "./views/ServicesPage";
import Verification from "./front-end/Auth/Verification";
import ServicesSearchPage from "./front-end/ServicesSearch";
import RegisterWithEmail from "./front-end/Auth/RegisterWithEmail";
import ForgotPasswordWithEmail from "./front-end/Auth/ForgotPasswordWithEmail";
const publicRoutes = [
  {
    name: "Home",
    path: "/",
    component: Index,
    hash: "",
  },
  {
    name: "Provider Signup",
    path: "/provider/registration",
    component: RegistrationPage,
    hash: "",
  },
  {
    name: "User Signup",
    path: "/register",
    component: RegisterWithEmail,
    hash: "",
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    hash: "",
  },
  {
    name: "Forgot Password",
    path: "/forgot-password",
    component: ForgotPasswordWithEmail,
    hash: "",
  },
  {
    name: "Provider list",
    path: "/service-providers",
    component: ServiceProviders,
    hash: "",
  },
  {
    name: "Moving Request",
    path: "/moving-request",
    component: MovingRequest,
    hash: "",
  },
  {
    name: "Provider profile",
    path: "/provider/profile/:id",
    component: ProviderProfile,
    hash: "",
  },
  {
    name: "Product Details",
    path: "/product-detail/:id",
    component: ProductDetail,
    hash: "",
  },
  {
    name: "Grocery Stores",
    path: "/grocery-stores",
    component: GroceryStore,
    hash: "",
  },
  {
    name: "Grocery Store Page",
    path: "/grocery-store-page/:id",
    component: GroceryStorePage,
    hash: "",
  },
  {
    name: "Restaurant",
    path: "/restaurants",
    component: Restaurant,
    hash: "",
  },
  {
    name: "Restaurant Page",
    path: "/retaurant-page/:id",
    component: RestaurantPage,
    hash: "",
  },
  {
    name: "Service Info",
    path: "/services/:service/:serviceId/:subService/:subServiceId",
    component: ServicesPage,
    hash: "",
  },
  {
    name: "Service Search",
    path: "/services/search",
    component: ServicesSearchPage,
  },
  {
    name: "Order History",
    path: "/order-history",
    component: OrderHistory,
    hash: "",
  },
  {
    name: "Food Delivery",
    path: "/food-delivery",
    component: FoodDelivery,
    hash: "",
  },
  {
    name: "Product Delivery",
    path: "/product-delivery",
    component: ProductDelivery,
    hash: "",
  },
  {
    name: "Pages",
    path: "/page/:name",
    component: Page,
    hash: "",
  },
  {
    name: "Verification",
    path: "/verification",
    component: Verification,
    hash: "",
  },
];

const privateRoutes = [
  {
    name: "Dashboard",
    path: "/dashboard",
    component: Dashboard,
    hash: "",
  },
  {
    name: "Payment",
    path: "/payment",
    component: Payment,
    hash: "",
  },
  {
    name: "Service history",
    path: "/services-history",
    component: ServicesHistory,
    hash: "",
  },
  {
    name: "My Account",
    path: "/my-account",
    component: MyAccount,
    hash: "",
  },
  {
    name: "Order Details",
    path: "/order-detail/:id",
    component: OrderDetail,
    hash: "",
  },
  {
    name: "Cart",
    path: "/cart",
    component: Cart,
    hash: "",
  },
  {
    name: "Service Detail",
    path: "/service-detail/:id",
    component: ServicesDetail,
    hash: "",
  },
];
const Routes = () => {
  return (
    <Switch>
      {publicRoutes.map(({ name, path, component, hash }, index) => (
        <Route key={index} exact path={path} component={component} />
      ))}
      {privateRoutes.map(({ name, path, component, hash }, index) => (
        <ProtectedRoute key={index} exact path={path} component={component} />
      ))}
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;

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
