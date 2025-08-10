import { createMealCategoryApi, deleteMealCategoryApi, mealCategoryStatusApi, updateMealCategoryApi } from '@/features/menu/meal-categories/api'
import { handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useCreate, useDelete, useFetchData, useShowData, useStatus, useUpdate } from '@/hooks'
import { getMealCategories, showMealCategory } from '@/redux/slices/menu/mealCategories'
import { RootState } from '@/redux/store'
import { useEffect, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'

export const useGetMealCategories = (params?: any) => {
	const selector = (state: RootState) => state.mealCategoriesReducer
	const { loading, error, data, active_data, getPage, onSearch, search } = useFetchData(getMealCategories, selector, params)
	return { loading, error, data, getPage, onSearch, search, active_data }
}

export const useUpdateMealCategory = () => {
	const selector = (state: RootState) => state.mealCategoriesReducer
	const { updateLoading, handleUpdateData, openEditModal, setOpenEditModal, handleOpenModal, showResponse, showLoading } = useUpdate({
		updateApi: updateMealCategoryApi,
		showSingleAction: showMealCategory,
		selector: selector,
		allAction: getMealCategories
	})
	const data = {
		'name:ar': showResponse?.data?.name?.ar,
		'name:en': showResponse?.data?.name?.en
	}
	const [values, setData] = useState<any>(data)
	useEffect(() => {
		if (!showLoading) {
			setData(data)
		}
	}, [showLoading, showResponse])

	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, values, key, value)
	}
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleUpdateData(values, {})
	}
	return {
		updateLoading,
		handleSubmit,
		handleChange,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		values
	}
}

export const useCreateMealCategory = () => {
	const [data, setData] = useState<any>({
		'name:ar': '',
		'name:en': ''
	})
	const { createLoading, handleCreate, openModal, setOpenModal, handleChange } = useCreate({
		createApi: createMealCategoryApi,
		allAction: getMealCategories,
		data: data,
		setData: setData
	})
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleCreate(data)
	}
	return { createLoading, handleSubmit, handleChange, openModal, setOpenModal, data }
}

export const useChangeMealCategoryStatus = () => {
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useStatus({
		statusApi: mealCategoryStatusApi,
		allAction: getMealCategories
	})
	return {
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	}
}

export const useDeleteMealCategory = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteMealCategoryApi,
		allAction: getMealCategories
	})
	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useMealCategoriesHook = () => {
	const selector = (state: RootState) => state.mealCategoriesReducer
	// fetch all data
	const { loading, error, data, getPage, onSearch, search } = useGetMealCategories()
	// show single meal category
	const { showLoading, showError, showResponse } = useShowData(showMealCategory, selector)
	// change status
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useChangeMealCategoryStatus()
	// delete meal category
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteMealCategory()

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'meal-categories',
		sheet: 'meal-categories'
	})
	return {
		tableRef,
		search,
		onDownload,
		permission,
		loading,
		error,
		data,
		getPage,
		showLoading,
		showError,
		showResponse,
		deleteLoading,
		handleDelete,
		openDeleteModal,
		setOpenDeleteModal,
		handleDeleteModal,
		onSearch,
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	}
}
