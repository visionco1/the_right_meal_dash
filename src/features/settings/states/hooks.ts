import { createStateApi, deleteStateApi, stateStatusApi, updateStateApi } from '@/features/settings/states/api'
import { handleChangeState, hasPermissions } from '@/helpers/helpers'
import { useCreate, useDelete, useFetchData, useStatus, useUpdate } from '@/hooks'
import { getStates, showState } from '@/redux/slices/settings/states'
import { RootState } from '@/redux/store'
import { useEffect, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { useParams } from 'react-router-dom'

export const useGetStates = (params?: any, cached?: boolean) => {
	const selector = (state: RootState) => state.statesReducer
	const { loading, error, data, getPage, onSearch, search, active_data } = useFetchData(getStates, selector, params, cached)
	const { id } = useParams()
	const onSearchState = (e: string) => {
		onSearch(e, { country_id: id })
	}
	return { loading, error, data, getPage, onSearchState, search, active_data }
}

export const useUpdateState = () => {
	const selector = (state: RootState) => state.statesReducer
	const { id } = useParams()
	const { updateLoading, handleUpdate, openEditModal, setOpenEditModal, handleOpenModal, handleUpdateData, showResponse, showLoading } = useUpdate({
		updateApi: updateStateApi,
		showSingleAction: showState,
		selector: selector,
		allAction: () => getStates({ country_id: id as any })
	})
	// default values
	const values = {
		'name:ar': showResponse?.data?.name?.['ar'],
		'name:en': showResponse?.data?.name?.['en']
	}
	const [updatedData, setData] = useState<any>(values)
	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, updatedData, key, value)
	}
	useEffect(() => {
		if (!showLoading) {
			setData(values)
		}
	}, [showLoading, showResponse])

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleUpdateData(updatedData, values)
	}

	return {
		updateLoading,
		handleUpdate,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		updatedData,
		showLoading,
		showResponse,
		handleChange,
		handleSubmit
	}
}

export const useCreateState = () => {
	const [data, setData] = useState<any>({
		'name:ar': '',
		'name:en': ''
	})
	const { id } = useParams()
	const { createLoading, handleCreate, openModal, setOpenModal, handleChange } = useCreate({
		createApi: createStateApi,
		allAction: () => getStates({ country_id: id as any }),
		setData: setData,
		data: data
	})
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleCreate({ ...data, country_id: id })
	}
	return { createLoading, handleSubmit, openModal, setOpenModal, data, handleChange }
}

export const useStatesHook = () => {
	const { id: country_id } = useParams()
	// fetch all data
	const { loading, error, data, getPage, onSearchState, search } = useGetStates({
		country_id: country_id
	})
	// delete
	const { deleteLoading, handleDelete, setOpenDeleteModal, openDeleteModal, handleDeleteModal } = useDelete({
		deleteApi: deleteStateApi,
		allAction: () => getStates({ country_id: country_id as any })
	})
	// change status
	const { statusLoading, handleChangeStatusModal, handleOpenStatusModal, setOpenStatusModal, openStatusModal } = useStatus({
		statusApi: stateStatusApi,
		allAction: () => getStates({ country_id: country_id as any })
	})

	const permission = (type: string) => {
		return hasPermissions(data?.data?.permissions, type)
	}
	const tableRef = useRef(null)
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: 'states',
		sheet: 'states'
	})

	return {
		tableRef,
		search,
		onDownload,
		onSearchState,
		permission,
		country_id,
		loading,
		error,
		data,
		handleDeleteModal,
		openDeleteModal,
		setOpenDeleteModal,
		getPage,
		deleteLoading,
		handleDelete,
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		setOpenStatusModal,
		openStatusModal
	}
}
