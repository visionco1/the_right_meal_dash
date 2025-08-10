import { createPlanCategoryApi, deletePlanCategoryApi, planCategoryStatusApi, updatePlanCategoryApi } from '@/features/plans-management/plan-categories/api'
import { handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useCreate, useDelete, useFetchData, useShowData, useStatus, useUpdate } from '@/hooks'
import { getPlanCategories, showPlanCategory } from '@/redux/slices/plans-management/plan-categories'
import { RootState } from '@/redux/store'
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'

export const useGetPlanCategories = (params?: any) => {
	const selector = (state: RootState) => state.planCategoriesReducer
	const { loading, error, data, getPage, onSearch, search, active_data } = useFetchData(getPlanCategories, selector, params)
	return { loading, error, data, getPage, onSearch, search, active_data }
}

export const useShowPlanCategory = () => {
	const selector = (state: RootState) => state.planCategoriesReducer
	const { showLoading, showResponse } = useShowData(showPlanCategory, selector)
	return { showLoading, showResponse }
}

export const useCreatePlanCategory = () => {
	const [data, setData] = useState<any>({
		'name:ar': '',
		'name:en': '',
		'description:ar': '',
		'description:en': '',
		image: null,
		protiens: '',
		carbohydrates: ''
	})
	const { createLoading, handleCreate, openModal, setOpenModal, handleChange } = useCreate({
		createApi: createPlanCategoryApi,
		allAction: getPlanCategories,
		data: data,
		setData: setData
	})

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleCreate(data)
	}
	return { handleChange, createLoading, handleSubmit, openModal, setOpenModal, data }
}

export const useUpdatePlanCategory = () => {
	const selector = (state: RootState) => state.planCategoriesReducer
	const { updateLoading, handleUpdate, openEditModal, setOpenEditModal, handleOpenModal, handleUpdateData, showLoading, showResponse } = useUpdate({
		updateApi: updatePlanCategoryApi,
		showSingleAction: showPlanCategory,
		selector: selector,
		allAction: getPlanCategories
	})
	// default values
	const data = useMemo(
		() => ({
			'name:ar': showResponse?.data?.name?.ar,
			'name:en': showResponse?.data?.name?.en,
			'description:ar': showResponse?.data?.description?.ar,
			'description:en': showResponse?.data?.description?.en,
			image: null,
			protiens: showResponse?.data?.protiens,
			carbohydrates: showResponse?.data?.carbohydrates
		}),
		[showResponse, showLoading]
	)

	const [values, setData] = useState<any>(data)
	useEffect(() => {
		if (!showLoading) {
			setData(data)
		}
	}, [showResponse, showLoading])

	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, values, key, value)
	}
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleUpdateData(values, data)
	}
	return {
		updateLoading,
		handleUpdate,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		showLoading,
		showResponse,
		values,
		handleSubmit,
		handleChange
	}
}

export const useDeletePlanCategory = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deletePlanCategoryApi,
		allAction: getPlanCategories
	})
	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useChangePlanCategoryStatus = () => {
	const { handleChangeStatus, statusLoading, openStatusModal, setOpenStatusModal, handleChangeStatusModal, handleOpenStatusModal } = useStatus({
		statusApi: planCategoryStatusApi,
		allAction: getPlanCategories
	})
	return {
		handleChangeStatus,
		statusLoading,
		openStatusModal,
		setOpenStatusModal,
		handleChangeStatusModal,
		handleOpenStatusModal
	}
}

export const usePlanCategoriesHook = () => {
	// fetch all data
	const { loading, error, data, getPage, onSearch, search } = useGetPlanCategories()
	// delete meal category
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeletePlanCategory()
	// change status
	const { handleChangeStatus, statusLoading, openStatusModal, setOpenStatusModal, handleChangeStatusModal, handleOpenStatusModal } = useChangePlanCategoryStatus()

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'Plan Category',
		sheet: 'Plan Category'
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
		handleChangeStatus,
		openDeleteModal,
		setOpenDeleteModal,
		handleDeleteModal,
		search,
		openStatusModal,
		setOpenStatusModal,
		handleChangeStatusModal,
		handleOpenStatusModal,
		onSearch
	}
}
