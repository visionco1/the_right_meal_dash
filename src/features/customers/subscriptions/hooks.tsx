import Notify from '@/components/ui/custom-toastify'
import { handleChangeState, handleDeleteFromState, hasPermissions } from '@/helpers/helpers'
import { useCreate, useDelete, useFetchData, useShowData, useStatus, useUpdate } from '@/hooks'
import { getSubscriptions, showSubscription } from '@/redux/slices/customer/subscriptions'
import { SubscriptionStatusApi, assignOrderDayDeliveryApi, createSubscriptionApi, deleteSubscriptionApi, updateSubscriptionApi } from '@/features/customers/subscriptions/api'
import { getWorkDays } from '@/redux/slices/menu/work-days'
import { RootState } from '@/redux/store'
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { useParams } from 'react-router-dom'
import { useGetAllCountries } from '../../settings/countries/hooks'
import { useGetSizes } from '../../menu/sizes/hooks'
import { useGetPlanCategories } from '../../plans-management/plan-categories/hooks'
import { useGetMeals } from '../../menu/meal/hooks'
import { useGetMenus } from '../../menu/menu/hooks'
import { useGetSections } from '../../menu/sections/hooks'

type TData = {
	customer_name: any
	subscription: any
	version_duration: any
	status: any
	extended_end_date: any
	start_date: any
	end_date: any
}

export const useGetSubscriptions = (params?: any) => {
	const selector = (state: RootState) => state.SubscriptionsReducer
	const { loading, error, data, getPage, onSearch, handleFetch, active_data } = useFetchData(getSubscriptions, selector, params)
	const [filter_data, set_filter_data] = useState<TData>({
		customer_name: '',
		subscription: '',
		version_duration: '',
		status: '',
		extended_end_date: '',
		start_date: '',
		end_date: ''
	})
	// Filter out keys with empty values
	const finalFilters = Object.fromEntries(Object.entries(filter_data).filter(([_, value]) => value))
	const handleChangeFilter = (key: string, value: any) => {
		handleChangeState(set_filter_data, filter_data, key, value)
	}
	const handleSearch = () => {
		handleFetch(finalFilters)
	}
	return { loading, error, data, getPage, onSearch, handleChangeFilter, filter_data, handleSearch, active_data }
}

export const useGetWorkDays = () => {
	const selector = (state: RootState) => state.workDaysReducer
	const { loading, error, data } = useFetchData(getWorkDays, selector)
	return { loading, error, data }
}

export const useShowSingleSubscription = () => {
	const selector = (state: RootState) => state.SubscriptionsReducer
	const { showLoading, showError, showResponse, handleShow } = useShowData(showSubscription, selector)
	return { showLoading, showError, showResponse, handleShow }
}

export const useAssignDeliveryToSubscription = () => {
	const { id } = useParams()
	const { handleShow } = useShowSingleSubscription()

	const handleAssign = async (delivery_id: ID) => {
		try {
			const response = await assignOrderDayDeliveryApi({ delivery_id, order_id: id })
			Notify(response?.data?.data, 'success')
			if (response?.data?.success) {
				handleShow(id as any)
			}
			return response?.data
		} catch (error: any) {
			Notify(error, 'error')
			return error
		}
	}
	const handleAssignDeliveryToDay = async (delivery_id: ID, order_day_id: ID) => {
		try {
			const response = await assignOrderDayDeliveryApi({
				delivery_id,
				order_day_id: order_day_id
			})
			Notify(response?.data?.data, 'success')
			if (response?.data?.success) {
				handleShow(id as any)
			}
			return response?.data
		} catch (error: any) {
			Notify(error, 'error')
			return error
		}
	}

	return { handleAssign, handleAssignDeliveryToDay }
}

// export const useCreateSubscription = () => {
// 	const { createLoading, handleCreate } = useCreate({
// 		createApi: createSubscriptionApi,
// 		redirectTo: '/subscriptions/subscription-plans'
// 	})
// 	const { active_data: countries } = useGetAllCountries({ is_paginated: 0 })
// 	const { active_data: sizes } = useGetSizes({ is_paginated: 0 })
// 	const { active_data: planCategories } = useGetPlanCategories({ is_paginated: 0 })
// 	const { active_data: meals } = useGetMeals({ is_paginated: 0 })
// 	const { active_data: menus } = useGetMenus({ is_paginated: 0 })
// 	const subscription_type = [
// 		{ id: 'Weekly', name: 'Weekly ' },
// 		{ id: 'Monthly', name: 'Monthly' }
// 	]
// 	// main data
// 	const [data, setData] = useState<any>({
// 		'name:ar': '',
// 		'name:en': '',
// 		'description:ar': '',
// 		'description:en': '',
// 		image: null,
// 		country_id: '',
// 		total_meals_in_plan: '',
// 		min_calories: '',
// 		max_calories: '',
// 		total_plan_categories_range: '',
// 		excluded_meals: [],
// 		plan_category_id: '',
// 		plan_menus: [],
// 		plan_versions: []
// 	})
// 	// plan menus
// 	const [plan_menus, set_menus] = useState<any>({
// 		menu_id: '',
// 		menu_section: '',
// 		quantity: '',
// 		size: ''
// 	})
// 	// get the sections depends on the menu id
// 	const { active_data: sections } = useGetSections({ is_paginated: 0, menu_id: plan_menus?.menu_id?.id })
// 	const [plan_versions, set_plan_versions] = useState<any>({
// 		number_of_days: '',
// 		meal_price_per_day: '',
// 		price: '',
// 		delivery_price_per_day: '',
// 		discount: '',
// 		subscription_type: ''
// 	})

