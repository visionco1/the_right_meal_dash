import React from 'react'
import { Navigate, Route, RouteProps } from 'react-router-dom'

// components
import PrivateRoute from './PrivateRoute'

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/auth/login'))
const Register = React.lazy(() => import('../pages/auth/Register'))
const Logout = React.lazy(() => import('../pages/auth/logout'))
const RecoverPassword = React.lazy(() => import('../pages/auth/recover-password'))
const LockScreen = React.lazy(() => import('../pages/auth/LockScreen'))
const ConfirmMail = React.lazy(() => import('../pages/auth/confirm-email'))
const VerifyCode = React.lazy(() => import('../pages/auth/verify-code'))
const ResetPassword = React.lazy(() => import('../pages/auth/reset-password'))

// dashboard
const Ecommerce = React.lazy(() => import('../pages/dashboard/ecommerce/'))
const Analytics = React.lazy(() => import('../pages/dashboard/Analytics/'))

// pages
const MaintenancePages = React.lazy(() => import('../pages/other/Maintenance'))
// error
const Error404 = React.lazy(() => import('../pages/error/Error404'))
const Error404Alt = React.lazy(() => import('../pages/error/Error404Alt'))
const Error500 = React.lazy(() => import('../pages/error/Error500'))

// Right Meal

const Home = React.lazy(() => import('../pages/home/index'))
// staff management
const RolesPermissions = React.lazy(() => import('../pages/staff/roles-permissions'))
const AddRole = React.lazy(() => import('../pages/staff/roles-permissions/add'))
const ViewRole = React.lazy(() => import('../pages/staff/roles-permissions/view'))
const UpdateRole = React.lazy(() => import('../pages/staff/roles-permissions/update'))
const Staff = React.lazy(() => import('../pages/staff/staff'))
const ViewAdmin = React.lazy(() => import('../pages/staff/staff/view'))

// Menu management
const NutritionFacts = React.lazy(() => import('../pages/menu/nutrition-facts'))
const EditNutritionFacts = React.lazy(() => import('../pages/menu/nutrition-facts/edit'))
const Allergens = React.lazy(() => import('../pages/menu/allergens'))
const Sizes = React.lazy(() => import('../pages/menu/sizes'))
const MealCategories = React.lazy(() => import('../pages/menu/meal-categories'))
const Meals = React.lazy(() => import('../pages/menu/meals'))
const AddMeal = React.lazy(() => import('../pages/menu/meals/add'))
const EditMeal = React.lazy(() => import('../pages/menu/meals/edit'))
const ViewMeal = React.lazy(() => import('../pages/menu/meals/view'))
const Menu = React.lazy(() => import('../pages/menu/menu'))
const AddMenu = React.lazy(() => import('../pages/menu/menu/add'))
const ViewMenu = React.lazy(() => import('../pages/menu/menu/view'))
const EditMenu = React.lazy(() => import('../pages/menu/menu/edit'))
const MenuCategories = React.lazy(() => import('../pages/menu/menu-categories/MenuCategories'))

// subscriptions management
const Subscriptions = React.lazy(() => import('../pages/customers/subscriptions'))
const ViewSubscription = React.lazy(() => import('../pages/customers/subscriptions/view'))
const SubscriptionsPlans = React.lazy(() => import('../pages/plans-management/plans'))
const AddSubscriptionPlan = React.lazy(() => import('../pages/plans-management/plans/add'))
const EditSubscriptionPlan = React.lazy(() => import('../pages/plans-management/plans/edit'))
const ViewSubscriptionPlan = React.lazy(() => import('../pages/plans-management/plans/view'))
const PlanCategories = React.lazy(() => import('../pages/plans-management/plan-categories'))

// Customers management
const Customers = React.lazy(() => import('../pages/customers/customers'))
const CustomerHealth = React.lazy(() => import('../pages/customers/customers/view'))
// wallet management
const Wallet = React.lazy(() => import('../pages/wallet/Wallet'))

// Orders management
const Orders = React.lazy(() => import('../pages/customers/orders'))
const ViewOrder = React.lazy(() => import('../pages/customers/orders/view'))
const OrdersComplaints = React.lazy(() => import('../pages/customers/orders-complaints'))

