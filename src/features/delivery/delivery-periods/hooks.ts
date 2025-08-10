import { getShifts, showShift } from '@/redux/slices/delivery/delivery-periods'
import { RootState } from '@/redux/store'
import { useParams } from 'react-router-dom'
import { useCreate, useDelete, useFetchData, useShowData, useStatus, useUpdate } from '@/hooks'
import { useEffect, useMemo, useRef, useState } from 'react'
import { handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { createShiftApi, deleteShiftApi, shiftStatusApi, updateShiftApi } from '@/features/delivery/delivery-periods/api'

export const useGetAllShifts = (params?: any, cached?: boolean) => {
	const selector = (state: RootState) => state.shiftsReducer
	const { data, loading, error, getPage, onSearch, search, active_data } = useFetchData(getShifts, selector, params, cached)
	return { loading, error, data, getPage, onSearch, search, active_data }
}

export const useShowSingleShift = () => {
	const selector = (state: RootState) => state.shiftsReducer
	const { id } = useParams()
	const { showLoading, showError, showResponse } = useShowData(showShift, selector)
	return { showLoading, showError, showResponse, id }
}

export const useCreateShift = () => {
	const [data, setData] = useState<any>({
		from: '',
		to: ''
	})
	const { createLoading, handleCreate, openModal, setOpenModal, handleChange } = useCreate({
		createApi: createShiftApi,
		allAction: getShifts,
		data: data,
		setData: setData
	})
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleCreate(data)
	}
	return { createLoading, handleSubmit, handleChange, data, openModal, setOpenModal }
}

export const useUpdateShift = () => {
	const selector = (state: RootState) => state.shiftsReducer
	// update
	const { updateLoading, openEditModal, setOpenEditModal, handleOpenModal, handleUpdateData, showLoading, showResponse } = useUpdate({
		updateApi: updateShiftApi as any,
		showSingleAction: showShift,
		selector: selector,
		allAction: getShifts
	})

	const data = useMemo(
		() => ({
			from: showResponse?.data?.new_from,
			to: showResponse?.data?.new_to
		}),
		[showResponse, showLoading]
	)
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
		handleUpdateData(values, data)
	}
	return {
		updateLoading,
		handleSubmit,
		handleChange,
		values,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		showLoading
	}
}

export const useDeleteShift = () => {
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteShiftApi,
		allAction: getShifts
	})

	return { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal }
}

export const useChangeShiftStatus = () => {
	const { statusLoading, handleChangeStatus, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useStatus({
		statusApi: shiftStatusApi as any,
		allAction: getShifts
	})
	return {
		statusLoading,
		handleChangeStatus,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	}
}
export const useShiftHook = () => {
	const { loading, data, getPage, onSearch, search } = useGetAllShifts()
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteShift()
	const { statusLoading, handleChangeStatus, handleChangeStatusModal, handleOpenStatusModal, openStatusModal, setOpenStatusModal } = useChangeShiftStatus()

	const permission = (type: TPermission) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'shifts',
		sheet: 'shifts'
	})

	return {
		loading,
		onDownload,
		permission,
		handleDeleteModal,
		data,
		getPage,
		handleDelete,
		onSearch,
		search,
		deleteLoading,
		openDeleteModal,
		setOpenDeleteModal,
		statusLoading,
		handleChangeStatus,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	}
}
