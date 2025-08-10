import { convertToFormData, flattenArrayToBracketedObject, handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useCreate, useDelete, useFetchData, useShowData, useStatus, useUpdate } from '@/hooks'
import { getMeals, showMeal } from '@/redux/slices/menu/meal'
import { MealStatusApi, createMealApi, deleteMealApi, updateMealApi } from '@/features/menu/meal/api'
import { getWorkDays } from '@/redux/slices/menu/work-days'
import { RootState } from '@/redux/store'
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { useParams } from 'react-router-dom'
import { useGetAllCountries } from '../../settings/countries/hooks'
import { useGetMealCategories } from '../meal-categories/hooks'
import { useGetAllergens } from '../allergens/hooks'
import { useGetSizes } from '../sizes/hooks'
import Notify from '@/components/ui/custom-toastify'

export const useGetMeals = (params?: any) => {
	const selector = (state: RootState) => state.mealReducer
	const { loading, error, data, getPage, onSearch, search, active_data } = useFetchData(getMeals, selector, params)
	return { loading, error, data, getPage, onSearch, search, active_data }
}

export const useGetWorkDays = () => {
	const selector = (state: RootState) => state.workDaysReducer
	const { loading, error, data } = useFetchData(getWorkDays, selector)
	return { loading, error, data }
}

export const useShowSingleMeal = () => {
	const selector = (state: RootState) => state.mealReducer
	const { showLoading, showError, showResponse } = useShowData(showMeal, selector)
	return { showLoading, showError, showResponse }
}

export const useCreateMeal = () => {
	const { createLoading, handleCreate } = useCreate({
		createApi: createMealApi,
		redirectTo: '/menu-management/meals'
	})

	const [data, setData] = useState<any>({
		'name:ar': '',
		'name:en': '',
		'description:ar': '',
		'description:en': '',
		is_specific: '0',
		image: null,
		meal_category_id: '',
		country_id: '',
		nutrition_facts: [],
		allergen_ids: [],
		meal_outlet_prices: []
	})

	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, data, key, value)
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (data?.nutrition_facts?.some((item: any) => !item?.is_outlet && !item?.is_plane)) {
			Notify('Please specify outlet or plan', 'warning')
			return
		}
		const formData = convertToFormData(data)
		handleCreate(formData, [], true)
	}

	return { createLoading, handleSubmit, handleChange, data }
}

export const useUpdateMeal = () => {
	const selector = (state: RootState) => state.mealReducer
	const { id } = useParams()
	const { updateLoading, showLoading, showResponse, handleUpdateData, openEditModal, setOpenEditModal, handleOpenModal } = useUpdate({
		updateApi: updateMealApi,
		showSingleAction: showMeal,
		redirectTo: '/menu-management/meals',
		selector: selector
	})

	const values = useMemo(
		() => ({
			'name:ar': showResponse?.data?.name?.ar,
			'name:en': showResponse?.data?.name?.en,
			'description:ar': showResponse?.data?.description?.ar,
			'description:en': showResponse?.data?.description?.en,
			is_specific: showResponse?.data?.is_specific?.toString(),
			image: null,
			meal_category_id: showResponse?.data?.category?.id,
			country_id: showResponse?.data?.country?.id,
			allergen_ids: showResponse?.data?.allergens?.map((item: any) => item?.id)
			// nutrition_facts: showResponse?.data?.nutritions,
			// meal_outlet_prices: showResponse?.data?.prices,
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
		// format the allergen ids
		// const allergen_ids = flattenArrayToBracketedObject(data?.allergen_ids, 'allergen_ids', (item: any) => ({ '': item.id }))
		// const values_allergen_ids = flattenArrayToBracketedObject(values?.allergen_ids, 'allergen_ids', (item: any) => ({ '': item.id }))

		// filter the data before send
		// const filteredData = Object.fromEntries(
		// 	Object.entries({
		// 		...data,
		// 		...allergen_ids,
		// 		country_id: data?.country_id?.id,
		// 		meal_category_id: data?.meal_category_id?.id
		// 	}).filter(([key]) => key !== 'allergen_ids')
		// )
		// make the values like the data to compare them and send the differences
		// const filteredValues = Object.fromEntries(
		// 	Object.entries({
		// 		...values,
		// 		...values_allergen_ids,
		// 		country_id: values?.country_id?.id,
		// 		meal_category_id: values?.meal_category_id?.id
		// 	}).filter(([key]) => key !== 'allergen_ids')
		// )
		const formdata = convertToFormData(data)
		if (id) {
			// handleUpdateData(filteredData, filteredValues, id as any)
			handleUpdateData(formdata, {}, id as any)
		}
	}

	return {
		updateLoading,
		handleSubmit,
		data,
		handleChange,
		showLoading,
		showResponse,
		openEditModal,
		setOpenEditModal,
		handleOpenModal
	}
}

export const useDeleteMeal = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteMealApi,
		allAction: getMeals
	})
	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useChangeMealStatus = () => {
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal, handleChangeStatus } = useStatus({
		statusApi: MealStatusApi,
		allAction: getMeals
	})
	return {
		handleChangeStatus,
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	}
}

export const useMealHook = () => {
	// fetch all data
	const { loading, error, data, getPage, onSearch, search } = useGetMeals()
	// delete meal category
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteMeal()
	// change status
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useChangeMealStatus()

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'Meal',
		sheet: 'Meal'
	})
	return {
		search,
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
