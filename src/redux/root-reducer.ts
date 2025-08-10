import { combineReducers } from '@reduxjs/toolkit'
import { layoutReducer } from './slices/layout/layout'
import { authReducer } from './slices/auth/auth'
import { settingsReducer } from './slices/settings/settings'
import { countriesReducer } from './slices/settings/countries'
import { statesReducer } from './slices/settings/states'
import { citiesReducer } from './slices/settings/cities'
import { branchesReducer } from './slices/settings/branches'
import { adminsReducer } from './slices/staff/admins'
import { rolesReducer } from './slices/staff/roles'
import { permissionsReducer } from './slices/staff/permissions'
import { allergensReducer } from './slices/menu/allergens'
import { mealCategoriesReducer } from './slices/menu/mealCategories'
import { usersReducer } from './slices/customer/users'
import { deliveryMenReducer } from './slices/delivery/delivery-men'
import { zonesReducer } from './slices/delivery/zones'
import { shiftsReducer } from './slices/delivery/delivery-periods'
import { sizesReducer } from './slices/menu/sizes'
import { menusReducer } from './slices/menu/menu'
import { sectionsReducer } from './slices/menu/sections'
import { workDaysReducer } from './slices/menu/work-days'
import { mealReducer } from './slices/menu/meal'
import { NutritionFactsReducer } from './slices/menu/nutrition-facts'
import { planCategoriesReducer } from './slices/plans-management/plan-categories'
import { subscriptionPlansReducer } from './slices/plans-management/plans'
import { SubscriptionsReducer } from './slices/customer/subscriptions'
import { SectionMealsReducer } from './slices/menu/section-meals'
import { ReportsReducer } from './slices/reports/reports'
import { BannersReducer } from './slices/marketing/banners'
import { CouponsReducer } from './slices/marketing/coupons'
import { ContactUsReducer } from './slices/marketing/contact-us'
import { WhyUsReducer } from './slices/settings/why-us'
import { ComplaintsReducer } from './slices/customer/complaints'
import { OrdersReducer } from './slices/customer/orders'
import { SubscribersReducer } from './slices/marketing/subscribers'
import { NotificationsReducer } from './slices/marketing/notifications'
import { multiFormReducer } from '@/features/plans-management/plans/state-slice'
import { QualityControlReducer } from './slices/delivery/quality-control'
import { OutletReducer } from './slices/delivery/outlets'

// all reducers
export const reducers = {
	authReducer,
	layoutReducer,
	settingsReducer,
	countriesReducer,
	statesReducer,
	citiesReducer,
	branchesReducer,
	adminsReducer,
	rolesReducer,
	permissionsReducer,
	allergensReducer,
	mealCategoriesReducer,
	usersReducer,
	deliveryMenReducer,
	zonesReducer,
	shiftsReducer,
	sizesReducer,
	menusReducer,
	sectionsReducer,
	workDaysReducer,
	mealReducer,
	NutritionFactsReducer,
	planCategoriesReducer,
	subscriptionPlansReducer,
	SubscriptionsReducer,
	SectionMealsReducer,
	ReportsReducer,
	BannersReducer,
	CouponsReducer,
	ContactUsReducer,
	WhyUsReducer,
	ComplaintsReducer,
	OrdersReducer,
	SubscribersReducer,
	NotificationsReducer,
	multiFormReducer,
	QualityControlReducer,
	OutletReducer
}
export default combineReducers(reducers)
