import { handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useCreate, useDelete, useFetchData, useShowData, useUpdate } from '@/hooks'
import { createComplaintApi, deleteComplaintApi, updateComplaintApi } from '@/features/customers/complaints/api'
import { RootState } from '@/redux/store'
import { useEffect, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { TCreateData } from './type'
import { getComplaints, showComplaint } from '@/redux/slices/customer/complaints'

export const useGetComplaints = (params?: any) => {
	const selector = (state: RootState) => state.ComplaintsReducer
	const { loading, error, data, getPage, onSearch, search, handleFetch, active_data } = useFetchData(getComplaints, selector, params)
	const [filter_data, set_filter_data] = useState<any>({
		country: '',
		city: '',
		branch: '',
		start_date: '',
		end_date: '',
		month: ''
	})
	// Filter out keys with empty values
	const finalFilters = Object.fromEntries(Object.entries(filter_data).filter(([_, value]) => value))
	const handleChangeFilter = (key: string, value: any) => {
		handleChangeState(set_filter_data, filter_data, key, value)
	}
	const handleSearch = () => {
		handleFetch(finalFilters)
	}
	return { loading, error, data, getPage, onSearch, search, handleChangeFilter, handleSearch, filter_data, active_data }
}

export const useShowComplaint = () => {
	const selector = (state: RootState) => state.ComplaintsReducer
	const { showError, showLoading, showResponse, setOpenShowModal, openShowModal, handleOpenShowModal } = useShowData(showComplaint, selector)
	return {
		showError,
		showLoading,
		showResponse,
		openShowModal,
		setOpenShowModal,
		handleOpenShowModal
	}
}

export const useUpdateComplaint = () => {
	const selector = (state: RootState) => state.ComplaintsReducer
	const {
		updateLoading,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		handleUpdateData,
		showResponse,
		showLoading: loading
	} = useUpdate({
		updateApi: updateComplaintApi,
		showSingleAction: showComplaint,
		selector: selector,
		allAction: getComplaints
	})
	// default values
	const values = {
		user_id: showResponse?.data?.user?.id,
		order_day_id: showResponse?.data?.order?.id,
		message: showResponse?.data?.message,
		image: null,
		note: showResponse?.data?.note
	}
	const [data, setData] = useState<TCreateData>(values)

	useEffect(() => {
		if (!loading) {
			setData(values)
		}
	}, [loading, showResponse])

	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, data, key, value)
	}
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleUpdateData(data, values as any)
	}
	return {
		updateLoading,
		handleChange,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		loading,
		showResponse,
		data,
		handleSubmit
	}
}

export const useCreateComplaint = () => {
	const [data, setData] = useState<TCreateData>({
		user_id: '',
		order_day_id: '',
		message: '',
		image: null,
		note: ''
	})
	const { createLoading, handleCreate, openModal, setOpenModal, handleChange } = useCreate({
		createApi: createComplaintApi,
		allAction: getComplaints,
		data: data,
		setData: setData
	})
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleCreate(data)
	}
	return {
		createLoading,
		handleChange,
		openModal,
		setOpenModal,
		handleSubmit,
		data
	}
}

export const useDeleteComplaint = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteComplaintApi,
		allAction: getComplaints
	})
	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useComplaintsHook = () => {
	// fetch all data
	const { loading, error, data, getPage, onSearch, search, handleChangeFilter, handleSearch, filter_data } = useGetComplaints()
	// show Complaint
	const { showLoading, showResponse, openShowModal, setOpenShowModal, handleOpenShowModal } = useShowComplaint()
	// delete complaint
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteComplaint()

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'Complaints',
		sheet: 'Complaints'
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
		showLoading,
		showResponse,
		deleteLoading,
		handleDelete,
		openDeleteModal,
		setOpenDeleteModal,
		handleDeleteModal,
		onSearch,
		openShowModal,
		setOpenShowModal,
		handleOpenShowModal,
		handleChangeFilter,
		handleSearch,
		filter_data
	}
}
