import { hasPermissions } from '@/helpers/helpers'
import { useDelete, useFetchData, useShowData } from '@/hooks'
import { deleteContactUsApi } from '@/features/marketing/contact-us/api'
import { RootState } from '@/redux/store'
import { useRef } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { getContactUs, showContactUs } from '@/redux/slices/marketing/contact-us'

export const useGetContactUss = (params?: any) => {
	const selector = (state: RootState) => state.ContactUsReducer
	const { loading, error, data, getPage, onSearch, search } = useFetchData(getContactUs, selector, params)
	return { loading, error, data, getPage, onSearch, search }
}

export const useShowContactUs = () => {
	const selector = (state: RootState) => state.ContactUsReducer
	const { showError, showLoading, showResponse, setOpenShowModal, openShowModal, handleOpenShowModal } = useShowData(showContactUs, selector)
	return {
		showError,
		showLoading,
		showResponse,
		openShowModal,
		setOpenShowModal,
		handleOpenShowModal
	}
}

export const useDeleteContactUs = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteContactUsApi,
		allAction: getContactUs
	})
	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useContactUsHook = () => {
	// fetch all data
	const { loading, error, data, getPage, onSearch, search } = useGetContactUss()
	// show ContactUs
	const { showLoading: singleLoading, showResponse: singleResponse, openShowModal, setOpenShowModal, handleOpenShowModal } = useShowContactUs()

	// delete meal category
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteContactUs()

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'ContactUss',
		sheet: 'ContactUss'
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
		singleLoading,
		singleResponse,
		openShowModal,
		setOpenShowModal,
		handleOpenShowModal
	}
}
