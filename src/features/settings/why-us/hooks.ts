import { handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useCreate, useDelete, useFetchData, useShowData, useStatus, useUpdate } from '@/hooks'
import { WhyUsStatusApi, createWhyUsApi, deleteWhyUsApi, updateWhyUsApi } from '@/features/settings/why-us/api'
import { RootState } from '@/redux/store'
import { useEffect, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { getWhyUs, showWhyUs } from '@/redux/slices/settings/why-us'
import { TCreateData } from './type'

export const useGetWhyUs = (params?: any) => {
	const selector = (state: RootState) => state.WhyUsReducer
	const { loading, error, data, getPage, onSearch, search } = useFetchData(getWhyUs, selector, params)
	return { loading, error, data, getPage, onSearch, search }
}

export const useShowWhyUs = () => {
	const selector = (state: RootState) => state.WhyUsReducer
	const { showError, showLoading, showResponse, setOpenShowModal, openShowModal, handleOpenShowModal } = useShowData(showWhyUs, selector)
	return {
		showError,
		showLoading,
		showResponse,
		openShowModal,
		setOpenShowModal,
		handleOpenShowModal
	}
}

export const useUpdateWhyUs = () => {
	const selector = (state: RootState) => state.WhyUsReducer
	const { updateLoading, openEditModal, setOpenEditModal, handleOpenModal, handleUpdateData, showResponse, showLoading } = useUpdate({
		updateApi: updateWhyUsApi,
		showSingleAction: showWhyUs,
		selector: selector,
		allAction: getWhyUs
	})
	// default values
	const values = {
		'title:ar': showResponse?.data?.title?.ar,
		'title:en': showResponse?.data?.title?.en,
		'description:ar': showResponse?.data?.description?.ar,
		'description:en': showResponse?.data?.description?.en,
		image: null
	}
	const [updateData, setData] = useState<TCreateData>(values)

	useEffect(() => {
		if (showLoading == false) {
			setData(values)
		}
	}, [showLoading, showResponse])

	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, updateData, key, value)
	}
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleUpdateData(updateData, values)
	}
	return {
		updateLoading,
		handleChange,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		showLoading,
		showResponse,
		updateData,
		handleSubmit
	}
}

export const useCreateWhyUs = () => {
	const [data, setData] = useState<TCreateData>({
		'title:ar': '',
		'title:en': '',
		'description:ar': '',
		'description:en': '',
		image: null
	})
	const { createLoading, handleCreate, openModal, setOpenModal, handleChange } = useCreate({
		createApi: createWhyUsApi,
		allAction: getWhyUs,
		data: data,
		setData: setData
	})

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleCreate(data)
	}
	return {
		createLoading,
		handleCreate,
		handleChange,
		openModal,
		setOpenModal,
		handleSubmit,
		data
	}
}

export const useDeleteWhyUs = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteWhyUsApi,
		allAction: getWhyUs
	})
	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useChangeWhyUsStatus = () => {
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useStatus({
		statusApi: WhyUsStatusApi,
		allAction: getWhyUs
	})
	return {
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	}
}

export const useWhyUsHook = () => {
	// fetch all data
	const { loading, error, data, getPage, onSearch, search } = useGetWhyUs()
	// show WhyUs
	const { showLoading: singleLoading, showResponse: singleResponse, openShowModal, setOpenShowModal, handleOpenShowModal } = useShowWhyUs()
	// delete meal category
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteWhyUs()
	// change status
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useChangeWhyUsStatus()

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'WhyUss',
		sheet: 'WhyUss'
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
		setOpenStatusModal,
		singleLoading,
		singleResponse,
		openShowModal,
		setOpenShowModal,
		handleOpenShowModal
	}
}