// OrdersReports
const PackagingReport = React.lazy(() => import('../pages/reports'))

// delivery management
const DeliveryPeriods = React.lazy(() => import('../pages/delivery/delivery-periods/DeliveryPeriods'))
const DeliveryMen = React.lazy(() => import('../pages/delivery/delivery-men/DeliveryMen'))
const Zones = React.lazy(() => import('../pages/delivery/zones'))
const AddZone = React.lazy(() => import('../pages/delivery/zones/add'))
const EditZone = React.lazy(() => import('../pages/delivery/zones/edit'))
const ViewZone = React.lazy(() => import('../pages/delivery/zones/view'))
const QualityControlPage = React.lazy(() => import('../pages/delivery/quality-control'))
const OutletsPage = React.lazy(() => import('../pages/delivery/outlets'))

// stock orders management
const StockOrders = React.lazy(() => import('../pages/stock_orders/StockOrders/StockOrders'))
const Items = React.lazy(() => import('../pages/stock_orders/Items/Items'))

// marketing management
const NotificationsNewsletters = React.lazy(() => import('../pages/marketing/notifications-newsletters'))
const AddNotificationsNewsletters = React.lazy(() => import('../pages/marketing/notifications-newsletters/add'))
const Coupons = React.lazy(() => import('../pages/marketing/coupons'))
const AddCoupon = React.lazy(() => import('../pages/marketing/coupons/add'))
const EditCoupon = React.lazy(() => import('../pages/marketing/coupons/edit'))
const Subscribers = React.lazy(() => import('../pages/marketing/subscribers'))
const Banners = React.lazy(() => import('../pages/marketing/banners'))
const ContactUs = React.lazy(() => import('../pages/marketing/contact-us'))

// settings
const SystemSettings = React.lazy(() => import('../pages/settings/system-settings'))
const WhyUs = React.lazy(() => import('../pages/settings/why-us'))
const Countries = React.lazy(() => import('../pages/settings/countries'))
const ViewCountry = React.lazy(() => import('../pages/settings/countries/view'))
const ViewState = React.lazy(() => import('../pages/settings/countries/viewState'))
const Branches = React.lazy(() => import('../pages/settings/branches'))
const AddBranch = React.lazy(() => import('../pages/settings/branches/add'))
const EditBranch = React.lazy(() => import('../pages/settings/branches/edit'))

export interface RoutesProps {
	path: RouteProps['path']
	name?: string
	element?: RouteProps['element']
	route?: any
	exact?: boolean
	icon?: string
	header?: string
	roles?: string[]
	children?: RoutesProps[]
}

// dashboards
const dashboardRoutes: RoutesProps = {
	path: '/dashboard',
	name: 'Dashboards',
	icon: 'home',
	header: 'Navigation',
	children: [
		{
			path: '/',
			name: 'Root',
			element: <Navigate to="/home" />,
			route: PrivateRoute
		},
		{
			path: '/ecommerce',
			name: 'Ecommerce',
			element: <Ecommerce />,
			route: PrivateRoute
		},
		{
			path: '/analytics',
			name: 'Analytics',
			element: <Analytics />,
			route: PrivateRoute
		}
	]
}

