import { hasPermissions } from '@/helpers/helpers'
import { useCreate, useDelete, useFetchData, useShowData, useStatus, useUpdate } from '@/hooks'
import { sectionMealsStatusApi, createSectionMealApi, deleteSectionMealApi, updateSectionMealApi } from '@/features/menu/section-meals/api'
import { getSectionMeals, showSectionMeal } from '@/redux/slices/menu/section-meals'
import { RootState } from '@/redux/store'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { useGetMeals } from '../meal/hooks'
import { useGetMealCategories } from '../meal-categories/hooks'
import { useParams } from 'react-router-dom'
import { useShowSingleMenu } from '../menu/hooks'

export const useGetSectionMeals = (params?: any) => {
	const selector = (state: RootState) => state.SectionMealsReducer
	const { loading, error, data, getPage, onSearch } = useFetchData(getSectionMeals, selector, params)
	return { loading, error, data, getPage, onSearch }
}

export const useShowSingleSectionMeal = () => {
	const selector = (state: RootState) => state.SectionMealsReducer
	const { showLoading, showError, showResponse } = useShowData(showSectionMeal, selector)
	return { showLoading, showError, showResponse }
}

export const useCreateSectionMeal = () => {
	const [data, setData] = useState<any>({
		meal_id: '',
		section_id: '',
		menu_day_id: '',
		menu_id: ''
	})
	const { createLoading, handleCreate, openModal, setOpenModal, createResponse, handleChange } = useCreate({
		createApi: createSectionMealApi,
		allAction: getSectionMeals,
		data: data,
		setData: setData
	})
	const { handleShow } = useShowSingleMenu()
	const { id } = useParams()
	const [meal_category, set_meal_category] = useState<any>('')
	const { active_data: meals } = useGetMeals({ is_paginated: 0, meal_category_id: meal_category?.id })
	const { active_data: meal_categories } = useGetMealCategories({ is_paginated: 0 })

	useEffect(() => {
		if (openModal == false) {
			setData({
				meal_id: '',
				section_id: '',
				menu_day_id: '',
				menu_id: ''
			})
			set_meal_category('')
		}
	}, [openModal])

	useEffect(() => {
		if (createLoading == false) {
			if (createResponse?.success) {
				if (id) handleShow(id as any)
			}
		}
	}, [createLoading, createResponse])

	const handleOpenModal = (menu_day: any, section: any) => {
		setData({
			section_id: section?.section_id,
			menu_day_id: menu_day?.id,
			menu_id: id
		})
		setOpenModal(true)
	}
	const handleChangeCategory = (e: any) => {
		set_meal_category(e)
	}
	const handleCreateSectionMeal = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleCreate({ ...data, meal_id: data?.meal_id?.id })
	}
	return {
		createLoading,
		handleCreateSectionMeal,
		openModal,
		setOpenModal,
		handleChangeCategory,
		handleChange,
		meal_categories,
		meals,
		meal_category,
		data,
		handleOpenModal
	}
}

export const useUpdateSectionMeal = () => {
	const selector = (state: RootState) => state.SectionMealsReducer
	const {
		updateLoading,
		handleUpdate,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		showLoading: SectionMealLoading,
		showResponse
	} = useUpdate({
		updateApi: updateSectionMealApi,
		showSingleAction: showSectionMeal,
		selector: selector,
		allAction: getSectionMeals
	})

	const values = {
		'name:ar': showResponse?.data?.name?.['ar'],
		'name:en': showResponse?.data?.name?.['en']
	}
	return {
		updateLoading,
		SectionMealLoading,
		handleUpdate,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		values
	}
}

export const useDeleteSectionMeal = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteSectionMealApi,
		allAction: getSectionMeals
	})
	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useChangeSectionMealStatus = () => {
	const { statusLoading, handleChangeStatus } = useStatus({
		statusApi: sectionMealsStatusApi,
		allAction: getSectionMeals
	})
	return { statusLoading, handleChangeStatus }
}

export const useSectionMealHook = () => {
	// fetch all data
	const { loading, error, data, getPage, onSearch } = useGetSectionMeals()
	// show single
	const { showLoading, showError, showResponse } = useShowSingleSectionMeal()
	// create
	const { createLoading, handleCreateSectionMeal, openModal, setOpenModal } = useCreateSectionMeal()
	// update
	const { updateLoading, handleUpdate, openEditModal, setOpenEditModal, handleOpenModal } = useUpdateSectionMeal()
	// delete meal category
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteSectionMeal()
	// change status
	const { statusLoading, handleChangeStatus } = useChangeSectionMealStatus()

	const values = {
		'name:ar': showResponse?.data?.name?.['ar'],
		'name:en': showResponse?.data?.name?.['en']
	}
	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'SectionMeal',
		sheet: 'SectionMeal'
	})
	return {
		tableRef,
		onDownload,
		permission,
		loading,
		error,
		data,
		getPage,
		showLoading,
		showError,
		showResponse,
		createLoading,
		handleCreateSectionMeal,
		openModal,
		setOpenModal,
		updateLoading,
		handleUpdate,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		deleteLoading,
		handleDelete,
		statusLoading,
		handleChangeStatus,
		values,
		openDeleteModal,
		setOpenDeleteModal,
		handleDeleteModal,
		onSearch
	}
}
