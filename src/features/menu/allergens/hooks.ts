import { handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useCreate, useDelete, useFetchData, useStatus, useUpdate } from '@/hooks'
import { getAllergens, showAllergen } from '@/redux/slices/menu/allergens'
import { allergenStatusApi, createAllergenApi, deleteAllergenApi, updateAllergenApi } from '@/features/menu/allergens/api'
import { RootState } from '@/redux/store'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'

export const useGetAllergens = (params?: any) => {
	const selector = (state: RootState) => state.allergensReducer
	const { loading, error, data, active_data, getPage, onSearch, search } = useFetchData(getAllergens, selector, params)
	return { loading, error, data, getPage, onSearch, search, active_data }
}

export const useUpdateAllergen = () => {
	const selector = (state: RootState) => state.allergensReducer
	const { updateLoading, handleUpdate, openEditModal, setOpenEditModal, handleOpenModal, handleUpdateData, showResponse, showLoading } = useUpdate({
		updateApi: updateAllergenApi,
		showSingleAction: showAllergen,
		selector: selector,
		allAction: getAllergens
	})

	const data = useMemo(() => {
		return {
			'name:ar': showResponse?.data?.name?.ar,
			'name:en': showResponse?.data?.name?.en,
			image: null
		}
	}, [showResponse, showLoading])

	const [values, setUpdateData] = useState<any>(data)

	useEffect(() => {
		if (!showLoading) {
			setUpdateData(data)
		}
	}, [showLoading, showResponse])

	const handleChange = (key: string, value: any) => {
		handleChangeState(setUpdateData, values, key, value)
	}

	const handleUpdateAllergen = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleUpdateData(values, data as any)
	}
	return {
		updateLoading,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		showLoading,
		showResponse,
		values,
		handleUpdateAllergen,
		handleChange
	}
}

export const useCreateAllergen = () => {
	const [data, setData] = useState<any>({
		'name:ar': '',
		'name:en': '',
		image: null
	})
	const { createLoading, handleCreate, openModal, setOpenModal, handleChange } = useCreate({
		createApi: createAllergenApi,
		allAction: getAllergens,
		data: data,
		setData: setData
	})
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleCreate(data)
	}
	return {
		createLoading,
		handleSubmit,
		openModal,
		setOpenModal,
		data,
		handleChange
	}
}

export const useAllergensHook = () => {
	// fetch all data
	const { loading, error, data, getPage, onSearch, search } = useGetAllergens()
	// delete allergen
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteAllergenApi,
		allAction: getAllergens
	})
	// change status
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useStatus({
		statusApi: allergenStatusApi,
		allAction: getAllergens
	})

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}

	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'allergens',
		sheet: 'allergens'
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
