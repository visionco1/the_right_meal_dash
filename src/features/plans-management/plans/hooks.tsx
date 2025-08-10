import { convertToFormData, handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useCreate, useDelete, useFetchData, useShowData, useStatus, useUpdate } from '@/hooks'
import { getSubscriptionPlans, showSubscriptionPlan } from '@/redux/slices/plans-management/plans'
import { getWorkDays } from '@/redux/slices/menu/work-days'
import { RootState } from '@/redux/store'
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { useParams } from 'react-router-dom'
import { createSubscriptionPlanApi, deleteSubscriptionPlanApi, SubscriptionPlanStatusApi, updateSubscriptionPlanApi } from '@/features/plans-management/plans/api'
import { tCreateDate } from './type'
import { useDispatch, useSelector } from 'react-redux'
import { addGroup, reset } from './state-slice'

export const useGetSubscriptionPlans = (params?: any, cached?: boolean) => {
	const selector = (state: RootState) => state.subscriptionPlansReducer
	const { loading, error, data, getPage, onSearch, search, active_data } = useFetchData(getSubscriptionPlans, selector, params, cached)
	return { loading, error, data, getPage, onSearch, search, active_data }
}

export const useGetWorkDays = () => {
	const selector = (state: RootState) => state.workDaysReducer
	const { loading, error, data } = useFetchData(getWorkDays, selector)
	return { loading, error, data }
}

export const useShowSingleSubscriptionPlan = () => {
	const selector = (state: RootState) => state.subscriptionPlansReducer
	const { showLoading, showError, showResponse } = useShowData(showSubscriptionPlan, selector)
	return { showLoading, showError, showResponse }
}

export const useCreateSubscriptionPlan = () => {
	useEffect(() => {
		dispatch(reset())
		dispatch(addGroup())
	}, [])
	const { groups } = useSelector((state: RootState) => state.multiFormReducer)
	const dispatch = useDispatch()
	const { createLoading, handleCreate } = useCreate({
		createApi: createSubscriptionPlanApi,
		redirectTo: '/plans-management/plans',
		sideActions: () => dispatch(reset())
	})

	const [data, setData] = useState<tCreateDate>({
		'name:ar': '',
		'name:en': '',
		'description:ar': '',
		'description:en': '',
		image: null,
		country_id: '',
		total_meals_in_plan: '',
		min_calories: '',
		max_calories: '',
		total_plan_categories_range: '',
		menu_id: '',
		plan_category_id: '',
		filter_by_meal_no: null,
		excluded_meals: [],
		plan_menus: [],
		plan_versions: []
	})

	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, data, key, value)
	}
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const multiSections = groups
			.flatMap((obj: any) => obj.items)
			?.map((item: any) => ({
				...item,
				menu_id: data?.menu_id,
				multi_selected: true,
				quantity: groups[item?.multi_index]?.total_quantity
			}))

		const formData = convertToFormData({
			...data,
			...(multiSections?.[0]?.section_id ? { multi_sections: multiSections } : {}),
			plan_menus: data?.plan_menus?.map((item: any) => ({
				...item,
				menu_id: data?.menu_id
			}))
		})

		handleCreate(formData, [], true)
	}

	return {
		createLoading,
		handleSubmit,
		handleChange,
		data
	}
}

export const useUpdateSubscriptionPlan = () => {
	const selector = (state: RootState) => state.subscriptionPlansReducer
	const { groups } = useSelector((state: RootState) => state.multiFormReducer)
	const { id } = useParams()
	const dispatch = useDispatch()
	const { updateLoading, showLoading, showResponse, handleUpdateData, handleUpdateWithId } = useUpdate({
		updateApi: updateSubscriptionPlanApi,
		showSingleAction: showSubscriptionPlan,
		selector: selector,
		redirectTo: '/plans-management/plans',
		sideActions: () => dispatch(reset())
	})

	const values = useMemo(
		() => ({
			'name:ar': showResponse?.data?.name?.ar,
			'name:en': showResponse?.data?.name?.en,
			'description:ar': showResponse?.data?.description?.ar,
			'description:en': showResponse?.data?.description?.en,
			image: null,
			country_id: showResponse?.data?.country?.id,
			total_meals_in_plan: showResponse?.data?.total_meals_in_plan,
			min_calories: showResponse?.data?.min_calories,
			max_calories: showResponse?.data?.max_calories,
			plan_category_id: showResponse?.data?.categories?.id,
			filter_by_meal_no: showResponse?.data?.filter_by_meal_no,
			excluded_meals: showResponse?.data?.excluded_meals?.map((item: any) => item?.id),
			menu_id: showResponse?.data?.plan_menus?.[0]?.menu_id,
			plan_versions: showResponse?.data?.Versions,
			plan_menus: showResponse?.data?.plan_menus?.filter((item: any) => !item?.multi_selected),
			multi_sections: showResponse?.data?.plan_menus?.filter((item: any) => item?.multi_selected) || []
		}),
		[showResponse, showLoading]
	)

	const [data, setData] = useState<any>(values)

	useEffect(() => {
		if (!showLoading) {
			setData(values)
		}
	}, [showLoading, showResponse])

	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, data, key, value)
	}
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = convertToFormData({
			...data,
			multi_sections: groups
				.flatMap((obj: any) => obj.items)
				?.map((item: any) => ({
					...item,
					menu_id: data?.menu_id,
					quantity: groups[item?.multi_index]?.total_quantity
				})),
			plan_menus: data?.plan_menus?.map((item: any) => ({
				...item,
				menu_id: data?.menu_id
			}))
		})
		if (id) {
			handleUpdateData(formData, {}, id as any)
		}
	}

	return {
		updateLoading,
		handleSubmit,
		handleChange,
		data,
		showLoading,
		showResponse
	}
}

export const useDeleteSubscriptionPlan = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteSubscriptionPlanApi,
		allAction: getSubscriptionPlans
	})
	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useChangeSubscriptionPlanStatus = () => {
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useStatus({
		statusApi: SubscriptionPlanStatusApi,
		allAction: getSubscriptionPlans
	})
	return {
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	}
}

export const useSubscriptionPlanHook = () => {
	// fetch all data
	const { loading, error, data, getPage, onSearch, search } = useGetSubscriptionPlans()

	// delete SubscriptionPlan category
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteSubscriptionPlan()

	// change status
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useChangeSubscriptionPlanStatus()

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'SubscriptionPlan',
		sheet: 'SubscriptionPlan'
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
		search,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	}
}
