import { RootState } from '@/redux/store'
import { getAdmins, showAdmin } from '@/redux/slices/staff/admins'
import { useBlock, useCreate, useDelete, useFetchData, useShowData, useUnBlock, useUpdate } from '@/hooks'
import { convertToFormData, handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useEffect, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { adminBlockApi, adminUnblockApi, createAdminApi, deleteAdminApi, updateAdminApi } from '@/features/staff/staff/api'

export const useGetAllAdmins = () => {
	const selector = (state: RootState) => state.adminsReducer
	const { loading, error, data, getPage, onSearch } = useFetchData(getAdmins, selector)
	return { loading, error, data, getPage, onSearch }
}

export const useShowAdmin = () => {
	const selector = (state: RootState) => state.adminsReducer
	const { showLoading, showResponse } = useShowData(showAdmin, selector)
	return { showLoading, showResponse }
}

export const useUpdateAdmin = () => {
	const selector = (state: RootState) => state.adminsReducer
	// update
	const { updateLoading, openEditModal, setOpenEditModal, handleOpenModal, handleUpdateData, showLoading, showResponse } = useUpdate({
		updateApi: updateAdminApi,
		showSingleAction: showAdmin,
		selector: selector,
		allAction: getAdmins
	})
	// default values
	const data = {
		f_name: showResponse?.data?.f_name,
		l_name: showResponse?.data?.l_name,
		phone: showResponse?.data?.phone,
		dial_code: showResponse?.data?.dial_code,
		email: showResponse?.data?.email,
		role_id: showResponse?.data?.role?.id,
		avatar: null,
		permitted_branches: showResponse?.data?.permitted_branches?.map((item: any) => item?.id)
	}
	const [values, setData] = useState<any>(data)
	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, data, key, value)
	}
	useEffect(() => {
		if (!showLoading) {
			setData(data)
		}
	}, [showResponse, showLoading])
	// handle update admin
	const handleUpdateAdmin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// remove empty spaces from the password
		const pass = values?.password?.trim()
			? {
					password: values.password.trim(),
					password_confirmation: values.password_confirmation?.trim() ?? ''
				}
			: {}

		const formData = convertToFormData({
			...values,
			...pass
		})
		handleUpdateData(formData, {})
	}

	return {
		updateLoading,
		openEditModal,
		setOpenEditModal,
		showLoading,
		showResponse,
		handleOpenModal,
		values,
		handleUpdateAdmin,
		handleChange
	}
}

export const useCreateAdmin = () => {
	const [data, setData] = useState({
		avatar: null,
		f_name: '',
		l_name: '',
		email: '',
		phone: '',
		permitted_branches: [],
		role_id: null,
		password: '',
		password_confirmation: ''
	})
	const { createLoading, handleCreate, openModal, setOpenModal, handleChange } = useCreate({
		createApi: createAdminApi,
		allAction: getAdmins,
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
	return { createLoading, handleCreate, openModal, setOpenModal, handleChange, handleSubmit, data }
}

export const useChangeStaffStatus = () => {
	// un block
	const { handleOpenUnBlockModal, handleUnBlockModal, openUnBlockModal, setOpenUnBlockModal, unblockLoading } = useUnBlock({
		unblockApi: adminUnblockApi,
		allAction: getAdmins
	})
	// block
	const { blockLoading, handleBlockModal, handleOpenBlockModal, openBlockModal, setOpenBlockModal } = useBlock({
		blockApi: adminBlockApi,
		allAction: getAdmins
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

export const useStaffHook = () => {
	// fetch all data
	const { loading, error, data, getPage, onSearch } = useGetAllAdmins()
	// delete
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteAdminApi,
		allAction: getAdmins
	})
	// status
	const { handleBlockStatus, blockLoading, handleBlockModal, openBlockModal, setOpenBlockModal, handleUnBlockModal, openUnBlockModal, setOpenUnBlockModal, unblockLoading } = useChangeStaffStatus()

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'admins',
		sheet: 'admins'
	})
	return {
		onDownload,
		tableRef,
		permission,
		onSearch,
		handleDeleteModal,
		openDeleteModal,
		setOpenDeleteModal,
		loading,
		error,
		data,
		getPage,
		deleteLoading,
		handleDelete,
		handleBlockStatus,
		blockLoading,
		handleBlockModal,
		openBlockModal,
		setOpenBlockModal,
		handleUnBlockModal,
		openUnBlockModal,
		setOpenUnBlockModal,
		unblockLoading
	}
}
