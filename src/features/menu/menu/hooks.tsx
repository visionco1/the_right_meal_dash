import { convertToFormData, filterExcludedKeys, flattenArrayToBracketedObject, handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useCreate, useDelete, useFetchData, useShowData, useStatus, useUpdate } from '@/hooks'
import { getMenus, showMenu } from '@/redux/slices/menu/menu'
import { MenuStatusApi, chefChoiceApi, createMenuApi, deleteMenuApi, deleteSectionMealApi, updateMenuApi } from '@/features/menu/menu/api'
import { getWorkDays } from '@/redux/slices/menu/work-days'
import { RootState } from '@/redux/store'
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { useParams } from 'react-router-dom'
import { useDeleteSection } from '../sections/hooks'
import { TCreateData } from './type'
import Notify from '@/components/ui/custom-toastify'
import { useDispatch } from 'react-redux'

export const useGetMenus = (params?: any) => {
	const selector = (state: RootState) => state.menusReducer
	const { loading, error, data, getPage, onSearch, search, active_data } = useFetchData(getMenus, selector, params)
	return { loading, error, data, getPage, onSearch, search, active_data }
}

export const useGetWorkDays = () => {
	const selector = (state: RootState) => state.workDaysReducer
	const { loading, error, data } = useFetchData(getWorkDays, selector, {}, true)
	return { loading, error, data }
}

export const useShowSingleMenu = () => {
	const selector = (state: RootState) => state.menusReducer
	const { showLoading, showError, showResponse, handleShow } = useShowData(showMenu, selector)
	return { showLoading, showError, showResponse, handleShow }
}

export const useCreateMenu = () => {
	const { createLoading, handleCreate } = useCreate({
		createApi: createMenuApi,
		redirectTo: '/menu-management/menu'
	})

	const [data, setData] = useState<TCreateData>({
		'name:ar': '',
		'name:en': '',
		country_id: '',
		branch_id: '',
		cut_of_day: '',
		menu_type: '',
		image: null,
		sections: [{ nameAr: '', nameEn: '' }],
		work_day_ids: []
	})

	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, data, key, value)
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = convertToFormData(data)
		handleCreate(formData, ['branch_id'])
	}

	return { createLoading, handleSubmit, handleChange, data }
}

export const useUpdateMenu = () => {
	const { id } = useParams()
	const selector = (state: RootState) => state.menusReducer

	const { updateLoading, showLoading, showResponse, handleUpdateData } = useUpdate({
		updateApi: updateMenuApi,
		showSingleAction: showMenu,
		selector: selector,
		redirectTo: '/menu-management/menu'
	})

	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteSection()

	const values = useMemo(
		() => ({
			'name:ar': showResponse?.data?.name?.ar || '',
			'name:en': showResponse?.data?.name?.en || '',
			country_id: showResponse?.data?.country?.id || '',
			branch_id: showResponse?.data?.branch?.id || '',
			cut_of_day: showResponse?.data?.cut_of_day?.id || '',
			menu_type: showResponse?.data?.menu_type,
			image: null,
			work_day_ids: showResponse?.data?.working_days?.map((item: any) => item?.id),
			sections: showResponse?.data?.sections?.map((item: any) => ({
				id: item?.id,
				'name:ar': item?.name?.ar,
				'name:en': item?.name?.en
			}))
		}),
		[showResponse, showLoading]
	)

	const [data, setData] = useState<TCreateData>(values)

	useEffect(() => {
		if (showLoading == false) {
			setData(values)
		}
	}, [showLoading, showResponse])

	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, data, key, value)
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = convertToFormData(data)
		if (id) {
			handleUpdateData(formData, {}, id as any)
		}
	}

	return {
		updateLoading,
		handleSubmit,
		showLoading,
		showResponse,
		data,
		handleChange,
		deleteLoading,
		handleDelete,
		openDeleteModal,
		setOpenDeleteModal,
		values
	}
}

export const useDeleteMenu = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteMenuApi,
		allAction: getMenus
	})
	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useDeleteSectionMeal = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal, response } = useDelete({
		deleteApi: deleteSectionMealApi
	})
	useEffect(() => {
		if (!deleteLoading && response) {
			if (id && response?.data?.success) {
				dispatch(showMenu(id as any))
			}
		}
	}, [deleteLoading, response])
	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useChangeMenuStatus = () => {
	// change status
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useStatus({
		statusApi: MenuStatusApi,
		allAction: getMenus
	})
	return {
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	}
}

export const useChefChoice = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const [loading, setLoading] = useState<boolean>(false)

	const changeChefChoice = async (ID: string | number, data: { is_chef_choice: number }) => {
		try {
			setLoading(true)
			const response = await chefChoiceApi(ID, data)
			setLoading(false)
			if (response?.data?.success) {
				Notify(response?.data?.message, 'success')
				if (id) {
					dispatch(showMenu(id as any))
				}
			}
		} catch (error: any) {
			setLoading(false)
			Notify(error, 'error')
			return error
		}
	}

	return { loading, changeChefChoice }
}

export const useMenuHook = () => {
	// fetch all data
	const { loading, error, data, getPage, onSearch, search } = useGetMenus()
	// delete meal category
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteMenu()
	// change status
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useChangeMenuStatus()

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'menu',
		sheet: 'menu'
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
