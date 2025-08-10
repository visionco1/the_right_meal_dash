import { RootState } from '@/redux/store'
import { useParams } from 'react-router-dom'
import { getDeliveries, showDelivery } from '@/redux/slices/delivery/delivery-men'
import { useBlock, useCreate, useDelete, useFetchData, useShowData, useUnBlock, useUpdate } from '@/hooks'
import { convertToFormData, handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { useEffect, useMemo, useRef, useState } from 'react'
import { DeliveryBlockApi, DeliveryUnblockApi, createDeliveryApi, deleteDeliveryApi, updateDeliveryApi } from '@/features/delivery/delivery-men/api'

export const useGetAllDeliveries = (params?: any, cached?: boolean) => {
	const selector = (state: RootState) => state.deliveryMenReducer
	const { data, loading, error, getPage, onSearch, search } = useFetchData(getDeliveries, selector, params, cached)
	return { loading, error, data, getPage, onSearch, search }
}

export const useShowSingleDelivery = () => {
	const selector = (state: RootState) => state.deliveryMenReducer
	const { id } = useParams()
	const { showLoading, showError, showResponse } = useShowData(showDelivery, selector)
	return { showLoading, showError, showResponse, id }
}

export const useCreateDelivery = () => {
	const [data, setData] = useState({
		avatar: null,
		f_name: '',
		l_name: '',
		email: '',
		phone: '',
		zone_ids: [],
		password: '',
		password_confirmation: ''
	})
	const { createLoading, handleCreate, openModal, setOpenModal, handleChange } = useCreate({
		createApi: createDeliveryApi,
		allAction: getDeliveries,
		data: data,
		setData: setData
	})

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const filteredData = {
			...data,
			dial_code: '+966'
		}
		const formData = convertToFormData(filteredData)
		handleCreate(formData)
	}

	return { createLoading, handleSubmit, openModal, setOpenModal, handleChange, data }
}

export const useUpdateDelivery = () => {
	const selector = (state: RootState) => state.deliveryMenReducer
	const { updateLoading, openEditModal, setOpenEditModal, handleOpenModal, handleUpdateData, showResponse, showLoading } = useUpdate({
		updateApi: updateDeliveryApi,
		showSingleAction: showDelivery,
		selector: selector,
		allAction: getDeliveries
	})

	const data = useMemo(
		() => ({
			f_name: showResponse?.data?.f_name,
			l_name: showResponse?.data?.l_name,
			phone: showResponse?.data?.phone,
			dial_code: showResponse?.data?.dial_code,
			email: showResponse?.data?.email,
			zone_ids: showResponse?.data?.zone_ids?.map((item: any) => item?.id),
			// delivery_window_id:showResponse?.data?.delivery_window,
			avatar: null,
			permitted_branches: showResponse?.data?.permitted_branches
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
	const handleUpdateDelivery = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const pass = values?.password && {
			password: values?.password,
			password_confirmation: values?.password_confirmation
		}
		const formData = convertToFormData({ ...values, ...pass })
		handleUpdateData(formData, {})
	}

	return {
		updateLoading,
		handleUpdateDelivery,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		values,
		showResponse,
		showLoading,
		handleChange
	}
}

export const useDeleteDelivery = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteDeliveryApi,
		allAction: getDeliveries
	})

	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useChangeDeliveryStatus = () => {
	// un block
	const { handleOpenUnBlockModal, handleUnBlockModal, openUnBlockModal, setOpenUnBlockModal, unblockLoading } = useUnBlock({
		unblockApi: DeliveryUnblockApi,
		allAction: getDeliveries
	})
	// block
	const { blockLoading, handleBlockModal, handleOpenBlockModal, openBlockModal, setOpenBlockModal } = useBlock({
		blockApi: DeliveryBlockApi,
		allAction: getDeliveries
	})

	const handleBlockStatus = (e: any, id: ID) => {
		const isChecked = e.target.checked
		if (isChecked) {
			handleOpenUnBlockModal(id)
		} else {
			handleOpenBlockModal(id)
		}
	}
	return {
		handleBlockStatus,
		blockLoading,
		handleBlockModal,
		handleOpenBlockModal,
		openBlockModal,
		setOpenBlockModal,
		handleUnBlockModal,
		openUnBlockModal,
		setOpenUnBlockModal,
		unblockLoading
	}
}

export const useDeliveryMenHook = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteDelivery()
	const { loading, error, data, getPage, onSearch, search } = useGetAllDeliveries()
	const { handleBlockStatus, blockLoading, handleBlockModal, handleOpenBlockModal, openBlockModal, setOpenBlockModal, handleUnBlockModal, openUnBlockModal, setOpenUnBlockModal, unblockLoading } =
		useChangeDeliveryStatus()

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'delivery men',
		sheet: 'delivery men'
	})
	return {
		search,
		onDownload,
		permission,
		handleDelete,
		deleteLoading,
		loading,
		error,
		data,
		getPage,
		onSearch,
		openDeleteModal,
		setOpenDeleteModal,
		handleDeleteModal,
		handleBlockStatus,
		blockLoading,
		handleBlockModal,
		handleOpenBlockModal,
		openBlockModal,
		setOpenBlockModal,
		handleUnBlockModal,
		openUnBlockModal,
		setOpenUnBlockModal,
		unblockLoading
	}
}
