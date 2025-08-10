import { handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useCreate, useDelete, useFetchData, useStatus, useUpdate } from '@/hooks'
import { getSizes, showSize } from '@/redux/slices/menu/sizes'
import { SizeStatusApi, createSizeApi, deleteSizeApi, updateSizeApi } from '@/features/menu/sizes/api'
import { RootState } from '@/redux/store'
import { useEffect, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'

export const useGetSizes = (params?: any) => {
	const selector = (state: RootState) => state.sizesReducer
	const { loading, error, data, getPage, onSearch, search, active_data } = useFetchData(getSizes, selector, params)
	return { loading, error, data, getPage, onSearch, search, active_data }
}

export const useUpdateSize = () => {
	const selector = (state: RootState) => state.sizesReducer
	const { updateLoading, openEditModal, setOpenEditModal, handleOpenModal, handleUpdateData, showLoading, showResponse } = useUpdate({
		updateApi: updateSizeApi,
		showSingleAction: showSize,
		selector: selector,
		allAction: getSizes
	})
	// default values
	const data = {
		'name:ar': showResponse?.data?.name?.ar,
		'name:en': showResponse?.data?.name?.en,
		carbohydrates: showResponse?.data?.carbohydrates,
		protiens: showResponse?.data?.protiens
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

export const useCreateSize = () => {
	const [data, setData] = useState<any>({
		'name:ar': '',
		'name:en': '',
		carbohydrates: '',
		protiens: ''
	})
	const { createLoading, handleCreate, openModal, setOpenModal, handleChange } = useCreate({
		createApi: createSizeApi,
		allAction: getSizes,
		data: data,
		setData: setData
	})

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleCreate(data)
	}
	return { createLoading, handleSubmit, openModal, setOpenModal, handleChange, data }
}

export const useDeleteSize = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteSizeApi,
		allAction: getSizes
	})
	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useSizesHook = () => {
	// fetch all data
	const { loading, error, data, getPage, onSearch, search } = useGetSizes()
	// delete meal category
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteSize()
	// change status
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useStatus({
		statusApi: SizeStatusApi,
		allAction: getSizes
	})

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'Sizes',
		sheet: 'Sizes'
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
