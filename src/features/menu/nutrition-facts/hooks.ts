import { hasPermissions } from '@/helpers/helpers'
import { useCreate, useDelete, useFetchData, useShowData, useStatus, useUpdate } from '@/hooks'
import { getNutritionFacts, showNutritionFact } from '@/redux/slices/menu/nutrition-facts'
import { NutritionFactStatusApi, createNutritionFactApi, deleteNutritionFactApi } from '@/features/menu/nutrition-facts/api'
import { RootState } from '@/redux/store'
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { showMeal } from '@/redux/slices/menu/meal'
import { updateMealApi } from '@/features/menu/meal/api'

export const useGetNutritionFacts = () => {
	const selector = (state: RootState) => state.NutritionFactsReducer
	const { loading, error, data, getPage, onSearch, search } = useFetchData(getNutritionFacts, selector)
	return { loading, error, data, getPage, onSearch, search }
}

export const useShowSingleNutritionFact = () => {
	const selector = (state: RootState) => state.NutritionFactsReducer
	const { showLoading, showError, showResponse } = useShowData(showNutritionFact, selector)
	return { showLoading, showError, showResponse }
}

export const useCreateNutritionFact = () => {
	const { createLoading, handleCreate, openModal, setOpenModal } = useCreate({
		createApi: createNutritionFactApi,
		allAction: getNutritionFacts,
		redirectTo: '/menu-management/nutrition-facts'
	})
	return { createLoading, handleCreate, openModal, setOpenModal }
}

export const useUpdateNutritionFact = () => {
	// const selector = (state: RootState) => state.NutritionFactsReducer
	const selector = (state: RootState) => state.mealReducer
	const { updateLoading, showLoading, showResponse, handleUpdateWithId, openEditModal, setOpenEditModal, handleOpenModal } = useUpdate({
		updateApi: updateMealApi,
		showSingleAction: showMeal,
		selector: selector,
		redirectTo: '/menu-management/nutrition-facts'
	})
	const values = useMemo(
		() =>
			showResponse?.data?.nutritions?.map((item: any) => ({
				id: item?.id,
				calories: item?.calories,
				carbohydrates: item?.carbohydrates,
				protiens: item?.protiens,
				fats: item?.fats,
				is_outlet: item?.is_outlet,
				plane: item?.is_plane,
				multiple: item?.multiple,
				size: item?.size,
				meal_outlet_prices: item?.prices
			})),
		[showResponse, showLoading]
	)

	const [data, setData] = useState<any>(values)
	useEffect(() => {
		if (!showLoading) {
			setData(values)
		}
	}, [showLoading, showResponse, values])

	const handleChangeOutlet = (id: number, key: string, value: any) => {
		const updatedData = data?.meal_outlet_prices?.map((item: any) => {
			if (item.id === id) {
				return {
					...item,
					[key]: value
				}
			}
			return item
		})
		setData(updatedData)
	}

	const handleChange = (id: number, label: string, value: string) => {
		const updatedData = data?.map((item: any) => {
			if (item.id === id) {
				return {
					...item,
					[label]: value
				}
			}
			return item
		})

		setData(updatedData)
	}

	const handleUpdateNutrition = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const nutrition = Array.isArray(data)
			? data?.reduce((acc: any, item: any, index: any) => {
					acc[`nutrition_facts[${index}][calories]`] = item.calories
					acc[`nutrition_facts[${index}][carbohydrates]`] = item.carbohydrates
					acc[`nutrition_facts[${index}][protiens]`] = item.protiens
					acc[`nutrition_facts[${index}][fats]`] = item.fats
					acc[`nutrition_facts[${index}][size_id]`] = item.size?.id
					acc[`nutrition_facts[${index}][is_outlet]`] = item.is_outlet ? '1' : '0'
					acc[`nutrition_facts[${index}][is_plane]`] = item.is_plane ? '1' : '0'
					acc[`nutrition_facts[${index}][is_multiple_select]`] = item.multiple ? '1' : '0'
					acc[`nutrition_facts[${index}][id]`] = item.id
					return acc
				}, {})
			: {}

		const flattenedData = data?.map((item: any) => item?.meal_outlet_prices).flat()
		const prices = Array.isArray(flattenedData)
			? flattenedData?.reduce((acc: any, item: any, index: any) => {
					acc[`meal_outlet_prices[${index}][price]`] = item?.price
					acc[`meal_outlet_prices[${index}][discount_price]`] = item?.discount_price
					acc[`meal_outlet_prices[${index}][discount_percentage]`] = item?.discount_percentage
					acc[`meal_outlet_prices[${index}][currency]`] = item?.currency
					acc[`meal_outlet_prices[${index}][size]`] = item?.size?.localized_name
					return acc
				}, {})
			: {}
		// console.log({...nutrition,...prices})
		handleUpdateWithId(showResponse?.data?.id, { ...nutrition })
	}

	return {
		handleChange,
		updateLoading,
		showLoading,
		handleUpdateNutrition,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		showResponse,
		handleChangeOutlet,
		data
	}
}

export const useDeleteNutritionFact = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteNutritionFactApi,
		allAction: getNutritionFacts
	})
	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useChangeNutritionFactStatus = () => {
	const { statusLoading, handleChangeStatus, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useStatus({
		statusApi: NutritionFactStatusApi,
		allAction: getNutritionFacts
	})
	return {
		statusLoading,
		handleChangeStatus,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	}
}

export const useNutritionFactHook = () => {
	const { loading, error, data, getPage, onSearch, search } = useGetNutritionFacts()
	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'NutritionFact',
		sheet: 'NutritionFact'
	})
	return { tableRef, onDownload, permission, loading, error, data, getPage, onSearch, search }
}
