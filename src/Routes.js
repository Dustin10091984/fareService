import { Redirect } from "react-router-dom"
import { Switch, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import { Dashboard } from "./front-dashboard/Dashboard"
import { FoodDelivery } from "./front-dashboard/FoodDelivery"
import { MyAccount } from "./front-dashboard/MyAccount/MyAccount"
import { OrderDetail } from "./front-dashboard/OrderDetail"
import { OrderHistory } from "./front-dashboard/OrderHistory"
import { ProductDelivery } from "./front-dashboard/ProductDelivery"
import { ServicesDetail } from "./front-dashboard/ServicesDetail"
import { ServicesHistory } from "./front-dashboard/ServicesHistory"
import ForgotPassword from "./front-end/Auth/ForgotPassword"
import Login from "./front-end/Auth/Login"
import Register from "./front-end/Auth/Register"
import { Cart } from "./front-end/Cart"
import { GroceryStore } from "./front-end/GroceryStore"
import { GroceryStorePage } from "./front-end/GroceryStorePage"
import { Index } from "./front-end/Index"
import { Page } from "./front-end/Page"
import { Payment } from "./front-end/Payment"
import { ProductDetail } from "./front-end/ProductDetail"
import { ProviderProfile } from "./front-end/ProviderProfile"
import { Restaurant } from "./front-end/Restaurant"
import { RestaurantPage } from "./front-end/RestaurantPage"
import { ServiceProviders } from "./front-end/ServiceProviders.jsx"
import { MovingRequest } from "./front-end/moving/index"
import { RegistrationPage } from "./views/Provider/Registration"
import { ServicesPage } from "./views/ServicesPage"

const PublicRoutes = [
    {
        name: 'Home',
        path: '/',
        component: Index,
        hash: '',
    },
    {
        name: 'Provider Signup',
        path: '/provider/registration',
        component: RegistrationPage,
        hash: '',
    },
    {
        name: 'User Signup',
        path: '/register',
        component: Register,
        hash: '',
    },
    {
        name: 'Login',
        path: '/login',
        component: Login,
        hash: '',
    },
    {
        name: 'Forgot Password',
        path: '/forgot-password',
        component: ForgotPassword,
        hash: '',
    },
    {
        name: 'Provider list',
        path: '/service-providers',
        component: ServiceProviders,
        hash: '',
    },
    {
        name: 'Moving Request',
        path: '/moving-request',
        component: MovingRequest,
        hash: '',
    },
    {
        name: 'Provider profile',
        path: '/provider/profile/:id',
        component: ProviderProfile,
        hash: '',
    },
    {
        name: 'Product Details',
        path: '/product-detail/:id',
        component: ProductDetail,
        hash: '',
    },
    {
        name: 'Grocery Stores',
        path: '/grocery-stores',
        component: GroceryStore,
        hash: '',
    },
    {
        name: 'Grocery Store Page',
        path: '/grocery-store-page/:id',
        component: GroceryStorePage,
        hash: '',
    },
    {
        name: 'Restaurant',
        path: '/restaurants',
        component: Restaurant,
        hash: '',
    },
    {
        name: 'Restaurant Page',
        path: '/retaurant-page/:id',
        component: RestaurantPage,
        hash: '',
    },
    {
        name: 'Service Info',
        path: '/services/:serviceId/:subServiceId',
        component: ServicesPage,
        hash: '',
    },
    {
        name: 'Order History',
        path: '/order-history',
        component: OrderHistory,
        hash: '',
    },
    {
        name: 'Food Delivery',
        path: '/food-delivery',
        component: FoodDelivery,
        hash: '',
    },
    {
        name: 'Product Delivery',
        path: '/product-delivery',
        component: ProductDelivery,
        hash: '',
    },
    {
        name: 'Pages',
        path: '/page/:name',
        component: Page,
        hash: '',
    },
]

const PrivateRoutes = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        component: Dashboard,
        hash: '',
    },
    {
        name: 'Payment',
        path: '/payment',
        component: Payment,
        hash: '',
    },
    {
        name: 'Service history',
        path: '/services-history',
        component: ServicesHistory,
        hash: '',
    },
    {
        name: 'My Account',
        path: '/my-account',
        component: MyAccount,
        hash: '',
    },
    {
        name: 'Order Details',
        path: '/order-detail/:id',
        component: OrderDetail,
        hash: '',
    },
    {
        name: 'Cart',
        path: '/cart',
        component: Cart,
        hash: '',
    },
    {
        name: 'Service Detail',
        path: '/service-detail/:id',
        component: ServicesDetail,
        hash: '',
    },
]
const Routes = () => {
    return (
        < Switch >
            {PublicRoutes.map(({ name, path, component, hash }, index) => (
                <Route key={index} exact path={path} component={component} />
            ))}
            {PrivateRoutes.map(({ name, path, component, hash }, index) => (
                <ProtectedRoute key={index} exact path={path} component={component} />
            ))}
            <Redirect to="/not-found" />
        </Switch >
    )
}

export default Routes;