const home: RoutesProps = {
	path: '/home',
	name: 'home',
	element: <Home />,
	route: PrivateRoute
}
const staffManagement: RoutesProps = {
	path: '/staff-management',
	name: 'staff-management',
	icon: 'calendar',
	route: PrivateRoute,
	header: 'staff-management',
	children: [
		{
			path: '/staff-management/roles',
			name: 'rolesPermissions',
			element: <RolesPermissions />,
			route: PrivateRoute
		},
		{
			path: '/staff-management/roles/add',
			name: 'add-role',
			element: <AddRole />,
			route: PrivateRoute
		},
		{
			path: '/staff-management/roles/:id',
			name: 'view-role',
			element: <ViewRole />,
			route: PrivateRoute
		},
		{
			path: '/staff-management/roles/update/:id',
			name: 'update-role',
			element: <UpdateRole />,
			route: PrivateRoute
		},
		{
			path: '/staff-management/staff',
			name: 'staff',
			element: <Staff />,
			route: PrivateRoute
		},
		{
			path: '/staff-management/staff/:id',
			name: 'view-admin',
			element: <ViewAdmin />,
			route: PrivateRoute
		}
	]
}
const menuManagement: RoutesProps = {
	path: '/menu-management',
	name: 'menu-management',
	icon: 'menu',
	route: PrivateRoute,
	header: 'menu-management',
	children: [
		{
			path: '/menu-management/nutrition-facts',
			name: 'nutrition-facts',
			element: <NutritionFacts />,
			route: PrivateRoute
		},
		{
			path: '/menu-management/nutrition-facts/edit/:id',
			name: 'edit-nutrition-facts',
			element: <EditNutritionFacts />,
			route: PrivateRoute
		},
		{
			path: '/menu-management/sizes',
			name: 'sizes',
			element: <Sizes />,
			route: PrivateRoute
		},
		{
			path: '/menu-management/allergens',
			name: 'allergens',
			element: <Allergens />,
			route: PrivateRoute
		},
		{
			path: '/menu-management/meal-categories',
			name: 'meal-categories',
			element: <MealCategories />,
			route: PrivateRoute
		},
		{
			path: '/menu-management/meals',
			name: 'meals',
			element: <Meals />,
			route: PrivateRoute
		},
		{
			path: '/menu-management/meals/add',
			name: 'add-meal',
			element: <AddMeal />,
			route: PrivateRoute
		},
		{
			path: '/menu-management/meals/edit/:id',
			name: 'add-meal',
			element: <EditMeal />,
			route: PrivateRoute
		},
		{
			path: '/menu-management/meals/view/:id',
			name: 'add-meal',
			element: <ViewMeal />,
			route: PrivateRoute
		},
		{
			path: '/menu-management/menu',
			name: 'menu',
			element: <Menu />,
			route: PrivateRoute
		},
		{
			path: '/menu-management/menu/add',
			name: 'add-menu',
			element: <AddMenu />,
			route: PrivateRoute
		},
		{
			path: '/menu-management/menu/view/:id',
			name: 'view-menu',
			element: <ViewMenu />,
			route: PrivateRoute
		},
		{
			path: '/menu-management/menu/edit/:id',
			name: 'edit-menu',
			element: <EditMenu />,
			route: PrivateRoute
		}
	]
}
const plansManagement: RoutesProps = {
	path: '/plans-management',
	name: 'plans-management',
	icon: 'subscriptions',
	route: PrivateRoute,
	header: 'plans-management',
	children: [
		{
			path: '/plans-management/plans',
			name: 'subscription-plans',
			element: <SubscriptionsPlans />,
			route: PrivateRoute
		},
		{
			path: '/plans-management/plans/add',
			name: 'add-subscription-plan',
			element: <AddSubscriptionPlan />,
			route: PrivateRoute
		},
		{
			path: '/plans-management/plans/edit/:id',
			name: 'edit-subscription-plan',
			element: <EditSubscriptionPlan />,
			route: PrivateRoute
		},
		{
			path: '/plans-management/plans/view/:id',
			name: 'view-subscription-plan',
			element: <ViewSubscriptionPlan />,
			route: PrivateRoute
		},
		{
			path: '/plans-management/plan-categories',
			name: 'plan-categories',
			element: <PlanCategories />,
			route: PrivateRoute
		}
	]
}
const customersManagement: RoutesProps = {
	path: '/customers-management',
	name: 'customers-management',
	icon: 'customers',
	route: PrivateRoute,
	header: 'customers-management',
	children: [
		{
			path: '/customers-management/customers',
			name: 'customers',
			element: <Customers />,
			route: PrivateRoute
		},
		{
			path: '/customers-management/customers/:id',
			name: 'customer-health',
			element: <CustomerHealth />,
			route: PrivateRoute
		},
		{
			path: '/customers-management/subscriptions',
			name: 'subscriptions',
			element: <Subscriptions />,
			route: PrivateRoute
		},
		{
			path: '/customers-management/subscriptions/view/:id',
			name: 'view-Subscription',
			element: <ViewSubscription />,
			route: PrivateRoute
		},
		{
			path: '/customers-management/orders',
			name: 'orders',
			element: <Orders />,
			route: PrivateRoute
		},
		{
			path: '/customers-management/orders/view/:id',
			name: 'view-order',
			element: <ViewOrder />,
			route: PrivateRoute
		},
		{
			path: '/customers-management/orders-complaints',
			name: 'orders-complaints',
			element: <OrdersComplaints />,
			route: PrivateRoute
		}
	]
}
const walletManagement: RoutesProps = {
	path: '/wallet-management',
	name: 'wallet-management',
	icon: 'wallet',
	route: PrivateRoute,
	header: 'wallet-management',
	children: [
		{
			path: '/wallet-management/wallet',
			name: 'wallet',
			element: <Wallet />,
			route: PrivateRoute
		}
	]
}
const ReportsManagement: RoutesProps = {
	path: '/reports',
	name: 'reports',
	icon: 'orders',
	route: PrivateRoute,
	header: 'reports',
	children: [
		{
			path: '/reports/packaging-report',
			name: 'packaging-report',
			element: <PackagingReport />,
			route: PrivateRoute
		}
	]
}
const deliveryManagement: RoutesProps = {
	path: '/delivery-management',
	name: 'delivery-management',
	icon: 'delivery',
	route: PrivateRoute,
	header: 'delivery-management',
	children: [
		{
			path: '/delivery-management/delivery-periods',
			name: 'orders-periods',
			element: <DeliveryPeriods />,
			route: PrivateRoute
		},
		{
			path: '/delivery-management/delivery-men',
			name: 'orders-men',
			element: <DeliveryMen />,
			route: PrivateRoute
		},
		{
			path: '/delivery-management/zones',
			name: 'zones',
			element: <Zones />,
			route: PrivateRoute
		},
		{
			path: '/delivery-management/zones/add',
			name: 'add-zone',
			element: <AddZone />,
			route: PrivateRoute
		},
		{
			path: '/delivery-management/zones/edit/:id',
			name: 'edit-zone',
			element: <EditZone />,
			route: PrivateRoute
		},
		{
			path: '/delivery-management/zones/:id',
			name: 'view-zone',
			element: <ViewZone />,
			route: PrivateRoute
		},
		{
			path: '/delivery-management/quality-control',
			name: 'quality-control',
			element: <QualityControlPage />,
			route: PrivateRoute
		},
		{
			path: '/delivery-management/outlets',
			name: 'outlets',
			element: <OutletsPage />,
			route: PrivateRoute
		}
	]
}
const marketingManagement: RoutesProps = {
	path: '/marketing-management',
	name: 'marketing-management',
	icon: 'marketing',
	route: PrivateRoute,
	header: 'marketing',
	children: [
		{
			path: '/marketing-management/notifications',
			name: 'notifications',
			element: <NotificationsNewsletters />,
			route: PrivateRoute
		},
		{
			path: '/marketing-management/notifications/add',
			name: 'add-notifications',
			element: <AddNotificationsNewsletters />,
			route: PrivateRoute
		},
		{
			path: '/marketing-management/coupons',
			name: 'coupons',
			element: <Coupons />,
			route: PrivateRoute
		},
		{
			path: '/marketing-management/coupons/add',
			name: 'add-coupon',
			element: <AddCoupon />,
			route: PrivateRoute
		},
		{
			path: '/marketing-management/coupons/edit/:id',
			name: 'edit-coupon',
			element: <EditCoupon />,
			route: PrivateRoute
		},
		{
			path: '/marketing-management/subscribers',
			name: 'subscribers',
			element: <Subscribers />,
			route: PrivateRoute
		},
		{
			path: '/marketing-management/banners',
			name: 'banners',
			element: <Banners />,
			route: PrivateRoute
		},
		{
			path: '/marketing-management/contact-us',
			name: 'contact-us',
			element: <ContactUs />,
			route: PrivateRoute
		}
	]
}
const stockOrders: RoutesProps = {
	path: '/stock-orders-management',
	name: 'stock-orders',
	icon: 'orders',
	route: PrivateRoute,
	header: 'stock-orders',
	children: [
		{
			path: '/stock-orders-management/stock-orders',
			name: 'stock-orders',
			element: <StockOrders />,
			route: PrivateRoute
		},
		{
			path: '/stock-orders-management/items',
			name: 'items',
			element: <Items />,
			route: PrivateRoute
		}
	]
}
const settings: RoutesProps = {
	path: '/settings',
	name: 'settings',
	icon: 'orders',
	route: PrivateRoute,
	header: 'settings',
	children: [
		{
			path: '/settings/countries',
			name: 'countries-branches',
			element: <Countries />,
			route: PrivateRoute,
			children: [
				{
					path: '/settings/countries/:id',
					name: 'view-country',
					element: <ViewCountry />,
					route: PrivateRoute
				},
				{
					path: '/settings/countries/:id/state/:state_id',
					name: 'view-state',
					element: <ViewState />,
					route: PrivateRoute
				}
			]
		},
		{
			path: '/settings/branches',
			name: 'branches',
			element: <Branches />,
			route: PrivateRoute
		},
		{
			path: '/settings/branches/add',
			name: 'add-branch',
			element: <AddBranch />,
			route: PrivateRoute
		},
		{
			path: '/settings/branches/edit/:id',
			name: 'edit-branch',
			element: <EditBranch />,
			route: PrivateRoute
		},
		{
			path: '/settings/system-settings',
			name: 'system-settings',
			element: <SystemSettings />,
			route: PrivateRoute
		},
		{
			path: '/settings/why-us',
			name: 'why-us',
			element: <WhyUs />,
			route: PrivateRoute
		}
	]
}

