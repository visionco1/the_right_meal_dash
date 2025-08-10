import { RootState } from '@/redux/store'
import { useParams } from 'react-router-dom'
import { getQualityControls, showQualityControl } from '@/redux/slices/delivery/quality-control'
import { useBlock, useCreate, useDelete, useFetchData, useShowData, useUnBlock, useUpdate } from '@/hooks'
import { QualityControlBlockApi, QualityControlUnblockApi, createQualityControlApi, deleteQualityControlApi, updateQualityControlApi } from '@/features/delivery/quality-control/api'
import { convertToFormData, handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useEffect, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'

export const useGetAllQualityControls = (params?: any) => {
	const selector = (state: RootState) => state.QualityControlReducer
	const { data, loading, error, getPage, onSearch, search, active_data } = useFetchData(getQualityControls, selector, params)
	return { loading, error, data, getPage, onSearch, search, active_data }
}

export const useShowSingleQualityControl = () => {
	const selector = (state: RootState) => state.QualityControlReducer
	const { id } = useParams()
	const { showLoading, showError, showResponse } = useShowData(showQualityControl, selector)
	return { showLoading, showError, showResponse, id }
}

export const useCreateQualityControl = () => {
	const [data, setData] = useState({
		f_name: '',
		l_name: '',
		email: '',
		phone: '',
		avatar: null,
		delivery_window_id: '',
		zone_ids: [],
		password: '',
		password_confirmation: ''
	})
	const { createLoading, handleCreate, openModal, setOpenModal, handleChange } = useCreate({
		createApi: createQualityControlApi,
		allAction: getQualityControls,
		data: data,
		setData: setData
	})

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = convertToFormData({
			...data,
			dial_code: '+966'
		})
		handleCreate(formData)
	}
	return { createLoading, handleSubmit, openModal, setOpenModal, data, handleChange }
}

export const useUpdateQualityControl = () => {
	const selector = (state: RootState) => state.QualityControlReducer
	// update
	const { updateLoading, openEditModal, setOpenEditModal, handleOpenModal, handleUpdateData, showLoading, showResponse } = useUpdate({
		updateApi: updateQualityControlApi,
		allAction: getQualityControls,
		showSingleAction: showQualityControl,
		selector: selector
	})

	const data = {
		f_name: showResponse?.data?.f_name,
		l_name: showResponse?.data?.l_name,
		phone: showResponse?.data?.phone,
		email: showResponse?.data?.email,
		zone_ids: showResponse?.data?.zones?.map((item: any) => item?.id),
		delivery_window_id: showResponse?.data?.delivery_window_id,
		avatar: null
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
		const pass = values?.password && {
			password: values?.password,
			password_confirmation: values?.password_confirmation
		}

		const Data = {
			...values,
			...pass,
			dial_code: '+966'
		}
		const formData = convertToFormData(Data)
		handleUpdateData(formData, {})
	}

	return {
		updateLoading,
		showLoading,
		handleSubmit,
		handleChange,
		values,
		openEditModal,
		setOpenEditModal,
		handleOpenModal
	}
}

export const useDeleteQualityControl = () => {
	// delete
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteQualityControlApi,
		allAction: getQualityControls
	})

	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useChangeQualityControlStatus = () => {
	// un block
	const { handleOpenUnBlockModal, handleUnBlockModal, openUnBlockModal, setOpenUnBlockModal, unblockLoading } = useUnBlock({
		unblockApi: QualityControlUnblockApi,
		allAction: getQualityControls
	})
	// block
	const { blockLoading, handleBlockModal, handleOpenBlockModal, openBlockModal, setOpenBlockModal } = useBlock({
		blockApi: QualityControlBlockApi,
		allAction: getQualityControls
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

export const useQualityControlsHook = () => {
	const { loading, error, data, getPage, onSearch, search } = useGetAllQualityControls()
	const { showLoading, showResponse } = useShowSingleQualityControl()
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteQualityControl()
	const { handleBlockStatus, blockLoading, handleBlockModal, handleOpenBlockModal, openBlockModal, setOpenBlockModal, handleUnBlockModal, openUnBlockModal, setOpenUnBlockModal, unblockLoading } =
		useChangeQualityControlStatus()

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'quality-controls',
		sheet: 'quality-controls'
	})
	return {
		search,
		onDownload,
		tableRef,
		showLoading,
		showResponse,
		handleDelete,
		deleteLoading,
		loading,
		error,
		data,
		getPage,
		handleBlockStatus,
		openDeleteModal,
		setOpenDeleteModal,
		handleDeleteModal,
		onSearch,
		permission,
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