// 	const handleChange = (key: string, value: any) => {
// 		handleChangeState(setData, data, key, value)
// 	}

// 	const handleChangeMenu = (key: string, value: any) => {
// 		handleChangeState(set_menus, plan_menus, key, value)
// 	}

// 	const handleAddMenu = () => {
// 		if (plan_menus) {
// 			for (const key in plan_menus) {
// 				if (plan_menus[key] === '') {
// 					Notify('Please fill the data', 'warning')
// 					return
// 				} else {
// 					handleChange('plan_menus', [...data.plan_menus, plan_menus])
// 					set_menus({
// 						menu_section: '',
// 						quantity: '',
// 						size: ''
// 					})
// 				}
// 			}
// 		}
// 	}

// 	const handleDeleteMenu = (index: number) => {
// 		const newSections = data?.plan_menus.filter((item: any, i: number) => i !== index)
// 		handleChange('plan_menus', newSections)
// 	}

// 	const handleChangePlanVersion = (key: string, value: any) => {
// 		handleChangeState(set_plan_versions, plan_versions, key, value)
// 	}
// 	const handleAddPlanVersion = () => {
// 		if (plan_versions) {
// 			for (const key in plan_versions) {
// 				if (plan_versions[key] === '') {
// 					Notify('Please fill the data', 'warning')
// 					return
// 				} else {
// 					handleChange('plan_versions', [...data.plan_versions, plan_versions])
// 					set_plan_versions({
// 						number_of_days: '',
// 						meal_price_per_day: '',
// 						delivery_price_per_day: '',
// 						discount: '',
// 						price: '',
// 						subscription_type: ''
// 					})
// 				}
// 			}
// 		}
// 	}
// 	const handleDeletePlanVersion = (index: number) => {
// 		const newSections = data?.plan_versions.filter((item: any, i: number) => i !== index)
// 		handleChange('plan_versions', newSections)
// 	}

// 	const handleCreateSubscription = (e: FormEvent<HTMLFormElement>) => {
// 		e.preventDefault()
// 		// apply the format
// 		const plan_versions = Array.isArray(data?.plan_versions)
// 			? data.plan_versions.reduce((acc: any, item: any, index: any) => {
// 					acc[`plan_versions[${index}][number_of_days]`] = item?.number_of_days
// 					acc[`plan_versions[${index}][meal_price_per_day]`] = item?.meal_price_per_day
// 					acc[`plan_versions[${index}][price]`] = item?.price
// 					acc[`plan_versions[${index}][delivery_price_per_day]`] = item?.delivery_price_per_day
// 					acc[`plan_versions[${index}][discount]`] = item?.discount
// 					acc[`plan_versions[${index}][subscription_type]`] = item?.subscription_type?.id
// 					return acc
// 				}, {})
// 			: {}
// 		// apply the format
// 		const plan_menus = Array.isArray(data?.plan_menus)
// 			? data.plan_menus.reduce((acc: any, item: any, index: any) => {
// 					acc[`plan_menus[${index}][menu_id]`] = item?.menu_id?.id
// 					acc[`plan_menus[${index}][section_id]`] = item?.menu_section?.id
// 					acc[`plan_menus[${index}][quantity]`] = item?.quantity
// 					acc[`plan_menus[${index}][size_id]`] = item?.size?.id
// 					return acc
// 				}, {})
// 			: {}
// 		// apply the format
// 		const excluded_meals = Array.isArray(data?.excluded_meals)
// 			? data.excluded_meals.reduce((acc: any, item: any, index: any) => {
// 					acc[`excluded_meals[${index}]`] = item?.id
// 					return acc
// 				}, {})
// 			: {}
// 		// filter the data before send
// 		const filteredData = Object.fromEntries(
// 			Object.entries({
// 				...data,
// 				...plan_versions,
// 				...plan_menus,
// 				...excluded_meals,
// 				country_id: data?.country_id?.id,
// 				plan_category_id: data?.plan_category_id?.id
// 			}).filter(([key]) => key !== 'plan_versions' && key !== 'plan_menus' && key !== 'excluded_meals')
// 		)

