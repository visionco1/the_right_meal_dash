import { hasPermissions } from '@/helpers/helpers'
import { useDelete, useFetchData } from '@/hooks'
import { deleteSubscriberApi } from '@/features/marketing/subscribers/api'
import { RootState } from '@/redux/store'
import { useRef } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { getSubscribers } from '@/redux/slices/marketing/subscribers'

export const useGetSubscribers = (params?: any) => {
	const selector = (state: RootState) => state.SubscribersReducer
	const { loading, error, data, getPage, onSearch, search } = useFetchData(getSubscribers, selector, params)
	return { loading, error, data, getPage, onSearch, search }
}

export const useDeleteSubscriber = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteSubscriberApi,
		allAction: getSubscribers
	})
	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useSubscribersHook = () => {
	// fetch all data
	const { loading, error, data, getPage, onSearch, search } = useGetSubscribers()
	// delete meal category
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteSubscriber()

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'Subscribers',
		sheet: 'Subscribers'
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
		onSearch
	}
}
