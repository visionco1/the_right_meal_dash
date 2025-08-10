import { filterExcludedKeys, handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useCreate, useDelete, useFetchData, useShowData } from '@/hooks'
import { createNotificationApi, deleteNotificationApi, getUserByTypeApi, getUserTypesApi } from '@/features/marketing/notifications/api'
import { RootState } from '@/redux/store'
import { useEffect, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { getNotifications, showNotification } from '@/redux/slices/marketing/notifications'
import { TCreateData } from './type'

export const useGetNotifications = (params?: any) => {
	const selector = (state: RootState) => state.NotificationsReducer
	const { loading, error, data, getPage, onSearch, search } = useFetchData(getNotifications, selector, params)
	return { loading, error, data, getPage, onSearch, search }
}
export const useShowNotification = () => {
	const selector = (state: RootState) => state.NotificationsReducer
	const { showError, showLoading, showResponse, setOpenShowModal, openShowModal, handleOpenShowModal } = useShowData(showNotification, selector)
	return {
		showError,
		showLoading,
		showResponse,
		openShowModal,
		setOpenShowModal,
		handleOpenShowModal
	}
}
export const useDeleteNotification = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteNotificationApi,
		allAction: getNotifications
	})
	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}
export const useCreateNotification = () => {
	const { createLoading, handleCreate } = useCreate({
		createApi: createNotificationApi,
		redirectTo: '/marketing-management/notifications'
	})
	const [users_types, setUsersTypes] = useState([])
	const [users, setUsers] = useState([])
	const [createData, setData] = useState<TCreateData>({
		title: '',
		notification_content: '',
		email_content: '',
		system: 0,
		email: 0,
		user_ids: [],
		send_to_all: false,
		user_type: ''
	})
	// get users types
	const getUsersTypes = async () => {
		try {
			const response = await getUserTypesApi()
			if (response?.data?.success) {
				const types = response?.data?.data?.types?.map((item: string) => ({ id: item, name: item }))
				setUsersTypes(types)
			}
		} catch (e) {
			return e
		}
	}
	useEffect(() => {
		getUsersTypes()
	}, [])
	// get user by type
	const getUserByType = async (user: string) => {
		try {
			const response = await getUserByTypeApi(user)
			if (response?.data?.success) {
				setUsers(response?.data?.data)
			}
		} catch (e) {
			return e
		}
	}
	useEffect(() => {
		if (createData?.user_type?.name != '') {
			getUserByType(createData?.user_type?.name)
		}
	}, [createData?.user_type])

	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, createData, key, value)
	}
	const handleEmailContentChange = (html: string) => {
		handleChange('email_content', html)
	}
	const handleCreateNotification = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const combined = filterExcludedKeys(
			{
				...createData,
				user_ids: createData?.user_ids?.map((item: any) => item?.id),
				user_type: createData?.user_type?.id
			},
			[]
		)
		handleCreate(combined, [], true)
	}

	return {
		createLoading,
		handleCreate,
		handleChange,
		handleCreateNotification,
		createData,
		users,
		users_types,
		handleEmailContentChange
	}
}

export const useNotificationsHook = () => {
	// fetch all data
	const { loading, error, data, getPage, onSearch, search } = useGetNotifications()
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteNotification()
	const { showError, showLoading, showResponse, setOpenShowModal, openShowModal, handleOpenShowModal } = useShowNotification()

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'Notifications',
		sheet: 'Notifications'
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
		onSearch,
		deleteLoading,
		handleDelete,
		openDeleteModal,
		setOpenDeleteModal,
		handleDeleteModal,
		showError,
		showLoading,
		showResponse,
		setOpenShowModal,
		openShowModal,
		handleOpenShowModal
	}
}
