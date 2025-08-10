import { RootState } from '@/redux/store'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRoles, showRole } from '@/redux/slices/staff/roles'
import { useBlock, useCreate, useDelete, useFetchData, useShowData, useUnBlock, useUpdate } from '@/hooks'
import { hasPermissions } from '@/helpers/helpers'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { blockRoleApi, createRoleApi, deleteRoleApi, unblockRoleApi, updateRoleApi } from '@/features/staff/roles/api'

type createT = {
	'display_name:en': string
	'display_name:ar': string
	permissions: string[]
}
export const useGetRoles = () => {
	const selector = (state: RootState) => state.rolesReducer
	const { loading, error, data, getPage, onSearch, active_data } = useFetchData(getRoles, selector)
	return { loading, error, data, getPage, onSearch, active_data }
}

export const useShowSingleRole = () => {
	const selector = (state: RootState) => state.rolesReducer
	const { showLoading, showError, showResponse } = useShowData(showRole, selector)
	const { id } = useParams()
	return { showLoading, showError, showResponse, id }
}

export const useCreateRole = () => {
	const { createLoading, handleCreate } = useCreate({
		createApi: createRoleApi,
		redirectTo: '/staff-management/roles'
	})

	const [data, setData] = useState<createT>({
		'display_name:ar': '',
		'display_name:en': '',
		permissions: []
	})

	const handleChangeFrom = (e: any) => {
		if (e.target.name === 'permissions') {
			setData((prevData: any) => {
				const newPermissions = e.target.checked
					? [...prevData.permissions, e.target.value] // Add value if checked
					: prevData?.permissions?.filter((item: any) => item !== e.target.value) // Remove value if unchecked

				return {
					...prevData,
					permissions: newPermissions
				}
			})
		} else {
			setData((prevData: any) => ({
				...prevData,
				[e.target.name]: e.target.value
			}))
		}
	}

	const handleCreateRole = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleCreate(data)
	}

	return { createLoading, handleCreateRole, handleChangeFrom, data }
}

export const useUpdateRole = () => {
	const selector = (state: RootState) => state.rolesReducer
	const { id } = useParams()
	const { updateLoading, handleUpdateData, showLoading, showResponse } = useUpdate({
		updateApi: updateRoleApi,
		showSingleAction: showRole,
		selector: selector,
		redirectTo: '/staff-management/roles'
	})

	const [data, setData] = useState<createT>({
		'display_name:ar': '',
		'display_name:en': '',
		permissions: []
	})

	useEffect(() => {
		try {
			setData({
				'display_name:ar': showResponse?.data?.name?.ar,
				'display_name:en': showResponse?.data?.name?.en,
				permissions:
					showResponse?.data?.permissions &&
					Object?.values(showResponse?.data?.permissions)
						?.flat()
						?.map((item: any) => String(item?.id))
			})
		} catch (e) {
			return
		}
	}, [showLoading, showResponse])

	const handleChangeFrom = (e: any) => {
		if (e.target.name == 'permissions') {
			setData((prevData: any) => {
				const newPermissions = e.target.checked
					? [...prevData.permissions, e.target.value] // Add value if checked
					: prevData?.permissions?.filter((item: any) => item !== e.target.value) // Remove value if unchecked

				return {
					...prevData,
					permissions: newPermissions
				}
			})
		} else {
			setData((prevData: any) => ({
				...prevData,
				[e.target.name]: e.target.value
			}))
		}
	}

	const values = {
		'display_name:ar': showResponse?.data?.name?.ar,
		'display_name:en': showResponse?.data?.name?.en,
		permissions:
			showResponse?.data?.permissions &&
			Object?.values(showResponse?.data?.permissions)
				?.flat()
				?.map((item: any) => String(item?.id))
	}
	const handleUpdateRole = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (id) {
			handleUpdateData(data, values, id as any)
		}
	}

	return { updateLoading, handleUpdateRole, showLoading, showResponse, id, handleChangeFrom, data }
}

export const useDeleteRole = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteRoleApi,
		allAction: getRoles
	})

	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useChangeRoleStatus = () => {
	// un block
	const { handleOpenUnBlockModal, handleUnBlockModal, openUnBlockModal, setOpenUnBlockModal, unblockLoading } = useUnBlock({
		unblockApi: unblockRoleApi,
		allAction: getRoles
	})
	// block
	const { blockLoading, handleBlockModal, handleOpenBlockModal, openBlockModal, setOpenBlockModal } = useBlock({
		blockApi: blockRoleApi,
		allAction: getRoles
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

export const useRolesHook = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteRole()
	const { loading, error, data, getPage, onSearch } = useGetRoles()
	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'permissions',
		sheet: 'permissions'
	})
	return {
		tableRef,
		onDownload,
		onSearch,
		deleteLoading,
		handleDelete,
		openDeleteModal,
		setOpenDeleteModal,
		handleDeleteModal,
		loading,
		error,
		data,
		getPage,
		permission
	}
}