// 		handleCreate(filteredData, [], true)
// 		console.log(filteredData)
// 	}

// 	return {
// 		createLoading,
// 		handleCreateSubscription,
// 		handleAddMenu,
// 		handleChange,
// 		data,
// 		handleChangeMenu,
// 		plan_menus,
// 		handleDeleteMenu,
// 		handleChangePlanVersion,
// 		handleAddPlanVersion,
// 		handleDeletePlanVersion,
// 		plan_versions,
// 		subscription_type,
// 		countries,
// 		sizes,
// 		planCategories,
// 		meals,
// 		menus,
// 		sections
// 	}
// }

// export const useUpdateSubscription = () => {
// 	const selector = (state: RootState) => state.SubscriptionsReducer
// 	const { id } = useParams()

// 	const { updateLoading, showLoading, showResponse, handleUpdateWithId } = useUpdate({
// 		updateApi: updateSubscriptionApi,
// 		showSingleAction: showSubscription,
// 		selector: selector,
// 		redirectTo: '/subscriptions/subscription-plans',
// 		allAction: getSubscriptions
// 	})

// 	const { active_data: countries } = useGetAllCountries({ is_paginated: 0 })
// 	const { active_data: sizes } = useGetSizes({ is_paginated: 0 })
// 	const { active_data: planCategories } = useGetPlanCategories({ is_paginated: 0 })
// 	const { active_data: meals } = useGetMeals({ is_paginated: 0 })
// 	const { active_data: menus } = useGetMenus({ is_paginated: 0 })
// 	const subscription_type = [
// 		{ id: 'Weekly', name: 'Weekly ' },
// 		{ id: 'Monthly', name: 'Monthly' }
// 	]
// 	// main data
// 	// const file = urlToFile(showResponse?.data?.image?.url, 'image')

// 	const values = useMemo(
// 		() => ({
// 			'name:ar': showResponse?.data?.name?.ar,
// 			'name:en': showResponse?.data?.name?.en,
// 			'description:ar': showResponse?.data?.description?.ar,
// 			'description:en': showResponse?.data?.description?.en,
// 			image: showResponse?.data?.image?.url,
// 			country_id: showResponse?.data?.country,
// 			total_meals_in_plan: showResponse?.data?.total_meals_in_plan,
// 			min_calories: showResponse?.data?.min_calories,
// 			max_calories: showResponse?.data?.max_calories,
// 			total_plan_categories_range: '',
// 			plan_category_id: showResponse?.data?.localized_category_name,
// 			plan_versions: showResponse?.data?.Versions,
// 			excluded_meals: [],
// 			plan_menus: showResponse?.data?.plan_menus
// 		}),
// 		[showResponse, showLoading]
// 	)
// 	const [data, setData] = useState<any>(values)

// 	useEffect(() => {
// 		if (showLoading == false) {
// 			setData(values)
// 		}
// 	}, [showLoading])
// 	// plan menus
// 	const [plan_menus, set_menus] = useState<any>({
// 		menu_id: '',
// 		menu_section: '',
// 		quantity: '',
// 		size: ''
// 	})

// 	// get the sections depends on the menu id
// 	const { active_data: sections } = useGetSections({ is_paginated: 0, menu_id: plan_menus?.menu_id?.id })
// 	const [plan_versions, set_plan_versions] = useState<any>({
// 		number_of_days: '',
// 		meal_price_per_day: '',
// 		price: '',
// 		delivery_price_per_day: '',
// 		discount: '',
// 		subscription_type: ''
// 	})

// 	const handleChange = (key: string, value: any) => {
// 		handleChangeState(setData, data, key, value)
// 	}

// 	const handleChangeMenu = (key: string, value: any) => {
// 		handleChangeState(set_menus, plan_menus, key, value)
// 	}

// 	const handleAddMenu = () => {
// 		if (plan_menus) {
// 			for (const key in plan_menus) {
// 				if (plan_menus[key] === '') {
// 					Notify('Please fill the data', 'warning')
// 					return
// 				} else {
// 					handleChange('plan_menus', [...data.plan_menus, plan_menus])
// 					set_menus({
// 						menu_section: '',
// 						quantity: '',
// 						size: ''
// 					})
// 				}
// 			}
// 		}
// 	}

// 	const handleDeleteMenu = (index: number) => {
// 		handleDeleteFromState(setData, data, 'plan_menus', index)
// 	}