const rightMealRouts = [
	home,
	settings,
	staffManagement,
	menuManagement,
	plansManagement,
	ReportsManagement,
	deliveryManagement,
	stockOrders,
	marketingManagement,
	customersManagement,
	walletManagement
]

// auth
const authRoutes: RoutesProps[] = [
	{
		path: '/auth/login',
		name: 'Login',
		element: <Login />,
		route: Route
	},
	{
		path: '/auth/register',
		name: 'Register',
		element: <Register />,
		route: Route
	},
	{
		path: '/auth/logout',
		name: 'Logout',
		element: <Logout />,
		route: Route
	},
	{
		path: '/auth/recover-password',
		name: 'Recover Password',
		element: <RecoverPassword />,
		route: Route
	},
	{
		path: '/auth/lock-screen',
		name: 'Lock Screen',
		element: <LockScreen />,
		route: Route
	},
	{
		path: '/auth/confirm-mail',
		name: 'Confirm Mail',
		element: <ConfirmMail />,
		route: Route
	},
	{
		path: '/auth/verify-code',
		name: 'verify code',
		element: <VerifyCode />,
		route: Route
	},
	{
		path: '/auth/reset-password',
		name: 'reset password',
		element: <ResetPassword />,
		route: Route
	}
]

// public routes
const otherPublicRoutes = [
	{
		path: '*',
		name: 'Error - 404',
		element: <Error404 />,
		route: Route
	},
	{
		path: '/error-404',
		name: 'Error - 404',
		element: <Error404 />,
		route: Route
	},
	{
		path: '/error-500',
		name: 'Error - 500',
		element: <Error500 />,
		route: Route
	},
	{
		path: '/pages/maintenance',
		name: 'Maintenance',
		element: <MaintenancePages />,
		route: Route
	}
]

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
	let flatRoutes: RoutesProps[] = []

	routes = routes || []
	routes.forEach((item: RoutesProps) => {
		flatRoutes.push(item)
		if (typeof item.children !== 'undefined') {
			flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)]
		}
	})
	return flatRoutes
}

// All routes
const authProtectedRoutes = [dashboardRoutes, ...rightMealRouts]
const publicRoutes = [...authRoutes, ...otherPublicRoutes]

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes])
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes])
export { publicRoutes, authProtectedRoutes, authProtectedFlattenRoutes, publicProtectedFlattenRoutes }
