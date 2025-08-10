import { RootState } from '@/redux/store'
import { useParams } from 'react-router-dom'
import { getOutlets, showOutlet } from '@/redux/slices/delivery/outlets'
import { useBlock, useCreate, useDelete, useFetchData, useShowData, useUnBlock, useUpdate } from '@/hooks'
import { OutletBlockApi, OutletUnblockApi, createOutletApi, deleteOutletApi, updateOutletApi } from '@/features/delivery/outlets/api'
import { convertToFormData, handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useEffect, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'

export const useGetAllOutlets = (params?: any) => {
	const selector = (state: RootState) => state.OutletReducer
	const { data, loading, error, getPage, onSearch, search, active_data } = useFetchData(getOutlets, selector, params)
	return { loading, error, data, getPage, onSearch, search, active_data }
}

export const useShowSingleOutlet = () => {
	const selector = (state: RootState) => state.OutletReducer
	const { id } = useParams()
	const { showLoading, showError, showResponse } = useShowData(showOutlet, selector)
	return { showLoading, showError, showResponse, id }
}

export const useCreateOutlet = () => {
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
		createApi: createOutletApi,
		allAction: getOutlets,
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

export const useUpdateOutlet = () => {
	const selector = (state: RootState) => state.OutletReducer
	// update
	const { updateLoading, openEditModal, setOpenEditModal, handleOpenModal, handleUpdateData, showLoading, showResponse } = useUpdate({
		updateApi: updateOutletApi,
		allAction: getOutlets,
		showSingleAction: showOutlet,
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
			...data,
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

export const useDeleteOutlet = () => {
	// delete
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteOutletApi,
		allAction: getOutlets
	})

	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useChangeOutletStatus = () => {
	// un block
	const { handleOpenUnBlockModal, handleUnBlockModal, openUnBlockModal, setOpenUnBlockModal, unblockLoading } = useUnBlock({
		unblockApi: OutletUnblockApi,
		allAction: getOutlets
	})
	// block
	const { blockLoading, handleBlockModal, handleOpenBlockModal, openBlockModal, setOpenBlockModal } = useBlock({
		blockApi: OutletBlockApi,
		allAction: getOutlets
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

export const useOutletsHook = () => {
	const { loading, error, data, getPage, onSearch, search } = useGetAllOutlets()
	const { showLoading, showResponse } = useShowSingleOutlet()
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteOutlet()
	const { handleBlockStatus, blockLoading, handleBlockModal, handleOpenBlockModal, openBlockModal, setOpenBlockModal, handleUnBlockModal, openUnBlockModal, setOpenUnBlockModal, unblockLoading } =
		useChangeOutletStatus()

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