// 	const handleChangePlanVersion = (key: string, value: any) => {
// 		handleChangeState(set_plan_versions, plan_versions, key, value)
// 	}

// 	const handleAddPlanVersion = () => {
// 		if (plan_versions) {
// 			for (const key in plan_versions) {
// 				if (plan_versions[key] === '') {
// 					Notify('Please fill the data', 'warning')
// 					return
// 				} else {
// 					handleChange('plan_versions', [...data.plan_versions, plan_versions])
// 					set_plan_versions({
// 						number_of_days: '',
// 						meal_price_per_day: '',
// 						delivery_price_per_day: '',
// 						discount: '',
// 						price: '',
// 						subscription_type: ''
// 					})
// 				}
// 			}
// 		}
// 	}

// 	const handleDeletePlanVersion = (index: number) => {
// 		handleDeleteFromState(setData, data, 'plan_versions', index)
// 	}

// 	const handleUpdatePlan = (e: FormEvent<HTMLFormElement>) => {
// 		e.preventDefault()
// 		// apply the format
// 		const plan_versions = Array.isArray(data?.plan_versions)
// 			? data.plan_versions.reduce((acc: any, item: any, index: any) => {
// 					acc[`plan_versions[${index}][number_of_days]`] = item?.number_of_days
// 					acc[`plan_versions[${index}][meal_price_per_day]`] = item?.meal_price_per_day
// 					acc[`plan_versions[${index}][price]`] = item?.price
// 					acc[`plan_versions[${index}][delivery_price_per_day]`] = item?.delivery_price_per_day
// 					acc[`plan_versions[${index}][discount]`] = item?.discount
// 					acc[`plan_versions[${index}][subscription_type]`] = item?.subscription_type?.id
// 					return acc
// 				}, {})
// 			: {}
// 		// apply the format
// 		const plan_menus = Array.isArray(data?.plan_menus)
// 			? data.plan_menus.reduce((acc: any, item: any, index: any) => {
// 					acc[`plan_menus[${index}][menu_id]`] = item?.menu_id?.id
// 					acc[`plan_menus[${index}][section_id]`] = item?.menu_section?.id
// 					acc[`plan_menus[${index}][quantity]`] = item?.quantity
// 					acc[`plan_menus[${index}][size_id]`] = item?.size?.id
// 					return acc
// 				}, {})
// 			: {}
// 		// apply the format
// 		const excluded_meals = Array.isArray(data?.excluded_meals)
// 			? data.excluded_meals.reduce((acc: any, item: any, index: any) => {
// 					acc[`excluded_meals[${index}]`] = item?.id
// 					return acc
// 				}, {})
// 			: {}
// 		// filter the data before send
// 		const filteredData = Object.fromEntries(
// 			Object.entries({
// 				...data,
// 				...plan_versions,
// 				...plan_menus,
// 				...excluded_meals,
// 				country_id: data?.country_id?.id,
// 				plan_category_id: data?.plan_category_id?.id
// 			}).filter(([key]) => key !== 'plan_versions' && key !== 'plan_menus' && key !== 'excluded_meals')
// 		)

// 		console.log(filteredData)
// 		if (id) {
// 			handleUpdateWithId(id as any, filteredData)
// 		}
// 	}

// 	return {
// 		updateLoading,
// 		handleUpdatePlan,
// 		handleAddMenu,
// 		handleChange,
// 		data,
// 		handleChangeMenu,
// 		plan_menus,
// 		handleDeleteMenu,
// 		handleChangePlanVersion,
// 		handleAddPlanVersion,
// 		handleDeletePlanVersion,
// 		plan_versions,
// 		subscription_type,
// 		countries,
// 		sizes,
// 		planCategories,
// 		meals,
// 		menus,
// 		sections,
// 		showLoading
// 	}
// }

export const useDeleteSubscription = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteSubscriptionApi,
		allAction: getSubscriptions
	})
	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useChangeSubscriptionStatus = () => {
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useStatus({
		statusApi: SubscriptionStatusApi,
		allAction: getSubscriptions
	})

	return {
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	}
}

export const useSubscriptionHook = () => {
	// fetch all data
	const { loading, error, data, getPage, onSearch } = useGetSubscriptions()
	// delete Subscription category
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteSubscription()
	// change status
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useChangeSubscriptionStatus()

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'Subscription',
		sheet: 'Subscription'
	})
	return {
		tableRef,
		onDownload,
		permission,
		loading,
		error,
		data,
		getPage,
		deleteLoading,
		handleDelete,
		statusLoading,
		openDeleteModal,
		setOpenDeleteModal,
		handleDeleteModal,
		onSearch,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	}
}
